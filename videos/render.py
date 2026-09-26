"""
Render one chapter video end to end.

    videos/.venv/bin/python videos/render.py <scene_file.py> <SceneClass> <output-name> [--quality l|m|h] [--sheet] [--mux-only]

1. Runs Manim (silent video; narration cues land in build/cues/<Scene>.json).
2. Mixes every narration clip at its cue time with ffmpeg.
3. Encodes a web-friendly H.264/AAC mp4 (+faststart) to public/videos/<output-name>.mp4
   and a poster frame to public/videos/<output-name>.jpg.
4. --sheet also writes build/sheets/<output-name>.jpg, a 4x6 contact sheet of
   frames spread across the whole video, for visual QA (overlaps, off-screen text).

--mux-only skips step 1 and re-mixes the existing silent render.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
PUBLIC = REPO / "public" / "videos"
BUILD = HERE / "build"
QUALITY = {"l": ("-ql", "480p15"), "m": ("-qm", "720p30"), "h": ("-qh", "1080p60")}


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, **kw)


def probe_duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    ).stdout.strip()
    return float(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("scene_file")
    ap.add_argument("scene")
    ap.add_argument("name")
    ap.add_argument("--quality", default="m", choices=QUALITY)
    ap.add_argument("--sheet", action="store_true")
    ap.add_argument("--mux-only", action="store_true")
    args = ap.parse_args()

    env = {**os.environ, "PATH": f"/Library/TeX/texbin:{os.environ['PATH']}"}
    flag, folder = QUALITY[args.quality]
    scene_file = Path(args.scene_file).resolve()
    media = BUILD / "media"
    if not args.mux_only:
        run(
            [str(HERE / ".venv/bin/manim"), flag, "--disable_caching", "--media_dir", str(media),
             str(scene_file), args.scene],
            env=env, cwd=HERE,
        )
    silent = media / "videos" / scene_file.stem / folder / f"{args.scene}.mp4"
    cues = json.loads((BUILD / "cues" / f"{args.scene}.json").read_text())["cues"]
    if not cues:
        sys.exit("scene recorded no narration cues")

    PUBLIC.mkdir(parents=True, exist_ok=True)
    out = PUBLIC / f"{args.name}.mp4"
    inputs: list[str] = ["-i", str(silent)]
    filters: list[str] = []
    for i, cue in enumerate(cues, start=1):
        inputs += ["-i", cue["file"]]
        ms = int(round(cue["start"] * 1000))
        filters.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(1, len(cues) + 1))
    # apad + -t: keep animation that runs past the last narration clip.
    filters.append(f"{mix}amix=inputs={len(cues)}:normalize=0:dropout_transition=0,apad[aout]")
    run([
        "ffmpeg", "-nostdin", "-loglevel", "error", "-y", *inputs,
        "-filter_complex", ";".join(filters),
        "-map", "0:v", "-map", "[aout]",
        "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-t", f"{probe_duration(silent):.3f}",
        str(out),
    ])
    run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-ss", "2", "-i", str(out), "-frames:v", "1",
         "-q:v", "4", str(PUBLIC / f"{args.name}.jpg")])

    if args.sheet:
        sheets = BUILD / "sheets"
        sheets.mkdir(parents=True, exist_ok=True)
        run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-i", str(out), "-vf",
             f"fps=24/{probe_duration(out):.3f},scale=480:-1,tile=4x6:padding=4:color=gray", "-frames:v", "1",
             str(sheets / f"{args.name}.jpg")])

    size = out.stat().st_size / 1e6
    print(f"OK {out.relative_to(REPO)} {probe_duration(out):.1f}s {size:.1f}MB")


if __name__ == "__main__":
    main()
