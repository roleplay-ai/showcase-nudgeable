export function SectionHeader({ eyebrow, title, copy, align = 'left' }: { eyebrow?: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return <div className={`section-header section-header-${align}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>;
}
