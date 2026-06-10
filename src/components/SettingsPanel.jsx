import React, { useState, useEffect, useCallback, useRef } from 'react'
import { SoundEngine, AudioManager } from '../lib/audio.js'
import { storage } from '../lib/storage.js'
import { signOut } from '../lib/supabase.js'
import ConfirmModal from './ConfirmModal.jsx'
import { SCREENS } from '../App.jsx'

const sfxHover  = () => { try { SoundEngine.uiHover()      } catch (_) {} }
const sfxClick  = () => { try { SoundEngine.uiClick()      } catch (_) {} }
const sfxToggle = () => { try { SoundEngine.deedComplete() } catch (_) {} }

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ title }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'0.85rem',
      marginBottom:'clamp(0.8rem,1.3vh,1.05rem)',
      marginTop:'clamp(1.5rem,2.5vh,2.2rem)',
    }}>
      <div style={{ width:'3px', height:'clamp(12px,1.6vh,17px)', background:'rgba(201,168,76,0.72)', flexShrink:0, borderRadius:'1px' }}/>
      <span style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.72rem,0.8vw,0.88rem)',
        letterSpacing:'0.35em', textTransform:'uppercase',
        color:'rgba(215,182,90,0.95)', flexShrink:0,
        textShadow:'0 0 12px rgba(201,168,76,0.18)',
      }}>
        {title}
      </span>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to right,rgba(201,168,76,0.35),transparent)' }}/>
    </div>
  )
}

// ── Volume row ────────────────────────────────────────────────────────────────
function VolumeRow({ label, value, onChange, disabled }) {
  const [active, setActive] = useState(false)
  const pct = Math.round((value ?? 0) * 100)
  return (
    <div style={{
      display:'flex', alignItems:'center',
      gap:'clamp(0.7rem,1.2vw,1.1rem)',
      padding:'clamp(0.55rem,0.9vh,0.75rem) 0',
      borderBottom:'1px solid rgba(255,255,255,0.035)',
      opacity: disabled ? 0.45 : 1,
      transition:'opacity 0.2s',
    }}>
      <span style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.7rem,0.78vw,0.86rem)',
        letterSpacing:'0.14em', textTransform:'uppercase',
        color:'rgba(215,185,110,0.95)',
        width:'clamp(52px,5.5vw,80px)', flexShrink:0,
      }}>
        {label}
      </span>
      <div style={{ flex:1, position:'relative', height:'clamp(24px,2.6vh,30px)', display:'flex', alignItems:'center' }}>
        <div style={{ position:'absolute',left:0,right:0,height:'clamp(2px,0.28vh,3px)',background:'rgba(255,255,255,0.07)',borderRadius:'2px',overflow:'hidden' }}>
          <div style={{
            height:'100%', width:`${pct}%`, borderRadius:'2px',
            background:`linear-gradient(to right,rgba(120,92,22,0.75),${active?'rgba(240,200,80,1)':'rgba(201,168,76,0.92)'})`,
            boxShadow:active?'0 0 8px rgba(201,168,76,0.5)':'none',
            transition:'background 0.12s',
          }}/>
        </div>
        <div style={{
          position:'absolute',
          left:`calc(${pct}% - clamp(6px,0.6vw,8px))`,
          width:'clamp(12px,1.2vw,16px)', height:'clamp(12px,1.2vw,16px)',
          borderRadius:'50%',
          background:active?'#f0d868':'rgba(201,168,76,0.9)',
          border:'2px solid rgba(4,3,12,0.9)',
          boxShadow:active?'0 0 12px rgba(201,168,76,0.6)':'0 1px 5px rgba(0,0,0,0.7)',
          transition:'background 0.12s, box-shadow 0.12s',
          pointerEvents:'none',
        }}/>
        <input
          type="range" min={0} max={1} step={0.01}
          value={value ?? 0}
          disabled={disabled}
          onChange={e => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setActive(true)}
          onMouseUp={()   => setActive(false)}
          onTouchStart={() => setActive(true)}
          onTouchEnd={()   => setActive(false)}
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,cursor:disabled?'default':'pointer',margin:0,zIndex:2 }}
        />
      </div>
      <span style={{
        fontFamily:'"Cinzel Decorative",serif',
        fontSize:'clamp(0.72rem,0.78vw,0.86rem)',
        color: pct > 0 ? 'rgba(201,168,76,0.82)' : 'rgba(100,78,22,0.45)',
        width:'clamp(22px,2.4vw,32px)', textAlign:'right', flexShrink:0,
        transition:'color 0.12s',
      }}>
        {pct}
      </span>
    </div>
  )
}

// ── Toggle row ────────────────────────────────────────────────────────────────
function ToggleRow({ label, description, value, onChange }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={() => { sfxToggle(); onChange(!value) }}
      onMouseEnter={() => { setHov(true); sfxHover() }}
      onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        gap:'clamp(0.8rem,1.4vw,1.6rem)',
        padding:'clamp(0.65rem,1.1vh,0.9rem) clamp(0.75rem,1.1vw,1.1rem)',
        background: hov ? 'rgba(14,11,30,0.75)' : 'rgba(8,6,20,0.6)',
        borderTop:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderRight:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderBottom:`1px solid ${value ? 'rgba(201,168,76,0.32)' : hov ? 'rgba(80,62,14,0.5)' : 'rgba(48,36,10,0.3)'}`,
        borderLeft:`2px solid ${value ? 'rgba(201,168,76,0.72)' : 'rgba(58,44,12,0.32)'}`,
        borderRadius:'0 2px 2px 0',
        cursor:'pointer', transition:'all 0.18s', backdropFilter:'blur(6px)',
      }}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'"Cinzel",serif',
          fontSize:'clamp(0.68rem,0.76vw,0.86rem)',
          letterSpacing:'0.16em', textTransform:'uppercase',
          color: value ? 'rgba(225,192,100,0.98)' : 'rgba(195,165,95,0.9)',
          marginBottom: description ? '0.22rem' : 0, transition:'color 0.18s',
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.72rem,0.82vw,0.9rem)',
            color:'rgba(210,188,142,0.88)', lineHeight:1.6,
          }}>
            {description}
          </div>
        )}
      </div>
      <div style={{
        flexShrink:0,
        width:'clamp(36px,3.6vw,46px)', height:'clamp(19px,1.9vw,24px)',
        borderRadius:'999px',
        background: value ? 'rgba(201,168,76,0.18)' : 'rgba(255,255,255,0.04)',
        border:`1.5px solid ${value ? 'rgba(201,168,76,0.68)' : 'rgba(78,60,14,0.42)'}`,
        position:'relative', transition:'all 0.22s',
        boxShadow: value ? '0 0 10px rgba(201,168,76,0.18)' : 'none',
      }}>
        <div style={{
          position:'absolute', top:'50%', transform:'translateY(-50%)',
          left: value ? 'calc(100% - clamp(15px,1.5vw,19px) - 2px)' : '2px',
          width:'clamp(13px,1.3vw,17px)', height:'clamp(13px,1.3vw,17px)',
          borderRadius:'50%',
          background: value ? 'rgba(201,168,76,0.95)' : 'rgba(105,82,20,0.42)',
          boxShadow: value ? '0 0 8px rgba(201,168,76,0.42)' : 'none',
          transition:'all 0.22s',
        }}/>
      </div>
    </div>
  )
}

// ── API key row ───────────────────────────────────────────────────────────────
function ApiKeyRow({ value, onChange }) {
  const [local,   setLocal]   = useState(value || '')
  const [shown,   setShown]   = useState(false)
  const [focused, setFocused] = useState(false)
  const [saved,   setSaved]   = useState(false)
  const timer = useRef(null)

  const handleSave = () => {
    const trimmed = local.trim()
    if (trimmed && trimmed !== value) {
      onChange(trimmed)
      clearTimeout(timer.current)
      setSaved(true)
      timer.current = setTimeout(() => setSaved(false), 2200)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSave(); e.target.blur() }
  }

  const borderC = focused ? 'rgba(201,168,76,0.55)' : local ? 'rgba(120,94,24,0.45)' : 'rgba(58,44,12,0.3)'

  return (
    <div style={{
      background:'rgba(7,5,20,0.72)', backdropFilter:'blur(8px)',
      border:`1px solid ${borderC}`,
      borderLeft:`2px solid ${focused ? 'rgba(201,168,76,0.72)' : local ? 'rgba(140,108,28,0.5)' : 'rgba(58,44,12,0.32)'}`,
      borderRadius:'0 2px 2px 0',
      padding:'clamp(0.75rem,1.2vh,1rem) clamp(0.85rem,1.2vw,1.2rem)',
      transition:'border-color 0.2s',
    }}>
      <div style={{
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.68rem,0.76vw,0.86rem)',
        letterSpacing:'0.16em', textTransform:'uppercase',
        color:'rgba(200,168,88,0.92)',
        marginBottom:'0.5rem',
      }}>
        OpenRouter API Key
      </div>
      <div style={{
        fontFamily:'"Lora",serif', fontStyle:'italic',
        fontSize:'clamp(0.7rem,0.8vw,0.88rem)',
        color:'rgba(185,158,95,0.85)', lineHeight:1.6,
        marginBottom:'0.75rem',
      }}>
        Update the cipher bound to your Chronicle. Changes take effect immediately.
      </div>
      <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
        <input
          type={shown ? 'text' : 'password'}
          value={local}
          onChange={e => setLocal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); handleSave() }}
          onKeyDown={handleKeyDown}
          placeholder={value ? '••••••••••••••••••••••••' : 'sk-or-v1-...'}
          style={{
            flex:1,
            background:'rgba(4,3,14,0.8)', border:'none',
            padding:'clamp(0.45em,0.7vh,0.62em) clamp(0.6em,0.9vw,0.85em)',
            fontFamily:'"Lora",serif',
            fontSize:'clamp(0.72rem,0.82vw,0.9rem)',
            color:'rgba(225,195,128,0.95)',
            outline:'none', borderRadius:'2px',
          }}
        />
        <button
          onClick={() => setShown(s => !s)}
          onMouseEnter={sfxHover}
          style={{
            flexShrink:0, background:'rgba(4,3,12,0.7)',
            border:'1px solid rgba(78,60,14,0.38)', borderRadius:'2px',
            padding:'clamp(0.38em,0.6vh,0.52em) clamp(0.5em,0.75vw,0.7em)',
            cursor:'pointer', color:'rgba(175,142,58,0.88)',
            transition:'all 0.18s',
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor='rgba(175,142,52,0.6)'; e.currentTarget.style.color='rgba(225,185,80,1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(78,60,14,0.38)'; e.currentTarget.style.color='rgba(175,142,58,0.88)' }}
        >
          {shown
            ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2"/></svg>
          }
        </button>
      </div>
      <div style={{
        marginTop:'0.4rem',
        fontFamily:'"Cinzel",serif',
        fontSize:'clamp(0.72rem,0.78vw,0.86rem)',
        letterSpacing:'0.22em', textTransform:'uppercase',
        color:'rgba(201,168,76,0.88)',
        opacity: saved ? 1 : 0, transition:'opacity 0.3s ease',
      }}>
        ✦ Cipher updated
      </div>
    </div>
  )
}

// ── Action row ────────────────────────────────────────────────────────────────
function ActionRow({ label, description, onClick, danger = false }) {
  const [hov, setHov] = useState(false)
  const bord = danger
    ? (hov ? 'rgba(185,55,38,0.7)'  : 'rgba(120,35,22,0.42)')
    : (hov ? 'rgba(201,168,76,0.6)' : 'rgba(88,68,18,0.38)')
  const textC = danger
    ? (hov ? 'rgba(240,155,132,0.98)' : 'rgba(195,95,75,0.82)')
    : (hov ? 'rgba(225,190,82,0.98)'  : 'rgba(180,148,58,0.82)')
  return (
    <button
      onClick={() => { sfxClick(); onClick() }}
      onMouseEnter={() => { setHov(true); sfxHover() }}
      onMouseLeave={() => setHov(false)}
      style={{
        width:'100%', textAlign:'left',
        display:'flex', alignItems:'center',
        gap:'clamp(0.6rem,0.9vw,0.85rem)',
        padding:'clamp(0.65rem,1.1vh,0.9rem) clamp(0.75rem,1.1vw,1.1rem)',
        background: hov ? (danger ? 'rgba(34,5,3,0.72)' : 'rgba(14,11,30,0.75)') : 'rgba(8,6,20,0.6)',
        border:`1px solid ${bord}`,
        borderLeft:`2px solid ${bord}`,
        borderRadius:'0 2px 2px 0',
        cursor:'pointer', transition:'all 0.18s', backdropFilter:'blur(6px)',
      }}
    >
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          fontFamily:'"Cinzel",serif',
          fontSize:'clamp(0.68rem,0.76vw,0.86rem)',
          letterSpacing:'0.16em', textTransform:'uppercase',
          color:textC, transition:'color 0.18s',
          marginBottom: description ? '0.22rem' : 0,
        }}>
          {label}
        </div>
        {description && (
          <div style={{
            fontFamily:'"Lora",serif', fontStyle:'italic',
            fontSize:'clamp(0.7rem,0.82vw,0.9rem)',
            color:'rgba(208,185,138,0.88)', lineHeight:1.6,
          }}>
            {description}
          </div>
        )}
      </div>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ flexShrink:0, opacity:hov?0.75:0.28, transition:'opacity 0.18s' }}>
        <path d="M3 2L7 5L3 8" stroke={danger?'rgba(200,100,80,0.9)':'rgba(201,168,76,0.9)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ─── SettingsPanel ────────────────────────────────────────────────────────────
// Slide-in overlay panel from the right. Rendered at App level over any screen.
// Props: isOpen, onClose, appState, navigate, updateState
export default function SettingsPanel({ isOpen, onClose, appState, navigate, updateState }) {
  const [settings, setSettings] = useState(() => storage.getSettings())
  const [flash,    setFlash]    = useState(false)
  const [dialog,   setDialog]   = useState(null)
  const flashRef = useRef(null)

  const user = appState?.user

  // Sync settings from storage whenever the panel opens
  useEffect(() => {
    if (isOpen) setSettings(storage.getSettings())
  }, [isOpen])

  // Apply every setting live
  useEffect(() => {
    if (!isOpen) return
    const s = settings
    const muted = s.muted ?? false
    try {
      SoundEngine.setVolume(muted ? 0 : (s.sfxVolume ?? 0.6))
      if (muted) SoundEngine.mute?.()
      else       SoundEngine.unmute?.()
    } catch (_) {}
    try {
      AudioManager.setAmbientVolume(muted ? 0 : (s.ambientVolume ?? 0.3))
      AudioManager.setMusicVolume(muted   ? 0 : (s.musicVolume   ?? 0.45))
      AudioManager.setVoVolume(muted      ? 0 : (s.voVolume      ?? 0.9))
      if (muted) AudioManager.mute?.()
      else       AudioManager.unmute?.()
    } catch (_) {}
    storage.saveSettings(s)
    clearTimeout(flashRef.current)
    setFlash(true)
    flashRef.current = setTimeout(() => setFlash(false), 1000)
    return () => clearTimeout(flashRef.current)
  }, [settings, isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const update = useCallback((key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }))
  }, [])

  const handleSignOut = async () => {
    setDialog(null)
    try { await signOut() } catch (_) {}
    const saved = storage.getSession() || {}
    storage.saveSession({ ...saved, user: null, rememberMe: false })
    updateState?.({ user: null })
    onClose()
    navigate?.(SCREENS.ENTER)
  }

  const handleClearData = () => {
    setDialog(null)
    storage.clearAll()
    updateState?.({ user: null })
    onClose()
    navigate?.(SCREENS.ENTER)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:'fixed', inset:0, zIndex:500,
          background:'rgba(4,3,10,0.68)',
          backdropFilter:'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:'opacity 0.28s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position:'fixed', top:0, right:0, bottom:0,
        width:'clamp(300px,36vw,500px)',
        zIndex:501,
        background:'linear-gradient(to bottom, rgba(5,4,16,0.99) 0%, rgba(7,5,20,0.99) 100%)',
        borderLeft:'1px solid rgba(201,168,76,0.14)',
        boxShadow:'-12px 0 48px rgba(0,0,0,0.72), -2px 0 0 rgba(201,168,76,0.06)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        display:'flex', flexDirection:'column',
        overflow:'hidden',
      }}>
        {/* Panel header */}
        <div style={{
          flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'clamp(1.1rem,2vh,1.6rem) clamp(1.2rem,2vw,1.8rem)',
          borderBottom:'1px solid rgba(201,168,76,0.1)',
          background:'rgba(4,3,14,0.7)',
        }}>
          <div>
            <div style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.62rem,0.72vw,0.8rem)',
              letterSpacing:'0.35em', textTransform:'uppercase',
              color:'rgba(200,165,72,0.9)', marginBottom:'0.2rem',
            }}>
              Configuration
            </div>
            <div style={{
              fontFamily:'"Cinzel Decorative",serif',
              fontSize:'clamp(1.1rem,1.5vw,1.8rem)', fontWeight:700,
              color:'transparent',
              backgroundImage:'linear-gradient(160deg,#fff8d8 0%,#ecca50 22%,#b88018 55%,#f8e868 100%)',
              WebkitBackgroundClip:'text', backgroundClip:'text',
              filter:'drop-shadow(0 0 12px rgba(201,168,76,0.22))',
              letterSpacing:'0.06em',
            }}>
              Settings
            </div>
            {user?.username && (
              <div style={{
                fontFamily:'"Lora",serif', fontStyle:'italic',
                fontSize:'clamp(0.72rem,0.82vw,0.9rem)',
                color:'rgba(185,155,80,0.82)', marginTop:'0.2rem',
              }}>
                {user.username}
              </div>
            )}
          </div>

          {/* Flash + Close */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{
              fontFamily:'"Cinzel",serif',
              fontSize:'clamp(0.68rem,0.76vw,0.84rem)',
              letterSpacing:'0.18em', textTransform:'uppercase',
              color:'rgba(201,168,76,0.72)',
              opacity: flash ? 1 : 0, transition:'opacity 0.28s ease',
              pointerEvents:'none',
            }}>
              ✦ Saved
            </div>
            <button
              onClick={onClose}
              onMouseEnter={sfxHover}
              style={{
                background:'none', border:'none', cursor:'pointer',
                padding:'0.4rem', borderRadius:'2px',
                color:'rgba(201,168,76,0.55)',
                transition:'color 0.18s',
              }}
              onMouseOver={e => e.currentTarget.style.color='rgba(225,188,80,0.95)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(201,168,76,0.55)'}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{
          flex:1, overflowY:'auto',
          scrollbarWidth:'thin', scrollbarColor:'rgba(88,68,19,0.35) transparent',
          padding:'0 clamp(1.2rem,2vw,1.8rem) clamp(2rem,4vh,3rem)',
        }}>

          {/* ── AUDIO ────────────────────────────────────────────────────── */}
          <SectionLabel title="Audio"/>
          <div style={{
            background:'rgba(10,8,26,0.80)', backdropFilter:'blur(8px)',
            border:'1px solid rgba(58,44,12,0.38)',
            borderLeft:'2px solid rgba(120,94,22,0.38)',
            padding:'0 clamp(0.85rem,1.2vw,1.2rem)',
            marginBottom:'clamp(0.5rem,0.8vh,0.7rem)',
          }}>
            <VolumeRow label="SFX"     value={settings.sfxVolume     ?? 0.6}  onChange={v => update('sfxVolume', v)}     disabled={settings.muted}/>
            <VolumeRow label="Ambient" value={settings.ambientVolume  ?? 0.3}  onChange={v => update('ambientVolume', v)} disabled={settings.muted}/>
            <VolumeRow label="Voice"   value={settings.voVolume       ?? 0.9}  onChange={v => update('voVolume', v)}      disabled={settings.muted}/>
            <VolumeRow label="Music"   value={settings.musicVolume    ?? 0.45} onChange={v => update('musicVolume', v)}   disabled={settings.muted}/>
          </div>
          <ToggleRow
            label="Mute All"
            description="Silence every sound in the Archive."
            value={settings.muted ?? false}
            onChange={v => update('muted', v)}
          />

          {/* ── ACCOUNT ──────────────────────────────────────────────────── */}
          <SectionLabel title="Account"/>
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.32rem,0.5vh,0.45rem)' }}>
            <ApiKeyRow
              value={settings.apiKey || ''}
              onChange={v => {
                const next = { ...settings, apiKey: v }
                setSettings(next)
                storage.saveSettings(next)
              }}
            />
            <ActionRow
              label="Sign Out"
              description="Leave the Archive. Your Chronicle and all progress remain saved."
              onClick={() => setDialog('signout')}
            />
          </div>

          {/* ── DATA ─────────────────────────────────────────────────────── */}
          <SectionLabel title="Data"/>
          <div style={{ display:'flex', flexDirection:'column', gap:'clamp(0.32rem,0.5vh,0.45rem)' }}>
            <ActionRow
              label="Reset All Data"
              description="Erase all local data — plan, chronicle, onboarding, story progress, and session. Starts completely fresh."
              danger
              onClick={() => setDialog('cleardata')}
            />
          </div>

          <div style={{
            fontFamily:'"Cinzel",serif',
            fontSize:'clamp(0.58rem,0.65vw,0.72rem)',
            letterSpacing:'0.22em', color:'rgba(170,138,52,0.82)',
            textAlign:'right', marginTop:'clamp(1.2rem,2.5vh,2rem)',
          }}>
            Ardenmoor · Changes save automatically
          </div>

        </div>
      </div>

      {dialog === 'signout' && (
        <ConfirmModal
          type="warning"
          eyebrow="Leaving the Archive"
          title="Sign Out"
          body="You will be signed out. Your Chronicle and all progress remain saved and will be waiting when you return."
          confirmLabel="Sign Out"
          cancelLabel="Stay"
          zIndex={600}
          onConfirm={handleSignOut}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === 'cleardata' && (
        <ConfirmModal
          type="danger"
          eyebrow="Irreversible Action"
          title="Reset All Data"
          body="Everything will be erased — your plan, chronicle progress, onboarding conversation, and story progress. You will start completely fresh. This cannot be undone."
          confirmLabel="Reset Everything"
          cancelLabel="Keep Everything"
          zIndex={600}
          onConfirm={handleClearData}
          onCancel={() => setDialog(null)}
        />
      )}
    </>
  )
}
