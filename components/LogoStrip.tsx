import Image from 'next/image';
import { clientLogos } from './data';

export function LogoStrip() {
  const repeated = [...clientLogos, ...clientLogos];
  return <section className="logo-section" aria-label="Client logos">
    <p>Trusted by teams at</p>
    <div className="logo-marquee">
      <div className="logo-track">
        {repeated.map((logo, index) => <div className={`client-logo client-logo-${logo.size ?? 'medium'}`} key={`${logo.name}-${index}`}>
          <Image
            src={logo.src}
            alt={`${logo.name} logo`}
            width={180}
            height={64}
            className={`client-logo-image${logo.src.endsWith('.png') || logo.src.endsWith('.webp') ? ' client-logo-image-raster' : ''}`}
            unoptimized
          />
        </div>)}
      </div>
    </div>
  </section>;
}
