/* ACT2 canonical scene script. Requires data/core.js. */
Object.assign(DATA.scenes, {
    "act2_s1": {
        "key": "act2_s1",
        "mode": "vn",
        "title": "NOVEMBER: UTICA",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Early November. The Greyhound drops me into a city that feels like a damp concrete slab. Utica.\n\nThe wind cuts through the only jacket I own. Green backpack. Zero sleep.\n\nShe said she would meet me. I keep checking the curb every time headlights turn in.",
        "nextAction": "gotoScene(\"act2_s1__p2\")"
    },
    "act2_s1__p2": {
        "key": "act2_s1__p2",
        "mode": "vn",
        "title": "NOVEMBER: UTICA",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The Utica girl from Discord — we've been talking for months, flirting half the time — sent photos of Apt 3: one bedroom, a couch, a card table, no TV. She said share the bed or pass out in the living room. No deal attached. Just get inside.",
        "nextAction": "gotoScene(\"act2_s1__p3\")"
    },
    "act2_s1__p3": {
        "key": "act2_s1__p3",
        "mode": "vn",
        "title": "NOVEMBER: UTICA",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I text her: im here.\n\nShe types back in under a minute: omw. don't stand in the cold idiot.",
        "nextAction": "gotoScene(\"act2_bus_meet\")"
    },
    "act2_s2": {
        "key": "act2_s2",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "At the Apt 3 door she looks smaller than her photos. The place smells like old dust, cheap vanilla candles, and the ghost of somebody else's laundry.\n\nShe's wearing a huge Carhartt hoodie. I look like I crawled out of a bus toilet.",
        "nextAction": "gotoScene(\"act2_s2__p2\")"
    },
    "act2_s2__p2": {
        "key": "act2_s2__p2",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "utica_alley",
        "text": "“Jesus, Sosa. You look like death. Come in. Shoes off. I made eggs.”",
        "nextAction": "gotoScene(\"act2_s2__p2_reaction\")"
    },
    "act2_s2__p3": {
        "key": "act2_s2__p3",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Apt 3 is one bedroom, one living room, one bathroom, one kitchen. No guest room hiding off-camera. The couch faces a blank wall where a TV used to be; dust still outlines the stand.",
        "nextAction": "gotoScene(\"act2_s2__p3_utica\")"
    },
    "act2_s2__p4": {
        "key": "act2_s2__p4",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "We eat scrambled eggs with American cheese and hot sauce at a card table. She smokes a cigarette off the stove. I fall asleep in her bed that night because I am terrified and I just spent two days on a Greyhound and the couch feels like another ditch. We cuddle. Nothing else. She holds my wrist like she's checking I still have a pulse.",
        "nextAction": "setDebt:15|gotoScene(\"act2_s2__p5\")"
    },
    "act2_s2__p5": {
        "key": "act2_s2__p5",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "In the morning, she is packing a duffel.",
        "nextAction": "gotoScene(\"act2_s2__p5_utica\")"
    },
    "act2_s3": {
        "key": "act2_s3",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Three days alone. I don't really unpack — there's nothing to unpack. Same clothes. Green backpack in the corner like a dead animal. I sit on the edge of her mattress with the lights off and the phone at 30% brightness and just live in the DMs.",
        "nextAction": "gotoScene(\"act2_s3__p2\")"
    },
    "act2_s3__p2": {
        "key": "act2_s3__p2",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The physical apartment doesn't matter.\n\nThe network is where I actually live.\n\nI reply to Mochaviolet in the Texas thread, drop a meme in general, argue with a stranger about an anime I haven't seen.",
        "nextAction": "gotoScene(\"act2_s3__p2__tap2\")"
    },
    "act2_s3__p2__tap2": {
        "key": "act2_s3__p2__tap2",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I open velvetcoffin's chat and stare at the last message from Halloween — \"good boy 😘\" — and type three different paragraphs and delete all of them.",
        "nextAction": "gotoScene(\"act2_s3__p3\")"
    },
    "act2_s3__p3": {
        "key": "act2_s3__p3",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She's gone. Ghosted me on the day we were supposed to run. Or she's dead. Or something happened between West Virginia and the plane and I'm a guy who got left for dead by the only one who felt real.",
        "nextAction": "gotoScene(\"act2_s3__p4\")"
    },
    "act2_s3__p4": {
        "key": "act2_s3__p4",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "(If Goth Baddie texts in a month, I'll answer in under sixty seconds. That's love, stupid and intact. The problem isn't that the other women mean nothing. Too many mean something. I flirt, listen, remember details, and let each closeness grow past what I can hold honestly.)",
        "nextAction": "gotoScene(\"act2_s3__p5\")"
    },
    "act2_s3__p5": {
        "key": "act2_s3__p5",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Six chats visible. Three servers. A fraction of the women I flirt with, check on, sext, comfort, and let comfort me. The network is much larger than the screen. Their attention eases the pressure, but the care moving out from me is real too.",
        "nextAction": "gotoScene(\"act2_s3__p6\")"
    },
    "act2_s3__p6": {
        "key": "act2_s3__p6",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "There's still no TV. Just the blank wall and the dust outline. I keep thinking if we had a TV I wouldn't be doing this. I'd be watching something dumb and not inventing whole lives for people who aren't texting back.",
        "nextAction": "gotoScene(\"act2_impact_seed\")"
    },
    "act2_s3__p7": {
        "key": "act2_s3__p7",
        "mode": "vn",
        "title": "ISOLATION",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The pressure under my shoulder blades gets louder.\n\nThen the radiator stops knocking.\n\nFrost starts growing on the apartment side of the hallway door.",
        "nextAction": "gotoScene(\"act2_alone_cold\")"
    },
    "act2_s3_general": {
        "key": "act2_s3_general",
        "mode": "phone",
        "title": "#general",
        "messages": [
            {
                "user": "mintbyte",
                "color": "#a5f3fc",
                "pfp": "black",
                "status": "online",
                "text": "just fyi the elden ring dlc is mid as hell. malenia was harder.",
                "self": false
            },
            {
                "user": "glitch_bitch",
                "color": "#fcd34d",
                "pfp": "system",
                "status": "online",
                "text": "no cap this dlc made me reinstall sekiro",
                "self": false
            },
            {
                "user": "neon_ghost",
                "color": "#f472b6",
                "pfp": "system",
                "status": "online",
                "text": "can yall stop spoiling shit some of us have jobs :middle_finger:",
                "self": false
            },
            {
                "user": "ysl",
                "color": "#38bdf8",
                "pfp": "group",
                "status": "online",
                "text": "sosa where u at. u been quiet for 3 days.",
                "self": false
            },
            {
                "user": "meki",
                "color": "#a3e635",
                "pfp": "system",
                "status": "online",
                "text": "u alive bro? don't make us call utica PD",
                "self": false
            },
            {
                "user": "bender",
                "color": "#fb923c",
                "pfp": "system",
                "status": "online",
                "text": "no cap sosa missing the DLC debate, bro is sleeping in snow",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "im alive. new place. still setting up.",
                "self": true,
                "draft": false
            },
            {
                "user": "mintbyte",
                "color": "#a5f3fc",
                "pfp": "black",
                "status": "online",
                "text": "utica??? bro u moved to UTICA???",
                "self": false
            },
            {
                "user": "glitch_bitch",
                "color": "#fcd34d",
                "pfp": "system",
                "status": "online",
                "text": "LMAOOO UTICA",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "text": "its cheap. dont make fun of me.",
                "self": true,
                "draft": false
            },
            {
                "user": "honeyvenom_",
                "color": "#fbbf24",
                "pfp": "london",
                "status": "online",
                "text": "stay warm up there king its like negative ten",
                "self": false
            }
        ],
        "nextAction": "gotoScene(\"act2_s4\")"
    },
    "act2_s4": {
        "key": "act2_s4",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Day four. She gets back from Massachusetts after three days away.\n\nShe knocks once and lets herself in, drops her duffel in the entryway, kicks off her boots, and lights a cigarette off the stove like she owns the place. Which she does.",
        "nextAction": "gotoScene(\"act2_s4__p2\")"
    },
    "act2_s4__p2": {
        "key": "act2_s4__p2",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“You didn't die.”\n\nShe looks me over.\n\n“Proud of you.”",
        "nextAction": "gotoScene(\"act2_s4__p2_sosa\")"
    },
    "act2_s4__p3": {
        "key": "act2_s4__p3",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "There is no TV to hide behind. Just us, the blank wall, and three days of silence I filled with other people's Discord avatars.",
        "nextAction": "gotoScene(\"act2_s4__p3_utica\")"
    },
    "act2_s4__p4": {
        "key": "act2_s4__p4",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Then she drops a small plastic baggie on the nightstand between us, along with a pack of menthols and a crumpled receipt from a Stewart's Shops somewhere east of Syracuse.",
        "nextAction": "gotoScene(\"act2_s4__p5\")"
    },
    "act2_s4__p5": {
        "key": "act2_s4__p5",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "\"Don't make it a whole thing,\" she says. \"I just... figured.\"",
        "nextAction": "gotoScene(\"act2_s4b\")"
    },
    "act2_s4b": {
        "key": "act2_s4b",
        "mode": "vn",
        "title": "RELAPSE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I relapse immediately. Not even a real decision.\n\nI've been using daily for two years—UI studies, long walks, any task my brain refuses to begin. My tolerance is stupid.\n\nOnce the room was gone, the money and connection went with it. October sobriety was not recovery. It was poverty.",
        "nextAction": "gotoScene(\"act2_s4b__p2\")"
    },
    "act2_s4b__p2": {
        "key": "act2_s4b__p2",
        "mode": "vn",
        "title": "RELAPSE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Now the shortcut is right there. I don't even hesitate. Executive function override. A way to handle the pressure in my shoulders and the fact that a girl I met on the internet just brought drugs into her home for me like it's normal and also I am absolutely going to sleep with her tonight and I already know it.",
        "nextAction": "gotoScene(\"act2_s4b__p3\")"
    },
    "act2_s4b__p3": {
        "key": "act2_s4b__p3",
        "mode": "vn",
        "title": "RELAPSE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "A line off a cracked dinner plate while she puts on a playlist from her phone speakers — no TV, never a TV, just tinny Spotify and the radiator knocking — and lights another cigarette. Suddenly I can answer four DMs at once and the pressure settles into background noise instead of a growl.",
        "nextAction": "gotoScene(\"act2_s4b__p4\")"
    },
    "act2_s4b__p4": {
        "key": "act2_s4b__p4",
        "mode": "vn",
        "title": "RELAPSE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She doesn't judge. She's doing it too. Halfway through the second line she starts laughing at something dumb on her phone and offers me a hit of her vape. Blue raspberry.",
        "nextAction": "gotoScene(\"act2_s4b__p5\")"
    },
    "act2_s4b__p5": {
        "key": "act2_s4b__p5",
        "mode": "vn",
        "title": "RELAPSE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Later: the bed. Not careful. Not romantic. Just two people who have been alone too long and a house with nothing to watch. She steals my only hoodie after. I let her. Of course I let her.",
        "nextAction": "gotoScene(\"act2_s4c\")"
    },
    "act2_s4c": {
        "key": "act2_s4c",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Something weird happens with the earbuds.\n\nSony WF-C510s. Black. Seventy-eight dollars open-box from the Best Buy on Genesee — she lent me the cash, said I could pay her back when I had it.",
        "nextAction": "gotoScene(\"act2_s4c__p2\")"
    },
    "act2_s4c__p2": {
        "key": "act2_s4c__p2",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "They sounded like muddy garbage out of the box.\n\nThree weeks of Discord calls, the cold thing in the hallway, and the shadow bleeding interference through my shoulders have changed them. The noise cancellation no longer stops at the radiator. It cuts out the pressure behind the walls.",
        "nextAction": "gotoScene(\"act2_s4c__p3\")"
    },
    "act2_s4c__p3": {
        "key": "act2_s4c__p3",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Did I do this? Did I accidentally attune a pair of consumer earbuds because I wear them twelve hours a day and the thing on my back uses them like an antenna?",
        "nextAction": "gotoScene(\"act2_s4c__p4\")"
    },
    "act2_s4c__p4": {
        "key": "act2_s4c__p4",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Through the buds, a thin cyan line runs down the middle of the door. A structural fault. If I focus, it stays still.\n\nThey need a name.\n\nYpsilon Veil. Dramatic as hell for earbuds that started as a way to avoid hearing myself think in a house with no TV.",
        "nextAction": "gotoScene(\"act2_s4c__p5\")"
    },
    "act2_s4c__p5": {
        "key": "act2_s4c__p5",
        "mode": "vn",
        "retrospective": true,
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Later I'll learn it doesn't have to be this pair. Any cheap buds work after I wear them long enough for Somnus to sink into them. The first pair takes the longest. She's gonna be so mad if I break these.",
        "nextAction": "gotoScene(\"act2_s4c__p6\")"
    },
    "act2_s4c__p6": {
        "key": "act2_s4c__p6",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“Sosa, stop staring at the door like a serial killer and come eat.”",
        "nextAction": "gotoScene(\"act2_s4c__p7\")"
    },
    "act2_s4c__p7": {
        "key": "act2_s4c__p7",
        "mode": "vn",
        "title": "THE VEIL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I come eat.",
        "nextAction": "gotoScene(\"act2_s4d_dms\")"
    },
    "act2_s4d_dms": {
        "key": "act2_s4d_dms",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Night. Same bed. Her leg over mine. My phone is face-down for once because she is talking, and if I pick it up she will notice.",
        "nextAction": "gotoScene(\"act2_s4d_dms__tap2\")"
    },
    "act2_s4d_dms__tap2": {
        "key": "act2_s4d_dms__tap2",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "(My phone buzzing the whole time she's talking. Velvetcoffin, Mochaviolet, Honeyvenom. Six unreads. I'm sitting next to a girl who let me crash and I'm answering other girls. Not purposefully neglecting, just... my brain splits. Discord is where I actually live. In-person I go blank. She notices, I know she does.)",
        "nextAction": "gotoScene(\"act2_s4d_question\")"
    },
    "act2_s4d_dms__p2": {
        "key": "act2_s4d_dms__p2",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "\"Landlord found out I was subletting a room I wasn't supposed to have. Their lease collapsed. I lost everything. Girl in West Virginia was supposed to buy me a ticket to Vegas for Halloween. Then she went silent. I thought she ghosted me.\"",
        "nextAction": "gotoScene(\"act2_s4d_dms__p3\")"
    },
    "act2_s4d_dms__p3": {
        "key": "act2_s4d_dms__p3",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“Damn.”",
        "nextAction": "gotoScene(\"act2_s4d_dms__p3_sosa\")"
    },
    "act2_s4d_dms__p4": {
        "key": "act2_s4d_dms__p4",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“You talk to a lot of people. Your phone never stops.”\n\nIt is not jealousy. She is taking inventory.",
        "nextAction": "gotoScene(\"act2_s4d_answer\")"
    },
    "act2_s4d_dms__p5": {
        "key": "act2_s4d_dms__p5",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“I am not worried. I am saying I hear you whispering at three in the morning, and it sounds like you are arguing with the walls.”",
        "nextAction": "gotoScene(\"act2_s4d_sosa_thought\")"
    },
    "act2_s4d_dms__p6": {
        "key": "act2_s4d_dms__p6",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "\u201cJust Discord,\u201d I lie. \u201cGo to sleep.\u201d",
        "nextAction": "gotoScene(\"act2_s4d_night_narration\")"
    },
    "act2_s5": {
        "key": "act2_s5",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "December. We've been sharing this bed since the first night. Sex since she got back from Massachusetts. Not dating — I refuse the word — but her socks on the radiator and my only hoodie on her body and mornings where she makes eggs and I pretend I'm going to look for more shifts.",
        "nextAction": "gotoScene(\"act2_s5__tap2\")"
    },
    "act2_s5__tap2": {
        "key": "act2_s5__tap2",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "By December, using isn't an event anymore. Little lines off the same cracked plate between Discord calls, cigarettes, eggs, sex, sleep. Sometimes it makes me quiet enough to eat and answer a message. Sometimes we look up and the radiator is bright with morning.",
        "nextAction": "gotoScene(\"act2_s5__p2\")"
    },
    "act2_s5__p2": {
        "key": "act2_s5__p2",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She still doesn't work much. Recovery. The house is just us a lot. No TV. Ever. I reference it in my head like a missing limb. If we had a TV I wouldn't check Discord every forty seconds. If we had a TV I wouldn't hear the monsters breathing in the alley. If we had a TV I'd be a different kind of lonely.",
        "nextAction": "gotoScene(\"act2_utica_future_forms\")"
    },
    "act2_s5__p3": {
        "key": "act2_s5__p3",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Tonight she's in the shower. I'm sitting up in her bed with a leftover pork dumpling on a paper plate and the Veil in, flipping between servers, trying to calculate how many temp shifts I need before a Greyhound west is actually on the table. A half-smoked cigarette sits in a soda can on the nightstand.",
        "nextAction": "gotoScene(\"act2_s5__p4\")"
    },
    "act2_s5__p4": {
        "key": "act2_s5__p4",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "My phone buzzes.\n\nVelvetcoffin is online for the first time since Halloween.\n\nThe notification sits at the top of the screen. I stare long enough for it to dim.",
        "nextAction": "gotoScene(\"act2_s5__p5\")"
    },
    "act2_s5__p5": {
        "key": "act2_s5__p5",
        "mode": "vn",
        "title": "DECEMBER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "\"Please be alive,\" I whisper. \"Anything else can wait.\"", 
        "nextAction": "gotoScene(\"act2_s5b\")"
    },
    "act2_s5b": {
        "key": "act2_s5b",
        "mode": "phone",
        "title": "velvetcoffin",
        "messages": [
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "10/25/2025 2:14 AM",
                "text": "job says the room is tiny and has one bed. good thing i planned on being on top of you anyway.",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "10/25/2025 2:18 AM",
                "text": "im sleeping behind a library rn. anything with a door sounds perfect",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "10/25/2025 2:20 AM",
                "text": "six more days. i buy your ticket. we meet in vegas. one bed. done.",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "10/31/2025 8:00 PM",
                "text": "babe? did you make the connection",
                "self": true
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "10/31/2025 11:30 PM",
                "text": "please just tell me if you changed your mind",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:40 PM",
                "text": "sosa. i have my phone back. please tell me you're alive",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:41 PM",
                "text": "i'm alive. holy shit, i missed you. are you okay?",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:43 PM",
                "text": "columbus cops pulled me off the jet bridge before the connection. warrant and probation shit. they held me, i got a felony, and i didn't have my phone. i didn't ghost you",
                "self": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:44 PM",
                "text": "i thought you were dead. you thought i chose not to come. i'm so fucking sorry",
                "self": false
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:44 PM",
                "text": "i'm out now. i'm staying in ohio",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:45 PM",
                "text": "i thought you changed your mind. i kept checking anyway. i'm just glad you're here",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:46 PM",
                "text": "where are you now? are you safe?",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:47 PM",
                "text": "upstate new york. utica. shelter diversion put me on a greyhound. i'm inside now",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:48 PM",
                "text": "UTICA??? baby, what happened to you?",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:49 PM",
                "text": "a girl here let me crash. we share the only bed. i should tell you now before i make it sound cleaner than it is",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:50 PM",
                "text": "of course you found a whole situationship in upstate new york. you're unbelievable",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:51 PM",
                "text": "i missed you. i need you to know that before the complicated part starts",
                "self": true
            },
            {
                "user": "velvetcoffin",
                "color": "#ef4444",
                "pfp": "goth",
                "status": "online",
                "time": "12/28/2025 11:52 PM",
                "text": "i missed you too, idiot. i love you. i'm so glad you're alive",
                "self": false
            },
            {
                "user": "sosa",
                "color": "#B060FF",
                "pfp": "black",
                "status": "online",
                "time": "12/28/2025 11:53 PM",
                "text": "call me? i need to hear you",
                "self": true
            },
            {"user":"velvetcoffin","time":"12/28/2025 11:54 PM","text":"yes. camera on. i need to see what two months did to my pretty boy","self":false},
            {"user":"sosa","time":"12/28/2025 11:54 PM","text":"i'm in a one-bedroom and complicated is asleep fifteen feet away","self":true},
            {"user":"velvetcoffin","time":"12/28/2025 11:55 PM","text":"bathroom. lock the door. i waited two months. i need ten minutes","self":false},
            {"user":"sosa","time":"12/28/2025 11:55 PM","text":"bossy","self":true},
            {"user":"velvetcoffin","time":"12/28/2025 11:55 PM","text":"you like bossy. call me.","self":false}
        ],
        "nextAction": "ventDebt:25|gotoScene(\"act2_goth_reconnect_call\")"
    },
    "act2_s6": {
        "key": "act2_s6",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "\"Somnus.\"\n\nShadow spikes over my shoulder immediately—hungry, or bored, coiled around my collarbone like heavy black tar that pays rent by being scary.\n\nI stand in the snow-filled alley behind the apartment. Through the buds, a fault line glows down an abandoned iron security gate, a stress line held under years of weight and rust.",
        "nextAction": "gotoScene(\"act2_s6__p2\")"
    },
    "act2_s6__p2": {
        "key": "act2_s6__p2",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I lock my vision onto it and hold the loaded break in my head.\n\nSomnus moves. An obsidian tendril whips through the line. The steel post shears with a scream of metal, and the severed half crashes into the snow hard enough to scatter violet sparks against the brick.",
        "nextAction": "gotoScene(\"act2_s6__p3\")"
    },
    "act2_s6__p3": {
        "key": "act2_s6__p3",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The Ypsilon Veil vibrates in my ears. Pressure stops being one big blur. If I choose one stressed thing and keep looking, a violet line resolves—old brick repair, rusted fence post, bent gate. Everything else fades when I commit.",
        "nextAction": "gotoScene(\"act2_veil_ar_first\")"
    },
    "act2_veil_ar_first": {
        "key": "act2_veil_ar_first",
        "mode": "vn",
        "title": "YPSILON VEIL — FIRST READ",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The buds add crude subtitles at the edge of my sight: body okay, shadow between us, one presence held in focus. Six little blocks flare when Somnus moves.\n\nNot numbers. More like haunted noise cancellation guessing what matters and getting better because I keep surviving.",
        "nextAction": "gotoScene(\"act2_s6__p4\")"
    },
    "act2_s6__p4": {
        "key": "act2_s6__p4",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The line does not mean I can cut anything I want. It means the gate was already carrying a failure and I finally saw where it lived.\n\nI don't make magic. I don't generate anything.",
        "nextAction": "gotoScene(\"act2_s6__p5\")"
    },
    "act2_s6__p5": {
        "key": "act2_s6__p5",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Discord is where the weight comes from—the messages, replies, people typing my name when I have not spoken in eight hours.\n\nI do not know whether attention is power or whether hearing familiar voices just keeps my brain steady enough to aim. I know every reply makes Somnus denser.",
        "nextAction": "gotoScene(\"act2_s6__p5__tap2\")"
    },
    "act2_s6__p5__tap2": {
        "key": "act2_s6__p5__tap2",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I make nothing. Whatever reaches me, he changes it. That is the part I can feel.",
        "nextAction": "gotoScene(\"act2_s6__p6\")"
    },
    "act2_s6__p6": {
        "key": "act2_s6__p6",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "He takes pressure that already exists and puts the unweaving where I can keep my eyes.\n\nAnti-magic? Asta motherfucker. I could laugh.",
        "nextAction": "gotoScene(\"act2_s6__p7\")"
    },
    "act2_s6__p7": {
        "key": "act2_s6__p7",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "There is no meter. Just pressure in my chest, people on my phone, and a shadow that gets sharper when they answer.\n\n“That was loud as hell,” I whisper.\n\nSomnus coils back into my jacket. Useful. Rude.",
        "nextAction": "gotoScene(\"act2_s6__p8\")"
    },
    "act2_s6__p8": {
        "key": "act2_s6__p8",
        "mode": "vn",
        "title": "FIRST CUT",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Whatever my body is doing, it is not normal mage shit.\n\nI can see the failure. The shadow performs the cut. Everything between those facts is guesswork.",
        "nextAction": "gotoScene(\"act2_name_dismantle\")"
    },
    "act2_s7": {
        "key": "act2_s7",
        "mode": "vn",
        "title": "WINTER SPIKE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I walk outside to clear my head. Utica winter is brutal.\n\nThe temperature drops further. Streetlights flicker. Jagged floating frost-shards gather near the dumpster — pale, shivering shapes that drift like frozen wraiths. Somnus flares, violet force bleeding through obsidian. He hates them.",
        "nextAction": "gotoScene(\"act2_s7__p2\")"
    },
    "act2_s7__p2": {
        "key": "act2_s7__p2",
        "mode": "vn",
        "title": "WINTER SPIKE",
        "speaker": "The Cold",
        "speakerColor": "#a5f3fc",
        "bg": "utica_alley",
        "text": "«...so cold...»\n\n«Why are you warm?»\n\n«Let us sleep inside your bones.»",
        "nextAction": "gotoScene(\"act2_s7_rime_response\")"
    },
    "act2_s7c": {
        "key": "act2_s7c",
        "mode": "vn",
        "title": "THE WALL MOVES",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The frost is gone. The ringing is not.\n\nI tell myself it is tinnitus until a notification tone comes from inside the brick wall.\n\nThen the wall moves.",
        "nextAction": "gotoScene(\"act2_s7c_spall\")"
    },
    "act2_s7d": {
        "key": "act2_s7d",
        "mode": "vn",
        "title": "DECEMBER 30",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "December 30th. 2:14 AM. Snow is coming down sideways.\n\nI am walking back from the twenty-four-hour Stewart's on Genesee with cheap coffee and a beef stick because I have not eaten in a day and a half.\n\nThe Veil stays in. The shapes disappear when I take it out.",
        "nextAction": "gotoScene(\"act2_s7d_prep\")"
    },
    "act2_s7d__p2": {
        "key": "act2_s7d__p2",
        "mode": "vn",
        "title": "DECEMBER 30",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "A guy steps out from between two parked cars on Cornelia. Hood up. Knife in his hand, held low the way people hold them when they've done this before and expect you to run.",
        "nextAction": "gotoScene(\"act2_s7d__p3\")"
    },
    "act2_s7d__p3": {
        "key": "act2_s7d__p3",
        "mode": "vn",
        "title": "DECEMBER 30",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I don't run. I don't reach for my wallet.\n\nHis knife arm, planted heel, and twisted jacket pull into one loaded angle. A violet line resolves from collarbone to hip when I hold the motion still. Somnus is already tensed over my shoulder. I don't say anything. I just look.",
        "nextAction": "startBattle(\"street_predator_enc\")"
    },
    "act2_s7e": {
        "key": "act2_s7e",
        "mode": "vn",
        "title": "AFTER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "He folds the way things fold when you cut along the right line. One move. The violet cut opens him from collarbone to hip and he goes down in the snow without a sound. The knife skitters away across the ice.",
        "nextAction": "gotoScene(\"act2_s7e__p2\")"
    },
    "act2_s7e__p2": {
        "key": "act2_s7e__p2",
        "mode": "vn",
        "title": "AFTER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I stand there for a long time holding a paper cup of stone-cold Stewart's coffee.\n\nHe's not a monster. He's a guy. A fucking guy with a knife who picked the wrong target on the wrong night. And I just unmade him with the same reflex I'd use to brush a fly off my arm.",
        "nextAction": "gotoScene(\"act2_s7e__p2__tap2\")"
    },
    "act2_s7e__p2__tap2": {
        "key": "act2_s7e__p2__tap2",
        "mode": "vn",
        "title": "AFTER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "(I don't feel powerful. I feel like I just learned how easy it is to end something.)",
        "nextAction": "gotoScene(\"act2_s7e__p3\")"
    },
    "act2_s7e__p3": {
        "key": "act2_s7e__p3",
        "mode": "vn",
        "title": "AFTER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "(Somnus doesn't care. Somnus is purring. For the first time since Texas I can hear it clearly through the Veil — not anger, not fear. Satisfaction. The low purr of a predator whose prey tried to run and didn't make it.)",
        "nextAction": "gotoScene(\"act2_s7e__p4\")"
    },
    "act2_s7e__p4": {
        "key": "act2_s7e__p4",
        "mode": "vn",
        "title": "AFTER",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I take his wallet. Fifty-two dollars. EBT card. Photo of a kid who looks about seven. I leave the wallet on his chest and I walk. I don't call 911.\n\nThe coffee is stone cold by the time I get back to the apartment. I drink it anyway.",
        "nextAction": "gotoScene(\"act2_s7f\")"
    },
    "act2_s7f": {
        "key": "act2_s7f",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "4:02 AM. I get back to the apartment. She's on the bed with her phone, legs crossed, my hoodie, no TV glow — just the blue of a cracked screen and the radiator. She says something about her mom calling, or the heat going out, or the neighbors yelling again. I don't catch which.",
        "nextAction": "gotoScene(\"act2_s7f__p2\")"
    },
    "act2_s7f__p2": {
        "key": "act2_s7f__p2",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“You good?”",
        "nextAction": "gotoScene(\"act2_s7f__p2_sosa\")"
    },
    "act2_s7f__p3": {
        "key": "act2_s7f__p3",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "My phone buzzes. Goth Baddie — velvetcoffin — seven texts while I was walking home. A meme. A selfie in a bathroom I don't recognize. babe where are you. i keep thinking about halloween. you awake? hello??? did u fall asleep on me again. just read this when u can im bored and free and spiraling a little.",
        "nextAction": "gotoScene(\"act2_s7f__p3__tap2\")"
    },
    "act2_s7f__p3__tap2": {
        "key": "act2_s7f__p3__tap2",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I stare at the screen. She's still talking next to me. I'm not looking at her. I'm looking at the Discord avatar.",
        "nextAction": "gotoScene(\"act2_s7f__p4\")"
    },
    "act2_s7f__p4": {
        "key": "act2_s7f__p4",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I type back. sorry just got in. long night.\n\nShe's still talking next to me. I'm not looking at her. I'm looking at the Discord avatar. I'm looking at the unreads in four different servers. I'm counting the pressure in my chest like a pulse.",
        "nextAction": "gotoScene(\"act2_s7f__p5\")"
    },
    "act2_s7f__p5": {
        "key": "act2_s7f__p5",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "(She sleeps against me most nights and I can't remember the last real question I asked her. I answered Goth Baddie in under a minute because I love her. I care about the others too. That's the problem: I keep offering real closeness at a scale that turns honesty into logistics.)",
        "nextAction": "gotoScene(\"act2_s7f__p6\")"
    },
    "act2_s7f__p6": {
        "key": "act2_s7f__p6",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I am not faking tenderness. I mean the flirting, late calls, poems, sex, and the way I make somebody feel singular for an hour.\n\nThen I do it again in another window. The harm is not that I care too little. It is that I get too close to too many people and hide the overlap.",
        "nextAction": "gotoScene(\"act2_s8\")"
    },
    "act2_s8": {
        "key": "act2_s8",
        "mode": "vn",
        "title": "WIRED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Utica apartment. No TV. The blank wall stares at us like a third roommate with opinions.\n\nI have Trace now. The Veil shows faults. Somnus leans when I look. I aim; he converts whatever attention is reaching me into the cut.",
        "nextAction": "gotoScene(\"act2_s8__p2\")"
    },
    "act2_s9": {
        "key": "act2_s9",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "New Year's comes and goes. I don't remember it. I'm either working, grinding Discord, patrolling the alleys behind the apartment when the monsters start to gather, or I'm high in a house with no TV pretending I'm fine.",
        "nextAction": "gotoScene(\"act2_s9__p2\")"
    },
    "act2_s9__p2": {
        "key": "act2_s9__p2",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Goth Baddie and I talk every day again.\n\nShe sends voice memos at weird hours from Ohio, usually from a friend's couch—not the job room we never reached—laughing, crying, asking when I'm buying a ticket west.\n\nI keep saying soon.\n\nI already forgave her the second the notification lit up.",
        "nextAction": "gotoScene(\"act2_s9__p2__tap2\")"
    },
    "act2_s9__p2__tap2": {
        "key": "act2_s9__p2__tap2",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Goth Baddie is the center. If she asked me to close every other door and come to her, I would.\n\nThat does not make the other connections fake. It makes the current arrangement impossible to explain without hurting somebody.",
        "nextAction": "gotoScene(\"act2_s9__p3\")"
    },
    "act2_s9__p3": {
        "key": "act2_s9__p3",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "With her it's the real thing refusing to die. The cheap version is every other door I leave unlocked.",
        "nextAction": "gotoScene(\"act2_s9__p3__tap2\")"
    },
    "act2_s9__p3__tap2": {
        "key": "act2_s9__p3__tap2",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I don't tell her about Somnus. I don't tell her about the knife guy in the snow. I don't tell her the Veil is glued to my ears twelve hours a day because if I take them out I can hear the monsters breathing in the walls. That's my fault too, probably.",
        "nextAction": "gotoScene(\"act2_s9__p4\")"
    },
    "act2_s9__p4": {
        "key": "act2_s9__p4",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The Utica Girl asks less about my phone now. She just talks at me in the kitchen while she makes eggs. I answer half the time. The blank wall where the TV was watches us like a third roommate.",
        "nextAction": "gotoScene(\"act2_utica_library\")"
    },
    "act2_s9__p5": {
        "key": "act2_s9__p5",
        "mode": "vn",
        "title": "JAN 3 — 3:47 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "(Some nights I look at the Greyhound prices on my phone and I don't click. I don't know if I'm scared of leaving Somnus or scared of what I am without a roster of people who think I'm worth texting.)",
        "nextAction": "gotoScene(\"act2_s7c\")"
    },
    "veil_react_partial": {
        "key": "veil_react_partial",
        "mode": "vn",
        "title": "VEIL CALIB",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The name was a joke when I said it.\n\nNow the Ypsilon Veil answers with faint brackets at the edge of my sight. No numbers. No words. Just pressure taking shape.",
        "nextAction": "gotoScene(\"veil_react_partial__tap2\")"
    },
    "veil_react_partial__tap2": {
        "key": "veil_react_partial__tap2",
        "mode": "vn",
        "title": "VEIL CALIB",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The Sonys have been in my ears for weeks—Discord, sleep, walking, the cold things in the hallway.\n\nThey used to sound muddy. Now they cut the interference enough for me to hold one impossible detail in focus.",
        "nextAction": "gotoScene(\"veil_react_partial__tap3\")"
    },
    "veil_react_partial__tap3": {
        "key": "veil_react_partial__tap3",
        "mode": "vn",
        "title": "VEIL CALIB",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The shadow leans when the brackets close around something.\n\nThat is all I know.",
        "nextAction": "gotoScene(\"act2_s7\")"
    },
    "veil_react_full_hint": {
        "key": "veil_react_full_hint",
        "mode": "vn",
        "title": "VEIL DRIP",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The brackets stay after the fight.\n\nOne smears when the shadow intercepts a hit. Another tightens when I stare at the cold thing.\n\nStill no numbers. No move names. The Veil is trying to become an interface without knowing the language.",
        "nextAction": "gotoScene(\"veil_react_full_hint__tap2\")"
    },
    "veil_react_full_hint__tap2": {
        "key": "veil_react_full_hint__tap2",
        "mode": "vn",
        "title": "VEIL DRIP",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I did not build this. She lent me seventy-eight dollars for open-box earbuds that sounded terrible.\n\nNow they filter something that should not exist and draw shapes around monsters in the snow.",
        "nextAction": "gotoScene(\"veil_react_full_hint__tap3\")"
    },
    "veil_react_full_hint__tap3": {
        "key": "veil_react_full_hint__tap3",
        "mode": "vn",
        "title": "VEIL DRIP",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "If I take them out, the shapes vanish and the whole world gets loud again.\n\nI cannot lose these.",
        "nextAction": "gotoScene(\"act2_after_frost_signal\")"
    },
    "act2_s7c_spall": {
        "key": "act2_s7c_spall",
        "mode": "vn",
        "title": "IMPACT AFTER THE RING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "Concrete dust lifts off the wall without wind. Rebar and broken masonry pull together into a heavy, hunched body.\n\nThe room around it goes quiet in the way a room goes quiet one second before something breaks.",
        "nextAction": "gotoScene(\"act2_spall_voice\")"
    },
    "act2_s7c_spall__tap2": {
        "key": "act2_s7c_spall__tap2",
        "mode": "vn",
        "title": "IMPACT AFTER THE RING",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "This one feels heavier. Like it has been waiting for somebody to flinch first.",
        "nextAction": "startBattle(\"dross_spall\")"
    },
    "act2_s7d_prep": {
        "key": "act2_s7d_prep",
        "mode": "vn",
        "title": "DECEMBER 30",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I did a line before leaving because choosing food had become a forty-minute argument with myself.\n\nNow my mouth tastes like coins, the coffee is already cold, and I am finally carrying something I can eat.\n\nThat counts as functioning if you grade on a curve.",
        "nextAction": "gotoScene(\"act2_s7d__p2\")"
    },
    "act2_s8__p2": {
        "key": "act2_s8__p2",
        "mode": "vn",
        "title": "WIRED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Mochaviolet, Honeyvenom, and Top Ranked Gz are blowing up my phone. Each notification settles the pressure in my shoulders. Somnus gets sharper every time somebody says my name.\n\nIf I had a status sheet, the mana stat would still be zero. I am sure of that much.",
        "nextAction": "gotoScene(\"act2_s8__p2__tap2\")"
    },
    "act2_s8__p2__tap2": {
        "key": "act2_s8__p2__tap2",
        "mode": "vn",
        "title": "WIRED",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Not a mage. Bootleg Asta with good earbuds and a shadow that enjoys his job too much.",
        "nextAction": "gotoScene(\"act2_top_ranked_gz\")"
    },
    "act2_top_ranked_gz": {
        "key": "act2_top_ranked_gz",
        "mode": "phone",
        "title": "top_ranked_gz",
        "messages": [
            {
                "user": "bender",
                "text": "roll call. sosa alive?",
                "self": false
            },
            {
                "user": "sosa",
                "text": "unfortunately. i think my earbuds are magic now",
                "self": true
            },
            {
                "user": "meki",
                "text": "bro got indoors and started a filler arc",
                "self": false
            },
            {
                "user": "ysl",
                "text": "proof or cap",
                "self": false
            },
            {
                "user": "sosa",
                "text": "i cut a steel gate in half",
                "self": true
            },
            {
                "user": "bender",
                "text": "with what",
                "self": false
            },
            {
                "user": "sosa",
                "text": "trauma and bluetooth",
                "self": true
            },
            {
                "user": "meki",
                "text": "valid build",
                "self": false
            },
            {
                "user": "ysl",
                "text": "still need proof fraud",
                "self": false
            }
        ],
        "nextAction": "ventDebt:8|gotoScene(\"act2_s9\")"
    },
    "act2_s7_rime_response": {
        "key": "act2_s7_rime_response",
        "mode": "vn",
        "title": "WINTER SPIKE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "I shove the earbuds tighter.\n\n“Yeah. I remember. Look first. Cut second. Don't be a bitch about it.”",
        "nextAction": "startBattle(\"act2_battle1\")"
    },

    "act2_spall_voice": {
        "key": "act2_spall_voice",
        "mode": "vn",
        "title": "IMPACT MEMORY",
        "speaker": "Concrete Thing",
        "speakerColor": "#fb923c",
        "bg": "utica_alley",
        "text": "«It wasn't that bad.»\n\n«You should have moved.»\n\n«Apologize before the next impact.»",
        "sfx": "impact-heavy",
        "nextAction": "gotoScene(\"act2_s7c_spall__tap2\")"
    },

    "act2_alone_cold": {
        "key": "act2_alone_cold",
        "mode": "vn",
        "title": "SECOND NIGHT ALONE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The deadbolt whitens. Ice pushes through the frame in thin fingers.\n\nThe cheap earbuds are still muddy plastic on the nightstand. No lines. No numbers. Just the certainty that something on the other side knows I am the only warm body in the apartment.",
        "sfx": "cold-wind",
        "nextAction": "gotoScene(\"act2_alone_rime_voice\")"
    },

    "act2_alone_rime_voice": {
        "key": "act2_alone_rime_voice",
        "mode": "vn",
        "title": "HALLWAY COLD",
        "speaker": "The Cold",
        "speakerColor": "#a5f3fc",
        "bg": "css_bg_void",
        "text": "«She left you the room.»\n\n«She did not stay.»\n\n«Open the door. We will.»",
        "nextAction": "gotoScene(\"act2_alone_before_battle\")"
    },

    "act2_alone_before_battle": {
        "key": "act2_alone_before_battle",
        "mode": "vn",
        "title": "NO INTERFACE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The shadow rises off my back before I touch the lock.\n\nI put both hands in my jacket pockets and step away from the door.\n\n“Fine,” I whisper. “You do it.”",
        "nextAction": "startBattle(\"act2_alone_dross\")"
    },

    "act2_alone_after": {
        "key": "act2_alone_after",
        "mode": "vn",
        "title": "HALLWAY AFTERMATH",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "I never leave the kitchen.\n\nThe shadow crosses the hall without me, catches the first cold thing against the ceiling, and pulls until the frozen torso comes apart around the light fixture.\n\nThe second keeps whispering with half a face. It stops when the shadow closes its hand.",
        "nextAction": "gotoScene(\"act2_alone_after__p2\")"
    },

    "act2_alone_after__p2": {
        "key": "act2_alone_after__p2",
        "mode": "vn",
        "title": "NO INTERFACE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "When it comes back, black runoff drips from its tendrils and evaporates before touching the floor.\n\nI am still standing exactly where it left me.\n\nNo attack. No heroic pose. I watched my problem go into the hallway and murder something for me.",
        "nextAction": "gotoScene(\"act2_chime_seed_one\")"
    },

    "act2_s2__p2_reaction": {
        "key": "act2_s2__p2_reaction",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She hugs me like we have done this before. We haven't.\n\nI put the green backpack down. It lands with a sad little thud. She looks at it, looks at me, and does not ask where the rest of my life went.",
        "nextAction": "gotoScene(\"act2_s2__p3\")"
    },

    "act2_s2__p3_utica": {
        "key": "act2_s2__p3_utica",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“I gave it away. Recovery thing. Trying to make it right with somebody.”\n\nShe shrugs.\n\n“We have phones.”",
        "nextAction": "gotoScene(\"act2_s2__p4\")"
    },

    "act2_s2__p5_utica": {
        "key": "act2_s2__p5_utica",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“Massachusetts. Three days. Key is on the counter. Don't die.”",
        "nextAction": "gotoScene(\"act2_s2__p5_departure\")"
    },

    "act2_s2__p5_departure": {
        "key": "act2_s2__p5_departure",
        "mode": "vn",
        "title": "APT 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She kisses the side of my head like it is nothing and leaves.\n\nThe apartment becomes too quiet before the door finishes closing.",
        "nextAction": "gotoScene(\"act2_s3\")"
    },

    "act2_s4__p2_sosa": {
        "key": "act2_s4__p2_sosa",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "She sits beside me on the bed—not the couch; I never really left her bed.\n\nMy phone is face-down on my thigh. For once I am processing the person in the room instead of whoever is typing.",
        "nextAction": "gotoScene(\"act2_s4__p3\")"
    },

    "act2_s4__p3_utica": {
        "key": "act2_s4__p3_utica",
        "mode": "vn",
        "title": "THE RETURN",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“You look less dead.”\n\nShe squints.\n\n“Still weird. But less dead.”",
        "nextAction": "gotoScene(\"act2_s4__p4\")"
    },

    "act2_s4d_question": {
        "key": "act2_s4d_question",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“You ever going to tell me what happened in Texas?”\n\nShe asks the ceiling instead of looking at me.",
        "nextAction": "gotoScene(\"act2_s4d_dms__p2\")"
    },

    "act2_s4d_dms__p3_sosa": {
        "key": "act2_s4d_dms__p3_sosa",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "“Yeah.”",
        "nextAction": "gotoScene(\"act2_s4d_dms__p3_silence\")"
    },

    "act2_s4d_dms__p3_silence": {
        "key": "act2_s4d_dms__p3_silence",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "Radiator. Blank wall. No television to fill the space where the honest part is supposed to go.",
        "nextAction": "gotoScene(\"act2_s4d_dms__p4\")"
    },

    "act2_s4d_answer": {
        "key": "act2_s4d_answer",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "“It is how I stay alive. Attention is… currency.”\n\nI hear how insane that sounds and add, “Don't worry about it.”",
        "nextAction": "gotoScene(\"act2_s4d_dms__p5\")"
    },

    "act2_s4d_sosa_thought": {
        "key": "act2_s4d_sosa_thought",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "(Somnus shifts on my back. Guilty. Or hungry. Same frequency.)",
        "nextAction": "gotoScene(\"act2_s4d_dms__p6\")"
    },

    "act2_s7f__p2_sosa": {
        "key": "act2_s7f__p2_sosa",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "“Yeah. Long walk. Stone-cold coffee.”",
        "nextAction": "gotoScene(\"act2_s7f__p2_quiet\")"
    },

    "act2_s7f__p2_quiet": {
        "key": "act2_s7f__p2_quiet",
        "mode": "vn",
        "title": "4:02 AM",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "He takes off his boots and sits on the edge of the bed.\n\nShe rests her head on his shoulder for three seconds, then goes back to scrolling.\n\nIn-person quiet. The kind he does not know how to answer.",
        "nextAction": "gotoScene(\"act2_s7f__p3\")"
    },

    "act2_chime_seed_one": {
        "key": "act2_chime_seed_one",
        "mode": "vn",
        "title": "MISSED CALL",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "My phone vibrates after the hallway goes quiet.\n\nUNKNOWN CALLER.\n\nNo number. No voicemail. The timer says the call lasted eleven seconds even though I never answered.\n\nWhen I hold the phone to my ear, something on the dead line breathes back.",
        "nextAction": "gotoScene(\"act2_s3_general\")"
    },

    "act2_after_frost_signal": {
        "key": "act2_after_frost_signal",
        "mode": "vn",
        "title": "AFTER THE FROST",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The cold bodies break apart, but my phone keeps ringing inside my pocket.\n\nEvery time I pull it out, the screen is dark.\n\nConcrete dust begins falling upward from the alley wall.",
        "nextAction": "gotoScene(\"act2_s7d\")"
    },

    "act2_s4d_night_narration": {
        "key": "act2_s4d_night_narration",
        "mode": "vn",
        "title": "NO TV",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "She falls asleep in the Carhartt hoodie that used to be his. Sosa watches the blank wall and wonders whether a television would have made this winter quieter or only easier to ignore.",
        "nextAction": "ventDebt:10|gotoScene(\"act2_s5\")"
    },

    "act2_stair_warning": {
        "key": "act2_stair_warning",
        "mode": "vn",
        "title": "APT 3 STAIRWELL",
        "speaker": "Utica Girl",
        "speakerColor": "#a78bfa",
        "bg": "css_bg_void",
        "text": "“Street door sticks. Pull it shut behind you. We’re up one flight, second floor. Skip the third step—the landlord keeps painting over the crack instead of fixing it.”",
        "nextAction": "gotoScene(\"act2_stair_narration\")"
    },

    "act2_stair_narration": {
        "key": "act2_stair_narration",
        "mode": "vn",
        "title": "APT 3 STAIRWELL",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "css_bg_void",
        "text": "The street door shuts below us. Stairs climb to a second locked door with a brass 3. The third tread sags under no weight at all; fresh paint hides a fracture running into the wall.",
        "nextAction": "gotoScene(\"act2_s2\")"
    },

    "act2_impact_seed": {
        "key": "act2_impact_seed",
        "mode": "vn",
        "title": "THREE DAYS ALONE",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "Something hits the stairwell wall hard enough to shake the mattress.\n\nNo footsteps follow. No argument. Just plaster dust pushing under the apartment door in a thin gray line.\n\nThe third step creaks for the rest of the night.",
        "nextAction": "gotoScene(\"act2_s3__p7\")",
        "sfx": "impact-heavy"
    },

    "act2_spall_after": {
        "key": "act2_spall_after",
        "mode": "vn",
        "title": "IMPACT AFTERMATH",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "utica_alley",
        "text": "The Concrete Thing keeps rebuilding itself from the wall.\n\nSomnus pins both rebar arms to the floor, opens the load-bearing fault through its chest, and pulls.\n\nThe torso drops in slabs. Pale fragments inside strike the tile like teeth poured from a cup.",
        "nextAction": "gotoScene(\"act2_spall_after__p2\")",
        "sfx": "collapse"
    },

    "act2_spall_after__p2": {
        "key": "act2_spall_after__p2",
        "mode": "vn",
        "title": "THE CRACK REMAINS",
        "speaker": "Narrator",
        "speakerColor": "#94a3b8",
        "bg": "utica_alley",
        "text": "The moving body is gone. The stairwell is still unsafe.\n\nThe third step remains cracked. The landlord will paint it again. Violet hairlines now run beneath the new damage. Somewhere hidden, something will be able to follow what Somnus left behind.",
        "nextAction": "gotoScene(\"act2_unresolved_ringing\")"
    },

    "act2_unresolved_ringing": {
        "key": "act2_unresolved_ringing",
        "mode": "vn",
        "title": "JANUARY 3",
        "speaker": "Sosa",
        "speakerColor": "#B060FF",
        "bg": "css_bg_void",
        "text": "The impossible calls have not stopped.\n\nThey are farther apart now. Patient.\n\nWhatever is on the other end has learned that I eventually look.",
        "nextAction": "setDebt:25|recover:full|gotoScene(\"act3_s1\")",
        "sfx": "phone-buzz"
    },

});

/* Priority 1 character-agency pass: Utica Girl has a trajectory outside housing Sosa. */
Object.assign(DATA.scenes, {
    "act2_utica_future_forms": {
        key:"act2_utica_future_forms", mode:"vn", title:"DECEMBER — HER PAPERWORK", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"A county peer-support application lives under the ashtray. Her name is printed carefully at the top. The rest is crossed-out dates, six-week requirements, and a paragraph asking why her lived experience would help somebody else.",
        nextAction:"gotoScene(\"act2_utica_future_voice\")"
    },
    "act2_utica_future_voice": {
        key:"act2_utica_future_voice", mode:"vn", title:"DECEMBER — HER PAPERWORK", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"“If I finish the classes, they let me shadow at the drop-in.” She taps the form with a nicotine-yellow nail. “I could be good at it. I know every lie people tell when they want help and also want everybody to fuck off.”",
        nextAction:"gotoScene(\"act2_utica_future_sosa\")"
    },
    "act2_utica_future_sosa": {
        key:"act2_utica_future_sosa", mode:"vn", title:"DECEMBER — HER PAPERWORK", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"“You would terrify them into wellness.”\n\n“I want one job where the bad years count as experience.”\n\nBeside the form is a coffee tin with OUT written on masking tape. Fourteen dollars and a bus transfer inside. She has been planning a future while I complain about the missing TV.",
        nextAction:"gotoScene(\"act2_utica_future_boundary\")"
    },
    "act2_utica_future_boundary": {
        key:"act2_utica_future_boundary", mode:"vn", title:"DECEMBER — HER PAPERWORK", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"css_bg_void",
        text:"“By summer I want paid hours and an apartment where the windows close.”\n\n“I’ll help when I get shifts.”\n\n“I wasn’t asking you to promise.” She folds the form once. “I was asking you to listen.”",
        nextAction:"gotoScene(\"act2_s5__p3\")"
    },
    "act2_utica_library": {
        key:"act2_utica_library", mode:"vn", title:"JANUARY 3 — ORDINARY ERRAND", speaker:"Utica Girl", speakerColor:"#a78bfa", bg:"library_corner",
        text:"“Orientation needs my ID, two references, and a scanned certificate I lost twice.”\n\nShe holds up a folder reinforced with duct tape.\n\n“You are not a reference. You are coming because the copier can smell fear.”",
        nextAction:"gotoScene(\"act2_utica_library_sosa\")"
    },
    "act2_utica_library_sosa": {
        key:"act2_utica_library_sosa", mode:"vn", title:"JANUARY 3 — ORDINARY ERRAND", speaker:"Sosa", speakerColor:"#B060FF", bg:"library_corner",
        text:"We walk to the library. She does not need rescuing. She needs me to hold the folder while she fights a copier and refuses to leave until every page says RECEIVED.\n\nFor forty minutes my phone stays in my pocket. Nothing supernatural happens. It helps anyway.",
        nextAction:"ventDebt:6|gotoScene(\"act2_s9__p5\")"
    }
});

Object.assign(DATA.scenes, {
    "act2_bus_meet": {
        key:"act2_bus_meet", mode:"vn", title:"NOVEMBER — UTICA", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"She reaches the curb twelve minutes later, says my name like she is checking the face against months of messages, then hugs me before either of us can make it weird.\n\n“You’re freezing.”\n\n“Texas prepared me poorly.”\n\n“No shit. Come on.”",
        nextAction:"gotoScene(\"act2_stair_warning\")"
    }
});

Object.assign(DATA.scenes, {
    "act2_goth_reconnect_call": {
        key:"act2_goth_reconnect_call", mode:"vn", title:"DECEMBER 28 — BATHROOM DOOR LOCKED", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I take the call in the bathroom with the fan running and the door locked. Apt 3 is too small for secrets; Utica Girl is asleep fifteen feet away.\n\nGoth Baddie says, “Camera on. Mask off. Shirt too. I need to see what two months did to my pretty boy.”",
        nextAction:"gotoScene(\"act2_goth_reconnect_heat\")"
    },
    "act2_goth_reconnect_heat": {
        key:"act2_goth_reconnect_heat", mode:"vn", title:"DECEMBER 28 — STILL YOURS", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"She tells me where to put my hand. I obey because her calling me good boy still turns thought into gravity. She makes me say who I waited for in Texas.\n\n“Say my name.”\n\nI do. She says mine back like she is taking possession of something the cops misplaced.",
        nextAction:"gotoScene(\"act2_goth_reconnect_after\")"
    },
    "act2_goth_reconnect_after": {
        key:"act2_goth_reconnect_after", mode:"vn", title:"DECEMBER 28 — AFTER", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Eighteen minutes later, the phone is hot in my palm and my body finally feels located.\n\nI unlock the door and crawl into the only bed beside Utica Girl. She shifts toward me in her sleep. Goth Baddie’s last *good boy* is still in my ear. I do not examine how fucked that is.",
        nextAction:"ventDebt:10|gotoScene(\"act2_s6\")"
    }
});

Object.assign(DATA.scenes, {
    "act2_name_dismantle": {
        key:"act2_name_dismantle", mode:"vn", title:"NAMING THE CUT", speaker:"Sosa", speakerColor:"#B060FF", bg:"utica_alley",
        text:"Holding one fault still enough for Somnus to follow is Trace. The repeatable cut needs a name too.\n\nIn JJK, that is Dismantle. Yes, I am stealing it. Survival has no plagiarism policy.\n\n“Sever: Dismantle.”\n\nSomnus leans like the name means *again*.",
        nextAction:"unlock:trace|unlock:dismantleNamed|gotoScene(\"veil_react_partial\")"
    }
});

/* Private-DM expansion: reciprocal care, active flirting, hidden overlap, no donor framing. */
DATA.scenes.act2_s3__p5.nextAction = "gotoScene(\"act2_roster_night_list\")";
Object.assign(DATA.scenes, {
    "act2_roster_night_list": {
        key:"act2_roster_night_list", mode:"dm-list", title:"Direct Messages", messages:[
            {handle:"velvetcoffin",preview:"good boy 😘",time:"10/31",unread:false,pinned:true},
            {handle:"mochaviolet",preview:"you in new york fr?",time:"11:48 PM",unread:true},
            {handle:"honeyvenom_",preview:"new bed or sidewalk be honest",time:"11:44 PM",unread:true},
            {handle:"cloudnymph",preview:"miso knocked my water over again",time:"11:39 PM",unread:true},
            {handle:"peachykeened",preview:"court thing moved again lol",time:"10:52 PM",unread:false},
            {handle:"dollcruxh",preview:"u alive or doing mysterious man shit",time:"10:31 PM",unread:true},
            {handle:"top_ranked_gz",preview:"UTICA???",time:"9:17 PM",unread:true}
        ],
        nextAction:"gotoScene(\"act2_roster_mocha\")"
    },
    "act2_roster_mocha": {
        key:"act2_roster_mocha", mode:"phone", title:"mochaviolet", messages:[
            {user:"mochaviolet",text:"u in new york fr or is bender lying for content",self:false},
            {user:"sosa",text:"utica. apparently a real place. deeply suspicious name",self:true},
            {user:"mochaviolet",text:"did u eat",self:false},
            {user:"sosa",text:"eggs. woman here made them. dont make that face",self:true},
            {user:"mochaviolet",text:"im not making a face im screenshotting this for your future trial",self:false},
            {user:"sosa",text:"how was intake. u said monday",self:true},
            {user:"mochaviolet",text:"you remembered? moved to thursday. stomach doing knife shit again",self:false},
            {user:"sosa",text:"crackers first if u can. not medical wisdom. i just learned the hard way",self:true},
            {user:"mochaviolet",text:"bossy from a man sleeping in mystery womans bed",self:false},
            {user:"sosa",text:"charismatic housing strategy. very advanced. glad ur still going thursday",self:true},
            {user:"mochaviolet",text:"glad ur indoors idiot",self:false}
        ],
        nextAction:"gotoScene(\"act2_roster_honey\")"
    },
    "act2_roster_honey": {
        key:"act2_roster_honey", mode:"phone", title:"honeyvenom_", messages:[
            {user:"honeyvenom_",text:"new bed or sidewalk. be honest",self:false},
            {user:"sosa",text:"bed yes. mine no",self:true},
            {user:"honeyvenom_",text:"whose",self:false},
            {user:"sosa",text:"friend from the server. one bedroom. its not simple",self:true},
            {user:"honeyvenom_",text:"does velvet know",self:false},
            {user:"sosa",text:"velvet disappeared on halloween",self:true},
            {user:"honeyvenom_",text:"that was not my question pretty boy",self:false},
            {user:"sosa",text:"correct. devastating reading comprehension from u tonight",self:true},
            {user:"honeyvenom_",text:"send face. need to see if new york ruined the merchandise",self:false},
            {user:"sosa",text:"hair crime. cheekbones surviving. emotionally premium condition",self:true},
            {user:"honeyvenom_",text:"still would ruin your sleep schedule",self:false},
            {user:"sosa",text:"schedule came pre-ruined. get in line",self:true}
        ],
        nextAction:"gotoScene(\"act2_roster_cloud\")"
    },
    "act2_roster_cloud": {
        key:"act2_roster_cloud", mode:"phone", title:"cloudnymph", messages:[
            {user:"cloudnymph",text:"sorry i disappeared. brother is coming home loud again",self:false},
            {user:"sosa",text:"dont apologize. hows miso after the water crime",self:true},
            {user:"cloudnymph",text:"you remembered my cats name 😭",self:false},
            {user:"sosa",text:"miso owes me one glass of water and damages. door locked?",self:true},
            {user:"cloudnymph",text:"yes. mom is here. i have water",self:false},
            {user:"sosa",text:"good. stay near her. headphones if the yelling starts. message me even if all u send is a dot",self:true},
            {user:"cloudnymph",text:"what about you. where even are you",self:false},
            {user:"sosa",text:"inside in upstate new york. weird situation but warm and locked",self:true},
            {user:"cloudnymph",text:"im proud of you",self:false},
            {user:"sosa",text:"dont say proud too loud i might develop self esteem",self:true},
            {user:"cloudnymph",text:"terrifying. stay alive anyway",self:false}
        ],
        nextAction:"gotoScene(\"act2_roster_night_after\")"
    },
    "act2_roster_night_after": {
        key:"act2_roster_night_after", mode:"vn", title:"1:07 AM — THREE THREADS", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I bounce between them until the battery warning hits. Mocha gets Thursday remembered. Honey gets flirting because I want it too. Cloud gets Miso’s name and somebody awake while her brother comes home loud.\n\nEvery version of me is real. Nobody gets the whole room. That is the trick and the rot.",
        nextAction:"ventDebt:4|gotoScene(\"act2_s3__p6\")"
    }
});

/* In-person dialogue ownership pass: one speaking character per VN card. */
Object.assign(DATA.scenes.act2_bus_meet,{speaker:'Narrator',speakerColor:'#94a3b8',text:'She reaches the curb twelve minutes later, says Sosa’s name like she is checking the face against months of messages, then hugs him before either of them can make it weird.',nextAction:'gotoScene("act2_bus_meet_utica")'});
Object.assign(DATA.scenes,{
 act2_bus_meet_utica:{key:'act2_bus_meet_utica',mode:'vn',title:'NOVEMBER — UTICA',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'utica_alley',text:'“You’re freezing.”',nextAction:'gotoScene("act2_bus_meet_sosa")'},
 act2_bus_meet_sosa:{key:'act2_bus_meet_sosa',mode:'vn',title:'NOVEMBER — UTICA',speaker:'Sosa',speakerColor:'#B060FF',bg:'utica_alley',text:'“Texas prepared me poorly.”',nextAction:'gotoScene("act2_bus_meet_utica2")'},
 act2_bus_meet_utica2:{key:'act2_bus_meet_utica2',mode:'vn',title:'NOVEMBER — UTICA',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'utica_alley',text:'“No shit. Come on.”',nextAction:'gotoScene("act2_stair_warning")'}
});
Object.assign(DATA.scenes.act2_goth_reconnect_call,{text:'I take the call in the bathroom with the fan running and the door locked. Apt 3 is too small for secrets; Utica Girl is asleep fifteen feet away.',nextAction:'gotoScene("act2_goth_reconnect_command")'});
Object.assign(DATA.scenes,{
 act2_goth_reconnect_command:{key:'act2_goth_reconnect_command',mode:'vn',title:'DECEMBER 28 — BATHROOM DOOR LOCKED',speaker:'Goth Baddie',speakerColor:'#fb7185',bg:'css_bg_void',text:'“Camera on. Mask off. Shirt too. I need to see what two months did to my pretty boy.”',nextAction:'gotoScene("act2_goth_reconnect_heat")'}
});
Object.assign(DATA.scenes.act2_goth_reconnect_heat,{text:'She tells me where to put my hand. I obey because her calling me good boy still turns thought into gravity. She makes me say who I waited for in Texas.',nextAction:'gotoScene("act2_goth_reconnect_name")'});
Object.assign(DATA.scenes,{
 act2_goth_reconnect_name:{key:'act2_goth_reconnect_name',mode:'vn',title:'DECEMBER 28 — STILL YOURS',speaker:'Goth Baddie',speakerColor:'#fb7185',bg:'css_bg_void',text:'“Say my name.”',nextAction:'gotoScene("act2_goth_reconnect_answer")'},
 act2_goth_reconnect_answer:{key:'act2_goth_reconnect_answer',mode:'vn',title:'DECEMBER 28 — STILL YOURS',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'I do. She says mine back like she is taking possession of something the cops misplaced.',nextAction:'gotoScene("act2_goth_reconnect_after")'}
});
Object.assign(DATA.scenes.act2_utica_future_sosa,{text:'“You would terrify them into wellness.”',nextAction:'gotoScene("act2_utica_future_reply")'});
Object.assign(DATA.scenes,{
 act2_utica_future_reply:{key:'act2_utica_future_reply',mode:'vn',title:'DECEMBER — HER PAPERWORK',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“I want one job where the bad years count as experience.”',nextAction:'gotoScene("act2_utica_future_narration")'},
 act2_utica_future_narration:{key:'act2_utica_future_narration',mode:'vn',title:'DECEMBER — HER PAPERWORK',speaker:'Narrator',speakerColor:'#94a3b8',bg:'css_bg_void',text:'Beside the form is a coffee tin with OUT written on masking tape. Fourteen dollars and a bus transfer sit inside. She has been planning a future while Sosa complains about the missing TV.',nextAction:'gotoScene("act2_utica_future_boundary")'}
});
Object.assign(DATA.scenes.act2_utica_future_boundary,{text:'“By summer I want paid hours and an apartment where the windows close.”',nextAction:'gotoScene("act2_utica_future_boundary_sosa")'});
Object.assign(DATA.scenes,{
 act2_utica_future_boundary_sosa:{key:'act2_utica_future_boundary_sosa',mode:'vn',title:'DECEMBER — HER PAPERWORK',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I’ll help when I get shifts.”',nextAction:'gotoScene("act2_utica_future_boundary_utica")'},
 act2_utica_future_boundary_utica:{key:'act2_utica_future_boundary_utica',mode:'vn',title:'DECEMBER — HER PAPERWORK',speaker:'Utica Girl',speakerColor:'#a78bfa',bg:'css_bg_void',text:'“I wasn’t asking you to promise.” She folds the form once. “I was asking you to listen.”',nextAction:'gotoScene("act2_s5__p3")'}
});
