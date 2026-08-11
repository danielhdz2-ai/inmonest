import pandas as pd
from pathlib import Path
from collections import Counter, defaultdict
import re

files = {
    "404": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11.xlsx",
    "redirect": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (1).xlsx",
    "canonical": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (2).xlsx",
    "noindex": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (3).xlsx",
    "robots": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (4).xlsx",
    "crawled_not_indexed": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (5).xlsx",
    "discovered_not_indexed": r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (6).xlsx",
}

def classify_url(url: str) -> str:
    u = url.lower().replace("http://", "https://").replace("https://www.", "https://")
    if re.match(r"https://inmonest\.com/pisos/[0-9a-f-]{36}", u):
        return "pisos/listing"
    if "/gestoria/" in u:
        return "gestoria"
    if re.search(r"/[a-z-]+/alquiler-particulares", u) or re.search(r"/[a-z-]+/contrato-", u) or re.search(r"/[a-z-]+/pisos-", u):
        return "ciudad-seo"
    if u in ("https://inmonest.com/", "http://inmonest.com/", "https://www.inmonest.com/", "http://www.inmonest.com/"):
        return "home-variant"
    if re.search(r"/bilbao/\s*\d", u) or "34745022862" in u:
        return "malformed-phone-url"
    if "/blog/" in u:
        return "blog"
    if "/api/" in u or "/admin" in u or "/mi-cuenta" in u or "/login" in u:
        return "app/private"
    return "other"

def path_prefix(url: str, depth=3) -> str:
    u = re.sub(r"^https?://(www\.)?inmonest\.com", "", url.lower()).split("?")[0]
    parts = [p for p in u.split("/") if p][:depth]
    return "/" + "/".join(parts) if parts else "/"

all_by_issue = {}
prefix_counts = defaultdict(lambda: Counter())

for issue, f in files.items():
    p = Path(f)
    if not p.exists():
        continue
    meta = pd.read_excel(f, sheet_name="Metadatos")
    inc = meta.loc[meta["Propiedad"] == "Incidencia", "Valor"]
    issue_name = inc.iloc[0] if len(inc) else issue
    df = pd.read_excel(f, sheet_name="Tabla")
    urls = df.iloc[:, 0].astype(str).tolist()
    all_by_issue[issue_name] = urls
    print(f"\n{'='*70}\n{issue_name} ({len(urls)} URLs)\n{'='*70}")
    cats = Counter(classify_url(u) for u in urls)
    for c, n in cats.most_common():
        print(f"  {c}: {n}")
    prefixes = Counter(path_prefix(u) for u in urls)
    print("\n  Top path prefixes:")
    for pref, n in prefixes.most_common(25):
        print(f"    {n:4d}  {pref}")
        prefix_counts[issue][pref] = n

# 404 specific samples
print("\n\n=== 404 GESTORIA URLs (fixable) ===")
for u in all_by_issue.get("No se ha encontrado (404)", []):
    if "/gestoria/" in u.lower():
        print(u)

print("\n=== 404 CIUDAD URLs ===")
for u in all_by_issue.get("No se ha encontrado (404)", []):
    if classify_url(u) == "ciudad-seo":
        print(u)

print("\n=== REDIRECT: non-canonical hosts ===")
for u in all_by_issue.get("Página con redirección", []):
    if "www." in u or u.startswith("http://"):
        print(u)

print("\n=== NOINDEX URLs sample ===")
for u in all_by_issue.get('Excluida por una etiqueta "noindex"', [])[:40]:
    print(u)

print("\n=== ROBOTS.TXT blocked ===")
for u in all_by_issue.get("Bloqueada por robots.txt", []):
    print(u)

# Export CSV summary for repo
out = Path(r"D:\Proyectos\Inmonest\inmonest\scripts\gsc-coverage-urls.csv")
rows = []
for issue, urls in all_by_issue.items():
    for u in urls:
        rows.append({"issue": issue, "url": u, "category": classify_url(u), "prefix": path_prefix(u)})
pd.DataFrame(rows).to_csv(out, index=False)
print(f"\nExported {len(rows)} rows to {out}")
