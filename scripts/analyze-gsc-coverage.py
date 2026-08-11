import pandas as pd
from pathlib import Path

files = [
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-2026-08-11.xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11.xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (1).xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (2).xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (3).xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (4).xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (5).xlsx",
    r"c:\Users\Daniel HDZ\Desktop\inmonest.com-Coverage-Drilldown-2026-08-11 (6).xlsx",
]

for f in files:
    p = Path(f)
    if not p.exists():
        print(f"MISSING: {p.name}")
        continue
    print("\n" + "=" * 80)
    print(p.name)
    xl = pd.ExcelFile(f)
    print("Sheets:", xl.sheet_names)
    for sheet in xl.sheet_names:
        df = pd.read_excel(f, sheet_name=sheet)
        print(f"\n--- Sheet: {sheet} ({len(df)} rows) ---")
        print("Columns:", list(df.columns))
        pd.set_option("display.max_colwidth", 120)
        pd.set_option("display.width", 200)
        print(df.head(20).to_string())
        if len(df) > 20:
            print(f"... +{len(df) - 20} more rows")
