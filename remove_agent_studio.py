import re

with open('zypher_ai.html', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')

# 1. Remove CSS block: from '/* -- AGENT STUDIO SLIDE -- */' to the line before '/* TiltedCard Component'
start_css = None
end_css = None
for i, line in enumerate(lines):
    if '/* ── AGENT STUDIO SLIDE ── */' in line and start_css is None:
        start_css = i
    if start_css is not None and '/* TiltedCard Component from React Bits */' in line:
        end_css = i
        break

if start_css is not None and end_css is not None:
    lines = lines[:start_css] + lines[end_css:]
    print(f"CSS block removed: lines {start_css+1} to {end_css}")
else:
    print(f"CSS markers not found: start={start_css}, end={end_css}")

content2 = '\n'.join(lines)

# 2. Remove the nav CTA link for agent-studio-slide
content2 = re.sub(r'\s*<a href="#agent-studio-slide"[^>]*>[^<]*</a>\s*\n?', '\n', content2)

# 3. Remove the HTML section
content2 = re.sub(r'\s*<!-- AGENT STUDIO SLIDE -->\s*\n\s*<section id="agent-studio-slide">.*?</section>\s*\n?', '\n', content2, flags=re.DOTALL)

# 4. Remove the JS block for agent studio slide scroll reveal
content2 = re.sub(r'\s*// ── AGENT STUDIO SLIDE: Scroll reveal animation ──.*?\)\(\);\s*\n?', '\n', content2, flags=re.DOTALL)

# 5. Clean up any leftover comment
content2 = content2.replace('/* Agent Studio Slide styles removed */\n', '')

with open('zypher_ai.html', 'w', encoding='utf-8') as f:
    f.write(content2)

print('Done. File updated successfully.')