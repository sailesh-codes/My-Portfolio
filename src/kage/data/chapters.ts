export interface ChapterData {
  id: string;
  number: string;
  kanji: string;
  reading: string;
  title: string;
  subtitle: string;
  elevation: string;
  lensSpec: string;
  coordinates: string;
  quote: string;
  narrative: string[];
  image: string;
  audioKey: 'threshold' | 'ascent' | 'stillness' | 'craft' | 'afterlight';
  specs: { label: string; value: string }[];
}

export const CHAPTERS: ChapterData[] = [
  {
    id: 'threshold',
    number: '01',
    kanji: '鳥居の閾',
    reading: 'TORII NO SHIKI',
    title: 'Threshold of Torii',
    subtitle: 'The Outer Sanctuary & Mist Gate',
    elevation: '340m SL',
    lensSpec: '35mm · f/1.4 · ISO 400',
    coordinates: '35.0116° N, 135.7681° E',
    quote: 'Before the mountain speaks, the red wood demands silence.',
    narrative: [
      'At the foot of Mount Higashiyama, towering vermilion timbers mark the boundary between the mortal realm and the shrouded sanctuary above.',
      'As evening rain washes over ancient cedar moss, light cold fog descends through the canopy. The scent of damp hinoki cypress fills the night air.'
    ],
    image: './assets/chapter1.jpg',
    audioKey: 'threshold',
    specs: [
      { label: 'ARCHITECTURAL TYPE', value: 'Myōjin Torii (Vermilion Cypress)' },
      { label: 'ATMOSPHERIC PRESSURE', value: '1013.2 hPa · High Humidity' },
      { label: 'ESTABLISHED ERA', value: 'Late Muromachi Period (c. 1482)' }
    ]
  },
  {
    id: 'ascent',
    number: '02',
    kanji: '石燈籠の道',
    reading: 'ISHIDŌRŌ NO MICHI',
    title: 'Ascent of Lanterns',
    subtitle: 'Winding Stone Steps & Soft Amber Flame',
    elevation: '490m SL',
    lensSpec: '50mm · f/1.2 · ISO 250',
    coordinates: '35.0132° N, 135.7704° E',
    quote: 'Three hundred stone steps carved by rain, illuminated by a single warm candle flame inside each tōrō.',
    narrative: [
      'Each stone tread is uneven, worn down by six centuries of pilgrims. Flanking the path, mossy stone lanterns glow like amber embers in the dark.',
      'Cold blue moonlight filters through black pine needles, casting long rhythmic shadows across the ascending stairway.'
    ],
    image: './assets/chapter2.jpg',
    audioKey: 'ascent',
    specs: [
      { label: 'LANTERN COUNT', value: '108 Tōrō (Kasuga-dōrō Style)' },
      { label: 'ELEVATION GAIN', value: '+150 Vertical Meters' },
      { label: 'SURFACE MATERIAL', value: 'Weathered Granite & Lichen' }
    ]
  },
  {
    id: 'stillness',
    number: '03',
    kanji: '静寂の庭',
    reading: 'SEIJAKU NO NIWA',
    title: 'Courtyard of Silence',
    subtitle: 'Raked White Sands & Moonlit Boulders',
    elevation: '620m SL',
    lensSpec: '24mm · f/2.0 · ISO 100',
    coordinates: '35.0148° N, 135.7725° E',
    quote: 'In the stillness of raked gravel, the reflection of the moon moves without stirring the water.',
    narrative: [
      'A vast karesansui dry landscape garden stretches before the main hall. Concentric ripples raked into white granite sand mirror oceanic waves.',
      'Dark volcanic boulders rest like sleeping sea beasts under the quiet watch of a solitary weeping maple.'
    ],
    image: './assets/chapter3.jpg',
    audioKey: 'stillness',
    specs: [
      { label: 'GARDEN ARCHITECTURE', value: 'Karesansui Dry Landscape' },
      { label: 'GRAVEL COMPOSITION', value: 'Crushed Shirakawa White Granite' },
      { label: 'KEY STONE ARRANGEMENT', value: 'Sanzon-seki (Triad Rocks)' }
    ]
  },
  {
    id: 'craft',
    number: '04',
    kanji: '組子と木工',
    reading: 'KUMIKO TO MOKKŌ',
    title: 'Lattice & Sacred Craft',
    subtitle: 'Shoji Screens & Cypress Joinery',
    elevation: '710m SL',
    lensSpec: '85mm · f/1.8 · ISO 320',
    coordinates: '35.0161° N, 135.7749° E',
    quote: 'Without a single iron nail, thousands of cedar strips lock together to weave geometric light.',
    narrative: [
      'The hall doors feature intricate Kumiko latticework. Intersecting pine strips form delicate hemp-leaf (Asanoha) patterns without glue or fasteners.',
      'Warm oil lamps inside the inner sanctum cast soft geometric shadows through handmade translucent mulberry paper.'
    ],
    image: './assets/chapter4.jpg',
    audioKey: 'craft',
    specs: [
      { label: 'JOINERY TECHNIQUE', value: 'Kigumi (Nail-less Wood Assembly)' },
      { label: 'WOOD SPECIES', value: 'Yoshino Cedar & Hinoki Cypress' },
      { label: 'PAPER MEDIA', value: 'Handmade Echizen Washi Paper' }
    ]
  },
  {
    id: 'afterlight',
    number: '05',
    kanji: '朱月の頂',
    reading: 'SHUGETSU NO ITADAKI',
    title: 'Summit of the Vermilion Moon',
    subtitle: 'Overlooking Kyoto Valley Afterlight',
    elevation: '820m SL',
    lensSpec: '28mm · f/1.4 · ISO 160',
    coordinates: '35.0180° N, 135.7770° E',
    quote: 'From the highest wooden stage, the entire valley sleeps beneath a vast crimson moon.',
    narrative: [
      'Reaching the temple summit balcony, the mountain opens into an infinite vista. Below, distant Kyoto city lights glimmer through sea-fog clouds.',
      'Above, a massive vermilion moon dominates the night sky, tinting the mountain ridges in deep violet and warm ember hues.'
    ],
    image: './assets/chapter5.jpg',
    audioKey: 'afterlight',
    specs: [
      { label: 'BALCONY STRUCTURE', value: 'Kiyomizu-zukuri Cantilever Stage' },
      { label: 'VISIBILITY RANGE', value: '38 Kilometers across Valley' },
      { label: 'LUNAR PHASE', value: 'Crimson Full Moon (Supermoon)' }
    ]
  }
];

export const MANIFESTO = {
  title: 'KAGE 影 — THE ART BOOK MANIFESTO',
  kanji: '幽玄と美学',
  colophon: 'EDITION 01 · KYOTO MOUNTAIN WALK · 2026',
  text: [
    'Kage (影) was conceived not as a digital product, but as a living editorial monograph — a quiet sanctuary carved out of the noisy web.',
    'Every beam, lantern flame, stone step, and rain droplet is procedurally generated in WebGL shaders to evoke Yūgen (幽玄) — a deep, mysterious grace that cannot be spoken, only felt.',
    'Design, sound, and technology coalesce into a single meditative night journey.'
  ],
  credits: [
    { role: 'CREATIVE DIRECTION & CODE', name: 'Antigravity Studio' },
    { role: '3D GRAPHICS & SHADERS', name: 'WebGL & Three.js Custom Engine' },
    { role: 'SOUND DESIGN', name: 'Procedural Web Audio Engine' },
    { role: 'TYPOGRAPHY', name: 'Editorial Serif & Authentic Kanji' }
  ]
};
