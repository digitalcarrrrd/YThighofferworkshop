import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const canonical = "https://abrarnadir.com/ytworkshop";

export const metadata: Metadata = {
  title: "YouTube Empire Builders Live Workshop | Abrar Nadir",
  description: "Faceless YouTube niche selection, AI storytelling aur automation ka practical daily live workshop. Sirf 100 seats per batch.",
  alternates: { canonical },
  openGraph: { title: "YouTube Empire Builders Live Workshop", description: "2-hour practical live workshop with Abrar Nadir.", url: canonical, siteName: "YouTube Empire Builders", locale: "en_PK", type: "website" },
  twitter: { card: "summary_large_image", title: "YouTube Empire Builders", description: "Daily live YouTube automation workshop." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const ga = process.env.NEXT_PUBLIC_GA4_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&family=Caveat:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {gtm && <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script>}
        {ga && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" /><Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script></>}
        {pixel && <Script id="pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}</Script>}
        {children}
      </body>
    </html>
  );
}
