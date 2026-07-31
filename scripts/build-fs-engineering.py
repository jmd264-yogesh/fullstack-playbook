import os, re, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
OUT = os.path.join(ROOT, "FS-engineering")

def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def split_frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not m:
        return {}, text
    fm_raw, body = m.group(1), m.group(2)
    fm = {}
    for line in fm_raw.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm, body

def first_h1(body):
    m = re.search(r"^#\s+(.+)$", body, re.MULTILINE)
    return m.group(1).strip() if m else None

def strip_first_h1(body):
    return re.sub(r"^#\s+.+\n+", "", body, count=1, flags=re.MULTILINE)

def make_description(body, existing=None):
    if existing:
        return existing
    for line in body.splitlines():
        line = line.strip()
        if line and not line.startswith("#") and not line.startswith("```") and not line.startswith("|"):
            desc = re.sub(r"[`*_]", "", line)
            return (desc[:157] + "...") if len(desc) > 160 else desc
    return ""

def convert(src_rel, title_override=None, description_override=None):
    text = read(os.path.join(DOCS, src_rel))
    fm, body = split_frontmatter(text)
    h1 = first_h1(body)
    title = title_override or fm.get("title") or h1 or os.path.basename(src_rel)
    if h1:
        body = strip_first_h1(body)
    description = description_override or fm.get("description") or make_description(body)
    body = body.strip() + "\n"
    return title, description, body

def emit(src_rel, dest_path, order, title_override=None, description_override=None):
    title, description, body = convert(src_rel, title_override, description_override)
    fm = (
        "---\n"
        f"title: {title}\n"
        f"description: {description}\n"
        f"order: {order}\n"
        "version: 1.0\n"
        "disabled: false\n"
        "---\n\n"
        f"## {title}\n\n"
    )
    write(dest_path, fm + body)
    return title

PAGES = [
    ("basics/full-stack-architecture.md", "01-foundations/01-fundamentals/01-full-stack-architecture.mdx", 1),
    ("basics/git-version-control.md", "01-foundations/01-fundamentals/02-git-version-control.mdx", 2),
    ("basics/apis-http.md", "01-foundations/01-fundamentals/03-apis-http.mdx", 3),
    ("basics/databases.md", "01-foundations/01-fundamentals/04-databases.mdx", 4),
    ("basics/docker.md", "01-foundations/01-fundamentals/05-docker.mdx", 5),
    ("basics/environments-cloud.md", "01-foundations/01-fundamentals/06-environments-cloud.mdx", 6),
    ("basics/ci-cd.md", "01-foundations/01-fundamentals/07-ci-cd.mdx", 7),
    ("basics/testing.md", "01-foundations/01-fundamentals/08-testing.mdx", 8),
    ("basics/security.md", "01-foundations/01-fundamentals/09-security.mdx", 9),
    ("basics/glossary.md", "01-foundations/01-fundamentals/10-glossary.mdx", 10),

    ("architecture/standards.md", "02-architecture/01-standards/01-standards.mdx", 1),
    ("architecture/api-standards.md", "02-architecture/01-standards/02-api-standards.mdx", 2),

    ("project-onboarding/create-project.md", "03-project-onboarding/01-onboarding/01-create-project.mdx", 1),
    ("project-onboarding/tech-stack-selection.md", "03-project-onboarding/01-onboarding/02-tech-stack-selection.mdx", 2),
    ("project-onboarding/templates.md", "03-project-onboarding/01-onboarding/03-templates.mdx", 3),

    ("coding-standards/frontend/folder-structure.md", "04-coding-standards/01-frontend/01-folder-structure.mdx", 1),
    ("coding-standards/frontend/naming-conventions.md", "04-coding-standards/01-frontend/02-naming-conventions.mdx", 2),
    ("coding-standards/frontend/code-organization.md", "04-coding-standards/01-frontend/03-code-organization.mdx", 3),
    ("coding-standards/frontend/reusability.md", "04-coding-standards/01-frontend/04-reusability.mdx", 4),
    ("coding-standards/frontend/react.md", "04-coding-standards/01-frontend/05-react.mdx", 5),
    ("coding-standards/frontend/nextjs.md", "04-coding-standards/01-frontend/06-nextjs.mdx", 6),
    ("coding-standards/frontend/shadcn.md", "04-coding-standards/01-frontend/07-shadcn.mdx", 7),

    ("coding-standards/backend/folder-structure.md", "04-coding-standards/02-backend/01-folder-structure.mdx", 1),
    ("coding-standards/backend/naming-conventions.md", "04-coding-standards/02-backend/02-naming-conventions.mdx", 2),
    ("coding-standards/backend/nestjs.md", "04-coding-standards/02-backend/03-nestjs.mdx", 3),
    ("coding-standards/backend/laravel.md", "04-coding-standards/02-backend/04-laravel.mdx", 4),
    ("coding-standards/backend/graphql.md", "04-coding-standards/02-backend/05-graphql.mdx", 5),

    ("coding-standards/database/overview.md", "04-coding-standards/03-database/01-overview.mdx", 1),
    ("coding-standards/database/postgres.md", "04-coding-standards/03-database/02-postgres.mdx", 2),
    ("coding-standards/database/mysql.md", "04-coding-standards/03-database/03-mysql.mdx", 3),
    ("coding-standards/database/mongodb.md", "04-coding-standards/03-database/04-mongodb.mdx", 4),

    ("coding-standards/testing/overview.md", "04-coding-standards/04-testing/01-overview.mdx", 1),
    ("coding-standards/testing/unit-testing.md", "04-coding-standards/04-testing/02-unit-testing.mdx", 2),
    ("coding-standards/testing/integration-testing.md", "04-coding-standards/04-testing/03-integration-testing.mdx", 3),
    ("coding-standards/testing/e2e-testing.md", "04-coding-standards/04-testing/04-e2e-testing.mdx", 4),

    ("coding-standards/code-quality/eslint.md", "04-coding-standards/05-code-quality/01-eslint.mdx", 1),
    ("coding-standards/code-quality/prettier.md", "04-coding-standards/05-code-quality/02-prettier.mdx", 2),
    ("coding-standards/code-quality/git-hooks.md", "04-coding-standards/05-code-quality/03-git-hooks.mdx", 3),

    ("coding-standards/accessibility/overview.md", "04-coding-standards/06-accessibility/01-overview.mdx", 1),

    ("coding-standards/performance/overview.md", "04-coding-standards/07-performance/01-overview.mdx", 1),

    ("coding-standards/documentation/technical-document.md", "04-coding-standards/08-documentation/01-technical-document.mdx", 1),
    ("coding-standards/documentation/project-documents.md", "04-coding-standards/08-documentation/02-project-documents.mdx", 2),
    ("coding-standards/documentation/handover-document.md", "04-coding-standards/08-documentation/03-handover-document.mdx", 3),

    ("coding-standards/checklists/project-start.md", "04-coding-standards/09-checklists/01-project-start.mdx", 1),
    ("coding-standards/checklists/jqaa-review.md", "04-coding-standards/09-checklists/02-jqaa-review.mdx", 2),
    ("coding-standards/checklists/project-completion.md", "04-coding-standards/09-checklists/03-project-completion.mdx", 3),
    ("coding-standards/checklists/release-checklist.md", "04-coding-standards/09-checklists/04-release-checklist.mdx", 4),

    ("coding-standards/typescript/overview.md", "04-coding-standards/10-general/01-typescript.mdx", 1),
    ("coding-standards/ai-assisted-development.md", "04-coding-standards/10-general/02-ai-assisted-development.mdx", 2),
    ("coding-standards/ci-cd.md", "04-coding-standards/10-general/03-ci-cd.mdx", 3),
    ("coding-standards/devsecops-standards.md", "04-coding-standards/10-general/04-devsecops-standards.mdx", 4),
    ("coding-standards/project-setup.md", "04-coding-standards/10-general/05-project-setup.mdx", 5),

    ("delivery-lifecycle/requirement-intake.md", "05-delivery-lifecycle/01-lifecycle-phases/01-requirement-intake.mdx", 1),
    ("delivery-lifecycle/design-phase.md", "05-delivery-lifecycle/01-lifecycle-phases/02-design-phase.mdx", 2),
    ("delivery-lifecycle/development-phase.md", "05-delivery-lifecycle/01-lifecycle-phases/03-development-phase.mdx", 3),
    ("delivery-lifecycle/testing-phase.md", "05-delivery-lifecycle/01-lifecycle-phases/04-testing-phase.mdx", 4),
    ("delivery-lifecycle/monitoring-phase.md", "05-delivery-lifecycle/01-lifecycle-phases/05-monitoring-phase.mdx", 5),
    ("delivery-lifecycle/releases.md", "05-delivery-lifecycle/01-lifecycle-phases/06-releases.mdx", 6),
    ("delivery-lifecycle/agile-board-standards.md", "05-delivery-lifecycle/01-lifecycle-phases/07-agile-board-standards.mdx", 7),

    ("delivery-lifecycle/requirement-intake/scenario-1-client-provides-frd.md", "05-delivery-lifecycle/02-requirement-intake-scenarios/01-scenario-client-provides-frd.mdx", 1),
    ("delivery-lifecycle/requirement-intake/scenario-2-no-frd.md", "05-delivery-lifecycle/02-requirement-intake-scenarios/02-scenario-no-frd.mdx", 2),
    ("delivery-lifecycle/requirement-intake/scenario-3-ui-mockup.md", "05-delivery-lifecycle/02-requirement-intake-scenarios/03-scenario-ui-mockup.mdx", 3),
    ("delivery-lifecycle/requirement-intake/variations-edge-cases.md", "05-delivery-lifecycle/02-requirement-intake-scenarios/04-variations-edge-cases.mdx", 4),

    ("quality-gates/code-quality.md", "06-quality-gates/01-gates/01-code-quality.mdx", 1),
    ("quality-gates/testing-gates.md", "06-quality-gates/01-gates/02-testing-gates.mdx", 2),

    ("security/security-checklist.md", "07-security/01-controls/01-security-checklist.mdx", 1),

    ("engineering/git-branching.md", "08-engineering/01-practices/01-git-branching.mdx", 1),
    ("engineering/environments.md", "08-engineering/01-practices/02-environments.mdx", 2),
    ("engineering/developer-experience.md", "08-engineering/01-practices/03-developer-experience.mdx", 3),
    ("engineering/documentation.md", "08-engineering/01-practices/04-documentation.mdx", 4),

    ("operations/observability.md", "09-operations/01-operations/01-observability.mdx", 1),
    ("operations/logging-standards.md", "09-operations/01-operations/02-logging-standards.mdx", 2),
    ("operations/incident-management.md", "09-operations/01-operations/03-incident-management.mdx", 3),
    ("operations/disaster-recovery.md", "09-operations/01-operations/04-disaster-recovery.mdx", 4),
    ("operations/release-management.md", "09-operations/01-operations/05-release-management.mdx", 5),

    ("governance/roles-and-responsibilities.md", "10-governance/01-governance/01-roles-and-responsibilities.mdx", 1),
    ("governance/compliance-model.md", "10-governance/01-governance/02-compliance-model.mdx", 2),
    ("governance/approvals.md", "10-governance/01-governance/03-approvals.mdx", 3),

    ("kpis/delivery-performance.md", "11-kpis/01-metrics/01-delivery-performance.mdx", 1),
    ("kpis/engineering-metrics.md", "11-kpis/01-metrics/02-engineering-metrics.mdx", 2),
    ("kpis/quality-metrics.md", "11-kpis/01-metrics/03-quality-metrics.mdx", 3),

    ("templates/project-kickoff.md", "12-templates/01-templates/01-project-kickoff.mdx", 1),
    ("templates/production-readiness.md", "12-templates/01-templates/02-production-readiness.mdx", 2),

    ("getting-started.md", "99-misc/01-general/01-getting-started.mdx", 1),
    ("vision-principles.md", "99-misc/01-general/02-vision-principles.mdx", 2),
]

CHAPTER_INDEX_FROM_OVERVIEW = [
    ("basics/overview.md", "01-foundations/index.mdx", "Foundations"),
    ("coding-standards/overview.md", "04-coding-standards/index.mdx", "Coding Standards"),
    ("delivery-lifecycle/overview.md", "05-delivery-lifecycle/index.mdx", "Delivery Lifecycle"),
    ("quality-gates/overview.md", "06-quality-gates/index.mdx", "Quality Gates"),
    ("security/security-guardrails.md", "07-security/index.mdx", "Security"),
    ("operations/overview.md", "09-operations/index.mdx", "Operations"),
    ("governance/overview.md", "10-governance/index.mdx", "Governance"),
]

results = []
for src, dest, order in PAGES:
    title = emit(src, os.path.join(OUT, dest), order)
    results.append((dest, title))

for src, dest, title in CHAPTER_INDEX_FROM_OVERVIEW:
    emit(src, os.path.join(OUT, dest), 0, title_override=title)

print(json.dumps(results, indent=2))
print("DONE", len(results) + len(CHAPTER_INDEX_FROM_OVERVIEW), "files written")
