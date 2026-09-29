#!/usr/bin/env python3
"""
Render the C learning roadmap to SVG from tools/roadmap.json.

    node tools/roadmap-to-json.mjs      # data  -> tools/roadmap.json
    python3 tools/roadmap-svg.py        # json  -> tools/roadmap.svg
    rsvg-convert -w 1400 -b '#06051a' tools/roadmap.svg \
        -o public/images/c-roadmap.png

The PNG is what the course page shows; the SVG is kept next
to it as the editable source.
"""
import json, html, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(HERE, "roadmap.json")))

W = 1000
FONT = "DejaVu Sans, Liberation Sans, sans-serif"
MONO = "DejaVu Sans Mono, Liberation Mono, monospace"

C = {
    "bg": "#06051a", "panel": "#0d0a28", "panel2": "#14103a",
    "line": "#2a2560", "bright": "#f2f6ff", "dim": "#8a92c2",
    "cyan": "#00eaff", "green": "#39f58a",
}
TONE = {
    "green": "#39f58a", "yellow": "#ffc857", "orange": "#fb923c",
    "red": "#ff3b6b", "purple": "#9d4edd",
}


def esc(t):
    return html.escape(str(t), quote=True)


M        = 46          # outer margin
SPINE    = 78          # x of the flow spine
NODE_X   = SPINE + 32  # level cards start here, clear of the spine
NODE_W   = W - NODE_X - M
NODE_H   = 54
GAP      = 14
PAD_T    = 62
PAD_B    = 20
BAND_GAP = 26

bands, total_h = [], 0
for ph in D["phases"]:
    lv = [l for l in D["levels"] if l["number"] in ph["levels"]]
    h = PAD_T + len(lv) * NODE_H + (len(lv) - 1) * GAP + PAD_B
    bands.append((ph, lv, h))
    total_h += h + BAND_GAP

HEAD, START, FIN = 150, 104, 212
H = HEAD + START + 14 + total_h + FIN + M

o = []
add = o.append

add(f'''<defs>
  <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="{C['cyan']}"/><stop offset="50%" stop-color="#7c5cff"/><stop offset="100%" stop-color="#ff2ed1"/>
  </linearGradient>
  <radialGradient id="glow" cx="50%" cy="0%" r="75%">
    <stop offset="0%" stop-color="{C['cyan']}" stop-opacity="0.15"/><stop offset="100%" stop-color="{C['cyan']}" stop-opacity="0"/>
  </radialGradient>
  <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>''')

add(f'<rect width="{W}" height="{H}" fill="{C["bg"]}"/>')
add(f'<rect width="{W}" height="380" fill="url(#glow)"/>')

# faint circuit grid
add('<g opacity="0.55">')
for gx in range(0, W + 1, 46):
    add(f'<line x1="{gx}" y1="0" x2="{gx}" y2="{H}" stroke="#00eaff" stroke-opacity="0.05"/>')
for gy in range(0, H + 1, 46):
    add(f'<line x1="0" y1="{gy}" x2="{W}" y2="{gy}" stroke="#00eaff" stroke-opacity="0.05"/>')
add('</g>')

# ---- header ----
add(f'<text x="{M}" y="70" font-family="{FONT}" font-size="34" font-weight="bold" fill="{C["bright"]}">C Programming</text>')
add(f'<text x="{M}" y="108" font-family="{FONT}" font-size="34" font-weight="bold" fill="url(#neon)">Learning Roadmap</text>')
add(f'<text x="{M}" y="136" font-family="{FONT}" font-size="14" fill="{C["dim"]}">'
    f'{len(D["levels"])} levels &#183; {D["total"]} topics &#183; {len(D["phases"])} stages &#183; beginner to advanced</text>')

# ---- start ----
sy = HEAD
sh = START - 18
add(f'<rect x="{M}" y="{sy}" width="{W-M*2}" height="{sh}" rx="4" fill="{C["panel"]}" stroke="{C["line"]}"/>')
add(f'<rect x="{M}" y="{sy}" width="4" height="{sh}" fill="{C["cyan"]}"/>')
add(f'<text x="{NODE_X}" y="{sy+34}" font-family="{FONT}" font-size="12" font-weight="bold" letter-spacing="2.5" fill="{C["cyan"]}">START HERE</text>')
add(f'<text x="{NODE_X}" y="{sy+62}" font-family="{FONT}" font-size="15" font-weight="bold" fill="{C["bright"]}">No prior coding experience needed</text>')
add(f'<text x="{NODE_X}" y="{sy+84}" font-family="{FONT}" font-size="13" fill="{C["dim"]}">A text editor and a C compiler is all you require.</text>')

top = sy + sh
end = top + total_h

# ---- stage bands ----
cy = top + 22
for ph, lv, bh in bands:
    by = cy
    tone = TONE[ph["tone"]]
    add(f'<rect x="{M}" y="{by}" width="{W-M*2}" height="{bh}" rx="4" fill="{C["panel"]}" fill-opacity="0.7" stroke="{C["line"]}"/>')
    add(f'<rect x="{M}" y="{by}" width="{W-M*2}" height="3" fill="{tone}" opacity="0.9"/>')

    lbl = f'STAGE {ph["number"]}  \u00b7  {ph["title"].upper()}'
    lw = len(lbl) * 7.6 + 40
    add(f'<rect x="{NODE_X}" y="{by+18}" width="{lw:.0f}" height="26" rx="3" fill="{tone}" fill-opacity="0.14" stroke="{tone}" stroke-opacity="0.5"/>')
    add(f'<text x="{NODE_X+16}" y="{by+36}" font-family="{FONT}" font-size="11" font-weight="bold" letter-spacing="1.5" fill="{tone}">{esc(lbl)}</text>')
    add(f'<text x="{W-M-20}" y="{by+36}" text-anchor="end" font-family="{FONT}" font-size="12.5" fill="{C["dim"]}">{esc(ph["goal"])}</text>')

    ny = by + PAD_T
    for l in lv:
        add(f'<rect x="{NODE_X}" y="{ny}" width="{NODE_W}" height="{NODE_H}" rx="3" fill="{C["panel2"]}" fill-opacity="0.9" stroke="{C["line"]}"/>')
        add(f'<text x="{NODE_X+18}" y="{ny+25}" font-family="{MONO}" font-size="11" font-weight="bold" letter-spacing="1.2" fill="{tone}">LEVEL {l["number"]}</text>')
        add(f'<text x="{NODE_X+18}" y="{ny+44}" font-family="{FONT}" font-size="14.5" font-weight="bold" fill="{C["bright"]}">{esc(l["title"])}</text>')
        tc = f'{len(l["topics"])} topic' + ("" if len(l["topics"]) == 1 else "s")
        add(f'<text x="{NODE_X+NODE_W-18}" y="{ny+34}" text-anchor="end" font-family="{FONT}" font-size="12.5" fill="{C["dim"]}">{tc}</text>')
        ny += NODE_H + GAP
    cy += bh + BAND_GAP

# ---- spine: drawn after the bands, solid segments per stage.
# A gradient stroke cannot be used here: objectBoundingBox
# gradients need a non-empty bbox and a vertical line has none.
add(f'<circle cx="{SPINE}" cy="{top}" r="10" fill="{C["bg"]}" stroke="{C["cyan"]}" stroke-width="3" filter="url(#soft)"/>')
add(f'<circle cx="{SPINE}" cy="{top}" r="3.5" fill="{C["cyan"]}"/>')
cy2 = top + 22
for ph, lv, bh in bands:
    tone = TONE[ph["tone"]]
    ny = cy2 + PAD_T
    centers = [ny + NODE_H / 2 + i * (NODE_H + GAP) for i in range(len(lv))]
    for a, b in zip(centers, centers[1:]):
        add(f'<line x1="{SPINE}" y1="{a}" x2="{SPINE}" y2="{b}" stroke="{tone}" stroke-width="2.5" opacity="0.5"/>')
    for c in centers:
        add(f'<circle cx="{SPINE}" cy="{c}" r="8.5" fill="{C["bg"]}" stroke="{tone}" stroke-width="3"/>')
        add(f'<circle cx="{SPINE}" cy="{c}" r="3" fill="{tone}"/>')
    cy2 += bh + BAND_GAP

# ---- finish ----
fy = end + 14
fh = FIN - 40
add(f'<rect x="{M}" y="{fy}" width="{W-M*2}" height="{fh}" rx="4" fill="{C["panel"]}" stroke="{C["green"]}" stroke-opacity="0.5"/>')
add(f'<rect x="{M}" y="{fy}" width="4" height="{fh}" fill="{C["green"]}"/>')
add(f'<text x="{NODE_X}" y="{fy+34}" font-family="{FONT}" font-size="12" font-weight="bold" letter-spacing="2.5" fill="{C["green"]}">WHERE THIS TAKES YOU</text>')
add(f'<text x="{NODE_X}" y="{fy+60}" font-family="{FONT}" font-size="14" fill="{C["bright"]}">Write complete C programs that read and write files, manage their own</text>')
add(f'<text x="{NODE_X}" y="{fy+80}" font-family="{FONT}" font-size="14" fill="{C["bright"]}">memory, group data into structures and organise a large project.</text>')
for i, s in enumerate(D["finish"]["skills"]):
    sx = NODE_X + (i % 2) * 420
    yy = fy + 110 + (i // 2) * 26
    add(f'<text x="{sx}" y="{yy}" font-family="{MONO}" font-size="12" font-weight="bold" fill="{C["green"]}">\u2713</text>')
    add(f'<text x="{sx+18}" y="{yy}" font-family="{FONT}" font-size="12.5" fill="{C["dim"]}">{esc(s)}</text>')
add(f'<circle cx="{SPINE}" cy="{fy+fh}" r="10" fill="{C["green"]}" stroke="{C["green"]}" stroke-width="3" filter="url(#soft)"/>')
add(f'<circle cx="{SPINE}" cy="{fy+fh}" r="3.5" fill="{C["bg"]}"/>')

out = os.path.join(HERE, "roadmap.svg")
open(out, "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
    + "".join(o) + "</svg>")
print("wrote", out, f"{W}x{H}")
