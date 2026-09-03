import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Nudgeable collects, uses and protects personal information on nudgeable.ai.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Nudgeable',
    description: 'How Nudgeable collects, uses and protects personal information.',
    url: '/privacy',
    type: 'website',
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Nudgeable',
    description: 'How Nudgeable collects, uses and protects personal information.',
    images: ['/assets/og-default.png']
  }
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container legal-wrap">
        <header className="legal-header">
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: 3 September 2026</p>
        </header>

        <article className="blog-body legal-body">
          <p className="lead">
            This Privacy Policy explains how Nudgeable (“we”, “us”, “our”) collects, uses and protects
            personal information when you visit <Link href="/">nudgeable.ai</Link> or contact us.
          </p>

          <h2>Who we are</h2>
          <p>
            Nudgeable provides practical AI for Work training and products for corporate capability
            building. For privacy questions, email{' '}
            <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>.
          </p>

          <h2>Information we collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>
              <strong>Contact enquiries.</strong> When you submit the contact form, we collect your
              name, work email, company, area of interest, team size and message.
            </li>
            <li>
              <strong>Newsletter signups.</strong> When you subscribe, we collect your email address.
            </li>
            <li>
              <strong>Usage data.</strong> We use analytics tools that may collect device, browser,
              approximate location and page-view information about how the site is used.
            </li>
            <li>
              <strong>Technical data.</strong> Standard server and hosting logs may include IP
              address, request timing and referrer information needed to operate and secure the site.
            </li>
          </ul>
          <p>We do not ask for payment card details on this website.</p>

          <h2>How we use information</h2>
          <p>We use personal information to:</p>
          <ul>
            <li>Respond to training and product enquiries</li>
            <li>Send newsletter updates you requested</li>
            <li>Operate, secure and improve the website</li>
            <li>Understand which content and pages are useful</li>
            <li>Comply with legal obligations where applicable</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>Cookies and analytics</h2>
          <p>
            The site may use cookies or similar technologies for essential site function and
            analytics. We use Google Analytics (with IP anonymization enabled where configured) and
            Vercel Analytics to understand aggregate traffic and performance. You can control cookies
            through your browser settings.
          </p>

          <h2>How we share information</h2>
          <p>
            We share information only with service providers who help us run the site and
            communications — for example email delivery, hosting and analytics — and only as needed
            for those services. We may also disclose information if required by law or to protect
            our rights, users or the public.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep contact enquiries and newsletter records for as long as needed to respond,
            manage the relationship and meet operational or legal requirements. You can ask us to
            delete your information where we are not required to keep it.
          </p>

          <h2>International transfers</h2>
          <p>
            Our service providers may process data in countries other than your own. Where that
            happens, we rely on providers that apply appropriate safeguards for the services they
            provide to us.
          </p>

          <h2>Your choices</h2>
          <p>Depending on applicable law, you may ask us to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Delete information we no longer need</li>
            <li>Unsubscribe from the newsletter</li>
          </ul>
          <p>
            To make a request, email <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>.
          </p>

          <h2>Children</h2>
          <p>
            This website is intended for business and professional audiences. We do not knowingly
            collect personal information from children.
          </p>

          <h2>Third-party links and products</h2>
          <p>
            Our site may link to third-party sites or products, including YouTube, social platforms
            and Nudgeable product apps. Those services have their own privacy practices, which we do
            not control.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The “Last updated” date at the top
            of this page will change when we do. Continued use of the site after an update means you
            accept the revised policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy: <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>
          </p>
        </article>
      </div>
    </div>
  );
}
