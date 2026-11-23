
import Link from "next/link";

const features = [
  {
    icon: "✦",
    title: "AI Video Transcription",
    description:
      "Automatically convert speech in your videos into subtitles using AI-powered speech recognition.",
  },
  {
    icon: "🌍",
    title: "Multiple Subtitle Languages",
    description:
      "Create video subtitles in Urdu, English, Hindi and other supported languages.",
  },
  {
    icon: "🎨",
    title: "Custom Caption Styles",
    description:
      "Customize subtitle fonts, colors, backgrounds and professional caption templates.",
  },
  {
    icon: "⚡",
    title: "Animated Subtitles",
    description:
      "Make your video captions engaging with different subtitle animation styles.",
  },
  {
    icon: "↗",
    title: "Drag and Position Captions",
    description:
      "Move your subtitles anywhere inside your video preview and choose your preferred position.",
  },
  {
    icon: "▶",
    title: "MP4 Video Export",
    description:
      "Export your finished videos with subtitles and audio in MP4 format.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Your Video",
    description:
      "Choose a video from your device and open your CAPKUP AI subtitle editing workspace.",
  },
  {
    number: "02",
    title: "Generate and Customize Subtitles",
    description:
      "Generate subtitles using AI and customize fonts, colors, animations and caption positions.",
  },
  {
    number: "03",
    title: "Export Your Subtitled Video",
    description:
      "Export your completed video with subtitles and audio in MP4 format.",
  },
];

const faqs = [
  {
    question: "What is CAPKUP AI?",
    answer:
      "CAPKUP AI is an online AI video subtitle generator. It helps you generate subtitles from videos, customize captions and export subtitled videos in MP4 format.",
  },
  {
    question: "Can I generate subtitles automatically?",
    answer:
      "Yes. CAPKUP AI uses AI speech recognition to transcribe speech from your uploaded video and generate subtitle text with timestamps.",
  },
  {
    question: "Which languages does CAPKUP AI support?",
    answer:
      "CAPKUP AI includes language options such as Urdu, English and Hindi, along with other available transcription languages.",
  },
  {
    question: "Can I customize subtitle fonts and colors?",
    answer:
      "Yes. You can customize font styles, font sizes, text colors, backgrounds, outlines and caption templates.",
  },
  {
    question: "Can I move subtitles on my video?",
    answer:
      "Yes. You can drag the subtitle position inside the video preview and place captions where you want them.",
  },
  {
    question: "Can I export videos with subtitles?",
    answer:
      "Yes. CAPKUP AI lets you export your subtitled video as an MP4 file with its audio.",
  },
];

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .landing {
          min-height: 100vh;
          background: #0b1020;
          color: #ffffff;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .landing a {
          text-decoration: none;
        }

        .nav {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 20px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .brand-icon {
          width: 45px;
          height: 45px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #7048ff, #25a9ff);
          font-size: 25px;
          font-weight: 900;
          box-shadow: 0 5px 25px rgba(91, 105, 255, 0.3);
        }

        .brand-name {
          font-size: 23px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .brand-name span {
          color: #65a8ff;
        }

        .brand-tag {
          color: #8796b0;
          font-size: 9px;
          letter-spacing: 2px;
          margin-top: 4px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-links a {
          color: #bdc8da;
          font-size: 14px;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #ffffff;
        }

        .login-btn {
          padding: 11px 20px;
          border: 1px solid #405475;
          border-radius: 9px;
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          background: #17233a;
        }

        .hero {
          max-width: 1100px;
          margin: auto;
          padding: 105px 25px 100px;
          text-align: center;
          position: relative;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(91, 73, 255, 0.15);
          filter: blur(100px);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-label {
          display: inline-block;
          padding: 10px 17px;
          border: 1px solid #394b75;
          border-radius: 30px;
          background: rgba(50, 72, 125, 0.2);
          color: #9fc6ff;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .hero h1 {
          max-width: 850px;
          margin: 27px auto 20px;
          font-size: clamp(42px, 7vw, 76px);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #8c6bff, #39b9ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-description {
          max-width: 680px;
          margin: 0 auto;
          color: #a7b4ca;
          font-size: 17px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 35px;
        }

        .primary-btn {
          display: inline-block;
          padding: 15px 28px;
          border-radius: 10px;
          color: #ffffff;
          font-weight: bold;
          font-size: 15px;
          background: linear-gradient(100deg, #7048ff, #278fff);
          box-shadow: 0 8px 25px rgba(80, 100, 255, 0.25);
          transition: transform 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-3px);
        }

        .secondary-btn {
          display: inline-block;
          padding: 15px 28px;
          border: 1px solid #405475;
          border-radius: 10px;
          color: #ffffff;
          font-weight: bold;
          font-size: 15px;
          background: #151e32;
        }

        .hero-note {
          color: #71819d;
          font-size: 12px;
          margin-top: 20px;
        }

        .section {
          max-width: 1150px;
          margin: auto;
          padding: 75px 25px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 45px;
        }

        .section-heading span {
          color: #70aaff;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .section-heading h2 {
          font-size: clamp(28px, 4vw, 40px);
          margin: 14px 0;
        }

        .section-heading p {
          color: #9ca9c0;
          font-size: 15px;
          line-height: 1.7;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .feature-card {
          padding: 26px 23px;
          border: 1px solid #293650;
          border-radius: 14px;
          background: linear-gradient(145deg, #17233a, #111a2d);
          transition: transform 0.2s, border-color 0.2s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #596fc0;
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #26365a;
          font-size: 23px;
        }

        .feature-card h3 {
          margin: 20px 0 10px;
          font-size: 18px;
        }

        .feature-card p {
          color: #9ca9c0;
          font-size: 13px;
          line-height: 1.8;
          margin: 0;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .step-card {
          padding: 25px;
          border-radius: 13px;
          background: #151e32;
          border: 1px solid #293650;
        }

        .step-number {
          color: #78aaff;
          font-size: 30px;
          font-weight: 900;
        }

        .step-card h3 {
          font-size: 18px;
          margin: 18px 0 10px;
        }

        .step-card p {
          color: #9ca9c0;
          font-size: 13px;
          line-height: 1.8;
        }

        .about-content {
          max-width: 850px;
          margin: auto;
          padding: 30px;
          border: 1px solid #293650;
          border-radius: 15px;
          background: #121c30;
        }

        .about-content h3 {
          color: #ffffff;
          font-size: 21px;
          margin: 0 0 14px;
        }

        .about-content p {
          color: #a7b4ca;
          font-size: 14px;
          line-height: 1.9;
          margin: 0 0 15px;
        }

        .faq-list {
          max-width: 850px;
          margin: auto;
          display: grid;
          gap: 13px;
        }

        .faq-item {
          border: 1px solid #293650;
          border-radius: 12px;
          background: #151e32;
          overflow: hidden;
        }

        .faq-item summary {
          padding: 20px;
          cursor: pointer;
          color: #ffffff;
          font-size: 15px;
          font-weight: bold;
          line-height: 1.6;
        }

        .faq-item summary::marker {
          color: #78aaff;
        }

        .faq-item p {
          padding: 0 20px 20px;
          margin: 0;
          color: #a7b4ca;
          font-size: 14px;
          line-height: 1.8;
        }

        .cta {
          max-width: 1100px;
          margin: 45px auto 90px;
          padding: 65px 25px;
          border: 1px solid #394c78;
          border-radius: 20px;
          text-align: center;
          background:
            radial-gradient(circle at top left, rgba(112,72,255,0.25), transparent 45%),
            linear-gradient(135deg, #172440, #121b30);
        }

        .cta h2 {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 15px;
        }

        .cta p {
          color: #a7b4ca;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .footer {
          border-top: 1px solid #263047;
          background: #10182a;
          text-align: center;
          padding: 35px 20px;
        }

        .footer-brand {
          font-size: 23px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .footer-brand span {
          color: #65a8ff;
        }

        .footer p {
          color: #8796b0;
          font-size: 12px;
          margin: 12px 0;
        }

        .footer-line {
          width: 55px;
          height: 3px;
          margin: 18px auto;
          border-radius: 5px;
          background: linear-gradient(90deg, #7048ff, #29a8ff);
        }

        @media (max-width: 750px) {
          .nav {
            padding: 15px;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 80px 20px 65px;
          }

          .hero h1 {
            letter-spacing: -1px;
          }

          .hero-description {
            font-size: 15px;
          }

          .section {
            padding: 55px 18px;
          }

          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .feature-card {
            padding: 19px 15px;
          }

          .feature-card h3 {
            font-size: 15px;
          }

          .feature-card p {
            font-size: 12px;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .about-content {
            padding: 22px;
          }

          .cta {
            margin: 25px 15px 60px;
            padding: 45px 20px;
          }
        }

        @media (max-width: 400px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }

          .brand-name {
            font-size: 20px;
          }

          .login-btn {
            padding: 10px 13px;
          }
        }
      `}</style>

      <header className="nav">
        <Link href="/" className="brand">
          <div className="brand-icon">C</div>
          <div>
            <div className="brand-name">
              CAPKUP<span> AI</span>
            </div>
            <div className="brand-tag">VIDEO SUBTITLE STUDIO</div>
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
        </nav>

        <Link href="/login" className="login-btn">
          Log in
        </Link>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-label">
            ✦ AI POWERED VIDEO SUBTITLES
          </div>

          <h1>
            AI Video Subtitle Generator.
            <br />
            <span className="gradient-text">
              Your Videos. Your Captions.
            </span>
          </h1>

          <p className="hero-description">
            Create professional video subtitles online with CAPKUP AI.
            Automatically transcribe speech, generate captions in Urdu,
            English and Hindi, customize subtitle styles and export
            your videos with subtitles in MP4 format.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="primary-btn">
              Get Started Free →
            </Link>

            <a href="#features" className="secondary-btn">
              Explore Features
            </a>
          </div>

          <p className="hero-note">
            Upload. Transcribe. Customize. Export.
          </p>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <span>POWERFUL FEATURES</span>
          <h2>Online Video Subtitle Generator Features</h2>
          <p>
            Everything you need to generate, edit and export video captions
            in one simple workspace.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>How to Add Subtitles to Your Videos</h2>
          <p>
            Follow three simple steps to create your subtitled video with
            CAPKUP AI.
          </p>
        </div>

        <div className="steps">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span>ABOUT CAPKUP AI</span>
          <h2>Create Video Captions Online with AI</h2>
        </div>

        <div className="about-content">
          <h3>A Simple AI Subtitle Generator for Video Creators</h3>

          <p>
            CAPKUP AI is an online video subtitle generator designed to
            help creators add captions to their videos. Use AI speech
            recognition to turn spoken words into subtitle text, then
            customize the appearance of your captions in the editing
            workspace.
          </p>

          <p>
            Whether you create YouTube videos, social media clips,
            educational content or short videos, subtitles can help
            viewers follow the spoken content. CAPKUP AI gives you tools
            to adjust fonts, colors, backgrounds, animations and subtitle
            positions before exporting your video.
          </p>

          <p>
            Create Urdu subtitles, English captions and Hindi subtitles
            with the available transcription language options. When your
            video is ready, export it as an MP4 file with subtitles and
            audio.
          </p>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-heading">
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h2>CAPKUP AI FAQs</h2>
          <p>
            Find answers about AI transcription, subtitle customization
            and video export.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Create Better Videos?</h2>
        <p>
          Generate AI subtitles, customize your captions and export
          your videos with CAPKUP AI.
        </p>

        <Link href="/login" className="primary-btn">
          Start Creating Now →
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          CAPKUP<span> AI</span>
        </div>

        <p>Create. Customize. Captivate.</p>

        <div className="footer-line"></div>

        <p>© 2026 CAPKUP AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
