"""Generate / edit images with Stability AI on Amazon Bedrock (us-west-2).

Usage:
  python scripts/gen-image.py generate <out.png> "<prompt>" [--model ultra|sd35|core] [--aspect 1:1] [--seed N] [--neg "..."]
  python scripts/gen-image.py replace  <in.png> <out.png> "<search>" "<prompt>" [--seed N]
  python scripts/gen-image.py nobg     <in.png> <out.png>
  python scripts/gen-image.py erase    <in.png> <mask.png> <out.png>   (white = erase)
  python scripts/gen-image.py inpaint  <in.png> <mask.png> <out.png> "<prompt>"

Every call is appended to scripts/.gen-ledger.csv with an estimated cost.
Needs boto3 + AWS credentials with Bedrock access.
"""
import argparse
import base64
import csv
import json
import time
from pathlib import Path

import boto3

REGION = "us-west-2"
MODELS = {
    "ultra": ("stability.stable-image-ultra-v1:1", 0.14),
    "sd35": ("stability.sd3-5-large-v1:0", 0.08),
    "core": ("stability.stable-image-core-v1:1", 0.04),
    "replace": ("us.stability.stable-image-search-replace-v1:0", 0.08),
    "nobg": ("us.stability.stable-image-remove-background-v1:0", 0.08),
    "erase": ("us.stability.stable-image-erase-object-v1:0", 0.08),
    "inpaint": ("us.stability.stable-image-inpaint-v1:0", 0.08),
}
LEDGER = Path(__file__).with_name(".gen-ledger.csv")

client = boto3.client("bedrock-runtime", region_name=REGION)


def spent() -> float:
    if not LEDGER.exists():
        return 0.0
    with LEDGER.open() as f:
        return sum(float(r["cost"]) for r in csv.DictReader(f))


def call(kind: str, body: dict, out: Path, note: str, budget: float):
    model_id, cost = MODELS[kind]
    if spent() + cost > budget:
        raise SystemExit(f"Budget stop: spent ${spent():.2f}, next call ${cost:.2f}, cap ${budget:.2f}")
    t = time.time()
    res = client.invoke_model(modelId=model_id, body=json.dumps(body))
    data = json.loads(res["body"].read())
    reasons = data.get("finish_reasons") or [None]
    if reasons[0]:
        print("finish_reason:", reasons[0])
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(base64.b64decode(data["images"][0]))
    new = not LEDGER.exists()
    with LEDGER.open("a", newline="") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["time", "kind", "cost", "out", "note"])
        w.writerow([time.strftime("%H:%M:%S"), kind, cost, out.name, note[:120]])
    print(f"{out} ({time.time() - t:.1f}s)  total spent ${spent():.2f}")


def b64(p: str) -> str:
    return base64.b64encode(Path(p).read_bytes()).decode()


ap = argparse.ArgumentParser()
ap.add_argument("mode", choices=["generate", "replace", "nobg", "erase", "inpaint"])
ap.add_argument("args", nargs="+")
ap.add_argument("--model", default="ultra")
ap.add_argument("--aspect", default="1:1")
ap.add_argument("--seed", type=int, default=0)
ap.add_argument("--neg", default="")
ap.add_argument("--budget", type=float, default=3.0)
a = ap.parse_args()

if a.mode == "generate":
    out, prompt = a.args
    body = {"prompt": prompt, "aspect_ratio": a.aspect, "seed": a.seed, "output_format": "png"}
    if a.neg:
        body["negative_prompt"] = a.neg
    call(a.model, body, Path(out), prompt, a.budget)
elif a.mode == "replace":
    src, out, search, prompt = a.args
    body = {"image": b64(src), "search_prompt": search, "prompt": prompt, "seed": a.seed, "output_format": "png"}
    if a.neg:
        body["negative_prompt"] = a.neg
    call("replace", body, Path(out), f"replace {search} -> {prompt}", a.budget)
elif a.mode == "erase":
    src, mask, out = a.args
    call("erase", {"image": b64(src), "mask": b64(mask), "grow_mask": 6, "seed": a.seed, "output_format": "png"}, Path(out), "erase", a.budget)
elif a.mode == "inpaint":
    src, mask, out, prompt = a.args
    body = {"image": b64(src), "mask": b64(mask), "prompt": prompt, "grow_mask": 8, "seed": a.seed, "output_format": "png"}
    if a.neg:
        body["negative_prompt"] = a.neg
    call("inpaint", body, Path(out), f"inpaint {prompt}", a.budget)
else:
    src, out = a.args
    call("nobg", {"image": b64(src), "output_format": "png"}, Path(out), "remove bg", a.budget)
