
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Checking your account...");

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        window.location.href = "/login";
        return;
      }

      setEmail(data.user.email || "");
      setStatus("Your account is connected.");
    });
  }, []);

  async function logout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main className="wrap">
      <div className="container">
        <header className="top">
          <Link className="logo" href="/">
            CAPKUP<span> AI</span>
          </Link>

          <button className="pill" onClick={logout}>
            Log out
          </button>
        </header>

        <section className="panel">
          <h1>Your workspace</h1>
          <p className="muted">{status}</p>
          <p>{email}</p>

          <div className="feature">
            <h3>Video subtitle generator</h3>
            <p className="muted">
              Video upload, automatic transcription,
              animated captions, and MP4 export will be
              added in the next development stage.
            </p>
            <span className="pill">Coming soon</span>
          </div>
        </section>
      </div>
    </main>
  );
}
