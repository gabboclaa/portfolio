"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, SkipForward, SkipBack, Play, Pause, Shuffle } from "lucide-react";
import { useTheme } from "./ThemeProvider";

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
  const { theme } = useTheme();
  const playerRef = useRef<YTPlayer | null>(null);
  const minimizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [ready, setReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        playerVars: { autoplay: 1, controls: 0, mute: 1, start: TRACKS[0].start },
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
                playerRef.current?.loadVideoById({ videoId: TRACKS[next].id, startSeconds: TRACKS[next].start });
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

    return () => {
      if (minimizeTimeoutRef.current) {
        clearTimeout(minimizeTimeoutRef.current);
      }
    };
  }, []);

  const scheduleMinimize = useCallback(() => {
    if (minimizeTimeoutRef.current) {
      clearTimeout(minimizeTimeoutRef.current);
    }

    minimizeTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 2600);
  }, []);

  const expandDock = useCallback(() => {
    setIsExpanded(true);
    scheduleMinimize();
  }, [scheduleMinimize]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    expandDock();
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    expandDock();
    setMobileOpen(true);
    if (isMuted) {
      playerRef.current.unMute();
      if (!isPlaying) playerRef.current.playVideo();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const loadTrack = useCallback((index: number) => {
    expandDock();
    setMobileOpen(true);
    setCurrentTrack(index);
    playerRef.current?.loadVideoById({ videoId: TRACKS[index].id, startSeconds: TRACKS[index].start });
  }, [expandDock]);

  const skipNext = () => loadTrack((currentTrack + 1) % TRACKS.length);
  const skipPrev = () => loadTrack((currentTrack - 1 + TRACKS.length) % TRACKS.length);

  const shuffle = () => {
    let next: number;
    do { next = Math.floor(Math.random() * TRACKS.length); } while (next === currentTrack && TRACKS.length > 1);
    loadTrack(next);
  };

  const dockStyle = {
    backgroundColor: theme === "dark" ? "#111111" : "#f3e7db",
    borderColor: theme === "dark" ? "#2a2a2a" : isExpanded ? "#d8c4ae" : "#e5e5e5",
  };

  const mobileShellStyle = {
    backgroundColor: theme === "dark" ? "#111111" : "#f3e7db",
    borderColor: theme === "dark" ? "#2a2a2a" : "#e5e5e5",
  };

  return (
    <>
      <div id="yt-player" style={{ display: "none" }} />

      <div className="sm:hidden">
        <div
          className="flex items-center rounded-full border px-2.5 py-2 text-xs font-mono shadow-[0_14px_40px_rgba(15,15,15,0.14)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
          style={mobileShellStyle}
        >
          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close player" : "Open player"}
            className="flex items-center gap-2 text-left"
          >
            <div className="flex items-end gap-[2px] h-3 shrink-0">
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
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#6b6b6b] dark:text-[#8a8a8a]">
              Music
            </span>
          </button>
        </div>

        {mobileOpen ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-16 z-50 px-3">
            <div
              className="pointer-events-auto mx-auto w-full max-w-[22rem] rounded-[28px] border px-4 py-4 shadow-[0_20px_60px_rgba(15,15,15,0.16)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={mobileShellStyle}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9a9a9a]">
                    Now Playing
                  </p>
                  <p className="mt-1 truncate text-sm text-[#0f0f0f] dark:text-[#f0f0f0]">
                    {TRACKS[currentTrack].title}
                  </p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close player"
                  className="shrink-0 font-mono text-[11px] text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={skipPrev}
                  disabled={!ready}
                  aria-label="Previous track"
                  className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
                >
                  <SkipBack size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={togglePlay}
                  disabled={!ready}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="rounded-full border border-[#e5e5e5] dark:border-[#2a2a2a] p-3 text-[#0f0f0f] dark:text-[#f0f0f0] disabled:opacity-40"
                >
                  {isPlaying ? <Pause size={16} strokeWidth={1.7} /> : <Play size={16} strokeWidth={1.7} />}
                </button>
                <button
                  onClick={skipNext}
                  disabled={!ready}
                  aria-label="Next track"
                  className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
                >
                  <SkipForward size={16} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={shuffle}
                  disabled={!ready}
                  aria-label="Shuffle"
                  className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
                >
                  <Shuffle size={14} strokeWidth={1.5} />
                </button>
                <button
                  onClick={toggleMute}
                  disabled={!ready}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
                >
                  {isMuted ? (
                    <VolumeX size={14} strokeWidth={1.5} />
                  ) : (
                    <Volume2 size={14} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className="group hidden sm:flex items-center gap-2 rounded-[24px] border px-3 py-2 text-xs font-mono shadow-[0_14px_40px_rgba(15,15,15,0.14)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition-all duration-300"
        style={dockStyle}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={scheduleMinimize}
        onFocusCapture={expandDock}
        onBlurCapture={scheduleMinimize}
      >
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

        <button
          onClick={() => {
            if (isExpanded) {
              scheduleMinimize();
            } else {
              expandDock();
            }
          }}
          aria-label={isExpanded ? "Collapse player" : "Expand player"}
          className={`overflow-hidden text-left text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-all duration-300 ${
            isExpanded ? "max-w-[170px] opacity-100" : "max-w-[72px] opacity-100"
          }`}
          title={TRACKS[currentTrack].title}
        >
          <span className="block truncate">
            {isExpanded ? TRACKS[currentTrack].title : "Now playing"}
          </span>
        </button>

        <button
          onClick={skipPrev}
          disabled={!ready}
          aria-label="Previous track"
          className={`text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-all disabled:opacity-40 ${
            isExpanded ? "opacity-100" : "hidden"
          }`}
        >
          <SkipBack size={12} strokeWidth={1.5} />
        </button>
        <button
          onClick={togglePlay}
          disabled={!ready}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-colors disabled:opacity-40"
        >
          {isPlaying ? <Pause size={12} strokeWidth={1.5} /> : <Play size={12} strokeWidth={1.5} />}
        </button>
        <button
          onClick={skipNext}
          disabled={!ready}
          aria-label="Next track"
          className={`text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-all disabled:opacity-40 ${
            isExpanded ? "opacity-100" : "hidden"
          }`}
        >
          <SkipForward size={12} strokeWidth={1.5} />
        </button>
        <button
          onClick={shuffle}
          disabled={!ready}
          aria-label="Shuffle"
          className={`text-[#6b6b6b] hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0] transition-all disabled:opacity-40 ${
            isExpanded ? "inline-flex" : "hidden"
          }`}
        >
          <Shuffle size={12} strokeWidth={1.5} />
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
    </>
  );
}
