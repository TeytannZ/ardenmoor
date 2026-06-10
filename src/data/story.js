// src/data/story.js
// Complete beat data â€” Ardenmoor: The Forgotten Codex
// Act 1: "The Archive Burns"

// â”€â”€â”€ Beat constructors â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// n   (text)                          â€” narrator block, no BG change
// nb  (text, bg, clearStage, scene)   â€” narrator block + BG transition; scene = { id, title, summary }
// d   (char, side, expr, text, opts)  â€” character dialogue (NPC auto-shows player on opposite side)
// dn  (char, side, expr, text, opts)  â€” NPC-to-NPC dialogue (player portrait NOT auto-shown)
// ch  (choiceId, options)             â€” choice point
// op  (text, flag, reactionBeats)     â€” individual choice option

const n  = (text)                              => ({ type: 'narration', text })
// nb: narration with optional BG change and optional segment marker.
// segment = { id: 'a1_seg{n}', title, summary } â€” marks the first beat of a new weekly segment.
// The StoryScreen engine gates on segmentId, so leave segment null for all mid-segment beats.
const nb = (text, bg, clearStage = false, segment = null) => ({
  type: 'narration', text, bg, clearStage,
  ...(segment ? { segmentId: segment.id, segmentTitle: segment.title, segmentSummary: segment.summary } : {})
})
// d: showPlayer=true â€” engine auto-stages the player portrait as listener on opposite side.
// opts may include: { preSfx: 'gasp_female' } â€” plays SFX before/with dialogue (Priority 4).
const d  = (char, side, expr, text, opts = {}) => ({ type: 'dialogue', char, side, expr, text, showPlayer: true, ...opts })
// dn: NPC-to-NPC â€” engine does NOT auto-stage the player portrait
const dn = (char, side, expr, text, opts = {}) => ({ type: 'dialogue', char, side, expr, text, showPlayer: false, ...opts })
const ch = (choiceId, opts)           => ({ type: 'choice', choiceId, options: opts })
// op: choice option.
//   requires = { coins: N }                    â€” gates the option (coin cost or item check)
//   effects  = { relationships: {char:delta}, give: [{id,name,qty}] }
//            â€” applied when option is selected (adjustRelationship + giveItem calls)
const op = (text, flag, beats, requires = null, effects = null) => ({
  text, flag: flag || null, beats: beats || [],
  ...(requires ? { requires } : {}),
  ...(effects  ? { effects  } : {}),
})

// Export constructors for use in sparks.js and epochs.js
export { n, nb, d, dn, ch, op }

// â”€â”€â”€ Portrait image paths â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Expression keys per character:
//   idle_1, idle_2, idle_3  â€” three distinct idle/neutral poses
//   neutral                 â€” alias â†’ idle_1
//   happy, sad, angry, surprised, fearful, thoughtful
//   urgent, quiet           â€” story-specific aliases
//   'almost-smiling'        â€” story-specific alias
//
// Paths are constructed so each one works as soon as the file is placed in the correct
// folder. If a file does not exist yet the browser will fail to load it; the Portrait
// component catches this and falls back to idle_1, then renders nothing if that also fails.
function makePorts(name) {
  const b = `${import.meta.env.BASE_URL}assets/images/portraits/${name}/`
  return {
    idle_1:           b + 'idle_1.png',
    idle_2:           b + 'idle_2.png',
    idle_3:           b + 'idle_3.png',
    neutral:          b + 'idle_1.png',
    happy:            b + 'happy.png',
    sad:              b + 'sad.png',
    angry:            b + 'angry.png',
    surprised:        b + 'surprised.png',
    fearful:          b + 'fearful.png',
    thoughtful:       b + 'thoughtful.png',
    // story-alias expressions
    urgent:           b + 'urgent.png',
    quiet:            b + 'thoughtful.png',
    'almost-smiling': b + 'happy.png',
    // pose states â€” used automatically by the engine
    listening:        b + 'listening.png',  // character listening, not speaking
    talking:          b + 'talking.png',    // character actively speaking (reserved for future VO sync)
  }
}

export const PORTRAITS = {
  maren:    makePorts('maren'),
  vael:     makePorts('vael'),
  kael:     makePorts('kael'),
  sira:     makePorts('sira'),
  baren:    makePorts('baren'),
  serath:   makePorts('serath'),
  ryn:      makePorts('ryn'),
  dorath:   makePorts('dorath'),
  wren:     makePorts('wren'),
  lyss:     makePorts('lyss'),
  cael:     makePorts('cael'),
  kira:     makePorts('kira'),
  voss:     makePorts('voss'),
  aldren:   makePorts('aldren'),
  orin:     makePorts('orin'),
  rendered: makePorts('rendered'),
  brek:     makePorts('brek'),
  eran:     makePorts('eran'),
  tal:      makePorts('tal'),
  gavrick:  makePorts('gavrick'),
  lenne:    makePorts('lenne'),
  cavar:    makePorts('cavar'),
  pellard:  makePorts('pellard'),
}

// â”€â”€â”€ Background image paths & scene properties â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// type: 'STANDARD' | 'WIDE' | 'TALL'
// dir:
//   STANDARD â†’ 'zoom-in' | 'zoom-out'
//   WIDE     â†’ 'left-to-right' | 'right-to-left'
//   TALL     â†’ 'top-to-bottom' | 'bottom-to-top'
// particleColor: [r, g, b] â€” ambient particle tint matching scene palette
// effects: array â€” CSS overlay effects rendered by StoryEffects component
//   'dust'      â€” slow-drifting dust motes
//   'lamplight' â€” warm pulsing glow at scene edges
//   'fog'       â€” slow horizontal wisps
//   'embers'    â€” rising hot particles
//   'smoke'     â€” rising grey wisps
//   'rain'      â€” falling diagonal streaks
// label: short human-readable location name (used in Scene Journal)
//
// Fallback src paths point to existing placeholder images until new assets are generated.
// â”€â”€â”€ Camera angle variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Each BG may have an `angles` map. Beat data uses `bgAngle: 'key'` to request a
// specific composition of the same location without changing any other BG property
// (particleColor, effects, label all inherit from the base object).
//
// Generating angle variants in Leonardo AI:
//   1. Generate the base image first.
//   2. Import the base image as a Leonardo reference (Image-to-Image).
//   3. Add an angle-specific suffix to the base prompt:
//      close_a  â†’ "â€¦close-up detail, tight framing on [focal point]"
//      close_b  â†’ "â€¦close-up on [alternate focal point], narrow depth of field"
//      wide     â†’ "â€¦wide establishing shot, full environmental scale, panoramic"
//      behind   â†’ "â€¦shot from behind [character position], looking into the scene"
//   4. Place generated files in /assets/images/backgrounds/{close|wide|behind}/.
//
// Naming convention: {base_filename}_{angle}.jpg
// e.g. act1_archive_exterior_night_close_a.jpg â†’ folder: close/
//
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const BG = {
  archive_night: {
    src:           '/assets/images/backgrounds/standard/act1_archive_exterior_night.jpg',
    fallback:      '/assets/images/ui/onboarding-bg.jpg',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [201, 168, 76],
    effects:       ['dust', 'lamplight', 'fireflies'],
    label:         'The Archive â€” Before Dawn',
    ambient:       'archive-exterior-night.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_archive_exterior_night_close_a.jpg',  type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act1_archive_exterior_night_wide.jpg',       type: 'WIDE',     dir: 'right-to-left' },
      behind:  { src: '/assets/images/backgrounds/behind/act1_archive_exterior_night_behind.jpg',   type: 'STANDARD', dir: 'zoom-out'      },
    },
  },
  archive_interior: {
    src:           '/assets/images/backgrounds/standard/act1_archive_study_room.jpg',
    fallback:      '/assets/images/cutscenes/072_bg_hidden_chamber_relic_close.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [185, 140, 55],
    effects:       ['dust', 'lamplight'],
    label:         'The Archive â€” Study Room',
    ambient:       'archive-interior-day.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_archive_study_room_close_a.jpg',  type: 'STANDARD', dir: 'zoom-in'       },
      close_b: { src: '/assets/images/backgrounds/close/act1_archive_study_room_close_b.jpg',  type: 'STANDARD', dir: 'zoom-out'      },
      wide:    { src: '/assets/images/backgrounds/wide/act1_archive_study_room_wide.jpg',       type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  archive_escape: {
    src:           '/assets/images/backgrounds/wide/act1_archive_corridor_smoke.jpg',
    fallback:      '/assets/images/cutscenes/033_bg_voss_watching_streak.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [220, 90, 28],
    effects:       ['embers', 'smoke'],
    label:         'The Archive â€” Burning Corridor',
    ambient:       'archive-burning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_archive_corridor_smoke_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'  },
      behind:  { src: '/assets/images/backgrounds/behind/act1_archive_corridor_smoke_behind.jpg',  type: 'STANDARD', dir: 'zoom-out' },
    },
  },
  storage_night: {
    src:           '/assets/images/backgrounds/standard/act1_storage_district_night.jpg',
    fallback:      '/assets/images/cutscenes/070_bg_festival_fire_late_night.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [100, 128, 175],
    effects:       ['fog', 'fireflies'],
    label:         'Storage District â€” Night',
    ambient:       'storage-district-night.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_storage_district_night_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act1_storage_district_night_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
    },
  },
  city_morning: {
    src:           '/assets/images/backgrounds/wide/act1_city_gate_morning.jpg',
    fallback:      '/assets/images/cutscenes/073_bg_settlement_courtyard_first_morning.png',
    type:          'WIDE',
    dir:           'right-to-left',
    particleColor: [210, 168, 100],
    effects:       ['dust'],
    label:         'City Gate â€” Morning',
    ambient:       'city-morning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_city_gate_morning_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  cold_field: {
    src:           '/assets/images/backgrounds/standard/act1_cold_field_road.jpg',
    fallback:      '/assets/images/cutscenes/034_bg_cold_field_far.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [130, 145, 162],
    effects:       ['fog'],
    label:         'The Road East â€” Cold Field',
    ambient:       'road-cold-field.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_cold_field_road_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act1_cold_field_road_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
      behind:  { src: '/assets/images/backgrounds/behind/act1_cold_field_road_behind.jpg',  type: 'STANDARD', dir: 'zoom-out'      },
    },
  },
  // â”€â”€ New scenes added for Phase 1 story â”€â”€
  safe_house: {
    src:           '/assets/images/backgrounds/standard/act1_safe_house_interior.jpg',
    fallback:      '/assets/images/cutscenes/072_bg_hidden_chamber_relic_close.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [185, 148, 58],
    effects:       ['dust', 'lamplight'],
    label:         "Dorath's Safe House",
    ambient:       'safe-house.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_safe_house_interior_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  forest_path: {
    src:           '/assets/images/backgrounds/standard/act1_forest_path.jpg',
    fallback:      '/assets/images/cutscenes/034_bg_cold_field_far.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [88, 108, 78],
    effects:       ['fog', 'spores'],
    label:         'The Forest Road East',
    ambient:       'forest-path.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_forest_path_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act1_forest_path_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
    },
  },
  settlement_exterior: {
    src:           '/assets/images/backgrounds/wide/act1_settlement_exterior.jpg',
    fallback:      '/assets/images/cutscenes/036_bg_barens_settlement_gate.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [155, 135, 105],
    effects:       ['dust'],
    label:         'The Hidden Settlement',
    ambient:       'settlement-exterior.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_settlement_exterior_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'  },
      behind:  { src: '/assets/images/backgrounds/behind/act1_settlement_exterior_behind.jpg',  type: 'STANDARD', dir: 'zoom-out' },
    },
  },
  settlement_interior: {
    src:           '/assets/images/backgrounds/standard/act1_settlement_study.jpg',
    fallback:      '/assets/images/cutscenes/072_bg_hidden_chamber_relic_close.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [195, 160, 85],
    effects:       ['dust', 'lamplight'],
    label:         'The Settlement â€” Inner Room',
    ambient:       'settlement-interior.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act1_settlement_study_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },

  // â”€â”€ Act 2 backgrounds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  act2_wilderness: {
    src:           '/assets/images/backgrounds/wide/act2_eastern_wilderness_road.jpg',
    fallback:      '/assets/images/cutscenes/034_bg_cold_field_far.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [115, 128, 105],
    effects:       ['fog'],
    label:         'The Eastern Road',
    ambient:       'road-cold-field.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_eastern_wilderness_road_close_a.jpg',  type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act2_eastern_wilderness_road_wide.jpg',       type: 'WIDE',     dir: 'right-to-left' },
      behind:  { src: '/assets/images/backgrounds/behind/act2_eastern_wilderness_road_behind.jpg',   type: 'STANDARD', dir: 'zoom-out'      },
    },
  },
  act2_border_town: {
    src:           '/assets/images/backgrounds/standard/act2_border_settlement_square.jpg',
    fallback:      '/assets/images/cutscenes/036_bg_barens_settlement_gate.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [155, 138, 105],
    effects:       ['dust'],
    label:         'The Border Settlement',
    ambient:       'settlement-exterior.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_border_settlement_square_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'  },
      wide:    { src: '/assets/images/backgrounds/wide/act2_border_settlement_square_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  act2_border_inn: {
    src:           '/assets/images/backgrounds/standard/act2_border_inn_interior.jpg',
    fallback:      '/assets/images/cutscenes/072_bg_hidden_chamber_relic_close.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [175, 145, 88],
    effects:       ['dust', 'lamplight'],
    label:         'The Border Inn',
    ambient:       'safe-house.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_border_inn_interior_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  act2_eastern_road: {
    src:           '/assets/images/backgrounds/wide/act2_paved_road_east.jpg',
    fallback:      '/assets/images/cutscenes/034_bg_cold_field_far.png',
    type:          'WIDE',
    dir:           'right-to-left',
    particleColor: [140, 148, 162],
    effects:       ['dust'],
    label:         'The Paved Road East',
    ambient:       'city-morning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_paved_road_east_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
      wide:    { src: '/assets/images/backgrounds/wide/act2_paved_road_east_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  act2_city_approach: {
    src:           '/assets/images/backgrounds/wide/act2_eastern_city_approach.jpg',
    fallback:      '/assets/images/cutscenes/073_bg_settlement_courtyard_first_morning.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [175, 160, 135],
    effects:       ['dust', 'fog'],
    label:         'The Eastern City â€” Approach',
    ambient:       'city-morning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_eastern_city_approach_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
      wide:    { src: '/assets/images/backgrounds/wide/act2_eastern_city_approach_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
    },
  },
  act2_city_gate: {
    src:           '/assets/images/backgrounds/standard/act2_eastern_city_gate.jpg',
    fallback:      '/assets/images/cutscenes/073_bg_settlement_courtyard_first_morning.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [165, 148, 110],
    effects:       ['dust'],
    label:         'The Eastern City Gate',
    ambient:       'archive-exterior-night.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_eastern_city_gate_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act2_eastern_city_gate_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
      behind:  { src: '/assets/images/backgrounds/behind/act2_eastern_city_gate_behind.jpg',  type: 'STANDARD', dir: 'zoom-out'      },
    },
  },
  act2_city_alley: {
    src:           '/assets/images/backgrounds/standard/act2_city_narrow_alley.jpg',
    fallback:      '/assets/images/cutscenes/033_bg_voss_watching_streak.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [88,  95, 115],
    effects:       ['fog'],
    label:         'The Eastern City â€” Alley',
    ambient:       'archive-burning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_city_narrow_alley_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'  },
      wide:    { src: '/assets/images/backgrounds/wide/act2_city_narrow_alley_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  act2_city_contact: {
    src:           '/assets/images/backgrounds/standard/act2_city_contact_room.jpg',
    fallback:      '/assets/images/cutscenes/072_bg_hidden_chamber_relic_close.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [195, 165, 85],
    effects:       ['dust', 'lamplight'],
    label:         'The Eastern City â€” Contact',
    ambient:       'safe-house.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_city_contact_room_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  act2_spire_exterior: {
    src:           '/assets/images/backgrounds/wide/act2_the_spire_exterior.jpg',
    fallback:      '/assets/images/cutscenes/018_bg_corrupted_throne_room.png',
    type:          'WIDE',
    dir:           'right-to-left',
    particleColor: [88, 100, 140],
    effects:       ['fog', 'dust'],
    label:         'The Spire',
    ambient:       'archive-burning.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act2_the_spire_exterior_close_a.jpg', type: 'STANDARD', dir: 'zoom-in'       },
      wide:    { src: '/assets/images/backgrounds/wide/act2_the_spire_exterior_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
    },
  },

  // â”€â”€ Act 3 backgrounds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  act3_northern_road: {
    src:           '/assets/images/backgrounds/wide/act3_northern_road_pines.jpg',
    fallback:      '/assets/images/cutscenes/020_bg_frozen_wasteland_path.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [165, 180, 200],
    effects:       ['dust'],
    label:         'The Northern Road',
    ambient:       'forest-wind.mp3',
    angles: {
      wide:    { src: '/assets/images/backgrounds/wide/act3_northern_road_pines_wide.jpg',   type: 'WIDE',     dir: 'left-to-right' },
      close_a: { src: '/assets/images/backgrounds/close/act3_northern_road_pines_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  act3_aevorn: {
    src:           '/assets/images/backgrounds/standard/act3_aevorn_settlement.jpg',
    fallback:      '/assets/images/cutscenes/017_bg_flooded_village_mist.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [155, 170, 190],
    effects:       ['dust', 'fog'],
    label:         'Aevorn',
    ambient:       'forest-wind.mp3',
    angles: {
      wide:    { src: '/assets/images/backgrounds/wide/act3_aevorn_settlement_wide.jpg',   type: 'WIDE',     dir: 'left-to-right' },
      close_a: { src: '/assets/images/backgrounds/close/act3_aevorn_settlement_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  act3_aevorn_inn: {
    src:           '/assets/images/backgrounds/standard/act3_aevorn_inn_interior.jpg',
    fallback:      '/assets/images/cutscenes/012_bg_tavern_fire.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [195, 155, 85],
    effects:       ['dust', 'lamplight'],
    label:         'Aevorn â€” The Inn',
    ambient:       'safe-house.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act3_aevorn_inn_interior_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
      wide:    { src: '/assets/images/backgrounds/wide/act3_aevorn_inn_interior_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  act3_aevorn_study: {
    src:           '/assets/images/backgrounds/standard/act3_aevorn_study_room.jpg',
    fallback:      '/assets/images/cutscenes/025_bg_archive_reading_room.png',
    type:          'STANDARD',
    dir:           'zoom-in',
    particleColor: [190, 170, 115],
    effects:       ['dust', 'lamplight'],
    label:         "Lenne's Study",
    ambient:       'archive-interior.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act3_aevorn_study_room_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
      wide:    { src: '/assets/images/backgrounds/wide/act3_aevorn_study_room_wide.jpg',      type: 'WIDE',     dir: 'right-to-left' },
    },
  },
  act3_mountain_ridge: {
    src:           '/assets/images/backgrounds/wide/act3_mountain_ridge_cold.jpg',
    fallback:      '/assets/images/cutscenes/021_bg_ruined_citadel_clifftop.png',
    type:          'WIDE',
    dir:           'right-to-left',
    particleColor: [175, 190, 210],
    effects:       ['dust'],
    label:         'The Northern Ridge',
    ambient:       'forest-wind.mp3',
    angles: {
      wide:    { src: '/assets/images/backgrounds/wide/act3_mountain_ridge_cold_wide.jpg',   type: 'WIDE',     dir: 'right-to-left' },
      close_a: { src: '/assets/images/backgrounds/close/act3_mountain_ridge_cold_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
    },
  },
  act3_aevorn_hall: {
    src:           '/assets/images/backgrounds/standard/act3_aevorn_hall_meeting.jpg',
    fallback:      '/assets/images/cutscenes/063_bg_grand_chamber_council.png',
    type:          'STANDARD',
    dir:           'zoom-out',
    particleColor: [185, 165, 100],
    effects:       ['dust', 'lamplight'],
    label:         'Aevorn â€” Hall',
    ambient:       'archive-interior.mp3',
    angles: {
      close_a: { src: '/assets/images/backgrounds/close/act3_aevorn_hall_meeting_close_a.jpg', type: 'STANDARD', dir: 'zoom-in' },
      wide:    { src: '/assets/images/backgrounds/wide/act3_aevorn_hall_meeting_wide.jpg',      type: 'WIDE',     dir: 'left-to-right' },
    },
  },
  act3_northern_road_south: {
    src:           '/assets/images/backgrounds/wide/act3_northern_road_south_departure.jpg',
    fallback:      '/assets/images/cutscenes/023_bg_mountain_road_departure.png',
    type:          'WIDE',
    dir:           'left-to-right',
    particleColor: [160, 175, 195],
    effects:       ['dust'],
    label:         'The Road South',
    ambient:       'forest-wind.mp3',
    angles: {
      wide: { src: '/assets/images/backgrounds/wide/act3_northern_road_south_departure_wide.jpg', type: 'WIDE', dir: 'left-to-right' },
    },
  },
}

// â”€â”€â”€ Act 1 beats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//
// SEGMENT STRUCTURE â€” one gate per week completed in the plan:
//   a1_seg0  Always free   â€” Arrival. Five weeks of study. The Archive burns.
//   a1_seg1  Week  1 gate  â€” The other side of the passage. Ryn. The escape.
//   a1_seg2  Week  2 gate  â€” Maren's confession. The city gate. The road east.
//   a1_seg3  Week  3 gate  â€” The voice in the trees. Dorath. The safe house.
//   a1_seg4  Week  4 gate  â€” What the symbol means. The house unsafe.
//   a1_seg5  Week  5 gate  â€” The cipher opened. The fourteenth fragment.
//   a1_seg6  Week  6 gate  â€” The first practice. Brek's message arrives.
//   a1_seg7  Week  7 gate  â€” Brek arrives. The escape was allowed.
//   a1_seg8  Week  8 gate  â€” What Maren knew. The deep records. Serath ahead.
//   a1_seg9  Week  9 gate  â€” The trail. The building at the road's end.
//   a1_seg10 Week 10 gate  â€” Voss. The fragment that survived the fire.
//   a1_seg11 Week 11 gate  â€” What you carry. Sira's book found.
//   a1_seg12 Week 12 gate  â€” The book's full content. The settlement's location.
//   a1_seg13 Week 13 gate  â€” The settlement. Sira found. Serath is there.
//   a1_seg14 Week 14 gate  â€” Serath's truth. The settlement's history.
//   a1_seg15 Week 15 gate  â€” The method complete. It works.
//   a1_seg16 Week 16 gate  â€” What the Archive was for. Act One closes.
//
export const ACT1_BEATS = [

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 0 â€” BEFORE IT BURNS  (always free)
  // Arrival. Five weeks of learning. Something is wrong. The bell rings.
  // Cliffhanger: the passage door has something on the other side.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The Archive is not what you expected. You had imagined something grand â€” columns, gates, a weight you would feel the moment you stepped past the threshold. What you find instead is a building that looks like it has been standing here since before anyone decided what to call it. The stones are dark with age and the mortar between them has been repaired so many times it has become a record of all the winters that have passed over this place. You arrive in the hour before dawn, when the city behind you is still deciding whether to wake, and somewhere in the upper corridors a lamp is already burning.",
    BG.archive_night, false,
    { id: 'a1_seg0', title: 'Before It Burns', summary: 'You arrive at the Archive. Five weeks of learning, and then the night everything changes.' }
  ),

  n("Maren is at the gate. She is not someone you would notice in a crowd â€” not because there is nothing remarkable about her, but because everything remarkable about her is the kind that takes time to see. She is standing exactly where she said she would be in the letter, at exactly the hour she specified, and she is looking at you the way someone looks at a word they almost remembered but didn't quite catch."),

  d("MAREN", "left",  "neutral", "You're later than I expected."),
  d("KAEL",  "right", "neutral", "The road through the lower district. I was told there was a direct path through the quarter-market, but there was a collapsed wall blocking the eastern approach."),
  d("MAREN", "left",  "neutral", "Yes. That wall collapsed three months ago. I assumed whoever sent you would have briefed you on alternate routes by now."),

  n("She says it without accusation. It is a notation, the same way she makes all her notations â€” here is a gap, here is what fills it, here is how long it has been waiting to be filled. You will learn over the weeks to come that this is simply how she processes the world. She does not hold omissions against you. She catalogs them."),

  d("MAREN", "left", "neutral", "Come inside. There is a great deal to cover before the others arrive, and you look like you haven't slept in two days."),
  d("KAEL",  "right", "neutral", "I slept on the road."),
  d("MAREN", "left", "almost-smiling", "That is not what I said."),

  n("The Archive smells of old stone and dry paper and something faintly mineral underneath both â€” a smell that has no name you know, the smell of things preserved past the natural end of their life by careful and continuous effort. Maren walks ahead of you without looking back to check if you are following. The corridors are lit by lamps set into iron brackets at regular intervals, and the light they give is amber and steady and old-feeling, the kind of light that has been in this building for so long it seems to belong to the architecture rather than the fixtures."),

  n("You pass through the public entrance â€” formal, symmetrical, the kind of design that says this institution has been here long enough to afford dignity â€” and then Maren takes you left through a narrower passage and suddenly the building changes character. The public rooms were built to be seen. The interior was built to hold things. Older stone here, different mortar, corridors that start at one height and arrive at another because different generations of architects each worked around what the previous ones had left. It is a building that has been thinking about itself for a very long time."),

  d("MAREN", "left", "neutral", "The Archive was built around three original collections. The Aethyn records, which cover administrative and legal precedent going back four hundred years. The Vraen fragments, which are something else entirely and which you will spend the majority of your time here working to understand. And a third collection that was being catalogued when the Archive went through its first major disruption, two hundred and sixty years ago. It was destroyed before the cataloguing was complete."),
  d("KAEL",  "right", "neutral", "Destroyed how?"),
  d("MAREN", "left", "neutral", "Nobody knows. That is part of what makes it interesting. It is referred to in the literature as the Unnamed Third. Do not spend too much time on the mythology around it â€” people here have a tendency to make it more dramatic than the evidence supports. Treat it as a notation problem. Something existed, was organized according to a logic we no longer have access to, and was then removed. The question is whether residue of that logic survives elsewhere in the collection."),
  d("MAREN", "left", "neutral", "Usually it does. Usually you can reconstruct the outline of a lost thing from what it left behind in other things."),

  n("You pass a high window that opens onto an interior courtyard. In the grey pre-dawn, a figure is running the perimeter of the courtyard in silence â€” not fast, not urgently, but with the patient repetition of someone who has been doing this for long enough that the motion has become a kind of thinking. He doesn't look up. He may not be aware there is a window above him. He may simply not care."),

  d("MAREN", "left", "neutral", "Brek. Third year here. He says the body resolves problems the mind has not yet found language for. He runs the same circuit every morning before the Archive opens."),
  d("KAEL",  "right", "neutral", "Does it work?"),
  d("MAREN", "left", "neutral", "Three times, to my knowledge. He has been running a fourth problem for eight months now. He will get there. He is exactly the kind of person who eventually gets there."),

  n("Through an open doorway you see another figure â€” not running, not moving at all. A young man standing at a reading desk with the particular posture of someone who has forgotten chairs exist, slightly forward, one hand resting on an open manuscript, one finger tracing the gap between two annotations as if measuring the physical distance between them. He does not look up when you pass. Whatever is in those annotations holds more of his attention than the sound of footsteps in the corridor."),

  d("MAREN", "left", "quiet", "Serath. He arrived six months before you. In the Vraen fragments specifically, he has already surpassed what most people here learn in two years. In one or two areas, I believe he may be past me."),
  d("KAEL",  "right", "neutral", "Then why is he still here?"),
  d("MAREN", "left", "neutral", "Because knowing a body of knowledge and knowing what to do with what it contains are two entirely different skills, and the gap between them does not close on its own. He is working on the second one. He will find it."),

  // â”€â”€ How do you learn? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ch("LEARN_STYLE", [
    op(
      "You learn by asking questions â€” even the ones that sound obvious. Especially those.",
      "LEARNER_Q",
      [
        n("Maren glances at you briefly. Not surprised â€” you get the sense she had already made a guess about you and is now deciding whether it was accurate."),
        d("MAREN", "left", "neutral", "Good. The questions that sound obvious are usually the ones nobody has thought to answer precisely. Ask them. I will tell you when one has been answered well enough that it does not need asking again."),
      ],
      null,
      { relationships: { maren: 7 } }  // She values precise questions â€” this is her mode of inquiry
    ),
    op(
      "You learn by watching first. You want to understand the pattern before you touch it.",
      "LEARNER_W",
      [
        n("Maren considers this for a moment as you reach a junction in the corridor."),
        d("MAREN", "left", "neutral", "That will serve you well in the fragments. They resist direct approaches. They reveal themselves to people who are patient enough to let them come into focus rather than forcing them."),
        n("She says this as though it is both a compliment and a warning."),
      ],
      null,
      { relationships: { maren: 6 } }  // "That will serve you well" â€” she approves of patience
    ),
    op(
      "You learn by doing. You would rather make an error and correct it than understand something only in theory.",
      "LEARNER_D",
      [
        n("A small pause. Not disapproval â€” more the look of someone revising their notes about you."),
        d("MAREN", "left", "neutral", "Then we begin with the catalog cross-references. It is work that shows you errors quickly and rewards corrections clearly. We layer the theory in once your hands know the material."),
      ],
      null,
      { relationships: { maren: 4 } }  // She adapts; the pause shows a slight recalibration of her notes on you
    ),
  ]),

  // â”€â”€ Time skip â€” five weeks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nb(
    "The first week disappears before you can properly account for it. The second one too. By the third you have stopped trying to keep track of days and started organizing time differently â€” by which section of the collection you were working in, by which problem was open on the desk when the lamp oil ran low, by which conversation with Maren settled a question you hadn't known to ask. The Archive does something to the sense of time. It makes the past feel closer and the present feel less urgent, which is either a property of very old buildings or a property of learning things that have been waiting a long time to be learned.",
    BG.archive_interior, false
  ),

  n("The Vraen fragments are unlike anything you have studied before. They are not records in the ordinary sense â€” not histories, not legal documents, not the administrative catalogues of a dead institution. They are something in between instruction and memory, written in a hand that changes subtly across different pieces as though the same person composed them over decades, each time slightly further from who they had been when they started. What they describe, Maren explains, is a method. A way of holding things â€” knowledge, language, meaning â€” so precisely in the mind that the mind itself begins to function differently. The fragments were written by someone who had done this. Someone who wanted to show it could be done."),

  d("MAREN", "left", "thoughtful", "Most people who come here want to study the fragments the way you study a text. Annotation, cross-reference, context. That is not wrong. But the people who understand them â€” who truly understand them â€” are the ones who eventually start doing what the fragments describe rather than reading about it."),
  d("KAEL",  "right", "neutral", "What does it describe, exactly?"),
  d("MAREN", "left", "neutral", "Precise internal preservation. The ability to hold a complete body of knowledge in the mind without distortion, without erosion, across years and decades. Not summaries. Not impressions. The thing itself, held exactly as it was given. The fragments describe the practice that makes this possible. Not as metaphor or aspiration. As instruction."),
  d("KAEL",  "right", "neutral", "Has anyone done it? Someone living?"),
  d("MAREN", "left", "neutral", "That is a question I have been working on for nineteen years."),

  n("A rhythm develops. Mornings with the cross-reference catalogs, tracing the invisible architecture of how the collection was organized by the hands that assembled it. Afternoons working directly with the fragments themselves â€” the smell of them up close is different from the rest of the Archive, older, drier, something faintly sweet underneath that you eventually decide is the particular preservative the original archivist used. Evenings sometimes with Serath and Brek at the common room table, three people working in different directions at the same silence, each occasionally saying something the others turn over without immediately responding."),

  n("Serath talks about the fragments the way someone talks about a person they have been trying to understand for a long time â€” with a precise, almost clinical observation that has something living underneath it, something that is not quite frustration but lives in the same vicinity. Brek mostly listens, and when he does speak it lands differently than you expect: conclusions arrived at sideways, through routes nobody else would have thought to take. You begin to understand what Maren meant about him."),

  // â”€â”€ What have you become good at? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ch("SKILL_CHOICE", [
    op(
      "The internal structure of the fragments â€” you can feel when a section is complete and when something is absent from it.",
      "SKILL_STRUCT",
      [
        n("It happens gradually and then suddenly: the fragments stop being a foreign language and start being a partially familiar one. You can feel the shape of an argument before you can read the argument itself. Maren notices. Without commenting on it, she begins giving you the gaps rather than the complete sections â€” asking you to find what is missing rather than to explain what is there."),
      ],
      null,
      { relationships: { maren: 8 } }  // She changes her teaching approach â€” the highest compliment she knows how to give
    ),
    op(
      "The connections between fragments â€” cross-referencing things that seem unrelated until suddenly they aren't.",
      "SKILL_CONNECT",
      [
        n("You start keeping your own notes not about what each fragment says but about where the fragments speak to each other â€” the moments when a word used in one document changes meaning when read against another. Maren calls this the lateral method and says most people never find it on their own. She gives you more fragments and fewer explanations, and you begin to understand that she is testing the limits of the method rather than teaching you how it works."),
      ],
      null,
      { relationships: { maren: 6, serath: 5 } }  // "Most people never find it on their own" â€” Serath does this too; a shared frequency
    ),
    op(
      "The pace and rhythm of the original composition â€” you can almost hear the voice behind the fragments now.",
      "SKILL_VOICE",
      [
        n("This is the thing Maren says is hardest to teach: the sense that a document was written by a specific person, that it has a temperature and a rhythm and a weight, that the gaps in it are intentional and the repetitions are signals. You have this without being taught it. Maren does not say so directly. She rearranges what she assigns you, and the new assignments tell you everything about what she has concluded."),
      ],
      null,
      { relationships: { maren: 10 } }  // "Hardest to teach" and you have it without being taught â€” the rearranged assignments say it all
    ),
  ]),

  // â”€â”€ Week five â€” the air changes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nb(
    "The fifth week begins differently. Not dramatically â€” there is nothing you could point to and name. But the Archive has a particular quality of stillness that you have come to know well enough over four weeks to notice when it shifts, and in the fifth week it shifts. Maren arrives earlier than she used to. A door in the north corridor that was always open is now locked, and no one mentions it. Serath, who has never been chatty, becomes precisely and carefully quiet â€” the quietness of someone paying close attention to what they are and are not saying, and to whether anyone around them is doing the same.",
    BG.archive_interior, false
  ),

  n("You find him one evening in the fragment room, working later than he normally stays, the lamp burned lower than he would usually let it get before replacing the oil. He doesn't hear you come in. He is holding one of the smaller fragments â€” not reading it but looking at it, the way you look at an object when what matters is not the content but the thing itself. When he hears you, he sets it down with the deliberate naturalness of someone who has practiced the motion."),

  d("SERATH", "left", "thoughtful", "Has Maren mentioned the deep records to you?"),
  d("KAEL",   "right", "neutral",   "No. What are they?"),
  d("SERATH", "left", "neutral",    "A subsection of the Vraen collection. Older than the rest. They are not listed in the public catalog."),
  d("KAEL",   "right", "neutral",   "Why are you asking me?"),
  d("SERATH", "left", "neutral",    "I am not sure. Forget I asked. It is probably nothing."),

  n("You mention it to Maren the following morning. You frame it carefully â€” not as a report, just as something you were not sure was relevant. Her response is not what you expected. She does not look up from her work immediately. When she does look up, her face has the expression she almost never uses: the one that means she is fitting new information into a picture that already exists, and the picture is not improving."),

  d("MAREN", "left", "neutral", "When exactly did he say that?"),
  d("KAEL",  "right", "neutral", "Last evening. Ninth hour, maybe later."),
  d("MAREN", "left", "neutral", "What else?"),
  d("KAEL",  "right", "neutral", "Nothing. He said to forget it. Maren â€” what is happening?"),
  d("MAREN", "left", "neutral", "Do not discuss the fragments with anyone outside this room until I tell you otherwise. That includes Serath."),
  d("KAEL",  "right", "neutral", "You are not going to tell me why."),
  d("MAREN", "left", "neutral", "I need two days to think. Then I will tell you everything."),

  n("That was three days ago. She has not said anything more, and she has not looked like someone who finished thinking. Serath has not brought it up again either. His silences have taken on a different quality â€” the kind that comes from someone who has made a decision and is waiting to see if the world confirms it was the right one. The Archive continues its routine. The lamps burn at the same hours. The bell marks the same watches. But underneath all of it something has changed, the way the ground changes after a distant tremor â€” not visibly, not immediately, but in a way that the roots know before the trees do."),

  // â”€â”€ The night it burns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nb(
    "It is the last evening of the fifth week. The Archive is quieter than usual â€” several of the Seekers left for the city at midday on errands that Maren arranged, though you didn't know that at the time. The ones remaining are in their separate rooms, working in the particular silence of people who are not talking to each other. You are in the corridor outside the fragment room when Maren appears from the direction of the lower levels, moving faster than you have ever seen her move, and her face is doing the one thing it almost never does.",
    BG.archive_escape, true
  ),

  d("MAREN", "left", "urgent", "There is something I should have told you three weeks ago. I kept waiting for a better moment and there was notâ€”"),

  n("The bell rings."),

  n("Not the ordinary bell that marks the watches. A different one â€” lower, older, cast from different metal, hung in the Archive's original tower and last rung forty years ago during the second major disruption. You have read about it in the Archive's own history. You never thought you would hear it. The sound fills the corridor and the stone seems to hold it longer than it should, as if the building itself has been waiting for this sound and recognizes it."),

  d("MAREN", "left", "urgent", "Don't go back for anything. Follow me and stay close."),

  n("She is already moving. You follow. The Archive's corridor logic â€” which you have spent five weeks memorizing, which has become as familiar as a path you have walked every day of your life â€” now runs in reverse. You are going deeper, not toward the entrance, toward the older foundations. The smell of smoke arrives before the smoke does: first a suggestion, then a certainty. It is not an accidental fire. It is the precise smell of a fire that knows where it wants to go."),

  n("You pass the fragment room. The door is open. Inside: a lamp still burning, a chair pushed back, a manuscript left open at a particular page. Serath's manuscript. Serath is not there. He has not been there for some time â€” the lamp oil is far too low, the way lamps get when they have been burning unwatched for an hour or more. He was here and then he was not here, and whatever took him away from his work happened long before the bell rang."),

  d("KAEL",  "right", "fearful", "Serath's room â€” he isn'tâ€”"),
  d("MAREN", "left",  "urgent",  "I know. Keep moving."),

  n("Deeper now, through a passage you walked once during your first tour and have not been back to since â€” the original foundations, stone older and darker, the ceiling lower, the walls close enough on both sides that you can feel the cold coming off them. Maren produces a key and opens a door you had taken for a storage cupboard. Beyond it: stairs going down, and the smell of cold earth and sealed air, the smell of something that has not breathed for a long time."),

  d("MAREN", "left", "urgent", "There is a passage under the east foundation. It runs beneath the storage district to a building two hundred yards north of the city wall. I had it opened three weeks ago and stocked with what we might need. I should have told you it existed. I kept thinking there was more time."),
  d("KAEL",  "right", "fearful", "More time before what?"),
  d("MAREN", "left", "urgent",  "Before they decided the fragments were worth taking rather than simply watching."),

  n("She works the mechanism at the bottom of the stairs â€” a heavy door, stone and iron, fitted so precisely into the wall that the seam is invisible until you know it is there. It begins to open outward. Cold air pushes out from the darkness beyond, carrying the smell of damp stone and earth. And then you feel it. The door is resisting. Not the lock, not the mechanism itself, which is moving exactly as Maren intends. Something on the other side is pressing against the door. Not violently. Not trying to hold it shut. Just â€” present. A weight that was not there a moment ago. A weight that is aware the door is opening."),

  d("KAEL",  "right", "fearful", "Maren."),
  d("MAREN", "left",  "urgent",  "I hear it."),
  d("KAEL",  "right", "fearful", "There is something pushingâ€”"),
  d("MAREN", "left",  "urgent",  "I hear it. Step back from the door."),

  n("She stops working the mechanism. Turns to face you. Behind you, up the stairs, the smoke smell is thicker now and the bell has stopped ringing. The silence after the bell is worse than the bell was. It means whoever was ringing it is no longer able to. Maren looks at the door. She looks at you. She is thinking, and whatever she is computing, she reaches the end of it in the time it takes you to breathe twice. Her expression does not change. That is the most frightening thing of all â€” that she has already arrived somewhere with this, and she is not going to show you where."),

  d("MAREN", "left", "neutral", "Give me your lamp. And do not move until I say."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 1 â€” THE OTHER SIDE  (Week 1 gate)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The door swings fully open. In the amber light from your lamp, a figure resolves out of the darkness on the other side â€” someone who had been crouching at exactly the right height to press a shoulder against the door without making a sound, who straightens now with the careful ease of someone who has been holding a position for a long time. Ryn. One of the younger Seekers, first year, who you have spoken to maybe a dozen times in five weeks. She has been down here in the sealed dark for two hours. She looks completely composed.",
    BG.archive_escape, false,
    { id: 'a1_seg1', title: 'The Other Side', summary: 'Ryn was waiting in the passage. The Archive burns behind you. The road ahead begins.' }
  ),

  d("RYN",   "right", "neutral", "I knocked the wrong signal first. Three times, one extra beat. To see if anything on this side was listening before I used the real one."),
  d("MAREN", "left",  "neutral", "And?"),
  d("RYN",   "right", "neutral", "Something stopped pressing against the door about ten seconds after the last knock. It was there when I arrived. It stayed for a long time."),
  d("MAREN", "left",  "neutral", "How long."),
  d("RYN",   "right", "neutral", "Since I came down the stairs. Close to two hours."),

  n("Maren processes this in the way she processes everything â€” not visibly, but with an absolute internal stillness that means something is being organized and placed. She had known something might be on the other side of the door. She had not calculated that it would be patient enough to wait two hours without trying the door, without making a sound, without doing anything at all except being there. That distinction matters in a way you cannot yet articulate but can feel."),

  n("The passage is low and narrow and cold, the walls damp with the city's groundwater pressing in from above. Maren takes your lamp and leads. Ryn follows behind you. The passage runs straight for a long distance and then turns twice without warning, and then there are stairs going up, and a door at the top that opens into a darkness smelling of straw and old wood and the particular sweetness of stored grain beginning its slow process of decay."),

  d("RYN",   "right", "quiet", "Aldren's copying house. He left for the eastern settlements four days ago â€” legitimate work, pre-arranged. The building deed is clean. Technically empty until he returns."),
  d("KAEL",  "right", "neutral", "You knew about this place."),
  d("RYN",   "right", "quiet", "Maren told me six weeks ago to be ready. She told me where the building was and how to find the hatch from outside if I ever needed to use the passage from this direction. I have been ready since then."),
  d("KAEL",  "right", "neutral", "Six weeks ago."),
  d("RYN",   "right", "quiet", "She was specific about the timing. She said: probably not before your fifth week in the building. Be ready from the first."),

  n("You come up through the hatch into the storage building â€” long shelves of finished goods along the walls, a copying table in the center scattered with work in progress, the smell of ink and candle tallow over everything. There is a shutter on the north wall. Maren opens it. Through the gap, across two hundred yards of open paving: the Archive."),

  n("The Archive is burning. Not catastrophically, not in the sudden and total way that leaves nothing. But deliberately â€” the east wing bright with it, the upper windows showing light that has no business being there at this hour, smoke pouring from the roofline in a column that leans south with the wind. In the square below, people have stopped to watch. None of them are moving toward it. The fire has a quality that tells anyone with any instinct at all that this is not the kind of fire you approach."),

  d("MAREN", "left", "sad", "The Vraen room is in the east wing. Whoever planned this knew exactly where to start."),
  d("KAEL",  "right", "neutral", "The fragmentsâ€”"),
  d("MAREN", "left", "sad", "The originals that remained are gone, yes. I moved what I could three weeks ago â€” the ones I believed were most critical. What I left behind I could not take without making it obvious I was preparing for something."),
  d("KAEL",  "right", "neutral", "How many did you move?"),
  d("MAREN", "left", "neutral", "Fourteen. The fragments I believe contain the core of the method itself â€” not the commentary around it, not the history, but the actual practice. And the cipher that cross-references them. Without the cipher the fourteen fragments are incomplete. With it, they are enough to finish what was started."),

  // â”€â”€ How do you respond to this? â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ch("RESPOND_FIRE", [
    op(
      "Say nothing. Watch the fire. Some things, once lost, are simply lost.",
      "FIRE_SILENT",
      [
        n("The silence sits between you and Maren for a moment that feels longer than it is. Then she closes the shutter, carefully, and turns back to the room."),
        d("MAREN", "left", "neutral", "We grieve it later. Right now I need you thinking clearly."),
        n("You notice she said we. Not you."),
      ],
      null,
      { relationships: { maren: 6 } }  // Maren respects composure under loss
    ),
    op(
      "Ask about the other Seekers. Brek. The ones who were still in the building.",
      "FIRE_PEOPLE",
      [
        d("KAEL",  "right", "fearful", "The others â€” Brek, the others who were stillâ€”"),
        d("MAREN", "left",  "neutral", "Brek and the others who left for the city at midday are safe. They are out. I made sure they had legitimate reasons to be elsewhere today."),
        d("KAEL",  "right", "neutral", "You made sure."),
        d("MAREN", "left",  "neutral", "I have been planning for this possibility for three months. I made arrangements. Not all of them knew what the arrangements were for."),
        n("There is a weight to this that you cannot immediately name. Three months of quiet preparation, made without telling you, made without telling anyone except â€” it now seems â€” Ryn."),
      ],
      null,
      { relationships: { maren: 8, brek: 5 } }  // Asking after Brek means something to Maren
    ),
    op(
      "Ask about the building itself. The Unnamed Third. Whether any of it survived.",
      "FIRE_THIRD",
      [
        d("KAEL",  "right", "neutral", "The Unnamed Third â€” the records no one ever cataloguedâ€”"),
        d("MAREN", "left",  "neutral", "Were destroyed two hundred and sixty years ago. Whatever information survived the original disruption survived in the Vraen fragments â€” in the residue the original archivist left, the way a lost thing leaves its shape in what surrounds it. That residue is what is in the case on my back. The Unnamed Third was never the point. The method it described is."),
      ],
      null,
      { relationships: { maren: 3 } }  // Mission focus acknowledged, but less warmth
    ),
  ]),

  // â”€â”€ Task gate: search the copying house â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Investigation-style. The player examines the room before moving â€” Aldren's
  // records may contain things worth knowing. 2 tasks pulled from current week.
  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "The copying house holds more than Ryn's prepared pack. Records, correspondence, things Aldren left when he went east. The room knows things that might matter on the road. Three minutes â€” before the smoke in the square draws people toward this district.",
    continueNarrator: "You have seen what the room can offer. Ryn closes the shutter and does not open it again.",
  },

  d("RYN",  "right", "quiet",  "Serath wasn't at afternoon study today. I checked before I came down. He has been gone since noon."),
  d("MAREN", "left", "neutral", "I know."),
  d("KAEL",  "right", "neutral", "Did heâ€”"),
  d("MAREN", "left", "neutral", "I do not know. I have been trying to work out for three days whether he acted on his own or whether a decision was made for him. I cannot get there. I do not have enough information."),

  n("This is the most uncertainty you have heard in Maren's voice in five weeks of knowing her. She has been precise even when what she was precise about was a gap in her knowledge. The admission of something she genuinely cannot work out has a different quality from any other thing she has said to you, and it settles over the three of you in the storage building with more weight than the smoke still visible through the gap in the shutter."),

  n("Ryn moves to the copying table, lifts a cloth from a bundle there â€” a small travel pack, water and dry provisions and a change of clothing and a document case with a copying house seal on it. She has known where this was since the moment Maren placed it here. She passes the pack to you without ceremony, and there is something clarifying about the motion â€” its simplicity, its practical competence. Whatever is coming, you are not going into it with nothing."),

  n("The bird arrives so quietly you almost miss it. A small grey messenger-bird, landing on the window ledge above the shutter, looking at the room with the incurious patience of something that has completed a task and is now waiting for acknowledgment. Ryn brings it to Maren. Maren unrolls the message, reads it, and for a moment her face does the thing you have never seen it do before. Not fear exactly â€” something more specific. The expression of someone who hoped, very quietly, that they were wrong about something, and has just received confirmation that they were exactly right."),

  d("MAREN", "left", "neutral", "He already knows Sira isn't in the Archive. Sira left two weeks ago â€” she said she had something to follow up, a lead on something she'd been tracking for months. She wouldn't say more than that. That was fine then. It is not fine now."),
  d("KAEL",  "right", "surprised", "What does the message say?"),

  n("She passes it to you. The handwriting is Serath's."),
  n('"Follow this. She is not yet where they want her. You have time, but not much."'),

  d("RYN",  "right", "neutral",   "She who? Who is he talking about?"),
  d("KAEL", "right", "surprised", "I don't know. Marenâ€”"),
  d("MAREN", "left", "neutral",   "We cannot stay in this building. Pack what Ryn laid out. We leave through the rear before the square fills up with people. I will explain on the road."),

  n("You move. Ryn passes you what you need, and the routine of preparation â€” the simple physical task of it â€” is a relief after everything that has happened since the bell rang. Something to do with your hands while the part of your mind you are not currently using tries to work out what the note means, who she refers to, and how Serath knew to send it here. You cannot make it add up. You have too few of the pieces. What you have is a note in a familiar handwriting, and Maren's expression when she read it, and the knowledge that she has been planning for three months and this is still not going the way she planned."),

  n("Then Ryn goes still. She is at the north shutter, the one facing the square, and she has the focused stillness of someone who has just seen something that requires processing before speaking."),

  d("RYN",   "right", "quiet", "Someone is watching this building."),
  d("MAREN", "left",  "urgent", "Where."),
  d("RYN",   "right", "quiet", "East edge of the square. Between the grain merchant's sign and the wall. Has been standing there since we came up through the hatch. Not watching the fire. Watching this building."),

  n("You go to the shutter and look. The square is full of people drawn by the fire, faces turned toward the Archive. But Ryn is right. On the east edge, not watching the Archive at all â€” a figure in dark clothing, standing with the particular stillness of someone who has found the thing they were looking for and is now waiting to see what it does. Even at this distance there is something wrong about how still they are. It is not the stillness of cold, or uncertainty, or waiting for a street to clear. It is the stillness of patience. The kind that has already decided it has time."),

  d("KAEL",  "right", "fearful", "They know we're here."),
  d("MAREN", "left",  "neutral", "Then they already know where she is, or they don't know she exists, and either way your being here won't change it."),

  n("She says it quietly and almost to herself, and you understand it is not directed at you â€” she is working through something, finding the logical end of a calculation. Then she straightens and the calculation is complete."),

  // â”€â”€ Task gate: clear the route to the city gate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Escape-style. There are two watchers bracketing the exits now. The player's
  // real-world tasks represent the obstacles between here and the alley north.
  // 3 tasks pulled from current week.
  {
    type:             'task_gate',
    gateStyle:        'escape',
    taskSlots:        3,
    pauseNarrator:    "Two of them now â€” east edge and north corner. Not moving yet, but they have bracketed the obvious routes. The alley north exists. Getting through it cleanly before they close it is the problem.",
    continueNarrator: "The alley is clear. Nothing watching the rear. One window before the square fills. Move.",
  },

  d("MAREN", "left", "neutral", "Rear exit. There is an alley behind the building that runs north toward the lower gate. We go now, and we do not look back at the square, and we do not stop until we are through the gate. Follow Ryn â€” she knows the route."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 2 â€” THE ROAD OPENS  (Week 2 gate)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The rear exit is a low door half-hidden behind a stack of empty copying frames, and Ryn finds it without searching â€” she knows this building the way she knew the passage, the way she knew where every piece of the pack was. Outside: a narrow alley, the city's familiar smell replacing the smoke smell, the pre-dawn sky above the roofline already showing its first pale grey edge. They have been in the passage and the building for less than two hours. It feels longer. It always feels longer when the thing that was holding time in place is gone.",
    BG.storage_night, false,
    { id: 'a1_seg2', title: 'The Road Opens', summary: 'Through the city at dawn. The gate. The road east. Something follows you out of the city.' }
  ),

  n("The alley runs north and then east, threading through the storage district with its early-morning logic: carters beginning their runs, workers at the grain warehouses doing their count, the smell of horses and rope and flat stone. Nobody looks at the three of you. Three people moving through the pre-dawn storage district with travel packs is not remarkable here. This district is built for arriving and leaving, and both happen at hours when questions would slow things down too much to be worth asking."),

  d("MAREN", "left", "neutral", "Aldren knows the building may have been used. He does not know why. When he returns in ten days and finds the Archive gone, he will make the connection himself. He is that kind of person."),
  d("KAEL",  "right", "neutral", "You planned this six weeks before I arrived."),
  d("MAREN", "left", "neutral", "I began watching the signs eight months ago. Six months ago I decided the signs were serious. Three months ago I began preparing for specific outcomes. Ryn was the first person I brought into it."),
  d("KAEL",  "right", "neutral", "Why Ryn?"),
  d("MAREN", "left", "neutral", "Because she notices things without announcing that she has noticed them, and she follows instructions without needing to understand the reason behind them before she acts. Both of those qualities are difficult to find and very useful in situations like this one."),

  n("This is the moment when you begin to understand the full architecture of what Maren has been building. Not just the passage and the building and the packs â€” she has been constructing a network of contingencies for months, each piece designed to function even if another piece failed, each person knowing only what they needed to know. You have been one of those pieces. You understand this now, and you find that you are not resentful of it. The reason you are alive and out of that building is precisely because she built the pieces carefully and trusted them."),

  d("KAEL",  "right", "neutral", "You said they decided the fragments were worth taking rather than watching. Who are they?"),
  d("MAREN", "left",  "neutral", "People who understand what a complete preservation of the Vraen method would mean. People who have decided that the method should not be completed by the people currently closest to completing it."),
  d("KAEL",  "right", "neutral", "Meaning us."),
  d("MAREN", "left",  "neutral", "Meaning anyone who was in that building. Yes."),
  d("KAEL",  "right", "neutral", "And Serath sent us a warning."),
  d("MAREN", "left",  "neutral", "Serath sent you a warning. Which means he knows who you are and what you are in the Archive for. Which means someone told him. And the list of people who could have told him is very short."),

  n("She does not say the rest. She does not need to."),

  // â”€â”€ The city gate â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nb(
    "The lower gate is the oldest and smallest of the city's four exits â€” a single arch in the original wall, wide enough for two people abreast or one cart with careful navigation. It is used mostly by locals with early business and by travelers with reasons to avoid the main gate's logging procedure. The guard at this hour is supposed to be a single militia post, a formality. This morning there are two people at the gate. The second one arrived sometime in the past few hours. His coat is a shade different from standard militia issue, and his posture has the attention of someone who has been told what to look for.",
    BG.city_morning, false
  ),

  d("MAREN", "left", "quiet", "The second guard is not regular militia. Do not look at him directly. Stay behind me and let me handle the log."),

  n("The first guard waves you forward. Maren presents papers â€” travel documents, Aldren's seal, destination listed as the eastern settlements for copying work. The first guard fills in the log with the mechanical disinterest of someone doing their fourth routine task of a long early shift. Behind him, the second guard watches. He looks at each of you in sequence, and his gaze stops on you for a beat longer than it stops on the others."),

  d("SECOND_GUARD", "left", "neutral", "Scholars traveling before dawn."),
  d("MAREN",        "left", "neutral", "The settlement contact expects us by midday. Copying work does not wait for a reasonable hour."),
  d("SECOND_GUARD", "left", "neutral", "There has been an incident in the Archive district tonight. We are holding travelers at the gate until the district watch completes its assessment."),
  d("MAREN",        "left", "neutral", "How long is that likely to take?"),
  d("SECOND_GUARD", "left", "neutral", "Until it is complete."),

  // â”€â”€ Coin-gated gate choice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  ch("GATE_CHOICE", [
    op(
      "Wait. Your papers are clean. There is nothing here for him to question.",
      "GATE_WAIT",
      [
        n("You wait. The sky lightens from grey to pale yellow to the flat white of early morning. More travelers accumulate behind you and the first guard begins processing them one by one, methodical, bored. The second guard drifts to the far end of the arch to deal with a cart driver asking questions about the road ahead, and when he returns, you are at the front of the queue and there is no reason to re-examine what the first guard has already logged. He waves you through."),
        n("Forty minutes. Through the arch and into the empty road beyond, the city falling behind you."),
        d("MAREN", "left", "quiet", "Longer than I wanted. But clean."),
      ]
    ),
    op(
      "Step forward. Offer a traveler's courtesy â€” a consideration for the disrupted schedule. You have the coins for it.",
      "GATE_COIN",
      [
        n("You step around Maren before she can speak. From your coat you produce the consideration â€” not presented as a bribe, not with any of the visible anxiety of someone trying to buy something. Simply a folded note placed precisely on the gate ledger, in the space between the log and the first guard's pen. Not too much. The exact amount that says: this is a routine inconvenience and I am a routine traveler who understands that an early morning deserves acknowledgment."),
        n("The second guard looks at the note. He looks at you. You watch something shift in his assessment â€” not suspicion but recalibration. People who are running from something do not make eye contact. They do not offer considerations calmly. He has been told to look for panic, not for the particular confidence of someone who has already decided how this goes."),
        d("SECOND_GUARD", "left", "neutral", "The sweep is nearly complete. You can proceed. Safe road to the settlements."),
        n("He steps aside. You are through the arch before Maren can speak, the city already behind you, the road ahead opening up into the cold flat light of early morning."),
        d("MAREN", "left", "almost-smiling", "That was well done."),
        d("KAEL",  "right", "neutral", "I noticed you had already moved to speak."),
        d("MAREN", "left", "almost-smiling", "I had. I was slower."),
      ],
      { requires: { coins: 8 } },
      { relationships: { maren: 12 } }  // Maren explicitly says "well done" and admits she was slower
    ),
    op(
      "Let Ryn handle it â€” she has been prepared for exactly this kind of thing.",
      "GATE_RYN",
      [
        n("Ryn moves around you without any visible signal from Maren, and addresses the second guard with the specific energy of someone who has a legitimate complaint and has decided this is the appropriate moment to file it. It involves the settlement contact, the contracted delivery schedule, and the particular difficulty of explaining a gate delay to a client who specifically arranged an early appointment to avoid the main gate's morning queue. She does this at length and with exceptional precision."),
        n("The second guard, faced with a bureaucratic inconvenience that is technically his to own, takes the path of least resistance."),
        d("SECOND_GUARD", "left", "neutral", "Documents are noted. Through you go."),
        n("Through the arch. Maren glances at Ryn with an expression that is not quite approval because approval would imply surprise."),
      ],
      null,
      { relationships: { ryn: 10 } }  // Trusting Ryn's ability â€” she delivers; Maren's glance confirms it
    ),
  ]),

  // â”€â”€ The road east â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  nb(
    "The road east runs straight for the first mile out of the city, across flat ground that was farmland within living memory and is now the particular state of things that used to be farmed but aren't anymore â€” old field lines still visible in the overgrown grass, hedgerows grown past any practical use, stone markers standing at intervals with nothing left to mark. The city recedes behind you. The sky ahead is the pale, uncommitted white of early morning before the sun has decided what kind of day to make of it. Maren sets a pace that is faster than comfortable walking without being obviously urgent â€” the pace of people with a destination and a reason and no intention of explaining either.",
    BG.cold_field, false
  ),

  n("After a mile, she speaks."),

  d("MAREN", "left", "thoughtful", "The Vraen fragments describe a method of preservation that is not a metaphor. The person who composed them â€” we have called them the Original Archivist for two hundred years, though that may not be accurate â€” had achieved something that the fragments explain how to replicate. Complete internal retention. A full body of knowledge held in the mind without distortion, without erosion, across years and decades. Not summaries. Not impressions. The thing itself, held exactly as it was given. The fragments are the instruction set for how this is done. The Archive was built to house that instruction set and to produce people capable of following it."),
  d("KAEL",  "right", "neutral", "That is what we have been doing. Learning the early stages of the method."),
  d("MAREN", "left", "neutral", "Yes. What the people who burned the Archive are looking for is not the paper. Paper can be copied. Paper can be scattered across a dozen locations and become impossible to fully destroy. They are looking for someone who has already completed the method. Someone who carries what the fragments describe in the only place it cannot be taken from them."),

  n("She touches the side of her head. A precise, brief gesture."),

  d("MAREN", "left", "neutral", "A person who has completed the method carries something that cannot be burned, cannot be seized, cannot be lost in any disruption of any building or institution. It exists only here. And the people who set fire to the Archive last night have decided that having that person â€” having what they carry â€” is worth more than any quantity of paper."),
  d("KAEL",  "right", "neutral", "Is there someone who has completed it?"),
  d("MAREN", "left", "neutral", "That is the question I have been working on for nineteen years. And it is the question Serath's note is connected to. Your sibling left the Archive two weeks ago and said she had a lead on something she'd been tracking for months. She wouldn't say more. I let her go because I thought the timing was coincidental. It was not."),

  // â”€â”€ Task gate: understanding what you're carrying before the road turns dangerous â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Three days of road ahead. What you're carrying â€” the method, the fragments, what Maren just told you â€” has to be understood precisely before the next decision comes. No approximation will survive what's east of here.",
    continueNarrator: "You have examined it. You know what is in the case and why it matters. The road continues east.",
  },

  n("The road curves around a stand of bare trees and the city disappears behind you. Ahead the road runs toward the eastern hills, pale grey in the distance, the kind of distance that looks manageable until you are actually walking it. The cold has settled in properly now that the sun has failed to do anything about it. Your breath is visible. The ground on either side of the road is hard with the last of the season's frost."),

  n("Ryn slows almost imperceptibly. Then resumes her pace. Then glances at Maren without turning her head."),

  d("RYN",   "right", "quiet",   "We have had a tail since the first field marker. Staying at distance. Not closing."),
  d("MAREN", "left",  "neutral", "I know."),
  d("KAEL",  "right", "neutral", "Since the gate?"),
  d("MAREN", "left",  "neutral", "Since before the gate. Do not change your pace. Do not look back."),

  n("The road ahead is empty and long and cold. The hills have not gotten any closer. Behind you, at a distance that could be casual coincidence if you did not already know it was not, something has been pacing you since before you left the city â€” patient, unhurried, not trying to close the distance, as though the distance itself is exactly where it wants to be. In the document case on Maren's back: fourteen fragments. On the road: a question about someone who completed a method that others have now decided is worth burning a building for. In the tree line thirty yards back: a presence that knows where you are and has known since before the gate."),

  n("You walk. The morning fails to warm. The road bends once around a shallow rise and for a moment the tree line is very close on the left side and the view ahead opens up and then closes again as the road straightens. And in that moment â€” from somewhere in the trees, at a distance that is not far, in a voice that is low and unhurried and completely composed â€” something speaks."),

  n("It says your name."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 3 â€” THE VOICE ON THE ROAD  (Week 3 gate)
  // Dorath steps out of the trees. Maren's contact. Seven years outside the Archive.
  // The safe house. The symbol carved into the wall.
  // Cliffhanger: Maren's face when she sees where the symbol came from.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "You stop. In the moment of stopping, the road ahead contracts to detail: the grey morning light, the frost on the dead grass to either side, the hills that have been there since the first mile. The tree line is thirty yards to your left. The voice came from deep enough in that the source is not visible. What is visible: nothing. No movement. The voice has said your name and is now waiting.",
    BG.cold_field, false,
    { id: 'a1_seg3', title: 'The Voice on the Road', summary: 'The voice in the trees belongs to Dorath. And Maren already knows her.' }
  ),

  d("MAREN", "left", "neutral", "Don't reach for anything. Stand where you are and face the trees."),
  d("KAEL",  "right", "neutral", "You know whose voice that is."),
  d("MAREN", "left", "neutral", "Mmm. I was not expecting her this soon."),

  n("A figure separates from the tree line â€” not emerging from between the trees but appearing from behind one of the larger trunks, where she had been standing so still that the grey of her coat was simply another part of the bark. She walks toward you at the pace of someone covering ground they have already decided to cross. Not young, not old â€” the kind of face that has spent a long time outdoors and stopped caring about what weather does to it. She looks at Maren first. Then at Ryn. Then at you with the specific attention of someone confirming a description against the real thing."),

  d("DORATH", "left", "neutral", "The bird got here faster than I expected."),
  d("MAREN",  "left", "neutral", "Which means you were closer than I expected."),
  d("DORATH", "left", "neutral", "I've been in this district three weeks. I watched the fire from the second rise."),
  d("KAEL",   "right", "neutral", "You watched the fire."),
  d("DORATH", "left", "neutral", "From a distance. The smoke column was visible well before dawn. I came as close as I thought was useful. Foot traffic in the storage district changes when something large is happening two blocks away. You came out of the right building at the right time."),
  d("MAREN",  "left", "neutral", "Aldren's copying house. You confirmed the exit."),
  d("DORATH", "left", "neutral", "I was watching the second guard at the lower gate when you went through. I stayed back. You were being followed â€” I needed to know if the tail was alone."),
  d("KAEL",   "right", "neutral", "Was it?"),
  d("DORATH", "left", "neutral", "Yes. One person. They stopped at the first field marker and turned back toward the city."),

  n("She says this as though it is a detail she has been holding until the right moment, and this is the right moment. She gestures northeast, off the road, toward a gap in the hedgerow where a track â€” barely visible, the kind that gets used twice a year â€” runs across the old field."),

  d("DORATH", "left", "neutral", "There's a place. Quarter mile off the road. I stocked it two weeks ago. We should not stay on this road."),

  ch("DORATH_RESPONSE", [
    op(
      "Say nothing. Follow Maren. You don't know this woman yet.",
      "DORATH_SILENT",
      [
        n("The decision to hold your questions is not distrust â€” it is the instinct of someone who has learned, in the past twelve hours, that information costs something. You follow Maren through the gap in the hedgerow. Behind you, Dorath falls into step with the precision of someone who has done this before and knows exactly how close to walk to the person in front."),
      ],
      null,
      { relationships: { maren: 5, dorath: 3 } }  // Patience under uncertainty; Dorath notes the restraint
    ),
    op(
      "Ask how she knows your name. Maren gave her a description. But she said the name.",
      "DORATH_NAME",
      [
        d("KAEL",   "right", "neutral", "You said my name. Not a description. My name. How?"),
        d("DORATH", "left",  "neutral", "Maren included it in her last communication."),
        d("KAEL",   "right", "neutral", "When was that?"),
        d("DORATH", "left",  "neutral", "Twelve days ago."),
        n("Twelve days ago. While you were still at the Archive â€” studying, working, the last weeks of the fifth week â€” Maren was already planning what would happen if it all burned. The distance between what you knew and what she was doing, measured in days, is twelve."),
      ],
      null,
      { relationships: { dorath: 7 } }  // Direct question, direct answer â€” Dorath respects precision
    ),
    op(
      "Ask Maren directly: who is she, and how long have you known her?",
      "DORATH_WHO",
      [
        d("KAEL",  "right", "neutral", "Maren. Who is she?"),
        d("MAREN", "left",  "neutral", "Her name is Dorath. She has been doing work outside the Archive for seven years â€” the kind of work the Archive cannot officially acknowledge. We have corresponded irregularly. When I began preparing, she was the first person I contacted."),
        d("KAEL",  "right", "neutral", "Before me."),
        d("MAREN", "left",  "neutral", "She was contacted six months before you arrived at the Archive."),
      ],
      null,
      { relationships: { maren: -4, dorath: 4 } }  // Bypasses Dorath to ask Maren; shows slight distrust of strangers
    ),
  ]),

  nb(
    "The track across the old field leads to a stone outbuilding â€” originally farm storage, old enough that the stone has settled into itself with the permanence of landscape. The door is heavy and fits its frame with the precision of something recently re-hung. Inside: a small space, swept clean, a low table, three crates as seats, two lamps on iron hooks, a supply of oil, dry provisions on a shelf. Dorath stocked it without haste. The lamps are already burning when you enter.",
    BG.safe_house, false
  ),

  d("DORATH", "left", "neutral", "I'll tell you what I know. You tell me what you know. Then we decide what to do with it."),
  d("MAREN",  "left", "neutral", "The name Voss."),
  d("DORATH", "left", "thoughtful", "Mmm."),

  n("A pause. She sits â€” the first time you have seen her sit. She looks more tired sitting than standing."),

  d("DORATH", "left", "thoughtful", "Voss isn't a person. I mean that precisely â€” there may be a person who goes by it, but Voss is a decision made under a name. The decision was made at least four years ago. Possibly longer. It involves several people and at least two institutions that I have identified, plus some number I have not."),
  d("MAREN",  "left", "neutral", "The Archive specifically."),
  d("DORATH", "left", "neutral", "From the beginning. Whatever Voss decided to do, the Archive was part of the calculation from the beginning. Not the building â€” the method. The Vraen method specifically. Whoever made the decision under that name understood what it would mean for someone to complete it."),
  d("KAEL",   "right", "neutral", "And decided to prevent that."),
  d("DORATH", "left", "neutral", "Or decided to control who completes it and what they do with it afterward. I cannot yet distinguish between those two possibilities. One means destruction. The other means capture."),

  n("The word sits in the room with the particular weight of words that have been considered for a long time before being said. Ryn, standing near the door, does not visibly react. She is doing the thing she does â€” receiving information and holding it somewhere before deciding what it means."),

  d("MAREN",  "left", "neutral", "The fourteen fragments. I have the core of the method and the cipher. In the case. Can you get us to the eastern road safely?"),
  d("DORATH", "left", "neutral", "Two days, if the weather holds. I know a route."),
  d("MAREN",  "left", "neutral", "Good."),
  d("KAEL",   "right", "neutral", "Where are we going?"),
  d("MAREN",  "left", "neutral", "Somewhere we can stop running and actually open the case. We need to begin working with what we have, not just carrying it."),

  n("Somewhere to open the case. It is the first time since the bell rang that forward has felt like a direction rather than just the opposite of back. You settle in. Ryn distributes provisions without ceremony. Dorath checks the door, then the track through the shutter, then sits again. The lamps burn steady."),

  n("Ryn is the one who finds it. She is not searching â€” she is moving through the space with the attention she gives to unfamiliar rooms, looking at what is there without deciding in advance what matters. Her hand trails along the interior wall, feeling the texture of old stone. And then it stops."),

  d("RYN",   "right", "quiet", "Maren."),

  n("Just the name. Said with the care of someone who has already decided how much alarm to put in their voice, and has chosen exactly none."),

  d("MAREN", "left", "neutral", "What."),
  d("RYN",   "right", "quiet", "This symbol. In the stone. I've seen it before."),

  n("Maren comes to look. Dorath comes to look. The symbol is carved into the stone a hand's-width below waist height â€” not prominently, not as a mark meant to be found easily, but as the mark of someone who was in this building long enough to want to leave something in it. A small thing: two interlocking lines that form an enclosed shape without quite closing. You recognize the composition. It is the notation the original archivist used in the deep records. The ones that were not listed in the public catalog. The ones Serath was studying the evening he asked you about them."),

  d("KAEL",  "right", "surprised", "That's from the Archive. The deep records."),
  d("MAREN", "left",  "neutral", "Yes."),
  d("KAEL",  "right", "surprised", "How is it on this wall?"),

  n("She does not answer immediately. She is looking at the symbol with the expression she uses when she is computing something she hoped would not need computing. Dorath, standing behind her, has gone very still."),

  d("MAREN",  "left", "neutral", "Dorath. How long have you had this place?"),
  d("DORATH", "left", "neutral", "I inherited it. Seven years ago. From the person who first contacted me about the Archive."),

  n("She does not say more. Maren does not ask. The symbol in the stone is older than seven years â€” the weathering of the carving is different from the rest of the surface, which means it was made when the stone was younger, before Dorath's time, before her contact's time. Someone who knew the deep records' notation was in this building before any of them. Someone connected to the Archive in a way the Archive's own catalog does not record. Maren's expression does not change. But something behind it has arrived somewhere she was hoping not to arrive."),

  // â”€â”€ Task gate: the symbol requires investigation before Maren will speak â”€
  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Maren will not speak until she has worked through what the symbol means. She says: there are things that need to be established before she can say it out loud. The night is long.",
    continueNarrator: "Morning. Maren has been at the table since before the lamps went low. She sets down the pen and turns to face you.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 4 â€” DORATH  (Week 4 gate)
  // What the symbol means. Dorath's contact. The first real disagreement.
  // Cliffhanger: someone on the road that Dorath recognizes and shouldn't.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "Morning. The lamps have been burning all night â€” Dorath took the first watch, Ryn the second, you the third without being asked. The safe house feels different in daylight. The stone walls show their age more clearly: repaired in several places, old smoke staining above the lamp hooks, the grain of the wood in the shelves worn down by decades of use. Whatever it was used for before Dorath inherited it, it was used regularly and for a long time.",
    BG.safe_house, false,
    { id: 'a1_seg4', title: 'Dorath', summary: "The symbol's origin. A contact who was connected to both the Archive and this place. And then the safe house is safe no longer." }
  ),

  n("Dorath tells it in the morning, while Maren works with the fourteen fragments at the table â€” not reading them, just confirming they are all present and undamaged, touching each one briefly as though that is itself a kind of counting."),

  d("DORATH", "left", "thoughtful", "The person who gave me this place was named Eran. I met him twelve years ago. He was traveling through the eastern settlements and I was doing similar work â€” independently, no connection then. He knew things about the Archive that were not in any record I had seen. We worked together for three years before he died."),
  d("KAEL",   "right", "neutral", "What things?"),
  d("DORATH", "left", "neutral", "About the Unnamed Third. Specifically: that it was not destroyed. That the destruction was recorded, officially, but that what happened to it was different. Eran believed it was hidden rather than burned. That the notation in the public records described the result correctly â€” the collection was no longer accessible â€” but that 'no longer accessible' and 'destroyed' are two different conditions."),
  d("MAREN",  "left", "thoughtful", "You told me this three years ago. I told you then that the evidence was insufficient."),
  d("DORATH", "left", "neutral", "You told me the evidence was insufficient. You are right that what I had then was insufficient. What I have now is different."),
  d("KAEL",   "right", "neutral", "The symbol."),
  d("DORATH", "left", "neutral", "The symbol is the notation Eran used. He told me it was from an older system â€” something he learned from the fragments he'd spent years tracing outside the Archive's formal collections. He never showed me the source. He said the source would be meaningful only to someone who had already worked through the Vraen material. He said when the right person saw it, they would know what it meant."),

  n("Maren has stopped counting fragments. She is listening now in the way she listens when she is not only collecting information but cross-referencing it against something that already exists in her."),

  d("MAREN",  "left", "thoughtful", "How long ago did he put it there."),
  d("DORATH", "left", "neutral", "I don't know. He had the building before he met me. It could have been any time in the years he used it."),
  d("MAREN",  "left", "neutral", "Hmm. Then it is not a recent placement. Someone connected to the deep records was in this building long before the current situation."),
  d("KAEL",   "right", "neutral", "Is that possible? Someone that connected to the Archive, working outside it, over that span of timeâ€”"),
  d("MAREN",  "left", "neutral", "It is not only possible. It is, I think, exactly what the deep records describe. A network. Not an institution. Not a building. People."),

  ch("SYMBOL_RESPONSE", [
    op(
      "Ask what the symbol actually means â€” its specific content, not its origin.",
      "SYMBOL_CONTENT",
      [
        d("KAEL",   "right", "neutral", "The symbol itself â€” what does it mean? Not where it came from. What it says."),
        d("MAREN",  "left",  "thoughtful", "In the deep records it marks a boundary. The notation indicates a transition â€” from one stage of the method to the next. It is the mark you leave when you have completed one practice completely and are ready for what comes after."),
        d("KAEL",   "right", "surprised", "It's a progress marker."),
        d("MAREN",  "left",  "neutral", "Among other things. In context: it means whoever left it had already completed the first stage of the Vraen method. And had done it here, in this room, at some point before any of us existed."),
        n("The weight of that lands differently than expected. Not abstract. Physical: someone sat in this room and did the thing you have been learning to approach, and left a mark of it in the stone."),
      ],
      null,
      { relationships: { maren: 7 } }  // Pushing to the meaning â€” her favorite kind of question
    ),
    op(
      "Ask Dorath what Eran found â€” what specifically made him believe the Unnamed Third survived.",
      "ERAN_EVIDENCE",
      [
        d("KAEL",   "right", "neutral", "What did Eran actually find? What convinced him?"),
        d("DORATH", "left",  "neutral", "Documents. Correspondence between the Archive administrators at the time of the 'destruction' â€” letters that referenced the collection's relocation, not its burning. The burning was real. But what burned was a decoy catalog. The actual collection was moved before anyone came for it."),
        d("MAREN",  "left",  "neutral", "Where are those documents now?"),
        d("DORATH", "left",  "neutral", "I have copies. The originals Eran hid. I can take you to the copies when we reach the eastern road."),
        d("MAREN",  "left",  "neutral", "That changes the sequence of what we need to do. The cipher opens the fourteen fragments, but if Eran's documents contain what I think they might containâ€”"),
        d("DORATH", "left",  "neutral", "You want to see them before you open the cipher."),
        d("MAREN",  "left",  "neutral", "I want to see them before I decide what order to open things in. Yes."),
      ],
      null,
      { relationships: { dorath: 8, maren: 4 } }  // Engaging Dorath's knowledge; outcome changes Maren's plan in a way she values
    ),
    op(
      "Tell Maren directly: this changes your plan. Ask what she is going to do about it.",
      "MAREN_PLAN",
      [
        d("KAEL",  "right", "neutral", "Maren. This is not what you planned for. What does it change?"),
        d("MAREN", "left",  "neutral", "Mmm. Several things, possibly. Give me an hour."),
        d("KAEL",  "right", "neutral", "We have time toâ€”"),
        d("MAREN", "left",  "neutral", "Yes. We have time. The plan was always going to need revision once we had more information. This is information. Give me an hour."),
        n("She goes back to the fragments. The hour she asks for takes two, but when she speaks again her voice has the precision of someone who has finished thinking."),
      ],
      null,
      { relationships: { maren: -3, dorath: 3 } }  // Pressing Maren on plan revision; slight friction; Dorath appreciates pragmatism
    ),
  ]),

  n("The disagreement comes in the afternoon. Dorath believes the fastest route east passes through the settlement network she has been using for years â€” unofficial stops, people who know her, places that are clean. Maren believes going near any network Dorath has used creates a surface that can be traced, and that the right move is the harder road that nobody else knows Dorath would choose."),

  dn("DORATH", "left", "neutral", "My network has been intact for seven years. Eran built it before me and it was intact before that. No one in it knows your name or your situation."),
  dn("MAREN",  "left", "neutral", "No one in it knows my name yet. But what burned last night was known to very few people, and someone knew it well enough to time it precisely. That someone has resources. And they are not spending those resources searching the main roads alone."),
  dn("DORATH", "left", "neutral", "If I thought your caution was wrong I would say so. It is not wrong. But caution has a cost too. The slower route adds three days. Three days on the road in the open is not caution. It is a different kind of risk."),
  dn("MAREN",  "left", "neutral", "I know. I am not saying your route is safe. I am saying it is more visible than the road no one expects us to take."),

  n("Ryn, who has been sitting quietly in the corner during this exchange, does not offer an opinion. You understand why â€” this is not a disagreement that more information resolves. Both of them are right about different things. The choice is not between right and wrong but between two different kinds of wrong, and the person who has to make the call is Maren, and Maren knows it, and is already making it."),

  d("MAREN",  "left", "neutral", "We take the middle path. Not Dorath's network, not the open road. You know the route through the river valley?"),
  d("DORATH", "left", "neutral", "I know it."),
  d("MAREN",  "left", "neutral", "Two extra days instead of three. We lose the network's safety and we lose the road's speed but we keep something neither offers: no one who knows either of us knows we would go that way."),
  d("DORATH", "left", "neutral", "Mmm. That works."),

  n("It is the most agreement you have seen between them, which means it is probably the right call."),

  n("The following morning, before they break camp, Dorath does her usual check of the track through the north shutter. She does it the same way each time â€” three looks, each at a different distance: the near ground, the middle distance, the far line where the track meets the hedgerow. She does the third look and then does it again. Her posture does not change. But she does not speak for longer than is usual."),

  d("DORATH", "left", "quiet", "Maren."),
  d("MAREN",  "left", "neutral", "I see it."),
  d("KAEL",   "right", "neutral", "What?"),
  d("DORATH", "left", "quiet", "On the road, at the hedgerow gap. There is a person there who was not there twenty minutes ago."),
  d("KAEL",   "right", "neutral", "Someone following us?"),
  d("DORATH", "left", "quiet", "No. Someone who was already there and is now watching the track entrance."),
  d("KAEL",   "right", "neutral", "Do you recognize them?"),

  n("A pause that is one beat too long."),

  d("DORATH", "left", "quiet", "Yes."),
  d("MAREN",  "left", "neutral", "Dorath."),
  d("DORATH", "left", "quiet", "Someone from Eran's network. Someone who has not been active in two years. Someone I had concluded was no longerâ€”"),

  n("She stops. Recalibrates."),

  d("DORATH", "left", "neutral", "We need to leave. Now, through the rear. And we do not take the river valley route. We take the open road and we move fast."),
  d("MAREN",  "left", "neutral", "That contradicts everything we just agreed on."),
  d("DORATH", "left", "urgent", "I know. Leave through the rear. I'll explain on the road. We need to be gone from here before that person looks closer at this building."),

  // â”€â”€ Task gate: the rear exit requires everything to be in order â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'escape',
    taskSlots:        3,
    pauseNarrator:    "The rear exit. Packs on. Three things need to happen before the window closes â€” correctly, in the right order â€” before the track north becomes a track that cannot be left without being seen.",
    continueNarrator: "Through the rear. The safe house is behind you. The track north is clear and they are already moving.",
    enemyName:        "Eran's Contact",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 5 â€” WHAT THE CIPHER SAYS  (Week 5 gate)
  // The cipher opened for the first time. The first instruction of the method.
  // The fourteenth fragment doesn't fit â€” it was placed by someone else.
  // Cliffhanger: who placed it, and when.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The open road is harder than any route Dorath's network would have offered. The weather does not help â€” a grey drizzle that is not quite rain but is cold enough to accumulate over hours into a chill that settles in the shoulders and stays there. They move fast and talk little, Dorath at the front reading the road, Maren behind her with the document case, Ryn at the rear. You walk in the middle and think about the symbol in the safe house wall and what Maren said about what it means.",
    BG.cold_field, false,
    { id: 'a1_seg5', title: 'What the Cipher Says', summary: 'Maren opens the cipher and the fourteen fragments for the first time. And then something is wrong with the fourteenth.' }
  ),

  n("Dorath does not explain until midday, when they stop at a disused waystation â€” a single room, no lock on the door, a firepit that has been used within the last week. She crouches by the firepit while Ryn checks the windows."),

  d("DORATH", "left", "thoughtful", "The person at the hedgerow â€” her name is Tal. She was part of Eran's network before she was part of mine. She went quiet two years ago. I sent messages. Nothing came back. I assumed she had moved, or worse."),
  d("MAREN",  "left", "neutral", "But she is here. In this district. Watching the track to Eran's building."),
  d("DORATH", "left", "neutral", "Watching the track, yes. The question is whether she is watching it for the same reason I would watch it â€” because she knows the building might be in use â€” or whether she is watching it for someone else."),
  d("KAEL",   "right", "neutral", "Is there a way to know which?"),
  d("DORATH", "left", "neutral", "Not without contact. And contact with someone who may be working for Voss creates a different kind of problem. So for now we treat her as a potential risk and we do not go anywhere near Eran's network."),
  d("MAREN",  "left", "neutral", "Which means Eran's documents wait."),
  d("DORATH", "left", "neutral", "Eran's documents wait. I'm sorry. I know what that costs."),
  d("MAREN",  "left", "neutral", "It costs us the shortcut. We still have the fourteen fragments. We still have the cipher. We open those here."),

  n("Ryn comes back from the windows. Clean. Dorath starts a small fire in the pit â€” dry wood, low smoke. Maren opens the document case and for the first time since the Archive you see what she moved in three weeks of quiet preparation. Fourteen pieces, each wrapped separately in oilcloth, each labeled in Maren's precise hand. She unwraps them carefully, one by one, and lays them on the cleanest part of the floor. Then she unwraps the cipher â€” a longer piece, densely marked, the key that makes the fragments readable as a system rather than fourteen separate documents."),

  n("She works for nearly two hours in silence. You and Ryn take turns watching the road. Dorath sleeps, briefly, the practiced sleep of someone who has learned to rest when they have the chance. The fire burns low and Maren does not look up to replace the wood. When she finally sits back, the light has shifted to late afternoon."),

  d("MAREN", "left", "thoughtful", "The first instruction in the Vraen method is not what I expected."),
  d("KAEL",  "right", "neutral", "What did you expect?"),
  d("MAREN", "left", "thoughtful", "Technique. Procedure. A practice to begin with. What it says instead â€” the first instruction â€” is a question. It asks: what do you know, and do you know it exactly? Not approximately. Not in summary. The thing itself, as precisely as it was given to you."),
  d("KAEL",  "right", "neutral", "And if you don't?"),
  d("MAREN", "left", "neutral", "Then you go back and learn it exactly. The method does not build on approximation. It builds on precision. The fragments spend the first several sections on this single point before offering any practice: before you can hold something without losing it, you must know what it is you are trying to hold."),

  ch("CIPHER_RESPONSE", [
    op(
      "Ask what it means for what you've already been doing at the Archive. Were you doing it right?",
      "CIPHER_PRACTICE",
      [
        d("KAEL",  "right", "neutral", "The things I was learning at the Archive â€” the cross-references, the fragments themselves. Was I doing what the method requires?"),
        d("MAREN", "left",  "thoughtful", "Some of it. The parts that involve looking at what you know and verifying it exactly â€” you were doing those. The other parts require a specific practice the fragments describe in detail. We haven't reached those yet."),
        d("KAEL",  "right", "neutral", "But we've been working toward them."),
        d("MAREN", "left",  "neutral", "Yes. The weeks at the Archive were not wasted. They were the preparation the method requires before the practice can begin. You cannot skip ahead. The fragments are quite clear on this."),
      ],
      null,
      { relationships: { maren: 6 } }  // Checking your own work â€” Maren respects self-assessment
    ),
    op(
      "Ask about the original archivist â€” does the cipher tell you anything more about who wrote it?",
      "CIPHER_AUTHOR",
      [
        d("KAEL",  "right", "neutral", "Does the cipher say anything about who wrote it? The original archivist?"),
        d("MAREN", "left",  "thoughtful", "Not a name. But the cipher uses first person in places â€” 'I found,' 'when I had completed,' 'the thing I was attempting.' It is instruction from someone who did it. Not theory. Experience written down."),
        d("KAEL",  "right", "neutral", "So they completed the method."),
        d("MAREN", "left",  "neutral", "They completed the method. And then they spent considerable time and effort writing down exactly how they did it, so that others could follow. That is the Archive. That is what the Archive was for. Not preservation of the paper. Production of people who could do what the paper describes."),
      ],
      null,
      { relationships: { maren: 5 } }  // Curiosity about the Archive's purpose â€” she finds this the right question
    ),
    op(
      "Say you want to try it. The first practice the fragments describe â€” now, here.",
      "CIPHER_TRY",
      [
        d("KAEL",  "right", "neutral", "Tell me what the first practice is. I want to try it."),
        d("MAREN", "left",  "thoughtful", "The first practice is exactly what the first instruction describes. Take something you have learned. Hold it in your mind. Then ask: is this precise, or is it a summary of the precise thing?"),
        d("KAEL",  "right", "neutral", "And if it's a summary?"),
        d("MAREN", "left",  "neutral", "Then you go back to the source of the learning â€” in memory, in the original material, wherever â€” and you do it again until what you have is the thing itself. The fragments say this is harder than it sounds and takes longer than expected. They say most people are surprised by how approximate their knowledge is before they do this."),
        n("You sit with that for a moment. Then you try it. You take something you know from the Archive â€” the structure of one of the fragments you spent the most time with â€” and you hold it, and you ask: is this the thing, or is this my memory of the shape of the thing?"),
        n("The answer arrives before you expected it, and it is not the answer you were hoping for."),
      ],
      null,
      { relationships: { maren: 9 } }  // Eagerness to begin the actual practice â€” this is what she's been hoping for
    ),
  ]),

  n("Maren sets the cipher down and begins re-examining the fourteen fragments in sequence. You watch her work. She goes through eleven of them quickly â€” confirming, cross-referencing â€” and then she slows on the twelfth. Picks up the thirteenth and moves between the two. Picks up the fourteenth and holds it next to the cipher."),

  d("MAREN", "left", "neutral", "Dorath."),
  d("DORATH", "left", "neutral", "Mmm."),
  d("MAREN", "left", "neutral", "Wake up. I need you to look at something."),

  n("Dorath opens her eyes, not bleary â€” she was not fully asleep."),

  d("MAREN",  "left", "thoughtful", "I moved thirteen fragments. I know precisely which ones and why â€” I have a list in my own hand from three weeks before the fire. I cross-referenced the list against what is here. There are fourteen fragments in this case."),
  d("DORATH", "left", "neutral", "You moved fourteen."),
  d("MAREN",  "left", "neutral", "I moved thirteen. This oneâ€”"),

  n("She holds up the fourteenth fragment. It is the same size and type as the others, wrapped the same way. But the label on the oilcloth is not her handwriting."),

  d("MAREN",  "left", "neutral", "Someone added this to the case after I had already packed it. The case was in my room for three weeks. I checked the seal each night. The seal was intact each morning. Whoever placed this did it on the last night, after I last checked and before I picked the case up when the bell rang."),
  d("KAEL",   "right", "surprised", "Who had access to your room?"),
  d("MAREN",  "left", "neutral", "Everyone in the Archive. The rooms do not lock from the inside. They never have â€” the Archive's founders believed that nothing worth keeping should need to be hidden from the people working alongside you."),
  d("KAEL",   "right", "neutral", "That seems like it was wrong."),
  d("MAREN",  "left", "neutral", "Hindsight, yes. At the time, it was a philosophy. The question now is not whether the philosophy was wrong. The question is who placed this fragment here and what it contains."),

  n("She looks at it for a long time. The notation at the top is the same system as the others, but the hand is different. Not dramatically â€” close enough that you would not have noticed without comparison. But not Maren's. Someone who knew the Vraen notation. Someone who was in the Archive. Someone who had a fragment Maren didn't know existed, and decided, on the last night, to make sure it left the building."),

  d("KAEL",  "right", "surprised", "Can you read it?"),
  d("MAREN", "left",  "neutral", "Yes. I can read it."),
  d("KAEL",  "right", "neutral", "What does it say?"),
  d("MAREN", "left",  "neutral", "It is the fourteenth instruction. The stage of the method that comes after everything else the other thirteen describe. The original archivist wrote thirteen fragments. Someone wrote the fourteenth to complete the sequence."),
  d("KAEL",  "right", "surprised", "Who?"),

  n("She sets it down on the floor with the others. Twelve labeled in her hand. One in a different hand. She stares at all fourteen the way she stared at the door in the passage â€” computing, arriving somewhere, deciding whether to show you where."),

  d("MAREN", "left", "neutral", "I don't know. Not yet. But whoever it was â€” they knew what the method required. They knew what was missing from the original thirteen. And they were in the Archive in the past three weeks."),

  // â”€â”€ Task gate: the fourteenth fragment demands verification before moving â”€
  {
    type:             'task_gate',
    gateStyle:        'search',
    taskSlots:        2,
    pauseNarrator:    "Fourteen fragments. Thirteen in Maren's hand. One in a different hand. Before the next stage of the method can begin, the unknown fragment has to be cross-referenced against everything the group carries.",
    continueNarrator: "The cross-reference is complete. What the fourteenth describes matches the sequence. The method can proceed.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 6 â€” THE FIRST PRACTICE  (Week 6 gate)
  // Maren teaches the first practice directly. Something in you changes.
  // Brek's message arrives â€” he got out.
  // Cliffhanger: he says the escape was allowed.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "They do not open the fourteenth fragment. Maren sets it at the bottom of the case and closes the oilcloth over it with the deliberateness of someone filing a question they cannot yet answer. There are thirteen fragments they understand, a cipher that unlocks them, and a method that can be practiced now. That is enough to work with.",
    BG.forest_path, false,
    { id: 'a1_seg6', title: 'The First Practice', summary: 'The method applied for the first time. What changes when you hold something this way. And then Brek.' }
  ),

  n("The waystation gives way to the forest road â€” deeper tree cover, softer ground, the particular cold that forested paths hold long after open ground has warmed. They are two days' walk from where Dorath says the road widens into the eastern settlements district. They do not hurry. The pace has settled into something sustainable, which means the urgency of the first night has resolved into a different register: not panic, but purpose."),

  d("MAREN", "left", "thoughtful", "I want to begin the practice today. On the road, while we walk. You don't need to be sitting still for this â€” in fact the fragments suggest it works better when the body is occupied."),
  d("KAEL",  "right", "neutral", "What do I do?"),
  d("MAREN", "left", "neutral", "Take something you know. Something you learned at the Archive â€” one of the fragments, a section you worked with for several days. Hold it in your mind."),
  d("KAEL",  "right", "neutral", "I'm holding it."),
  d("MAREN", "left", "neutral", "Now look at it carefully. Not at the idea of it. At the actual thing. The specific words. The order they appear in. The notation at the margins. The physical detail of what is there."),

  n("You walk and you look. It is not what you expected â€” not a comfortable act of remembering but something more like pressing on a bruise, the slight discomfort of discovering that what you thought you were holding precisely is, in fact, a compressed version of the precise thing. The compressed version was good enough for use. It is not the same as the thing itself."),

  d("MAREN", "left", "neutral", "Tell me what you find."),
  d("KAEL",  "right", "neutral", "I thought I had it exactly. I have the structure. The argument. The annotation on the east margin. But the specific wording of the third section â€” I have the meaning, not the words."),
  d("MAREN", "left", "neutral", "Yes. That is what most people find first. The meaning without the vessel. The meaning is useful. The vessel is what the method requires."),
  d("KAEL",  "right", "neutral", "Can I go back? Learn the wording again?"),
  d("MAREN", "left", "neutral", "We no longer have the original. So no. You go back to what you do have â€” the closest form you hold â€” and you practice holding that precisely rather than approximately. Over time the practice itself sharpens what can be held. You are not trying to be perfect today. You are learning what precision feels like versus approximation."),

  ch("PRACTICE_INSIGHT", [
    op(
      "The difference is smaller than you expected â€” but now that you know to look for it, it's everywhere.",
      "INSIGHT_EVERYWHERE",
      [
        n("You walk for a quarter mile holding one section of one fragment with the attention the practice requires. It takes effort that is not physical but feels physical â€” a kind of internal focusing that uses something you didn't know you had. By the end of the quarter mile, you can tell the difference between holding the thing and holding a summary of the thing. By the end of another quarter mile, you begin to see that most of what you knew was summary."),
        d("KAEL",  "right", "neutral", "Is this what it feels like the whole time? Going through everything you know and finding that most of it is shorthand?"),
        d("MAREN", "left",  "neutral", "In the beginning, yes. It is uncomfortable. The fragments acknowledge this directly â€” the original archivist notes that the first stage of the practice is largely disorienting because it reveals how much of what you believed was knowledge was actually approximation of knowledge."),
        d("KAEL",  "right", "neutral", "And after the beginning?"),
        d("MAREN", "left",  "neutral", "The practice becomes the standard. You stop accepting approximation automatically. When something comes in, you hold it precisely from the start. The initial going-back becomes less frequent because you learn not to let it happen in the first place."),
      ],
      null,
      { relationships: { maren: 6 } }  // Honest and thorough self-assessment on the first try
    ),
    op(
      "The difference is larger than you expected â€” and you're not sure you want to know how much you've lost.",
      "INSIGHT_LOSS",
      [
        n("A long stretch of road where you hold one thing as precisely as you can and look at the gap between that and what you had assumed you were holding. The gap is not catastrophic. But it is not small either. What you had filed as knowledge was a series of useful compressions, each one losing a little of the original in exchange for portability."),
        d("MAREN", "left", "neutral", "That expression means you found something you were not expecting."),
        d("KAEL",  "right", "neutral", "I thought I knew the method better than this."),
        d("MAREN", "left", "neutral", "You know it better than most people who have been in the Archive twice as long. This is not a criticism. This is the practice showing you the gap that exists between good knowledge and exact knowledge. That gap is exactly why the method is necessary."),
        n("You are not sure whether that is comforting or not. You decide it is useful, which is not the same thing."),
      ],
      null,
      { relationships: { maren: 8 } }  // Honesty about the real gap â€” she corrects gently; this vulnerability deepens the bond
    ),
    op(
      "The difference is clear to you immediately â€” and you wonder if you have been doing part of this already, without knowing it had a name.",
      "INSIGHT_ALREADY",
      [
        n("The distinction between holding the thing and holding a summary of the thing â€” you recognize it as something you have been doing, partially, without knowing that was what you were doing. The moments at the Archive when a fragment felt completely known versus almost-known. You had noticed the difference without knowing it mattered."),
        d("KAEL",  "right", "neutral", "I've been doing this. Some of it. I just didn't know that was what I was doing."),
        d("MAREN", "left",  "almost-smiling", "Mmm. I thought that might be the case."),
        d("KAEL",  "right", "neutral", "You thought?"),
        d("MAREN", "left",  "neutral", "It is one of the things I was assessing in the first few weeks. Whether the instinct was already there. It is easier to teach someone who is already doing the thing intuitively than to teach the intuition from scratch."),
        d("KAEL",  "right", "neutral", "You could have told me that."),
        d("MAREN", "left",  "neutral", "I could have. Then you would have been thinking about the assessment instead of just working. This way was more accurate."),
      ],
      null,
      { relationships: { maren: 12 } }  // She reveals she was assessing you from the start â€” her smile is the rarest currency
    ),
  ]),

  n("Ryn practices alongside you. She does it quietly and without commentary â€” you notice because she asks Maren one question and then simply begins, the way she began waiting in the passage. Whether what she is doing matches what the practice requires, you cannot tell. Maren checks on her twice during the afternoon walk and says nothing beyond a brief nod, which in Maren's vocabulary of feedback means the thing is being done correctly."),

  n("Camp that night is a hollow in the bank beside the road, screened by the overgrown hedgerow, cold but dry. Dorath keeps the first watch and you take the second. The road is empty both times â€” not suspicious, just empty, the emptiness of a path that is rarely used by anyone with any sense of urgency. The practice follows you into sleep, which is unusual, the particular unusual of something that has found a purchase."),

  n("The message arrives the following morning. Not a bird â€” a person. A young man from the eastern settlements who passed them on the road two days back going west, and who stopped them now going east. He has a sealed note addressed to Dorath in a handwriting you recognize before she has finished breaking the seal."),

  d("DORATH", "left", "neutral", "It's from Brek."),
  d("KAEL",   "right", "surprised", "He got out."),
  d("DORATH", "left", "neutral", "He got out three days after the fire. He used the main gate. He says the document cover Maren arranged held."),
  d("MAREN",  "left", "neutral", "Where is he?"),
  d("DORATH", "left", "neutral", "Three days behind us. Moving fast. He saysâ€”"),

  n("She looks at the note again. Something in her expression shifts."),

  d("DORATH", "left", "quiet", "He says he worked out something on the road. He says he needs to tell you in person. He says: 'Tell Maren â€” the passage was open on purpose.'"),
  d("MAREN",  "left", "neutral", "What does that mean?"),
  d("DORATH", "left", "quiet", "He doesn't explain. Just that. The passage was open on purpose."),

  n("Maren does not respond immediately. She folds the note carefully, the way she folds things she intends to return to. Around you the forest road holds its silence, the trees close on both sides, the pale morning light coming through at angles."),

  d("KAEL",  "right", "neutral", "Maren. What does it mean?"),
  d("MAREN", "left",  "neutral", "It means Brek has been running for three days and working something out while he runs. And when he arrives, I think everything changes."),

  // â”€â”€ Task gate: before Brek arrives, the practice must be consolidated â”€â”€â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'collection',
    taskSlots:        2,
    pauseNarrator:    "Three days until Brek arrives. Maren uses the time: the practice needs to be consolidated before there are more people in the group and the rhythm changes. She says: do this now, while there is still quiet to do it in.",
    continueNarrator: "The practice has settled into something you can hold under pressure. Brek's message said three days. Today is the third day.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 7 â€” BREK'S ANSWER  (Week 7 gate)
  // Brek arrives. The escape was allowed. Someone needed them to escape.
  // Cliffhanger: Maren already knows. She has known since the second day.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "Brek arrives at midday on the third day since the message. You know it is him before you see him clearly â€” the particular rhythm of his walk, which you recognize from the mornings in the Archive courtyard, the same patient unhurried circuit applied now to a road rather than a loop. He is not running when he arrives. He ran for three days and now he is walking, and there is a quality to the walking of someone who has finished working something out and is ready to say what they found.",
    BG.cold_field, false,
    { id: 'a1_seg7', title: "Brek's Answer", summary: 'Brek arrives with the answer he worked out on the road. The escape was allowed. And Maren already knows.' }
  ),

  d("BREK",  "left", "neutral", "Maren."),
  d("MAREN", "left", "neutral", "Brek. You are not injured."),
  d("BREK",  "left", "neutral", "No. You?"),
  d("MAREN", "left", "neutral", "No. Sit down if you need to."),
  d("BREK",  "left", "neutral", "I'll sit in a minute. I want to say this first while it's still arranged correctly in my head."),

  n("He stands on the road in the same way he stood in the Archive's common room when he had worked something out â€” slightly different posture, weight shifted, the look of someone who has arrived and is making sure the others have a chance to get there too."),

  d("BREK", "left", "thoughtful", "The escape route â€” the passage under the foundation. I ran through it. After the Archive, after the second day on the road, I started thinking about the door."),
  d("KAEL", "right", "neutral", "The door at the bottom of the stairs."),
  d("BREK", "left", "thoughtful", "You said something was pressing against it before Ryn knocked her false signal. Something on the other side. Ryn knocked, and it stopped. And then you came through."),
  d("KAEL", "right", "neutral", "That's right."),
  d("BREK", "left", "thoughtful", "What was pressing against the door was not trying to hold it shut. It was not trying to break through. It stopped when it heard the knock. It heard the knock and it stepped back."),
  d("KAEL", "right", "neutral", "It was listening for the signal."),
  d("BREK", "left", "thoughtful", "It was listening for the signal. And when it heard the wrong signal first â€” Ryn's false knock â€” it waited. And when it heard the right signal, it stepped back and let you through."),

  n("The silence that follows is different from ordinary road silence. The others have heard it but you are still processing the full architecture of what he is saying."),

  d("KAEL",  "right", "surprised", "The escape was arranged."),
  d("BREK",  "left",  "thoughtful", "Not by Maren's contact on the other end. By someone on the other side of the door. Someone who knew the signal and was making sure you got through. Someone who needed you out of that building."),
  d("KAEL",  "right", "surprised", "Who would need us out of the building?"),
  d("BREK",  "left",  "neutral", "Someone who could not prevent the fire but could make sure certain people survived it. Someone who had information and made a decision with it."),

  ch("BREK_RESPONSE", [
    op(
      "Tell Brek directly: if the escape was allowed, then someone in that building knew what was coming. And that means we were set up.",
      "ESCAPE_SETUP",
      [
        d("KAEL", "right", "neutral", "If someone was guarding the door to make sure we got through â€” then they knew the fire was coming. That's not a coincidence. Someone inside the Archive knew the building was going to burn."),
        d("BREK", "left",  "neutral", "Yes."),
        d("KAEL", "right", "neutral", "That narrows the list considerably."),
        d("BREK", "left",  "neutral", "It narrows the list to one person who was missing at noon. One person who asked you about the deep records and then didn't ask again."),
        n("The name sits in the air between you without being said. You both know the name. It is the same name."),
      ],
      null,
      { relationships: { serath: 5, brek: 6 } }
    ),
    op(
      "Ask Brek how he's sure â€” maybe whoever was at the door was there to prevent the escape, and Ryn's false signal confused them.",
      "ESCAPE_DOUBT",
      [
        d("KAEL", "right", "neutral", "How do you know they weren't there to stop the escape? Ryn's false signal confused them, and then they gave up."),
        d("BREK", "left",  "thoughtful", "I thought about that. Two hours. Ryn said it waited for two hours. If you are there to stop someone coming through, you do not wait two hours without going to get help or trying the door yourself. You wait two hours only if you are there to make sure, when the door opens, that the right person comes through safely."),
        d("KAEL", "right", "neutral", "It knew the signal."),
        d("BREK", "left",  "neutral", "It knew the real signal from the false signal. Yes."),
        n("You cannot argue with that. The logic is clean. Whatever was behind the door was guarding the passage, not blocking it."),
      ],
      null,
      { relationships: { brek: 8 } }
    ),
    op(
      "Ask Brek to give you a moment. You need to look at Maren when you say the next thing.",
      "LOOK_MAREN",
      [
        d("KAEL",  "right", "neutral", "Maren. When Brek says someone needed us to escape â€” do you know who?"),
        d("MAREN", "left",  "neutral", "Yes."),
        d("KAEL",  "right", "surprised", "You know."),
        d("MAREN", "left",  "neutral", "I have known since the second day on the road."),
        n("Brek nods slowly, as though this is the confirmation of something he had already concluded. Ryn does not react. Dorath is watching Maren with the particular attention of someone who has just revised their assessment of the situation significantly."),
      ],
      null,
      { relationships: { maren: 12, brek: 5 } }
    ),
  ]),

  d("KAEL",  "right", "neutral", "Maren. You already know."),
  d("MAREN", "left",  "neutral", "Yes."),
  d("KAEL",  "right", "neutral", "How long?"),
  d("MAREN", "left",  "neutral", "Since the second day. I worked it out when I was not sleeping on the first night. I confirmed it on the second day. The question was not whether I knew â€” the question was whether telling you would change anything we needed to do differently."),
  d("KAEL",  "right", "neutral", "And you decided it wouldn't."),
  d("MAREN", "left",  "neutral", "I decided I needed to understand more before I explained what I understood. Some explanations create more confusion than they resolve, and I could not afford confusion in the first days on the road."),
  d("BREK",  "left",  "neutral", "You know who was at the door."),
  d("MAREN", "left",  "neutral", "Yes."),
  d("BREK",  "left",  "neutral", "And you know why."),
  d("MAREN", "left",  "neutral", "I believe so. Sit down. All of you. I'll explain what I think happened and why I didn't say so sooner, and you can tell me if I've missed anything."),

  n("Brek sits. You sit. The road ahead is empty in both directions and the afternoon light is falling at an angle that turns the dead grass gold. Whatever Maren is about to say has been sitting in her since the first night on the road, organized and exact, waiting for the moment when saying it would cost less than keeping it."),

  // â”€â”€ Task gate: before Maren speaks, the full picture must be in order â”€â”€â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'dialogue',
    taskSlots:        2,
    pauseNarrator:    "Maren will explain what she has known and what she withheld. Before she speaks, the group needs to be ready to hear it â€” every piece of understanding you have built this far has to be solid enough to hold what she is about to add to it.",
    continueNarrator: "You are ready. Maren opens her hands. And then she tells you what she has known since the second day on the road.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 8 â€” THE DEEP RECORDS  (Week 8 gate)
  // Maren's full explanation. What Serath found and what he did.
  // The deep records: what they actually contain.
  // Cliffhanger: Serath is three days ahead on the same road.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The explanation takes close to an hour. Maren speaks with the precision of someone who has been composing this for two days â€” not rehearsed, but organized, the way her mind always organizes: sequential, each part complete before the next begins, no hedging, no comfort offered where comfort would be inaccurate.",
    BG.cold_field, false,
    { id: 'a1_seg8', title: 'The Deep Records', summary: "Maren knew. What Serath found in the deep records. And what he did with it â€” and why. Then: he is three days ahead of them." }
  ),

  d("MAREN", "left", "thoughtful", "The deep records are not what the name suggests. Most people who hear the phrase imagine a subsection of the collection â€” older material, restricted access. That is accurate as far as it goes. What they do not capture is what the deep records contain: a second method. Not the Vraen method. Something different â€” something that predates the Vraen fragments by at least a century, based on the notation system."),
  d("KAEL",  "right", "neutral", "A different method for what?"),
  d("MAREN", "left", "thoughtful", "For identifying who is working on the Vraen method. A detection system. Written by someone who knew that the method, once widely known, would be dangerous to the people practicing it â€” because anyone who had completed it would carry something that powerful people would want to control. The deep records describe how to recognize someone at each stage of the Vraen practice. And they describe what to do about it."),
  d("KAEL",  "right", "neutral", "Do about it meaning protect them. Or do about it meaningâ€”"),
  d("MAREN", "left", "neutral", "Either. The deep records are neutral. They are a tool. What you use a tool for depends on who holds it."),

  n("She pauses. Drinks from the water skin. The road is empty."),

  d("MAREN", "left", "thoughtful", "Serath found the deep records approximately four months ago. He found them because he was looking â€” he had noticed something in the Vraen material that pointed to their existence. He read them in full, in the weeks before the fire, alone, without telling me. What he found in them changed what he understood about the situation at the Archive."),
  d("KAEL",  "right", "neutral", "What did he find?"),
  d("MAREN", "left", "neutral", "That someone in the Archive was already using the deep records. Already using them for the wrong purpose â€” not protection of the practitioners but identification for delivery. Serath found the evidence of this. He found who it was."),

  d("BREK",  "left", "thoughtful", "Who."),
  d("MAREN", "left", "neutral", "I will not say the name now. It does not matter now â€” they are not on this road. What matters is what Serath decided to do with what he found."),

  d("MAREN", "left", "neutral", "Serath decided, alone, that the only way to protect the escape was to remove the person who would have used the deep records to prevent it. He did this at noon on the day of the fire. Before the fire started. He knew the fire was coming â€” not because he was part of it, but because the evidence in the deep records included the timing."),
  d("KAEL",  "right", "neutral", "He saved us by doing that."),
  d("MAREN", "left", "neutral", "He saved the passage. He made sure that when the bell rang, whoever was at the door in the foundation was there to protect the escape, not prevent it. He arranged this. Then he left, because if he stayed his presence would have been evidence of what he had done. He sent the bird and he walked out of the Archive at noon."),

  ch("SERATH_RESPONSE", [
    op(
      "Ask if what he did was the right thing. He made a decision that affected all of you without asking.",
      "SERATH_RIGHT",
      [
        d("KAEL",  "right", "neutral", "Was it right? He made a decision that affected all of us without telling anyone."),
        d("MAREN", "left",  "neutral", "He made the only decision that had time to work. If he had told me, I would have needed time to verify it. I would have changed the plan. The change might have been better or worse, but it would have taken hours I didn't have."),
        d("KAEL",  "right", "neutral", "So he was right to do it without telling you."),
        d("MAREN", "left",  "neutral", "He was right to do it. Whether he was right to do it without telling me is a different question, and I have not finished working out the answer to it."),
      ],
      null,
      { relationships: { serath: 5, maren: 4 } }  // Pressing the ethical question Maren is also wrestling with â€” she respects it
    ),
    op(
      "Ask where Serath is now. If he walked out of the Archive at noon, he had a full day's head start on the road.",
      "SERATH_WHERE",
      [
        d("KAEL",  "right", "neutral", "If he left at noon the day of the fire â€” he's been on this road for two weeks longer than we have. Where is he?"),
        d("MAREN", "left",  "neutral", "Ahead of us. That is all I know."),
        d("BREK",  "left",  "thoughtful", "Not necessarily. Mmm."),
        d("MAREN", "left",  "neutral", "What?"),
        d("BREK",  "left",  "thoughtful", "On my road, three days ago. A waystation. Someone had used the firepit â€” recently, within a day. The ash was still warm. And there was a mark on the doorframe. Scratched in. Small. I almost walked past it."),
        d("KAEL",  "right", "neutral", "What kind of mark?"),
        d("BREK",  "left",  "neutral", "I can draw it."),
        n("He does. In the soft earth at the road's edge, with a stick, one quick shape. The same interlocking lines from the safe house wall."),
      ],
      null,
      { relationships: { serath: 8, brek: 6 } }  // Pulling out Brek's hidden observation â€” good instinct; Serath bond builds
    ),
    op(
      "Tell Maren you understand now why she didn't explain this earlier â€” you needed the road to be what it was without this weight on top of it.",
      "MAREN_UNDERSTOOD",
      [
        d("KAEL",  "right", "neutral", "I understand why you didn't say this earlier."),
        d("MAREN", "left",  "neutral", "Do you?"),
        d("KAEL",  "right", "neutral", "The first days on the road were already at the edge of what we could hold. Adding this would have changed how we walked, how we watched the road. It would have made us less reliable."),
        d("MAREN", "left",  "neutral", "Yes. That was the calculation."),
        d("KAEL",  "right", "neutral", "It was the right call."),
        d("MAREN", "left",  "neutral", "Mmm. Perhaps. I am not always certain that deciding what other people need to know in order to be useful is the same as respecting what they deserve to know."),
        n("She says it in the same tone she says everything. But it is the most personal thing you have heard from her since the Archive."),
      ],
      null,
      { relationships: { maren: 15 } }  // The most emotionally intelligent response â€” Maren reveals something real
    ),
  ]),

  d("BREK",  "left",  "neutral", "The mark on the doorframe. The same one from Eran's building?"),
  d("DORATH", "left", "thoughtful", "Eran's notation. Yes."),
  d("MAREN",  "left", "neutral", "How old was it?"),
  d("BREK",   "left", "neutral", "New. Scratched in within the last week. Ash in the firepit was warm."),
  d("MAREN",  "left", "neutral", "He is three days ahead of us on this road. And he is leaving markers."),
  d("KAEL",   "right", "neutral", "He wants us to follow him."),
  d("MAREN",  "left", "neutral", "He is leading us somewhere. Yes. The question is whether we trust where he is leading."),

  n("Nobody answers that immediately. The trust question has no easy answer â€” Serath acted well with information he alone had. But he also made decisions that affected everyone without asking. Both of those things are true at the same time and neither one cancels the other. Maren lets the silence hold the question. The road east runs ahead of you through the cold late afternoon."),

  d("DORATH", "left", "neutral", "I vote we follow the markers."),
  d("BREK",   "left", "neutral", "So do I."),
  d("RYN",    "right", "quiet", "He knew the signal. He arranged the passage. He kept us safe. I'll follow the markers."),
  d("KAEL",   "right", "neutral", "Maren."),
  d("MAREN",  "left", "neutral", "We follow the markers."),

  // â”€â”€ Task gate: the trail requires verification before the group moves â”€â”€â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'search',
    taskSlots:        3,
    pauseNarrator:    "Following an unknown trail â€” left by someone who disappeared from the Archive and hasn't explained why â€” requires that what you're carrying is confirmed and secure before the group moves. Maren: count the fragments. Ryn: check the rear. You: there are things that need to be completed before the next marker.",
    continueNarrator: "Everything in order. The group moves east. The next marker is two miles further on the road.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 9 â€” THE TRAIL  (Week 9 gate)
  // Following Serath's markers. The method deepening.
  // Something changes in the way you hold what you know.
  // Cliffhanger: a building at the end of the trail. A light goes out.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The markers are placed the way Serath did everything â€” precisely and without excess. Not at every turn, not in obvious spots. At each place where the road offers a choice, or where the correct path could be confused with the wrong one, there is a mark: a small scratched shape on a stone, a waypost, the bark of a tree at a fork. You start recognizing them faster than expected, which means he calibrated the spacing to someone who would know his notation. He was not marking for a stranger.",
    BG.forest_path, false,
    { id: 'a1_seg9', title: 'The Trail', summary: 'Following the markers Serath left. The method changing something. A building at the end of the trail â€” and a light goes out.' }
  ),

  n("The eastern settlements district is not what the name suggests. Not a collection of towns, but a dispersal of small communities across a landscape that has been settled and abandoned in different places over centuries, leaving a patchwork of cleared land and grown-back forest, old stone walls in the middle of fields, foundations of things that no longer exist above ground. Dorath knows the general territory; the specific paths are new to her. The combination of her knowledge of the region and Serath's markers is enough."),

  d("BREK",   "left", "thoughtful", "The practice â€” the one from the fragments. I have been doing it on the road. Every morning."),
  d("KAEL",   "right", "neutral", "The holding-it-precisely practice."),
  d("BREK",   "left", "thoughtful", "Yes. I have been doing it with the things I know about the Archive's structure. The physical layout. Where each room was. Every corridor I walked in three years."),
  d("KAEL",   "right", "neutral", "Has it changed anything?"),
  d("BREK",   "left", "thoughtful", "Mmm. Three days ago I woke up and the layout of the north wing was different in my memory. Not different as in wrong â€” different as in more complete. Details I hadn't thought about in months came back without me trying to recall them."),
  d("KAEL",   "right", "neutral", "The practice did that."),
  d("BREK",   "left", "neutral", "I think so. I think holding some things precisely â€” the ones I was working on â€” put pressure on the ones adjacent to them. The adjacent things became more available."),
  d("MAREN",  "left", "thoughtful", "That is what the fourth fragment describes. The method creates â€” the word is something like resonance. Precision in one part of what you hold makes the parts connected to it more precise as well."),
  d("BREK",   "left", "neutral", "You could have told us that."),
  d("MAREN",  "left", "almost-smiling", "I was curious whether you would find it yourselves."),

  ch("TRAIL_CHOICE", [
    op(
      "Push ahead quickly â€” Serath's markers are fresh and he is only three days ahead. If you move fast you might catch up.",
      "TRAIL_FAST",
      [
        n("The markers lead off the main track and into a narrower path through dense growth. Moving fast here means moving carefully â€” the path is not always visible. You compromise: faster than comfortable, slower than reckless. The gap between you and Serath does not close quickly, but it narrows. On the third day the markers are noticeably fresher, the scratches in the bark still pale without weathering."),
        d("DORATH", "left", "neutral", "He knows we're following. He's adjusting his pace."),
        d("KAEL",   "right", "neutral", "Faster or slower?"),
        d("DORATH", "left", "neutral", "Slower. He's letting us close the distance."),
      ],
      null,
      { relationships: { serath: 4, dorath: 4 } }
    ),
    op(
      "Hold to a sustainable pace â€” the practice and the journey both need your attention, and neither is served by exhaustion.",
      "TRAIL_STEADY",
      [
        n("A sustainable pace is what Brek had always run at the Archive: not fast, not slow, the pace at which the body can work for a long time without consuming itself. You hold it. The markers are followed one by one. The gap between you and Serath stays relatively constant for the first two days, and then on the third day the markers are suddenly much closer together â€” as though he has slowed down significantly, or stopped entirely."),
        d("BREK",   "left", "neutral", "He's waiting for us."),
        d("MAREN",  "left", "neutral", "Or he has arrived."),
      ],
      null,
      { relationships: { brek: 5, maren: 4 } }
    ),
    op(
      "Follow Dorath's lead â€” she knows this territory. Speed and path are hers to decide.",
      "TRAIL_DORATH",
      [
        n("Dorath navigates without hesitation, reading the markers against her knowledge of the terrain: this path has a branch in two miles, this one avoids the seasonal bog, this ridge is passable in this weather. Her efficiency on the ground is the same as Ryn's efficiency in the storage building â€” the product of very specific, very careful preparation. The group moves faster than it would have without her. The markers confirm each choice."),
        d("KAEL",   "right", "neutral", "You knew this territory."),
        d("DORATH", "left", "neutral", "Eran showed me parts of it. Some of this is his work I'm reading, not just Serath's."),
        n("That lands slowly. Eran's work in the stones and the marks, Serath's work in the scratches on the bark. A trail laid in two different times, for the same destination."),
      ],
      null,
      { relationships: { dorath: 14 } }
    ),
  ]),

  n("The practice continues through the walking days. Something is changing in the way you hold what you know â€” not dramatically, not all at once, but with the quality of something that has been shifting for a while and is now far enough along that you can name the direction it has moved. What you learned at the Archive is still what you learned. But it sits differently. The holding of it requires less effort than it did. The precision, which was work in the first days of the practice, is becoming â€” not automatic, but closer to automatic. A grain of something in the machine that has started to wear smooth."),

  n("On the fifth day following the markers, the path emerges from the dense growth into a clearing. At the far edge of the clearing is a building. Not a ruin â€” inhabited, smoke from a chimney, stone walls intact, shutters on the windows. One window has a light in it. The light is visible through the gaps in the shutter."),

  n("You stop at the tree line. The others stop beside you."),

  d("MAREN",  "left", "neutral", "Dorath. Is this on any map?"),
  d("DORATH", "left", "neutral", "No. I didn't know this clearing existed."),
  d("BREK",   "left", "thoughtful", "The last marker was at the path entrance. He intended us to come here."),
  d("RYN",    "right", "quiet", "The light. Look at the light."),

  n("As you watch, the light in the window goes out. Not flickered, not faded â€” extinguished deliberately. The building now holds no visible light. The smoke from the chimney continues. Someone is inside, has seen you arrive at the tree line, and has chosen to make themselves invisible while they decide what happens next."),

  // â”€â”€ Task gate: the building requires approach â€” prepare before moving â”€â”€â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'fight',
    taskSlots:        2,
    pauseNarrator:    "Someone inside that building just extinguished their light. They know you are here. Before the group crosses the clearing, there are things that need to be settled â€” questions you have been carrying, things you have been learning â€” that cannot wait.",
    continueNarrator: "You are as ready as you can be. The group moves across the clearing toward the building at the road's end.",
    enemyName:        "The Unknown Contact",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 10 â€” VOSS  (Week 10 gate)
  // The building. What Voss is in concrete terms.
  // A fragment on the table â€” one that should have burned.
  // Cliffhanger: someone else saved one from the fire.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "Nothing moves in the building. Smoke from the chimney; shuttered windows; the dark where the light was. You wait at the tree line for seven minutes. Then Maren walks out of the trees toward the building's door. She does not look back. She does not hurry. She walks at the pace of someone who has decided the question and is covering the ground between the decision and what the decision leads to.",
    BG.settlement_exterior, true,
    { id: 'a1_seg10', title: 'Voss', summary: "The building. What Voss means in concrete terms. And a fragment on the table that survived the fire â€” but not because Maren saved it." }
  ),

  n("The door opens before she reaches it."),

  n("Not Serath. A woman you have not seen before â€” late fifties, possibly older, the face of someone who has spent decades making careful decisions in small rooms. She looks at Maren with the recognition of someone who expected exactly this person at this door, at approximately this time."),

  d("TAL",   "left", "neutral", "I wondered when you would arrive. Come in. It is cold enough to matter."),
  d("MAREN", "left", "neutral", "Tal."),
  d("TAL",   "left", "neutral", "Maren. You look tired."),
  d("MAREN", "left", "neutral", "I have been walking for ten days."),
  d("TAL",   "left", "neutral", "Yes. Come in."),

  n("Inside: a single room, larger than the exterior suggested. A fireplace, a table, shelves along one wall. Three pallets rolled up in the corner, used recently. The kind of room that has been lived in for many years and has accumulated that particular density of useful objects arranged with the logic of someone who knows exactly where each thing is."),

  n("On the table: documents. And in the middle of the documents, wrapped in oilcloth: a fragment. Maren crosses to it. She does not touch it. She looks at it the way she looks at things that do not yet make sense, which is with the particular attention of someone who is going to understand eventually and is beginning the process now."),

  d("MAREN", "left", "thoughtful", "That fragment."),
  d("TAL",   "left", "neutral", "Yes."),
  d("MAREN", "left", "thoughtful", "It should have burned."),
  d("TAL",   "left", "neutral", "It should have. I moved it before the fire. I have had it for two weeks."),

  ch("TAL_RESPONSE", [
    op(
      "Ask who she is. You have not been introduced and she and Maren speak as though they know each other from a long time ago.",
      "TAL_WHO",
      [
        d("KAEL", "right", "neutral", "Who are you?"),
        d("TAL",  "left",  "neutral", "My name is Tal. I was part of Eran's network before Dorath joined it. I went quiet two years ago because I found something that changed what I was doing. I did not know how to explain it within the network without compromising everything else."),
        d("KAEL", "right", "neutral", "What did you find?"),
        d("TAL",  "left",  "neutral", "Evidence that the network itself had been partially turned. Not Dorath. Not the original members. But several newer ones â€” people who were placed deliberately. People working under the name Voss."),
      ],
      null,
      { relationships: { tal: 10 } }
    ),
    op(
      "Ask about the fragment. How she knew to move it, and which one it is.",
      "FRAGMENT_WHICH",
      [
        d("KAEL",  "right", "neutral", "Which fragment is that? And how did you know to take it?"),
        d("TAL",   "left",  "neutral", "I have been in and out of the Archive for six years. Officially I was a document consultant â€” legitimate work, legitimate access. I have been reading the Vraen material for four of those years, alongside Eran's instruction."),
        d("MAREN", "left",  "thoughtful", "You knew the material well enough to know which fragment to save."),
        d("TAL",   "left",  "neutral", "I knew which one would be missed if it burned. And I knew Maren would have moved thirteen. I moved the fourteenth."),
        d("KAEL",  "right", "surprised", "You placed it in Maren's case."),
        d("TAL",   "left",  "neutral", "Yes."),
      ],
      null,
      { relationships: { tal: 8, maren: 6 } }
    ),
    op(
      "Ask about Voss. She said people were placed within the network. What does Voss actually want â€” destroy the method or control it?",
      "VOSS_WANT",
      [
        d("KAEL",  "right", "neutral", "Voss. What does it want? We have been trying to work out if it is destruction or capture."),
        d("TAL",   "left",  "thoughtful", "Neither, exactly. The decision made under that name is more specific. Voss wants the method completed â€” by one person, under their control. Not destroyed. Not scattered. Completed by someone they can direct."),
        d("KAEL",  "right", "neutral", "They burned the Archive for that?"),
        d("TAL",   "left",  "neutral", "They burned the Archive because the Archive was producing people who might complete the method independently. Outside their control. That is the threat they were eliminating: not the method, but the freedom of whoever completes it."),
        d("MAREN", "left",  "neutral", "Mmm. That is a more dangerous interpretation than destruction."),
        d("TAL",   "left",  "neutral", "Yes."),
      ],
      null,
      { relationships: { tal: 12, dorath: 4 } }
    ),
  ]),

  d("TAL",   "left", "neutral", "I will explain everything. Sit down. There is food â€” I was expecting more of you than just Maren, based on the note Serath left."),
  d("KAEL",  "right", "neutral", "Serath was here."),
  d("TAL",   "left", "neutral", "He was here three days ago. He said you were following his markers and that I should wait."),
  d("MAREN", "left", "neutral", "Where did he go?"),
  d("TAL",   "left", "neutral", "East. He said he had one more thing to arrange before he could stop moving. He said he would find you when it was done."),

  n("The food is simple and warm and you are grateful for it in the way you are only grateful when you were not aware how hungry you were until the hunger was addressed. Tal speaks while you eat. She explains the network â€” how Eran built it, how she joined it, the years of parallel work outside the Archive, the slow process of finding and documenting the evidence that someone had infiltrated the network under the name Voss."),

  n("What Voss is, in the end: a decision made by a single person, executed through a structure of people who believed different things about what they were working toward. Some knew they were working for Voss. Most believed they were working for something legitimate â€” scholarship, preservation, access. The decision at the center was to acquire: whoever completed the Vraen method was to be identified, found, and brought somewhere specific. Not harmed. Not destroyed. Brought."),

  d("MAREN", "left", "thoughtful", "Where?"),
  d("TAL",   "left", "neutral", "To the person who made the decision. Whoever that is. I have not been able to identify them directly. The name Voss is a screen. Behind it is a person with resources, patience, and a very clear idea of what the completed Vraen method is worth."),
  d("DORATH", "left", "neutral", "Worth to whom."),
  d("TAL",   "left", "neutral", "To whoever has them. Think of it that way."),

  n("The fire in the fireplace burns lower. Tal rises to add wood. In the silence, you look at the fragment on the table â€” the one she saved, the fourteenth, the one that should have burned. It is wrapped in oilcloth and it sits there with the particular weight of objects that represent things much larger than themselves."),

  d("KAEL",  "right", "neutral", "That fragment â€” the fourteenth instruction. You placed it in Maren's case. You knew she would bring it here."),
  d("TAL",   "left",  "neutral", "I knew that if Maren got out, and if she opened the case on the road, and if she worked with the thirteen fragments she knew she had moved â€” eventually she would notice the fourteenth. And then she would want to find out who placed it."),
  d("MAREN", "left",  "neutral", "A trail."),
  d("TAL",   "left",  "neutral", "A trail. To here. To what I have been building for six years."),
  d("KAEL",  "right", "neutral", "Which is what?"),

  n("Tal looks at the fragment. Then at Maren. Then at you. The expression she uses is the one that comes before saying something that is very large and requires the right amount of space around it."),

  d("TAL",  "left", "neutral", "The complete record of what Eran found. What the Unnamed Third actually is, where it is, and what it contains. And the full fourteen-stage method â€” not thirteen stages with a fourteenth that completes them. Fourteen stages that together describe something that has never been completed. Not in any record I have found. Not by the original archivist. Not by anyone since."),
  d("MAREN", "left", "surprised", "Never completed."),
  d("TAL",  "left", "neutral", "Never completed. The Archive has been teaching the preparation for two hundred years. The thing it was preparing people for has been waiting."),

  // â”€â”€ Task gate: before the final stage can begin, what you carry must be solid â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'collection',
    taskSlots:        2,
    pauseNarrator:    "Two hundred years of preparation. The thing it was preparing people for has been waiting. Maren says: before we go further, what you are carrying needs to be solid. Not almost-solid. Not close enough. Exactly solid.",
    continueNarrator: "What you carry is solid. The practice holds under examination. Tal continues.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 11 â€” WHAT YOU CARRY  (Week 11 gate)
  // The method at its new depth. The practice changes how you hear things.
  // Evening: Sira's book, found in this room.
  // Cliffhanger: the book is here. Sira was here.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The building becomes home for three days. Tal has the documents â€” Eran's years of work, her own additions, the cross-references between the Vraen fragments and what Eran called the secondary archive: records of people and places connected to the Unnamed Third, distributed across the east in locations that were chosen for their obscurity. She works with Maren for hours at a time, both of them at the table, speaking in the shorthand of people whose years of separate work have produced compatible frameworks.",
    BG.settlement_interior, false,
    { id: 'a1_seg11', title: 'What You Carry', summary: 'The method deepening. A practice that changes how you hear everything. And then: a book in this room in the handwriting of someone who was here before you.' }
  ),

  n("Maren continues teaching the practice. She has refined what she says based on watching you and Brek work with it on the road â€” less abstract now, more specific, calibrated to what she has observed actually produces progress rather than what the fragments describe theoretically. The seventh day of the practice feels different from the first. The holding of something precisely is still work, but it is different work â€” not the effort of learning a new motion, but the effort of a motion becoming more refined."),

  d("MAREN", "left", "thoughtful", "There is something the fragments describe at this stage â€” I want to see if you find it before I name it."),
  d("KAEL",  "right", "neutral", "What am I looking for?"),
  d("MAREN", "left", "neutral", "You'll know when you find it. Take something you learned in the first week of the Archive â€” one of the earliest things, something you haven't specifically practiced holding. Hold it with the same attention you have been using for the assigned practice."),

  n("You do. An early fragment â€” one of the simpler ones, from the first week, something you understood without effort. You hold it with the precision the practice has taught you to bring. And something unexpected: it is already precise. Not because you practiced it but because â€” the practice changed the way you receive things. Whatever came in during the weeks of practice came in differently than what came in before. The old material is still summary. The new material is exact."),

  d("KAEL",  "right", "surprised", "Oh. The new things â€” since I started the practice â€” they came in differently. They arrived exactly."),
  d("MAREN", "left",  "neutral", "Yes."),
  d("KAEL",  "right", "neutral", "I'm not doing extra work to hold them precisely. They arrived that way."),
  d("MAREN", "left",  "neutral", "That is what the fragments call the threshold. Past a certain point of practice, the holding of new things becomes the default. You stop having to return to them to make them precise â€” they arrive precise. The old material is still work. The new material is automatic."),
  d("KAEL",  "right", "neutral", "So going forwardâ€”"),
  d("MAREN", "left",  "neutral", "Going forward, everything new arrives exactly. You do not lose it. You cannot afford to lose it. This is why the people who burned the Archive are looking for someone who has reached this point."),

  ch("THRESHOLD_MEANING", [
    op(
      "Ask what this feels like from the outside â€” does anything change that others can see?",
      "THRESHOLD_OUTSIDE",
      [
        d("KAEL",  "right", "neutral", "Does this change anything others can observe? Or is it entirely internal?"),
        d("MAREN", "left",  "neutral", "The fragments say the change is visible to people who know what to look for. The way you handle questions â€” the speed of precise recall versus approximate recall is different. The way you cross-reference things you are discussing. People who know the method can see it. People who know the deep records can identify it."),
        d("KAEL",  "right", "neutral", "That is how the detection system works. The one in the deep records."),
        d("MAREN", "left",  "neutral", "Yes. The deep records describe exactly what to look for when someone has reached this stage. They describe it from the outside, not the inside. They are a precise portrait of what you are now doing."),
        n("The knowledge that you are now visible in a way you were not yesterday has a specific weight to it. Not fear â€” more like the sensation of moving from a protected position into open ground."),
      ],
      null,
      { relationships: { maren: 6 } }
    ),
    op(
      "Tell Maren what you want to hold most precisely â€” something you are afraid of losing.",
      "THRESHOLD_HOLD",
      [
        d("KAEL",  "right", "thoughtful", "There is something I want to practice holding. Something I am afraid of losing."),
        d("MAREN", "left",  "neutral", "What."),
        d("KAEL",  "right", "thoughtful", "The Archive. Not the building â€” the five weeks. What it was to be in it, learning what we were learning, before any of this started."),
        n("A pause. Maren looks at you with the expression she uses when something lands differently than expected."),
        d("MAREN", "left",  "neutral", "That is a good thing to want to hold. Hold it exactly."),
        n("You try. The five weeks at the Archive â€” not the drama of the last night but the weeks themselves, the daily work of it, the smell of the old paper, the particular way Serath sat at a desk and forgot the rest of the room existed. You hold it as precisely as you can. It is there. It stays there. It does not erode the way you were afraid it might."),
      ],
      null,
      { relationships: { maren: 12 } }
    ),
    op(
      "Ask Maren if she has reached this point herself. And if so â€” when.",
      "THRESHOLD_MAREN",
      [
        d("KAEL",  "right", "neutral", "Have you reached this point? The threshold?"),
        d("MAREN", "left",  "neutral", "Yes."),
        d("KAEL",  "right", "neutral", "When?"),
        d("MAREN", "left",  "neutral", "Fourteen years ago. I had been at the Archive five years. I reached it accidentally â€” I was not doing the practice deliberately, I had not yet identified what the practice was precisely. I simply noticed the change and then worked backward from what I had been doing to understand why it had happened."),
        d("KAEL",  "right", "neutral", "Is that why you've been at the Archive nineteen years? You were trying to replicate it â€” to teach it."),
        d("MAREN", "left",  "neutral", "Yes."),
        d("KAEL",  "right", "neutral", "How long before you found someone it worked for?"),
        d("MAREN", "left",  "neutral", "You are the third."),
      ],
      null,
      { relationships: { maren: 10 } }
    ),
  ]),

  n("That evening, Tal goes through some of the older material in the shelves â€” documents that need to be categorized before they move on. She works through them efficiently, setting each one in a new pile. Then she stops. She lifts something from the shelf that was half-hidden behind a document roll â€” a small book, the kind used for personal notes, with a rough cloth cover and a red cord tying it shut."),

  d("TAL",  "left", "neutral", "This was not here when I arrived at this building."),
  d("BREK", "left", "thoughtful", "How long have you been here?"),
  d("TAL",  "left", "neutral", "Four days. I cleaned this shelf when I arrived. This was not here."),

  n("She brings it to the table. The red cord is tied with a knot you recognize â€” a specific double knot that is not unusual but that you saw used consistently by one person in the Archive, always on tied bundles, always exactly this way."),

  d("KAEL", "right", "surprised", "That's Sira's knot."),

  n("You open it without untying it â€” the cord is long enough. On the first page, in handwriting you know as well as your own: a date from three weeks ago. Before the fire. And below the date, a sentence."),

  n('"I am leaving this here because I think this is where you will come, and I want you to find this before we find each other. There are things it will be easier to read first than to hear."'),

  // â”€â”€ Task gate: before reading the book, Maren says the practice must be current â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'investigation',
    taskSlots:        2,
    pauseNarrator:    "Sira's book. She left it knowing you would find it. She said there are things easier to read first than to hear. Before you open it â€” Maren says: what you carry must be current. The method requires you to know precisely what you know before you add to it.",
    continueNarrator: "What you know is current. You open the book. The first entry is dated three weeks before the fire.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 12 â€” THE FOURTEENTH FRAGMENT  (Week 12 gate)
  // The book's full content. Sira knew. The fourteenth fragment was hers.
  // The settlement is three days ahead â€” Sira is there.
  // Cliffhanger: and so is someone else.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "You read it alone first. Not by choice â€” everyone steps back without being asked, as though they can see that some kinds of reading need a certain amount of space around them. The fire in the fireplace, the book in your hands, the others doing quiet things at a distance that requires no explanation.",
    BG.settlement_interior, false,
    { id: 'a1_seg12', title: 'The Fourteenth Fragment', summary: "Sira's book. She knew what was coming. The fourteenth fragment was hers. And the book ends with a location." }
  ),

  n("Sira's handwriting is different from yours â€” closer together, the letters smaller, the same speed but more compressed. The book covers six months. It begins with her arrival at the Archive four months before you arrived, and ends three weeks ago, the day she left. You read it from the beginning, which means reading the story of someone who was moving toward the same understanding you have been moving toward but from a different direction, at a different pace, in silence."),

  n("She found the deep records eight months ago â€” before Serath found them, before Maren identified the threat, before any of the preparation began. She found them through the Unnamed Third material: following a cross-reference that nobody had followed for decades because the path required combining two notation systems that were not officially compatible. The path took her to documents that were not listed anywhere. Documents that described the network that predated the Archive, the one that Eran had been tracing from outside."),

  n("She spent four months reading in secret. Not keeping secrets from Maren â€” Maren did not have the access to that material and Sira did not yet understand enough to know what to tell her. She was working toward understanding, and you know from reading her notes that she worked the same way you do: methodically, refusing to summarize before she had the detail."),

  n("The fourteenth fragment: she found it in the deep records, in a section so obscure that only someone following the same lateral cross-reference path would ever have arrived at it. She copied it. She memorized the copy. She placed the original in an oilcloth with Maren's wrapping style and left it in Maren's case on the last night, when she already knew she was leaving and that Maren would likely be leaving too."),

  d("KAEL",  "right", "thoughtful", "She left the fragment in Maren's case. Then she left on her own."),
  d("MAREN", "left",  "neutral", "Yes."),
  d("KAEL",  "right", "neutral", "She knew what was coming."),
  d("MAREN", "left",  "neutral", "She knew enough of it. What she found in the deep records was not a full picture of what Voss was planning. But it was enough to know that the Archive was in danger and that certain material should not be left there."),
  d("KAEL",  "right", "neutral", "Why didn't she tell you directly?"),
  d("MAREN", "left",  "neutral", "Read the end of the book. She explains."),

  n("The end of the book. The last entry, dated four months before the fire â€” the day she left."),

  n('"What I have found and where I am going: I am going to find the settlement. The one the Unnamed Third records describe as the original site of the practice. I believe it still exists. I believe if I find it I will find something there that changes what we know about how far the method has been completed. I am not telling Maren because Maren has too much already and telling her this before I have found it would add a variable to her preparation that I cannot account for. If I am wrong, no harm done. If I am right, I will be there when you arrive. I believe you will arrive. I believe the path leads here."'),

  ch("BOOK_RESPONSE", [
    op(
      "Tell Brek what the book says. He needs to know â€” he has been part of this from the escape, and keeping it from him now is a different kind of wrong.",
      "BOOK_TELL_BREK",
      [
        d("KAEL",  "right", "neutral", "Brek. Sit down. I want to read you part of this."),
        d("BREK",  "left",  "neutral", "Mmm."),
        n("You read him the final entry. He listens the way he listens to everything â€” without hurry, without visible reaction, turning it over somewhere internal. When you finish he is quiet for a moment."),
        d("BREK",  "left",  "thoughtful", "She was there before the fire."),
        d("KAEL",  "right", "neutral", "Yes."),
        d("BREK",  "left",  "thoughtful", "And she believes the settlement still exists. She has gone to find it."),
        d("KAEL",  "right", "neutral", "Yes."),
        d("BREK",  "left",  "neutral", "Then we need to find the settlement."),
        d("KAEL",  "right", "neutral", "Yes."),
        d("BREK",  "left",  "neutral", "Does Dorath know where it is?"),
      ],
      null,
      { relationships: { brek: 10 } }
    ),
    op(
      "Keep it to yourself for now. Let the group work from the known information â€” the settlement, the location â€” without adding the personal weight of the sibling connection.",
      "BOOK_PRIVATE",
      [
        n("You close the book and hold it in your hands for a moment. The others are not watching. You are not sure why you make the decision you make â€” only that it feels like the right one in this moment: to know this privately, to carry it quietly, to let the information about the settlement location be the information that drives what happens next, without the weight of the sibling story on top of it. You can tell them later. You will tell them later. But for now this is yours to hold."),
        d("MAREN", "left", "neutral", "Well?"),
        d("KAEL",  "right", "neutral", "She went ahead to find something. A settlement â€” east, specific location. She believes the method has been practiced there. She left an address, basically. In the book."),
        d("MAREN", "left", "neutral", "That is where we need to go."),
      ],
      null,
      { relationships: { maren: 4 } }
    ),
    op(
      "Ask Maren directly if she knew Sira was going to do this â€” if this was planned between them, even partially.",
      "BOOK_ASK_MAREN",
      [
        d("KAEL",  "right", "neutral", "Did you know she was going to do this? Any part of it?"),
        d("MAREN", "left",  "neutral", "No. I knew she had found something. I let her go because she said it was important and I trusted her assessment. I did not know she had found the deep records material or that she had the fourteenth fragment."),
        d("KAEL",  "right", "neutral", "Are you angry she didn't tell you?"),
        d("MAREN", "left",  "neutral", "I would have been, at the time. Now â€” reading the end of the book â€” I understand the calculation she made. And I cannot say it was wrong. The decision not to tell me gave her the time she needed to go ahead and find it first."),
        d("KAEL",  "right", "neutral", "Find what?"),
        d("MAREN", "left",  "neutral", "Whatever is at the settlement. That is the question we are about to answer."),
      ],
      null,
      { relationships: { maren: 9 } }
    ),
  ]),

  n("Tal knows the settlement. Not its exact location â€” but its general region, the accounts of it in Eran's documents, the description of how to find it from a particular landmark three days east of where they are now. She pulls Eran's map. Shows you. Dorath traces the route. The landmark is real â€” she has passed it twice, from a distance, not knowing what it was marking."),

  d("DORATH", "left", "neutral", "Three days from here. If the description is accurate."),
  d("TAL",   "left", "neutral", "Eran was reliable. The description will be accurate."),
  d("MAREN",  "left", "neutral", "We leave tomorrow morning. Tal â€” will you come?"),
  d("TAL",   "left", "neutral", "Yes. I have been waiting six years for a reason to go there. I think this is it."),

  n("That night, preparing to sleep, Dorath goes through her habitual check of the perimeter. She comes back after longer than usual."),

  d("DORATH", "left", "quiet", "There is someone in the tree line. East side. Not moving. Watching the building."),
  d("KAEL",   "right", "neutral", "Like the figure in the square."),
  d("DORATH", "left", "quiet", "No. Different quality. This one is not here to report back. This one is â€” waiting. And the posture. The way they stand. I've seen that way of standing before."),
  d("KAEL",   "right", "neutral", "Where?"),
  d("DORATH", "left", "quiet", "In the Archive courtyard. Every morning. Before the Archive opened."),

  // â”€â”€ Task gate: before the settlement is approached, everything must be confirmed â”€â”€
  {
    type:             'task_gate',
    gateStyle:        'search',
    taskSlots:        3,
    pauseNarrator:    "The figure in the tree line. Dorath knows that posture. Before the group moves toward the settlement, there are things to confirm, things to consolidate, things that cannot be left uncertain when what comes next may change everything you think you know.",
    continueNarrator: "Everything confirmed. The group moves toward the settlement gate as the last light holds in the valley.",
  },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 13 â€” FOUND  (Week 13 gate)
  // The settlement. Sira is there â€” alive, working, chose to be here.
  // Cliffhanger: Serath is also there.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The figure in the tree line is Brek. Not the Brek who is inside the building â€” Brek who has been ranging ahead while they slept, who went east before dawn and came back to watch the building from outside because he does not sleep well when there is something to be worked out and he had been working something out. He walks back into the building when Dorath calls to him, sits down, and says nothing for a moment, which means he has arrived at the conclusion.",
    BG.settlement_exterior, false,
    { id: 'a1_seg13', title: 'Found', summary: 'The settlement exists. Sira is there â€” alive and working. And when the door opens, someone else is standing beside her.' }
  ),

  d("BREK",  "left", "thoughtful", "I went to see if the road east is clear. It is. But I also went because I have been thinking about the person who was at the door in the foundation. The one who waited two hours. And I think I know now."),
  d("MAREN", "left", "neutral", "You think you know who it was."),
  d("BREK",  "left", "neutral", "Not a person. Not exactly. Someone who knew the signal. Someone connected to the deep records, to Eran's notation. Someone who could move through the Archive's foundation without being seen. Someone who has been present in this situation from the beginning."),
  d("KAEL",  "right", "neutral", "Tal."),
  d("TAL",   "left", "neutral", "I could not prevent the fire. But I could stay behind long enough to make sure the passage was held open. Yes."),
  d("MAREN", "left", "neutral", "You were in the Archive that night."),
  d("TAL",   "left", "neutral", "I was in the foundation for six hours. From the evening before the fire until you came through."),

  n("Brek nods slowly, the nod of someone who has confirmed something that matters but does not change the direction they were already walking. Maren looks at Tal with the expression she uses when information has arrived that significantly rearranges the picture and she is rearranging."),

  d("MAREN", "left", "neutral", "You held the passage."),
  d("TAL",   "left", "neutral", "I held the passage. Yes. That was all I could do. I could not stop them from burning it. I could make sure the right people got out."),

  n("The three days to the settlement are the simplest three days since the Archive. Not because they are without difficulty â€” the terrain east of Tal's building is rougher, old growth forest, paths that have not been maintained, one river crossing at a shallow ford that is cold enough to wake everyone fully into the morning. But the direction is clear. The destination is known. The uncertainty that has been the constant texture of the past weeks has resolved into a single question: what is there when you arrive."),

  n("You practice the method every day. The threshold Maren described â€” new things arriving precisely â€” is solid now, consistent. You test it by learning new things from Tal's documents during the evening camps and checking them the following morning. They are there. Exactly as given. Not eroding, not compressing. The practice has become a condition rather than an effort."),

  nb(
    "The settlement appears in the way things appear when you have been looking for them long enough â€” gradually and then all at once. The tree line opens into a valley. The valley holds a cluster of stone buildings â€” seven, perhaps eight, arranged without the geometric logic of planned construction but with the organic rightness of buildings that grew around each other over time. There are people there. Smoke from chimneys. A cleared field, recently worked. It exists. Sira described it accurately, though she never saw it from this angle.",
    BG.settlement_exterior, false
  ),

  n("A figure comes out of the nearest building to watch you approach from the valley's edge. Young â€” mid-twenties â€” with the posture of someone who has been doing sustained work for a long time and whose body has adapted to it. She sees you. Her expression does not tell you what she is about to do. She is deciding. The decision takes five seconds, and then she starts walking toward you."),

  ch("SIRA_APPROACH", [
    op(
      "Walk to meet her. Close the distance. Whatever she decided, it is easier to hear it without a field between you.",
      "SIRA_WALK",
      [
        n("You walk out of the tree line without waiting for the others. Not running â€” that would put pressure on a moment that does not need pressure. Just walking, the same pace she is walking, covering the field from both sides at the same time. When you meet in the middle she stops. You stop. The expression she worked out in those five seconds has settled into something you know from a long time before the Archive: the expression that means she was prepared for this, and the preparation was not quite enough."),
      ],
      null,
      { relationships: { sira: 10 } }
    ),
    op(
      "Wait at the tree line. Let her come to you at her own pace â€” she knows this place and you don't, and whatever she's been through in the past weeks deserves to be met on her terms.",
      "SIRA_WAIT",
      [
        n("You wait. She closes the distance between the building and the tree line at a walking pace that is not urgent and not slow â€” the pace of someone who has made a decision and is executing it. When she reaches the tree line she stops two arm-lengths away and looks at you with the expression of someone who prepared what to say and is now deciding whether that preparation was actually the right preparation."),
      ],
      null,
      { relationships: { sira: 8 } }
    ),
    op(
      "Call to her â€” not her name, something else, a specific phrase only the two of you would know, so she knows who she is looking at from a distance.",
      "SIRA_CALL",
      [
        n("You call the phrase â€” something small and specific, from long before either of you was in an archive or on this road, the kind of phrase that exists between siblings as a shortcut past every intervening thing. She hears it. She stops walking. Then she starts again, faster, and you close the remaining distance together."),
      ],
      null,
      { relationships: { sira: 14 } }
    ),
  ]),

  d("SIRA",  "right", "neutral", "You're later than I thought."),
  d("KAEL",  "right", "neutral", "We had to take the long route."),
  d("SIRA",  "right", "neutral", "Dorath?"),
  d("KAEL",  "right", "neutral", "She's here. Brek is here. Maren. Ryn. Tal."),
  d("SIRA",  "right", "neutral", "Tal."),
  d("KAEL",  "right", "neutral", "She held the passage."),

  n("A pause. Something in Sira's expression shifts â€” not relief exactly, something more specific. The expression of someone who held an uncertain piece of a plan and has just learned it worked."),

  d("SIRA",  "right", "neutral", "Good. Come in. There is something I need to show you â€” all of you â€” before you hear the other thing."),
  d("KAEL",  "right", "neutral", "What other thing?"),
  d("SIRA",  "right", "neutral", "Someone arrived two days ago. I did not know he was coming. I did not know he was ahead of us on the road. He is inside. He says you would know him."),

  n("She pushes open the door to the building. Inside, in the particular light that comes through north-facing windows in the afternoon â€” a figure standing at the far end of the room, in the posture of someone who has been working and has heard people approaching and has stopped working. He turns. And you know him, though he looks different from the Archive. Less careful, perhaps. Or differently careful. A different kind of settled."),

  d("SERATH", "left", "thoughtful", "You took the river route. I wasn't sure you would find the ford."),
  d("KAEL",   "right", "surprised", "Serath."),
  d("SERATH", "left", "neutral", "You are well."),
  d("KAEL",   "right", "neutral", "How are you here before us? You left at noon."),
  d("SERATH", "left", "neutral", "I have been here for a week. I did not take the long route."),
  d("KAEL",   "right", "neutral", "You left markers."),
  d("SERATH", "left", "neutral", "For you. Yes. I left you a long route and took the short one myself."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 14 â€” THE CHOICE SHE MADE  (Week 14 gate)
  // Serath's full account. What he found, what he did, what it cost.
  // The settlement's history â€” evidence in the walls.
  // Cliffhanger: someone completed the method here. Decades ago.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The account happens that evening, after food, after the immediate logistics of seven people in a settlement built for a smaller and different community have been worked out. Serath speaks in the way he always worked at the Archive â€” methodically, moving through each component in order, without asking for reactions until the full picture is present.",
    BG.settlement_interior, false,
    { id: 'a1_seg14', title: 'The Choice She Made', summary: "Serath's account. Why he disappeared. What he did to protect the escape. The settlement's walls contain evidence of something completed decades ago." }
  ),

  d("SERATH", "left", "thoughtful", "The deep records. I found them in the same week Sira did, independently. We compared notes later and realized we had arrived at them through different paths."),
  d("SIRA",   "right", "neutral", "He came through the Aethyn administrative cross-reference. I came through the Unnamed Third notation."),
  d("SERATH", "left", "neutral", "What we found was the same. The detection system. The record of who, at each stage of the Vraen practice, would be visible to someone who knew how to read the signs. And the record of something else: evidence that someone was already using that system inside the Archive."),

  d("KAEL",   "right", "neutral", "Not using it to protect â€” using it to identify."),
  d("SERATH", "left", "neutral", "Using it to compile a list. A list of who in the Archive was progressing in the practice, how far they had gotten, and when they would reach the stage that made them valuable. The list was being built systematically. The information was leaving the Archive through a specific channel."),
  d("MAREN",  "left", "neutral", "A person. Someone with access."),
  d("SERATH", "left", "neutral", "A person I had known for three years. A person you trusted."),

  n("He doesn't say the name and doesn't need to. Maren has it. You can see it in the way she receives the sentence."),

  d("MAREN",  "left", "neutral", "When did you know for certain?"),
  d("SERATH", "left", "neutral", "Two weeks before the fire. I had evidence. Not enough to act on â€” not in any way that would survive scrutiny. And if I acted without enough evidence, the person would know I was watching and adapt."),

  ch("SERATH_DECISION", [
    op(
      "Ask why he didn't tell Maren. She could have helped â€” two people working on the evidence would have been faster.",
      "SERATH_WHY_ALONE",
      [
        d("KAEL",   "right", "neutral", "Why didn't you tell Maren? You didn't have to solve this alone."),
        d("SERATH", "left",  "thoughtful", "I thought about it. Every day. But the person I was watching was inside the Archive. If I told Maren, Maren would have changed her behavior â€” even subtly â€” and the change would have been visible to someone who knew how to read the signs. The value of what I was doing was that I was invisible. Telling Maren would have ended that."),
        d("MAREN",  "left",  "neutral", "He is right about that."),
        d("KAEL",   "right", "neutral", "It doesn't mean you were right to do it alone."),
        d("SERATH", "left",  "neutral", "No. It doesn't."),
        n("He says it without defensiveness. It is a distinction he has already made and is at peace with not having a clean answer to."),
      ],
      null,
      { relationships: { serath: 8, maren: 6 } }  // Holding Serath accountable while hearing his reasoning â€” both respect it
    ),
    op(
      "Ask what he actually did at noon. Not why â€” what, specifically.",
      "SERATH_NOON",
      [
        d("KAEL",   "right", "neutral", "At noon. What did you do?"),
        d("SERATH", "left",  "neutral", "I went to the person. I told them I had found the deep records. I told them I had read the list â€” the full list of what they had compiled and where it was going. I told them that if the fire happened that night, and if the passage was used, and if I found afterward that the passage had been interfered with â€” the information I had about them would go to people who would act on it."),
        d("KAEL",   "right", "neutral", "You threatened them."),
        d("SERATH", "left",  "neutral", "I gave them a choice. The passage stays open, or everything I know becomes public. They chose to let the passage stay open."),
        d("BREK",   "left",  "thoughtful", "And then you left so you couldn't be held responsible for what you knew."),
        d("SERATH", "left",  "neutral", "And because staying was not an option once I had made that move. Yes."),
      ],
      null,
      { relationships: { serath: 10, brek: 5 } }  // Cutting through to the facts â€” Serath opens up; Brek fills in the gap
    ),
    op(
      "Tell Serath directly: he made a decision that put all of you at risk and he had no way of knowing it would work.",
      "SERATH_RISK",
      [
        d("KAEL",   "right", "neutral", "You gambled with our lives. You made a threat that you had no guarantee would work. If they'd called itâ€”"),
        d("SERATH", "left",  "neutral", "Then the passage would have been closed and you would not have gotten out. I know."),
        d("KAEL",   "right", "neutral", "And you did it anyway."),
        d("SERATH", "left",  "neutral", "There was no option that did not carry that risk. I could have done nothing. The passage would have been closed for certain. I chose the risk with a possible outcome over the certainty with no possible outcome."),
        n("You sit with that. It is not a comfortable thing to sit with. But it is the answer he had, and looking at it from where you are now â€” out, safe, here â€” it is difficult to argue that it was wrong."),
      ],
      null,
      { relationships: { serath: -5, maren: 3 } }  // Serath feels the accusation but can't argue it; Maren notes you raised the real risk
    ),
  ]),

  d("SIRA",  "right", "neutral", "There is something else. Why I came here specifically â€” not east in general, not to find Dorath's network. This place."),
  d("KAEL",  "right", "neutral", "The book said you believed the method had been practiced here."),
  d("SIRA",  "right", "neutral", "More than believed. The Unnamed Third records â€” not the fragments Maren moved, the older records â€” they describe this valley. They describe a person who came here. Who stayed here for three years. Who completed the method here and then left a record of having done so."),
  d("MAREN", "left",  "surprised", "A record."),
  d("SIRA",  "right", "neutral", "In the walls. Come."),

  nb(
    "The building she leads them to is the oldest one in the settlement â€” the stone darker, the mortar more worn. Inside, the walls are covered. Not with graffiti, not with casual marks. With text. Hundreds of lines, each written in the same careful hand, organized in columns that run from floor to ceiling on two walls and from the door to the window on the third. The notation is the same as the Vraen fragments. The hand is different from any of the fourteen they carried.",
    BG.settlement_interior, false
  ),

  d("MAREN",  "left", "surprised", "Oh."),
  d("KAEL",   "right", "neutral", "What is it?"),
  d("MAREN",  "left", "thoughtful", "This is a record of the complete practice. Not an instruction set â€” a record. Written by someone who had done it."),
  d("SIRA",   "right", "neutral", "Written after completion. A record of what the practice felt like from inside, at each stage, so that the person who read it would know what to expect."),
  d("SERATH", "left", "thoughtful", "The missing piece. The fragments are instructions. This is â€” a diary of having followed them. A first-person account of what the method is, from the inside of having completed it."),
  d("KAEL",   "right", "neutral", "Who wrote it?"),
  d("SIRA",   "right", "neutral", "That is the question I have been working on since I arrived."),

  n("She goes to the south wall. Near the bottom of the last column of text, a date. Forty years ago, written in a hand that is the same as everything else on the walls. Below the date, a final line."),

  n('"I have written everything I can write. What I cannot write is what it is to have arrived. That will not come through these marks. It will only come through the doing. I hope that whoever stands here next finds that I have left enough of the path visible. I tried to leave all of it."'),

  d("KAEL",   "right", "surprised", "Forty years ago. Someone completed the method forty years ago. In this room."),
  d("MAREN",  "left",  "neutral", "Someone completed the method. And then they left this."),
  d("SERATH", "left",  "thoughtful", "They left it for the next person. Whoever was ready."),
  d("MAREN",  "left",  "thoughtful", "They left it for us."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 15 â€” THE METHOD COMPLETE  (Week 15 gate)
  // The walls. The practice. You attempt the final stage.
  // Cliffhanger: it works. And Maren explains what that means now.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "Three days reading the walls. Not reading exactly â€” the notation requires the same lateral attention the fragments require, each line cross-referencing lines above and below it, the text designed to be approached not sequentially but as a whole system that reveals its meaning only when you can hold enough of it at once to see the pattern. Maren works through it with the focused precision of someone who has been waiting for this for nineteen years. Serath works alongside her. Sira reads sections she has already gone through twice, checking her understanding against what the others find.",
    BG.settlement_interior, false,
    { id: 'a1_seg15', title: 'The Method Complete', summary: 'The walls reveal what the practice is from the inside. You attempt the final stage. It works. And then Maren says what that means.' }
  ),

  n("You read differently. The practice â€” which has been running for weeks now, which has changed the way you receive and hold things â€” meets the text on the walls and does something unexpected: it does not read the text the way you read text. It holds it. Each section arrives with the precision that new things arrive at, exactly, without compression. The wall becomes something you will carry without trying to carry it. Without effort. It is already there as you read it."),

  d("SIRA",  "right", "neutral", "You're doing the thing."),
  d("KAEL",  "right", "neutral", "What thing?"),
  d("SIRA",  "right", "neutral", "The thing that means you've crossed the threshold. I can see it. The way you read is different from three weeks ago."),
  d("KAEL",  "right", "neutral", "How can you see that from outside?"),
  d("SIRA",  "right", "neutral", "The deep records describe it. Maren was right â€” it is visible, once you know what to look for. The reading rhythm changes. The way you move between sections changes. The eyes move differently."),

  n("Brek, who has been working through his own section, looks up."),

  d("BREK",  "left", "thoughtful", "I had it two days ago. The threshold."),
  d("MAREN", "left", "neutral", "Yes. I know. I noticed."),
  d("BREK",  "left", "neutral", "You noticed when?"),
  d("MAREN", "left", "neutral", "The evening of the second day. The way you moved through the fourth wall section."),
  d("BREK",  "left", "neutral", "Mmm. And Sira?"),
  d("MAREN", "left", "neutral", "Three weeks before the fire. She reached it in the Archive."),
  d("BREK",  "left", "neutral", "Serath?"),
  d("MAREN", "left", "neutral", "Four months ago. He was the second."),

  n("Serath does not look up from the wall. He was listening and is now continuing his work, which is the answer in itself: he has already moved past the question of when he reached it."),

  ch("FINAL_PRACTICE", [
    op(
      "Ask Maren to guide you through the final stage â€” the one on the fourteenth fragment, the one nobody has documented from outside.",
      "FINAL_GUIDE",
      [
        d("KAEL",  "right", "neutral", "The fourteenth stage. Can you guide me through it?"),
        d("MAREN", "left",  "thoughtful", "I can describe what the fragment says. What happens when you follow the description â€” that is yours. I cannot describe it from the outside because I have not done it yet."),
        d("KAEL",  "right", "neutral", "Yet."),
        d("MAREN", "left",  "neutral", "Yet. You go first. Tell me what you find."),
        n("The fourteenth fragment describes, in specific and patient language, a practice of consolidation. Not retention â€” you have retention. A practice of unification: taking everything the previous thirteen stages have built and allowing it to settle into a single arrangement that requires no maintenance to hold. Like water finding its level. Not a heroic act. The opposite: a letting-go of the effort of holding, because the holding has become structural."),
        n("You follow the description. You do what it says. And then you do what it says again, more slowly. And then â€” on the third repetition â€” something resolves that has been in the process of resolving since the first week of the practice, something you did not know was in process because it was happening too gradually to notice from inside. It resolves."),
        n("You sit very still for a moment."),
        d("KAEL",  "right", "neutral", "Maren."),
        d("MAREN", "left",  "neutral", "Yes."),
        d("KAEL",  "right", "neutral", "It's done."),
      ],
      null,
      { relationships: { maren: 10 } }
    ),
    op(
      "Attempt it alone, without guidance â€” you have read the fragment, you understand the description. Some things need to be done in private.",
      "FINAL_ALONE",
      [
        n("You go to the building with the walls alone, early in the morning while the settlement is still in the first hour of waking. You read the fourteenth fragment one more time. Then you set it down. You sit in front of the south wall, where the final column of text ends with the date and the last line, and you follow the description."),
        n("The practice of consolidation. Everything the previous stages built. You do not try to force it â€” the fragment is specific about this: the final stage is not done by effort but by allowing the effort to complete. You have been holding things. You stop holding them so deliberately and let them hold themselves."),
        n("The process takes most of the morning. When you come back outside, the light is different. Not the light â€” you are different, slightly, in a way you cannot fully describe except as: quieter. Something that was running has stopped running, and in the silence of it stopping you can hear things more clearly than before."),
      ],
      null,
      { relationships: { sira: 4 } }
    ),
    op(
      "Ask to do it alongside Sira â€” you have been parallel on this road for months without knowing it, and this seems like the right moment to not be separate.",
      "FINAL_WITH_SIRA",
      [
        d("KAEL", "right", "neutral", "Sira. The fourteenth stage. Do you want to do it at the same time?"),
        d("SIRA", "right", "neutral", "I was going to ask you the same thing."),
        n("You and Sira, in the building with the walls, following the fourteenth fragment in parallel. Not speaking. The same practice, separately, in the same room. The consolidation happens at different moments for each of you â€” you know because you are paying attention and you notice when her breathing changes, when the quality of her stillness shifts. She notices the same in you, probably. When it is done you are both quiet for a long time."),
        d("SIRA", "right", "neutral", "There it is."),
        d("KAEL", "right", "neutral", "Yes."),
        d("SIRA", "right", "neutral", "Forty years they waited for someone to stand in this room."),
        d("KAEL", "right", "neutral", "We're here now."),
      ],
      null,
      { relationships: { sira: 15 } }
    ),
  ]),

  n("Maren sits with what you have told her for a long time. She does not pace. She does not take notes. She sits the way she sits when she is organizing something very large and very precise and does not want the organization interrupted by movement."),

  d("MAREN", "left", "thoughtful", "You understand what this means now. You carry something that cannot be taken."),
  d("KAEL",  "right", "neutral", "I understand that."),
  d("MAREN", "left", "thoughtful", "The method is complete. The Archive has done what it was built to do. The building is gone. The instruction set is here, in this room, and hereâ€”"),

  n("She touches the side of her head. The same brief gesture she made on the road east."),

  d("MAREN", "left", "neutral", "What is inside cannot be burned. Cannot be seized. Cannot be lost in any disruption of any building or institution. You are why someone would burn a building."),
  d("KAEL",  "right", "neutral", "Because they cannot control what I carry."),
  d("MAREN", "left", "neutral", "Because they cannot control it, and they cannot take it, and the only remaining option is â€” the only remaining option is you. Not the knowledge. You."),

  n("The fire in the settlement's fireplace is warm. Outside the window the late afternoon light falls on the cleared field. Somewhere in the valley, Brek is running the perimeter â€” you can hear his footsteps at the edge of the cleared ground, the same patient circuit. Whatever he is working out now, it is a new problem. He will get there."),

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // SEGMENT 16 â€” WHAT THE ARCHIVE WAS FOR  (Week 16 gate â€” Final Segment)
  // The full weight of what the Archive was, what it protected, what is next.
  // Dorath's map at the table. A building that should not exist.
  // Act One closes.
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

  nb(
    "The settlement holds seven people for a week. It is not comfortable in the ordinary sense â€” too small, too sparse, too much shared context and too little space between people who are still calibrating their understanding of each other. But it is functional, which is the thing it needs to be. Food, warmth, work. Dorath's logistical competence extends from roads and safe houses to shared living arrangements, and she manages the week with the same efficiency she brings to everything else.",
    BG.settlement_interior, false,
    { id: 'a1_seg16', title: 'What the Archive Was For', summary: 'The Archive was a machine. The paper was not the point. And on Dorath\'s map: a building that should not exist.' }
  ),

  n("Maren works through the walls. She reads everything, cross-references it against the fourteen fragments and the cipher, works outward into Tal's documents and Eran's records. By the fourth day she is working in the state she sometimes worked in at the Archive: hours without speaking, lamp burning low, the particular posture of someone who is completing a picture that has been incomplete for a long time and can finally see the shape of the whole."),

  d("MAREN", "left", "thoughtful", "I want to explain what the Archive was. What it actually was, not what it was described as."),
  d("KAEL",  "right", "neutral", "Go ahead."),
  d("MAREN", "left", "thoughtful", "The Archive was a machine. The building, the collection, the Seekers, the years of study â€” all of it was a single machine for producing a single outcome: people who had completed the Vraen method. Not scholars of the method. Not students of the history of it. People who had done it. Who carried what the practice produces."),
  d("KAEL",  "right", "neutral", "And the paper?"),
  d("MAREN", "left", "neutral", "The paper was instruction. Necessary, but not the thing. The paper is what you need to build the machine and run it. The product of the machine is the people who have done the thing the paper describes. The paper can be burned. The product cannot."),
  d("KAEL",  "right", "neutral", "And the person who burned the buildingâ€”"),
  d("MAREN", "left", "neutral", "Burned the machine. Which slows production significantly. But did not destroy the product, because the product was already out of the building."),

  d("BREK",  "left", "thoughtful", "Us."),
  d("MAREN", "left", "neutral", "You. Sira. Serath. Myself. The four of you who have completed the method. The Archive's purpose has been served. In spite of everything, it has been served."),

  n("She says it without triumph. It is a fact, noted with precision. The Archive is gone. The method is done. The thing the building was for has happened. These are three separate facts and they are all simultaneously true."),

  ch("MEANING_CHOICE", [
    op(
      "Ask what happens now â€” practically. Voss still exists. The person behind the name still wants what you carry.",
      "NEXT_VOSS",
      [
        d("KAEL",  "right", "neutral", "Voss. The name, the decision, the person behind it. What happens now?"),
        d("DORATH", "left", "neutral", "That is what I have been trying to determine for seven years. Now that we are all in the same place, with all the information between us, we are closer than anyone has been."),
        d("MAREN",  "left", "neutral", "The person behind Voss burned the Archive because the Archive was outside their control. They want the method completed under their direction. That has failed. The question is what they do next."),
        d("KAEL",   "right", "neutral", "And what do we do next?"),
        d("MAREN",  "left", "neutral", "We find out who made the decision. Not the people who executed it â€” the person at the center. The one who decided the method was worth burning a building for."),
      ],
      null,
      { relationships: { maren: 6, dorath: 6 } }
    ),
    op(
      "Ask Serath what he thinks â€” he has been closest to the inside of this from the beginning.",
      "NEXT_SERATH",
      [
        d("KAEL",   "right", "neutral", "Serath. You've been inside this longer than any of us. What do you think happens next?"),
        d("SERATH", "left",  "thoughtful", "The decision under the name Voss was made by someone with very specific goals. The burning of the Archive was a means, not an end. The end is acquiring someone who has completed the method. We have not been acquired. That means the means failed. They will try again."),
        d("KAEL",   "right", "neutral", "With a different approach."),
        d("SERATH", "left",  "neutral", "Possibly. Or the same approach, but better executed. We need to know which â€” and we can't know without knowing who made the decision."),
        d("TAL",    "left",  "neutral", "I have been working on that problem for two years. I am not finished. But I am closer."),
      ],
      null,
      { relationships: { serath: 10 } }
    ),
    op(
      "Ask Sira what she learned in the weeks she was here alone, before everyone else arrived.",
      "NEXT_SIRA",
      [
        d("KAEL", "right", "neutral", "Sira. You were here for weeks before us. What did you find?"),
        d("SIRA", "right", "neutral", "The walls. I read the walls twice before anyone arrived. The person who wrote them â€” the one who completed the method forty years ago â€” they left more than a record of the practice. They left a record of what they decided to do afterward."),
        d("KAEL", "right", "neutral", "What did they decide?"),
        d("SIRA", "right", "neutral", "They decided to go somewhere. They describe it in the last section of the east wall, which I didn't read to you because I wasn't sure what to make of it. The person who completed the method forty years ago went east. They went to find the same person behind the decision made under a different name â€” Voss is not the first name this decision has been made under. It has been made before."),
        d("KAEL", "right", "surprised", "How long ago."),
        d("SIRA", "right", "neutral", "The first record is ninety years old. The decision to control who completes the method â€” someone has been making that decision for almost a century."),
      ],
      null,
      { relationships: { sira: 12 } }
    ),
  ]),

  n("On the last evening before they make plans to leave the settlement, Dorath spreads a map on the table. Not her usual road map â€” something larger, a regional document that covers the distance from where they are to the territories east of the settled districts. She has been marking it in the days since her arrival. Small notations in the margins, cross-referenced against Tal's documents and Eran's records and what Sira found in the walls."),

  d("DORATH", "left", "neutral", "These marks are where the Voss network's infrastructure is concentrated. Supply routes, communication nodes, places that have appeared in more than one source independently. You can read a network's center of gravity from this â€” where the lines converge."),
  d("MAREN",  "left", "neutral", "Where do they converge?"),
  d("DORATH", "left", "neutral", "East of the settled districts. A city. Not large â€” not one of the major ones. But it is on three separate routes and mentioned in four of the documents I have cross-referenced."),

  n("She points to a place on the map that is far enough east to be past any territory you recognize. A city marked with a name that means nothing to you. And at the center of the city, in Dorath's small and careful notation, a single mark with a label."),

  n("You lean in to read it."),

  d("KAEL",   "right", "surprised", "What is that mark?"),
  d("DORATH", "left",  "neutral", "A building. Under construction. It appeared in one of Eran's documents from four years ago and in one of Tal's from two years ago. In both cases the description is the same."),
  d("TAL",    "left",  "neutral", "The description in my document came from a traveler who passed through the city two years ago and drew what they saw. They did not know what they were drawing. They just thought it was notable. A large building being constructed in the older quarter. Stone and mortar. Multiple stories. An interior courtyard. A lamp already burning in one of the upper windows, even at midday."),

  n("You look at the description. You read it twice. And then you look at Maren."),

  d("MAREN",  "left", "thoughtful", "They are building one."),
  d("DORATH", "left", "neutral", "An Archive. Or something designed to function as one. Yes."),
  d("KAEL",   "right", "surprised", "They burned the Archive and they are building another one."),
  d("MAREN",  "left", "neutral", "They burned the Archive that was outside their control. They are building the one they will control."),

  n("The fire in the settlement's fireplace burns steady. Outside the window the last light has faded and the valley holds a darkness that is clear and cold and completely still. Seven people around a table. One map. One mark on the map that is, in some way, everything."),

  d("SERATH", "left",  "neutral", "When do we leave?"),
  d("MAREN",  "left",  "neutral", "Two days. I need one more day with the walls."),
  d("DORATH", "left",  "neutral", "I'll work out the route."),
  d("BREK",   "left",  "neutral", "I'll run the perimeter. There is a fourth problem I have been working on since the Archive. I think I am close."),
  d("TAL",    "left",  "neutral", "I'll go through Eran's older documents. There may be more about the city than I realized."),
  d("SIRA",   "right", "neutral", "And the east wall â€” there is one section I have not been able to read. The notation is different from the rest. Older. I want one more day with it."),

  n("They separate to their work. The settlement holds seven people doing seven things in the direction of one. The lamp burns. The method is complete and the road continues. Forty years ago someone sat in the room with the walls and wrote everything they could write and left the path visible. They tried to leave all of it. They did."),

  n("You are here. You carry something that cannot be taken. And somewhere east, in a city you have not yet seen, a building is being constructed around a courtyard with a lamp already burning in one of the upper windows."),

  n("The archive burns. This archive is still being built. And it was built for the same thing the last one was built for â€” which means what it is building toward is the same thing you are."),

]

// â”€â”€â”€ Act registry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const STORY_ACTS = [
  { id: 'act1', title: 'The Archive Burns',   subtitle: 'Act I',   beats: ACT1_BEATS },
  // ACT2_BEATS imported and injected at bottom of this file after act2.js is loaded
  // (see getActBeats â€” it reads from this array once act2.js registers itself)
]

// â”€â”€â”€ Multi-act beat resolution â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Acts register themselves here at import time. Consumers call getActBeats(actId).
const _ACT_BEATS_REGISTRY = {}

export function registerActBeats(actId, beats) {
  _ACT_BEATS_REGISTRY[actId] = beats
  // Also push into STORY_ACTS if not already present
  if (!STORY_ACTS.find(a => a.id === actId)) {
    const meta = {
      act2: { title: 'The Eastern Road',    subtitle: 'Act II'   },
      act3: { title: 'The Spire Ascending', subtitle: 'Act III'  },
      act4: { title: 'The Weight of What Was Carried', subtitle: 'Act IV' },
      act5: { title: 'The Fragments Scatter', subtitle: 'Act V'  },
      act6: { title: 'What Cannot Be Owned', subtitle: 'Act VI'  },
      act7: { title: 'The Age of Ruin Ends', subtitle: 'Act VII' },
    }
    STORY_ACTS.push({ id: actId, ...(meta[actId] || { title: actId, subtitle: actId }), beats })
  }
}

export function getActBeats(actId) {
  if (actId === 'act1') return ACT1_BEATS
  return _ACT_BEATS_REGISTRY[actId] || ACT1_BEATS
}

// â”€â”€â”€ Player character adaptation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// When playing as Sira: protagonist and sibling swap.
// Sira was studying at the Archive; Kael is the one who went missing.
// The story structure is identical â€” only names, pronouns, and sibling role flip.

const SIRA_CHAR_SWAP = { KAEL: 'SIRA', SIRA: 'KAEL' }

// Exact-string replacements â€” more specific strings first to avoid partial clashes.
// These must exactly match strings in ACT1_BEATS above.
const SIRA_TEXT_SUBS = [
  // Maren's explanation of who is missing â€” Kael playthrough names Sira
  [
    "He already knows Sira isn't in the Archive. Sira left two weeks ago â€” she said she had something to follow up, a lead on something she'd been tracking for months. She wouldn't say more than that. That was fine then. It is not fine now.",
    "She already knows Kael isn't in the Archive. Kael left two weeks ago â€” he said he had something to follow up, a lead on something he'd been tracking for months. He wouldn't say more than that. That was fine then. It is not fine now.",
  ],
  // Serath's note â€” "she" refers to Sira in Kael's run, "he" in Sira's run
  [
    '"Follow this. She is not yet where they want her. You have time, but not much."',
    '"Follow this. He is not yet where they want him. You have time, but not much."',
  ],
  // Maren's logic about the watcher â€” refers to Sira in Kael's run
  [
    "Then they already know where she is, or they don't know she exists, and either way your being here won't change it.",
    "Then they already know where he is, or they don't know he exists, and either way your being here won't change it.",
  ],
  // On the road â€” sibling pronoun in Maren's explanation
  [
    "Your sibling left the Archive two weeks ago and said she had a lead on something she'd been tracking for months. She wouldn't say more. I let her go because I thought the timing was coincidental. It was not.",
    "Your sibling left the Archive two weeks ago and said he had a lead on something he'd been tracking for months. He wouldn't say more. I let him go because I thought the timing was coincidental. It was not.",
  ],
  // Sira's book â€” pronoun swaps for Sira playthrough (finding Kael's book)
  [
    "That's Sira's knot.",
    "That's Kael's knot.",
  ],
  [
    "On the first page, in handwriting you know as well as your own: a date from three weeks ago.",
    "On the first page, in handwriting you know as well as your own: a date from three weeks ago.",
  ],
  // Settlement approach â€” who the returning sibling is
  [
    "A figure comes out of the nearest building to watch you approach from the valley's edge. Young â€” mid-twenties â€” with the posture of someone who has been doing sustained work for a long time and whose body has adapted to it. She sees you.",
    "A figure comes out of the nearest building to watch you approach from the valley's edge. Young â€” mid-twenties â€” with the posture of someone who has been doing sustained work for a long time and whose body has adapted to it. He sees you.",
  ],
]

function applyTextSubs(text, subs) {
  let out = text
  for (const [from, to] of subs) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  return out
}

function adaptBeat(beat, charSwap, textSubs) {
  if (beat.type === 'choice') {
    return {
      ...beat,
      options: beat.options.map(opt => ({
        ...opt,
        text:  applyTextSubs(opt.text, textSubs),
        beats: opt.beats.map(b => adaptBeat(b, charSwap, textSubs)),
      })),
    }
  }
  const out = { ...beat }
  if (beat.type === 'dialogue' && charSwap[beat.char]) {
    out.char = charSwap[beat.char]
  }
  if (beat.text) out.text = applyTextSubs(beat.text, textSubs)
  return out
}

/**
 * Returns beats adapted for the chosen protagonist.
 * playerChar: 'kael' (default, no changes) | 'sira' (swap protagonist/sibling)
 */
export function adaptBeatsForPlayer(beats, playerChar = 'kael') {
  if (playerChar !== 'sira') return beats
  return beats.map(b => adaptBeat(b, SIRA_CHAR_SWAP, SIRA_TEXT_SUBS))
}

// Helper: segment key for a given week number (0 = free intro, 1+ = weekly unlocks)
export function storySegmentKey(weekNumber, phase = 1) { return `a${phase}_seg${weekNumber}` }

// â”€â”€â”€ NEW ASSET REQUESTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
//
// â‘  EXISTING (portrait assets from previous sessions) â€” already requested.
//
// â‘¡ NEW BACKGROUND IMAGES needed for Phase 1:
//
// A) public/assets/images/backgrounds/standard/act1_safe_house_interior.jpg
//    Leonardo AI prompt:
//    "Interior of a small stone outbuilding used as a safe house, dim candlelight,
//    rough stone walls with iron lamp hooks, a low wooden table, three crates as
//    seats, dry provisions on shelves, warm amber glow from two oil lamps, fantasy
//    visual novel background, horizontal aspect ratio, atmospheric, painterly style"
//
// B) public/assets/images/backgrounds/standard/act1_forest_path.jpg
//    Leonardo AI prompt:
//    "A narrow forest path through dense old-growth trees, cold morning light
//    filtering through bare branches, soft fog between the trees, grey sky visible
//    through gaps in the canopy, fantasy visual novel background, painterly style,
//    moody and atmospheric, horizontal aspect ratio, muted greens and greys"
//
// C) public/assets/images/backgrounds/wide/act1_settlement_exterior.jpg
//    Leonardo AI prompt:
//    "A hidden stone settlement in a forest valley, seven small stone buildings
//    arranged naturally, smoke from chimneys, cleared fields at the edges, late
//    afternoon light, fantasy visual novel background, wide panoramic aspect ratio,
//    painterly style, warm but subdued palette, sense of age and quiet purpose"
//
// D) public/assets/images/backgrounds/standard/act1_settlement_study.jpg
//    Leonardo AI prompt:
//    "Interior of an old stone room with walls covered in dense handwritten text
//    from floor to ceiling, columns of careful notation, warm lamplight, a
//    fireplace in one corner, stone floor, fantasy visual novel background,
//    horizontal aspect ratio, painterly style, ancient and significant atmosphere"
//
// â‘¢ NEW SFX EXPRESSIONS (for ElevenLabs SFX generator) â€” Priority 4:
//    public/assets/audio/sfx/expressions/
//    gasp_female.mp3     â€” "surprised sharp female intake of breath"
//    gasp_male.mp3       â€” "surprised sharp male intake of breath"
//    exhale_female.mp3   â€” "slow quiet female exhale, relief"
//    exhale_male.mp3     â€” "slow quiet male exhale, relief"
//    sharp_breath_female.mp3 â€” "sudden female sharp breath, realization"
//    sharp_breath_male.mp3   â€” "sudden male sharp breath, realization"
//

// â”€â”€â”€ Generic VO filename stamper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Stamps beat.voFile on every narration/dialogue beat (and nested option branches).
// Convention: {prefix}_s{seg}_{speaker}_{###}.mp3  (e.g. a2_s3_maren_001.mp3)
// Call once per act at module load (story.js runs it for act1; each act file
// runs it for its own beats after calling registerActBeats).
export function attachVoFilesForAct(actId, beats) {
  const prefix    = actId.replace('act', 'a')       // 'act1' â†’ 'a1', 'act2' â†’ 'a2'
  const segPrefix = `${prefix}_seg`                  // 'a1_seg', 'a2_seg', ...
  const counters  = {}
  let   curSeg    = '0'

  function process(bs) {
    if (!Array.isArray(bs)) return
    for (const beat of bs) {
      if (beat.segmentId) curSeg = beat.segmentId.replace(segPrefix, '')
      if (beat.type === 'narration' || beat.type === 'dialogue') {
        const spk   = beat.type === 'narration' ? 'n' : (beat.char?.toLowerCase() || 'n')
        const k     = `${curSeg}_${spk}`
        counters[k] = (counters[k] || 0) + 1
        beat.voFile = `${prefix}_s${curSeg}_${spk}_${String(counters[k]).padStart(3, '0')}.mp3`
      }
      if (beat.type === 'choice' && Array.isArray(beat.options)) {
        for (const opt of beat.options) {
          if (Array.isArray(opt.beats) && opt.beats.length) process(opt.beats)
        }
      }
    }
  }

  process(beats)
}

// Stamp Act 1 VO filenames at module load
;(function() { attachVoFilesForAct('act1', ACT1_BEATS) })()



