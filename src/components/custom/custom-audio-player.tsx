"use client";

import { Pause, Play, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CustomAudioPlayerProps {
  audioUrl: string;
  className?: string;
}

export default function CustomAudioPlayer({
  audioUrl,
  className = "",
}: CustomAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio.mp3";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`flex w-full items-center gap-3 h-12 rounded-lg overflow-hidden bg-gray-100 pr-3 pl-0 ${className}`}
      style={{ direction: "rtl" }}
    >
      <button
        type="button"
        onClick={handleDownload}
        className="size-8 shrink-0 text-main hover:text-main/80 transition-colors flex items-center justify-center rounded-md"
        title="تحميل"
        aria-label="تحميل"
      >
        <Download className="size-5" strokeWidth={2} />
      </button>

      <span className="text-muted-foreground text-sm tabular-nums min-w-[2.5rem] text-center leading-none">
        {formatTime(duration)}
      </span>

      <div className="flex-1 min-w-0 flex items-center" style={{ direction: "ltr" }}>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleProgressChange}
          className="audio-progress-slider w-full h-1.5 rounded-full cursor-pointer bg-gray-300 appearance-none accent-main"
          style={{
            background: `linear-gradient(to right, var(--color-main) 0%, var(--color-main) ${progressPercent}%, rgb(209 213 219) ${progressPercent}%, rgb(209 213 219) 100%)`,
          }}
          aria-label="شريط التقدم"
        />
      </div>

      <button
        type="button"
        onClick={togglePlay}
        className="w-12 h-12 shrink-0 bg-main flex items-center justify-center rounded-e-lg hover:bg-main/90 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
        aria-label={isPlaying ? "إيقاف" : "تشغيل"}
      >
        {isPlaying ? (
          <Pause className="size-5" strokeWidth={2} fill="currentColor" />
        ) : (
          <Play className="size-5" strokeWidth={2} fill="currentColor" />
        )}
      </button>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
}
