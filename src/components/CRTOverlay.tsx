import React from 'react';

/**
 * CRTOverlay — faithfully mimics a late-90s / early-2000s CRT pixel grid,
 * matching the style visible on reference sites like mitchivin.com.
 *
 * Key insight from the reference:
 *   - The screen stays BRIGHT and VIBRANT — no heavy darkening
 *   - The pixel grid is a fine, subtle mesh: 3 × 3 px cells, each separated
 *     by a 1 px gap that is just slightly darker than the lit phosphor
 *   - A barely-there scanline band reminds you it's an interlaced signal
 *   - A soft phosphor bloom in the centre recreates the slight hotspot you
 *     saw on every CRT of that era
 *
 * All layers use pointer-events: none so nothing blocks interaction.
 */
const CRTOverlay: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >

    {/* ── 1. PIXEL GRID ──────────────────────────────────────────────────
        3 × 3 px lit cells separated by 1 px shadow-mask gaps.
        Opacity is kept low so the image beneath stays vivid — exactly
        what you see on the mitchivin reference screenshot. */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0) 2px, rgba(0,0,0,0.10) 2px),
          linear-gradient(90deg, rgba(0,0,0,0) 2px, rgba(0,0,0,0.10) 2px)
        `,
        backgroundSize: '3px 3px',
      }}
    />

    {/* ── 2. PHOSPHOR DOT GLOW ───────────────────────────────────────────
        Each pixel centre has a tiny additive white boost so the dots
        look like self-lit phosphors rather than flat squares. */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(
            circle at 1px 1px,
            rgba(255,255,255,0.07) 1px,
            transparent 1px
          )
        `,
        backgroundSize: '3px 3px',
        mixBlendMode: 'screen',
      }}
    />

    {/* ── 3. SCANLINES ───────────────────────────────────────────────────
        Very faint horizontal bands — just enough texture to remind you
        the signal is interlaced. Much softer than the previous version. */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(0,0,0,0.05) 0px,
          rgba(0,0,0,0.05) 1px,
          transparent      1px,
          transparent      3px
        )`,
      }}
    />

    {/* ── 4. PHOSPHOR BLOOM ──────────────────────────────────────────────
        Subtle centre hotspot — the beam was most intense in the middle
        of the screen, making it fractionally brighter there. */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          ellipse 70% 65% at 50% 50%,
          rgba(255,255,245,0.08) 0%,
          transparent           65%
        )`,
        mixBlendMode: 'screen',
      }}
    />

    {/* ── 5. GLASS REFLECTION ────────────────────────────────────────────
        A whisper-soft top-left specular highlight — the overhead office
        fluorescent reflecting off the convex CRT glass. */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '55%',
        height: '38%',
        background: `radial-gradient(
          ellipse 65% 50% at 15% 10%,
          rgba(255,255,255,0.055) 0%,
          transparent             60%
        )`,
        mixBlendMode: 'screen',
      }}
    />

    {/* ── 6. FLICKER ─────────────────────────────────────────────────────
        A very rare, almost subliminal brightness spike — the kind you
        only noticed on a CRT when you looked away and back. */}
    <div
      className="crt-flicker"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,255,255,0)',
        mixBlendMode: 'screen',
      }}
    />

  </div>
);

export default CRTOverlay;
