
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "../../lib/supabase";
import Transcription from "./transcription";
import VideoExport from "./export";

const templates = [
  { name: "Classic White", color: "#ffffff", bg: "#000000" },
  { name: "Yellow Highlight", color: "#ffff00", bg: "#000000" },
  { name: "Neon Green", color: "#39ff14", bg: "#000000" },
  { name: "Red Alert", color: "#ff3333", bg: "#000000" },
  { name: "Blue Modern", color: "#40a9ff", bg: "#000000" },
  { name: "Pink Pop", color: "#ff69b4", bg: "#000000" },
  { name: "Clean Minimal", color: "#ffffff", bg: "transparent" },
  { name: "Gold Premium", color: "#ffd700", bg: "#000000" },
  { name: "Social Media", color: "#ffffff", bg: "#e91e63" },
  { name: "Cinema Style", color: "#ffffff", bg: "#222222" },
];

const animationOptions = [
  { value: "none", label: "None" },
  { value: "fadeIn", label: "Fade In" },
  { value: "fadeUp", label: "Fade Up" },
  { value: "popUp", label: "Pop Up" },
  { value: "zoomIn", label: "Zoom In" },
  { value: "slideUp", label: "Slide Up" },
  { value: "bounce", label: "Bounce" },
  { value: "typewriter", label: "Typewriter" },
];

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [subtitle, setSubtitle] = useState("Your subtitles will appear here");
  const [subtitleMode, setSubtitleMode] = useState("sentence");
  const [subtitleChunks, setSubtitleChunks] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(28);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [bold, setBold] = useState(true);
  const [outline, setOutline] = useState(true);

  const [bgMode, setBgMode] = useState("color");
  const [bgColor, setBgColor] = useState("#000000");

  const [captionX, setCaptionX] = useState(50);
  const [captionY, setCaptionY] = useState(88);
  const [positionMode, setPositionMode] = useState("automatic");

  const [fontUrl, setFontUrl] = useState("");
  const [fontName, setFontName] = useState("");

  const [subtitleAnimation, setSubtitleAnimation] = useState("none");

  const previewRef = useRef(null);
  const fontInputRef = useRef(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
    });
  }, [router]);

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

  async function handleLogout() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push("/login");
  }

  function handleVideoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setVideo(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleFontUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const validExtensions = [".ttf", ".otf", ".woff", ".woff2"];

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(extension)) {
      alert("Please upload a TTF, OTF, WOFF or WOFF2 font file.");
      return;
    }

    if (fontUrl) URL.revokeObjectURL(fontUrl);

    const url = URL.createObjectURL(file);

    setFontUrl(url);
    setFontName(file.name);
    setFontFamily("UserUploadedFont");
  }

  function applyTemplate(template) {
    setFontColor(template.color);

    if (template.bg === "transparent") {
      setBgMode("none");
    } else {
      setBgMode("color");
      setBgColor(template.bg);
    }

    setBold(true);
    setOutline(true);
  }

  function handlePointerDown(event) {
    event.preventDefault();
    event.stopPropagation();

    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setPositionMode("manual");
  }

  function handlePointerMove(event) {
    if (!draggingRef.current || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setCaptionX(Math.min(95, Math.max(5, x)));
    setCaptionY(Math.min(95, Math.max(5, y)));
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  function resetPosition() {
    setCaptionX(50);
    setCaptionY(88);
    setPositionMode("automatic");
  }

  const captionBackground =
    bgMode === "none" ? "transparent" : bgColor;

  const activeChunk = subtitleChunks.find(
    (chunk) =>
      currentTime >= chunk.start &&
      currentTime <= chunk.end
  );

  const displayedSubtitle =
    subtitleChunks.length > 0
      ? activeChunk?.text || ""
      : subtitle || "Your subtitles";

  const animationKey = activeChunk
    ? `${activeChunk.start}-${activeChunk.end}-${activeChunk.text}`
    : displayedSubtitle;

  const previewAnimation =
    subtitleAnimation === "none"
      ? "none"
      : `${subtitleAnimation} 0.4s ease-out both`;

  if (!user) {
    return (
      <main style={styles.loading}>
        Loading your workspace...
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popUp {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.2);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0% {
            opacity: 0;
            transform: translateY(-25px);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
          70% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes typewriter {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>

      {/* PROFESSIONAL HEADER */}

      <header style={styles.header}>
        <div style={styles.brandContainer}>
          <div style={styles.brandIcon}>
            C
          </div>

          <div>
            <h1 style={styles.logo}>
              CAPKUP <span style={{ color: "#65a8ff" }}>AI</span>
            </h1>

            <p style={styles.smallText}>
              VIDEO SUBTITLE STUDIO
            </p>
          </div>
        </div>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section style={styles.container}>
        <h2 style={styles.heading}>Your Subtitle Editor</h2>

        <p style={styles.description}>
          Upload your video and customize your subtitle appearance.
        </p>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>1. Upload Video</h3>

          <label style={styles.uploadBox}>
            <span style={styles.uploadIcon}>＋</span>
            <span>Choose Video</span>
            <small>MP4, MOV and other video formats</small>

            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              style={{ display: "none" }}
            />
          </label>

          {video && (
            <p style={styles.fileName}>
              Selected: {video.name}
            </p>
          )}
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>2. Video Preview</h3>

          <div ref={previewRef} style={styles.preview}>
            {previewUrl ? (
              <video
                src={previewUrl}
                controls
                onTimeUpdate={(e) =>
                  setCurrentTime(e.target.currentTime)
                }
                style={styles.video}
              />
            ) : (
              <div style={styles.emptyPreview}>
                Your video preview will appear here
              </div>
            )}

            {previewUrl && (
              <div
                key={animationKey}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                  ...styles.captionOverlay,
                  left: `${captionX}%`,
                  top: `${captionY}%`,
                  color: fontColor,
                  fontFamily:
                    fontFamily === "UserUploadedFont"
                      ? "UserUploadedFont"
                      : fontFamily,
                  fontSize: `${fontSize}px`,
                  fontWeight: bold ? "bold" : "normal",
                  background: captionBackground,
                  textShadow: outline
                    ? "2px 2px 2px #000, -2px -2px 2px #000"
                    : "none",
                  borderRadius: bgMode === "none" ? "0" : "6px",
                  animation: previewAnimation,
                }}
              >
                {displayedSubtitle}
              </div>
            )}
          </div>

          <p style={styles.hint}>
            Drag the subtitle with your finger or mouse to move it anywhere
            inside the video.
          </p>

          <Transcription
            videoFile={video}
            onTranscriptionComplete={(data) => {
              setSubtitle(data.text);
              setSubtitleChunks(data.chunks || []);
              setSubtitleMode("sentence");
            }}
          />

          <div style={styles.positionRow}>
            <span style={styles.positionText}>
              Position: {positionMode === "automatic" ? "Automatic" : "Custom"}
            </span>

            <button
              style={styles.resetButton}
              onClick={resetPosition}
            >
              Reset Automatic Position
            </button>
          </div>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>3. Subtitle Text</h3>

          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter your subtitle text..."
            style={styles.textarea}
          />

          <label style={styles.label}>Subtitle Display Mode</label>

          <select
            value={subtitleMode}
            onChange={(e) => setSubtitleMode(e.target.value)}
            style={styles.select}
          >
            <option value="sentence">Sentence Subtitles</option>
            <option value="word">Word-by-Word Preview</option>
          </select>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>4. Subtitle Animation</h3>

          <label style={styles.label}>Choose Animation Style</label>

          <select
            value={subtitleAnimation}
            onChange={(e) => setSubtitleAnimation(e.target.value)}
            style={styles.select}
          >
            {animationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <p style={styles.hint}>
            Select an animation to preview how your subtitles appear.
          </p>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>5. Font Settings</h3>

          <label style={styles.label}>Font Family</label>

          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={styles.select}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Impact">Impact</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>

            {fontUrl && (
              <option value="UserUploadedFont">
                {fontName || "Uploaded Font"}
              </option>
            )}
          </select>

          {fontUrl && (
            <style>
              {`@font-face {
                font-family: "UserUploadedFont";
                src: url("${fontUrl}");
              }`}
            </style>
          )}

          <input
            ref={fontInputRef}
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFontUpload}
            style={{ display: "none" }}
          />

          <button
            style={styles.fontUploadButton}
            onClick={() => fontInputRef.current?.click()}
          >
            <span style={styles.fontButtonIcon}>＋</span>
            <span>
              <strong>Upload Custom Font</strong>
              <small>TTF, OTF, WOFF and WOFF2 supported</small>
            </span>
          </button>

          {fontName && (
            <p style={styles.fileName}>
              Uploaded font: {fontName}
            </p>
          )}

          <label style={styles.label}>
            Font Size: {fontSize}px
          </label>

          <input
            type="range"
            min="12"
            max="60"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={styles.range}
          />

          <label style={styles.label}>Font Color</label>

          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            style={styles.colorInput}
          />

          <label style={styles.checkLabel}>
            <input
              type="checkbox"
              checked={bold}
              onChange={(e) => setBold(e.target.checked)}
            />
            Bold Text
          </label>

          <label style={styles.checkLabel}>
            <input
              type="checkbox"
              checked={outline}
              onChange={(e) => setOutline(e.target.checked)}
            />
            Text Outline
          </label>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>6. Background Color</h3>

          <label style={styles.label}>Background Option</label>

          <select
            value={bgMode}
            onChange={(e) => setBgMode(e.target.value)}
            style={styles.select}
          >
            <option value="color">Choose Background Color</option>
            <option value="none">No Background</option>
          </select>

          {bgMode === "color" && (
            <>
              <label style={styles.label}>Select Color</label>

              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={styles.colorInput}
              />
            </>
          )}
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>7. Caption Templates</h3>

          <div style={styles.templateGrid}>
            {templates.map((template) => (
              <button
                key={template.name}
                onClick={() => applyTemplate(template)}
                style={{
                  ...styles.templateButton,
                  color: template.color,
                  background:
                    template.bg === "transparent"
                      ? "#333"
                      : template.bg,
                }}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          <h3 style={styles.sectionTitle}>8. Export Video</h3>

          <VideoExport
            videoFile={video}
            subtitleChunks={subtitleChunks}
            fontSize={fontSize}
            fontColor={fontColor}
            bold={bold}
            outline={outline}
            subtitleAnimation={subtitleAnimation}
          />
        </div>

        <div style={styles.notice}>
          Create professional subtitles with CAPKUP AI. Customize, animate and export your videos in MP4.
        </div>
      </section>

      {/* PROFESSIONAL FOOTER */}

      <footer style={styles.footer}>
        <div style={styles.footerBrand}>
          CAPKUP <span style={{ color: "#65a8ff" }}>AI</span>
        </div>

        <p style={styles.footerTagline}>
          Create. Customize. Captivate.
        </p>

        <div style={styles.footerDivider}></div>

        <p style={styles.footerCopyright}>
          © 2026 CAPKUP AI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1020",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 5%",
    borderBottom: "1px solid #263047",
    background: "#10182a",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  brandIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "13px",
    background: "linear-gradient(135deg, #6c45ff, #29a8ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "900",
    color: "#ffffff",
    boxShadow: "0 4px 18px rgba(108,69,255,0.35)",
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#ffffff",
  },
  smallText: {
    margin: "4px 0 0",
    color: "#9ca9c0",
    fontSize: "10px",
    letterSpacing: "2px",
  },
  logout: {
    background: "#263047",
    color: "#fff",
    border: "1px solid #405475",
    borderRadius: "8px",
    padding: "10px 17px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  container: {
    width: "90%",
    maxWidth: "850px",
    margin: "30px auto",
  },
  heading: {
    fontSize: "27px",
    marginBottom: "8px",
  },
  description: {
    color: "#9ca9c0",
    marginBottom: "25px",
  },
  panel: {
    background: "#151e32",
    border: "1px solid #293650",
    borderRadius: "13px",
    padding: "20px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    marginTop: 0,
    marginBottom: "18px",
  },
  uploadBox: {
    minHeight: "125px",
    border: "2px dashed #45628d",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    color: "#8bbcff",
    cursor: "pointer",
  },
  uploadIcon: {
    fontSize: "30px",
  },
  fileName: {
    color: "#8bbcff",
    fontSize: "13px",
    overflowWrap: "anywhere",
  },
  preview: {
    position: "relative",
    width: "100%",
    background: "#000",
    overflow: "hidden",
    borderRadius: "10px",
    lineHeight: 0,
    touchAction: "pan-y",
  },
  video: {
    display: "block",
    width: "100%",
    maxHeight: "550px",
    objectFit: "contain",
  },
  emptyPreview: {
    minHeight: "230px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca9c0",
    lineHeight: 1.5,
    textAlign: "center",
  },
  captionOverlay: {
    position: "absolute",
    zIndex: 5,
    transform: "translate(-50%, -50%)",
    padding: "7px 12px",
    maxWidth: "90%",
    width: "max-content",
    textAlign: "center",
    lineHeight: 1.3,
    overflowWrap: "anywhere",
    cursor: "grab",
    userSelect: "none",
    touchAction: "none",
    pointerEvents: "auto",
    transformOrigin: "center center",
  },
  hint: {
    color: "#9ca9c0",
    fontSize: "12px",
    lineHeight: 1.5,
    marginTop: "12px",
  },
  positionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },
  positionText: {
    color: "#8bbcff",
    fontSize: "13px",
  },
  resetButton: {
    background: "#263e63",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    padding: "9px 12px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    minHeight: "90px",
    resize: "vertical",
    boxSizing: "border-box",
    background: "#0b1020",
    color: "#fff",
    border: "1px solid #354563",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "15px",
  },
  label: {
    display: "block",
    marginTop: "17px",
    marginBottom: "8px",
    color: "#c5d0e2",
    fontSize: "14px",
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #354563",
    background: "#0b1020",
    color: "#fff",
    fontSize: "14px",
  },
  fontUploadButton: {
    width: "100%",
    minHeight: "75px",
    marginTop: "16px",
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "13px",
    border: "1px solid #5289d4",
    borderRadius: "11px",
    background: "#203b62",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    textAlign: "left",
  },
  fontButtonIcon: {
    fontSize: "28px",
    color: "#8bbcff",
  },
  range: {
    width: "100%",
    accentColor: "#65a8ff",
  },
  colorInput: {
    width: "65px",
    height: "42px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginTop: "14px",
    color: "#c5d0e2",
    fontSize: "14px",
  },
  templateGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "10px",
  },
  templateButton: {
    minHeight: "55px",
    border: "1px solid #52617b",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "12px",
  },
  notice: {
    background: "#202b42",
    border: "1px solid #405475",
    borderRadius: "10px",
    padding: "15px",
    color: "#c5d0e2",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  footer: {
    textAlign: "center",
    borderTop: "1px solid #263047",
    marginTop: "40px",
    padding: "30px 15px",
    background: "#10182a",
  },
  footerBrand: {
    fontSize: "22px",
    fontWeight: "900",
    letterSpacing: "1px",
    color: "#ffffff",
  },
  footerTagline: {
    color: "#9ca9c0",
    fontSize: "13px",
    margin: "8px 0 18px",
  },
  footerDivider: {
    width: "55px",
    height: "3px",
    background: "linear-gradient(90deg, #6c45ff, #29a8ff)",
    borderRadius: "5px",
    margin: "0 auto 18px",
  },
  footerCopyright: {
    color: "#75839b",
    fontSize: "12px",
    margin: 0,
  },
  loading: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0b1020",
    color: "#fff",
  },
};
