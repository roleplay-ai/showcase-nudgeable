import { ButtonLink } from './ButtonLink';

export function CTA({ title = 'Make AI useful for your teams', copy = 'Tell us which AI tools your employees have access to and what work they need to do better. We will design a practical program around it.' }: { title?: string; copy?: string }) {
  return <section className="cta-section">
    <div className="container cta-inner"><div><span className="eyebrow light">START A CONVERSATION</span><h2>{title}</h2><p>{copy}</p></div><ButtonLink href="/#contact" variant="secondary">Discuss your requirement</ButtonLink></div>
  </section>;
}
