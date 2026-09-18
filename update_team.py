import re

def create_quote_card(name, role, bio, photo, github, linkedin, portfolio, college, degree):
    # Ensure variables aren't strictly "#"
    socials_html = []
    if github and github != "#":
        socials_html.append(f'<a href="{github}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>')
    if linkedin and linkedin != "#":
        socials_html.append(f'<a href="{linkedin}" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>')
    if portfolio and portfolio != "#":
        socials_html.append(f'<a href="{portfolio}" target="_blank" aria-label="Portfolio"><i class="fa-solid fa-link"></i></a>')
    
    socials_str = "".join(socials_html)
    socials_block = f'<div class="quote-socials">{socials_str}</div>' if socials_str else ''
    
    note_html = ''
    if college and degree:
        note_html = f'''
        <div class="quote-note">
          <span class="quote-asterisk">*</span>
          <span class="quote-note-text">{degree}<br>{college}</span>
        </div>'''
        
    return f'''
        <div class="quote-card lp-fade-up">
            <div class="quote-photo">
                <img src="{photo}" alt="{name}" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=333&color=fff';">
            </div>
            <div class="quote-area">
                <div class="quote-text">{bio}</div>
                {note_html}
            </div>
            <div class="quote-bio-area">
                <div class="quote-bio-details">
                    <div class="quote-name">{name}</div>
                    <div class="quote-role">{role}</div>
                </div>
                {socials_block}
            </div>
        </div>'''

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract all people data
    pattern = r'<div class="our-person-card[^>]*data-name="([^"]+)"[^>]*data-role="([^"]+)"[^>]*data-bio="([^"]+)"[^>]*data-photo="([^"]+)"[^>]*data-portfolio="([^"]+)"[^>]*data-github="([^"]+)"[^>]*data-linkedin="([^"]+)"[^>]*data-college="([^"]+)"[^>]*data-degree="([^"]+)"'
    
    matches = re.finditer(pattern, content)
    cards = []
    for match in matches:
        cards.append(create_quote_card(*match.groups()))
    
    if not cards:
        print(f"No cards found in {filepath}")
        return

    # Replace the container
    cards_html = '\n'.join(cards)
    
    new_structure = f'''
                <!-- OUR PEOPLE GRID -->
                <div class="our-people-container">
                    <div class="team-quote-container">
{cards_html}
                    </div>
                </div>'''
                
    # Find the start of our-people-container and end of it
    start_str = '<!-- OUR PEOPLE GRID -->'
    # We need to find where the container ends.
    # In index.html, it's followed by "<!-- CRED & FAQ SECTION -->"
    # In team.html, it's followed by "<!-- FOOTER -->"
    
    if '<!-- CRED & FAQ SECTION -->' in content:
        end_str = '<!-- CRED & FAQ SECTION -->'
    else:
        end_str = '<!-- FOOTER -->'
        
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + new_structure + '\n\n' + ' '*8 + content[end_idx:]
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find replacement boundaries in {filepath}")

process_file('index.html')
process_file('team.html')
