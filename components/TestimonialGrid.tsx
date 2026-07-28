import Image from 'next/image';
import { testimonials } from './data';

export function TestimonialGrid() {
  return <div className="testimonial-grid">
    {testimonials.map((item) => <article className="testimonial" key={item.name}>
      <div className="quote-mark">“</div>
      <p>{item.quote}</p>
      <div className="person">
        <div className="person-avatar">
          <Image src={item.avatarSrc} alt={item.name} width={52} height={52} className="person-avatar-image"/>
        </div>
        <div><strong>{item.name}</strong><span>{item.role}</span></div>
      </div>
    </article>)}
  </div>;
}
