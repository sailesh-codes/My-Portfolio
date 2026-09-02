import {
  GEIST,
  INSTRUMENT_SERIF,
  NEWSREADER,
  type PageFont,
  type PageInlineStyleOverride,
  type PageTypographyRecipe,
} from "./pageTypography";

/* ═══════════════════════════════════════════════════════════════════════
   One recipe per packaged page.
   ═══════════════════════════════════════════════════════════════════════ */

const n = (value: number) => Number(value.toFixed(3));
const px = (value: number) => `${n(value)}px`;
const unit = (value: number) => `calc(${n(value)} * var(--u))`;

function withAlpha(hex: string, alpha: number) {
  const [red, green, blue] = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/* ── the authored faces ──────────────────────────────────────────────── */

const ONEST: PageFont = {
  value: "onest",
  label: "Onest",
  stack: "'Onest', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
};

const LEXEND: PageFont = {
  value: "lexend",
  label: "Lexend",
  stack: "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const OUTFIT: PageFont = {
  value: "outfit",
  label: "Outfit",
  stack: "Outfit, 'Outfit Fallback', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const SPACE_GROTESK: PageFont = {
  value: "space-grotesk",
  label: "Space Grotesk",
  stack: '"Space Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const QUESTRIAL: PageFont = {
  value: "questrial",
  label: "Questrial",
  stack: '"Questrial", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const ANTHRA_DISPLAY: PageFont = {
  value: "avenir-next",
  label: "Avenir Next",
  stack: "'Avenir Next', 'Futura', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif",
};

const ANTHRA_UI: PageFont = {
  value: "avenir-next",
  label: "Avenir Next",
  stack: "'Avenir Next', 'Helvetica Neue', Arial, sans-serif",
};

const INSTRUMENT_EMBEDDED: PageFont = {
  value: "instrument-serif",
  label: "Instrument Serif",
  stack: "'InstrumentEmb', 'Instrument Serif', Georgia, serif",
};

const INTER_EMBEDDED: PageFont = {
  value: "inter",
  label: "Inter",
  stack: "'InterEmb', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const IOWAN_OLD_STYLE: PageFont = {
  value: "iowan-old-style",
  label: "Iowan Old Style",
  stack: '"Iowan Old Style", Baskerville, "Times New Roman", serif',
};

const INTER_LOADED: PageFont = {
  value: "inter",
  label: "Inter",
  stack: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const GEIST_LOADED: PageFont = {
  value: "geist",
  label: "Geist",
  stack: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const INSTRUMENT_SERIF_LOADED: PageFont = {
  value: "instrument-serif",
  label: "Instrument Serif",
  stack: '"Instrument Serif", Georgia, "Times New Roman", serif',
};

const NEWSREADER_LOADED: PageFont = {
  value: "newsreader",
  label: "Newsreader",
  stack: '"Newsreader", Georgia, "Times New Roman", serif',
};

const FIGTREE: PageFont = {
  value: "figtree",
  label: "Figtree",
  stack: 'Figtree, system-ui, -apple-system, "Segoe UI", sans-serif',
};

const HANKEN_GROTESK: PageFont = {
  value: "hanken-grotesk",
  label: "Hanken Grotesk",
  stack: '"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif',
};

const MULISH: PageFont = {
  value: "mulish",
  label: "Mulish",
  stack: "Mulish, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const DM_SANS: PageFont = {
  value: "dm-sans",
  label: "DM Sans",
  stack: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const ROBOTO_FLEX_LOADED: PageFont = {
  value: "roboto-flex",
  label: "Roboto Flex",
  stack: '"Roboto Flex", "Roboto Condensed", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const INTER_TIGHT: PageFont = {
  value: "inter-tight",
  label: "Inter Tight",
  stack: "'Inter Tight', sans-serif",
};

const SYSTEM_UI: PageFont = {
  value: "system-ui",
  label: "System UI",
  stack: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

const BIG_SHOULDERS_DISPLAY: PageFont = {
  value: "big-shoulders-display",
  label: "Big Shoulders Display",
  stack: "'Big Shoulders Display', sans-serif",
};

const BEBAS_NEUE: PageFont = {
  value: "bebas-neue",
  label: "Bebas Neue",
  stack: "'Bebas Neue', sans-serif",
};

const IMPACT: PageFont = {
  value: "impact",
  label: "Impact",
  stack: "Impact, 'Arial Narrow', sans-serif",
};

const ARCHIVO: PageFont = {
  value: "archivo",
  label: "Archivo",
  stack: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const JETBRAINS_MONO: PageFont = {
  value: "jetbrains-mono",
  label: "JetBrains Mono",
  stack: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
};

const UNBOUNDED: PageFont = {
  value: "unbounded",
  label: "Unbounded",
  stack: "'Unbounded', sans-serif",
};

const MANROPE: PageFont = {
  value: "manrope",
  label: "Manrope",
  stack: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

/* ── Bestsellers ───────────────────────────────────────────────────────────
   The giant italic collection word is the composition's heading. The detail
   title and its mobile ceiling retain their authored proportions. */
export const BESTSELLERS_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [IOWAN_OLD_STYLE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [IOWAN_OLD_STYLE, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "500",
  bodyWeights: ["400", "500", "600", "700"],
  bodyWeight: "400",
  primaryColor: "#c3a47b",
  headingSize: [184, 325, 420],
  bodySize: [12, 17, 24],
  headingLetterSpacing: [-0.12, -0.085, 0.08],
  css: (type) => `
:root {
  --ink: #161616;
  --pink: ${type.primary};
  --pink-bright: ${type.retone("#dbc39c")};
  --periwinkle: ${type.retone("#b7976c")};
}
html, body, .stage { background: #161616 !important; }
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.brand, .hero-word, .detail-title, .cover-title {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.hero-word {
  font-size: clamp(184px, 22vw, ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(52px, 5.7vw, ${px((type.headingSize * 82) / 325)});
  letter-spacing: ${n(type.headingLetterSpacing + 0.03)}em;
}
.detail-description { font-size: clamp(12px, 1.28vw, ${px(type.bodySize)}); font-weight: ${type.bodyWeight}; }
@media (max-width: 900px) {
  .hero-word { font-size: clamp(128px, 28vw, ${px((type.headingSize * 230) / 325)}); }
  .detail-title { font-size: clamp(48px, 10vw, ${px((type.headingSize * 70) / 325)}); }
}
@media (max-width: 560px) {
  .hero-word { font-size: calc(${n(type.headingSize / 325)} * 38vw); }
}
`,
};

export const KAGE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [ONEST, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [ONEST, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "300",
  primaryColor: "#e0231c",
  headingSize: [30, 46, 72],
  bodySize: [13, 17, 24],
  headingLetterSpacing: [-0.06, -0.012, 0.12],
  css: (type) => `
:root {
  --vermilion: ${type.primary};
  --ember: ${type.retone("#ff5a3c")};
}
body { font-family: ${type.body}; }
body, .body, .body-lg, .num { font-weight: ${type.bodyWeight}; }
h1:not(.jp), h2:not(.jp), h3:not(.jp), .display:not(.jp) {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.display { letter-spacing: ${type.headingLetterSpacing}em; }
.h-hero { font-size: clamp(26px, 3.05vw, ${px(type.headingSize)}); }
.h-sec { font-size: clamp(30px, 4vw, ${px((type.headingSize * 60) / 46)}); }
.body-lg { font-size: clamp(14px, 1.02vw, ${px(type.bodySize)}); }
.body { font-size: ${px(Math.max(11, type.bodySize - 3))}; }
`,
};

export const COMPLETE_SHELF_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [IOWAN_OLD_STYLE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [INTER_LOADED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600"],
  headingWeight: "400",
  bodyWeights: ["400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#c87046",
  headingSize: [32, 60, 88],
  bodySize: [10, 12, 18],
  headingLetterSpacing: [-0.1, -0.055, 0.08],
  css: (type) => `
:root { --accent: ${type.primary}; }
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
.selection__title, .detail-title, .editorial-identity strong, .page-status strong {
  font-family: ${type.heading};
  font-weight: ${type.headingWeight};
}
.selection__title {
  font-size: clamp(32px, 3.4vw, ${px(type.headingSize)});
  letter-spacing: ${type.headingLetterSpacing}em;
}
.detail-title {
  font-size: clamp(56px, 6.3vw, ${px((type.headingSize * 107.2) / 60)});
  letter-spacing: ${n(type.headingLetterSpacing - 0.01)}em;
}
.selection__note { font-size: ${px(type.bodySize)}; font-weight: ${type.bodyWeight}; }
.detail-deck { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
`,
};

export const INKBOUND_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [IOWAN_OLD_STYLE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [IOWAN_OLD_STYLE, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#b34f3e",
  headingSize: [96, 166, 240],
  bodySize: [14, 21, 30],
  headingLetterSpacing: [-0.1, -0.062, 0.02],
  css: (type) => `
:root {
  --display: ${type.heading};
  --seal: ${type.primary};
  --seal-dark: ${type.retone("#8d372c")};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
`,
};

export const ATTUNE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [INSTRUMENT_EMBEDDED, NEWSREADER, GEIST],
  bodyFonts: [INTER_EMBEDDED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["300", "400", "500", "600", "700"],
  bodyWeight: "400",
  primaryColor: "#ff7a14",
  headingSize: [40, 66, 96],
  bodySize: [12, 16, 22],
  headingLetterSpacing: [-0.06, -0.02, 0.12],
  css: (type) => `
:root {
  --accent: ${type.primary};
  --accent-hi: ${type.retone("#ffa347")};
  --accent-lo: ${type.retone("#f2610a")};
}
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
`,
};

export const BETAWISE_HERO_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [OUTFIT, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [OUTFIT, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "500",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#1278ff",
  headingSize: [32, 48.8, 76],
  bodySize: [12, 15.9, 24],
  headingLetterSpacing: [-0.06, 0.006, 0.12],
  css: (type) => `
body { font-family: ${type.body}; }
`,
};

export const BETAWISE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [QUESTRIAL, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [QUESTRIAL, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["400", "500", "600", "700"],
  bodyWeight: "400",
  primaryColor: "#1a4dff",
  headingSize: [26, 40.4, 60],
  bodySize: [9, 12.66, 20],
  headingLetterSpacing: [-0.06, -0.01, 0.12],
  css: (type) => `
body { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
`,
};

export const KAIRO_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [MANROPE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [MANROPE, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["500", "600", "700", "800"],
  headingWeight: "800",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#b4261a",
  headingSize: [112, 192, 280],
  bodySize: [12, 16, 24],
  headingLetterSpacing: [-0.1, -0.06, 0.02],
  css: (type) => `
:root {
  --red: ${type.primary};
}
`,
};

export const VOLTA_ATELIER_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [ARCHIVO, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [JETBRAINS_MONO, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["500", "600", "700", "800", "900"],
  headingWeight: "800",
  bodyWeights: ["300", "400", "500", "600", "700"],
  bodyWeight: "400",
  primaryColor: "#fb3732",
  headingSize: [120, 184, 260],
  bodySize: [10, 13, 20],
  headingLetterSpacing: [-0.09, -0.045, 0.04],
  css: (type) => `
:root {
  --signal: ${type.primary};
}
`,
};

export const AXONIS_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [SPACE_GROTESK, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [SPACE_GROTESK, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["320", "400", "500", "600", "700"],
  headingWeight: "320",
  bodyWeights: ["400", "500", "600", "700"],
  bodyWeight: "400",
  primaryColor: "#ff6427",
  headingSize: [14, 25, 34],
  bodySize: [15, 22, 30],
  headingLetterSpacing: [-0.02, 0.112, 0.2],
  css: (type) => `
:root {
  --orange: ${type.primary};
}
`,
};

export const TIDECREST_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [FIGTREE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [HANKEN_GROTESK, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600"],
  headingWeight: "300",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#ffffff",
  headingSize: [30, 46, 72],
  bodySize: [10, 12.8, 20],
  headingLetterSpacing: [-0.1, -0.04, 0.1],
  css: (type) => `
:root {
  --ink: ${type.primary};
}
`,
};

export const NOCTURNE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [MULISH, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [MULISH, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "600"],
  headingWeight: "300",
  bodyWeights: ["300", "400", "600"],
  bodyWeight: "600",
  primaryColor: "#8ea6cc",
  headingSize: [36, 58.4, 84],
  bodySize: [12, 15.7, 22],
  headingLetterSpacing: [-0.08, 0, 0.1],
  css: (type) => `
:root { --ink-dim: ${type.primary}; }
`,
};

export const MENG_TO_SKETCHBOOK_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [INSTRUMENT_SERIF_LOADED, NEWSREADER_LOADED, GEIST],
  bodyFonts: [NEWSREADER_LOADED, GEIST, INSTRUMENT_SERIF_LOADED],
  headingWeights: ["300", "400", "500", "600"],
  headingWeight: "400",
  bodyWeights: ["200", "300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#2b2721",
  headingSize: [20, 30, 48],
  bodySize: [14, 20, 30],
  headingLetterSpacing: [-0.06, 0.01, 0.12],
  css: (type) => `
:root {
  --ink: ${type.primary};
}
`,
};

export const ECHO_VALE_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [UNBOUNDED, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [MANROPE, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600"],
  headingWeight: "500",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#e44b3c",
  headingSize: [56, 107.2, 144],
  bodySize: [12, 16, 24],
  headingLetterSpacing: [-0.1, -0.07, 0.06],
  css: (type) => `
:root { --ember: ${type.primary}; }
`,
};

export const AURELLO_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [BEBAS_NEUE, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [DM_SANS, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#f04a24",
  headingSize: [92, 145, 210],
  bodySize: [14, 18, 25],
  headingLetterSpacing: [-0.06, 0, 0.08],
  css: (type) => `
:root {
  --red: ${type.primary};
}
`,
};

export const MARA_VOSS_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [BIG_SHOULDERS_DISPLAY, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [INTER_LOADED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "700", "800"],
  headingWeight: "600",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "300",
  primaryColor: "#d4552b",
  headingSize: [56, 83.2, 124],
  bodySize: [14, 17.6, 24],
  headingLetterSpacing: [-0.04, 0.02, 0.1],
  css: (type) => `
:root {
  --ember: ${type.primary};
}
`,
};

export const MK78_KEYBOARD_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [SYSTEM_UI, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [SYSTEM_UI, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["400", "500", "600", "650", "700"],
  headingWeight: "650",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#f4581c",
  headingSize: [40, 60, 88],
  bodySize: [13, 16.5, 23],
  headingLetterSpacing: [-0.07, -0.03, 0.06],
  css: (type) => `
:root { --acc: ${type.primary}; }
`,
};

export const NOEMA_N1_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [INTER_TIGHT, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [INTER_TIGHT, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600", "700"],
  headingWeight: "400",
  bodyWeights: ["400", "500", "600", "700"],
  bodyWeight: "500",
  primaryColor: "#6c4cf1",
  headingSize: [34, 50, 76],
  bodySize: [12, 15, 22],
  headingLetterSpacing: [-0.07, -0.028, 0.08],
  css: (type) => `
:root {
  --vio: ${type.primary};
}
`,
};

export const ANTHRA_A40_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [ANTHRA_DISPLAY, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [ANTHRA_UI, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600", "700"],
  headingWeight: "500",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#c2a26a",
  headingSize: [34, 52, 76],
  bodySize: [13, 18, 24],
  headingLetterSpacing: [-0.08, -0.01, 0.08],
  css: (type) => `
:root {
  --brass: ${type.primary};
}
`,
};

export const HALVORSEN_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [OUTFIT, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [OUTFIT, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["200", "300", "400", "500", "600"],
  headingWeight: "400",
  bodyWeights: ["200", "300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#ecebe7",
  headingSize: [56, 96, 136],
  bodySize: [12, 17, 24],
  headingLetterSpacing: [-0.08, -0.031, 0.08],
  css: (type) => `
:root {
  --ink: ${type.primary};
}
`,
};

export const SYLVA_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [LEXEND, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [LEXEND, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["200", "300", "400", "500", "600"],
  headingWeight: "300",
  bodyWeights: ["200", "300", "400", "500"],
  bodyWeight: "300",
  primaryColor: "#ffffff",
  headingSize: [40, 63, 92],
  bodySize: [12, 16.5, 24],
  headingLetterSpacing: [-0.06, -0.006, 0.12],
  css: (type) => `
:root {
  --ink: ${type.primary};
}
`,
};

export const RENDERLAB_TYPOGRAPHY: PageTypographyRecipe = {
  headingFonts: [IMPACT, INSTRUMENT_SERIF, NEWSREADER, GEIST],
  bodyFonts: [INTER_LOADED, GEIST, NEWSREADER, INSTRUMENT_SERIF],
  headingWeights: ["300", "400", "500", "600", "700"],
  headingWeight: "500",
  bodyWeights: ["300", "400", "500", "600"],
  bodyWeight: "400",
  primaryColor: "#02ff6f",
  headingSize: [128, 192, 280],
  bodySize: [12, 14, 20],
  headingLetterSpacing: [-0.09, -0.05, 0.04],
  css: (type) => `
.renderlab-site-header nav > a { font-family: ${type.body}; font-weight: ${type.bodyWeight}; }
`,
  inlineStyles: (type): readonly PageInlineStyleOverride[] => [
    { selector: "body", styles: { "font-family": type.body, "font-size": px(type.bodySize), "font-weight": type.bodyWeight, "--acid": type.primary } },
  ],
};
