---
name: Alex Guseynov Portfolio
description: A grayscale, type-led frontend portfolio built as a deliberate hiring surface.
colors:
  canvas: "#050505"
  surface: "#151515"
  surface-elevated: "#1d1d1d"
  surface-frosted: "#262626b8"
  surface-frosted-hover: "#303030e0"
  border: "#3d3d3d57"
  border-strong: "#61616175"
  ring-soft: "#f0f0f029"
  ring-strong: "#fafafa57"
  accent: "#f5f5f5"
  accent-soft: "#f5f5f529"
  text-strong: "#f4f4f4"
  text-muted: "#bdbdbd"
  text-ghost: "#949494db"
  text-inverse: "#121212"
typography:
  display:
    fontFamily: "\"Space Grotesk\", \"Manrope\", sans-serif"
    fontSize: "clamp(2.55rem, 8.5vw, 5.85rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "clamp(-0.12rem, -0.35vw, -0.24rem)"
  headline:
    fontFamily: "\"Space Grotesk\", \"Manrope\", sans-serif"
    fontSize: "clamp(2.45rem, 4.4vw, 5rem)"
    fontWeight: 680
    lineHeight: 0.9
    letterSpacing: "clamp(-0.08rem, -0.28vw, -0.18rem)"
  title:
    fontFamily: "\"Space Grotesk\", \"Manrope\", sans-serif"
    fontSize: "clamp(1.7rem, 4.1vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "clamp(-0.05rem, -0.18vw, -0.11rem)"
  body:
    fontFamily: "\"Manrope\", \"Segoe UI\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "\"IBM Plex Mono\", ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  pill: "999px"
  panel: "1.1rem"
  section: "1.6rem"
  stage: "1.35rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.text-strong}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.25rem"
    height: "3rem"
  button-secondary:
    backgroundColor: "{colors.surface-frosted}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.pill}"
    padding: "0.875rem 1.25rem"
    height: "3rem"
  chip:
    backgroundColor: "{colors.surface-frosted}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.pill}"
    padding: "0.375rem 0.75rem"
  section-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.section}"
    padding: "1.5rem"
---

# Design System: Alex Guseynov Portfolio

## 1. Overview

**Creative North Star: "Interactive Frontend Dossier"**

This portfolio should feel like a senior frontend engineer's dossier rendered as a deliberate interface: dark, restrained, highly legible, and confident enough to let typography and structure do most of the persuasion. It is not a decorative resume page and not a startup landing page pretending to be one. The visual system should frame hiring evaluation as a calm, high-signal reading experience where implementation quality is visible at a glance.

The system is grayscale by design. Pitch black background, white and gray surfaces, crisp type hierarchy, and subtle separation are the primary tools. Weight, line, border, and pacing matter more than color. Motion should stay purposeful and sparse, with the first viewport reserved for a future interactive canvas hero that may introduce sound and game-like behavior before the rest of the portfolio content begins.

It explicitly rejects generic template portfolios, overdone SaaS landing page conventions, playful junior developer aesthetics, corporate resume pages, and AI-generated dark glass UI patterns where glow, blur, and cards substitute for judgment.

**Key Characteristics:**
- Pitch black canvas with grayscale surfaces only.
- Typography-led hierarchy where font weight and line treatment carry emphasis.
- Rounded but controlled containers and tactile pill controls.
- Dense-but-readable dossier sections after a more immersive first-screen hero stage.
- Motion and sound treated as optional enhancements, never as required comprehension.

## 2. Colors

The palette is an intentional grayscale system: black for atmosphere, charcoal for structure, white for action, and layered grays for reading rhythm.

### Primary
- **Signal White** (`#f5f5f5`): The brightest interactive color in the system. Use it for primary CTAs, active progress, focus-adjacent emphasis, and moments that need immediate clarity without introducing a second hue.

### Neutral
- **Pitch Canvas** (`#050505`): The global page field and deepest negative space. It sets the tone for the entire portfolio and should remain dominant.
- **Charcoal Surface** (`#151515`): The default section shell and primary contained surface for dossier content.
- **Raised Graphite** (`#1d1d1d`): A slightly lifted neutral for local contrast inside the darker field.
- **Frosted Ash** (`#262626b8`): Soft translucent neutral for secondary buttons, chips, and utility controls.
- **Bright Copy** (`#f4f4f4`): Main headings, high-priority text, and white-filled CTAs.
- **Quiet Copy** (`#bdbdbd`): Body copy, summaries, and supporting explanations.
- **Ghost Copy** (`#949494db`): Labels, metadata, indices, and low-priority UI signals.

### Named Rules
**The Grayscale Commitment Rule.** Do not solve hierarchy by adding color. Solve it with contrast, weight, spacing, borders, and restraint.

**The Pitch Black Rule.** The background stays black or near-black. Do not introduce warm beige, colored bands, blue glows, or novelty gradients.

**The White Is the Accent Rule.** White is not the default answer for everything. Its force comes from selective use on CTA fills, active states, and high-priority headings.

## 3. Typography

**Display Font:** Space Grotesk, with Manrope fallback.
**Body Font:** Manrope, with Segoe UI fallback.
**Label/Mono Font:** IBM Plex Mono, with ui-monospace fallback.

**Character:** The pairing should feel technical, modern, and tightly controlled. Space Grotesk carries the visual signature, Manrope keeps dense reading calm, and IBM Plex Mono makes metadata feel intentional rather than decorative.

### Hierarchy
- **Display** (700, `clamp(2.55rem, 8.5vw, 5.85rem)`, 0.86): Hero identity, future interactive-stage headings, and the highest-impact statements only.
- **Headline** (680, `clamp(2.45rem, 4.4vw, 5rem)`, 0.9): Major section statements and large editorial transitions.
- **Title** (600, `clamp(1.7rem, 4.1vw, 2.8rem)`, 0.98): Section card titles, project names, and strong interior headings.
- **Body** (400, `1rem`, 1.75): Hiring context, experience detail, strengths, and contact copy. Keep sustained reading within roughly 65-75ch.
- **Label** (400, `0.72rem`, `0.22em`, uppercase): Section indices, metadata, navigation hints, and compact structural cues.

### Named Rules
**The Weight Before Ornament Rule.** If emphasis is needed, try font weight, scale, or line-length contrast before adding decorative treatment.

**The Hero Compression Rule.** Tight tracking and compressed line-height belong to display text only. Body copy must remain open, steady, and easy to scan.

## 4. Elevation

This system uses tonal layering first and shadows second. Most depth should come from black-on-charcoal separation, thin white borders, and subtle rings. Shadows exist, but they are quiet and structural. The future hero stage can feel more immersive, yet it should still remain grounded in grayscale planes rather than theatrical glow.

### Shadow Vocabulary
- **Soft Ring** (`0 0 0 1px rgba(240, 240, 240, 0.16)`): Default containment for panels, cards, and reusable surfaces.
- **Strong Ring** (`0 0 0 1px rgba(250, 250, 250, 0.34)`): Hover, focus-adjacent reinforcement, and active controls.
- **Floating Surface** (`inset 0 0.5px 0 0.5px rgba(242, 242, 242, 0.08), 0 18px 40px rgba(0, 0, 0, 0.26)`): Elevated buttons, compact panels, and controls that visually float.
- **Section Shell** (`0 0 0 1px rgba(244, 244, 244, 0.1), inset 0 0.5px 0 rgba(255, 255, 255, 0.04), 0 28px 60px rgba(0, 0, 0, 0.34)`): Major dossier shells and high-importance containers.

### Named Rules
**The Border First Rule.** Reach for border contrast or a ring before reaching for a larger shadow.

**The No Decorative Glow Rule.** Glow, blur, and bloom are not the visual concept. If the future hero uses light effects, they must support the interaction, not replace typography and structure.

## 5. Components

Components should feel tactile, exact, and production-minded. The site can become more interactive over time, but the control language should stay coherent: rounded, restrained, and readable under hiring pressure.

### Buttons
- **Shape:** Fully pill-shaped controls (`999px`) with a compact but confident footprint.
- **Primary:** White fill, dark text, thin ring support, and concise icon-plus-label composition. This is for direct action such as email or CV access.
- **Secondary:** Frosted dark fill, white text, soft border, and slight hover lift. It should feel useful, not promotional.
- **Hover / Focus:** Hover may lift slightly. Focus must remain obvious on black and use strong grayscale contrast even without color.

### Chips
- **Style:** Small pill chips with soft dark fill, subtle border, and muted text.
- **State:** Informational by default. They should help scanning, not compete with CTA emphasis.

### Cards / Containers
- **Corner Style:** Rounded, controlled corners (`1.1rem` to `1.6rem`) with larger radii for major section shells than for internal elements.
- **Background:** Charcoal and graphite surfaces over the pitch canvas.
- **Shadow Strategy:** Ring at rest, stronger ring or slight lift on interactive states only.
- **Border:** Thin white or soft-gray edge treatment. Colored side stripes are forbidden.
- **Internal Padding:** Tight enough to feel efficient on mobile, more generous on desktop for reading rhythm.

### Inputs / Fields
- **Style:** No formal field system is active yet. If added later, inputs should use dark fills, light text, rounded corners, and strong visible focus.
- **Focus:** High-contrast ring and outline behavior that survives grayscale and reduced-contrast environments.
- **Error / Disabled:** Error states cannot rely on hue alone. Disabled states must visibly lower contrast and pointer affordance.

### Navigation
- **Style:** Navigation should read as precise metadata rather than app chrome. Mono labels, progress indicators, and compact action groups are the right language.
- **Mobile Treatment:** Sticky progress or section wayfinding can use frosted dark panels, but clarity matters more than novelty.

### Signature Component: Hero Stage

The first viewport should be treated as a reserved stage for a future interactive canvas or game-like hero with optional sound. It should feel immersive without becoming noisy. The interaction should establish craft and curiosity quickly, then transition cleanly into the dossier sections below.

### Signature Component: Section Dossier Card

The core content container is a structured dossier card: section index, strong heading, concise summary, and evidence below. It should feel like a composed reading unit, not a generic marketing card.

## 6. Do's and Don'ts

### Do:
- **Do** keep the palette grayscale: pitch black background, white and gray text, and charcoal surfaces only.
- **Do** make hierarchy through font weight, size, line-height, and spacing before inventing decorative treatments.
- **Do** preserve an obvious contact path through email, CV, GitHub, and LinkedIn actions.
- **Do** keep future hero animation and sound optional, interruptible, and respectful of reduced-motion expectations.
- **Do** use specific frontend evidence: React, TypeScript, Vue, UI systems, modernization, testing, and practical AI-assisted delivery.

### Don't:
- **Don't** create a generic template portfolio that feels interchangeable across developers.
- **Don't** use overdone SaaS landing page conventions, including inflated claims, decorative metric blocks, and empty conversion language.
- **Don't** make the site feel like a playful junior developer portfolio.
- **Don't** reduce the site to a corporate resume page or static CV.
- **Don't** use AI-generated dark glass UI patterns where glow, blur, and cards substitute for judgment.
- **Don't** introduce colored side-stripe borders, gradient text, heavy glassmorphism, or identical icon-card grids.
- **Don't** break the grayscale palette with blue accents, warm beige surfaces, purple gradients, or other decorative color additions.
