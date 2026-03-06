import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find elements inside [] that might have spaces, specifically looking at rgba(...)
    # For simplicity, we can look for rgba( and replace spaces inside it
    # But a safer approach is finding classNames and stripping spaces inside []
    
    def replacer(match):
        # Everything inside the match (which is inside [])
        inner = match.group(1)
        # Remove spaces in the inner content
        return '[' + inner.replace(' ', '') + ']'

    # Match anything inside brackets that's part of a Tailwind class (e.g. shadow-[...])
    new_content = re.sub(r'\[(.*?)\]', replacer, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {filepath}")

for root, _, files in os.walk('c:/Users/Admin/OneDrive/Desktop/Vehisecure/frontend/src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css'):
            process_file(os.path.join(root, file))
