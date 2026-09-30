#!/bin/bash
# Seamless 10s "breathing camera" loops from stills (cosine zoom + drift).
# usage: bash scripts/make-loops.sh
N=300
for slug in salt-silence:salt-and-silence level-light:level-of-light aura-noir:aura-noir atelier-vedra:atelier-vedra pulse-link:pulse-link; do
  src=${slug%%:*}; dst=${slug##*:}
  for kind in portrait wide; do
    in="_gen/out/p-$src-$kind.png"; out="public/media/loop-$dst-$kind.mp4"
    [ -f "$out" ] && continue
    if [ $kind = portrait ]; then W=600; H=800; UP=3000; else W=1600; H=1000; UP=5000; fi
    ffmpeg -y -loglevel error -loop 1 -i "$in" -vf "scale=$UP:-2:flags=lanczos,zoompan=z='1.03+0.05*(1-cos(2*PI*on/$N))/2':x='iw/2-(iw/zoom/2)+iw*0.01*sin(2*PI*on/$N)':y='ih/2-(ih/zoom/2)+ih*0.008*cos(2*PI*on/$N)':d=$N:s=${W}x${H}:fps=30,format=yuv420p" -frames:v $N -c:v libx264 -preset slow -crf 25 -movflags +faststart -an "$out"
    echo "$out $(du -k "$out" | cut -f1)KB"
  done
done
