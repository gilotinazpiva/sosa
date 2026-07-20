# SOSA — MASTER GDD & HANDOFF

**Canonical as of:** 18 July 2026  
**Project:** *SOSA: THE GRAVE THAT WOULDN’T TAKE ME*  
**Platform:** itch.io HTML5, phone-first portrait  
**Playable scope:** Chapters 1–5 plus Chapter 6 opening and first complete civic-evidence conflict  
**Internal compatibility namespace:** `act1`–`act5`

This document is the implementation handoff and forward roadmap. It contains current decisions only; revision history is intentionally excluded.

## 1. CURRENT BUILD

- 589 routed story scenes
- 25 encounter definitions
- 22 main-path battles
- 19/19 battle-dialogue coverage
- 200/200 seeded campaigns complete
- zero detected softlocks
- VN screen budget: ≤340 characters
- supported target widths: 360, 390, 430, 480 px
- no framework, npm, bundler, build step, CDN, or external runtime dependency
- direct `index.html` loading preserved

Canonical workspace:

```text
/home/user/game
```

Canonical distribution:

```text
/home/user/sosa_game.zip
```

Required QA:

```bash
node tests/smoke.js
node tests/balance-sim.js
node tests/save-migration.js
node tests/prose-audit.js
node tests/combat-mechanics.js
node tests/mobile-sim.js
node tests/package-verify.js /home/user/sosa_game.zip
```

## 2. PRODUCT PILLARS

1. **Grounded adult survival story.** Housing, addiction, work, grief, online intimacy, bureaucracy, and poverty remain materially real.
2. **Anime escalation as coping language.** Bravado and technique names spike during fear, flirting, discovery, and combat; the setting’s causality remains serious.
3. **Phone-readable momentum.** One dominant beat per tap, large touch targets, no required hover, and no tiny prose used to avoid splitting screens.
4. **Violence with aftermath.** Every major fight changes ecology, evidence, relationships, material safety, or institutional response.
5. **Power that tempts.** Higher Debt feels stronger before it feels dangerous.
6. **No generic monsters.** Every entity has a source condition, feeding pattern, mundane evidence, countermeasure, and unresolved substrate.

## 3. VOICE AND PRESENTATION

### Sosa

Sosa is horny, funny, exhausted, self-deprecating, weeby, falsely overconfident, flirty, sincere, and capable of ugly avoidance. He is not an exposition terminal.

Avoid:

- prompt-like inventories of his body or possessions;
- repeated paraphrases of the same fact;
- premature orthodox terminology;
- constant “Not X. Y.” constructions;
- jokes that erase fear or material consequence;
- making every woman function only as support infrastructure.

### Dialogue channels

Keep visually and syntactically distinct:

- narration;
- Sosa speech;
- Sosa thought;
- other humans;
- Dross/entities;
- Somnus movement.

Somnus does not speak in ordinary dialogue. Its personality is shown through placement, interception, hesitation, fixation, eye movement, pressure, and violence.

### Technique naming rule

The UI never invents a player technique before Sosa does. Sosa observes a repeatable behavior, gives it an anime-ass name on purpose, acknowledges when he is borrowing terminology, jokes about plagiarism or building a move list, and uses the name to turn panic into procedure. Required naming beats currently exist for Sever: Dismantle, Web, Hellstep, Cleave, Furnace (Open), System Call: Stín, Black Flash, and Graveframe. Future techniques—including Sever: True—must receive the same treatment before becoming buttons.

### Content rating

Rated M: methamphetamine use, profanity, graphic violence, adult themes, dark humor, and sexual/flirty dialogue.

## 4. LOCKED CONTINUITY

- Sosa is a 34-year-old man; he/him.
- He rented one bedroom from apartment tenants in Texas who were not allowed to sublet it. Discovery broke their master lease and forced him out.
- Goth Baddie had a Vegas bartender job lined up; she was not already working there.
- The Vegas job would provide one room with one bed for both of them.
- Sosa has no New York or Utica plan before the transit incident.
- Utica Girl offers space in Apt 3 after the incident and meets him in person. Apt 3 is on the second floor: street door, one interior flight, then a second locked apartment door. It has one bedroom, one living room, one bathroom, and one kitchen—no spare room. They share her bed; Sosa sometimes passes out on the couch or sitting up. No mailed key.
- Utica Girl travels to Massachusetts for three days; reason unspecified.
- Never Albany. Never a mother’s-boyfriend explanation.
- Goth Baddie’s late-December return is 28 December 2025. The Columbus case gives her a felony; after release she stays in Ohio and does not return to West Virginia. Later Ohio plans mean Sosa joining her there.
- Sosa starts TOMRA on 17 March 2026. It is a 9 AM–5 PM sorting job, not an overnight shift.
- Sosa owns no car. He primarily walks and sometimes uses the public bus. Rides from Kessler or other people must be written as someone else driving him.
- Top Ranked Gz is a silly group-chat name, not a hierarchy. Sosa, Bender, Meki, and YSL are equal friends; remove numerical ranks and rank-based authority.
- Meth is never magical fuel.
- Origin: **To Endure**.
- Early-only command: **Refuse** exists only before Sosa can direct Somnus. It disappears after Trace/Dismantle naming; later defense is automatic Interception Guard.
- Survival event: **Battle Continuation**.
- Defense system: **Interception Guard**.
- “Endure” is not a technique.
- Public threshold/body name: **Graveframe**.
- “Coffin Pilot” is retired public language; some internal compatibility identifiers remain.

## 5. POWER ARCHITECTURE

1. Ordinary civilians possess life-force/ambient od but usually lack usable Circuit/Foundation access.
2. Sosa has developed Circuits with C-quality/B-quantity architecture and absolute-zero personal mana generation.
3. Attention directed at Sosa opens negligible borrowed-mana paths. His social graph is immense and high-cardinality; any scan shows only a fluctuating active subset.
4. Borrowed mana never becomes Sosa’s personal reserve.
5. Somnus receives it, erases ordinary signature, reverses polarity, and outputs **Anti-Magic**.
6. Trace tells Somnus where to apply Anti-Magic.
7. Debt is residual survival/conversion pressure, not mana or MP.
8. Normal donor energetic cost is negligible; relational cost is the danger.
9. Hostile attention can provide dense throughput while raising Debt, paranoia, and institutional visibility.
10. Genuine co-regulation and material safety can vent Debt; attention by itself does not.
11. Sosa’s female network originates primarily in drug communities on Discord and the private DMs branching from them. Gaming remains platform texture, not the network’s main source.
12. Sosa’s female network is reciprocal and emotionally real. He flirts, sexts, loves sexual attention, pursues and is pursued, and gives genuine care to many women. The flaw is overlapping intimacy and hidden scale, not passive simping or fake affection.
13. Goth Baddie is his primary romantic focus. He believes he would close the wider sexual/romantic network for a real exclusive life with her; he has not yet handled that choice honestly.

### Anti-Magic limits

Anti-Magic unweaves active magical structure and loaded metaphysical seams. It does not automatically:

- repair buildings;
- cure addiction or trauma;
- erase mundane bullets or gravity;
- resolve the social condition that formed Dross;
- identify safe collateral boundaries;
- make Sosa physically strong.

## 6. DEBT AND CONTROL

Debt has no passive HP erosion.

| Tier | Range | Expression |
|---|---:|---|
| Stable | 0–33 | 4 Guard; best precision |
| Balanced | 34–66 | 5 Guard; Shrine x1.10 |
| Carried | 67–79 | 6 Guard; Shrine x1.25; unstable pleasure/fixation |
| Overload | 80–99 | 6 Guard; Shrine x1.35; tighter Resonance; incoming trauma can create Drift |
| Threshold | 100 | Graveframe control transfer |

Debt rises through techniques, hostile pressure, damage, and survival conversion. It vents through authored co-regulation, safety, rest, honest contact, time passage, and successful comfort-type System Calls.

`worldFlags.totalDebtVented` tracks authored relief. There is no universal “social interaction equals healing” rule.

## 7. COMBAT SYSTEM

### Core loop

- Tap enemy to establish Trace priority.
- Choose one action.
- Somnus’s Shrine attacks the Traced target during the enemy exchange.
- Interception Guard absorbs impact pips; Armor Shell catches the first breach.
- Read enemy intent, control Debt, and decide whether faster destruction justifies signature and collateral.

### Sever grid

| Action | Cost | Function |
|---|---:|---|
| Dismantle | +3 Debt | Repeatable fixed precision; respects armor; saturation +1; Black Flash eligible |
| Cleave | +7 Debt | Adaptive committed cut; scales with armor/mass; bypasses and strips armor; saturation +1; one-round recalibration |
| Web | +10 Debt | Two-turn field control; all enemies take shallow damage; output −20%; barrages shortened; field moves grounded; saturation +2; cooldown 3 |
| Furnace | +18 Debt | Requires saturation 3/3; true thermobaric AoE against all living enemies; resets saturation |

Dismantle is the correct repeatable action against soft or wounded targets. Cleave is not “Dismantle but stronger”; it pays for adaptation and cannot be repeated on consecutive turns.

### Utility rail

After the early Refuse-only phase, the utility rail contains only:

- Hellstep
- System Call
- Sever: True when narratively unlocked

Refuse must not appear in the later utility rail or consume one of the four Sever-grid slots.

### Furnace

Saturation represents cut dust, released mana, severed surfaces, and unresolved field pressure. Furnace cannot fire cold. The first readiness event pauses for an explanation. Its aperture is a vent, never a mouth.

### Black Flash / First Resonance

- Forced successful First Resonance during the first deliberate February hunt; this scripted awakening cannot fail.
- Later direct Dismantle/Cleave convergence chance is 4% outside the Zone.
- Landing Black Flash creates a three-round **IN THE ZONE** state: direct Sever output 120%, Shrine output boosted, saturation synergy retained.
- While in the Zone: 10% with no active streak; 24% after one consecutive Black Flash; 38% after two; 52% cap after three or more.
- A normal eligible Sever, missed timing window, Web, Furnace, Hellstep, or System Call breaks the consecutive streak. The short Zone may remain at its 10% floor until duration expires.
- Later timing: 2800 ms Stable/Balanced, 2400 ms Carried, 2000 ms Overload, 3400 ms Reduced Motion.
- Damage remains base damage raised to power 2.5 by creator decision. No boss may require Black Flash to win.

### Autonomy Drift / player-facing Somnus Fixation

Autonomy Drift remains the lore category for Somnus making survival decisions before consent. Its battle telegraph is now **Somnus Fixation**. Incoming trauma at Debt ≥80 adds visible stacks against the selected target: one memory-eye fixes, then every blade pre-angles, then target choice transfers. Web removes one pre-lock stack by broadening Somnus’s field priority. At 3/3, Trace locks until that target falls. The HUD names the target and the enemy card gains fixation-eye/lock treatment.

### Graveframe

At 100 Debt, Somnus takes control to preserve Sosa.

UI replaces normal combat emphasis with:

- Control;
- Collateral;
- ANCHOR;
- STEER;
- LET HIM.

Graveframe is a failure-state power fantasy, not a clean transformation reward. Internal `coffin*` identifiers remain for save compatibility and should not leak into player-facing text.

## 8. THREAT ECOLOGY

### Foundational Dross

| Ecology | Source | Molt name | Current episode |
|---|---|---|---|
| Pall | exposure, surrendered warmth, abandonment | Nifl | Texas awakening, Utica hallway/frost packs, April Frost Group Chat Molt |
| Spall | transferred impact, unsafe structures, normalized violence | Atlas | painted stair → Concrete Thing → April load-transfer recurrence → Atlas joint fight |
| Knell | unanswered contact, copied intimacy, routed neglect | Relay | blank calls → dedicated base Wire-Jaw → copied voices → Relay |
| Slag | exploitation, exhaustion, continuance without relief | Overtime | TOMRA anomalies → Work Heap → make-up target/peer enforcement → Overtime |

Molts are ecology-specific plural states, not a universal level ladder. The Work Heap is intentionally one Type-I Slag body assembled from one worksite’s refuse. It is not Overtime: Overtime begins only when shifts, workers, clocks, routes, and enforcement act as one distributed ecology.

Egregore response codes:

```text
TYPE-0 · IRREGULAR  model-breaking anomaly; Sosa
TYPE-I · DROSS   localized Dross body
TYPE-II · MOLT      distributed mature ecology
TYPE-III · ARCHON  Archon territory/world-law
TYPE-IV · DEMIURGE  Demiurge-scale replacement event
```

`TYPE-#` describes containment shape, not a simple strength number. A lethal Type-I can be more immediately dangerous than a dormant Type-II; Type-0 means unclassifiable, not weak.

### Archons

An Archon is not simply a large Dross. It requires:

- persistent ecological wound;
- governing pattern;
- material anchor;
- social surrender;
- coherent voice/world-law;
- territory.

The Condemned Witness governs:

> YOU WERE SEEN. THAT WAS THE HELP.

Its Red-Tag Core cannot be damaged until an outside observer voluntarily answers Sosa’s System Call. Kessler can contain and discriminate; he cannot make the relational argument for Sosa.

### Censors

Censor Scouts are trained human specialists, not higher-stage Dross. Threat is matchup-based.

- Archon: greater territory, ontology, and civilian-scale danger.
- Scout: preparation, doctrine, equipment, evidence authority, and targeted counters.

Kessler uses three-point **Formalcraft Grid Integrity**. He has no material anchor. Omnis is equipment/evidence, not an anchor.

## 9. CURRENT CHAPTER AND ENCOUNTER ORDER

Player-facing units are Chapters. Internal `act*` names remain stable.

```text
tutorial_1
→ act1_battle1
→ act1_battle2
→ tutorial_2
→ act2_alone_dross
→ act2_battle1
→ street_predator_enc
→ dross_spall
→ act3_grief_battle
→ act3_battle2
→ act3_hunt_battle
→ act3_hunt_battle2
→ dross_chime_base
→ dross_slag
→ dross_nifl
→ dross_chime
→ kessler_rescue_swarm
→ kessler_joint_hunt
→ dross_overtime
→ archon_fight
→ censor_enc
→ act5_hound_battle
```

### Chronology

- Early November: 48-hour Dallas-to-Utica Greyhound trip; Utica arrival; three-day Massachusetts absence; hallway cold. Before 28 December, Sosa knows only that Goth Baddie went silent—no Ohio/Columbus arrest knowledge may appear.
- November–December: relapse, Ypsilon emergence, Pall and Spall episodes, Dec. 30 street violence.
- January: mother’s death and grief surge.
- February: unemployment, meth/Discord routine, deliberate mixed hunts, dedicated base Knell/Wire-Jaw.
- March 14: job call.
- March 17: TOMRA start.
- Early April: dedicated base Slag/Work Heap completes the four Type-I ecologies.
- April 6–8: Frost Group Chat/Nifl becomes the first Type-II Molt; Web unlocks before formal instruction.
- April 9: Relay becomes the second Type-II Molt.
- April 10 morning: repaired Apt 3 stair begins routing impacts into occupied rooms; Sosa calls it a trauma load balancer and refuses to use Furnace around sleeping residents.
- April 10 afternoon: Kessler contact; mixed convergence; Kessler saves Sosa.
- April 13: coffee and taxonomy.
- April 20: Apt 3 Atlas Molt; Web pins load transfer, Blue Brackets exclude occupied rooms, Furnace offers faster structural collateral.
- April 24: Overtime Molt at TOMRA; Web becomes a break-routine interrupt.
- April 25–27: minor shared fieldwork.
- April 30: co-op Condemned Witness closure, resident accounting, and quiet Apt 3 aftermath.
- May 6: confirmatory Omnis audit, betrayal, Elias’s death, bus ride home.
- May 7–18: Egregore erases the lot; Sosa keeps working 9–5; blocked calls and Utica Girl’s copied-voice symptoms escalate.
- May 19–21: lockout, arrest, failed one-word check-in, isolation, Graveframe, Hound, Drop-In Center.

## 10. ELIAS KESSLER ARC

Appearance lock:

- short steel-gray hair;
- black sunglasses;
- long black overcoat;
- charcoal suit;
- red tie;
- dark gloves;
- blue Formalcraft geometry;
- no jaw hardware, filter, cybernetics, or facial mask.

Relationship causality:

1. Slag signature brings Elias to TOMRA.
2. The mixed convergence overwhelms Sosa; Elias intervenes instead of observing.
3. Elias logs a cooperative irregular rather than forcing detention.
4. Coffee, terminology, and fieldwork create real trust.
5. Their techniques become complementary: Elias supplies civilian discrimination; Sosa supplies destructive reach.
6. During the Archon collapse, Sosa saves Elias by driving Anti-Magic through Formalcraft.
7. Omnis records absolute-null receiver architecture and assigns possible Closure Attribution to Elias.
8. Elias deletes the local record, but headquarters receives a mirror.
9. He spends six days trying to treat the reading as contamination.
10. On May 6, pressure and career hunger turn a confirmatory audit into attempted solo detention.
11. The Archon does not mind-control him. Institutional incentive exploits a choice he remains responsible for.

## 11. ART AND UI LOCKS

### Sosa and Somnus

- Sosa middle-left.
- Somnus to his right as barrier.
- Somnus black first, violet second.
- Liquid/obsidian symbiote; never wispy smoke.
- No mouth or teeth.
- One horizontal violet-white aperture.
- Six to eight mismatched human memory-eyes.
- Sosa’s white Shy Guy mask has a black negative-space zigzag mouth opening.

### Phone UX

- Touch outranks keyboard.
- Minimum practical target: 44 px.
- Full-screen VN/Discord advancement.
- Plot-bearing battle dialogue requires acknowledgment.
- Battle log remains hidden until Ypsilon begins translating events.
- Unknown speaker portraits use CSS silhouette/static art rather than broken images.
- Battle UI uses no emoji. Any eye, lock, warning, or entity icon must be drawn with CSS geometry or embedded SVG. Somnus Fixation uses an angular CSS eye with separate iris/pupil; never substitute `👁`, `👀`, `🧿`, `◉`, or similar font glyphs.
- Omnis displays `Class: Caster?` and a separate `Type: TYPE-0 IRREGULAR`; do not recombine them into an overflowing line.
- LCK/NP EX values and EX-conflict labels use visible amber-white glow; Reduced Motion may stop pulsing but must preserve the static glow.
- Omnis skill signatures use a compact two-column flex layout; each rank sits directly beside its skill name rather than at the far panel edge.
- Reduced Motion, Reduced Flashes, Disable Shake, High Contrast, mute, BGM, and SFX controls must remain functional.

## 12. SOURCE ARCHITECTURE

```text
index.html
cg_stats_scan.html
js/
  audio.js
  fx.js
  game-core.js
  game-battle.js
  game-enemies.js
  game-bosses.js
  game-states.js
  render.js
  data/
    core.js
    act1.js
    act2.js
    act3.js
    act4.js
    act5.js
    battle-dialogue.js
css/
  base.css
  title.css
  story.css
  discord.css
  battle.css
  effects.css
  accessibility.css
assets/
tests/
```

Save contract:

- `SAVE_VERSION = 1`
- `SAVE_KEY = "sosa_game_save_v1"`
- migrations retain old `scarMend`, `endure`, and naming compatibility.
- Do not casually rename internal `coffin*` fields without a versioned migration and old-save fixture tests.

## 13. DEFINITION OF DONE FOR A NEW EPISODE

Every supernatural episode needs:

1. mundane source condition;
2. at least two foreshadowing signals;
3. entity behavior outside Sosa’s presence;
4. unique communication pattern;
5. battle question beyond “reduce HP”;
6. aftermath image;
7. substrate that remains unresolved;
8. relationship or institutional consequence;
9. terminology appropriate to Sosa’s knowledge at that moment;
10. phone-sized prose and acknowledged plot dialogue.

## 14. AUDIT FINDINGS — 18 JULY 2026

### Narrative

The revised escalation is causally sound: each foundational Dross receives an episode before mixed convergence; Kessler first proves intervention, then partnership; the Archon creates the evidence that makes his later betrayal possible. Formal terminology remains withheld until Kessler. Utica Girl now has a peer-support/housing trajectory independent of Sosa. Remaining weaknesses are Goth Baddie and individual Gz differentiation, plus insufficient quiet consequence time after power highs.

### World building

The strongest chain is mundane neglect → Dross body → Sosa suppression → null cleanup scar → cross-attraction → Egregore detection. Anti-Magic has useful limits and cannot substitute for repair. Future additions should show more ordinary civilian interpretation and municipal response; the occult layer should not erase landlords, supervisors, hospitals, police, shelters, weather, or infrastructure.

### Taxonomy and ecology

Pall, Spall, Knell, and Slag have distinct sources, behaviors, evidence, Molt names, and aftercare failures. Nifl may roam or root itself; that is behavior, not a second Pall species. The taxonomy contains many future entities; they are a possibility space, not a checklist. No future profile should enter the story without source evidence and episode structure.

### Battle mechanics

Dismantle/Cleave/Web/Furnace now have distinct jobs. Cleave’s recalibration answers spam; Furnace is real AoE; Kessler support is useful without replacing the player. Autonomy Drift now has diegetic Somnus Fixation telegraphing, target names, a visible enemy-card lock, and a Web counteraction before 3/3. Graveframe is thematically clear and its Collateral now reaches the Chapter 6 civic brief.

### Code and data

Obsolete early-Archon scene definitions were removed from `act3.js`; the canonical April scenes now exist once in `act4.js`. Kessler ally behavior moved from hardcoded encounter checks to `DATA.alliedSupport` metadata. Production boot logs were removed. `startBattle` is staged, enemy move effects use a tested handler registry, and enemy intents now pass through explicit normalization, control, announcement, Guard, damage/effect, and finalization stages. The dependency-free markup audit checks both HTML entry points, every maintained stylesheet, local asset references, unique IDs, tag nesting, CSS delimiters, and offline CSS policy. The whole-project audit additionally verifies the manifest hash inventory, data schemas, route references, encounter/enemy links, effect registration, runtime dependency policy, battle emoji policy, and binary asset signatures. The pre-playtest pass also fixed stale battle callbacks on retry, malformed same-version save recovery, legacy `muted → audioMuted` migration, the Chapter 6 Formalcraft background mapping, a duplicate eager Omnis iframe, iframe titles, and keyboard access for phone surfaces. Parse, route, balance, intent, markup, save, and inventory tests pass.

### Audiovisual presentation

Battle cut-ins now carry a per-line rendered state: the cinematic entrance runs once, while damage and HUD rerenders preserve a settled panel instead of replaying Sosa’s arrival. Nonpersistent lines remain for 4.2 seconds; plot-bearing openers remain acknowledgement-gated. Panels use asymmetric JRPG framing, larger portraits, ecology-specific palettes, and a more imposing Somnus composition. Somnus’s field sprite uses CSS aura pressure around the integrated sprite eyes; the detached white CSS eye overlay was removed after reading as floating pellets. The first manifestation burst includes Sosa’s immediate reaction.

VN-to-battle flow uses an opaque midpoint handoff. The departing scene closes behind a violet fault-line curtain, battle state renders underneath at 560 ms, and the curtain retracts onto the prepared combat field; Reduced Motion uses a 40 ms direct handoff. The old VN background is never exposed during the reveal. Every one of the 22 main-path encounters also has two rotating Sosa victory quips and two rotating Somnus movement responses. These are optional result-card characterization, never required plot.

VN rendering tokenizes parenthetical thoughts and curly-quoted speech separately from prose. Narrator, present Sosa, other humans, and entities receive distinct font, color, border, and text-shadow treatment while retaining the phone readability floor. Explicit future-knowledge scenes use `retrospective:true` and render as amber `SOSA // LOOKING BACK` memory cards, preventing retrospective knowledge from reading like present thought. CSS placeholders now include location silhouettes for city, transit, Apt 3/interior, grief-rain, Formalcraft, and underpass/Graveframe spaces.

Procedural battle tracks now schedule original four-part forms lasting 8–9.6 seconds rather than repeating one short cell. VN cues also drive brief visual overlays for cold, phones, motion, impact, heartbeat, rain, Veil interference, Formalcraft, and manifestation.

Shrine auto-slash and Dismantle now use separate target-indexed travel/cut sequences. The travel line reaches the enemy before a delayed cross-mark blooms, keeping both effects readable instead of flashing globally. Black Flash cannot roll from an unlock boolean alone: it requires the forced First Resonance to set the awakening world flag. Its generic red Shattering follow-up is suppressed; the dedicated presentation uses black-violet time stop, spatial cross-cut, resonance rings, Zone ignition, a brief music vacuum, and layered sub-bass/harmonic impact. Forms combine establishment, answer, contrasting middle phrase, and return in the project’s existing ecological palettes. Story, cold-story, and Discord profiles are louder. Finished Web Audio oscillators remove themselves from the active collection to prevent long-session accumulation.

### Documentation

The handoff was rewritten as current-state documentation. The dossier’s obsolete build delta and trailing revision addenda were removed and integrated. The taxonomy’s field case was moved before future profiles, and the premature end marker was fixed. No new satellite lore document was created.

### Typography casting — locally bundled Google Fonts

The game self-hosts Latin WOFF2 subsets under `assets/fonts/`; no runtime request reaches Google or any CDN. Each family retains its SIL Open Font License and source metadata.

| Role | Family | Rationale |
|---|---|---|
| Narrator, Sosa prose, retrospective prose, thought | **Newsreader** | Modern screen-oriented editorial serif; literary without the generic browser-Georgia look. Italic file supports thought/retrospection. |
| Sosa direct speech, Goth, ordinary humans, Discord, primary UI | **IBM Plex Sans** | Human/machine balance, strong mobile legibility, coherent with the system fonts. |
| Kessler and institutional human language | **IBM Plex Sans Condensed** | Same family skeleton as human UI, but narrower and more procedural. |
| Knell, Censor/Hound, Omnis, AR/system readouts | **IBM Plex Mono** | Engineered voice without falling back to Courier or illegible glitch display. |
| Spall, Slag, Overtime, industrial labels | **Barlow Condensed** | Dense impact/industrial rhythm at readable phone sizes. |
| Pall | **Cormorant Garamond** | Breath-like old-style forms and high contrast fit cold that nearly speaks in sleep. Used only at dialogue size, not micro-UI. |
| Archon, world-law, title/result display | **Cinzel** | Formal inscriptional authority; restricted to high-formality roles so it does not overwhelm body text. |

This is intentionally a controlled cast rather than one font per character. Weight, case, tracking, color, and framing create individual variation inside the family roles. System fallbacks remain after each local family.

Research basis: Google Fonts’ readability/accessibility and self-hosting guidance; IBM’s description of Plex as balancing human and machine character with strong print, web, and mobile legibility; screen-oriented recommendations for Newsreader/IBM Plex/Source families; and restraint guidance against stacking novelty cyberpunk faces.

### Screenshot-driven physical layout pass

- Font variables now begin with offline system stacks (`system-ui`, Georgia, `ui-monospace`) rather than unavailable webfont names. A physical screenshot exposed an older high-specificity Sosa rule still forcing prose into Trebuchet/system sans; a stronger channel rule now guarantees Georgia for Sosa/narrator/retrospective prose, Georgia italic for thought, and system sans for direct quoted speech.
- Speaker profiles now override the old generic entity italics: Pall uses cold small-caps serif; Knell routed mono; Spall heavy impact sans; Slag condensed industrial uppercase; Archon formal law-serif; Censor/Hound institutional mono; Kessler narrow cyan sans; Utica Girl soft human serif; Goth Baddie heavier intimate sans. Profiles style unquoted entity prose as well as quoted speech.
- The first Somnus manifestation is split into two CG-backed cards below 240 characters each; Somnus movement cut-ins now say `SOMNUS // MOVEMENT` instead of incorrectly defaulting to `ENEMY`.
- `act2_stair*` scenes use a dedicated perspective stairwell plate with one flight, railing, damaged third tread, second locked door, and brass 3.
- Dead enemy cards collapse out of active battle layout.
- Dismantle/Shrine FX query the actual `[data-enemy-index]` card rectangle and place travel/cross cuts at its center. Global shrine cross/spray layers that could appear above targets were removed; cuts are thinner, sharper, and carry a dark displacement shadow.
- Enemy intents now have family-specific telegraphs: Pall cold sweep, Knell routing rings, Spall fracture hit, Slag compression bars, Archon authority stamp, and human lunge. Death FX differ by ice shatter, signal collapse, fragment burst, ember sink, or structural route failure.
- Battle fields layer encounter-specific environmental silhouettes over psychedelic motion. VN void plates now include a bus interior/highway reflection and a frost-bedroom door/bed composition for the previously near-black travel and second-night scenes.
- Kessler is enlarged/repositioned. Brackets no longer decorate every enemy: `kesslerBracketed` persists only on targets his cadence actually suppresses, with thicker visible cyan corners.
- Discord messages reserve 88 px below the scroll area so the floating advance hint cannot cover the last message.
- The work-vest Goth exchange now uses mundane work intimacy and the safety rule; camera/lower/leave-it-on beats remain exclusive to the later bruising call.
- Structural enemy placeholders now render detailed inline SVG paths inside CSS frames for Nifl, Relay, Atlas, Overtime, the Red-Tag Core, and Atlas load-bearers.
- **Ypsilon Gloss / First Read:** authored introduction scenes highlight new terms in amber-violet; a 520 ms hold opens an in-world definition sheet and suppresses accidental VN advance. Later occurrences retain a subtle dotted underline. Discoveries persist in saves and are inferred for legitimate older saves from progression flags.
- Glossary introductions are scene-mapped rather than word-triggered, preventing formal vocabulary from highlighting before narrative introduction. Current terms cover Somnus, Veil/Trace/Sever, Black Flash, Web/Residue/Furnace, Dross families/Molts, Debt, Formalcraft/Omnis, System Call/Stín, Archon, and Graveframe.

### Private-DM expansion

The early Utica isolation sequence now routes through a seven-thread DM list and three extended private conversations before returning to the blank-wall scene. Mochaviolet receives remembered intake/food logistics and checks that Sosa ate; Honeyvenom reciprocally flirts while directly challenging whether Goth knows about the new bed; Cloudnymph receives family-crisis grounding built around her cat Miso and checks Sosa’s safety in return. The closing VN card states the defect without invalidating the care: every version of Sosa is real, but nobody gets the whole room. The sequence contains no donor, battery, path-count, or mana framing.

### Combat progression and physical-device fixes

- First Resonance breaks Ice Mortar, spawns Pall/Spall reinforcements, grants two missable LCK EX Cascade windows for that encounter only, and routes to a one/two/three-hit dynamic aftermath. Future Black Flash remains story-gated and returns to normal probability.
- Reinforcement framework now supports one-time authored waves without leaving battle: Texas Pall refill, Utica Pall refill, Nifl half-health accounts, First Resonance Cascade bodies, and Overtime replacement worker.
- First Refusal remains Refuse-only. Post-manifest/pre-Trace combat exposes Refuse plus `UNNAMED CUT`; naming Trace/Dismantle permanently removes Refuse.
- Dismantle gains target-specific Trace Depth: Read 1/3, +20% second cut, +50% third-cut Breakpoint/reset. The button and enemy token expose progress.
- Partial Ypsilon AR branch was unreachable and is now fixed. It shows qualitative HP, Presence, Focus/Traced state, target Read, and visible hazy Interception pips. Exact HP/Debt/armor/intent remains Omnis-Lite progression.
- Public `Cut Residue` is retired as **Cut Ash**; internal saturation identifiers remain compatibility-only. Web creation now receives a mechanism scene, a status readout card, and a post-fight Cut Ash card. Furnace terminology is hidden before naming; pre-unlock 3/3 reads `APERTURE UNCLAIMED`. Cut Ash uses dedicated CSS aperture-pips, not generic diamonds. After naming, the sealed Furnace slot fills those pips and transforms at 3/3 into a luminous `OPEN` button with `FURNACE READY · RELEASE ALL TARGETS`.
- Long safe/time-skip gaps settle Debt to authored 15–35 checkpoints; close fights retain it.
- Breach leakage increased from 25%/40% to 35% armored/55% unarmored so Interception failure moves HP and Battle Continuation can matter without changing Guard capacities.
- Real-browser `THEIR MOVE` recovery: each intent is exception-safe and a 6.5-second watchdog returns control if the sequence stalls.
- Victory cards now grant first-clear Field EXP/Field Level progress, a contextual recovered result, and an ecology lesson. Somnus victory reactions are reserved for ten major character encounters rather than every fight.
- Kessler now stands persistently on the party side using `censor_scout.png`, flipped to face enemy lanes. Every-second-action support applies a blue corner bracket only to the target Kessler actually suppresses; that target retains the bracket. The HUD tag is shortened to `BLUE BRACKET · NEXT N`.

### Dross identity and voice pass

- Official cold-family name is now **Pall**, replacing generic **Rime**; internal `rime*` IDs and `rime.png` remain compatibility filenames.
- Field/official distinction is mandatory: cold thing/Frost Shadow → Pall, Concrete Thing → Spall, Wire-Jaw → Knell, Work Heap → Slag; Frost Group Chat → Nifl, Damage Router → Atlas, Wire-Jaw Relay → Relay, Neverending Shift → Overtime.
- April 10 mixed encounter now teaches **Crossfeed**: Pall preserves Spall fractures, Spall impact powers Knell, Knell divides attention. Two uninterrupted exchanges heal all three and add +5 Debt; Web or killing one family breaks the loop.
- Raster semantics corrected and restricted to base Dross: `rime.png` → Pall, `spall.png` → Spall, `chime.png` → Knell, `slag.png` → Slag.
- Molts never reuse base-family raster art. Nifl is a three-node shared cold route; Relay is a speaker/device routing core; Atlas is an occupied building/load diagram; Overtime is a clock/belt/worker system. All are bespoke CSS structures shared by battle, cut-in, and victory rendering.
- Atlas load-bearers use cracked carrier constructs rather than base Spall. Material anchors use a dedicated Red-Tag document/core construct rather than any enemy sprite.
- Repeated base bodies retain three deterministic scale/saturation/temperature variants. These remain placeholders, not final art.
- Sosa quips were rewritten against the dossier’s contextual voice matrix. `hold the line` and player-facing `geometry` are now zero; tactical instruction cannot replace character voice. Early battle/victory reactions use **THE SHADOW** and avoid “Somnus” until Sosa completes the naming scene.

## 15. ACT-BY-ACT AESTHETIC AND NARRATIVE AUDIT

### Chapter 1 / internal Act 1 — Texas Dry Hours

- **Scope:** 77 scenes; 71 VN, 4 phone, 2 CG; one explicit retrospective card.
- **Temporal result:** immediate survival remains present-tense. Only the later-earbud knowledge is marked `SOSA // LOOKING BACK`.
- **Speaker result:** Sosa’s repeated self-address remains one card because it is one speaker; straight and curly quoted speech now both receive speech typography.
- **Aesthetic result:** first manifestation is split into two short CG cards; Somnus receives a separate visual-recognition beat; title/location labels remain compact.
- **Continuity result:** Texas sublet, failed Vegas plan, shelter diversion, 48-hour bus route, and pre-arrest ignorance remain locked.
- **Physical watch item:** twelve prose cards remain above 280 characters but under the 340 hard ceiling; none are CG-backed. Verify on the smallest device without reducing type.

### Chapter 2 / internal Act 2 — Utica, Apt 3, the First Veil

- **Scope:** 145 scenes; 138 VN, 7 phone/DM; one explicit retrospective card.
- **Temporal result:** “special earbuds yet” was rewritten into immediate knowledge; only the later replacement-pair explanation remains retrospective.
- **Speaker result:** curb arrival alternates Narrator → Utica Girl → Sosa → Utica Girl. The December bathroom call alternates Sosa/Goth cards. Utica’s paperwork, promises, and boundary each receive the owning speaker.
- **Relationship result:** seven-thread DM list plus Mochaviolet, Honeyvenom, and Cloudnymph sequences demonstrate reciprocal care, flirting, remembered details, concealed overlap, and support returning to Sosa.
- **Aesthetic result:** Apt 3 stairwell has a dedicated one-flight/third-tread/brass-3 plate; partial Veil gains visible Interception pips and qualitative AR.
- **Mechanical result:** Dismantle Trace Depth gives the long one-button period a three-read rhythm.
- **Physical watch item:** confirm Discord’s 88 px bottom clearance and long DM scrolling under Brave/Safari chrome.

### Chapter 3 / internal Act 3 — Grief, Hunts, First Resonance, Web

- **Scope:** 118 scenes; 113 VN, 5 phone.
- **Temporal result:** no retrospective leakage found; next-evening and later-morning phrases are local sequence markers.
- **Speaker result:** Utica’s orientation and post-hunt morning now alternate speaker cards with narrator movement between them.
- **Combat result:** Ice Mortar → First Resonance reinforcements/Cascade → Cue Trade creates an escalating mixed-Dross lesson. Dynamic aftermath reflects one, two, or three Black Flashes.
- **Technique result:** Web receives invention logic, status translation, and Cut Ash aftermath before Relay escalation.
- **Tone result:** hunting confidence is pleasurable and alarming; grief cards remain less jokey; Gz boundaries remain ask-not-summon.
- **Physical watch item:** verify four-card reinforcement layouts, contracting Black Flash ring, and sharp measured cuts on 360 px.

### Chapter 4 / internal Act 4 — Kessler, Molts, Archon, Betrayal

- **Scope:** 177 scenes; 173 VN, 4 phone. This remains the densest chapter.
- **Terminology result:** first contact no longer leaks Pall/Spall/Dross; April 13 owns formal taxonomy and glossary introduction.
- **Speaker result:** first-contact names, taxonomy banter, Type-0, Debt naming, sandwiches, minor fieldwork, Atlas judgment, shared Web/Furnace planning, and post-Archon friendship all alternate Sosa/Kessler/System/Narrator cards.
- **Aesthetic result:** Kessler is enlarged on the party side; a Blue Bracket appears only after his support actually brackets a target and then persists. Molts/load-bearers/anchors use inline SVG structures.
- **Relationship result:** work-vest DM is mundane intimacy, while the later camera scene uniquely pivots from flirtation to bruising concern.
- **Mechanical result:** Crossfeed, Atlas transfer, Overtime cadence, Kessler cadence, Furnace naming/OPEN state, and exact Debt recovery gaps are explicit.
- **Physical watch item:** eighteen cards remain above 280 characters but below 340. Prioritize Kessler audit and Archon decompression during device reading.

### Chapter 5 / internal Act 5 — Absolute Zero and Graveframe

- **Scope:** 26 scenes; 25 VN, 1 CG.
- **POV result:** the Sosa-heavy channel is intentional claustrophobia while he loses phone, room, job, local attachment, and body control. Graveframe movement remains passenger-language rather than neutral tactical narration.
- **Speaker result:** Hound protocol and volunteer speech retain separate cards; no live Discord scenes appear because the phone is physically dead.
- **Aesthetic result:** Graveframe remains distinct from normal battle and from the later Reality Marble; Collateral is preserved into Chapter 6.
- **Physical watch item:** four cards above 280 characters should be checked around Graveframe CG cropping and drop-in recovery.

### Chapter 6 — Open File / first complete conflict

- **Scope:** 38 scenes; 35 VN, 3 phone.
- **Speaker result:** case-manager, municipal clerk, and Goth truth conversations now alternate Narrator/human/Sosa ownership at every reply.
- **Conflict result:** tenant evidence is preserved at the cost of making Sosa searchable; the first narrow-cut attempt remains aborted and Sever: True stays locked.
- **Relationship result:** Utica’s boundary is respected, Gz provide requested logistics, and Goth demands truth over time without instant absolution.
- **Aesthetic result:** retrospective and glossary channels remain available without turning the chapter into a dossier.
- **Physical watch item:** five cards above 280 characters remain under 340; inspect civic-form and closing-phone readability.

### Permanent structural gate

`tests/narrative-structure.js` verifies ten representative alternating-speaker sequences, retrospective metadata, straight/curly speech parsing, CG pacing, and early formal-term order. Smoke still requires every scene to be reachable exactly once.

## 16. ROADMAP — CONSOLIDATED STATUS

### Priority 0 — physical release verification — external gate

Automated package, route, balance, prose, migration, integrity, and phone-contract simulations are complete. The simulation covers 360/390/430/480 breakpoints, safe-area declarations, 44 px targets, Black Flash/Zone markup, Graveframe structure, Omnis compact rules, global audio unlock, and functional 520 ms Codex hold suppression. Remaining work requires actual mobile browsers:

- fresh and migrated saves at 360/390/430/480 px;
- Black Flash ring and `IN THE ZONE` readability;
- Graveframe composition;
- Omnis vertical fit;
- safe areas and first-tap audio unlock;
- one-thumb target/action use;
- 520 ms Combat Codex hold without accidental activation.

### Priority 1 — narrative depth — structurally complete for current scope

Implemented:

- exact Apt 3 geometry/access and Utica Girl’s independent peer-support/housing trajectory;
- differentiated, equal-friend Top Ranked Gz voices plus “ask, not summon” boundaries;
- Goth Baddie’s sexual/romantic fingerprint, Archon answer, anti-disappearance rule, and receiving-side silence;
- First Resonance, Relay, Archon, and Elias consequence/decompression beats;
- May 7–18 bridge;
- Chapter 6 opening and first complete conflict: replacement phone, Goth unread messages, civic Graveframe claim, mirrored Omnis/cat-sticker intrusion, aborted judgment cut, respected Utica boundary, Gz logistics, witness statement, and direct Goth call.

Future chapters should deepen these consequences rather than reintroducing them.

### Priority 2 — Dross ecology and escalation — complete for foundational cycle

Teaching order is locked:

```text
Type-I: Pall → Spall → Knell → Slag
Type-II: Nifl → Relay → Atlas → Overtime
Institutional: Kessler → Archon → Censor → Hound
```

Implemented battle questions:

- Nifl: sever the shared heat-map;
- Relay: distinguish routed imitation from real contact;
- Atlas: decide where impact transfers; Web pins load; Furnace damages housing;
- Overtime: break the schedule with Web; uninterrupted cadence restores the shift.

Future variants require a new ecological question, not a bigger stat block.

### Priority 3 — combat clarity and depth — structurally complete

Implemented:

- distinct Dismantle/Cleave/Web/Furnace roles;
- early-only Refuse and automatic later Interception Guard;
- Cleave recalibration;
- Web control, Fixation counter, Atlas pin, and Overtime cadence break;
- Somnus Fixation telegraph/target lock;
- press-and-hold Combat Codex with inspectable cooldown actions;
- Kessler Formalcraft travel-lane/target-bracket FX;
- encounter-specific Furnace aftermath records;
- JJK-shaped Black Flash: 4% baseline, three-round 120% Zone, 10% Zone floor, 24/38/52% consecutive odds, damage^2.5;
- LCK EX as impossible-convergence bias rather than command;
- emoji-free CSS/SVG battle-icon policy;
- stable cinematic cut-ins that do not replay entrance motion on damage rerenders;
- diegetic Ypsilon held-focus notes replacing developer-facing inspection/AoE language;
- original 8–9.6 second multi-part procedural battle forms and louder VN profiles;
- channel-specific VN typography and location-readable CSS background plates.

Do not expand the standard action grid beyond Dismantle, Cleave, Web, and Furnace.

### False Eyes perceptual rule

Keep living and nonliving targets. Healthy structure is normally invisible; passive perception is pressure/wrongness rather than glowing geometry. The Ypsilon Veil filters interference and resolves one candidate, while Trace commits that single priority and suppresses competitors. Reliable range remains roughly twenty meters with line of sight. High Debt, grief, Graveframe, or the Grave can expose many faults at once, but that is an overload state carrying migraine, dissociation, Fixation, and target-loss risk. Sosa’s ordinary glasses do not suppress the Eyes.

### Skill and lexical audit — current

All dossier Class and Personal Skills now have a verified narrative/system expression matrix in the dossier and a permanent `tests/skill-expression.js` gate. **Chuunibyou Privilege** has been retired publicly in favor of **Imperial Privilege (False): C**, based on Imperial Privilege’s temporary Skill acquisition through insistence but sharply bounded for Sosa: one context-specific skill-shaped claim, no unique powers, no true magecraft, no parameter increase, and no body transformation. The generic Pain Compartment damage reduction was rejected as too close to ordinary armor; mechanical implementation is deferred until a claim can be authored with meaningful contradiction and failure.

Runtime prose was exhaustively varied: displayed counts are now `hum 0`, `static 0`, `No Strings 1` (ordinary housing speech only), `seam 1`, and `chuuni 0`. Early Chapters 1–3 contain no player-facing **cleanup** terminology; Sosa uses cold things, concrete things, wire mouths, marks, leftovers, and what Somnus left behind until Kessler supplies institutional language. Early encounter banners now read `COLD PACK`, `COLD PRESSURE`, and `COLD // WIRE // CONCRETE` rather than leaking Pall or convergence taxonomy. Visible combat status **STATIC** is now **VEIL NOISE**; internal `static` and `static-burst` identifiers remain compatibility-only. The supernatural **No Strings Attached** label has been retired in favor of **Somnus Threading / Full Puppet**. Permanent lexical ceilings prevent regression without banning necessary technical language from design analysis.

### Priority 4 — engineering hardening — COMPLETE

Completed:

- six save fixtures: legacy migration, Atlas/Furnace, Overtime/Furnace, pre-Graveframe 99 Debt, Chapter 6 civic Collateral, and partial same-version corruption recovery;
- six successful save round trips under `SAVE_VERSION = 1`;
- `startBattle` split into boss-state construction, runtime reset, support configuration, encounter rules, presentation reset, and transition/presentation stages;
- full 200-campaign equivalence pass after refactor;
- deterministic mobile-contract simulation for all four target widths and high-risk UI states;
- `applyEnemyMoveEffect` converted to a handler registry, with direct coverage for all 13 effects referenced by encounter data plus encounter-specific Debt and Graveframe branches;
- `resolveEnemyIntent` split into normalization, Web/disruption modification, announcement, Guard, damage/effect, type-specific resolution, and finalization stages;
- deterministic intent tests proving blocked-effect isolation, move-data immutability, Web field grounding, barrage scaling, open-Guard damage/effect order, and early-Pall area protection;
- dependency-free HTML/CSS audit for both entry points and all seven stylesheets; the first run found and fixed the missing standalone Omnis document title;
- whole-project release audit covering all tracked source files and binary signatures;
- six save fixtures, including bounded recovery from a partially corrupted same-version save and real migration of legacy `muted` into `audioMuted`;
- explicit cancellation of ten tracked battle timers before reset/retry/new-game initialization;
- corrected `css_bg_formal → void-formal` rendering for Chapter 6, removed the unused duplicate Omnis iframe, titled the runtime iframe, and added Enter/Space support to phone/DM/voice surfaces;
- verified all 25 image assets by binary signature and corrected the JPEG-encoded Sosa dialogue portrait from the misleading `.png` extension to `assets/sosa_dialogue.jpg`.

Next:

1. Keep `SAVE_VERSION = 1`; migrate internal `coffin*` identifiers only with an intentional version-2 compatibility plan.
2. Preserve the new handler/pipeline contracts when Chapter 6 adds enemies or effects: every data-referenced effect must have a registered test-covered handler.
3. Physical-browser layout verification remains Priority 0 and cannot be honestly replaced by structural simulation.
4. Begin Priority 5 narrative implementation.

### Priority 5 — Chapter 6 and later chapters — ACTIVE

Completed first conflict (June 21):

- the overpass tenant's denied injury/property claim turns stored Graveframe Collateral into somebody else's material bill;
- Egregore's mirrored Omnis record appears inside the claim portal, carrying the neon-pink cat sticker copied from Kessler's terminal;
- Trace reveals that an indiscriminate Dismantle would erase both the parasite and the tenant's evidence;
- Sosa attempts a narrower, “true” cut, aborts when Somnus selects total erasure, and preserves the claim without unlocking the technique;
- he respects Utica Girl's boundary instead of recruiting her as evidence, asks Top Ranked Gz for logistics rather than rescue, and submits his own witness statement in person;
- the claim reopens review while Sosa knowingly restores the trail to himself;
- Goth Baddie receives the first direct, ugly account of the lost room, arrest, job, Hound, Collateral, and men's shelter. She stays on the line without granting instant forgiveness.

This is a complete conflict because the evidence receives a material outcome and Sosa pays a chosen cost. It is not a Chapter 6 finale.

Next:

1. Add at least one further failed or partial Sever: True application under a different judgment problem before unlock.
2. Make the eventual unlock depend on identifying what must remain, not only Trace/Hellstep/hit counters.
3. Keep Graveframe distinct from the later Reality Marble.
4. Continue the mirrored-record threat and complete Goth's demanded truth, including the concealed overlap in Sosa's immense relationship network.
5. Preserve Utica Girl's independent cohort/housing path and Gz friendship boundaries.
6. Leave room for chapters after Chapter 6.

### Priority 6 — final pixel art and backgrounds — intentionally last

Continue using semantic sprite remaps and high-quality CSS/SVG placeholders until chronology and encounters stop moving.

Final sprites needed: base Pall, Nifl, base Spall, Atlas, base Knell, Relay, base Slag, Overtime, Hound, and possible Graveframe cleanup. Archon and Kessler currently fit strongly.

Final backgrounds needed: Apt 3 interior, Apt 3 access stair, Knell payphone/pharmacy, Relay depot, Nifl warming-route exterior, TOMRA exterior, Archon territory, men’s shelter, and expanded Chapter 6 locations.

Exports should use transparent PNG, consistent pixel density, strong 80–100 px phone silhouettes, and no detail that disappears at battle scale.

## 16. PACKAGING CHECKLIST

1. Run all permanent tests: smoke, balance, save migration, prose audit, combat mechanics, and package verification.
2. Parse every runtime JS file.
3. Validate CSS brace balance.
4. Confirm every routed scene and encounter has aftermath/return routing.
5. Confirm VN screens remain ≤340 characters.
6. Confirm no pre-Kessler taxonomy leaks.
7. Open `cg_stats_scan.html` and test its continue route.
8. Verify `index.html` is at ZIP root.
9. Build one source-complete, itch-safe archive containing the entire canonical `/home/user/game` tree: runtime, README, three core docs, tests/fixtures, and manifests. Keep `index.html` at ZIP root with no enclosing project folder.
10. Update `project-manifest.json` with counts and QA results. Because the manifest is itself archived, do not record the enclosing ZIP's size/hash inside it; report the final archive size and SHA-256 externally after packaging to avoid impossible self-reference.

## 17. NEW-SESSION CONTINUATION PROTOCOL

The canonical editable tree is `/home/user/game`; `/home/user/uploads` is immutable source material; `/home/user/sosa_game.zip` is the only distribution archive. Do not create duplicate working trees, duplicate ZIPs, or satellite lore documents.

At the start of a new Agent Mode session:

1. Ask the agent to read `docs/MASTER_GDD_HANDOFF.md` first, then the dossier and ecology document as needed.
2. Tell it to preserve direct `index.html` loading, phone-first touch behavior, internal save-compatible IDs, the four-button Sever grid, the dialogue-channel rules, and every continuity lock in this handoff.
3. Have it run `node tests/project-audit.js` before editing to establish workspace integrity.
4. Continue physical-device findings before adding Chapter 6 content. Screenshots and fragmented notes are valid live-playtest input and should be fixed directly.
5. After presentation stabilizes, continue Priority 5: add another failed/partial Sever: True judgment case, then earn the eventual unlock by deciding what must remain. Preserve Graveframe versus Reality Marble and leave room beyond Chapter 6.
6. When code or canon changes, update all three core docs, `README.md`, and `project-manifest.json`; add or strengthen permanent tests for the changed contract.
7. Before delivery, run the complete README QA command list, refresh manifest inventory hashes, rebuild the single source-complete ZIP, run package verification, and rerun project audit.

Suggested opening instruction for the next session:

> Continue building SOSA from `/home/user/game`. Treat `docs/MASTER_GDD_HANDOFF.md` as the implementation contract and preserve its continuity, phone, save, dialogue, ecology, combat, and packaging gates. First run the project audit and inspect the latest physical-device feedback. Fix concrete playtest issues before extending Chapter 6. Do not create another project tree, ZIP, or lore document.
