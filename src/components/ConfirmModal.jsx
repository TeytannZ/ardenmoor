import React, { useState, useEffect } from 'react'
import { SoundEngine } from '../lib/audio.js'

// ─── ConfirmModal ─────────────────────────────────────────────────────────────
// Shared confirmation dialog with dark fantasy aesthetic.
//
// Props:
//   type:         'danger' | 'warning' | 'info'   (default: 'warning')
//   eyebrow:      small label above the title  (e.g. "Chronicle at Risk")
//   title:        main heading
//   body:         paragraph text
//   confirmLabel: text on the confirm button   (default: "Confirm")
//   cancelLabel:  text on the cancel button    (default: "Cancel")
//   onConfirm:    function called on confirm
//   onCancel:     function called on cancel / backdrop click
//   zIndex:       (default 300)
// ─────────────────────────────────────────────────────────────────────────────

const sfxClick = () => { try { SoundEngine.uiClick() } catch (_) {} }
const sfxHover = () => { try { SoundEngine.uiHover() } catch (_) {} }

const THEMES = {
  danger: {
    accent:   'rgba(210,80,55,1)',
    accentDim:'rgba(210,80,55,0.55)',
    accentBg: 'rgba(180,55,35,0.09)',
    iconRing: 'rgba(210,80,55,0.2)',
    confirmBg:'rgba(180,55,35,0.12)',
    confirmBorder:'rgba(210,80,55,0.72)',
    confirmText:'rgba(240,130,110,1)',
    confirmHoverBg:'rgba(180,55,35,0.22)',
    confirmHoverBorder:'rgba(240,130,110,0.85)',
  },
  warning: {
    accent:   'rgba(201,168,76,1)',
    accentDim:'rgba(201,168,76,0.55)',
    accentBg: 'rgba(140,108,22,0.09)',
    iconRing: 'rgba(201,168,76,0.15)',
    confirmBg:'rgba(130,100,20,0.12)',
    confirmBorder:'rgba(201,168,76,0.72)',
    confirmText:'rgba(232,200,100,1)',
    confirmHoverBg:'rgba(130,100,20,0.22)',
    confirmHoverBorder:'rgba(232,200,100,0.88)',
  },
  info: {
    accent:   'rgba(100,148,210,1)',
    accentDim:'rgba(100,148,210,0.55)',
    accentBg: 'rgba(50,80,148,0.09)',
    iconRing: 'rgba(100,148,210,0.15)',
    confirmBg:'rgba(40,65,130,0.12)',
    confirmBorder:'rgba(100,148,210,0.72)',
    confirmText:'rgba(148,190,240,1)',
    confirmHoverBg:'rgba(40,65,130,0.22)',
    confirmHoverBorder:'rgba(148,190,240,0.88)',
  },
}

function ModalButton({ children, onClick, variant = 'cancel', theme }) {
  const [hov, setHov] = useState(false)
  const t = THEMES[theme] || THEMES.warning

  const styles = variant === 'cancel'
    ? {
        bg:           hov ? 'rgba(201,168,76,0.06)' : 'transparent',
        border:       hov ? 'rgba(201,168,76,0.7)'  : 'rgba(155,122,38,0.5)',
        color:        hov ? 'rgba(240,210,120,1)'   : 'rgba(195,162,72,0.88)',
      }
    : {
        bg:           hov ? t.confirmHoverBg   : t.confirmBg,
        border:       hov ? t.confirmHoverBorder : t.confirmBorder,
        color:        t.confirmText,
      }

  return (
    <button
      onMouseEnter={() => { setHov(true);  sfxHover() }}
      onMouseLeave={() => { setHov(false) }}
      onClick={() => { sfxClick(); onClick?.() }}
      style={{
        minWidth: 'clamp(110px,12vw,158px)',
        padding: 'clamp(0.7em,1.1vh,0.95em) clamp(1.6em,2.6vw,2.4em)',
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        borderRadius: '2px',
        fontFamily: '"Cinzel",serif',
        fontSize: 'clamp(0.62rem,0.74vw,0.84rem)',
        letterSpacing: '0.26em',
        textTransform: 'uppercase',
        color: styles.color,
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        boxShadow: hov && variant !== 'cancel' ? `0 0 20px ${t.accentBg}` : 'none',
      }}
    >
      {children}
    </button>
  )
}

function DangerIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <path d="M28 8L50 46H6L28 8Z"
        stroke="rgba(210,80,55,0.75)" strokeWidth="1.8"
        fill="rgba(180,55,35,0.07)"/>
      <path d="M28 8L50 46H6L28 8Z"
        stroke="rgba(210,80,55,0.25)" strokeWidth="6"
        fill="none"/>
      <line x1="28" y1="22" x2="28" y2="34"
        stroke="rgba(230,110,88,0.95)" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="28" cy="40" r="2" fill="rgba(230,110,88,0.95)"/>
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="20"
        stroke="rgba(201,168,76,0.6)" strokeWidth="1.5"
        fill="rgba(140,108,22,0.07)"/>
      <circle cx="28" cy="28" r="20"
        stroke="rgba(201,168,76,0.15)" strokeWidth="6"
        fill="none"/>
      <line x1="28" y1="19" x2="28" y2="30"
        stroke="rgba(225,192,85,0.95)" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="28" cy="36" r="2" fill="rgba(225,192,85,0.95)"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="20"
        stroke="rgba(100,148,210,0.6)" strokeWidth="1.5"
        fill="rgba(50,80,148,0.07)"/>
      <circle cx="28" cy="28" r="20"
        stroke="rgba(100,148,210,0.15)" strokeWidth="6"
        fill="none"/>
      <line x1="28" y1="26" x2="28" y2="37"
        stroke="rgba(148,190,240,0.95)" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="28" cy="20" r="2" fill="rgba(148,190,240,0.95)"/>
    </svg>
  )
}

const ICONS = { danger: DangerIcon, warning: WarningIcon, info: InfoIcon }

// Decorative corner clip (SVG)
function Corner({ pos }) {
  const size = 18
  const s = {
    position: 'absolute',
    width: size, height: size,
    ...(pos === 'tl' ? { top: -1, left: -1 }   : {}),
    ...(pos === 'tr' ? { top: -1, right: -1 }   : {}),
    ...(pos === 'bl' ? { bottom: -1, left: -1 } : {}),
    ...(pos === 'br' ? { bottom: -1, right: -1 }: {}),
    pointerEvents: 'none',
  }
  const flip = pos === 'tr' || pos === 'br' ? 'scaleX(-1)' : pos === 'bl' ? 'scaleY(-1)' : pos === 'br' ? 'scale(-1,-1)' : 'none'
  return (
    <svg style={{ ...s, transform: flip }} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={`M0 ${size} L0 4 Q0 0 4 0 L${size} 0`} stroke="rgba(201,168,76,0.42)" strokeWidth="1.2" fill="none"/>
    </svg>
  )
}

export default function ConfirmModal({
  type = 'warning',
  eyebrow,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  onConfirm,
  onCancel,
  zIndex = 300,
}) {
  const [visible, setVisible] = useState(false)
  const t = THEMES[type] || THEMES.warning
  const Icon = ICONS[type] || WarningIcon

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleCancel  = () => { sfxClick(); onCancel?.() }
  const handleConfirm = () => { sfxClick(); onConfirm?.() }

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) handleCancel() }}
      style={{
        position: 'fixed', inset: 0, zIndex,
        background: 'rgba(2,1,8,0.88)',
        backdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem,3vw,2rem)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.22s ease',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 'clamp(320px,46vw,580px)',
        background: 'linear-gradient(160deg, rgba(10,7,24,0.99) 0%, rgba(6,4,18,0.99) 100%)',
        border: `1px solid rgba(201,168,76,0.22)`,
        borderTop: `2px solid ${t.accent}`,
        borderRadius: '3px',
        padding: 'clamp(2rem,4vh,3rem) clamp(2rem,4vw,3.5rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(1rem,1.8vh,1.4rem)',
        boxShadow: `
          0 0 0 1px rgba(0,0,0,0.6),
          0 8px 80px rgba(0,0,0,0.95),
          0 -1px 40px ${t.accentBg},
          inset 0 1px 0 rgba(255,255,255,0.03)
        `,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(8px)',
        transition: 'transform 0.22s ease, opacity 0.22s ease',
      }}>

        {/* Corner decorations */}
        <Corner pos="tl"/>
        <Corner pos="tr"/>
        <Corner pos="bl"/>
        <Corner pos="br"/>

        {/* Icon */}
        <div style={{
          width: 'clamp(48px,5vw,64px)', height: 'clamp(48px,5vw,64px)',
          flexShrink: 0,
          filter: `drop-shadow(0 0 14px ${t.accentDim})`,
        }}>
          <Icon />
        </div>

        {/* Text block */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          {eyebrow && (
            <div style={{
              fontFamily: '"Cinzel",serif',
              fontSize: 'clamp(0.52rem,0.62vw,0.7rem)',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: t.confirmText,
              marginBottom: 'clamp(0.5rem,0.8vh,0.7rem)',
              opacity: 0.88,
            }}>
              {eyebrow}
            </div>
          )}
          <div style={{
            fontFamily: '"Cinzel Decorative",serif',
            fontSize: 'clamp(1rem,1.5vw,1.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'transparent',
            backgroundImage: type === 'danger'
              ? 'linear-gradient(160deg, #ffe0d8 0%, #e87855 35%, #c04028 70%, #e87855 100%)'
              : 'linear-gradient(160deg, #fff8d8 0%, #ecca50 30%, #b88018 65%, #f0d860 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            filter: `drop-shadow(0 0 18px ${t.accentBg})`,
            marginBottom: 'clamp(0.7rem,1.2vh,1rem)',
          }}>
            {title}
          </div>
          <p style={{
            fontFamily: '"Lora",serif', fontStyle: 'italic',
            fontSize: 'clamp(0.88rem,1vw,1.1rem)',
            lineHeight: 1.82,
            color: 'rgba(228,200,148,0.96)',
            margin: 0,
          }}>
            {body}
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '80%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          margin: 'clamp(0.2rem,0.4vh,0.4rem) 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${t.accentDim})` }} />
          <div style={{ fontSize: '0.55rem', color: t.accentDim }}>✦</div>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${t.accentDim})` }} />
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex', gap: 'clamp(0.8rem,1.5vw,1.2rem)',
          flexWrap: 'wrap', justifyContent: 'center',
          width: '100%',
        }}>
          <ModalButton variant="cancel" theme={type} onClick={handleCancel}>
            {cancelLabel}
          </ModalButton>
          <ModalButton variant="confirm" theme={type} onClick={handleConfirm}>
            {confirmLabel}
          </ModalButton>
        </div>

      </div>
    </div>
  )
}
