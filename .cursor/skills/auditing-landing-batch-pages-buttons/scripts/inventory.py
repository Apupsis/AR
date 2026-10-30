#!/usr/bin/env python3
"""Build _qa-inventory.json for a landing batch."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import discover_sites, parse_batch_arg, write_json


def main() -> None:
    batch = parse_batch_arg()
    sites = discover_sites(batch)
    pages = sum(len(s["pages"]) for s in sites)
    inv = {
        "batch": str(batch),
        "sites": sites,
        "site_count": len(sites),
        "page_count": pages,
    }
    out = batch / "_qa-inventory.json"
    write_json(out, inv)
    print(f"sites={len(sites)} pages={pages} wrote={out}")


if __name__ == "__main__":
    main()
