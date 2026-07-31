import os, re, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "FS-engineering")

def read(p):
    with open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, c):
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)

def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    fm = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                fm[k.strip()] = v.strip()
    return fm

EPISODE_META = {
    "01-foundations/01-fundamentals": ("Fundamentals", "Foundational concepts every full-stack engineer on this playbook is assumed to know."),
    "02-architecture/01-standards": ("Standards", "Architecture and API design standards applied across all full-stack projects."),
    "03-project-onboarding/01-onboarding": ("Onboarding", "How new full-stack projects are set up, from tech stack selection to templates."),
    "04-coding-standards/01-frontend": ("Frontend", "Frontend coding standards covering structure, naming, reusability, and framework-specific guidance for React, Next.js, and shadcn/ui."),
    "04-coding-standards/02-backend": ("Backend", "Backend coding standards covering structure, naming, and framework-specific guidance for NestJS, Laravel, and GraphQL."),
    "04-coding-standards/03-database": ("Database", "Database design and engineering standards across PostgreSQL, MySQL, and MongoDB."),
    "04-coding-standards/04-testing": ("Testing", "Testing standards across the pyramid - unit, integration, and end-to-end."),
    "04-coding-standards/05-code-quality": ("Code Quality", "Automated code quality tooling - linting, formatting, and git hooks."),
    "04-coding-standards/06-accessibility": ("Accessibility", "Accessibility standards for full-stack applications."),
    "04-coding-standards/07-performance": ("Performance", "Performance engineering standards for full-stack applications."),
    "04-coding-standards/08-documentation": ("Documentation", "Standards for technical documents, project documents, and handover documentation."),
    "04-coding-standards/09-checklists": ("Checklists", "Checklists used at project start, review, completion, and release."),
    "04-coding-standards/10-general": ("General", "Cross-cutting coding standards - TypeScript, AI-assisted development, CI/CD, DevSecOps, and project setup."),
    "05-delivery-lifecycle/01-lifecycle-phases": ("Lifecycle Phases", "The end-to-end delivery lifecycle from requirement intake through monitoring."),
    "05-delivery-lifecycle/02-requirement-intake-scenarios": ("Requirement Intake Scenarios", "Worked scenarios for requirement intake, covering common variations and edge cases."),
    "06-quality-gates/01-gates": ("Gates", "The automated quality gates enforced in CI/CD pipelines."),
    "07-security/01-controls": ("Controls", "Security controls and checklists applied across full-stack projects."),
    "08-engineering/01-practices": ("Practices", "Core engineering practices - branching, environments, developer experience, and documentation."),
    "09-operations/01-operations": ("Operations", "Day-two operations - observability, logging, incident management, disaster recovery, and release management."),
    "10-governance/01-governance": ("Governance", "Roles, responsibilities, compliance, and approvals across the delivery lifecycle."),
    "11-kpis/01-metrics": ("Metrics", "The delivery, engineering, and quality metrics used to measure full-stack delivery."),
    "12-templates/01-templates": ("Templates", "Reusable templates for project kickoff and production readiness."),
    "99-misc/01-general": ("General", "Miscellaneous reference material - getting started and vision & principles."),
}

for rel, (title, description) in EPISODE_META.items():
    dirpath = os.path.join(OUT, rel)
    pages = sorted(f for f in os.listdir(dirpath) if f.endswith(".mdx") and f != "index.mdx")
    rows = []
    for p in pages:
        fm = frontmatter(read(os.path.join(dirpath, p)))
        rows.append((fm.get("title", p), fm.get("description", ""), "./" + p.replace(".mdx", "")))
    table = "| Page | What It Covers |\n|---|---|\n" + "\n".join(
        f"| [{t}]({link}) | {d} |" for t, d, link in rows
    )
    content = (
        "---\n"
        f"title: {title}\n"
        f"description: {description}\n"
        "order: 0\n"
        "version: 1.0\n"
        "disabled: false\n"
        "---\n\n"
        f"## {title}\n\n"
        f"{description}\n\n"
        "### Pages in this episode\n\n"
        f"{table}\n"
    )
    write(os.path.join(dirpath, "index.mdx"), content)

print("Episode indexes written:", len(EPISODE_META))
