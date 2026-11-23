import Link from "next/link";

export const metadata = {
  title: "Urdu Subtitle Generator Online | CAPKUP AI",
  description:
    "Generate Urdu subtitles for your videos with CAPKUP AI. Automatically transcribe Urdu speech, customize captions, and export subtitled MP4 videos.",
  keywords: [
    "Urdu subtitle generator",
    "Urdu video subtitles",
    "Urdu speech to text",
    "Automatic Urdu captions",
    "Urdu transcription online",
    "Add Urdu subtitles to video",
  ],
  alternates: {
    canonical: "https://capkup.deelu.online/urdu-subtitle-generator",
  },
  openGraph: {
    title: "Urdu Subtitle Generator Online | CAPKUP AI",
    description:
      "Create Urdu video subtitles using AI. Customize your captions and export MP4 videos.",
    url: "https://capkup.deelu.online/urdu-subtitle-generator",
    siteName: "CAPKUP AI",
    type: "website",
  },
};

export default function UrduSubtitleGenerator() {
  return (
    <main className="page">
      <header className="header">
        <Link href="/" className="logo">
          CAPKUP <span>AI</span>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/login" className="login">
            Log In
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="tag">AI POWERED URDU SUBTITLES</div>

        <h1>
          Urdu Subtitle Generator
          <span> Create Urdu Captions for Your Videos</span>
        </h1>

        <p>
          Generate Urdu subtitles from your videos with CAPKUP AI.
          Automatically transcribe Urdu speech, customize your captions,
          and export your videos with subtitles.
        </p>

        <Link href="/login" className="button">
          Create Urdu Subtitles Free
        </Link>

        <div className="urdu">
          اپنی ویڈیوز کے لیے اردو سب ٹائٹلز آسانی سے بنائیں۔
        </div>
      </section>

      <section className="content">
        <h2>Automatic Urdu Video Subtitles</h2>

        <p>
          Want to add Urdu subtitles to your videos? CAPKUP AI helps you
          convert spoken Urdu into written text using AI speech
          transcription. You can generate subtitles and customize their
          appearance before exporting your video.
        </p>

        <h2>Why Use CAPKUP AI for Urdu Subtitles?</h2>

        <div className="features">
          <article>
            <h3>AI Urdu Transcription</h3>
            <p>
              Generate text from spoken Urdu audio using AI speech
              recognition.
            </p>
          </article>

          <article>
            <h3>Customize Your Captions</h3>
            <p>
              Change font size, text color, background, outline, and
              subtitle position.
            </p>
          </article>

          <article>
            <h3>Animated Subtitles</h3>
            <p>
              Choose from different subtitle animations to style your
              video captions.
            </p>
          </article>

          <article>
            <h3>MP4 Video Export</h3>
            <p>
              Export your edited video with subtitles included.
            </p>
          </article>
        </div>

        <h2>How to Generate Urdu Subtitles</h2>

        <ol>
          <li>Open CAPKUP AI and log in to your account.</li>
          <li>Upload your video file.</li>
          <li>Select Urdu or Auto Detect in AI transcription.</li>
          <li>Generate your subtitles.</li>
          <li>Customize your captions and export your video.</li>
        </ol>

        <h2>اردو ویڈیوز کے لیے سب ٹائٹلز بنائیں</h2>

        <p className="urdu">
          CAPKUP AI کی مدد سے اپنی اردو ویڈیوز کی آواز کو تحریر میں
          تبدیل کریں۔ سب ٹائٹلز کا رنگ، فونٹ، سائز اور پوزیشن اپنی
          مرضی کے مطابق تبدیل کریں اور ویڈیو ایکسپورٹ کریں۔
        </p>

        <h2>Frequently Asked Questions</h2>

        <div className="faq">
          <details>
            <summary>Can I generate Urdu subtitles automatically?</summary>
            <p>
              Yes. Upload your video, select Urdu or Auto Detect, and
              use AI transcription to generate subtitles.
            </p>
          </details>

          <details>
            <summary>Can I customize Urdu subtitle fonts?</summary>
            <p>
              You can customize font size, text color, background,
              outline, and subtitle position.
            </p>
          </details>

          <details>
            <summary>Can I export videos with Urdu subtitles?</summary>
            <p>
              Yes. CAPKUP AI lets you export your edited video as an
              MP4 file with subtitles included.
            </p>
          </details>

          <details>
            <summary>Does CAPKUP AI support other languages?</summary>
            <p>
              Yes. You can also generate subtitles in supported
              languages such as English and Hindi.
            </p>
          </details>

          <details>
            <summary>Do I need to install software?</summary>
            <p>
              No separate desktop software is required. You can use
              CAPKUP AI through your web browser.
            </p>
          </details>
        </div>

        <div className="bottom">
          <h2>Start Creating Urdu Subtitles Today</h2>
          <p>
            Upload your video and create customized Urdu captions
            with CAPKUP AI.
          </p>
          <Link href="/login" className="button">
            Get Started Free
          </Link>
        </div>
      </section>

      <footer>
        © 2026 CAPKUP AI. All rights reserved.
        <div>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/login">Login</Link>
        </div>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .page {
          min-height: 100vh;
          background: #080d1c;
          color: #f8fafc;
          font-family: Arial, sans-serif;
        }

        .header {
          min-height: 75px;
          padding: 18px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #202943;
        }

        .logo {
          color: white;
          font-size: 25px;
          font-weight: 800;
          text-decoration: none;
        }

        .logo span {
          color: #9b7cff;
        }

        nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        nav a, footer a {
          color: #cbd5e1;
          text-decoration: none;
        }

        .login {
          background: #29204f;
          padding: 10px 18px;
          border-radius: 9px;
        }

        .hero {
          text-align: center;
          padding: 95px 20px 85px;
          background:
            radial-gradient(ellipse at top, #24215a 0%, #080d1c 65%);
        }

        .tag {
          display: inline-block;
          padding: 9px 16px;
          border: 1px solid #6652c8;
          border-radius: 30px;
          color: #c4b5fd;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .hero h1 {
          max-width: 850px;
          margin: 25px auto;
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1.15;
        }

        .hero h1 span {
          display: block;
          color: #a78bfa;
        }

        .hero p {
          max-width: 680px;
          margin: 20px auto 30px;
          color: #b8c2d8;
          font-size: 17px;
          line-height: 1.8;
        }

        .button {
          display: inline-block;
          padding: 15px 27px;
          border-radius: 10px;
          background: linear-gradient(110deg, #7048e8, #3678e8);
          color: white;
          font-weight: 700;
          text-decoration: none;
        }

        .urdu {
          direction: rtl;
          font-size: 22px;
          line-height: 2;
          color: #d8ccff;
        }

        .hero .urdu {
          margin-top: 30px;
        }

        .content {
          max-width: 1050px;
          margin: auto;
          padding: 65px 22px;
        }

        .content h2 {
          margin-top: 45px;
          margin-bottom: 18px;
          font-size: 28px;
          color: #c4b5fd;
        }

        .content p, .content li {
          color: #bdc7d9;
          font-size: 16px;
          line-height: 1.9;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 25px;
        }

        .features article {
          padding: 25px;
          border: 1px solid #29334e;
          border-radius: 14px;
          background: #111a30;
        }

        .features h3 {
          color: white;
          font-size: 19px;
        }

        .features p {
          margin-bottom: 0;
        }

        .content ol {
          padding-left: 25px;
        }

        .faq details {
          padding: 20px;
          margin: 12px 0;
          border: 1px solid #29334e;
          border-radius: 10px;
          background: #111a30;
        }

        .faq summary {
          cursor: pointer;
          color: white;
          font-weight: 700;
        }

        .faq p {
          margin-bottom: 0;
        }

        .bottom {
          text-align: center;
          margin-top: 65px;
          padding: 45px 20px;
          border: 1px solid #37306d;
          border-radius: 18px;
          background: linear-gradient(120deg, #17183d, #101c3c);
        }

        .bottom h2 {
          margin-top: 0;
        }

        footer {
          padding: 30px 15px;
          text-align: center;
          color: #8491a9;
          border-top: 1px solid #202943;
          line-height: 2.2;
        }

        @media (max-width: 600px) {
          .header {
            padding: 16px 5%;
          }

          .logo {
            font-size: 21px;
          }

          nav {
            gap: 14px;
            font-size: 14px;
          }

          .hero {
            padding: 75px 18px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .content h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </main>
  );
}
