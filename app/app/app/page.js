
import Link from "next/link";

export default function Home() {
  return (
    <main className="wrap">
      <div className="container">
        <header className="top">
          <div className="logo">
            CAPKUP<span> AI</span>
          </div>
          <Link className="pill" href="/login">
            Log in
          </Link>
        </header>

        <section className="hero">
          <div className="pill" style={{ display: "inline-block" }}>
            AI VIDEO SUBTITLES
          </div>

          <h1>
            Make every word
            <br />
            easy to follow.
          </h1>

          <p>
            Generate subtitles for your videos.
            Choose your language and caption style,
            then prepare your video for your audience.
          </p>

          <Link className="btn" href="/login">
            Get started
          </Link>
        </section>

        <section className="features">
          <div className="feature">
            <h3>Multiple languages</h3>
            <p className="muted">
              Build subtitles for audiences around the world.
            </p>
          </div>

          <div className="feature">
            <h3>Caption styles</h3>
            <p className="muted">
              Choose clean subtitles or animated captions.
            </p>
          </div>

          <div className="feature">
            <h3>Your workspace</h3>
            <p className="muted">
              Sign in to access your CAPKUP account.
            </p>
          </div>
        </section>

        <p className="small">
          CAPKUP AI is under development.
          Video transcription and export will be connected later.
        </p>
      </div>
    </main>
  );
}
