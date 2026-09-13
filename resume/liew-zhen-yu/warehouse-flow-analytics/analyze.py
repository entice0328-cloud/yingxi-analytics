#!/usr/bin/env python3
"""Generate a small warehouse order sample and print operating insights.

The dataset is synthetic (fixed seed). It is a portfolio exercise, not DHL data.
"""

from __future__ import annotations

import csv
import random
from collections import defaultdict
from pathlib import Path

SEED = 20260913
N_ORDERS = 4200
OUT = Path(__file__).with_name("orders.csv")

LANES = ["Inbound-A", "Inbound-B", "Outbound-North", "Outbound-South", "Returns"]
TYPES = {
    "Inbound-A": "inbound",
    "Inbound-B": "inbound",
    "Outbound-North": "outbound",
    "Outbound-South": "outbound",
    "Returns": "return",
}


def main() -> None:
    rng = random.Random(SEED)
    rows: list[dict[str, str | int | float]] = []
    for i in range(1, N_ORDERS + 1):
        lane = rng.choices(LANES, weights=[0.22, 0.18, 0.28, 0.24, 0.08], k=1)[0]
        lines = rng.randint(1, 8)
        delay = max(0, rng.gauss(1.4 if "Outbound" in lane else 0.8, 1.1))
        if lane == "Outbound-South":
            delay *= 1.55
        if lane == "Returns":
            delay *= 1.25
        scan_miss = 1 if rng.random() < (0.062 if lane == "Outbound-South" else 0.028) else 0
        same_day = 1 if delay <= 1 else 0
        rows.append(
            {
                "order_id": f"W{i:05d}",
                "lane": lane,
                "flow": TYPES[lane],
                "lines": lines,
                "delay_hours": round(delay, 2),
                "scan_miss": scan_miss,
                "same_day_complete": same_day,
            }
        )

    with OUT.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    n = len(rows)
    same_day = sum(int(r["same_day_complete"]) for r in rows) / n
    miss = sum(int(r["scan_miss"]) for r in rows) / n
    avg_delay = sum(float(r["delay_hours"]) for r in rows) / n

    by_lane: dict[str, list] = defaultdict(list)
    for r in rows:
        by_lane[str(r["lane"])].append(r)

    print(f"wrote {OUT.name}  n={n}")
    print(f"same-day complete: {same_day:.1%}")
    print(f"scan-miss rate:    {miss:.1%}")
    print(f"avg delay (h):     {avg_delay:.2f}")
    print("lane,orders,same_day,scan_miss,avg_delay")
    worst = None
    for lane, items in sorted(by_lane.items(), key=lambda kv: -len(kv[1])):
        m = len(items)
        sd = sum(int(r["same_day_complete"]) for r in items) / m
        sm = sum(int(r["scan_miss"]) for r in items) / m
        ad = sum(float(r["delay_hours"]) for r in items) / m
        print(f"{lane},{m},{sd:.1%},{sm:.1%},{ad:.2f}")
        if worst is None or sm > worst[1]:
            worst = (lane, sm, ad)

    assert worst is not None
    print(
        f"insight: {worst[0]} has the highest scan-miss "
        f"({worst[1]:.1%}) and delay {worst[2]:.2f}h — check staffing and scan compliance before adding volume."
    )


if __name__ == "__main__":
    main()
