import Link from 'next/link';

export default function NotFound() {
  return <section className="not-found-section">
    <div className="container not-found-card">
      <span className="eyebrow">404</span>
      <h1>Page not found.</h1>
      <p>The page may have moved. Use the main navigation or return to the Nudgeable homepage.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </div>
  </section>;
}
