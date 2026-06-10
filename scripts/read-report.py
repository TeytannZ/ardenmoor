from pypdf import PdfReader

r = PdfReader(r'C:\Code\ardenmoor\final.pdf')
print(f'final.pdf: {len(r.pages)} pages\n')
for i, page in enumerate(r.pages):
    t = page.extract_text() or ''
    lines = [l.strip() for l in t.splitlines() if l.strip()]
    if lines:
        summary = ' | '.join(lines[:6])
        print(f'  p{i+1}: {summary}')
