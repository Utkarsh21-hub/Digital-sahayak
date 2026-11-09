import React, { useState, useEffect, useRef } from 'react';

export type BotState = 'idle' | 'greeting' | 'thinking' | 'answering' | 'pointing';

export interface AvatarAnimatorProps {
  botState: BotState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onAnimationComplete?: () => void;
  showBadge?: boolean;
}

const ANIMATION_SOURCES: Record<Exclude<BotState, 'idle'>, string[]> = {
  greeting: ['/assets/hi.webm', '/assets/1-hi.webm', '/assets/aistudio/1-hi_9835fe8b.webm'],
  thinking: ['/assets/thinking.webm', '/assets/3-thinking.webm', '/assets/aistudio/3-thinking_d4aebbcd.webm'],
  answering: ['/assets/thinking-bulb.webm', '/assets/2-thinking-bulb.webm', '/assets/aistudio/2-thinking-bulb_c88d5368.webm'],
  pointing: ['/assets/pointing.webm', '/assets/4-pointing.webm', '/assets/aistudio/4-pointing_3c0d9d1f.webm'],
};

const IDLE_IMAGE = '/assets/idle.png';

const SIZE_CLASSES = {
  sm: 'w-8 h-8 rounded-xl',
  md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
  lg: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
  xl: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
};

export const AvatarAnimator: React.FC<AvatarAnimatorProps> = ({
  botState,
  size = 'md',
  className = '',
  onAnimationComplete,
  showBadge = false,
}) => {
  const [internalState, setInternalState] = useState<BotState>(botState);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync internal state with prop changes
  useEffect(() => {
    setInternalState(botState);
    setIsVideoLoaded(false);
    setHasVideoError(false);
  }, [botState]);

  // Video play logic on state change
  useEffect(() => {
    if (internalState === 'idle' || hasVideoError) return;

    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Fall back gracefully to idle static image if autoplay fails
          console.warn('Avatar video play notice:', err);
          setHasVideoError(true);
        });
      }
    }
  }, [internalState, hasVideoError]);

  // Handle animation completion for non-looping animations
  const handleVideoEnded = () => {
    if (internalState !== 'thinking') {
      // Non-looping animations transition to idle when completed
      setInternalState('idle');
      onAnimationComplete?.();
    }
  };

  const isLooping = internalState === 'thinking';
  const showVideo = internalState !== 'idle' && !hasVideoError;
  const currentSources = internalState !== 'idle' ? ANIMATION_SOURCES[internalState] : [];

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center select-none ${
        className ? className : `${SIZE_CLASSES[size]} bg-transparent`
      } transition-all duration-300`}
      title={`Sahayak: ${internalState}`}
    >
      {/* Fallback & Base Static Idle Image */}
      <img
        src={IDLE_IMAGE}
        alt="Digital Sahayak"
        className={`absolute inset-0 w-full h-full object-contain drop-shadow-xs transition-opacity duration-300 ${
          showVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        onError={(e) => {
          // If public/assets/idle.png fails, try the hashed aistudio asset path
          if (!e.currentTarget.src.includes('idle_bd21ead4.png')) {
            e.currentTarget.src = '/assets/aistudio/idle_bd21ead4.png';
          }
        }}
      />

      {/* Dynamic State Animation Video Player with multi-source fallback */}
      {showVideo && currentSources.length > 0 && (
        <video
          ref={videoRef}
          key={internalState}
          autoPlay
          muted
          playsInline
          loop={isLooping}
          onLoadedData={() => setIsVideoLoaded(true)}
          onEnded={handleVideoEnded}
          onError={() => {
            console.warn(`Failed to load video for state: ${internalState}`);
            setHasVideoError(true);
          }}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-200 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {currentSources.map((src) => (
            <source key={src} src={src} type="video/webm" />
          ))}
        </video>
      )}

      {/* Mini status indicator badge (optional) */}
      {showBadge && (
        <span
          className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 transition-colors duration-300 ${
            internalState === 'thinking'
              ? 'bg-amber-400 animate-pulse'
              : internalState === 'answering'
              ? 'bg-emerald-400 animate-ping'
              : internalState === 'pointing'
              ? 'bg-blue-400'
              : 'bg-emerald-500'
          }`}
        />
      )}
    </div>
  );
};
