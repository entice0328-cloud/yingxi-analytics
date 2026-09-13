# Warehouse Flow Analytics

Personal portfolio analysis. **Synthetic warehouse orders, not DHL or employer data.**

Python script builds 4,200 inbound / outbound / returns records (fixed seed) and compares same-day completion, scan-miss rate, and delay by lane.

## Findings (from `analyze.py`)

- Same-day complete: **42.9%** overall.
- Scan-miss rate: **3.4%** overall; **Outbound-South 5.4%** vs **Inbound-A 2.4%**.
- Average delay: **1.40 hours**; Outbound-South **2.22 hours**, Inbound-A **0.93 hours**.
- Outbound-South also has the weakest same-day rate (**24.2%** vs Inbound-A **56.8%**).

**Recommendation:** Do not add volume to Outbound-South until scan compliance and staffing in that lane are fixed. Inbound lanes are the operational baseline.

## Run

```bash
python3 analyze.py
```

Writes `orders.csv` and prints the lane table. Python 3.10+ is enough; no extra packages.
