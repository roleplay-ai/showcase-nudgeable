import Link from 'next/link';
import { Icon } from './Icon';

export function ButtonLink({ href, children, variant = 'primary', external = false }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'dark' | 'text'; external?: boolean }) {
  const className = `button button-${variant}`;
  if (external) {
    return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<Icon name="arrow" size={17}/></a>;
  }
  return <Link className={className} href={href}>{children}<Icon name="arrow" size={17}/></Link>;
}
