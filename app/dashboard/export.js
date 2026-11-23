
"use client";

import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

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
    setProgress(5);
    setError("");

    let video;
    let videoUrl;
    let recorder;
    let canvasStream;
    let sourceStream;
    let animationId;

    try {
      const validChunks = subtitleChunks.filter(
        (item) =>
          Number.isFinite(item.start) &&
          Number.isFinite(item.end) &&
          item.end > item.start &&
          item.text
      );

      if (validChunks.length === 0) {
        throw new Error("No valid word timestamps found.");
      }

      video = document.createElement("video");
      videoUrl = URL.createObjectURL(videoFile);

      video.src = videoUrl;
      video.preload = "auto";
      video.playsInline = true;

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = () =>
          reject(new Error("Could not load the uploaded video."));
        video.load();
      });

      const scale = Math.min(
        1,
        1280 / video.videoWidth,
        1280 / video.videoHeight
      );

      const canvas = document.createElement("canvas");

      canvas.width = Math.floor(video.videoWidth * scale / 2) * 2;
      canvas.height = Math.floor(video.videoHeight * scale / 2) * 2;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas is not supported.");
      }

      canvasStream = canvas.captureStream(30);

      if (!video.captureStream) {
        throw new Error(
          "Your browser does not support video audio capture. Please use Chrome."
        );
      }

      sourceStream = video.captureStream();

      const audioTracks = sourceStream.getAudioTracks();

      const finalStream = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...audioTracks,
      ]);

      let mimeType = "video/webm";

      if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")) {
        mimeType = "video/webm;codecs=vp9,opus";
      } else if (
        MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
      ) {
        mimeType = "video/webm;codecs=vp8,opus";
      }

      recorder = new MediaRecorder(finalStream, {
        mimeType,
        videoBitsPerSecond: 5000000,
      });

      const recordedChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      const fontScale = canvas.width / 360;
      const scaledFont = fontSize * fontScale;

      function drawFrame() {
        if (video.readyState >= 2) {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

        const currentChunk = validChunks.find(
          (item) =>
            video.currentTime >= item.start &&
            video.currentTime < item.end
        );

        if (currentChunk) {
          const text = currentChunk.text.trim();

          ctx.save();

          ctx.font =
            `${bold ? "bold" : "normal"} ${scaledFont}px Arial`;

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const x = canvas.width / 2;
          const y = canvas.height * 0.88;

          const maxWidth = canvas.width * 0.9;
          let displayFont = scaledFont;

          while (
            ctx.measureText(text).width > maxWidth &&
            displayFont > 10
          ) {
            displayFont -= 2;
            ctx.font =
              `${bold ? "bold" : "normal"} ${displayFont}px Arial`;
          }

          const textWidth = ctx.measureText(text).width;

          if (outline) {
            ctx.lineJoin = "round";
            ctx.lineWidth = Math.max(3, displayFont * 0.12);
            ctx.strokeStyle = "#000000";
            ctx.strokeText(text, x, y, maxWidth);
          }

          ctx.fillStyle = fontColor;
          ctx.fillText(text, x, y, maxWidth);

          ctx.restore();
        }

        animationId = requestAnimationFrame(drawFrame);
      }


      setProgress(15);

      const recordingFinished = new Promise((resolve, reject) => {
        recorder.onstop = () => {
          resolve(
            new Blob(recordedChunks, {
              type: mimeType,
            })
          );
        };

        recorder.onerror = () => {
          reject(new Error("Video recording failed."));
        };
      });

      recorder.start(1000);

      await video.play();
      drawFrame();
      setProgress(25);

      const updateProgress = setInterval(() => {
        if (video.duration > 0) {
          const value =
            25 + (video.currentTime / video.duration) * 35;

          setProgress(Math.min(60, Math.floor(value)));
        }
      }, 500);

      await new Promise((resolve) => {
        video.onended = resolve;
      });

      clearInterval(updateProgress);

      if (recorder.state !== "inactive") {
        recorder.stop();
      }

      const webmBlob = await recordingFinished;

      cancelAnimationFrame(animationId);

      canvasStream.getTracks().forEach((track) => track.stop());
      sourceStream.getTracks().forEach((track) => track.stop());

      setProgress(65);

      if (!webmBlob.size) {
        throw new Error("Recorded video is empty.");
      }

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

      setProgress(75);

      await ffmpeg.writeFile(
        "input.webm",
        await fetchFile(webmBlob)
      );

      await ffmpeg.exec([
        "-i",
        "input.webm",
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast",
        "-crf",
        "25",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "output.mp4",
      ]);

      setProgress(90);

      const output = await ffmpeg.readFile("output.mp4");

      const mp4Blob = new Blob([output], {
        type: "video/mp4",
      });

      if (!mp4Blob.size) {
        throw new Error("MP4 export produced an empty file.");
      }

      const downloadUrl = URL.createObjectURL(mp4Blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = "CAPKUP-AI-Subtitled.mp4";
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 60000);

      setProgress(100);
    } catch (err) {
      console.error("Export error:", err);
      setError(err.message || "Video export failed.");
    } finally {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }

      if (canvasStream) {
        canvasStream.getTracks().forEach((track) => track.stop());
      }

      if (sourceStream) {
        sourceStream.getTracks().forEach((track) => track.stop());
      }

      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }

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
