
import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;

let transcriber = null;

async function loadTranscriber(onProgress) {
  if (transcriber) return transcriber;

  transcriber = await pipeline(
    "automatic-speech-recognition",
    "Xenova/whisper-tiny",
    {
      dtype: "q8",
      progress_callback: (progress) => {
        if (onProgress) onProgress(progress);
      },
    }
  );

  return transcriber;
}

async function extractAudio(videoFile) {
  const audioContext = new AudioContext();
  const arrayBuffer = await videoFile.arrayBuffer();

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const sampleRate = 16000;
  const frameCount = Math.ceil(
    audioBuffer.duration * sampleRate
  );

  const offlineContext = new OfflineAudioContext(
    1,
    frameCount,
    sampleRate
  );

  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start(0);

  const renderedBuffer = await offlineContext.startRendering();
  const audioData = renderedBuffer.getChannelData(0);

  await audioContext.close();

  return audioData;
}

export async function transcribeVideo(videoFile, onProgress, language = "ur") {
  if (!videoFile) {
    throw new Error("Please select a video first.");
  }

  if (!videoFile.type.startsWith("video/")) {
    throw new Error("Please upload a valid video file.");
  }

  try {
    if (onProgress) {
      onProgress({ status: "loading", message: "Loading AI model..." });
    }

    const recognizer = await loadTranscriber(onProgress);

    if (onProgress) {
      onProgress({ status: "processing", message: "Extracting audio..." });
    }

    const audio = await extractAudio(videoFile);

    if (onProgress) {
      onProgress({ status: "transcribing", message: "Transcribing audio..." });
    }
    
  const result = await recognizer(audio, {
  sampling_rate: 16000,
  chunk_length_s: 30,
  stride_length_s: 5,
  return_timestamps: "word",
  num_beams: 3,
  language: language,
  task: "transcribe",
});

    return {
      text: result.text || "",
      chunks: (result.chunks || []).map((chunk) => ({
        text: chunk.text || "",
        start: chunk.timestamp?.[0] ?? null,
        end: chunk.timestamp?.[1] ?? null,
      })),
    };
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error(
      error.message || "Transcription failed. Please try again."
    );
  }
}
