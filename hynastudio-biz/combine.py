import re
from bs4 import BeautifulSoup
import os

files = [
    ('hynabiz-hero.html', 'section-hero'),
    ('hynabiz-nolimit.html', 'section-nolimit'),
    ('biz.html', 'section-biz')
]

combined_links = set()
combined_styles = []
combined_bodies = []
combined_scripts = []

for filename, section_class in files:
    with open(filename, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    
    # 1. Links (fonts, etc.)
    for link in soup.find_all('link'):
        combined_links.add(str(link))
        
    # 2. Styles
    for style in soup.find_all('style'):
        css = style.string
        if not css:
            continue
        
        # Scope body, html and * WITHOUT breaking classes like .hero-body
        css = css.replace('html,body{', f'.{section_class}{{')
        css = css.replace('html, body {', f'.{section_class} {{')
        css = re.sub(r'(?<![.\w-])body\s*\{', f'.{section_class} {{', css)
        css = re.sub(r'(?<![.\w-])html\s*\{', f'.{section_class}-html {{', css)
        css = re.sub(r'\*\s*\{', f'.{section_class} * {{', css)
        
        combined_styles.append(f"/* Styles from {filename} */\n" + css)
        
    # 3. Body content
    body = soup.find('body')
    if body:
        # Get all attributes of the original body
        attrs = body.attrs
        attr_str = " ".join([f'{k}="{v}"' if isinstance(v, str) else f'{k}="{" ".join(v)}"' for k, v in attrs.items()])
        
        body_inner = "".join([str(c) for c in body.children])
        
        # We wrap the content in a div that acts like the body
        wrapper = f'\n<!-- Section from {filename} -->\n<div class="{section_class}" {attr_str}>\n{body_inner}\n</div>\n'
        combined_bodies.append(wrapper)
        
    # 4. Scripts in head
    for script in soup.find_all('script'):
        if not script.parent.name == 'body':
            combined_scripts.append(str(script))

# Generate final HTML
links_str = "\n    ".join(combined_links)
styles_str = "\n".join(combined_styles)
scripts_str = "\n    ".join(combined_scripts)
bodies_str = "".join(combined_bodies)

final_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HynaBiz</title>
    
    {links_str}
    
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        html, body {{ width: 100%; overflow-x: hidden; }}
        {styles_str}
    </style>
    
    {scripts_str}
</head>
<body>
    {bodies_str}
</body>
</html>
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Created index.html successfully!")
