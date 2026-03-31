interface Window {
  YT: {
    Player: new (
      elementId: string,
      options: {
        videoId: string;
        playerVars?: {
          autoplay?: number;
          controls?: number;
          mute?: number;
        };
        events?: {
          onReady?: (event: { target: YTPlayer }) => void;
          onStateChange?: (event: { data: number }) => void;
        };
      }
    ) => YTPlayer;
    PlayerState: {
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
    };
  };
  onYouTubeIframeAPIReady: () => void;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  loadVideoById: (videoId: string) => void;
  getPlayerState: () => number;
}
