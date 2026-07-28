import Script from 'next/script';

export function Analytics() {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  if (!ga4Id) return null;

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
    <Script id="ga4" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', { anonymize_ip: true });`}
    </Script>
  </>;
}
