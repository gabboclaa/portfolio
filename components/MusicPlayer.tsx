"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";

const TRACKS = [
  { id: "zWeYcNfYn3U", start: 180, title: "Prince Of Denmark - GS [FORUM V]" },
  { id: "nA-ZaQn55Eg", start: 785, title: "最初のプログラム" },
  { id: "DrmpZtxr0kY", start: 600, title: "Nostalgic Soundscapes - Forgotten" },
  { id: "vXLyxy3GTaY", start: 0, title: "MICROMECHA - Underwater Quest" },
  { id: "nII4LjJECRA", start: 0, title: "silver protocol - frutiger aero" },
  { id: "xp8HbdSLDgo", start: 132, title: "Aphex Twin - Zahl am1 live track 1c f760m1 unfinshd" },
  { id: "0S43IwBF0uM", start: 0, title: "The Chemical Brothers - Star Guitar" },
  { id: "6HVofwARgOs", start: 0, title: "Nürnberg - Valasy" },
  { id: "QShW2JV2ne8", start: 266, title: "Aphex Twin - T08 dx1+5 [London 03.06.17]" },
  { id: "siS-d1bwKxA", start: 31, title: "The Future Sound of London - Papua New Guinea" },
  { id: "Qfh4i7JjOz4", start: 0, title: "The Tuss - Yellow Cellophane Day" },
  { id: "a0LR7E1grnM", start: 0, title: "Vektroid & New Dreams Ltd. - FOREST.SYS" },
  { id: "rT6RoxjxRQw", start: 0, title: "Ceephax Acid Crew - Amigo" },
  { id: "ko8cJucsbBU", start: 0, title: "Roy of the Ravers - EMOTINIUM" },
  { id: "4aeETEoNfOg", start: 11, title: "Smashing Pumpkins - 1979" },
  { id: "eBG7P-K-r1Y", start: 20, title: "Foo Fighters - Everlong" },
  { id: "Dy4HA3vUv2c", start: 20, title: "Blue Oyster Cult - (Don't Fear) The Reaper" },
  { id: "vZexE7wAvBE", start: 0, title: "Kosheen - Hide U" },
  { id: "SesCS4QHOfg", start: 0, title: "Napa - Na Lua" },
  { id: "LbYwT6TULjg", start: 0, title: "Mac DeMarco - Freaking Out the Neighborhood" },
  { id: "OMaycNcPsHI", start: 0, title: "Placebo - Every You Every Me" },
  { id: "hqqxtKaCjxQ", start: 10, title: "R.E.M. - Radio Free Europe" },
  { id: "BGn2oo-0Dqc", start: 0, title: "Gorillaz - On Melancholy Hill" },
  { id: "RdlNrYmNdQ4", start: 0, title: "Sisters of Mercy - First and Last and Always" },
  { id: "1lyu1KKwC74", start: 8, title: "The Verve - Bitter Sweet Symphony" },
  { id: "YrKVG4JG9So", start: 0, title: "Plaid - Do Matter" },
  { id: "Bk1wUKoXL20", start: 0, title: "Morrissey - The Last Of The Famous International Playboys" },
];

export default function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (document.getElementById("yt-player")) {
      // Player div already exists
    }

    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("yt-player", {
        videoId: TRACKS[0].id,
        playerVars: { autoplay: 0, controls: 0, mute: 1 },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            setReady(true);
          },
          onStateChange: (e) => {
            setIsPlaying(e.data === 1);
            // Auto-advance when track ends
            if (e.data === 0) {
              setCurrentTrack((prev) => {
                const next = (prev + 1) % TRACKS.length;
                playerRef.current?.loadVideoById(TRACKS[next].id);
                return next;
              });
            }
          },
        },
      });
    };

    // If API already loaded
    if (window.YT?.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const skipNext = () => {
    const next = (currentTrack + 1) % TRACKS.length;
    setCurrentTrack(next);
    playerRef.current?.loadVideoById(TRACKS[next].id);
  };

  const skipPrev = () => {
    const prev = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrack(prev);
    playerRef.current?.loadVideoById(TRACKS[prev].id);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] text-xs font-mono">
      {/* Hidden YouTube iframe */}
      <div id="yt-player" style={{ display: "none" }} />

      {/* Equalizer bars */}
      <div className="flex items-end gap-[2px] h-3">
        <span
          className={`w-[2px] rounded-sm bg-[#bd864b] ${isPlaying && !isMuted ? "animate-eq-1" : "h-[4px]"}`}
          style={isPlaying && !isMuted ? undefined : { height: "4px" }}
        />
        <span
          className={`w-[2px] rounded-sm bg-[#bd864b] ${isPlaying && !isMuted ? "animate-eq-2" : "h-[4px]"}`}
          style={isPlaying && !isMuted ? undefined : { height: "4px" }}
        />
        <span
          className={`w-[2px] rounded-sm bg-[#bd864b] ${isPlaying && !isMuted ? "animate-eq-3" : "h-[4px]"}`}
          style={isPlaying && !isMuted ? undefined : { height: "4px" }}
        />
      </div>

      {/* Track title — desktop only */}
      <button
        onClick={togglePlay}
        disabled={!ready}
        className="hidden sm:block overflow-hidden max-w-[130px] text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors text-ellipsis whitespace-nowrap disabled:opacity-40"
        title={isPlaying ? "Pause" : "Play"}
      >
        {TRACKS[currentTrack].title.split(" — ")[0]}
      </button>

      {/* Controls */}
      <button
        onClick={skipPrev}
        disabled={!ready}
        aria-label="Previous track"
        className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
      >
        <SkipBack size={12} strokeWidth={1.5} />
      </button>
      <button
        onClick={skipNext}
        disabled={!ready}
        aria-label="Next track"
        className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
      >
        <SkipForward size={12} strokeWidth={1.5} />
      </button>
      <button
        onClick={toggleMute}
        disabled={!ready}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
      >
        {isMuted ? (
          <VolumeX size={12} strokeWidth={1.5} />
        ) : (
          <Volume2 size={12} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
