#!/bin/bash
# Seamless 10s loops for the home hover plane (from _gen/out/h-*.png).
N=300
for in in _gen/out/h-*.png; do
  slug=$(basename "$in" .png); slug=${slug#h-}
  out="public/media/loop-hover-$slug.mp4"
  [ -f "$out" ] && continue
  ffmpeg -y -loglevel error -loop 1 -i "$in" -vf "scale=4000:-2:flags=lanczos,zoompan=z='1.04+0.06*(1-cos(2*PI*on/$N))/2':x='iw/2-(iw/zoom/2)+iw*0.012*sin(2*PI*on/$N)':y='ih/2-(ih/zoom/2)+ih*0.01*cos(2*PI*on/$N)':d=$N:s=1080x720:fps=30,format=yuv420p" -frames:v $N -c:v libx264 -preset slow -crf 25 -movflags +faststart -an "$out"
  echo "$out $(du -k "$out" | cut -f1)KB"
done
