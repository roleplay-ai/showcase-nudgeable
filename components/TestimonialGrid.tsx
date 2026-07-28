import { testimonials } from './data';

export function TestimonialGrid() {
  return <div className="testimonial-grid">
    {testimonials.map((item) => <article className="testimonial" key={item.name}>
      <div className="quote-mark">“</div>
      <p>{item.quote}</p>
      <div className="person"><div className="person-avatar">{item.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div><div><strong>{item.name}</strong><span>{item.role}</span></div></div>
    </article>)}
  </div>;
}
