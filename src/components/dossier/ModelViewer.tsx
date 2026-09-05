'use client';

import type { CSSProperties } from 'react';
import { useEffect } from 'react';

// Load the model-viewer script exactly once, lazily, when the first viewer mounts.
let scriptPromise: Promise<void> | null = null;

function loadModelViewer() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (customElements.get('model-viewer')) return resolve();
    const s = document.createElement('script');
    s.type = 'module';
    s.src =
      'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.0.0/dist/model-viewer.min.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('failed to load model-viewer'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

type Props = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Camera framing hint. Portrait busts default to a chest-up orbit. */
  orbit?: string;
  /** Field of view for the camera. */
  fov?: string;
  autoRotate?: boolean;
  /**
   * Poster handling. 'auto' shows the model as soon as it decodes; 'manual'
   * waits for dismissPoster(). Only these two exist in model-viewer v4 —
   * 'interaction' was removed and silently never loads.
   */
  reveal?: 'auto' | 'manual';
  /**
   * 'eager' downloads immediately. Callers that only mount this component after
   * an explicit user action should pass 'eager': the click is already the
   * intent signal, and 'lazy' just adds a second gate that can fail to fire.
   */
  loading?: 'eager' | 'lazy' | 'auto';
};

export function ModelViewer({
  src,
  poster,
  alt = '',
  className,
  style,
  orbit = '15deg 78deg 1.4m',
  fov = '28deg',
  autoRotate = false,
  reveal = 'auto',
  loading = 'eager',
}: Props) {
  useEffect(() => {
    loadModelViewer().catch((e) => console.error(e));
  }, []);

  return (
    <model-viewer
      src={src}
      poster={poster}
      alt={alt}
      camera-controls="true"
      auto-rotate={autoRotate ? true : undefined}
      interaction-prompt="none"
      reveal={reveal}
      loading={loading}
      shadow-intensity="0.35"
      shadow-softness="1"
      exposure="0.9"
      environment-image="neutral"
      camera-orbit={orbit}
      field-of-view={fov}
      min-camera-orbit="auto auto 0.9m"
      max-camera-orbit="auto auto 3m"
      touch-action="pan-y"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        display: 'block',
        ...style,
      }}
    />
  );
}
