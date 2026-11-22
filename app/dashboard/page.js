
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabase(), []);

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [subtitle, setSubtitle] = useState("Your subtitles will appear here.");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [position, setPosition] = useState("bottom");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [bold, setBold] = useState(true);
  const [outline, setOutline] = useState(true);
  const [captionMode, setCaptionMode] = useState("sentence");

  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) router.replace("/login");
      else setLoading(false);
    });

    return () => { active = false; };
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
      alert("Please select a video file.");
      return;
    }

    setFile(selected);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return <main style={{ padding: 40, color: "white", background: "#090d18", minHeight: "100vh" }}>Loading...</main>;
  }

  const buttonStyle = {
    padding: "10px 14px",
    background: "#27334d",
    color: "white",
    border: "1px solid #43516c",
    borderRadius: 8,
    cursor: "pointer"
  };

  const labelStyle = {
    display: "block",
    color: "#b8c4da",
    marginBottom: 8,
    fontSize: 14
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#090d18",
      color: "white",
      padding: "24px 16px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ maxWidth: 1100, margin: "auto" }}>

        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30
        }}>
          <h2 style={{ color: "#8b9cff" }}>CAPKUP AI</h2>
          <button style={buttonStyle} onClick={handleLogout}>Logout</button>
        </header>

        <h1 style={{ fontSize: 30 }}>Subtitle Editor</h1>
        <p style={{ color: "#aab4c8" }}>
          Upload your video and customize your subtitles.
        </p>

        <section style={{
          background: "#141c2e",
          padding: 20,
          borderRadius: 14,
          marginTop: 24
        }}>
          <h3>1. Upload Video</h3>

          <input
            type="file"
            accept="video/*"
            onChange={handleFile}
            style={{ display: "block", marginTop: 15, color: "white" }}
          />

          {file && (
            <p style={{ color: "#aab4c8", overflowWrap: "anywhere" }}>
              Selected: {file.name}
            </p>
          )}
        </section>

        <section style={{
          background: "#141c2e",
          padding: 20,
          borderRadius: 14,
          marginTop: 20
        }}>
          <h3>2. Live Video Preview</h3>

          <div style={{
            position: "relative",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            marginTop: 15,
            minHeight: 220
          }}>
            {file ? (
              <video
                src={previewUrl}
                controls
                style={{ width: "100%", display: "block", maxHeight: 550 }}
              />
            ) : (
              <div style={{
                minHeight: 250,
                display: "grid",
                placeItems: "center",
                color: "#8793aa"
              }}>
                Upload a video to see preview
              </div>
            )}

            {file && (
              <div style={{
                position: "absolute",
                left: "5%",
                right: "5%",
                textAlign: "center",
                pointerEvents: "none",
                ...(position === "top" ? { top: 25 } :
                   position === "middle" ? { top: "45%" } :
                   { bottom: 55 })
              }}>
                <span style={{
                  display: "inline-block",
                  color: fontColor,
                  background: bgColor === "transparent" ? "transparent" : bgColor,
                  padding: "7px 12px",
                  borderRadius: 6,
                  fontSize: `${fontSize}px`,
                  fontFamily,
                  fontWeight: bold ? "bold" : "normal",
                  textShadow: outline
                    ? "2px 2px 2px black, -2px -2px 2px black"
                    : "none",
                  overflowWrap: "anywhere"
                }}>
                  {captionMode === "word"
                    ? subtitle.split(" ").map((word, index) => (
                        <span key={index} style={{
                          display: "inline-block",
                          marginRight: 7
                        }}>{word}</span>
                      ))
                    : subtitle}
                </span>
              </div>
            )}
          </div>
        </section>

        <section style={{
          background: "#141c2e",
          padding: 20,
          borderRadius: 14,
          marginTop: 20
        }}>
          <h3>3. Subtitle Text</h3>

          <label style={labelStyle}>Edit your subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              background: "#090d18",
              color: "white",
              border: "1px solid #43516c",
              fontSize: 16
            }}
          />

          <label style={{ ...labelStyle, marginTop: 18 }}>Caption Style</label>
          <select
            value={captionMode}
            onChange={(e) => setCaptionMode(e.target.value)}
            style={{
              ...buttonStyle,
              width: "100%"
            }}
          >
            <option value="sentence">Normal Sentence</option>
            <option value="word">Word by Word Preview</option>
          </select>
        </section>

        <section style={{
          background: "#141c2e",
          padding: 20,
          borderRadius: 14,
          marginTop: 20
        }}>
          <h3>4. Customize Subtitles</h3>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Font Style</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              style={{ ...buttonStyle, width: "100%" }}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Impact">Impact</option>
            </select>
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Font Size: {fontSize}px</label>
            <input
              type="range"
              min="14"
              max="60"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 20 }}>
            <div>
              <label style={labelStyle}>Text Colour</label>
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                style={{ width: "100%", height: 42 }}
              />
            </div>

            <div>
              <label style={labelStyle}>Background Colour</label>
              <input
                type="color"
                value={bgColor === "transparent" ? "#000000" : bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: "100%", height: 42 }}
              />
            </div>
          </div>

          <button
            style={{ ...buttonStyle, marginTop: 14 }}
            onClick={() => setBgColor("transparent")}
          >
            Transparent Background
          </button>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Subtitle Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{ ...buttonStyle, width: "100%" }}
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 25, flexWrap: "wrap", marginTop: 22 }}>
            <label>
              <input
                type="checkbox"
                checked={bold}
                onChange={(e) => setBold(e.target.checked)}
              /> Bold
            </label>

            <label>
              <input
                type="checkbox"
                checked={outline}
                onChange={(e) => setOutline(e.target.checked)}
              /> Text Outline
            </label>
          </div>
        </section>

        <p style={{
          color: "#8793aa",
          textAlign: "center",
          marginTop: 25,
          fontSize: 13
        }}>
          Automatic transcription and MP4 export will be connected in the next stage.
        </p>

      </div>
    </main>
  );
}
