/* ACT1 canonical scene script. Requires data/core.js. */
Object.assign(DATA.scenes, {
    "act1_s1": {
        "key": "act1_s1",
        "mode": "vn",
        "title": "MID-OCTOBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "Richardson Public Library. 2 PM. Corner PC—sticky F key, chair sinks two inches left. My home office. Six hours refreshing Discord like a rat in a Skinner box.\n\nLeg bouncing hard enough to kick the tower. Three Bang energies, zero sleep. A $160 UI study due and I cannot focus for shit.",
        "nextAction": "gotoScene(\"act1_s1__tap2\")"
    },
    "act1_s1__tap2": {
        "key": "act1_s1__tap2",
        "mode": "vn",
        "title": "MID-OCTOBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "Because she is buying my ticket. One-way Southwest. West Virginia to Vegas for her; Texas to Vegas for me. We have never shared a state. In three days that stops mattering.",
        "nextAction": "gotoScene(\"act1_s1b\")"
    },
    "act1_s1b": {
        "key": "act1_s1b",
        "mode": "vn",
        "title": "THE PLAN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "The plan is fucking stupid, and I'm doing it anyway.\n\nShe has a bartender job lined up in Vegas. The job comes with a room. One bed.\n\nShe says I can stay with her. Obviously we are sharing it. That is at least sixty percent of the plan.",
        "nextAction": "gotoScene(\"act1_s1b__tap2\")"
    },
    "act1_s1b__tap2": {
        "key": "act1_s1b__tap2",
        "mode": "vn",
        "title": "THE PLAN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "I was renting one bedroom from the people renting an apartment. They were not allowed to rent the room to me. The landlord found out, their lease blew up, and I had to leave.\n\nWhat I got out with fits in the green backpack.",
        "nextAction": "gotoScene(\"act1_s1b__p2\")"
    },
    "act1_s1b__p2": {
        "key": "act1_s1b__p2",
        "mode": "vn",
        "title": "THE PLAN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "We're going to live there. Degenerate. Free. Her behind a bar pouring drinks for tourists, me... existing next to a woman who actually wants me in the room. Not a situationship. Not a roster slot. Her. The real one.",
        "nextAction": "gotoScene(\"act1_s1b__p3\")"
    },
    "act1_s1b__p3": {
        "key": "act1_s1b__p3",
        "mode": "vn",
        "title": "THE PLAN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "The Southwest tab is still open behind Discord. No confirmation number yet. I refresh it anyway, because staring at an empty inbox hard enough has historically solved all my problems.",
        "nextAction": "gotoScene(\"act1_s1b__p4\")"
    },
    "act1_s1b__p4": {
        "key": "act1_s1b__p4",
        "mode": "vn",
        "title": "THE PLAN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "Three days. Texas prologue ends. Vegas opening theme starts.\n\nThat is absolutely how real life works. Don't fact-check me.",
        "nextAction": "gotoScene(\"act1_s1c\")"
    },
    "act1_s1c": {
        "key": "act1_s1c",
        "mode": "dm-list",
        "title": "Direct Messages",
        "messages": [
            {
                "handle": "velvetcoffin",
                "preview": "u better be ready for the strip baby",
                "time": "2m",
                "unread": false,
                "pinned": true
            },
            {
                "handle": "top_ranked_gz",
                "preview": "YSL: vegas trip is crazy",
                "time": "1h",
                "unread": true,
                "pinned": true
            },
            {
                "handle": "honeyvenom_",
                "preview": "omg r u actually going??",
                "time": "5h",
                "unread": true
            },
            {
                "handle": "dollcruxh",
                "preview": "be safe out there <3",
                "time": "1d",
                "unread": false
            },
            {
                "handle": "mochaviolet",
                "preview": "hope ur day goes okay!!",
                "time": "1w",
                "unread": false
            },
            {
                "handle": "cloudnymph",
                "preview": "LMAO that is SO real",
                "time": "2d",
                "unread": true
            },
            {
                "handle": "faerieriot",
                "preview": "read 2:43 AM",
                "time": "3d",
                "unread": false
            },
            {
                "handle": "peachykeened",
                "preview": "have you eaten today?",
                "time": "1mo",
                "unread": false
            },
            {
                "handle": "xx_hollow_xx",
                "preview": "keep it out of general pls",
                "time": "1mo",
                "unread": false
            },
            {
                "handle": "oldroommate",
                "preview": "you good?",
                "time": "2mo",
                "unread": false
            },
            {
                "handle": "nightshift",
                "preview": "call me when ur awake",
                "time": "3mo",
                "unread": false
            },
            {
                "handle": "servermod",
                "preview": "warning: rules violation",
                "time": "3mo",
                "unread": false
            },
            {
                "handle": "supportbot",
                "preview": "ticket closed",
                "time": "4mo",
                "unread": false
            },
            {
                "handle": "scam_bot_99",
                "preview": "FREE nitro click here",
                "time": "6mo",
                "unread": false
            },
            {
                "handle": "random_dude",
                "preview": "bro hop on",
                "time": "1yr",
                "unread": false
            }
        ],
        "nextAction": "gotoScene(\"act1_s1d\")"
    },
    "act1_s1d": {
        "key": "act1_s1d",
        "mode": "phone",
        "title": "velvetcoffin",
        "messages": [
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "text": "ok so i found the southwest flight. im buying yours tonight. you just have to get to the airport halloween morning.",
                "self": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "text": "im flying charleston -> columbus -> vegas same day. job is lined up. they give me a room. one bed. hope u dont snore.",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "youre actually buying my ticket. from west virginia. for a homeless guy in texas. this is either love or a felony.",
                "self": true,
                "draft": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "text": "lmaooo stfu 😭 both. we are escaping. we are literally going to disappear into vegas together.",
                "self": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "text": "im serious though. no more stress. you in my bed. me pouring drinks for drunk tourists. we live.",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "bag is packed (its a green hiking backpack with like 4 items in it but still). i am ready to be a kept man. my ambition is purely horizontal. and also like. yours. specifically.",
                "self": true,
                "draft": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "text": "good boy 😘 screenshot when the boarding pass hits. i love you idiot.",
                "self": false
            }
        ],
        "nextAction": "gotoScene(\"act1_s1e\")"
    },
    "act1_s1e": {
        "key": "act1_s1e",
        "mode": "vn",
        "title": "CLOSING TIME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "6:00 PM. The lights flicker. The librarian gives me the look — the one that says I know you're functionally homeless, now get out.\n\nI pack slow. Green hiking backpack.",
        "nextAction": "gotoScene(\"act1_s1e__p2\")"
    },
    "act1_s1e__p2": {
        "key": "act1_s1e__p2",
        "mode": "vn",
        "title": "CLOSING TIME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "The jacket cuffs are still damp. The backpack strap has rubbed the same groove into my shoulder all week.\n\nThere is so little inside that the charging cables knock together when I walk.",
        "nextAction": "gotoScene(\"act1_s1e__p3\")"
    },
    "act1_s1e__p3": {
        "key": "act1_s1e__p3",
        "mode": "vn",
        "title": "CLOSING TIME",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "library_corner",
        "text": "Out there the air has that sharp October bite. I'm just a guy with a backpack pretending I don't sleep in a ditch.\n\nBut it's fine. She's buying the ticket. She's flying. A few days and I'm out of here.",
        "nextAction": "gotoScene(\"act1_s2\")"
    },
    "act1_s2": {
        "key": "act1_s2",
        "mode": "vn",
        "title": "OCTOBER 31",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "October 31st. Halloween.\n\nI've been checking the phone every three minutes for six hours. No text. No boarding pass screenshot. No \"wheels up baby.\" Nothing.",
        "nextAction": "gotoScene(\"act1_s2__p2\")"
    },
    "act1_s2__p2": {
        "key": "act1_s2__p2",
        "mode": "vn",
        "title": "OCTOBER 31",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "I'm sitting in the GEICO ditch near City Hall. Freezing. Ticket she was supposed to send never hit my email. Her Discord status went offline around noon and never came back. I sent six messages. Then three more. Then I stopped because sending a tenth message to the girl you actually love is a special kind of self-harm.",
        "nextAction": "gotoScene(\"act1_s2__p3\")"
    },
    "act1_s2__p3": {
        "key": "act1_s2__p3",
        "mode": "vn",
        "title": "OCTOBER 31",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "The silence coming off the screen is so loud it's making my teeth ache.\n\n(She's beautiful. She's funny. She said she loved me in a voice memo once while she was high. Of course something went wrong on the day we were supposed to run away together. Of course the universe would take the one that was real.)",
        "nextAction": "gotoScene(\"act1_s2_dms\")"
    },
    "act1_s2_dms": {
        "key": "act1_s2_dms",
        "mode": "dm-list",
        "title": "Direct Messages",
        "messages": [
            {
                "handle": "velvetcoffin",
                "preview": "You: please text me when you see this",
                "time": "3d",
                "unread": false,
                "pinned": true
            },
            {
                "handle": "top_ranked_gz",
                "preview": "YSL: vegas trip is crazy",
                "time": "12h",
                "unread": true,
                "pinned": true
            },
            {
                "handle": "vamp_tears",
                "preview": "send picss",
                "time": "1h",
                "unread": true
            },
            {
                "handle": "lunarsigh",
                "preview": "are u ignoring me?",
                "time": "10m",
                "unread": true
            },
            {
                "handle": "glitch_bitch",
                "preview": "lmao that is SO real",
                "time": "2d",
                "unread": true
            },
            {
                "handle": "dollcruxh",
                "preview": "voice message",
                "time": "1d",
                "unread": true
            },
            {
                "handle": "mochaviolet",
                "preview": "hope ur day goes okay!!",
                "time": "1w",
                "unread": false
            },
            {
                "handle": "honeyvenom_",
                "preview": "gg ez",
                "time": "2w",
                "unread": false
            },
            {
                "handle": "faerieriot",
                "preview": "read 2:43 AM",
                "time": "3w",
                "unread": false
            },
            {
                "handle": "peachykeened",
                "preview": "have you eaten today?",
                "time": "1mo",
                "unread": false
            },
            {
                "handle": "xx_hollow_xx",
                "preview": "keep it out of general pls",
                "time": "1mo",
                "unread": false
            },
            {
                "handle": "oldroommate",
                "preview": "you good?",
                "time": "2mo",
                "unread": false
            },
            {
                "handle": "nightshift",
                "preview": "call me when ur awake",
                "time": "3mo",
                "unread": false
            },
            {
                "handle": "servermod",
                "preview": "warning: rules violation",
                "time": "3mo",
                "unread": false
            },
            {
                "handle": "supportbot",
                "preview": "ticket closed",
                "time": "4mo",
                "unread": false
            },
            {
                "handle": "scam_bot_99",
                "preview": "FREE nitro click here",
                "time": "6mo",
                "unread": false
            },
            {
                "handle": "random_dude",
                "preview": "bro hop on",
                "time": "1yr",
                "unread": false
            }
        ],
        "nextAction": "gotoScene(\"act1_s2b\")"
    },
    "act1_s2b": {
        "key": "act1_s2b",
        "mode": "vn",
        "title": "THE SILENCE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "11:59 PM.\n\nThe Vegas dream didn't just pop. It evaporated. One minute I'm refreshing my email for a Southwest confirmation a girl in West Virginia promised to buy me; the next I'm just a guy in a thin jacket shivering in a literal hole in the ground with a green backpack that holds nothing useful.",
        "nextAction": "gotoScene(\"act1_s2b__p2\")"
    },
    "act1_s2b__p2": {
        "key": "act1_s2b__p2",
        "mode": "vn",
        "title": "THE SILENCE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "I don't know why she stopped talking. I don't know if she's okay. All I know is the world just got very cold and the part of me that always writes excuses for her is already drafting one. Not because I forgive every pretty face on the roster — because it's her. Because with her it was never a game.",
        "nextAction": "gotoScene(\"act1_s2b__p3\")"
    },
    "act1_s2b__p3": {
        "key": "act1_s2b__p3",
        "mode": "vn",
        "title": "THE SILENCE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "ditch_predawn",
        "text": "I need to get warm.",
        "nextAction": "gotoScene(\"act1_s2_move\")"
    },
    "act1_s2_move": {
        "key": "act1_s2_move",
        "mode": "vn",
        "title": "WALKING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I drag myself out of the ditch and start walking toward the 24-hour laundromat. The cold is vicious.\n\nThe streets will not stay straight. Overpass pillars look bent. I really don't have the budget for a psychotic break right now.\n\nThere's a weight on my neck. Pressing down.",
        "nextAction": "gotoScene(\"act1_s3_inside\")"
    },
    "act1_s3_inside": {
        "key": "act1_s3_inside",
        "mode": "vn",
        "title": "THE LAUNDROMAT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "laundromat_dawn",
        "text": "I make it inside. Warm air hits hard enough to hurt.\n\nThe dryer glass gives me back a face I barely recognize: cheeks hollow, curls mashed wet under the hood, eyes doing that flat thing they do when the rest of me is too tired to panic.",
        "sfx": "door",
        "nextAction": "gotoScene(\"act1_s3_inside__tap2\")"
    },
    "act1_s3_inside__tap2": {
        "key": "act1_s3_inside__tap2",
        "mode": "vn",
        "title": "THE LAUNDROMAT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "laundromat_dawn",
        "text": "I have been outside since late September. Park benches, library stairs, whatever stays dry until somebody notices me lying there.",
        "nextAction": "gotoScene(\"act1_s3_inside__p2\")"
    },
    "act1_s3_inside__p2": {
        "key": "act1_s3_inside__p2",
        "mode": "vn",
        "title": "THE LAUNDROMAT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "laundromat_dawn",
        "text": "The attendant, a guy who looks like he's lived on Newport Lights and regret, gives me the side-eye. I give him the nod — the 'I am a paying customer who is definitely not having a mental breakdown' nod. I buy a $2 stale vending machine coffee just to rent the floor space.",
        "nextAction": "gotoScene(\"act1_s3_inside__p3\")"
    },
    "act1_s3_inside__p3": {
        "key": "act1_s3_inside__p3",
        "mode": "vn",
        "title": "THE LAUNDROMAT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "laundromat_dawn",
        "text": "But the weight isn't gone. It's vibrating on my neck like a broken hydraulic pump.",
        "nextAction": "gotoScene(\"act1_s3_mask_cg\")"
    },
    "act1_s3_mask_cg": {
        "key": "act1_s3_mask_cg",
        "mode": "cg",
        "title": "",
        "cg": "cg_mask_laundromat",
        "cgPos": "center top",
        "nextAction": "gotoScene(\"act1_s3_mask_text\")"
    },
    "act1_s3_mask_text": {
        "key": "act1_s3_mask_text",
        "mode": "vn",
        "title": "MASK ON",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_mask_laundromat",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "I catch my reflection in the glass. I look like a fucking corpse. I need armor.\n\nI pull the Shy Guy mask out of my green backpack. Cheap plastic, strap held together with a staple, looks stupid as hell. But putting it on — Jesus, it helps. It lowers the fucking volume on the world.",
        "nextAction": "gotoScene(\"act1_s3_mask_text__tap2\")"
    },
    "act1_s3_mask_text__tap2": {
        "key": "act1_s3_mask_text__tap2",
        "mode": "vn",
        "title": "MASK ON",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "text": "Just me, the white mask with the black zigzag mouth, and the industrial dryers rattling through the wall.\n\nThen something hard slams against the glass from outside. Not a person. The air behind the window turns wrong-cold.",
        "nextAction": "gotoScene(\"act1_s4_dross\")"
    },
    "act1_s4_dross": {
        "key": "act1_s4_dross",
        "mode": "vn",
        "title": "BACK OUTSIDE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I step back out into the freezing alley. Mask on. Trying to look like I'm not hyperventilating.\n\nThe streetlights flicker violently. The dumpster corners bend like bad CGI. Pale, shivering frost-corpses peel off the wall and the overpass like frozen ghosts shedding skin.\n\nWhat the absolute fuck are those things?",
        "sfx": "cold-wind",
        "nextAction": "gotoScene(\"act1_s4_dross__tap2\")"
    },
    "act1_s4_dross__tap2": {
        "key": "act1_s4_dross__tap2",
        "mode": "vn",
        "title": "BACK OUTSIDE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "My heart is hammering against my ribs. I turn and sprint.",
        "nextAction": "gotoScene(\"act1_s4_run\")"
    },
    "act1_s4_run": {
        "key": "act1_s4_run",
        "mode": "vn",
        "title": "RUN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I throw my hot coffee at the lead frost-corpse. It passes straight through and splashes harmlessly on concrete. I grab a chunk of brick and hurl it. Nothing. I kick a heavy metal recycling bin into the cluster — it clatters across the asphalt and does jack shit.",
        "sfx": "footsteps",
        "nextAction": "gotoScene(\"act1_s4_run__p2\")"
    },
    "act1_s4_run__p2": {
        "key": "act1_s4_run__p2",
        "mode": "vn",
        "title": "RUN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "These floating ice-shits don't care about physical trash. They care about sucking every degree of heat out of my fucking chest.\n\nMy lungs are burning. The plastic mask fogs up with my gasping breaths. The weight on my shoulder spikes, like heavy liquid tar trying to claw out of my spine.",
        "nextAction": "gotoScene(\"act1_s4_run__p3\")"
    },
    "act1_s4_run__p3": {
        "key": "act1_s4_run__p3",
        "mode": "vn",
        "title": "RUN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "\"Stay down!\" I scream at my own collarbone. \"I am handling this shit!\"\n\nI am not handling this shit.",
        "nextAction": "gotoScene(\"act1_s4_run2\")"
    },
    "act1_s4_run2": {
        "key": "act1_s4_run2",
        "mode": "vn",
        "title": "CORNERED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Dead end. Ten-foot chain-link fence topped with barbed wire. Rusted van blocking the left. Frost-things spreading across the mouth of the alley.\n\nI stop too late.",
        "nextAction": "gotoScene(\"act1_s4_run2__p2\")"
    },
    "act1_s4_run2__p2": {
        "key": "act1_s4_run2__p2",
        "mode": "vn",
        "title": "CORNERED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I slap my back against the fence, throwing up my fists like a fucking idiot. The first frost-shard clips my arm — instant bone-deep numbness, like stepping into liquid nitrogen.",
        "sfx": "impact-heavy",
        "nextAction": "gotoScene(\"act1_s4_run2__p3\")"
    },
    "act1_s4_run2__p3": {
        "key": "act1_s4_run2__p3",
        "mode": "vn",
        "title": "CORNERED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "My phone vibrates in my coat pocket. Once. Twice. Four times. I can't look. If I look I'll see unread DMs. If I see names I'll realize I'm about to die behind a laundromat while strangers wait on a typing indicator.",
        "nextAction": "gotoScene(\"act1_s4_run2__p4\")"
    },
    "act1_s4_run2__p4": {
        "key": "act1_s4_run2__p4",
        "mode": "vn",
        "title": "CORNERED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "No magic. No anime power-up. Just a starving guy in a plastic mask about to freeze to death.\n\nThe black weight on my spine presses down, ice-cold and patient.",
        "nextAction": "gotoScene(\"act1_s4_run2__p5\")"
    },
    "act1_s4_run2__p5": {
        "key": "act1_s4_run2__p5",
        "mode": "vn",
        "title": "CORNERED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "\"Fine, you parasite,\" I choke out. \"If you're gonna do something, do it fucking now!\"",
        "nextAction": "gotoScene(\"act1_cold_voice\")"
    },
    "act1_s4_post": {
        "key": "act1_s4_post",
        "mode": "vn",
        "title": "VILLAIN ARC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I was dead.\n\nNot metaphorically. Zero. Floor. The cold things had me and my phone was still vibrating in my pocket like the world expected a reply.\n\nThen Battle Continuation — no, not a game term, a fact: something refused the grave. Something refused the ending.",
        "nextAction": "gotoScene(\"act1_s4_post__p2\")"
    },
    "act1_s4_post__p2": {
        "key": "act1_s4_post__p2",
        "mode": "vn",
        "title": "VILLAIN ARC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "My hands hang at my sides. I never throw a punch.\n\nBlack threads in my spine hold the body upright while the thing behind me does the killing.\n\nI am close enough to watch.",
        "nextAction": "gotoScene(\"act1_s4_post__p3\")"
    },
    "act1_s4_post__p3": {
        "key": "act1_s4_post__p3",
        "mode": "vn",
        "title": "VILLAIN ARC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "A tendril punches through the hollow center of the first cold thing and splits in opposite directions.\n\nThe body opens like a frozen coat being ripped through the middle. Plates of dirty ice slap the pavement. Trapped breath leaks out screaming in voices it stole from people who slept outside.",
        "nextAction": "gotoScene(\"act1_s4_post__p4\")"
    },
    "act1_s4_post__p4": {
        "key": "act1_s4_post__p4",
        "mode": "vn",
        "title": "VILLAIN ARC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The second one reaches me.\n\nBlack glass closes around its arm, crushes the limb into glitter, then drives what remains face-first through the laundromat wall.\n\nI watch. The shadow purrs against my ribs.\n\n“Fucking psychopath,” I whisper.\n\nIt saved me. Both things are true.",
        "nextAction": "gotoScene(\"act1_s4_somnus_cg\")"
    },
    "act1_s4_somnus_cg": {
        "key": "act1_s4_somnus_cg",
        "mode": "cg",
        "title": "",
        "cg": "cg_somnus_manifestation",
        "cgPos": "center top",
        "sfx": "manifest",
        "nextAction": "gotoScene(\"act1_s4_somnus_text\")"
    },
    "act1_s4_somnus_text": {
        "key": "act1_s4_somnus_text",
        "mode": "vn",
        "title": "MANIFESTATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_somnus_manifestation",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "It peels off my back like wet black paint deciding to be a creature.\n\nBlack glass. Violet light leaking through fractures. Memory-eyes opening one by one. A horizontal slit across the mass burns like an angry space heater.",
        "nextAction": "gotoScene(\"act1_s4_somnus_visual\")"
    },
    "act1_s4_somnus_visual": {
        "key": "act1_s4_somnus_visual",
        "mode": "vn",
        "title": "MANIFESTATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_somnus_manifestation",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "No numbers float over anything. Just him. Just the cold. When I hold one break in the ice, every memory-eye turns with me and the whole thing leans toward it like a dog hearing a whistle.\n\n“Oh,” I whisper. “You look when I look.”",
        "nextAction": "gotoScene(\"act1_s4_somnus_text__tap2\")"
    },
    "act1_s4_somnus_text__tap2": {
        "key": "act1_s4_somnus_text__tap2",
        "mode": "vn",
        "retrospective": true,
        "title": "MANIFESTATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "text": "The earbuds will turn that lean into numbers later. Right now I have a headache, a body count, and a shadow that reacts when I look at something too hard.\n\nIt needs a name.\n\nNot yet. Naming it feels too much like admitting it is real.",
        "nextAction": "unlock:dismantle|gotoScene(\"act1_s4_boss_logic\")"
    },
    "act1_s4_boss_logic": {
        "key": "act1_s4_boss_logic",
        "mode": "vn",
        "title": "THE BOSS FIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "cg": "cg_somnus_manifestation",
        "cgAsBackground": true,
        "cgPos": "center top",
        "text": "The thing it killed was not alone.\n\nTwo full shapes peel away from the iced-over dumpsters. Taller. Denser. They move together instead of crawling.\n\nThe shadow stays outside my body.\n\nI have no idea whether that is good.",
        "nextAction": "startBattle(\"act1_battle1\")"
    },
    "act1_s4_postb": {
        "key": "act1_s4_postb",
        "mode": "vn",
        "title": "STILL MOVING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I keep my hands down while the shadow tears through the first full pack.\n\nOne frost-body loses both legs at the knee and keeps dragging itself forward on splintered elbows. Another gets folded backward until the frozen spine comes apart in white chunks.\n\nThe shadow does not hurry.",
        "nextAction": "gotoScene(\"act1_s4_postb__tap2\")"
    },
    "act1_s4_postb__tap2": {
        "key": "act1_s4_postb__tap2",
        "mode": "vn",
        "title": "STILL MOVING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I look at a crack in the ice by accident.\n\nThe shadow leans toward it.\n\nI look away. It stops.\n\nNot a command. More like showing a dog where the blood is.",
        "nextAction": "gotoScene(\"act1_s4_secondwave\")"
    },
    "act1_s5_guard": {
        "key": "act1_s5_guard",
        "mode": "vn",
        "title": "TRANSIT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I head for the DART platform because it has lights, cameras, and outlets.\n\nA flashlight beam hits my face.\n\nFucking great. Right on cue. Transit security.",
        "sfx": "static-burst",
        "nextAction": "gotoScene(\"act1_s5b\")"
    },
    "act1_s5b": {
        "key": "act1_s5b",
        "mode": "vn",
        "title": "MOVE ALONG",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I pull the backpack against my chest before the guard reaches me.\n\nThe phone is in there. The battery. The only open door to anybody who knows where I am.\n\nIf he takes the bag, the night gets much larger.",
        "nextAction": "gotoScene(\"act1_s5b__p2\")"
    },
    "act1_s5b__p2": {
        "key": "act1_s5b__p2",
        "mode": "vn",
        "title": "MOVE ALONG",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I do the voice — the hyper-polite customer-service voice, the one I practiced in a shelter bathroom for situations exactly like this, the voice that says I am a compliant citizen who is not currently having a breakdown and will not cause you paperwork.",
        "nextAction": "gotoScene(\"act1_s5b__p3\")"
    },
    "act1_s5b__p3": {
        "key": "act1_s5b__p3",
        "mode": "vn",
        "title": "MOVE ALONG",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "\"Hey man, sorry. Just getting out of the cold. Have a good night, I'm leaving.\"",
        "nextAction": "gotoScene(\"act1_s5_intercept\")"
    },
    "act1_s5_intercept": {
        "key": "act1_s5_intercept",
        "mode": "vn",
        "title": "INTERCEPTION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "Why is he still walking closer? I did the voice. I'm complying.\n\nI can't get arrested tonight. I don't have ID. They'll take my bag.\n\nMy chest is tight. I can't breathe.\n\nWait. Why did it just get so cold? Something is shifting on my back. It's waking up and it doesn't like the way this guy is looking at me.",
        "nextAction": "startBattle(\"tutorial_2\")"
    },
    "act1_s6": {
        "key": "act1_s6",
        "mode": "vn",
        "title": "PANIC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "The guard turns and runs.\n\nWait — he's screaming. He drops his flashlight and runs down the platform like something is chasing him, which fair. His radio is squawking. I can hear him yelling for backup.",
        "nextAction": "gotoScene(\"act1_s6__p2\")"
    },
    "act1_s6__p2": {
        "key": "act1_s6__p2",
        "mode": "vn",
        "title": "PANIC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I didn't do anything.\n\nWell — SOMNUS did something.\n\nThe shadow lashed out.\n\nHe didn't even touch the guy, not really, but three feet of concrete between me and the guard just cracked in a straight line and the guard felt it pass through him like a cold wind.",
        "nextAction": "gotoScene(\"act1_s6__p2__tap2\")"
    },
    "act1_s6__p2__tap2": {
        "key": "act1_s6__p2__tap2",
        "mode": "vn",
        "title": "PANIC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I think he just looked the shadow directly in one of those eyes and his brain checked out.",
        "nextAction": "gotoScene(\"act1_s6__p3\")"
    },
    "act1_s6__p3": {
        "key": "act1_s6__p3",
        "mode": "vn",
        "title": "PANIC",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "(Hey, I mouth at the shadow on my shoulder, can you blame him? You're terrifying.)\n\n(The shadow rumbles like he's pleased about it.)\n\nMy stomach drops. That wasn't a hallucination. I just assaulted a transit guard with a shadow demon.\n\nTime to get off this platform.",
        "nextAction": "gotoScene(\"act1_s7\")"
    },
    "act1_s7": {
        "key": "act1_s7",
        "mode": "vn",
        "title": "FLIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "I need to name this thing before I accidentally sic it on a CVS cashier. Names have rules. I'm a Caster class now apparently, according to the made-up TTRPG terms I'm applying to my own mental breakdown.",
        "nextAction": "gotoScene(\"act1_s7__p2\")"
    },
    "act1_s7__p2": {
        "key": "act1_s7__p2",
        "mode": "vn",
        "title": "FLIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "Brother of Death. Somnus. That sounds like something that would be on a Norwegian black metal album cover.\n\n(Somnus rumbles on my shoulder in what I'm choosing to interpret as approval.)",
        "nextAction": "nameSomnus|gotoScene(\"act1_s7__p3\")"
    },
    "act1_s7__p3": {
        "key": "act1_s7__p3",
        "mode": "vn",
        "title": "FLIGHT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "“Cool,” I mutter, already moving. “Great. Glad we both like it. Can we please avoid murder until sunrise?”\n\nHe does not promise anything.",
        "nextAction": "gotoScene(\"act1_s9\")"
    },
    "act1_s9": {
        "key": "act1_s9",
        "mode": "phone",
        "title": "utica_girl",
        "messages": [
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "hey sosa",
                "self": false
            },
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "i know you're still in texas",
                "self": false
            },
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "it's november. the cold is starting to hit here.",
                "self": false
            },
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "apt 3 is one bedroom. share my bed or take the couch. seriously.",
                "self": false
            },
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "just get on a bus. i can't pay for the ticket, but you'll have a place to crash.",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "really?",
                "self": true,
                "draft": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "i dont have much left",
                "self": true,
                "draft": false
            },
            {
                "user": "utica_girl",
                "color": "#a78bfa",
                "pfp": "utica",
                "status": "offline",
                "text": "you dont need much. just a way out.",
                "self": false
            }
        ],
        "nextAction": "gotoScene(\"act1_s10\")"
    },
    "act1_s10": {
        "key": "act1_s10",
        "mode": "vn",
        "title": "THE OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "I'm at the shelter, leaning against the peeling paint of the lobby wall. Early November. The air already has teeth.\n\nI think about the room I had until late October.",
        "nextAction": "gotoScene(\"act1_s10__p2\")"
    },
    "act1_s10__p2": {
        "key": "act1_s10__p2",
        "mode": "vn",
        "title": "THE OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "I keep waiting for the transition to feel dramatic.\n\nIt doesn't. One bad arrangement ends, then the next practical problem starts.\n\nTonight the practical problem is staying warm until morning.",
        "nextAction": "gotoScene(\"act1_s10__p3\")"
    },
    "act1_s10__p3": {
        "key": "act1_s10__p3",
        "mode": "vn",
        "title": "THE OUT",
        "speaker": "Shelter Worker",
        "speakerColor": "#94a3b8",
        "bg": "dropin_center",
        "text": "\"Sosa,\" the worker says, sliding a piece of paper across the counter. \"We got you a spot in the Greyhound Diversion Program. It's a one-way ticket to get you out of the city. No strings, just go.\"",
        "nextAction": "gotoScene(\"act1_s10__p4\")"
    },
    "act1_s10__p4": {
        "key": "act1_s10__p4",
        "mode": "vn",
        "title": "THE OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "I think about the girl in West Virginia who was supposed to buy me a different ticket. I think about how easy it is for people to vanish when you need them.",
        "nextAction": "gotoScene(\"act1_s10__p5\")"
    },
    "act1_s10__p5": {
        "key": "act1_s10__p5",
        "mode": "vn",
        "title": "THE OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dropin_center",
        "text": "I take the paper. Early November. Bus leaves before the week is out.",
        "nextAction": "gotoScene(\"act1_end\")"
    },
    "act1_end": {
        "key": "act1_end",
        "mode": "vn",
        "title": "OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "DART station. I made it.\n\nFirst cold pack down. Transit guard flinched and ran. My mask is still on and I'm breathing like I ran a marathon in flip-flops.\n\nI don't feel stronger. I feel like I just learned the tutorial button. Refuse. Hold. Let the big bastard on my back do the work.",
        "nextAction": "gotoScene(\"act1_end__tap2\")"
    },
    "act1_end__tap2": {
        "key": "act1_end__tap2",
        "mode": "vn",
        "title": "OUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "dart_station",
        "text": "Greyhound to Utica leaves tomorrow. One-way. Nothing owed. Just go.\n\n(Vegas died on Halloween. Utica is... Utica. But at least it's not this ditch.)",
        "nextAction": "ventDebt:20|recover:full|gotoScene(\"act2_s1\")"
    },
    "act1_s4_secondwave": {
        "key": "act1_s4_secondwave",
        "mode": "vn",
        "title": "THE COLD REGROUPS",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Water runs backward along the curb. Frost climbs the fence and builds three new bodies from the ground up.\n\nThe first pack hunted heat. These arrange themselves around the exits.\n\n“Okay,” I whisper. “You learned formation. Love that for you.”\n\nThe shadow spreads wider behind me.",
        "sfx": "cold-wind",
        "nextAction": "startBattle(\"act1_battle2\")"
    },

    "act1_s4_after_second": {
        "key": "act1_s4_after_second",
        "mode": "vn",
        "title": "AFTER THE SECOND WAVE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The last frost-body comes apart in three clean sections.\n\nIts head hits first. The mouth keeps whispering after the rest of it collapses into black runoff.\n\nThen the alley goes ordinary. No music. No victory pose. Just my breathing and a vending machine rattling through the wall.",
        "nextAction": "gotoScene(\"act1_s4_after_second__p2\")"
    },

    "act1_s4_after_second__p2": {
        "key": "act1_s4_after_second__p2",
        "mode": "vn",
        "title": "KEEP MOVING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The shadow sinks closer to my back without disappearing.\n\nI do not thank it. It does not ask.\n\nThe DART platform has lights, cameras, and maybe a working outlet. For the first time tonight, ordinary surveillance sounds comforting.",
        "sfx": "footsteps",
        "nextAction": "gotoScene(\"act1_s5_guard\")"
    },

    "act1_cold_voice": {
        "key": "act1_cold_voice",
        "mode": "vn",
        "title": "THE COLD SPEAKS",
        "speaker": "The Cold",
        "speakerColor": "#a5f3fc",
        "bg": "utica_alley",
        "text": "«Your knees already touched the ground. The rest of you is only late.»\n\n«Lie down properly.»",
        "sfx": "cold-wind",
        "nextAction": "startBattle(\"tutorial_1\")"
    },

});

/* Long-haul bridge: Dallas shelter diversion to Utica, forty-eight hours by bus. */
DATA.scenes.act1_end__tap2.nextAction = "setDebt:20|recover:full|gotoScene(\"act1_bus_hour0\")";
Object.assign(DATA.scenes, {
    "act1_bus_hour0": {
        key:"act1_bus_hour0", mode:"vn", title:"GREYHOUND — HOUR 0", speaker:"Sosa", speakerColor:"#B060FF", bg:"dart_station",
        text:"Predawn. The driver scans the shelter voucher without asking why Utica. My whole life fits under the seat: green backpack, dying phone, one jacket, white mask wrapped in a grocery bag.\n\nDallas starts sliding backward before I decide whether leaving counts as a choice.",
        nextAction:"gotoScene(\"act1_bus_hour10\")"
    },
    "act1_bus_hour10": {
        key:"act1_bus_hour10", mode:"vn", title:"GREYHOUND — HOUR 10", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"First transfer. Fluorescent terminal, vending-machine crackers, outlets already claimed. I sleep seven minutes sitting upright and wake when my forehead hits the window.\n\nThe black weight behind my shoulders wakes with me. Nobody else looks up.",
        nextAction:"gotoScene(\"act1_bus_hour25\")"
    },
    "act1_bus_hour25": {
        key:"act1_bus_hour25", mode:"vn", title:"GREYHOUND — HOUR 25", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Second night. Highway glass reflects my face over towns I cannot name. Goth Baddie's chat still ends on Halloween. I type *u alive?* and delete it because the message before that already asked.\n\nUtica Girl sends: door sticks. pull hard then turn key.",
        nextAction:"gotoScene(\"act1_bus_hour39\")"
    },
    "act1_bus_hour39": {
        key:"act1_bus_hour39", mode:"vn", title:"GREYHOUND — HOUR 39", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Another terminal. Phone at eight percent. I wash my face with brown paper towels and charge beside a trash can while a departure board keeps changing gates.\n\nEvery time I close my eyes, the cold bodies open again. Every time I wake, the bus is still going east.",
        nextAction:"gotoScene(\"act1_bus_hour48\")"
    },
    "act1_bus_hour48": {
        key:"act1_bus_hour48", mode:"vn", title:"GREYHOUND — HOUR 48", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Upstate New York arrives gray through dirty glass. Forty-eight hours after Dallas, the driver says Utica like it is any other stop.\n\nI put on the jacket, shoulder the backpack, and check her last message again: *omw when u get in. don't wander.*",
        nextAction:"gotoScene(\"act2_s1\")"
    }
});
