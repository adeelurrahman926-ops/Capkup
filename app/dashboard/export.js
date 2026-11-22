
"use client";

import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

function formatTime(seconds) {
  const safe = Math.max(0, seconds || 0);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = Math.floor(safe % 60);
  const ms = Math.floor((safe % 1) * 1000);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0") + "," +
    String(ms).padStart(3, "0")
  );
}

function makeSrt(chunks) {
  return chunks
    .filter(
      (item) =>
        item.start !== null &&
        item.end !== null &&
        item.end > item.start &&
        item.text
    )
    .map((item, index) => {
      return (
        `${index + 1}\n` +
        `${formatTime(item.start)} --> ${formatTime(item.end)}\n` +
        `${item.text.trim()}\n`
      );
    })
    .join("\n");
}

function hexToAss(hex) {
  const clean = hex.replace("#", "");
  const r = clean.substring(0, 2);
  const g = clean.substring(2, 4);
  const b = clean.substring(4, 6);

  return `&H00${b}${g}${r}`;
}

export default function VideoExport({
  videoFile,
  subtitleChunks,
  fontSize = 28,
  fontColor = "#ffffff",
  bold = true,
  outline = true,
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function exportVideo() {
    if (!videoFile) {
      setError("Please upload a video first.");
      return;
    }

    if (!subtitleChunks || subtitleChunks.length === 0) {
      setError("Please generate subtitles first.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");

    try {
      const ffmpeg = new FFmpeg();

      const baseURL =
        "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });

      setProgress(10);

      const inputData = await fetchFile(videoFile);
      await ffmpeg.writeFile("input.mp4", inputData);

      const srt = makeSrt(subtitleChunks);

      if (!srt.trim()) {
        throw new Error("No valid subtitle timestamps found.");
      }

      await ffmpeg.writeFile(
        "captions.srt",
        new TextEncoder().encode(srt)
      );

      setProgress(25);
console.log("Starting FFmpeg video processing...");
      const color = hexToAss(fontColor);

      const style =
        `FontSize=${fontSize},` +
        `PrimaryColour=${color},` +
        `Bold=${bold ? 1 : 0},` +
        `Outline=${outline ? 2 : 0},` +
        `Shadow=1,Alignment=2,MarginV=80`;

      await ffmpeg.exec([
  "-i",
  "input.mp4",
  "-c",
  "copy",
  "output.mp4",
]);

      setProgress(90);

      const output = await ffmpeg.readFile("output.mp4");

      const blob = new Blob([output], {
        type: "video/mp4",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "CAPKUP-AI-Subtitled.mp4";
      link.click();

      URL.revokeObjectURL(url);

      setProgress(100);
    } catch (err) {
      console.error("Export error:", err);
      setError(err.message || "Video export failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={exportVideo}
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "10px",
          background: loading ? "#555" : "#6c45ff",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading
          ? `Exporting ${progress}%`
          : "Export Video MP4"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
