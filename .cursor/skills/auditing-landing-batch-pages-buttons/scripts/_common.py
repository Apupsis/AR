#!/usr/bin/env python3
"""Shared helpers for landing-batch QA scanners."""
from __future__ import annotations

import argparse
import json
import socket
import subprocess
import sys
import time
from pathlib import Path

CONTACT_CANDIDATES = (
    "reach-us/",
    "support/",
    "help/",
    "get-started/",
    "say-hello/",
    "message-us/",
    "contact/",
    "feedback/",
    "ask-us/",
    "get-in-touch/",
)


def free_port() -> int:
    s = socket.socket()
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


def start_site_server(public: Path, settle_s: float = 0.3):
    """Start python -m http.server in public/. Returns (proc, port)."""
    port = free_port()
    proc = subprocess.Popen(
        [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=str(public),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(settle_s)
    return proc, port


def stop_proc(proc) -> None:
    if proc is None:
        return
    proc.terminate()
    try:
        proc.wait(timeout=2)
    except Exception:
        proc.kill()


def parse_batch_arg(argv: list[str] | None = None) -> Path:
    p = argparse.ArgumentParser(description="Landing batch QA scanner")
    p.add_argument(
        "--batch",
        required=True,
        type=Path,
        help="Batch root containing site folders with public/",
    )
    args = p.parse_args(argv)
    batch = args.batch.resolve()
    if not batch.is_dir():
        raise SystemExit(f"batch not found: {batch}")
    return batch


def discover_sites(batch: Path) -> list[dict]:
    sites = []
    for d in sorted(batch.iterdir()):
        if not d.is_dir() or d.name.startswith("_") or d.name.startswith("."):
            continue
        public = d / "public"
        if not (public / "index.html").exists():
            continue
        pages = sorted(
            str(h.relative_to(public)).replace("\\", "/")
            for h in public.rglob("index.html")
        )
        sites.append({"site": d.name, "pages": pages})
    return sites


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def load_inventory(batch: Path) -> dict:
    inv_path = batch / "_qa-inventory.json"
    if inv_path.exists():
        return json.loads(inv_path.read_text(encoding="utf-8-sig"))
    sites = discover_sites(batch)
    inv = {"batch": str(batch), "sites": sites, "site_count": len(sites)}
    write_json(inv_path, inv)
    return inv


def load_contrast_results(batch: Path) -> dict | None:
    path = batch / "_qa-contrast-results.json"
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8-sig"))


def page_url(port: int, rel: str) -> str:
    if rel == "index.html":
        return f"http://127.0.0.1:{port}/"
    return f"http://127.0.0.1:{port}/" + rel.replace("index.html", "")


def contact_rel_for_site(pages: list[str]) -> str | None:
    """Return first contact-like page rel path if present in inventory pages."""
    page_set = set(pages)
    for cand in CONTACT_CANDIDATES:
        rel = cand.rstrip("/") + "/index.html"
        if rel in page_set:
            return rel
        if cand.rstrip("/") + ".html" in page_set:
            return cand.rstrip("/") + ".html"
    return None
