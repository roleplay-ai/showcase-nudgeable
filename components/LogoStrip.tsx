import { clientLogos } from './data';

export function LogoStrip() {
  const repeated = [...clientLogos, ...clientLogos];
  return <section className="logo-section" aria-label="Client logos">
    <p>Trusted by teams at</p>
    <div className="logo-marquee">
      <div className="logo-track">
        {repeated.map((logo, index) => <div className="client-logo" key={`${logo}-${index}`}>{logo}</div>)}
      </div>
    </div>
  </section>;
}
