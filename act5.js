/* ACT5 canonical scene script. Requires data/core.js. */
Object.assign(DATA.scenes, {
    "act5_s1": {
        "key": "act5_s1",
        "mode": "vn",
        "title": "MAY 19 — ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "May 19th. 9:00 PM. I wander Utica in a soaked T-shirt under my ACRONYM jacket.\n\nMy phone is a dead black brick. The Sony WF-C510 earbuds are crushed plastic fragments in my pocket. Without the earbuds feeding me network signals, the Ypsilon Veil AR readout is dead. No gauges, no numbers, no chat alerts.",
        "sfx": "rain",
        "nextAction": "gotoScene(\"act5_s1__p2\")"
    },
    "act5_s1__p2": {
        "key": "act5_s1__p2",
        "mode": "vn",
        "title": "MAY 19 — ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "But the structural fault lines didn't vanish. If anything, they're etched straight into my retinas now — bright violet stress lines burning across every brick wall, every chain-link fence, every overpass pillar.",
        "nextAction": "gotoScene(\"act5_s1__p3\")"
    },
    "act5_s1__p3": {
        "key": "act5_s1__p3",
        "mode": "vn",
        "title": "MAY 19 — ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I have no money, no food, no place to sleep. My landlord changed the locks. Utica Girl is in a psych ward because the pressure around me leaked through our apartment. Goth Baddie thinks I ghosted her.",
        "nextAction": "gotoScene(\"act5_one_word\")"
    },
    "act5_s1__p4": {
        "key": "act5_s1__p4",
        "mode": "vn",
        "title": "MAY 19 — ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I am completely alone inside my own head.",
        "nextAction": "gotoScene(\"act5_s2\")"
    },
    "act5_s2": {
        "key": "act5_s2",
        "mode": "vn",
        "title": "MAY 21 — THE THRESHOLD",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "May 21st. 3:00 AM. I squat under a railyard overpass behind Genesee Street. I don't sleep — I freeze and hallucinate.\n\nWithout the network feeding me Validation, the Debt has nowhere to vent. It doesn't dissipate. It accumulates like heavy, stagnant poison in my marrow.\n\n100% Debt. Maximum load.",
        "sfx": "heartbeat",
        "nextAction": "gotoScene(\"act5_s2__tap2\")"
    },
    "act5_s2__tap2": {
        "key": "act5_s2__tap2",
        "mode": "vn",
        "title": "MAY 21 — THE THRESHOLD",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "The last line was May 19, before the lockout finished becoming an arrest. Two days without it isn't recovery. The supply vanished at the same time as the room, the job, the phone, and everybody I could call. My body is only beginning to understand the difference.",
        "nextAction": "gotoScene(\"act5_s2__p2\")"
    },
    "act5_s2__p2": {
        "key": "act5_s2__p2",
        "mode": "vn",
        "title": "MAY 21 — THE THRESHOLD",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "I try to lift my right hand to pull up my hood. Nothing. My fingers are frozen solid. I try to stand, but my legs move before I can even think the thought — walking down the dark alley, steps heavy and mechanical.\n\nI am not steering anymore. Somnus is.",
        "nextAction": "gotoScene(\"act5_s3_cg\")"
    },
    "act5_s3_cg": {
        "key": "act5_s3_cg",
        "mode": "cg",
        "title": "",
        "cg": "cg_coffin_pilot",
        "cgPos": "center top",
        "sfx": "manifest",
        "nextAction": "gotoScene(\"act5_s3_text\")"
    },
    "act5_s3_text": {
        "key": "act5_s3_text",
        "mode": "vn",
        "title": "GRAVEFRAME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_coffin_pilot",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "Somnus doesn't ask permission.\n\nThe liquid-obsidian tar erupts from my spine, engulfing my arms, chest, and legs in a heavy, churning armor of black glass and violet anti-magic.",
        "nextAction": "gotoScene(\"act5_s3_text__p2\")"
    },
    "act5_s3_text__p2": {
        "key": "act5_s3_text__p2",
        "mode": "vn",
        "title": "GRAVEFRAME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_coffin_pilot",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "Plates of hardened obsidian seal around my ribs and skull. My white Shy Guy mask is recessed deep inside an eight-foot predatory cranial frame. A single horizontal slit-wound opens across my chest, burning with violet furnace heat.",
        "nextAction": "gotoScene(\"act5_name_graveframe\")"
    },
    "act5_s3_text__p3": {
        "key": "act5_s3_text__p3",
        "mode": "vn",
        "title": "GRAVEFRAME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_coffin_pilot",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "Forced Graveframe. Graveframe active.\n\nI am locked inside my own body like a passenger in a speeding car with no brakes. Somnus has taken the wheel.",
        "nextAction": "gotoScene(\"act5_s4\")"
    },
    "act5_s4": {
        "key": "act5_s4",
        "mode": "vn",
        "title": "THE PURSUIT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "A dark figure steps out from behind a concrete overpass pillar.\n\nMatte-black tactical gear. Chrome jaw-filter glowing faint blue. Glowing amber Famulus eyes looking out from a severe, scarred face. Black circuit-combustion scarring running up his throat.",
        "nextAction": "gotoScene(\"act5_s4__p2\")"
    },
    "act5_s4__p2": {
        "key": "act5_s4__p2",
        "mode": "vn",
        "title": "THE PURSUIT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "An Egregore Hound.\n\nThe Censor Scout failed to check in, so Egregore sent something built to finish the sentence he started.",
        "nextAction": "gotoScene(\"act5_hound_voice\")"
    },
    "act5_s4__p3": {
        "key": "act5_s4__p3",
        "mode": "vn",
        "title": "THE PURSUIT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Inside the Graveframe, I can't speak. I can only watch through the furnace slit as Somnus flexes five-inch obsidian talons and lunges forward.",
        "nextAction": "startBattle(\"act5_hound_battle\")"
    },
    "act5_s5": {
        "key": "act5_s5",
        "mode": "vn",
        "title": "GRAVEFRAME AFTERMATH",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The Hound is gone. Its wards and burning Circuits came apart like wet cardboard. One retaining wall is scored with violet cuts. I remember forcing Somnus back onto the target. He stopped when the body did.\n\nThat should feel like control.",
        "dynamicText": function(game) {
            var record = game.worldFlags && game.worldFlags.act5Coffin;
            var collateral = record ? (record.collateral || 0) : 0;
            if (collateral < 2) return this.text;
            return "The Hound is gone. So is half the retaining wall. A parked car is opened through the engine; a hydrant main floods the underpass; three apartment windows are black holes. I do not see bodies. I do not know if that means none.\n\nGRAVEFRAME COLLATERAL: " + collateral + ".";
        },
        "nextAction": "gotoScene(\"act5_s5__p2\")"
    },
    "act5_s5__p2": {
        "key": "act5_s5__p2",
        "mode": "vn",
        "title": "GRAVEFRAME AFTERMATH",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The Graveframe cracks open with a hiss of superheated steam. The black glass plates dissolve into liquid tar and sink back into my chest.\n\nMy knees buckle. I hit the wet pavement face-first, my lungs burning, my body completely drained. But the Debt... the Debt has dropped back to 35%.",
        "nextAction": "gotoScene(\"act5_s5__p3\")"
    },
    "act5_s5__p3": {
        "key": "act5_s5__p3",
        "mode": "vn",
        "title": "GRAVEFRAME AFTERMATH",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Somnus vented the entire 100% threshold directly through the executioner.\n\nI crawl two blocks through the rain before my vision goes black.",
        "nextAction": "gotoScene(\"act5_s6\")"
    },
    "act5_s6": {
        "key": "act5_s6",
        "mode": "vn",
        "title": "MAY 21 — DROP-IN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "May 21st. Evening. I wake up on a thin vinyl cot in a drop-in center.\n\nFluorescent lights buzz above. Row of metal fold-out chairs. Blue signs on the pillar: 'RESPECT, DIGNITY, COMPASSION'. A clipboard with sign-in sheets sits on a desk near the door.",
        "nextAction": "gotoScene(\"act5_s6__p2\")"
    },
    "act5_s6__p2": {
        "key": "act5_s6__p2",
        "mode": "vn",
        "title": "MAY 21 — DROP-IN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "A volunteer in a yellow vest sets lukewarm coffee beside the cot.",
        "nextAction": "gotoScene(\"act5_volunteer\")"
    },
    "act5_s6__p3": {
        "key": "act5_s6__p3",
        "mode": "vn",
        "title": "MAY 21 — DROP-IN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "I look down at my hands. They're my hands again. Shaking, dirty, but my own.\n\nI survived Absolute Zero. I survived the Graveframe. I am homeless in Utica with no phone, no job, and no network — but I am alive.",
        "nextAction": "gotoScene(\"act5_end\")"
    },
    "act5_end": {
        "key": "act5_end",
        "mode": "vn",
        "title": "COT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "Alive isn't the same as safe. It isn't housed, sober, trusted, or whole. It only means there is a next thing.\n\nNext: men's shelter. A phone that works. Whatever the Grave becomes when it stops leaking through the pavement.\n\nOhio still on the table? Yeah. When we can.\n\n[ END OF CHAPTER 5 ]",
        "nextAction": "gotoScene(\"act6_silence_receiving\")"
    },
    "act5_hound_voice": {
        "key": "act5_hound_voice",
        "mode": "vn",
        "title": "TERMINATION ORDER",
        "speaker": "Egregore Hound",
        "speakerColor": "#f59e0b",
        "bg": "utica_alley",
        "text": "«TARGET IDENTIFIED: IRREGULAR ZERO.»\n\n«CIRCUIT COMBUSTION ACTIVE.»\n\n«TERMINATION AUTHORIZED.»",
        "nextAction": "gotoScene(\"act5_s4__p3\")"
    },

    "act5_volunteer": {
        "key": "act5_volunteer",
        "mode": "vn",
        "title": "MAY 21 — DROP-IN",
        "speaker": "Volunteer",
        "speakerColor": "#facc15",
        "bg": "dropin_center",
        "text": "“Take it easy, buddy. You were out cold for fourteen hours.”\n\nHe points toward the alley doors.\n\n“Staff found you outside.”",
        "nextAction": "gotoScene(\"act5_s6__p3\")"
    },

});

Object.assign(DATA.scenes, {
    "act5_one_word": {
        key:"act5_one_word", mode:"vn", title:"MAY 19 — ONE WORD", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"Busy. Asleep. Alive. One word—that was all Goth Baddie asked after Columbus.\n\nI press the dead phone’s power button until my thumb hurts. Nothing. From her side, this silence looks exactly like October. Except now she is the one waiting at a gate I cannot reach.",
        nextAction:"gotoScene(\"act5_one_word__p2\")"
    },
    "act5_one_word__p2": {
        key:"act5_one_word__p2", mode:"vn", title:"MAY 19 — ONE WORD", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"“Alive,” I tell the black screen.\n\nNo signal carries it. No tributary opens. Somnus shifts under my shoulder blades anyway, as if hearing the word is enough for him and nobody else.",
        nextAction:"gotoScene(\"act5_s1__p4\")"
    }
});

Object.assign(DATA.scenes, {
    "act6_silence_receiving": {
        key:"act6_silence_receiving", mode:"vn", title:"CHAPTER 6 — THE OTHER SIDE", speaker:"Narrator", speakerColor:"#94a3b8", bg:"css_bg_void",
        text:"While Sosa walks Utica with a dead phone, Goth Baddie is in Ohio watching his status stay offline. The one-word rule produces nothing. She searches hospital numbers and the county jail roster, furious that love keeps becoming administrative work.",
        nextAction:"gotoScene(\"act6_goth_unread\")"
    },
    "act6_goth_unread": {
        key:"act6_goth_unread", mode:"phone", title:"velvetcoffin // unread", messages:[
            {user:"velvetcoffin",time:"5/19 9:14 PM",text:"busy asleep alive. pick one",self:false},
            {user:"velvetcoffin",time:"5/19 11:02 PM",text:"u said alive this morning. dont make that a lie by midnight",self:false},
            {user:"velvetcoffin",time:"5/20 8:31 AM",text:"i called utica hospitals. nobody will tell me shit",self:false},
            {user:"velvetcoffin",time:"5/20 10:47 AM",text:"checked the jail roster. hate that i know how",self:false},
            {user:"velvetcoffin",time:"5/20 6:03 PM",text:"im mad at you. answer so i can be mad where u can hear it",self:false},
            {user:"velvetcoffin",time:"5/21 2:58 AM",text:"please",self:false}
        ],
        nextAction:"gotoScene(\"act6_replacement_phone\")"
    },
    "act6_replacement_phone": {
        key:"act6_replacement_phone", mode:"vn", title:"JUNE 20 — REPLACEMENT PHONE", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"A shelter case manager helps me activate a cheap replacement phone. Discord restores forty-seven unread messages before my contacts finish syncing.\n\nGoth Baddie’s last one is *please*. I type alive, delete it, then send the first ugly piece of the truth badly enough to prove a person wrote it.",
        nextAction:"gotoScene(\"act6_utica_return\")"
    },
    "act6_utica_return": {
        key:"act6_utica_return", mode:"phone", title:"utica_girl", messages:[
            {user:"utica_girl",text:"got out",self:false},
            {user:"utica_girl",text:"not going back to apt 3",self:false},
            {user:"utica_girl",text:"center saved me a seat for the next peer cohort",self:false},
            {user:"utica_girl",text:"finished the module from psych because apparently spite counts as focus",self:false},
            {user:"utica_girl",text:"i dont know if i can live with u again. not asking u to fix that",self:false},
            {user:"utica_girl",text:"just saying im alive",self:false},
            {user:"sosa",text:"heard. proud of u. im alive too",self:true}
        ],
        nextAction:"gotoScene(\"act6_collateral_record\")"
    },
    "act6_collateral_record": {
        key:"act6_collateral_record", mode:"vn", title:"JUNE 20 — WHAT THE STREET PAID", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"A local brief calls it unexplained damage beneath the overpass: one retaining wall scored, no injuries reported. The photo shows violet cuts the city camera cannot render correctly.\n\nI remember steering. I do not remember enough to call the smaller bill mercy.",
        dynamicText:function(game){
            var r=game.worldFlags&&game.worldFlags.act5Coffin; var c=r?(r.collateral||0):0;
            if(c<2) return this.text;
            return "A local brief lists an underpass water-main rupture, a sedan cut through its engine, and three broken apartment windows. One tenant needed stitches from glass. No deaths reported.\n\nGRAVEFRAME COLLATERAL: "+c+". The city has invoices for the parts of survival Somnus did not count.";
        },
        nextAction:"gotoScene(\"act6_teaser_end\")"
    },
    "act6_teaser_end": {
        key:"act6_teaser_end", mode:"vn", title:"CHAPTER 6 — OPEN CHANNEL", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"Alive arrived late, but it arrived. So did the bill.\n\nGoth Baddie wants the truth. Utica Girl wants distance and her next cohort. Egregore has a mirror of me. Somewhere under the city, every cut is still teaching the dark what shape I make.\n\nThe chapter has only started. Ready was never a requirement.",
        nextAction:"gotoTitle"
    }
});

Object.assign(DATA.scenes, {
    "act5_name_graveframe": {
        key:"act5_name_graveframe", mode:"vn", title:"NAMING THE THING DRIVING", speaker:"Sosa", speakerColor:"#B060FF", cg:"cg_coffin_pilot", cgAsBackground:true, cgPos:"center top",
        text:"Somnus built a grave around me and made it walk. Graveframe.\n\nYeah, I’m naming involuntary possession like a mecha form. The joke is still a handle, and I need something to grab while he drives.",
        nextAction:"gotoScene(\"act5_s3_text__p3\")"
    }
});
