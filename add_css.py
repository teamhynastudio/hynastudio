css = """
<style>
  .team-quote-container {
      display: flex;
      flex-direction: column;
      gap: 60px;
      align-items: center;
      width: 100%;
      padding: 0 20px;
  }

  .quote-card {
    width: 100%;
    max-width: 1000px;
    background: #0a0a0a;
    position: relative;
    display: grid;
    grid-template-columns: minmax(300px, 45%) 1fr;
    grid-template-rows: auto 120px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.18);
  }

  .quote-photo {
    grid-column: 1;
    grid-row: 1 / span 2;
    position: relative;
    background: linear-gradient(180deg,#1a1a1a 0%, #050505 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 400px;
    border-right: 1px solid rgba(255,255,255,0.18);
  }
  .quote-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .quote-area {
    grid-column: 2;
    grid-row: 1;
    padding: clamp(30px, 5vw, 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid rgba(255,255,255,0.18);
  }
  .quote-text {
    color: #f2f2f2;
    font-size: clamp(24px, 3vw, 34px);
    line-height: 1.28;
    font-weight: 500;
    letter-spacing: -0.3px;
  }
  .quote-note {
    margin-top: clamp(30px, 4vw, 70px);
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .quote-asterisk {
    color: #8a8a8a;
    font-size: 20px;
    line-height: 1;
  }
  .quote-note-text {
    color: #8a8a8a;
    font-size: 15px;
    line-height: 1.5;
  }

  .quote-bio-area {
    grid-column: 2;
    grid-row: 2;
    padding: clamp(20px, 3vw, 32px) clamp(30px, 5vw, 60px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .quote-bio-details {
      display: flex;
      flex-direction: column;
  }
  
  .quote-bio-area .quote-name {
    color: #f2f2f2;
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 4px;
    font-family: 'Sora', sans-serif;
  }
  .quote-bio-area .quote-role {
    color: #9a9a9a;
    font-size: 15px;
    line-height: 1.4;
  }
  
  .quote-socials {
      display: flex;
      gap: 12px;
  }
  
  .quote-socials a {
      color: #f2f2f2;
      opacity: 0.6;
      font-size: 16px;
      transition: opacity 0.2s ease;
      text-decoration: none;
  }
  
  .quote-socials a:hover {
      opacity: 1;
  }

  @media (max-width: 768px) {
    .quote-card {
        grid-template-columns: 1fr;
        grid-template-rows: 350px auto auto;
        max-width: 500px;
    }
    .quote-photo {
        grid-column: 1;
        grid-row: 1;
        border-right: none;
        border-bottom: 1px solid rgba(255,255,255,0.18);
    }
    .quote-area {
        grid-column: 1;
        grid-row: 2;
        padding: 40px 30px;
    }
    .quote-bio-area {
        grid-column: 1;
        grid-row: 3;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        height: auto;
        padding: 24px 30px;
    }
  }
</style>
"""

def add_css(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    target = '<!-- OUR PEOPLE GRID -->'
    if target in content and '<style>\n  .team-quote-container' not in content:
        new_content = content.replace(target, css + '\n' + target)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Added CSS to {filepath}")
    else:
        print(f"Target not found or CSS already added in {filepath}")

add_css('index.html')
add_css('team.html')
