import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "FS-engineering")

def yaml_quote(value):
    value = value.strip()
    # strip one layer of existing surrounding quotes before re-quoting
    if len(value) >= 2 and value[0] == value[-1] and value[0] in ("'", '"'):
        value = value[1:-1]
    value = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{value}"'

FIELD_RE = re.compile(r"^(title|description): (.*)$")

changed = []
for dirpath, _, files in os.walk(OUT):
    for fn in files:
        if not fn.endswith(".mdx"):
            continue
        p = os.path.join(dirpath, fn)
        with open(p, "r", encoding="utf-8") as f:
            text = f.read()
        m = re.match(r"^(---\n)(.*?)(\n---\n.*)$", text, re.DOTALL)
        if not m:
            continue
        pre, fm_block, rest = m.groups()
        new_lines = []
        modified = False
        for line in fm_block.split("\n"):
            fmatch = FIELD_RE.match(line)
            if fmatch:
                key, val = fmatch.groups()
                new_val = yaml_quote(val)
                new_line = f"{key}: {new_val}"
                if new_line != line:
                    modified = True
                new_lines.append(new_line)
            else:
                new_lines.append(line)
        if modified:
            new_text = pre + "\n".join(new_lines) + rest
            with open(p, "w", encoding="utf-8") as f:
                f.write(new_text)
            changed.append(p)

print("Quoted frontmatter in", len(changed), "files")
