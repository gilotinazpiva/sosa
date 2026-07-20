/* Mobile battle cut-ins and encounter-specific victory presentation. Requires data/core.js. */
DATA.battleDialogue = {
    tutorial_1: {
        enemy: [
            { speaker: "The Cold", text: "You can rest here." },
            { speaker: "The Cold", text: "Nobody is coming." },
            { speaker: "The Cold", text: "Your legs already stopped. Your mind is late." },
            { speaker: "The Cold", text: "The fence will hold you when the body lets go." },
            { speaker: "The Cold", text: "No one knows this alley has your name." }
        ],
        sosa: ["No. Not sitting down.", "Phone's still buzzing. Stay up."],
        victory: { badge: "FIRST REFUSAL", title: "STILL HERE", quote: "Something answered when his body could not." }
    },
    act1_battle1: {
        enemy: [
            { speaker: "Frost Shadows", text: "Warmth is temporary." },
            { speaker: "Frost Shadows", text: "Let the moving stop." },
            { speaker: "Frost Shadows", text: "We saved the cold place you left behind." },
            { speaker: "Frost Shadows", text: "Your phone will go dark before morning." }
        ],
        sosa: ["I point. Nightmare jumps them. That counts as a plan.", "Confidence check: fake. Shadow monster: unfortunately real."],
        victory: { badge: "PALL SWARM", title: "LINE HELD", quote: "The alley stays cold. Sosa keeps moving." }
    },
    act1_battle2: {
        enemy: [
            { speaker: "Frost Pack", text: "There is always more cold." },
            { speaker: "Frost Pack", text: "Lie down before the body chooses for you." },
            { speaker: "Frost Pack", text: "The first ones are still inside your sleeves." },
            { speaker: "Frost Pack", text: "Every step spends heat you cannot replace." }
        ],
        sosa: ["More homework. Of course.", "Bus station. Six blocks. Keep moving."],
        victory: { badge: "SECOND WAVE", title: "NOT BURIED", quote: "The shadow learns the shape of refusal." }
    },
    tutorial_2: {
        enemy: [
            { speaker: "Transit Security", text: "Hands where I can see them. Now." },
            { speaker: "Transit Security", text: "Take off the mask." }
        ],
        sosa: ["Don't make me lose the bag.", "Shadow. Scare him. Do not kill him."],
        victory: { badge: "INTERCEPTION", title: "HE RAN", quote: "The guard survives. The platform does not stay intact." }
    },
    act2_alone_dross: {
        enemy: [
            { speaker: "Hallway Cold", text: "SHE LEFT THE ROOM. SHE LEFT YOU IN IT." },
            { speaker: "Hallway Cold", text: "THE DOOR ONLY OPENS ONE WAY." },
            { speaker: "Hallway Cold", text: "WE CAN WAIT LONGER THAN SHE CAN." }
        ],
        sosa: ["I am not going into that hallway.", "The shadow does not need me to."],
        victory: { badge: "SECOND NIGHT", title: "THE SHADOW WENT ALONE", quote: "Sosa never throws a strike. The apartment still fills with broken ice." }
    },
    act2_battle1: {
        enemy: [
            { speaker: "The Cold", text: "Why are you warm?" },
            { speaker: "The Cold", text: "Let us sleep inside your bones." },
            { speaker: "The Cold", text: "The room will lock again. Stay outside with us." },
            { speaker: "The Cold", text: "We remember the bench after you stood up." }
        ],
        sosa: ["Okay, haunted earbuds. Show me where to look.", "Hands steady. Pretend this is a mechanic I understand."],
        victory: { badge: "YPSILON CALIBRATION", title: "FAULT LINE FOUND", quote: "The Veil begins translating survival into numbers." }
    },
    dross_chime_base: {
        enemy: [
            { speaker: "Wire-Jaw", text: "hey. you there?" },
            { speaker: "Wire-Jaw", text: "pick up." },
            { speaker: "Wire-Jaw", text: "don't leave me on read." }
        ],
        sosa: ["One body. One line. Cut the cable mouth.", "You are not a person waiting. You are the wait."],
        victory: { badge: "WIRE-JAW", title: "ONE BAD NUMBER BLOCKED", quote: "The body dies. Something deeper keeps the line open." }
    },
    dross_chime: {
        enemy: [
            { speaker: "Wire-Jaw", text: "hey. you there? pick up." },
            { speaker: "Wire-Jaw", text: "I can make her answer." },
            { speaker: "Wire-Jaw", text: "don't block me." },
            { speaker: "Wire-Jaw", text: "typing… typing… typing…" },
            { speaker: "Wire-Jaw", text: "baby please tell me you're alive." },
            { speaker: "Wire-Jaw", text: "you read it. why didn't you answer?" }
        ],
        sosa: ["That voice is almost hot enough to work. Almost.", "My phone is not a mouth. Stop using hers."],
        victory: { badge: "KNELL DISCONNECTED", title: "NO ANSWER", quote: "The ringing stops. The need does not." }
    },
    dross_spall: {
        enemy: [
            { speaker: "Concrete Thing", text: "It wasn't that bad." },
            { speaker: "Concrete Thing", text: "You should have moved." },
            { speaker: "Concrete Thing", text: "Don't make this worse." },
            { speaker: "Concrete Thing", text: "The wall only broke where you touched it." },
            { speaker: "Concrete Thing", text: "Apologize before the next impact." }
        ],
        sosa: ["Concrete, rebar, zero communication skills. My dating profile has a boss form.", "Hit it wrong and the wall hits somebody else. Cool. No pressure."],
        victory: { badge: "IMPACT LOOP BROKEN", title: "RUBBLE", quote: "The fragments stop moving. The building remembers." }
    },
    street_predator_enc: {
        enemy: [
            { speaker: "Street Predator", text: "Wallet. Phone. Don't be stupid." },
            { speaker: "Street Predator", text: "I said don't look at me." }
        ],
        sosa: ["The line is already there.", "He's a person. Somnus does not care."],
        victory: { badge: "HUMAN CASUALTY", title: "NO CLEAN WIN", quote: "Fifty-two dollars. A child in a wallet photo. No call to 911." }
    },
    act3_hunt_battle: {
        enemy: [
            { speaker: "Drainage Nest", text: "HE CAME BACK TO WATCH." },
            { speaker: "The Cold", text: "THE MASK MEANS HE WANTS IT." },
            { speaker: "Concrete Thing", text: "LET HIM FEEL THE IMPACT FIRST." }
        ],
        sosa: ["I chose to come here. That sounded cooler in my head.", "Easy. Two earbuds, one nightmare, absolutely no adult supervision."],
        victory: { badge: "FIRST HUNT", title: "HE WENT LOOKING", quote: "Competence arrives before Sosa decides whether he should want it." }
    },
    act3_hunt_battle2: {
        enemy: [
            { speaker: "Mixed Nest", text: "HE CAME PREPARED TO WATCH." },
            { speaker: "Wire-Jaw", text: "THE MAP IS ANOTHER MESSAGE." },
            { speaker: "Concrete Thing", text: "BREAK THE HAND HOLDING IT." },
            { speaker: "The Cold", text: "KEEP HIM HERE UNTIL THE PHONE DIES." }
        ],
        sosa: ["Color coding was a good idea.", "This is starting to feel like a job. Bad sign."],
        victory: { badge: "HUNT TWO", title: "THREE BODIES DOWN", quote: "The city remembers every cut even when Sosa does not." }
    },
    act3_grief_battle: {
        enemy: [
            { speaker: "Grief Residue", text: "Open the wound again." },
            { speaker: "Grief Residue", text: "Give us the part that still hurts." }
        ],
        sosa: ["I don't want to fight. I want something to break.", "I've been awake too long for this."],
        victory: { badge: "GRIEF WEIGHT", title: "PRESSURE RISING", quote: "The lesser residue falls. The real wound is still forming." }
    },
    kessler_rescue_swarm: {
        enemy: [
            { speaker: "Crossfeed", text: "COLD FILLS THE CRACKS." },
            { speaker: "Wire-Jaw", text: "EVERY IMPACT MAKES ANOTHER RING." },
            { speaker: "Concrete Thing", text: "THE CALL TELLS THE FORCE WHERE TO GO." },
            { speaker: "The Cold", text: "THREE WOUNDS. ONE LOOP." }
        ],
        sosa: ["A silver-haired government wizard just parried for me. Trying not to make that my whole personality.", "One target at a time. I can fake competent for thirty seconds.", "Somnus, the blue brackets are helping. Do not eat the government wizard."],
        victory: { badge: "BLUE BRACKET", title: "CONVERGENCE INTERRUPTED", quote: "Sosa survives because a stranger chose intervention over observation." }
    },
    kessler_joint_hunt: {
        enemy: [
            { speaker: "Atlas", text: "THE STAIR HELD. SOMEBODY ELSE HAD TO BREAK." },
            { speaker: "Atlas", text: "EVERY SAFE ROOM REQUIRES A BEARER." },
            { speaker: "Atlas", text: "TRANSFER ACCEPTED. INJURY REASSIGNED." },
            { speaker: "Atlas", text: "CHOOSE WHO CARRIES THE BUILDING." }
        ],
        sosa: ["Web the load map. Stop hitting whichever body volunteers.", "Elias, bracket the apartments. I will cut the transfer.", "The building has a trauma load balancer. Cool. Hate that."],
        victory: { badge: "TYPE-II // ATLAS", title: "THE LOAD LOST ITS BEARER", quote: "The residents leave alive. The building remains an argument with gravity." }
    },
    dross_nifl: {
        enemy: [
            { speaker: "Frost Group Chat", text: "EVERY DOOR OPENS AWAY FROM WARMTH." },
            { speaker: "Frost Group Chat", text: "THREE BODIES. ONE WINTER." },
            { speaker: "Frost Group Chat", text: "HEAT IS A ROUTE WE CAN CLOSE." },
            { speaker: "Frost Group Chat", text: "REST. WE WILL ARRIVE TOGETHER." }
        ],
        sosa: ["Three bodies, one account. Fine. I’ve survived worse Discord servers.", "Web the doors, vents, pavement—everything sharing the cold.", "If this works, I’m calling it skill. If not, hypothermia."],
        victory: { badge: "FROST GROUP CHAT", title: "SHARED WINTER SEVERED", quote: "The bodies break. The city still has to keep the doors warm." }
    },
    dross_overtime: {
        enemy: [
            { speaker: "Overtime", text: "YOU CAN LEAVE WHEN EVERYBODY CAN." },
            { speaker: "Overtime", text: "COVER THE LINE." },
            { speaker: "Overtime", text: "BREAKS ARE WHY THE SHIFT IS BEHIND." },
            { speaker: "Overtime", text: "SOMEBODY WEAKER WILL REPLACE YOU." }
        ],
        sosa: ["Stop attacking on beat. Make the shift wait.", "Web the belt, clock, and break-room route. Cut the schedule.", "Elias, bracket the line. I am taking an unauthorized break."],
        victory: { badge: "TYPE-II // OVERTIME", title: "THE SHIFT MISSED ITS BEAT", quote: "The body dies when enough people stop covering the gap." }
    },
    dross_slag: {
        enemy: [
            { speaker: "Work Heap", text: "Just finish this one." },
            { speaker: "Work Heap", text: "You can rest after." },
            { speaker: "Work Heap", text: "You're still standing. Keep working." },
            { speaker: "Work Heap", text: "The break room is for people who caught up." },
            { speaker: "Work Heap", text: "If you stop, somebody weaker takes your place." }
        ],
        sosa: ["Standing isn't consent.", "I know what 'one more thing' costs."],
        victory: { badge: "SHIFT INTERRUPTED", title: "SLAG BROKEN", quote: "Endurance is not the same thing as living." }
    },
    act3_battle2: {
        enemy: [
            { speaker: "Dross Pressure", text: "The alley knows your shape now." },
            { speaker: "Dross Pressure", text: "Make the wound heavier." }
        ],
        sosa: ["This place is learning me.", "Somnus, kill it before the whole block grows a mouth."],
        victory: { badge: "DROSS PRESSURE", title: "TOO LATE", quote: "Reality snaps back. Something larger answers." }
    },
    archon_fight: {
        enemy: [
            { speaker: "The Condemned Witness", text: "YOU WERE SEEN. THAT WAS THE HELP." },
            { speaker: "The Condemned Witness", text: "EVERY WINDOW WATCHED YOU CONTINUE." },
            { speaker: "The Condemned Witness", text: "NO ONE CAME BECAUSE OBSERVATION CLOSED THE CASE." }
        ],
        sosa: ["Elias, hold the occupied rooms. I take the body.", "Red tag in the middle. Break the report, then the building.", "If she answers, your whole argument is cooked.", "Blue bracket on my Web. We do this together or the block comes down."],
        victory: { badge: "JOINT ARCHON CLOSURE", title: "WITNESS BECAME ACTION", quote: "The Scout and the irregular save the residents—and create evidence neither can take back." }
    },
    censor_enc: {
        enemy: [
            { speaker: "Elias Kessler", text: "Easy. This can still be a clean detention." },
            { speaker: "Elias Kessler", text: "If I call support, this stops being my collar." },
            { speaker: "Elias Kessler", text: "You were supposed to be soft numbers." },
            { speaker: "Elias Kessler", text: "LETHAL AUTHORITY—FIELD OVERRIDE." }
        ],
        sosa: ["Lunch-break line still bitter behind my teeth.", "He keeps looking. It keeps feeding me.", "This was coffee five minutes ago.", "Don't cut the grid. Cut what makes it believe."],
        victory: { badge: "EGREGORE SCOUT DOWN", title: "KESSLER'S AUDIT FAILED", quote: "The terminal records his override before the man holding it dies." }
    },
    act5_hound_battle: {
        enemy: [
            { speaker: "Egregore Hound", text: "IRREGULAR ZERO. TERMINATION AUTHORIZED." },
            { speaker: "Egregore Hound", text: "SEVERING FAMILIAR TETHER." },
            { speaker: "Egregore Hound", text: "HOST AGENCY IS NOT REQUIRED." }
        ],
        sosa: ["I am still in here.", "One hand on the wheel. That's all I have.", "Somnus. Not everything around him."],
        victory: { badge: "GRAVEFRAME", title: "SURVIVAL WITHOUT CONSENT", quote: "The Hound is gone. The collateral remains counted." }
    }
};

/* Optional post-battle exchange. Sosa speaks; Somnus answers only through movement. */
DATA.victoryBanter = {
    tutorial_1:{sosa:["Okay. Cool. I died so hard I unlocked a roommate.","Still breathing. Extremely rude of me."],somnus:["The shadow rises behind him and refuses to explain itself.","One memory-eye checks his pulse. The others watch the bodies."]},
    act1_battle1:{sosa:["Look at us. Terrible plan. Great numbers.","I pointed. He committed several felonies against winter."],somnus:["The shadow gathers the broken frost beneath Sosa's feet.","The aperture closes with the patience of a sheathed blade."]},
    act1_battle2:{sosa:["Six blocks left. Naturally the random encounters respawn.","If cold has a loot table, I want socks."],somnus:["The shadow leans toward the bus station before Sosa does.","A memory-eye blinks once, unimpressed by the complaint."]},
    tutorial_2:{sosa:["Good news: he lived. Bad news: I have a supervillain backpack now.","Nonlethal. Mostly. Put that on my résumé."],somnus:["The shadow loosens its grip on the fleeing guard.","The shadow keeps one blade raised until the footsteps vanish."]},
    act2_alone_dross:{sosa:["I stayed in the room. My nightmare handled the hallway.","Remote work. Finally a job suited to my condition."],somnus:["Somnus returns through the locked door without opening it.","The shadow settles at Sosa's back like it never left."]},
    act2_battle1:{sosa:["My earbuds gave the haunting subtitles. We live in hell.","One clean line. Zero clue what I’m doing. Great start."],somnus:["Violet lines fade across Somnus's surface one by one.","The familiar tilts its aperture toward the newly visible HUD."]},
    street_predator_enc:{sosa:["That was a person. Don't give me the victory music.","Fifty-two dollars and somebody's family photo. Great win."],somnus:["Somnus watches the body without celebration.","The shadow offers the wallet back. It does not understand why Sosa recoils."]},
    dross_spall:{sosa:["Therapy would have been cheaper than fighting concrete.","The wall stopped hitting back. I remain emotionally load-bearing."],somnus:["Somnus lets the last stone strike its chest and fall dead.","The familiar traces the crack that no longer leads anywhere."]},
    act3_grief_battle:{sosa:["Didn't fix anything. Did make the alley quieter.","Great. I punched grief. Somehow I still have grief."],somnus:["Somnus lowers every blade but keeps close to Sosa's spine.","A memory-eye closes. The others give him privacy badly."]},
    act3_battle2:{sosa:["We won the tutorial. The sky is loading a boss.","That pressure bar did not go down. Love that for me."],somnus:["Somnus looks upward before the territory answers.","The aperture opens toward the shape forming beyond the alley."]},
    act3_hunt_battle:{sosa:["A therapist would hate this arc. Good thing I cannot afford one.","I came looking and won. That feels better than it should."],somnus:["Somnus stands taller when Sosa admits he enjoyed it.","The familiar arranges the fragments like trophies. Sosa kicks them apart."]},
    act3_hunt_battle2:{sosa:["Color-coded map: one. Horrors beyond reason: zero.","This is becoming a profession without payroll."],somnus:["Somnus taps the surviving map route with one black talon.","The shadow waits for Sosa to mark the next location."]},
    dross_chime_base:{sosa:["Blocked, reported, spiritually dismembered.","One bad number down. Somehow voicemail remains undefeated."],somnus:["Somnus crushes the severed receiver beneath a slow palm.","The familiar listens to a dead line for three seconds too long."]},
    dross_slag:{sosa:["Shift over. Nobody tell management I authorized it.","Turns out ‘still standing’ is not a personality. Huge news for me."],somnus:["Somnus punches the dead timecard through the floor.","The aperture spits one ember into the silent break room."]},
    dross_nifl:{sosa:["Weather group chat muted. Notifications permanently off.","Three bodies, one winter, zero competent moderators."],somnus:["Somnus cuts the final cold route after every body has fallen.","The memory-eyes follow warmth returning beneath the doors."]},
    dross_chime:{sosa:["Copied her voice, missed the part where she tells me what to do. Amateur.","Typing indicator revoked with extreme prejudice."],somnus:["Somnus closes its aperture exactly like ending a call.","The familiar turns toward Sosa's real phone and waits."]},
    kessler_rescue_swarm:{sosa:["Government wizard carried. I contributed vibes and blood loss.","He checked my pupils before arresting me. Weirdly intimate. Not sexy. Still weird."],somnus:["Somnus and Kessler's last bracket dissolve without touching.","The familiar stares at Kessler's sunglasses. Kessler stares back."]},
    kessler_joint_hunt:{sosa:["Trauma load balancer uninstalled. Building still needs a contractor.","We saved the apartments. Please do not inspect the apartments."],somnus:["Somnus tests the stair once, then withdraws its weight.","The familiar keeps its blades inside Kessler's blue perimeter."]},
    dross_overtime:{sosa:["Mandatory overtime denied. My strongest labor action yet.","Clock out, freaks. I was not even scheduled today."],somnus:["Somnus tears the final punch card into perfectly equal strips.","The aperture closes when the belt misses its fourth beat."]},
    archon_fight:{sosa:["Observation became participation. Get philosophically wrecked.","Residents alive. Building condemned. That's a win with paperwork."],somnus:["Somnus lowers its blades when the last occupied window goes dark.","The familiar leaves Kessler standing inside the final blue bracket."]},
    censor_enc:{sosa:["Worst coffee meeting ever. Zero stars. One corpse.","He wanted a clean report. I gave him modern art."],somnus:["Somnus catches Kessler's falling terminal before it hits the blood.","The familiar watches the blue grid die and does not look pleased."]},
    act5_hound_battle:{sosa:["I won from the passenger seat. That sentence is not comforting.","Somnus, we need to discuss your definition of nearby."],somnus:["The Graveframe turns toward the damaged street before releasing Sosa.","One memory-eye finds Sosa inside the armor. The talons remain extended."]}
};

/* Contextual progression: experience without monster-wallet loot. */
DATA.battleRewards = {
 tutorial_1:{exp:1,found:'BATTLE CONTINUATION',lesson:'The body can end before participation does.'},
 act1_battle1:{exp:1,found:'WORKING OUTLET',lesson:'Looking gives the shadow direction.'},
 act1_battle2:{exp:1,found:'ROUTE TO THE STATION',lesson:'Pall packs can reinforce inside the same fight.'},
 tutorial_2:{exp:1,found:'BACKPACK RETAINED',lesson:'Human targets require restraint, not taxonomy.'},
 act2_alone_dross:{exp:1,found:'APT 3 DOOR HELD',lesson:'Somnus can act while Sosa refuses the hallway.'},
 act2_battle1:{exp:1,found:'VEIL READ',lesson:'One loaded fault can stay visible under pressure.'},
 street_predator_enc:{exp:0,found:'NOTHING WORTH TAKING',lesson:'Winning against a person is still a casualty.'},
 dross_spall:{exp:1,found:'IMPACT PATTERN',lesson:'Break the force, then repair what kept producing it.'},
 act3_grief_battle:{exp:1,found:'ONE QUIETER ALLEY',lesson:'Violence cannot finish grief.'},
 act3_battle2:{exp:1,found:'WATCHING WINDOWS',lesson:'The neighborhood is becoming more than a nest.'},
 act3_hunt_battle:{exp:2,found:'FIRST RESONANCE',lesson:'Black Flash is convergence, not a command.'},
 act3_hunt_battle2:{exp:2,found:'THREE-FAMILY MAP',lesson:'Mixed bodies trade openings until one family falls.'},
 dross_chime_base:{exp:1,found:'BLOCKED NUMBER',lesson:'One Wire-Jaw is a body; the waiting remains.'},
 dross_slag:{exp:1,found:'STOPPED CLOCK',lesson:'Standing is not consent to continue.'},
 dross_nifl:{exp:2,found:'WARMING ROUTE RESTORED',lesson:'Web cuts the relationship carrying the cold.'},
 dross_chime:{exp:2,found:'REAL VOICE VERIFIED',lesson:'Perfect imitation still cannot waste time like a person.'},
 kessler_rescue_swarm:{exp:2,found:'BLUE BRACKET TRUST',lesson:'Crossfeed loses when cooperation is better than its loop.'},
 kessler_joint_hunt:{exp:2,found:'LOAD MAP',lesson:'The fastest cut and safest cut are not the same.'},
 dross_overtime:{exp:2,found:'MISSED SHIFT BEAT',lesson:'The line stops when people stop covering the gap.'},
 archon_fight:{exp:3,found:'RESIDENTS ACCOUNTED FOR',lesson:'Witness becomes help only when somebody acts.'},
 censor_enc:{exp:2,found:'OMNIS MIRROR RECEIPT',lesson:'Institutional attention is still attention.'},
 act5_hound_battle:{exp:3,found:'GRAVEFRAME RECORD',lesson:'Survival without consent still leaves a bill.'}
};
