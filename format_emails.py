import re
import json

def parse_email1():
    with open('email1.txt', 'r') as f:
        text = f.read()
    
    # Split into days based on Day X at the start of a line
    days = re.split(r'(?m)^Day (\d+)\s*$', text)
    
    header = days[0].strip().split('\n')
    title = header[0]
    desc = '\n'.join(header[1:])
    
    html = f"""<div class="sequence-info" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--glass-border);">
    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">{title}</h2>
    <p style="color: var(--text-secondary);">{desc}</p>
</div>
"""
    
    for i in range(1, len(days), 2):
        day_num = days[i].strip()
        content_lines = days[i+1].strip().split('\n')
        
        # Check if the first line is the condition "If they don't open..."
        condition = ""
        # The condition is actually at the end of the previous block in some cases, so let's adjust parsing.
        
    return html

# A simpler, more robust robust block-based parser
def build_html_1():
    with open('email1.txt', 'r') as f:
        lines = [line.strip() for line in f.readlines()]
    
    out = []
    out.append(f'<div class="sequence-info" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--glass-border);">')
    out.append(f'    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">{lines[0]}</h2>')
    out.append(f'    <p style="color: var(--text-secondary);">{lines[1]}</p>')
    out.append('</div>')
    
    in_email = False
    
    for line in lines[2:]:
        if line.startswith('Day '):
            if in_email:
                out.append('</div>')
                out.append('<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">')
            out.append('<div class="email-content">')
            out.append(f'    <h4 style="color: var(--accent); margin-bottom: 15px;">{line}</h4>')
            in_email = True
        elif line.startswith('Subject Line:'):
            out.append(f'    <p><strong>{line}</strong></p><br>')
        elif line.startswith('If they'):
            out.append(f'    <p style="color: var(--text-secondary); margin-bottom: 15px; font-style: italic;">{line}</p>')
        elif not line:
            out.append('    <br>')
        elif line.startswith('www.') or line.startswith('http'):
            out.append(f'    <p><a href="#" style="color: var(--accent); font-weight: bold;">{line}</a></p>')
        else:
            out.append(f'    <p>{line}</p>')
            
    if in_email:
        out.append('</div>')
        
    return '\n'.join(out)

def build_html_2():
    with open('email2.txt', 'r') as f:
        lines = [line.strip() for line in f.readlines()]
        
    out = []
    out.append(f'<div class="sequence-info" style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid var(--glass-border);">')
    out.append(f'    <h2 style="font-size: 1.5rem; margin-bottom: 10px;">{lines[0]}</h2>')
    out.append(f'    <p style="color: var(--text-secondary);">{lines[1]}</p>')
    out.append('</div>')
    
    in_email = False
    in_list = False
    
    for line in lines[2:]:
        if line.startswith('Email '):
            if in_list:
                out.append('    </ul>')
                in_list = False
            if in_email:
                out.append('</div>')
                out.append('<hr style="margin: 40px 0; border: none; border-top: 1px solid var(--glass-border);">')
            out.append('<div class="email-content">')
            out.append(f'    <h4 style="color: var(--accent); margin-bottom: 15px;">{line}</h4>')
            in_email = True
        elif line.startswith('Subject Line:'):
            if in_list:
                out.append('    </ul>')
                in_list = False
            out.append(f'    <p><strong>{line}</strong></p><br>')
        elif line.startswith('- '):
            if not in_list:
                out.append('    <ul>')
                in_list = True
            out.append(f'        <li style="margin-bottom: 8px;">{line[2:]}</li>')
        elif not line:
            if in_list:
                out.append('    </ul>')
                in_list = False
            out.append('    <br>')
        elif line.startswith('www.') or line.startswith('http'):
            if in_list:
                out.append('    </ul>')
                in_list = False
            out.append(f'    <p><a href="#" style="color: var(--accent); font-weight: bold;">{line}</a></p>')
        else:
            if in_list:
                out.append('    </ul>')
                in_list = False
            out.append(f'    <p>{line}</p>')
            
    if in_list:
        out.append('    </ul>')
    if in_email:
        out.append('</div>')
        
    return '\n'.join(out)

# Create the replacement JSON payload securely using json library
e1 = build_html_2() # oops, build_html_1() for e1
e1 = build_html_1()
e2 = build_html_2()

final_obj = {
    "email1": e1,
    "email2": e2
}

with open('formatted_output.json', 'w') as f:
    json.dump(final_obj, f, indent=4)

print("SUCCESS")
