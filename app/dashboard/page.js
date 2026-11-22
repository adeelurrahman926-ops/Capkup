
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabase(), []);

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;

      if (error || !data.user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [supabase, router]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(event) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("video/")) {
      setError("Please select a video file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return <main style={{ padding: 40, color: "white", background: "#090d18", minHeight: "100vh" }}>Loading...</main>;
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090d18",
      color: "white",
      padding: "30px 18px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: 850, margin: "auto" }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 45
        }}>
          <h2 style={{ color: "#8b9cff" }}>CAPKUP AI</h2>
          <button onClick={handleLogout} style={{
            background: "#202a40",
            color: "white",
            border: 0,
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer"
          }}>
            Logout
          </button>
        </header>

        <h1 style={{ fontSize: 32 }}>Video Subtitle Generator</h1>
        <p style={{ color: "#aab4c8", lineHeight: 1.6 }}>
          Upload your video to start creating subtitles.
        </p>

        <section style={{
          marginTop: 30,
          padding: 25,
          background: "#141c2e",
          border: "1px solid #293650",
          borderRadius: 16
        }}>
          <label style={{
            display: "block",
            padding: "35px 15px",
            border: "2px dashed #586b91",
            borderRadius: 12,
            textAlign: "center",
            cursor: "pointer"
          }}>
            <div style={{ fontSize: 42 }}>📁</div>
            <h3>Select your video</h3>
            <p style={{ color: "#aab4c8" }}>MP4, MOV, WebM and other video formats</p>
            <span style={{
              display: "inline-block",
              background: "#6478ff",
              padding: "12px 22px",
              borderRadius: 8,
              marginTop: 10
            }}>
              Choose Video
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>

          {error && (
            <p style={{ color: "#ff7777" }}>{error}</p>
          )}

          {file && (
            <div style={{ marginTop: 25 }}>
              <h3>Video Preview</h3>
              <p style={{ color: "#aab4c8", overflowWrap: "anywhere" }}>
                {file.name}
              </p>
              <video
                src={previewUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: 450,
                  background: "black",
                  borderRadius: 10
                }}
              />
              <p style={{ color: "#aab4c8" }}>
                Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}
        </section>

        <p style={{
          color: "#8793aa",
          textAlign: "center",
          marginTop: 30,
          fontSize: 13
        }}>
          Automatic transcription and subtitle editing are coming next.
        </p>
      </div>
    </main>
  );
}
