# SOSA: THE GRAVE THAT WOULDN'T TAKE ME

A vanilla HTML5 / CSS / JS dark urban fantasy visual novel with turn-based JRPG combat. Chapters 1–5 plus Chapter 6's opening and first complete civic-evidence conflict are playable. The Texas-to-Utica bridge includes the 48-hour Greyhound trip rather than cutting directly from departure to arrival. Internal `act1`–`act5` route IDs remain for save compatibility; new Chapter 6 scenes live in their own data module.
No frameworks. No build step. No npm dependencies or bundlers.
Open `index.html` directly in a browser — or serve the directory statically and play.

Rated M. Coarse language, drug use, violence, raw human fear, adult themes.

## Controls & Accessibility

- **VN Dialogue & First Read**: Tap/click anywhere to advance. In-person conversations alternate one speaking character per card; neutral movement receives narrator cards instead of sitting beneath the wrong portrait. Authored first terms support 520 ms Ypsilon Gloss holds. Long CG prose is split across phone-sized cards.
- **VN Sound/Visual Cues**: Movement, impact, weather, phone, restraint, interference, and manifestation beats trigger paired procedural audio and brief atmospheric overlays.
- **Sever FX**: Shrine auto-slashes and Dismantle measure the selected enemy card’s real viewport center before drawing. Thin travel lines, dark displacement shadows, and delayed razor-cross marks stay on the target; global off-target spray was removed. Black Flash retains its dedicated black-violet time stop, spatial cross-cut, Zone ignition, music vacuum, and layered impact sound.
- **Discord / Phone**: Tap DM threads and message feeds to scroll and continue. The early Utica route now includes a seven-thread DM list plus extended private conversations with Mochaviolet, Honeyvenom, and Cloudnymph, showing remembered details, reciprocal care, active flirting, concealed overlap, and Sosa receiving support back.
- **Combat**: Select an enemy target (Trace lock), then choose up to 4 priority actions from the grid. Press and hold any action for roughly half a second to open its Combat Codex explanation; release after a hold will not fire the move.
- **Battle Presentation**: Plot-bearing openings pause for acknowledgement. Encounter fields now layer scene-specific silhouettes—fence, bedroom door, cracks, devices, conveyor, warming doors, condemned windows, or Formalcraft grids—over the psychedelic field. Pall, Knell, Spall, Slag, Archon/Egregore, and human attacks have distinct telegraphs and family-specific death dissolves.
- **Audiovisual Language**: Seven locally bundled Google Font families cast each channel without runtime network requests: Newsreader for prose/thought; IBM Plex Sans for humans/UI; Plex Sans Condensed for Kessler; Plex Mono for Knell/Egregore/Omnis; Barlow Condensed for Spall/Slag; Cormorant Garamond for Pall; Cinzel for Archon/world-law/display. SIL OFL files live beside the WOFF2 assets. Future-aware Sosa cards are labeled `SOSA // LOOKING BACK` with a separate amber memory treatment. Procedural battle music uses original multi-part 8–9.6 second forms; VN profiles are louder while retaining independent BGM control.
- **Imperial Privilege (False): C**: Narratively identified, mechanically deferred. Sosa briefly asserts a competence he does not own while borrowed recognition and Somnus correction make the claim resemble skill. A generic damage-reduction prototype was rejected; any future use must be contextual, contradicable, and unable to grant magecraft, unique Skills, parameters, or permanent knowledge.
- **Accessibility & Settings**: Accessible from the Title Screen and pause menu. Offers Mute/Audio Volume controls, Reduced Motion, Disable Screen Shake, High Contrast mode, Reduced Flashes, and independent BGM/SFX volume controls. Automatically honors system `prefers-reduced-motion`. VN, phone, DM, and voice-call advance surfaces support Enter/Space; runtime iframes are titled for assistive technology.

## System Architecture & File Layout

```
index.html              Main static HTML entry point
cg_stats_scan.html      Act 4 Egregore audit iframe UI

js/                     Modular JavaScript Architecture
  ├── data/
  │   ├── core.js       Roster, player defaults, enemies, skills, encounters, boss metadata
  │   ├── act1.js       Act 1 canonical scene script
  │   ├── act2.js       Act 2 canonical scene script
  │   ├── act3.js       Act 3 canonical scene script
  │   ├── act4.js       Act 4 canonical scene script
  │   ├── act5.js       Act 5 script plus save-compatible Chapter 6 opening route IDs
  │   ├── act6.js       Chapter 6 continuation and judgment-cut progression
  │   └── battle-dialogue.js  Enemy/Sosa mobile cut-ins and victory cards
  ├── audio.js          Web Audio API procedural sound engine & synth loops
  ├── fx.js             Visual feedback, screen shake, particle effects
  ├── game-core.js      Game engine initialization, scene routing, localStorage save system
  ├── game-battle.js    Combat loop, Interception Guard, Debt, damage calculations
  ├── game-enemies.js   Enemy AI Intent selection, move pools, status effects
  ├── game-bosses.js    Boss field laws, material anchors, desperation behavior
  ├── game-states.js   Hellstep, Shattering, Stín emergency support, Graveframe & Grave
  └── render.js         DOM rendering for VN, Discord, combat views & settings

css/                    Modular CSS Stylesheets
  ├── base.css          Reset, CSS variables, typography & layout root
  ├── title.css         Title screen & main menu styling
  ├── story.css         Visual Novel text box, speaker tags & avatars
  ├── discord.css       Phone container, status bar & DM layout
  ├── battle.css        Combat scene, enemy slots, Intent indicators & HUD
  ├── effects.css      Particle animations, overlays & screen shakes
  └── accessibility.css Mobile breakpoints (360px–480px), reduced motion & contrast

assets/                 Game sprites, backgrounds, full-bleed CG art
assets/fonts/           Self-hosted Latin WOFF2 fonts, OFL licenses, source README
docs/                   Master dossier, ecology taxonomy, handoff GDDs
sosa_game.zip           Master itch.io distribution archive root
```

## Mechanics at a Glance (Updated 2026-07-20 Release-Candidate Pass)

**Debt changes**:
- Dismantle: +3 Debt
- Cleave: +7 Debt, one-round recalibration (committed armor/mass answer; not a default spam attack)
- Early encounters are paced for roughly 5–7 player input beats without premature Graveframe.

- **HP**: Health bar. 0 = Defeat / Battle Continuation check.
- **Patch Job**: After the first manifestation, a victory restores up to 15 HP through breathing room and Somnus releasing emergency compression. It is not healing magic and does not reduce Debt. Major time skips provide separate story recovery checkpoints.
- **Interception Guard & Armor Shell**: Two-layer defense system. Guard pips absorb hit impacts (1 pip = guaranteed block). On breach, armored damage leaks at 35%, unarmored damage at 55%, and an open defense takes 100%.
- **Debt & Tiers**: Spending Debt represents borrowed ontological weight.
  - *Stable (0-33%)*: 4 Guard pips.
  - *Balanced (34-66%)*: 5 Guard pips.
  - *Carried (67-79%)*: 6 Guard pips, Shrine x1.25.
  - *Overload (80-99%)*: 6 Guard pips, Shrine x1.35, Autonomy Drift (+1 per hit).
  - *Threshold (100%)*: Forces Graveframe mode.
  - Long, materially safer time skips now settle Debt to authored checkpoints (15–35) instead of carrying near-Threshold values across days or weeks; tightly connected fights still retain pressure.
- **False Eyes / Trace**: The Eyes can read living or nonliving structures, but only when real stress, committed motion, reinforcement, repetition, contradiction, ritual, or damage has loaded a fault. Passive awareness feels like pressure or wrongness; the Ypsilon Veil resolves one candidate and Trace commits it, suppressing the rest. Ordinary glasses are not suppression lenses. Broad simultaneous lines are an overload/Graveframe state.
- **Veil progression**: Raw Act 1 has no combat HUD. First Cut produces partial AR: qualitative HP, Presence/Focus/Traced labels, six visible hazy Interception pips, and target Read depth. The Censor/Omnis exposure later enables exact HP, Debt, armor, intent, impact, and classification. The event log remains hidden until full Omnis-derived translation.
- **First Resonance / Black Flash**: The first deliberate February hunt forces a successful, non-expiring awakening that breaks Ice Mortar. The tunnel sends Pall/Spall reinforcements; a one-encounter LCK EX Cascade grants two additional timing windows whose inputs can still be missed. A dynamic aftermath records one, two, or three Black Flashes. Later direct Dismantle/Cleave returns to a rare 4% convergence chance. Landing one creates a three-round `IN THE ZONE` state at 120% direct-Sever output; Zone chance is 10%, then 24%/38%/52% after consecutive Black Flashes. A normal hit or different action breaks the streak, not the remaining Zone duration. Timing windows are 2.8/2.4/2.0 seconds by Debt tier, or 3.4 seconds with Reduced Motion.
- **Sever toolkit**: Dismantle is low-Debt precision with target-specific Trace Depth: first read establishes 1/3, second cut gains 20%, third gains 50% and resets. Cleave adapts to armor and mass, costs +7 Debt, and recalibrates for one round. Web controls every body for two exchanges, lowers output, shortens barrages, grounds field moves, pins relationships/load maps, leaves two Cut Ash layers, and settles for three turns.
- **Cut Ash / Furnace (0–3)**: Cut Ash uses three dedicated CSS aperture-pips rather than generic diamonds. Before naming, 3/3 reads `APERTURE UNCLAIMED`. After April 20 unlock, the sealed Furnace slot fills those pips; at 3/3 it transforms into a luminous `OPEN` button labeled `FURNACE READY · RELEASE ALL TARGETS`. Uses alter structural, housing, wage, or scene aftermath.
- **Early command progression**: First Refusal exposes only Refuse. After Somnus manifests but before Trace/naming, combat exposes both `REFUSE` and `UNNAMED CUT`, giving the player target/damage agency without pretending Sosa understands the technique. Refuse disappears permanently when Trace and Dismantle are named.
- **Victory progression**: First clears award contextual Field EXP, Field Level progress, a recovered/preserved result, and one ecology lesson. Rewards are working outlets, maps, evidence, trust, routes, and knowledge—not coins dropped by monsters. Somnus reactions appear only on major character beats rather than every result card.
- **Graveframe (Threshold Failure-State)**: When Debt reaches 100%, Somnus takes control. Graveframe uses a separate monochrome/angular UI centered on Control and Collateral, with `ANCHOR`, `STEER`, and `LET HIM`.
- **Enemy intent pipeline**: Enemy actions resolve through tested normalization, Web/disruption control, announcement, Interception Guard, damage/effect, and finalization stages. All encounter-referenced effects have registered handlers; blocked attacks and Web-grounded fields cannot leak attached conditions.
- **Held-focus notes**: Pressing and lingering on an action opens an in-world Ypsilon Veil field note. Developer-facing “hold inspect,” “AoE,” and similar helper language has been replaced with diegetic seam/residue wording.
- **The Grave That Wouldn't Take Me (Reality Marble)**: Rare, narrative-enabled emergency field expansion. All hostiles auto-Traced, Shrine sweeps all enemies, and lethal hits redirect to Grave Integrity pips instead of killing Sosa. It remains distinct from Graveframe, and its eventual chapter placement is not locked to Chapter 6.

## Canonical Documentation

Only three lore/design documents are maintained:

- `docs/SOSA_DEFINITIVE_DOSSIER.md` — Sosa, Somnus, relationships, chronology, powers, and art locks
- `docs/WORLD_TAXONOMY_ECOLOGY.md` — Egregore, Dross, Archons, practitioner failures, sources, and aftercare
- `docs/MASTER_GDD_HANDOFF.md` — current implementation contract, audit findings, QA gates, and prioritized roadmap

Historical revision deltas have been removed; these documents describe the current build directly.

## Threat Scale and Chapter Language

- Player-facing structure is **Chapter**, not Act. Internal `act*` route IDs remain unchanged to protect saves.
- Threat is matchup-based rather than a single power number. An **Archon** exceeds a Censor Scout in territory, ontology, and civilian-scale danger; a Scout is more disciplined and may carry purpose-built containment counters.
- Dross can undergo **Molt** within its own ecology: **Pall → Nifl**, **Spall → Atlas**, **Knell → Relay**, and **Slag → Overtime**. Pall replaces the retired generic public name Rime; internal `rime*` compatibility IDs remain. These are not automatic stages. Archon formation additionally requires territory, a material anchor, social surrender, coherent voice, and a world-law.
- Mixed Type-I bodies can **Crossfeed** without becoming a new species. In the April 10 encounter, Pall preserves Spall, Spall powers Knell, and Knell divides Sosa’s attention. Two uninterrupted exchanges restore all three and add Debt; Web or destroying one family cuts the loop.
- Authored reinforcement waves remain inside battle: late Texas and early Utica Pall packs refill once, Nifl opens two new cold accounts at half health, First Resonance calls Pall/Spall reinforcements, and Overtime clocks in one replacement body after its first completed extension.
- Kessler now saves Sosa during the April 10 Crossfeed, then fights beside him during the April 20 joint cleanup and April 30 Archon closure. His enlarged sprite stands beside Sosa facing the enemy. A blue corner bracket appears only when his support actually brackets a target, then persists on that target; later pulses travel through the retained bracket. Enemy phases are exception-safe and have a 6.5-second physical-browser watchdog.
- Provisional raster sprites are now base-Dross only: icy `rime.png` = Pall, plated `spall.png` = Spall, electronic `chime.png` = Knell, cracked industrial `slag.png` = Slag. Nifl, Relay, Atlas, Overtime, Atlas load-bearers, and material anchors use bespoke CSS structures in battle, cut-ins, and victory cards rather than reusing or recoloring the base family.

### Revised escalation chronology

The Archon is no longer an early solo boss. Full sequence: Pall episode → Spall episode → base Knell/Wire-Jaw → Slag/Work Heap → Nifl Molt → Relay Molt → mixed convergence and Kessler rescue → Atlas joint cleanup → Overtime → co-op Condemned Witness Archon → contaminated Omnis reading → May 6 audit/betrayal. The Archon fight creates the evidence and Closure Attribution temptation that later corrupts Elias’s choice.

## QA Commands

```bash
node tests/smoke.js
node tests/balance-sim.js
node tests/save-migration.js
node tests/prose-audit.js
node tests/combat-mechanics.js
node tests/enemy-intents.js
node tests/mobile-sim.js
node tests/markup-css-audit.js
node tests/narrative-structure.js
node tests/project-audit.js
node tests/skill-expression.js
node tests/package-verify.js /home/user/sosa_game.zip
```

The package verifier requires the system `unzip` command and confirms root `index.html`, the exact source-complete project inventory, byte-for-byte agreement with the canonical tree, safe paths, required files, and archive integrity.

## Itch.io Deployment

The master archive `/home/user/sosa_game.zip` is source-complete: it contains the playable runtime (`index.html`, `cg_stats_scan.html`, `js/`, `css/`, and `assets/`) plus `README.md`, all three canonical `docs/`, permanent `tests/` and fixtures, and both manifests. Everything is directly at the archive root with no extra top-level project folder. The additional documentation and QA files are inert in the browser and do not interfere with itch.io launching root `index.html`.

1. Upload only `/home/user/sosa_game.zip` to the itch.io project.
2. Set **Kind of project** to **HTML**.
3. Mark the ZIP **This file will be played in the browser**.
4. In **Embed options**, enable **Mobile Friendly**.
5. Recommended launch mode: **Click to launch in fullscreen**. This best matches the responsive `100dvh` phone layout and prevents the surrounding itch page from consuming portrait space. For an inline desktop embed, use a portrait viewport near **480 × 800** and keep fullscreen available.
6. Save the page, launch the uploaded build once on desktop and once on a physical phone, then test New Game, Continue, audio after the first tap, one battle, the Omnis scan, and a reload/save round trip.

The archive is self-contained and uses relative paths, local WOFF2 fonts, local images, procedural Web Audio, and `localStorage`. It makes no runtime CDN or network request. itch.io must serve the uploaded ZIP over HTTPS; do not rename or move files inside the archive.

## Credits & Lore Sources

- **Author & Creator**: Gz + Professor Synapse build lineage.
- **Setting & Setting Rules**: Dark Urban Fantasy / Cyber-Occult (Utica, NY / Texas transit arc).
