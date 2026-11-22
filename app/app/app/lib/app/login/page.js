
"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabase } from "../../lib/supabase";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const supabase = getSupabase();

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });

        if (error) throw error;

        setMessage("Account request sent. Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        window.location.href = "/dashboard";
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="wrap">
      <div className="container">
        <header className="top">
          <Link className="logo" href="/">
            CAPKUP<span> AI</span>
          </Link>
          <Link className="pill" href="/">Home</Link>
        </header>

        <form className="panel" onSubmit={submit}>
          <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>

          <p className="muted">
            Use your email and password to access CAPKUP AI.
          </p>

          <label>Email address</label>
          <input
            className="field"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            className="field"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />

          <button className="btn full" disabled={busy}>
            {busy ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
          </button>

          {message && <p className="muted">{message}</p>}

          <p className="small">
            {mode === "login" ? "New to CAPKUP? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage("");
              }}
              style={{
                background: "none",
                border: 0,
                color: "#a99fff",
                cursor: "pointer"
              }}
            >
              {mode === "login" ? "Create account" : "Log in"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
              }
