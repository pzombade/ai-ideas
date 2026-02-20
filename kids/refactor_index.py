import os
import re

html_path = '/home/prashant/work/ai/ai-ideas/kids/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make dirs
base_dir = os.path.dirname(html_path)
os.makedirs(os.path.join(base_dir, 'css'), exist_ok=True)
os.makedirs(os.path.join(base_dir, 'js'), exist_ok=True)

# Extract CSS
# Note: we use non-greedy matching but assume only one main style block
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    with open(os.path.join(base_dir, 'css', 'style.css'), 'w', encoding='utf-8') as f:
        f.write(style_match.group(1).strip() + '\n')
    content = content[:style_match.start()] + '<link rel="stylesheet" href="css/style.css">' + content[style_match.end():]

# Extract JS
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    with open(os.path.join(base_dir, 'js', 'main.js'), 'w', encoding='utf-8') as f:
        f.write(script_match.group(1).strip() + '\n')
    content = content[:script_match.start()] + '<script src="js/main.js"></script>' + content[script_match.end():]

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactoring complete.")
