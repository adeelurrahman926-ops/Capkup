
import "./globals.css";

export const metadata = {
  title: "CAPKUP AI",
  description: "Create subtitles for your videos with CAPKUP AI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
