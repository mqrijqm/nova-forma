"""Convert generated PNGs (_gen/out) into web-ready WebP files (public/media)."""
import os, sys
from PIL import Image

SRC, DST = '_gen/out', 'public/media'
os.makedirs(DST, exist_ok=True)
for f in sorted(os.listdir(SRC)):
    if not f.endswith('.png'):
        continue
    out = os.path.join(DST, f[:-4] + '.webp')
    if os.path.exists(out) and '--force' not in sys.argv:
        continue
    im = Image.open(os.path.join(SRC, f)).convert('RGB')
    w, h = im.size
    maxw = 2400 if w > h else 1200
    if w > maxw:
        im = im.resize((maxw, round(h * maxw / w)), Image.LANCZOS)
    im.save(out, 'WEBP', quality=82, method=6)
    print(f, '->', im.size, os.path.getsize(out) // 1024, 'KB')
