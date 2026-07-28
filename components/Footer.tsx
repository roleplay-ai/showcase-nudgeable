import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link href="/" className="brand footer-brand" aria-label="Nudgeable home">
          <Image src="/brand/nudgeable-white.png" alt="Nudgeable" width={705} height={149} sizes="180px" />
        </Link>
        <p>Practical AI for Work training and products for corporate capability building.</p>
        <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>
      </div>
      <div><strong>Training</strong><Link href="/#training">Corporate workshops</Link><Link href="/#contact">Contact</Link><Link href="/#about">About Gaurav</Link></div>
      <div><strong>Products</strong><a href="https://ai.nudgeable.app/" target="_blank" rel="noopener noreferrer">Practice Lab</a><Link href="/ai-role-play">AI Coach</Link><Link href="/nudgeengine">Actions Engine</Link></div>
      <div><strong>Content</strong><Link href="/insights#shorts">AI Shorts</Link><Link href="/insights#workflows">Workflow explainers</Link><a href="https://www.youtube.com/playlist?list=PLX2kcOVk5064" target="_blank" rel="noopener noreferrer">YouTube</a></div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Nudgeable. All rights reserved.</span><span>AI for Work, made practical.</span></div>
  </footer>;
}
