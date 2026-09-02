import { useCallback, useMemo } from "react";

import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
export { LandingPageFrame, applyBackgroundPresentation } from "./LandingPageFrame";
export type { LandingPageFrameProps, LandingPageProps } from "./LandingPageFrame";
import {
  ANTHRA_A40_TYPOGRAPHY,
  ATTUNE_TYPOGRAPHY,
  AURELLO_TYPOGRAPHY,
  AXONIS_TYPOGRAPHY,
  BESTSELLERS_TYPOGRAPHY,
  BETAWISE_HERO_TYPOGRAPHY,
  BETAWISE_TYPOGRAPHY,
  COMPLETE_SHELF_TYPOGRAPHY,
  INKBOUND_TYPOGRAPHY,
  ECHO_VALE_TYPOGRAPHY,
  HALVORSEN_TYPOGRAPHY,
  KAGE_TYPOGRAPHY,
  KAIRO_TYPOGRAPHY,
  MK78_KEYBOARD_TYPOGRAPHY,
  MARA_VOSS_TYPOGRAPHY,
  NOEMA_N1_TYPOGRAPHY,
  RENDERLAB_TYPOGRAPHY,
  MENG_TO_SKETCHBOOK_TYPOGRAPHY,
  NOCTURNE_TYPOGRAPHY,
  SYLVA_TYPOGRAPHY,
  TIDECREST_TYPOGRAPHY,
  VOLTA_ATELIER_TYPOGRAPHY,
} from "./pageRecipes";

export function BestsellersBookShowcase(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(BESTSELLERS_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Field Manuals — Tools for Thought"
      sourceUrl="/landing-pages/bestsellers-book-showcase.html"
    />
  );
}

export function KageLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Kage — Where stillness reveals the unseen" sourceUrl="/landing-pages/kage.html" />;
}

export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Working Volumes — Seven Tools for Making" sourceUrl="/landing-pages/complete-shelf-v2.html" />;
}

export function InkboundRiverStory(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(INKBOUND_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="The River Remembers — Inkbound" sourceUrl="/landing-pages/inkbound-river-story.html" />;
}

export function AttuneHero(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(ATTUNE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="attune — Tuned to every visitor" sourceUrl="/landing-pages/attune-hero.html" />;
}

export function KairoLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAIRO_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="KAIRO — Heat With Intent." sourceUrl="/landing-pages/kairo-culinary.html" />;
}

export function VoltaAtelierLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(VOLTA_ATELIER_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Volta Atelier — Creative Design & 3D Studio" sourceUrl="/landing-pages/volta-atelier.html" />;
}

export function MengToSketchbookLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MENG_TO_SKETCHBOOK_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Meng To — Singapore Sketchbook" sourceUrl="/landing-pages/meng-to-sketchbook.html" />;
}

export function RenderLabLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(RENDERLAB_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="RenderLab — Motion House" sourceUrl="/landing-pages/renderlab-motion-house.html" />;
}

export function EchoValeLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(ECHO_VALE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Echo Vale — Follow the signal beneath the stone" sourceUrl="/landing-pages/echo-vale.html" />;
}

export function AurelloLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(AURELLO_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Aurello — Orange Spritz, Ready to Drink" sourceUrl="/landing-pages/aurello-beverage.html" />;
}

export function MaraVossLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MARA_VOSS_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Mara Voss — An Archive of Vanishing Sounds" sourceUrl="/landing-pages/mara-voss.html" />;
}

export function Mk78KeyboardLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(MK78_KEYBOARD_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="MK·78 — Every key. Every detail." sourceUrl="/landing-pages/mk78-keyboard.html" />;
}

export function NoemaN1LandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(NOEMA_N1_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="NOEMA N1 — A machine that listens" sourceUrl="/landing-pages/noema-n1.html" />;
}

export function AnthraA40LandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(ANTHRA_A40_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Anthra A-40 — The titanium automatic" sourceUrl="/landing-pages/anthra-a40.html" />;
}

export function HalvorsenLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(HALVORSEN_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="halvorsen — Interfaces built to disappear" sourceUrl="/landing-pages/halvorsen.html" />;
}
