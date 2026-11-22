
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../lib/supabase";

const templates = [
  { name: "Classic White", color: "#ffffff", bg: "#000000", size: 28, bold: true, outline: true, position: "bottom" },
  { name: "Yellow Highlight", color: "#ffe600", bg: "transparent", size: 32, bold: true, outline: true, position: "bottom" },
  { name: "Neon Green", color: "#39ff14", bg: "#111111", size: 30, bold: true, outline: false, position: "bottom" },
  { name: "Red Alert", color: "#ff3030", bg: "transparent", size: 32, bold: true, outline: true, position: "middle" },
  { name: "Blue Modern", color: "#65c7ff", bg: "#101c35", size: 28, bold: true, outline: false, position: "bottom" },
  { name: "Pink Pop", color: "#ff8edb", bg: "transparent", size: 34, bold: true, outline: true, position: "middle" },
  { name: "Clean Minimal", color: "#ffffff", bg: "transparent", size: 25, bold: false, outline: false, position: "bottom" },
  { name: "Gold Premium", color: "#ffd166", bg: "#30230b", size: 30, bold: true, outline: false, position: "bottom" },
  { name: "Social Media", color: "#ffffff", bg: "#6546d7", size: 32, bold: true, outline: false, position: "middle" },
  { name: "Cinema Style", color: "#ffffff", bg: "#000000", size: 26, bold: false, outline: true, position: "bottom" }
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabase(), []);

  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [subtitle, setSubtitle] = useState("Your subtitles will appear here.");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("transparent");
  const [position, setPosition] = useState("bottom");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [bold, setBold] = useState(true);
  const [outline, setOutline] = useState(true);
  const [captionMode, setCaptionMode] = useState("sentence");
  const [fontUrl, setFontUrl] = useState("");
  const [fontName, setFontName] = useState("");

  const previewUrl = useMemo(
    () => file ? URL.createObjectURL(file) : "",
    [file]
  );

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

  useEffect(() => {
    return () => {
      if (fontUrl) URL.revokeObjectURL(fontUrl);
    };
  }, [fontUrl]);

  function handleFile(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }

    setFile(selected);
  }

  function handleFontUpload(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    const allowed = /\.(ttf|otf|woff|woff2)$/i.test(selected.name);

    if (!allowed) {
      alert("Please upload a TTF, OTF, WOFF or WOFF2 font file.");
      return;
    }

    const url = URL.createObjectURL(selected);
    setFontUrl(url);
    setFontName(selected.name);
    setFontFamily("UserUploadedFont");
  }

  function applyTemplate(template) {
    setFontColor(template.color);
    setBgColor(template.bg);
    setFontSize(template.size);
    setBold(template.bold);
    setOutline(template.outline);
    setPosition(template.position);
    setFontFamily("Arial");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main style={{ padding: 40, color: "white", background: "#090d18", minHeight: "100vh" }}>
        Loading...
      </main>
    );
  }

  const buttonStyle = {
    padding: "12px 15px",
    background: "#27334d",
    color: "white",
    border: "1px solid #43516c",
    borderRadius: 8,
    cursor: "pointer"
  };

  const labelStyle = {
    display: "block",
    color: "#b8c4da",
    marginBottom: 9,
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
      {fontUrl && (
        <style>
          {`@font-face {
            font-family: "UserUploadedFont";
            src: url("${fontUrl}");
          }`}
        </style>
      )}

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
          Upload your video and customize your captions.
        </p>

        <section style={{
          background: "#141c2e",
          padding: 22,
          borderRadius: 14,
          marginTop: 24
        }}>
          <h3>1. Upload Video</h3>

          <label style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginTop: 18,
            padding: "35px 15px",
            minHeight: 170,
            border: "2px dashed #6478ff",
            borderRadius: 14,
            background: "#1b2740",
            cursor: "pointer",
            textAlign: "center"
          }}>
            <span style={{ fontSize: 42 }}>📁</span>
            <strong style={{ fontSize: 19 }}>Choose Your Video</strong>
            <span style={{ color: "#aab4c8", fontSize: 13 }}>
              Select MP4, MOV, WebM and other video files
            </span>
            <span style={{
              background: "#6478ff",
              padding: "13px 30px",
              borderRadius: 9,
              fontWeight: "bold"
            }}>
              Browse Videos
            </span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>

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
                ...(position === "top"
                  ? { top: 25 }
                  : position === "middle"
                  ? { top: "45%" }
                  : { bottom: 55 })
              }}>
                <span style={{
                  display: "inline-block",
                  color: fontColor,
                  background: bgColor,
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
                        <span key={index} style={{ marginRight: 7 }}>
                          {word}
                        </span>
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
              fontSize: 16,
              marginTop: 12
            }}
          />

          <label style={{ ...labelStyle, marginTop: 18 }}>Caption Mode</label>
          <select
            value={captionMode}
            onChange={(e) => setCaptionMode(e.target.value)}
            style={{ ...buttonStyle, width: "100%" }}
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
          <h3>4. Caption Templates</h3>
          <p style={{ color: "#aab4c8", fontSize: 13 }}>
            Choose any template to apply its caption style.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
            gap: 12,
            marginTop: 18
          }}>
            {templates.map((template) => (
              <button
                key={template.name}
                onClick={() => applyTemplate(template)}
                style={{
                  background: "#090d18",
                  border: "1px solid #43516c",
                  borderRadius: 10,
                  padding: "18px 8px",
                  color: template.color,
                  fontWeight: "bold",
                  fontSize: 14,
                  cursor: "pointer",
                  textShadow: template.outline ? "1px 1px 2px black" : "none"
                }}
              >
                {template.name}
              </button>
            ))}
          </div>
        </section>

        <section style={{
          background: "#141c2e",
          padding: 20,
          borderRadius: 14,
          marginTop: 20
        }}>
          <h3>5. Customize Font</h3>

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
            {fontUrl && <option value="UserUploadedFont">My Uploaded Font</option>}
          </select>

          <div style={{ marginTop: 20 }}>
            <label style={labelStyle}>Upload Your Own Font</label>
            <input
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              onChange={handleFontUpload}
              style={{ color: "white", width: "100%" }}
            />
            {fontName && (
              <p style={{ color: "#8b9cff", fontSize: 13 }}>
                Uploaded: {fontName}
              </p>
            )}
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

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 20
          }}>
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
            style={{
              ...buttonStyle,
              marginTop: 14,
              background: bgColor === "transparent" ? "#6478ff" : "#27334d"
            }}
            onClick={() => setBgColor("transparent")}
          >
            No Background
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

          <div style={{
            display: "flex",
            gap: 25,
            flexWrap: "wrap",
            marginTop: 22
          }}>
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
          Automatic transcription and MP4 export are coming in the next stage.
        </p>
      </div>
    </main>
  );
}
