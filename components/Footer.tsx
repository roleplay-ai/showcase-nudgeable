import Image from 'next/image';
import Link from 'next/link';
import { Icon } from './Icon';

const socials = [
  { href: 'https://x.com/gauravxlri', label: 'X (Twitter)', icon: 'x' as const },
  { href: 'https://www.linkedin.com/in/gauravpatel25', label: 'LinkedIn', icon: 'linkedin' as const },
  { href: 'https://www.youtube.com/@Gaurav-NudgeableAI', label: 'YouTube', icon: 'youtube' as const },
  { href: 'https://www.instagram.com/gaurav.patel_gp', label: 'Instagram', icon: 'instagram' as const },
];

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <Link href="/" className="brand footer-brand" aria-label="Nudgeable home">
          <Image src="/brand/nudgeable-white.png" alt="Nudgeable" width={705} height={149} sizes="180px" />
        </Link>
        <p>Practical AI for Work training and products for corporate capability building.</p>
        <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>
        <div className="footer-socials">
          {socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="footer-social">
              <Icon name={social.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
      <div><strong>Training</strong><Link href="/#training">Corporate workshops</Link><Link href="/#contact">Contact</Link><Link href="/#about">About Gaurav</Link></div>
      <div><strong>Products</strong><a href="https://work.nudgeable.app/" target="_blank" rel="noopener noreferrer">Practice Lab</a><Link href="/nudgeengine">Actions Engine</Link></div>
      <div><strong>Content</strong><Link href="/insights">Videos</Link><Link href="/insights/blogs">Blogs</Link></div>
    </div>
    <div className="container footer-bottom">
      <span>© 2026 Nudgeable. All rights reserved.</span>
      <div className="footer-bottom-links">
        <Link href="/privacy">Privacy Policy</Link>
        <span>AI for Work, made practical.</span>
      </div>
    </div>
  </footer>;
}
