import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

export interface CharacterGuideHandle {
  playHi: () => Promise<void>;
  playThinking: () => void;
  playBulb: () => Promise<void>;
  startPointingLoop: () => void;
  showIdle: () => void;
  setMoodText: (text: string, isBusy?: boolean) => void;
}

interface CharacterGuideProps {
  moodText?: string;
  isBusy?: boolean;
}

export const CharacterGuide = forwardRef<CharacterGuideHandle, CharacterGuideProps>(
  ({ moodText: initialMood = 'Namaste!', isBusy: initialBusy = false }, ref) => {
    const [mood, setMood] = useState(initialMood);
    const [busy, setBusy] = useState(initialBusy);

    const idleRef = useRef<HTMLImageElement>(null);
    const hiRef = useRef<HTMLVideoElement>(null);
    const bulbRef = useRef<HTMLVideoElement>(null);
    const thinkRef = useRef<HTMLVideoElement>(null);
    const pointRef = useRef<HTMLVideoElement>(null);

    const runIdRef = useRef<number>(0);

    const showIdle = () => {
      const vids = [hiRef.current, bulbRef.current, thinkRef.current, pointRef.current];
      vids.forEach((v) => {
        if (v) {
          v.pause();
          v.loop = false;
          v.classList.remove('on');
        }
      });
      if (idleRef.current) {
        idleRef.current.classList.remove('off');
      }
    };

    const playVideo = (
      videoEl: HTMLVideoElement | null,
      loop = false
    ): Promise<void> => {
      const vids = [hiRef.current, bulbRef.current, thinkRef.current, pointRef.current];
      vids.forEach((v) => {
        if (v && v !== videoEl) {
          v.pause();
          v.classList.remove('on');
        }
      });

      if (!videoEl) {
        showIdle();
        return Promise.resolve();
      }

      videoEl.loop = loop;
      videoEl.currentTime = 0;

      videoEl.onplaying = () => {
        videoEl.classList.add('on');
        if (idleRef.current) {
          idleRef.current.classList.add('off');
        }
      };

      const playPromise = videoEl.play();
      if (playPromise) {
        playPromise.catch(() => {
          showIdle();
        });
      }

      return new Promise<void>((resolve) => {
        videoEl.onended = () => {
          videoEl.classList.remove('on');
          if (idleRef.current) {
            idleRef.current.classList.remove('off');
          }
          resolve();
        };
      });
    };

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const pointLoop = async (id: number) => {
      while (id === runIdRef.current) {
        await playVideo(pointRef.current, false);
        if (id !== runIdRef.current) break;
        await wait(3000);
      }
    };

    useImperativeHandle(ref, () => ({
      playHi: async () => {
        const id = ++runIdRef.current;
        showIdle();
        setMood('Namaste!');
        setBusy(false);
        await playVideo(hiRef.current, false);
        if (id === runIdRef.current) {
          pointLoop(id);
        }
      },
      playThinking: () => {
        ++runIdRef.current;
        setMood('Soch raha hoon...');
        setBusy(true);
        playVideo(thinkRef.current, true);
      },
      playBulb: async () => {
        const id = ++runIdRef.current;
        setMood('Yeh raha jawab');
        setBusy(false);
        await playVideo(bulbRef.current, false);
        if (id === runIdRef.current) {
          pointLoop(id);
        }
      },
      startPointingLoop: () => {
        const id = ++runIdRef.current;
        pointLoop(id);
      },
      showIdle: () => {
        ++runIdRef.current;
        showIdle();
        setBusy(false);
      },
      setMoodText: (text: string, isBusy = false) => {
        setMood(text);
        setBusy(isBusy);
      },
    }));

    // On initial mount, trigger the hi greeting animation
    useEffect(() => {
      const id = ++runIdRef.current;
      playVideo(hiRef.current, false).then(() => {
        if (id === runIdRef.current) {
          pointLoop(id);
        }
      });

      return () => {
        ++runIdRef.current;
        showIdle();
      };
    }, []);

    return (
      <div className="buddy" aria-hidden="true">
        <div className="stage" id="stage">
          <img id="idle" ref={idleRef} src="/assets/idle.png" alt="" />
          <video id="v-hi" ref={hiRef} src="/assets/1-hi.webm" muted playsInline preload="auto" />
          <video id="v-bulb" ref={bulbRef} src="/assets/2-thinking-bulb.webm" muted playsInline preload="auto" />
          <video id="v-think" ref={thinkRef} src="/assets/3-thinking.webm" muted playsInline preload="auto" />
          <video id="v-point" ref={pointRef} src="/assets/4-pointing.webm" muted playsInline preload="auto" />
        </div>
        <div className={`mood ${busy ? 'busy' : ''}`} id="mood">
          <span className="dot" />
          <span id="moodText">{mood}</span>
        </div>
      </div>
    );
  }
);
