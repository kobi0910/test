import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Wind, Waves } from 'lucide-react';

export const AmbientSoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<'wind' | 'waves'>('wind');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = (type: 'wind' | 'waves') => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous noise
      if (noiseNodeRef.current) {
        noiseNodeRef.current.disconnect();
      }

      // Create white noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for ambient sound (wind vs waves)
      const filter = ctx.createBiquadFilter();
      if (type === 'wind') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.Q.setValueAtTime(3.0, ctx.currentTime);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
      }

      // Gain control for gentle volume
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio API not supported or user interaction blocked:', e);
    }
  };

  const stopSound = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as AudioBufferSourceNode).stop();
        noiseNodeRef.current.disconnect();
      } catch {}
      noiseNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound(soundType);
    }
  };

  const switchType = (type: 'wind' | 'waves') => {
    setSoundType(type);
    if (isPlaying) {
      startSound(type);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-3 py-1.5 text-xs text-slate-300">
      <button
        onClick={togglePlay}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 ${
          isPlaying ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/20' : 'hover:text-white'
        }`}
        title={isPlaying ? '靜音環境音' : '播放北海道風雪環境音'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            <span className="font-serif">極地風聲中</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
            <span className="font-serif">環境音聲</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 pl-1 border-l border-slate-700">
          <button
            onClick={() => switchType('wind')}
            className={`p-1 rounded transition ${
              soundType === 'wind' ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white'
            }`}
            title="雪原寒風"
          >
            <Wind className="w-3 h-3" />
          </button>
          <button
            onClick={() => switchType('waves')}
            className={`p-1 rounded transition ${
              soundType === 'waves' ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white'
            }`}
            title="鄂霍次克海浪"
          >
            <Waves className="w-3 h-3" />
          </button>
          {/* Equalizer animation bars */}
          <div className="flex items-end gap-0.5 h-3 px-1">
            <span className="w-0.5 bg-blue-400 animate-[bounce_1s_infinite_100ms] h-full" />
            <span className="w-0.5 bg-blue-400 animate-[bounce_1s_infinite_300ms] h-2/3" />
            <span className="w-0.5 bg-blue-400 animate-[bounce_1s_infinite_200ms] h-4/5" />
          </div>
        </div>
      )}
    </div>
  );
};
