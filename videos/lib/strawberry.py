"""
Shared Manim base for Strawberry chapter videos.

Narration is synthesized with macOS `say` (free, offline) and cached by
text hash. Manim's own add_sound proved unreliable, so each scene records a
cue list (start time, wav) to build/cues/<Scene>.json and render.py mixes
the narration onto the silent render with ffmpeg. Each `with self.voiceover(text) as vo:`
block exposes `vo.duration` so animations can be paced to the speech; on
exit the scene waits out any remaining audio so narration never overlaps.
"""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path

from manim import (
    DOWN,
    UP,
    FadeIn,
    FadeOut,
    MathTex,
    Scene,
    Tex,
    Text,
    VGroup,
    config,
    ManimColor,
)

# Warm strawberry palette on a light background (mirrors src/app/globals.css).
BG = ManimColor("#FDF8F4")
INK = ManimColor("#3A2320")
MUTED = ManimColor("#8A6F68")
PRIMARY = ManimColor("#D63A4A")  # strawberry red
SECONDARY = ManimColor("#2F7F8F")  # teal, for a second curve/quantity
ACCENT = ManimColor("#E08A1E")  # amber highlight
GREEN = ManimColor("#3D8B57")
PURPLE = ManimColor("#7A4FB5")
GRID = ManimColor("#E7DCD5")

VOICE = os.environ.get("STRAWBERRY_VOICE", "Samantha")
RATE = os.environ.get("STRAWBERRY_RATE", "175")
ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".audio-cache"
CUES = ROOT / "build" / "cues"

config.background_color = BG


def _synth(text: str) -> tuple[Path, float]:
    CACHE.mkdir(exist_ok=True)
    key = hashlib.sha1(f"{VOICE}|{RATE}|{text}".encode()).hexdigest()[:16]
    wav = CACHE / f"{key}.wav"
    if not wav.exists():
        aiff = CACHE / f"{key}.aiff"
        subprocess.run(["say", "-v", VOICE, "-r", RATE, "-o", str(aiff), text], check=True)
        subprocess.run(
            ["ffmpeg", "-loglevel", "error", "-y", "-i", str(aiff), "-ar", "44100", str(wav)],
            check=True,
        )
        aiff.unlink(missing_ok=True)
    out = subprocess.run(
        [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", str(wav),
        ],
        capture_output=True, text=True, check=True,
    )
    return wav, float(out.stdout.strip())


@dataclass
class Voiceover:
    duration: float


class NarratedScene(Scene):
    """Scene with `voiceover()` blocks. Default text color is INK."""

    def setup(self):
        self._cues: list[dict] = []
        # Per-scene TeX dir: Manim's LaTeX cleanup deletes shared temp files,
        # which races when several chapters render in parallel.
        config.tex_dir = str(ROOT / "build" / "tex" / type(self).__name__)
        Text.set_default(color=INK, font="Helvetica Neue")
        MathTex.set_default(color=INK)
        Tex.set_default(color=INK)

    @contextmanager
    def voiceover(self, text: str):
        wav, duration = _synth(text)
        start = self.renderer.time
        self._cues.append({"start": start, "file": str(wav), "text": text})
        yield Voiceover(duration)
        remaining = duration - (self.renderer.time - start)
        if remaining > 0.05:
            self.wait(remaining)
        self.wait(0.25)

    def tear_down(self):
        CUES.mkdir(parents=True, exist_ok=True)
        (CUES / f"{type(self).__name__}.json").write_text(
            json.dumps({"duration": self.renderer.time, "cues": self._cues}, indent=1)
        )

    def title_card(self, kicker: str, title: str, narration: str):
        k = Text(kicker, font_size=26, color=PRIMARY, weight="BOLD")
        t = Text(title, font_size=48, color=INK, weight="BOLD")
        if t.width > config.frame_width - 1:
            t.scale_to_fit_width(config.frame_width - 1)
        g = VGroup(k, t).arrange(DOWN, buff=0.35)
        with self.voiceover(narration) as vo:
            self.play(FadeIn(k, shift=0.2 * UP), FadeIn(t, shift=0.2 * UP), run_time=min(1.5, vo.duration))
        self.play(FadeOut(g))

    def clear_scene(self, run_time: float = 0.6):
        if self.mobjects:
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=run_time)
