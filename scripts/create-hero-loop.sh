#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"

# Keep hero.mp4 as the source. Encode the return trip into the video so native
# looping, frame callbacks, and pause/resume work in both directions.
# Exclude both endpoint frames from the return trip to avoid a pause at each turn.
# 720p is ample for the renderer's 300-column grid and keeps the doubled clip small.
"${FFMPEG_BIN:-ffmpeg}" -hide_banner -y \
  -i "$repo_root/public/assets/hero/hero.mp4" \
  -filter_complex \
    '[0:v]scale=1280:-2,split[forward][reverse];[forward]setpts=PTS-STARTPTS[f];[reverse]trim=start_frame=1,reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[f][r]concat=n=2:v=1:a=0[v]' \
  -map '[v]' -an -r 30 -fps_mode cfr \
  -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -movflags +faststart \
  "$repo_root/public/assets/hero/hero-loop.mp4"
