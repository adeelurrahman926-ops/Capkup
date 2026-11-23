
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://capkup.deelu.online"),

  title: {
    default: "CAPKUP AI | Free AI Video Subtitle Generator",
    template: "%s | CAPKUP AI",
  },

  description:
    "Create stylish video subtitles with CAPKUP AI. Generate captions using AI, customize fonts, add animations and export subtitled videos as MP4.",

  keywords: [
    "CAPKUP AI",
    "AI subtitle generator",
    "video subtitle generator",
    "automatic video captions",
    "AI video captions",
    "online subtitle editor",
    "add subtitles to video",
    "MP4 subtitle export",
  ],

  applicationName: "CAPKUP AI",

  verification: {
    google: "9Cm_udg-j5cHrXwfxRzaKf692KqBV6bAqpZ3ZAwRcSQ",
  },

  openGraph: {
    title: "CAPKUP AI | Free AI Video Subtitle Generator",
    description:
      "Generate, customize and export stylish video subtitles with CAPKUP AI.",
    url: "https://capkup.deelu.online",
    siteName: "CAPKUP AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CAPKUP AI Video Subtitle Generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CAPKUP AI | AI Video Subtitle Generator",
    description:
      "Create stylish AI-powered video subtitles and export your videos as MP4.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
