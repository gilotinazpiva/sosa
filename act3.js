/* ACT3 canonical scene script. Requires data/core.js. */
Object.assign(DATA.scenes, {
    "act3_s1": {
        "key": "act3_s1",
        "mode": "vn",
        "title": "JANUARY: THE CALL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "January 2026. The phone rings.\n\nNot Discord. A real number. A relative I have not spoken to in years.",
        "sfx": "phone-buzz",
        "nextAction": "gotoScene(\"act3_caller\")"
    },
    "act3_s2": {
        "key": "act3_s2",
        "mode": "vn",
        "title": "THE GRIEF WEIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I can feel Somnus.\n\nHe's not pulsing anymore. He's shaking. The obsidian mass on my back is fracturing, leaking violet fire in jagged uncontrolled bursts. He's mirroring me. The grief is a frequency he doesn't know how to process. He's destabilizing.",
        "nextAction": "gotoScene(\"act3_s3\")"
    },
    "act3_s3": {
        "key": "act3_s3",
        "mode": "vn",
        "title": "THE SINKHOLE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The air starts to ripple. Not a clean fault line — a jagged tear in the alleyway.",
        "nextAction": "gotoScene(\"act3_s3__tap2\")"
    },
    "act3_s3__tap2": {
        "key": "act3_s3__tap2",
        "mode": "vn",
        "title": "THE SINKHOLE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I've been awake, using, and crashing in this neighborhood for two months. Right now the chemical quiet is draining out and every feeling is arriving at once. I don't know how this magic shit works, but it feels like my exhaustion is acting like a metaphysical sinkhole. I'm a walking landfill for negative energy.",
        "nextAction": "gotoScene(\"act3_s3__tap3\")"
    },
    "act3_s3__tap3": {
        "key": "act3_s3__tap3",
        "mode": "vn",
        "title": "THE SINKHOLE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "(I keep thinking if I just sit down for a minute, maybe everything will stop moving.)",
        "nextAction": "gotoScene(\"act3_s3__p2\")"
    },
    "act3_s3__p2": {
        "key": "act3_s3__p2",
        "mode": "vn",
        "title": "THE SINKHOLE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Somnus is screaming. The grief is a beacon, pulling cold things and concrete things out of the woodwork. They smell the crash. I don't even want to fight. I just want to tear something apart. Preferably something that isn't me.",
        "nextAction": "startBattle(\"act3_grief_battle\")"
    },
    "act3_s3b": {
        "key": "act3_s3b",
        "mode": "vn",
        "title": "CALCIFIED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The frost and concrete shards dissolve into black glass and vanish, but the air doesn't clear. If anything the pressure gets heavier, settling low in my sternum like wet concrete.",
        "nextAction": "gotoScene(\"act3_s3b__p2\")"
    },
    "act3_s3b__p2": {
        "key": "act3_s3b__p2",
        "mode": "vn",
        "title": "CALCIFIED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Something heavy tries to form at the mouth of the alley—work gloves, crushed cans, gray dust—but grief-pressure tears it apart before it can hold a body.\n\nThe pressure does not leave. It sinks into the ground and waits.",
        "nextAction": "gotoScene(\"act3_s3c\")"
    },
    "act3_s3c": {
        "key": "act3_s3c",
        "mode": "vn",
        "title": "WEIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The pillar crumbles into gravel.\n\nI can't breathe. Between my mother, Vegas, Texas, and the Utica girl's eyes through the vent in the other room, I don't know how much more weight there is to carry. Every time I cut one down, there's another one behind it. Heavier.",
        "nextAction": "gotoScene(\"act3_s3c__p2\")"
    },
    "act3_s3c__p2": {
        "key": "act3_s3c__p2",
        "mode": "vn",
        "title": "WEIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The alley answers with more of them—cold and concrete things braided together, grief wearing a body. Somnus doesn't ask. He just rises.\n\nAbove them, every dark apartment window catches the same amber reflection. Too many eyes. None of them blinking.",
        "nextAction": "gotoScene(\"act3_s3c__p2__tap2\")"
    },
    "act3_s3c__p2__tap2": {
        "key": "act3_s3c__p2__tap2",
        "mode": "vn",
        "title": "WEIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "After this, if the block keeps folding, I don't think they are mindless anymore. I think the neighborhood has been watching long enough to develop an opinion.",
        "nextAction": "startBattle(\"act3_battle2\")"
    },
    "act3_top_ranked_gz": {
        "key": "act3_top_ranked_gz",
        "mode": "phone",
        "title": "top_ranked_gz",
        "messages": [
            {
                "user": "sosa",
                "text": "my mom died",
                "self": true
            },
            {
                "user": "bender",
                "text": "call me. not doing the bit rn",
                "self": false
            },
            {
                "user": "meki",
                "text": "u at the apartment?",
                "self": false
            },
            {
                "user": "ysl",
                "text": "say something so we know ur there",
                "self": false
            },
            {
                "user": "sosa",
                "text": "im here",
                "self": true
            },
            {
                "user": "bender",
                "text": "stay there and answer the phone",
                "self": false
            },
            {
                "user": "meki",
                "text": "we got u bro just pick up",
                "self": false
            }
        ],
        "nextAction": "ventDebt:12|gotoScene(\"act3_s2\")"
    },

    "act3_caller": {
        "key": "act3_caller",
        "mode": "vn",
        "title": "JANUARY: THE CALL",
        "speaker": "Relative",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "“It is your mother.”\n\nA breath on the other end.\n\n“She is gone.”",
        "nextAction": "gotoScene(\"act3_s1_reaction\")"
    },

    "act3_s1_reaction": {
        "key": "act3_s1_reaction",
        "mode": "vn",
        "title": "JANUARY: THE CALL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The grief does not feel like crying. It feels like five hundred pounds of wet concrete settling onto my chest.\n\nThere is half a line left on the cracked plate. I do it before calling anyone back.\n\nThe grief stays exactly where it is.",
        "nextAction": "gotoScene(\"act3_top_ranked_gz\")"
    },

    "act3_february": {
        "key": "act3_february",
        "mode": "vn",
        "title": "FEBRUARY",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "February has no schedule.\n\nI wake when the phone gets loud, use enough to make choosing a task possible, answer women until the room feels occupied, then sleep while daylight moves across the blank TV wall.\n\nI still do not have a job.",
        "nextAction": "gotoScene(\"act3_february__p2\")"
    },

    "act3_february__p2": {
        "key": "act3_february__p2",
        "mode": "vn",
        "title": "FEBRUARY",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The monsters give the nights structure.\n\nCold where weather does not explain it. Dust rising before an impact. Phones ringing with no sender.\n\nAt first I avoid those signs.\n\nThen I start writing down where they happen.",
        "nextAction": "gotoScene(\"act3_utica_orientation\")"
    },

    "act3_feb_top_gz": {
        "key": "act3_feb_top_gz",
        "mode": "phone",
        "title": "top_ranked_gz",
        "messages": [
            {
                "user": "bender",
                "text": "why do u have a map of haunted dumpsters",
                "self": false
            },
            {
                "user": "sosa",
                "text": "side quests",
                "self": true
            },
            {
                "user": "meki",
                "text": "side quest is getting a job",
                "self": false
            },
            {
                "user": "ysl",
                "text": "friend card revoked if u die to trash",
                "self": false
            },
            {
                "user": "sosa",
                "text": "cant die. tested it",
                "self": true
            },
            {
                "user": "bender",
                "text": "that is not how testing works bro",
                "self": false
            }
        ],
        "nextAction": "ventDebt:8|gotoScene(\"act3_first_hunt\")"
    },

    "act3_first_hunt": {
        "key": "act3_first_hunt",
        "mode": "vn",
        "title": "FIRST DELIBERATE HUNT",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "utica_alley",
        "text": "A drainage tunnel near the rail line stays frozen through a warm afternoon. Concrete chips appear in a widening circle around the entrance. Deeper inside, more shapes scrape against the dark and wait.\n\nSosa goes there after midnight on purpose.",
        "nextAction": "gotoScene(\"act3_first_hunt__p2\")",
        "sfx": "footsteps"
    },

    "act3_first_hunt__p2": {
        "key": "act3_first_hunt__p2",
        "mode": "vn",
        "title": "FIRST DELIBERATE HUNT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The mask goes on before anything attacks.\n\nThat is new.\n\nSomnus rises behind me like he has been waiting for me to admit what we are doing.",
        "nextAction": "gotoScene(\"act3_hunt_voice\")"
    },

    "act3_hunt_voice": {
        "key": "act3_hunt_voice",
        "mode": "vn",
        "title": "DRAINAGE NEST",
        "speaker": "The Cold",
        "speakerColor": "#a5f3fc",
        "bg": "utica_alley",
        "text": "«He came back.»\n\nConcrete shifts behind the voice.\n\n«This time he wants to watch.»",
        "nextAction": "gotoScene(\"act3_hunt_response\")"
    },

    "act3_hunt_response": {
        "key": "act3_hunt_response",
        "mode": "vn",
        "title": "DRAINAGE NEST",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Cold crawls into the concrete thing’s cracks and freezes there. The wall thing stands straighter.\n\n“Oh, cool. They have a combo now. I have one move and a medically irresponsible amount of confidence.”\n\nSomnus opens the furnace slit wider.",
        "nextAction": "startBattle(\"act3_hunt_battle\")"
    },

    "act3_resonance_aftermath": {
        "key": "act3_resonance_aftermath",
        "mode": "vn",
        "title": "FIRST RESONANCE — AFTERIMAGE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The first black impact deletes the cold thing’s borrowed armor and the tunnel sends more bodies at me. The alignment never comes back.\n\nBlack Flash is not a button. It is weather with a personal grudge. I got struck once and somehow the other guy exploded.",
        "dynamicText": function(game) {
            var hits=game.worldFlags&&game.worldFlags.firstResonanceHits||1;
            if(hits>=3) return "Three black impacts. The first breaks Ice Mortar. The next two catch the reinforcements while the Zone makes every motion feel inevitable.\n\nI did not do that on command. I got lucky three times in a row so violently it looked like talent. That distinction feels important.";
            if(hits===2) return "It happens twice. First the cold thing folds around a black-violet impact; then one reinforcement enters at exactly the wrong angle and reality syncs again.\n\nThe third chance separates before I can touch it. Good. Terrifying. I was starting to believe my own highlight reel.";
            return this.text;
        },
        "nextAction": "gotoScene(\"act3_hunt_after\")"
    },
    "act3_hunt_after": {
        "key": "act3_hunt_after",
        "mode": "vn",
        "title": "AFTER THE HUNT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The last body comes apart against the tunnel wall.\n\nI am not surprised this time. I held Trace. I chose targets. I knew when the shadow would move.\n\nFor several seconds, I feel fucking incredible.",
        "nextAction": "gotoScene(\"act3_hunt_after__p2\")"
    },

    "act3_hunt_after__p2": {
        "key": "act3_hunt_after__p2",
        "mode": "vn",
        "title": "AFTER THE HUNT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Then I notice Somnus is purring and I am smiling under the mask.\n\nThe smile takes longer to disappear than it should.",
        "nextAction": "gotoScene(\"act3_hunt_quiet\")"
    },

    "act3_march_call": {
        "key": "act3_march_call",
        "mode": "vn",
        "title": "MARCH 14",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "A staffing agency calls at 10:12 in the morning.\n\nTOMRA needs day-shift sorters, 9 AM to 5 PM. Steel-toe shoes preferred. Transportation not provided. Start Monday if the background check clears.",
        "nextAction": "gotoScene(\"act3_march_utica\")",
        "sfx": "phone-buzz"
    },

    "act3_march_utica": {
        "key": "act3_march_utica",
        "mode": "vn",
        "title": "MARCH 14",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“Take it.”\n\nShe is already looking up the bus route.\n\n“You need money, and I need you to stop hunting haunted garbage for cigarette cash.”",
        "nextAction": "gotoScene(\"act3_march_sosa\")"
    },

    "act3_march_sosa": {
        "key": "act3_march_sosa",
        "mode": "vn",
        "title": "MARCH 14",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "“It is not for cigarette cash.”\n\nShe looks at the cigarettes on the windowsill.\n\n“Fine. Mostly not.”",
        "nextAction": "setDebt:20|recover:full|gotoScene(\"act4_s1\")"
    },

    "act3_post_grief": {
        "key": "act3_post_grief",
        "mode": "vn",
        "title": "AFTER THE GRIEF SURGE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The mixed bodies finally stop moving.\n\nAmber reflections remain in every apartment window, but nothing steps out of them.\n\nThe neighborhood is watching. It has not decided what that means yet.",
        "nextAction": "gotoScene(\"act3_post_grief__p2\")"
    },

    "act3_post_grief__p2": {
        "key": "act3_post_grief__p2",
        "mode": "vn",
        "title": "AFTER THE GRIEF SURGE",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "utica_alley",
        "text": "Sosa goes home, ignores a call, showers in his clothes, and sleeps beside the Utica Girl until afternoon.\n\nThe eyes remain in the windows for the rest of January.",
        "nextAction": "setDebt:25|recover:full|gotoScene(\"act3_february\")"
    },

    "act3_second_hunt_seed": {
        "key": "act3_second_hunt_seed",
        "mode": "vn",
        "title": "FEBRUARY — HUNT TWO",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "utica_alley",
        "text": "Three separate reports appear on Sosa's map in one week: cold beneath a closed laundromat, impact cracks under an overpass, and a phone ringing inside a disconnected booth.\n\nThe signs overlap at the old bus depot.",
        "nextAction": "gotoScene(\"act3_second_hunt\")"
    },

    "act3_second_hunt": {
        "key": "act3_second_hunt",
        "mode": "vn",
        "title": "OLD BUS DEPOT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "This time I bring coffee, cigarettes, a charged phone, and the confidence of somebody who has survived enough bad ideas to mistake the pattern for skill.\n\nSomnus is already spread across the ceiling.",
        "nextAction": "gotoScene(\"act3_second_hunt_voice\")"
    },

    "act3_second_hunt_voice": {
        "key": "act3_second_hunt_voice",
        "mode": "vn",
        "title": "MIXED NEST",
        "speaker": "Wire-Jaw",
        "speakerColor": "#f0abfc",
        "bg": "utica_alley",
        "text": "«He made a list.»\n\nThe cold answers from beneath the benches.\n\n«He thinks the list belongs to him.»",
        "nextAction": "gotoScene(\"act3_second_hunt_response\")"
    },

    "act3_second_hunt_response": {
        "key": "act3_second_hunt_response",
        "mode": "vn",
        "title": "MIXED NEST",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Wire-Jaw’s screens flare whenever the concrete thing moves. Cold gathers in both shadows. They are trading cues now.\n\n“My map has color coding,” I tell them. “I am still the most organized disaster in this tunnel.”",
        "nextAction": "startBattle(\"act3_hunt_battle2\")"
    },

    "act3_second_hunt_after": {
        "key": "act3_second_hunt_after",
        "mode": "vn",
        "title": "THREE BODIES DOWN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Cold, wire, and concrete bodies lie dismantled across the depot.\n\nViolet cut marks remain in every surface Somnus touched. The Veil keeps ringing after I stop looking.\n\nWe are leaving marks faster than the city can forget them.",
        "nextAction": "setDebt:35|gotoScene(\"act3_chime_base_seed\")"
    },

    "act3_relay_seed": {
        "key": "act3_relay_seed",
        "mode": "vn",
        "title": "APRIL 9 — EVERY LINE OPENS",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "The blank calls from November and December return at once.\n\nEvery dead phone in the depot lights up. Sosa's own voice comes through the public-address speakers, asking him to pick up.",
        "nextAction": "gotoScene(\"act3_relay_voice\")",
        "sfx": "static-burst"
    },

    "act3_relay_voice": {
        "key": "act3_relay_voice",
        "mode": "vn",
        "title": "THE RELAY",
        "speaker": "Wire-Jaw",
        "speakerColor": "#f0abfc",
        "bg": "css_bg_void",
        "text": "«sosa?»\n\nThen Goth Baddie. Then his mother. Then Bender.\n\nEvery stolen voice says the same thing.\n\n«pick up.»",
        "nextAction": "gotoScene(\"act3_relay_manifest\")"
    },

    "act3_relay_manifest": {
        "key": "act3_relay_manifest",
        "mode": "vn",
        "title": "THE RELAY",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "Wet copper, dead screens, charger cords, and blinking notification lights pull themselves from the depot walls.\n\nThe Wire-Jaw has stopped being one unanswered call. It is a relay for all of them.",
        "nextAction": "gotoScene(\"act3_relay_response\")",
        "sfx": "collapse"
    },

    "act3_relay_response": {
        "key": "act3_relay_response",
        "mode": "vn",
        "title": "THE RELAY",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "“You had all winter to come up with a better opening line.”\n\nSomnus drops from the ceiling behind it.\n\n“Block this number.”",
        "nextAction": "setDebt:30|startBattle(\"dross_chime\")"
    },

    "act3_relay_after": {
        "key": "act3_relay_after",
        "mode": "vn",
        "title": "RELAY DISCONNECTED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Somnus hooks the charger-cord jaw and pulls until screens burst through the body.\n\nWet copper keeps vibrating with stolen voices after the last light dies.",
        "nextAction": "gotoScene(\"act3_relay_after__p2\")"
    },

    "act3_relay_after__p2": {
        "key": "act3_relay_after__p2",
        "mode": "vn",
        "title": "SATURATION",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "The depot goes silent.\n\nIt is not clean. Every hunt has left violet cuts in the neighborhood. Cold sites, impact sites, dead outlets—one growing map of black-violet grit.\n\nThe amber eyes in nearby windows finally open together.",
        "nextAction": "ventDebt:12|gotoScene(\"act3_relay_quiet\")"
    },

});

Object.assign(DATA.scenes, {
    "act3_utica_orientation": {
        key:"act3_utica_orientation", mode:"vn", title:"FEBRUARY — HER SCHEDULE", speaker:"Narrator", speakerColor:"#94a3b8", bg:"css_bg_void",
        text:"Utica Girl leaves at eight in a donated blazer with the duct-taped folder under one arm. Peer-support orientation. Six weeks, two bus transfers, attendance mandatory. Sosa pretends to be asleep until the deadbolt closes.",
        nextAction:"gotoScene(\"act3_utica_orientation_return\")"
    },
    "act3_utica_orientation_return": {
        key:"act3_utica_orientation_return", mode:"vn", title:"FEBRUARY — HER SCHEDULE", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"She comes home with a temporary lanyard and three pages of notes.\n\n“They need references.”\n\n“I can lie professionally.”\n\n“You are not one.” She hangs the lanyard where the TV used to be. “I want keys that open somewhere besides this apartment.”",
        nextAction:"gotoScene(\"act3_utica_orientation_sosa\")"
    },
    "act3_utica_orientation_sosa": {
        key:"act3_utica_orientation_sosa", mode:"vn", title:"FEBRUARY — HER SCHEDULE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I make fun of the lanyard because saying I’m proud feels too naked. She calls me emotionally defective and starts highlighting the next module.\n\nThat night I map haunted dumpsters. In the morning she gets on the bus and does something that might become a life.",
        nextAction:"gotoScene(\"act3_feb_top_gz\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_hunt_quiet": {
        key:"act3_hunt_quiet", mode:"vn", title:"AFTER THE FIRST HUNT — 3:18 AM", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Apt 3 is dark. She is asleep in the only bed. I sit upright on the couch with the mask in my lap because my coat smells like frozen drain water and black dust.\n\nMy hands are not shaking. That should feel like relief.",
        nextAction:"gotoScene(\"act3_hunt_quiet_pleasure\")"
    },
    "act3_hunt_quiet_pleasure": {
        key:"act3_hunt_quiet_pleasure", mode:"vn", title:"AFTER THE FIRST HUNT — 3:24 AM", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I replay the impossible hit until my pulse matches it: line, timing, black-violet weight, the body coming apart exactly where I chose.\n\nI want to feel it again. Not survive it. Feel it.\n\nSomnus settles behind the couch like he already knew.",
        nextAction:"gotoScene(\"act3_hunt_quiet_morning\")"
    },
    "act3_hunt_quiet_morning": {
        key:"act3_hunt_quiet_morning", mode:"vn", title:"AFTER THE FIRST HUNT — MORNING", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"She finds me sitting up with one shoe still on.\n\n“You win?”\n\n“Yeah.”\n\n“Then why the couch?”\n\n“Too awake.”\n\nShe leaves a glass of water on the floor and goes back to the bedroom. No lecture. That somehow makes lying there harder.",
        nextAction:"ventDebt:4|gotoScene(\"act3_gz_after_first_hunt\")"
    },
    "act3_gz_after_first_hunt": {
        key:"act3_gz_after_first_hunt", mode:"phone", title:"top_ranked_gz", messages:[
            {user:"sosa",text:"home",self:true},
            {user:"bender",text:"jokes done. call me next time u walk back. u dont gotta talk",self:false},
            {user:"meki",text:"send pin first. water. check fingers and toes. then eat something",self:false},
            {user:"ysl",text:"friends dont solo queue this shit. wait for the team",self:false},
            {user:"sosa",text:"all of u are annoying",self:true},
            {user:"bender",text:"good ur still reading",self:false}
        ],
        nextAction:"ventDebt:8|gotoScene(\"act3_gz_boundaries\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_relay_quiet": {
        key:"act3_relay_quiet", mode:"vn", title:"AFTER THE RELAY — PHANTOM RING", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Back at Apt 3, my phone keeps vibrating against my thigh after I put it on the table. The screen is dark every time. Phantom vibration, probably.\n\nSomnus curls behind the couch. Three memory-eyes blink in the rhythm of voices the Relay stole.",
        nextAction:"gotoScene(\"act3_relay_real_voice\")"
    },
    "act3_relay_real_voice": {
        key:"act3_relay_real_voice", mode:"vn", title:"AFTER THE RELAY — REAL VOICE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"A real voice note finally arrives. Goth Baddie, brushing her teeth. “No, you cannot make that sexy. Did you eat?” She laughs with toothpaste in her mouth and changes subjects halfway through.\n\nThe Relay copied her voice perfectly. It never knew how to waste time.",
        nextAction:"gotoScene(\"act3_relay_appetite\")"
    },
    "act3_relay_appetite": {
        key:"act3_relay_appetite", mode:"vn", title:"AFTER THE RELAY — APPETITE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I should be horrified. Instead I keep replaying how clean the cut felt once every stolen call became one system. The Relay got smarter. I got better at killing it.\n\nSome rotten part of me hopes the city builds another. I lock the phone and hate how long that thought stays warm.",
        nextAction:"ventDebt:6|gotoScene(\"act3_atlas_seed\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_goth_after_hunt": {
        key:"act3_goth_after_hunt", mode:"phone", title:"velvetcoffin", messages:[
            {user:"sosa",text:"still awake",self:true},
            {user:"velvetcoffin",text:"for u unfortunately",self:false},
            {user:"sosa",text:"tell me what to do",self:true},
            {user:"velvetcoffin",text:"dangerous sentence pretty boy. camera on. mask off. jacket stays",self:false},
            {user:"sosa",text:"why the jacket",self:true},
            {user:"velvetcoffin",text:"because i said so. u asked for instructions remember",self:false},
            {user:"sosa",text:"yes maam",self:true},
            {user:"velvetcoffin",text:"good. now breathe where i can see you",self:false}
        ],
        nextAction:"gotoScene(\"act3_goth_after_hunt_vn\")"
    },
    "act3_goth_after_hunt_vn": {
        key:"act3_goth_after_hunt_vn", mode:"vn", title:"AFTER THE FIRST HUNT — ANOTHER KIND OF CONTROL", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I prop the phone against a mug and let her tell me how to sit, when to touch, when to stop. Somnus goes still behind the couch.\n\nThe obedience brings my pulse down. That is care. It is also me handing somebody else the steering wheel ten minutes after I enjoyed what happened when the shadow took it.",
        nextAction:"ventDebt:6|gotoScene(\"act3_second_hunt_seed\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_gz_boundaries": {
        key:"act3_gz_boundaries", mode:"phone", title:"top_ranked_gz", messages:[
            {user:"bender",text:"real talk i got written up for staying on that call at work",self:false},
            {user:"bender",text:"still call if its death bad. dont call because ur lonely and name it emergency",self:false},
            {user:"meki",text:"and i got rent too. cant cashapp this week. i can find bus routes and food. ask for the thing u need",self:false},
            {user:"ysl",text:"silly group name doesnt make us on-call staff. friendship is not a contract",self:false},
            {user:"sosa",text:"heard. ask not summon",self:true},
            {user:"bender",text:"good. boundaries patch notes accepted",self:false}
        ],
        nextAction:"ventDebt:4|gotoScene(\"act3_goth_after_hunt\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_nifl_seed": {
        key:"act3_nifl_seed", mode:"vn", title:"APRIL 6 — BAD THAW", speaker:"Narrator", speakerColor:"#94a3b8", bg:"utica_alley",
        text:"Utica warms above freezing for two days. Three blocks around Apt 3 do not. Bus riders take the same wrong turn away from the library and warming room. Frost grows on the inside of every door they try instead.",
        nextAction:"gotoScene(\"act3_nifl_utica\")"
    },
    "act3_nifl_utica": {
        key:"act3_nifl_utica", mode:"vn", title:"APRIL 6 — BAD THAW", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"“Two people came into the drop-in with frostbite after walking four blocks.” She drops donated gloves on the table. “They both swear the bus left them across from the door. It didn’t.”\n\nHer lanyard is still on. She is asking me because she already knows I will believe her.",
        nextAction:"gotoScene(\"act3_nifl_map\")"
    },
    "act3_nifl_map": {
        key:"act3_nifl_map", mode:"vn", title:"APRIL 7 — ONE SHAPE", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"I map twelve cold spots. They are not twelve anything. Frost moves between vents when I stop looking. Every pale body turns its head on the same beat.\n\nI Trace one. The line appears across all of them—and keeps going through the doors behind them.",
        nextAction:"gotoScene(\"act3_nifl_voice\")"
    },
    "act3_nifl_voice": {
        key:"act3_nifl_voice", mode:"vn", title:"FROST GROUP CHAT", speaker:"The Cold", speakerColor:"#a5f3fc", bg:"utica_alley",
        text:"«EVERY DOOR IS THE SAME DOOR.»\n\nThe voice comes from radiators, bus shelters, coat zippers, and three mouths made of dirty ice.\n\n«WARMTH IS WHERE WE SEND YOU LAST.»",
        nextAction:"gotoScene(\"act3_nifl_web\")"
    },
    "act3_nifl_web": {
        key:"act3_nifl_web", mode:"vn", title:"FROST GROUP CHAT", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"Great. The weather made a group chat. One target is the lie; the bodies are accounts.\n\nI stop asking which body owns the line and follow every place carrying the same cold. Somnus branches through doors, vents, and pavement at once.\n\n“Apparently I’m building a move list now. Fine. Sever: Web.”",
        nextAction:"unlock:web|gotoScene(\"act3_web_readout\")"
    },
    "act3_web_readout": {
        key:"act3_web_readout", mode:"vn", title:"YPSILON VEIL — NEW READ", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"The Veil tries to subtitle what I made.\n\nWEBBED // 2 EXCHANGES\nOUTPUT SUPPRESSED\nBARRAGES SHORTENED\nFIELD ACTIONS GROUNDED\nRELATIONSHIPS PINNED\n\nLooks stolen from a game menu. Useful theft. I can work with useful.",
        nextAction:"gotoScene(\"act3_nifl_before\")"
    },
    "act3_nifl_before": {
        key:"act3_nifl_before", mode:"vn", title:"SEVER THE MAP", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"The Web does not tell me which body matters. It tells me none of them do. The route between them is the monster.\n\nSomnus spreads to my right, furnace slit closed, waiting for a direction wide enough to fit the problem.",
        nextAction:"startBattle(\"dross_nifl\")"
    },
    "act3_nifl_after": {
        key:"act3_nifl_after", mode:"vn", title:"FROST GROUP CHAT — SEVERED", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"Web cuts the shared route. Every ice body tries to move through every other one. Limbs fold backward. Doorframe frost tears out in long translucent nerves. Somnus pins the largest shape and pulls until the whole block exhales stolen breath.",
        nextAction:"gotoScene(\"act3_web_residue\")"
    },
    "act3_web_residue": {
        key:"act3_web_residue", mode:"vn", title:"CUT ASH", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"Web leaves leftovers: ice dust, brick powder, and violet grit suspended along its branches. The Veil stacks them into three marks: CUT ASH.\n\nSomnus’s horizontal slit pulls at the cloud, then closes. Whatever that wants to become, it is not a move yet.",
        nextAction:"gotoScene(\"act3_nifl_after__p2\")"
    },
    "act3_nifl_after__p2": {
        key:"act3_nifl_after__p2", mode:"vn", title:"APRIL 7 — ROUTES RESTORED", speaker:"Narrator", speakerColor:"#94a3b8", bg:"utica_alley",
        text:"The temperature rises six degrees. The bus shelter map points toward the library again. Heat returns to two apartments and not the third. The landlord blames old pipes. The warming room logs four arrivals who cannot explain why they walked in circles.",
        nextAction:"gotoScene(\"act3_nifl_utica_after\")"
    },
    "act3_nifl_utica_after": {
        key:"act3_nifl_utica_after", mode:"vn", title:"APRIL 8 — DONATED GLOVES", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"She carries the donated gloves back to the drop-in.\n\n“Whatever you did, people found the door today.”\n\nI tell her the weather changed. She looks at the violet cut beneath my thumbnail and lets me keep the lie because her bus is coming.",
        nextAction:"ventDebt:8|gotoScene(\"act3_nifl_appetite\")"
    },
    "act3_nifl_appetite": {
        key:"act3_nifl_appetite", mode:"vn", title:"APRIL 8 — NEW BUTTON", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Web is still vibrating under the block. I can feel every surface it touched. Three bodies would have been a fight. One distributed body felt like a system asking me to understand it.\n\nI liked understanding it. The next evening, every dead phone in the depot lights up at once.",
        nextAction:"setDebt:30|gotoScene(\"act3_relay_seed\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_chime_base_seed": {
        key:"act3_chime_base_seed", mode:"vn", title:"FEBRUARY — ONE BAD NUMBER", speaker:"Narrator", speakerColor:"#94a3b8", bg:"css_bg_void",
        text:"A payphone outside a shuttered pharmacy rings after its cord has been cut. One cracked smartphone drags itself from the snow on charger cables. Unlike the depot nest, nothing else answers with it. One body. One stolen notification tone.",
        nextAction:"gotoScene(\"act3_chime_base_voice\")"
    },
    "act3_chime_base_voice": {
        key:"act3_chime_base_voice", mode:"vn", title:"WIRE-JAW", speaker:"Wire-Jaw", speakerColor:"#f0abfc", bg:"css_bg_void",
        text:"«hey.»\n\nThe speaker pops.\n\n«you there?»\n\nIt cannot copy a person yet. It only knows the shape of waiting and the sound a phone makes before somebody disappoints you.",
        nextAction:"gotoScene(\"act3_chime_base_response\")"
    },
    "act3_chime_base_response": {
        key:"act3_chime_base_response", mode:"vn", title:"WIRE-JAW", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"“One phone. One ugly cable mouth. See? This is a normal haunted-object problem.”\n\nThe charger cords tighten around a bus-stop post. Somnus rises at my right.\n\n“Relatively normal. Shut up.”",
        nextAction:"setDebt:35|startBattle(\"dross_chime_base\")"
    },
    "act3_chime_base_after": {
        key:"act3_chime_base_after", mode:"vn", title:"WIRE-JAW — DISCONNECTED", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Somnus splits the phone body and tears the charger-cord jaw from the post. One speaker keeps saying *hey* after the battery comes out.\n\nI crush it under my boot. The dead payphone rings once more from inside the wall.",
        nextAction:"gotoScene(\"act3_chime_base_after__p2\")"
    },
    "act3_chime_base_after__p2": {
        key:"act3_chime_base_after__p2", mode:"vn", title:"FEBRUARY — ONE BODY", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"This one was simple: a single appetite wearing one pile of wire. The depot cold and concrete were separate too, even when they hunted together.\n\nI write three headings in my notes—cold, impact, phone—and mistake classification for control.",
        nextAction:"ventDebt:5|gotoScene(\"act3_march_call\")"
    }
});

Object.assign(DATA.scenes, {
    "act3_atlas_seed": {
        key:"act3_atlas_seed", mode:"vn", title:"APRIL 10 — THE THIRD STEP IS FINE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"The landlord finally replaces the cracked third tread. It holds.\n\nThe first time somebody steps on it, a plate breaks in Apt 3’s kitchen. The second time, plaster falls over the couch. No impact upstairs. No footsteps inside. The force moved somewhere safer for the stair.",
        nextAction:"gotoScene(\"act3_atlas_seed__p2\")"
    },
    "act3_atlas_seed__p2": {
        key:"act3_atlas_seed__p2", mode:"vn", title:"APRIL 10 — DAMAGE ROUTER", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I press the repaired tread with one boot. The Veil shows the load jump past me, climb the wall, and split a bathroom tile instead.\n\n“Great. The building installed a load balancer for trauma.”\n\nSomnus leans toward every glowing line at once.",
        nextAction:"gotoScene(\"act3_atlas_seed__p3\")"
    },
    "act3_atlas_seed__p3": {
        key:"act3_atlas_seed__p3", mode:"vn", title:"APRIL 10 — NOT YET", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Web could map it. Furnace could remove half the building. People are asleep on the other side of every answer.\n\nI pull Somnus back. The violet load-lines remain under fresh paint.\n\nAt 8:12 I leave for TOMRA. Somewhere behind me, a blue terminal notices the map.",
        nextAction:"gotoScene(\"act4_s2\")"
    }
});

/* Additional speaker ownership splits from act-by-act audit. */
Object.assign(DATA.scenes.act3_utica_orientation_return,{speaker:'Narrator',speakerColor:'#94a3b8',text:'She comes home with a temporary lanyard and three pages of notes.',nextAction:'gotoScene("act3_orientation_utica1")'});
Object.assign(DATA.scenes,{
 act3_orientation_utica1:{key:'act3_orientation_utica1',mode:'vn',title:'FEBRUARY — HER SCHEDULE',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“They need references.”',nextAction:'gotoScene("act3_orientation_sosa1")'},
 act3_orientation_sosa1:{key:'act3_orientation_sosa1',mode:'vn',title:'FEBRUARY — HER SCHEDULE',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I can lie professionally.”',nextAction:'gotoScene("act3_orientation_utica2")'},
 act3_orientation_utica2:{key:'act3_orientation_utica2',mode:'vn',title:'FEBRUARY — HER SCHEDULE',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“You are not one.” She hangs the lanyard where the TV used to be. “I want keys that open somewhere besides this apartment.”',nextAction:'gotoScene("act3_utica_orientation_sosa")'}
});
Object.assign(DATA.scenes.act3_hunt_quiet_morning,{speaker:'Narrator',speakerColor:'#94a3b8',text:'She finds Sosa sitting up with one shoe still on.',nextAction:'gotoScene("act3_hunt_morning_utica1")'});
Object.assign(DATA.scenes,{
 act3_hunt_morning_utica1:{key:'act3_hunt_morning_utica1',mode:'vn',title:'AFTER THE FIRST HUNT — MORNING',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“You win?”',nextAction:'gotoScene("act3_hunt_morning_sosa1")'},
 act3_hunt_morning_sosa1:{key:'act3_hunt_morning_sosa1',mode:'vn',title:'AFTER THE FIRST HUNT — MORNING',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“Yeah.”',nextAction:'gotoScene("act3_hunt_morning_utica2")'},
 act3_hunt_morning_utica2:{key:'act3_hunt_morning_utica2',mode:'vn',title:'AFTER THE FIRST HUNT — MORNING',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“Then why the couch?”',nextAction:'gotoScene("act3_hunt_morning_sosa2")'},
 act3_hunt_morning_sosa2:{key:'act3_hunt_morning_sosa2',mode:'vn',title:'AFTER THE FIRST HUNT — MORNING',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“Too awake.”',nextAction:'gotoScene("act3_hunt_morning_after")'},
 act3_hunt_morning_after:{key:'act3_hunt_morning_after',mode:'vn',title:'AFTER THE FIRST HUNT — MORNING',speaker:'Narrator',speakerColor:'#94a3b8',bg:'css_bg_void',text:'She leaves a glass of water on the floor and goes back to the bedroom. No lecture. That somehow makes lying there harder.',nextAction:'ventDebt:4|gotoScene("act3_gz_after_first_hunt")'}
});
