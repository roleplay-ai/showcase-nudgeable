#!/usr/bin/env python3
"""Inject favicon and Open Graph meta tags into AI Academy static HTML pages."""

import html
import re
from pathlib import Path

SITE = 'https://www.nudgeable.ai'
ACADEMY_ROOT = Path(__file__).resolve().parents[1] / 'public' / 'ai-academy'
MARKER = 'academy-head-meta'


def parse_title(content: str) -> str:
    match = re.search(r'<title[^>]*>(.*?)</title>', content, re.I | re.S)
    return html.unescape(re.sub(r'\s+', ' ', match.group(1)).strip()) if match else 'Nudgeable AI Academy'


def parse_description(content: str) -> str:
    match = re.search(
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
        content,
        re.I | re.S,
    )
    if not match:
        match = re.search(
            r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']',
            content,
            re.I | re.S,
        )
    return html.unescape(match.group(1).strip()) if match else 'Practical guides to the AI assistants people use at work.'


def page_url(file_path: Path) -> str:
    rel = file_path.relative_to(ACADEMY_ROOT).as_posix()
    if rel == 'index.html':
        return f'{SITE}/ai-academy/'
    return f'{SITE}/ai-academy/{rel}'


def build_block(title: str, description: str, url: str) -> str:
    t = html.escape(title, quote=True)
    d = html.escape(description, quote=True)
    return f'''<link rel="icon" href="/icon.png" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="/icon.png">
<meta property="og:site_name" content="Nudgeable">
<meta property="og:type" content="website">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/assets/og-default.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Nudgeable">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{SITE}/assets/og-default.png">
<meta name="theme-color" content="#FEFCFA">
<!-- academy-head-meta -->'''


def inject(content: str, block: str) -> str:
    if MARKER in content or 'property="og:image"' in content:
        return content

    content = re.sub(
        r'<link rel="icon" href="/icon.png"[^>]*>\s*',
        '',
        content,
        flags=re.I,
    )

    viewport = re.search(r'<meta[^>]+name=["\']viewport["\'][^>]*>', content, re.I)
    if viewport:
        insert_at = viewport.end()
        return content[:insert_at] + '\n' + block + content[insert_at:]

    charset = re.search(r'<meta[^>]+charset[^>]*>', content, re.I)
    if charset:
        insert_at = charset.end()
        return content[:insert_at] + '\n' + block + content[insert_at:]

    head = re.search(r'<head[^>]*>', content, re.I)
    if not head:
        return content
    insert_at = head.end()
    return content[:insert_at] + '\n' + block + content[insert_at:]


def main() -> None:
    updated = 0
    for file_path in sorted(ACADEMY_ROOT.rglob('*.html')):
        original = file_path.read_text(encoding='utf-8')
        title = parse_title(original)
        description = parse_description(original)
        url = page_url(file_path)
        block = build_block(title, description, url)
        new_content = inject(original, block)
        if new_content != original:
            file_path.write_text(new_content, encoding='utf-8')
            updated += 1
            print(f'updated {file_path.relative_to(ACADEMY_ROOT)}')
    print(f'done: {updated} files updated')


if __name__ == '__main__':
    main()
