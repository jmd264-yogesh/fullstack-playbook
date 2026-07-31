import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "FS-engineering")

def first_sentence(text):
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # strip markdown links, keep label
    text = re.sub(r"[`*_]", "", text)
    m = re.search(r"^(.{20,220}?[.!?])(\s|$)", text)
    if m:
        return m.group(1).strip()
    return (text[:157].rsplit(" ", 1)[0] + "...") if len(text) > 160 else text.strip()

changed = []
for dirpath, _, files in os.walk(OUT):
    for fn in files:
        if not fn.endswith(".mdx"):
            continue
        p = os.path.join(dirpath, fn)
        with open(p, "r", encoding="utf-8") as f:
            text = f.read()
        m = re.match(r"^(---\n.*?\n---\n\n## .+?\n\n)(.*)$", text, re.DOTALL)
        if not m:
            continue
        header, body = m.groups()
        desc_m = re.search(r"^description: (.*)\.\.\.\s*$", header, re.MULTILINE)
        if not desc_m:
            continue
        # find first real paragraph in body to build a clean sentence
        first_para = ""
        for para in body.split("\n\n"):
            para = para.strip()
            if para and not para.startswith("#") and not para.startswith("```") and not para.startswith("|") and not para.startswith("<"):
                first_para = para
                break
        if not first_para:
            continue
        new_desc = first_sentence(first_para)
        new_desc = new_desc.replace("\n", " ")
        new_header = re.sub(r"^description: .*$", f"description: {new_desc}", header, count=1, flags=re.MULTILINE)
        if new_header != header:
            with open(p, "w", encoding="utf-8") as f:
                f.write(new_header + body)
            changed.append(p)

print("Fixed", len(changed), "descriptions")
