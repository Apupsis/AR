#!/usr/bin/env python3
"""Single entrypoint for landing-batch page/button QA pipeline."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent


def run(script: str, batch: Path, extra: list[str] | None = None) -> int:
    cmd = [sys.executable, str(SCRIPTS / script), "--batch", str(batch)]
    if extra:
        cmd.extend(extra)
    print("+", " ".join(cmd), flush=True)
    return subprocess.call(cmd)


def summarize(batch: Path) -> None:
    contrast = batch / "_qa-contrast-results.json"
    visual = batch / "_qa-visual-results.json"
    rtl = batch / "_qa-rtl-overflow.json"
    static = batch / "_qa-static-risks.json"
    btn = "?"
    page = "?"
    risks = "?"
    overflow_n = "?"
    if contrast.exists():
        c = json.loads(contrast.read_text(encoding="utf-8-sig"))
        btn = len(c.get("button_fail_unique") or [])
    if visual.exists():
        v = json.loads(visual.read_text(encoding="utf-8-sig"))
        page = len(v.get("page_fails") or [])
    if static.exists():
        risks = len(json.loads(static.read_text(encoding="utf-8-sig")))
    if rtl.exists():
        rows = json.loads(rtl.read_text(encoding="utf-8-sig"))
        overflow_n = sum(1 for r in rows if r.get("contact_overflow"))
    print(
        f"SUMMARY unique_btn_fails={btn} visual_page_fails={page} "
        f"static_risks={risks} contact_overflow_sites={overflow_n}",
        flush=True,
    )
    if btn == 0 and page == 0:
        print("DONE_GATE: contrast+visual clean (still sync report if shipping)", flush=True)
    else:
        print("DONE_GATE: fails remain — fix CSS then re-run --phase final", flush=True)


def main() -> None:
    ap = argparse.ArgumentParser(description="Run landing-batch QA pipeline")
    ap.add_argument("--batch", required=True, type=Path)
    ap.add_argument(
        "--phase",
        choices=("all", "scan", "final"),
        default="all",
        help="all/scan: inventory+static+contrast+visual+rtl; final: full contrast+visual+rtl",
    )
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--from-fails", action="store_true")
    args = ap.parse_args()
    batch = args.batch.resolve()
    if not batch.is_dir():
        raise SystemExit(f"batch not found: {batch}")

    workers = str(max(1, args.workers))
    contrast_extra = ["--workers", workers]
    if args.from_fails:
        contrast_extra.append("--from-fails")

    # visual mode: spot for scan, full for all/final
    if args.phase == "scan":
        visual_mode = "spot"
    else:
        visual_mode = "full"

    rc = 0
    if args.phase in ("all", "scan"):
        rc |= run("inventory.py", batch)
        rc |= run("static_hover_risk.py", batch)
        rc |= run("contrast_scan.py", batch, contrast_extra)
        rc |= run("visual_scan.py", batch, ["--mode", visual_mode])
        rc |= run("rtl_overflow.py", batch)
    elif args.phase == "final":
        # assume inventory exists; refresh if missing
        if not (batch / "_qa-inventory.json").exists():
            rc |= run("inventory.py", batch)
        rc |= run("contrast_scan.py", batch, contrast_extra)
        rc |= run("visual_scan.py", batch, ["--mode", "full"])
        rc |= run("rtl_overflow.py", batch)

    summarize(batch)
    raise SystemExit(rc)


if __name__ == "__main__":
    main()
