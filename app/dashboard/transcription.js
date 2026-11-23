
"use client";

import { useState } from "react";
import { transcribeVideo } from "../../lib/transcribe";

export default function Transcription({ videoFile, onTranscriptionComplete }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("auto");

  async function handleTranscription() {
    if (!videoFile) {
      setError("Please upload a video first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setProgress(0);
    setStatus("Starting AI transcription...");

    try {
      const transcription = await transcribeVideo(
        videoFile,
        (info) => {
          if (info.status === "loading") {
            setStatus("Downloading AI model...");
          } else if (info.status === "processing") {
            setStatus(info.message || "Processing audio...");
          } else if (info.status === "transcribing") {
            setStatus("Converting speech into text...");
          } else if (info.status === "progress") {
            if (typeof info.progress === "number") {
              setProgress(Math.round(info.progress));
            }
          } else if (info.status === "done") {
            setProgress(100);
          }
        },
        language
      );

      if (!transcription.text.trim()) {
        throw new Error("No speech was detected in this video.");
      }

      setResult(transcription.text);
      setStatus("Transcription completed!");
      setProgress(100);

      if (onTranscriptionComplete) {
        onTranscriptionComplete(transcription);
      }
    } catch (err) {
      setError(err.message || "Transcription failed.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>AI Speech Transcription</h3>

      <p style={styles.description}>
        Select your video's spoken language to generate subtitles.
      </p>

      <label style={styles.label}>
        Choose Video Language
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        disabled={loading}
        style={styles.select}
      >
        <option value="auto">Auto Detect</option>
        <option value="urdu">Urdu</option>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="arabic">Arabic</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="german">German</option>
        <option value="portuguese">Portuguese</option>
        <option value="russian">Russian</option>
        <option value="chinese">Chinese</option>
        <option value="japanese">Japanese</option>
        <option value="korean">Korean</option>
        <option value="turkish">Turkish</option>
        <option value="bengali">Bengali</option>
        <option value="punjabi">Punjabi</option>
        <option value="persian">Persian</option>
        <option value="indonesian">Indonesian</option>
        <option value="italian">Italian</option>
        <option value="dutch">Dutch</option>
        <option value="polish">Polish</option>
      </select>

      <button
        onClick={handleTranscription}
        disabled={loading || !videoFile}
        style={{
          ...styles.button,
          opacity: loading || !videoFile ? 0.6 : 1,
          cursor: loading || !videoFile ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing Video..." : "Transcribe Video"}
      </button>

      {loading && (
        <div style={styles.progressBox}>
          <p style={styles.status}>{status}</p>

          <div style={styles.progressBackground}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>

          <small style={styles.progressText}>
            {progress > 0 ? `${progress}%` : "Please wait..."}
          </small>
        </div>
      )}

      {status === "Transcription completed!" && (
        <p style={styles.success}>{status}</p>
      )}

      {error && (
        <p style={styles.error}>{error}</p>
      )}

      {result && (
        <div style={styles.resultBox}>
          <h4 style={styles.resultHeading}>Generated Transcript</h4>
          <p style={styles.resultText}>{result}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#151e32",
    border: "1px solid #293650",
    borderRadius: "13px",
    padding: "20px",
    marginBottom: "20px",
    color: "#ffffff",
  },
  heading: {
    fontSize: "18px",
    marginTop: 0,
  },
  description: {
    color: "#9ca9c0",
    fontSize: "13px",
    lineHeight: 1.6,
  },
  label: {
    display: "block",
    marginTop: "16px",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#ffffff",
  },
  select: {
    width: "100%",
    padding: "13px",
    border: "1px solid #394967",
    borderRadius: "9px",
    background: "#0b1020",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "15px",
    marginTop: "12px",
    border: "none",
    borderRadius: "9px",
    background: "#2878e8",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
  },
  progressBox: {
    marginTop: "18px",
  },
  status: {
    color: "#8bbcff",
    fontSize: "13px",
  },
  progressBackground: {
    width: "100%",
    height: "8px",
    background: "#293650",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#39c98a",
    transition: "width 0.3s",
  },
  progressText: {
    display: "block",
    textAlign: "right",
    marginTop: "7px",
    color: "#9ca9c0",
  },
  success: {
    color: "#39c98a",
    fontSize: "13px",
    marginTop: "15px",
  },
  error: {
    color: "#ff7777",
    fontSize: "13px",
    marginTop: "15px",
  },
  resultBox: {
    marginTop: "18px",
    padding: "15px",
    background: "#0b1020",
    borderRadius: "9px",
  },
  resultHeading: {
    marginTop: 0,
    color: "#8bbcff",
  },
  resultText: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.7,
    fontSize: "14px",
  },
};
