/* Canonical gameplay data. Scene dialogue is split by act; load this file first. */
var DATA = {
    "player": {
        "name": "Sosa",
        "level": 1,
        "hp": 100,
        "maxHp": 100,
        "debt": 0,
        "fieldExp": 0,
        "fieldLevel": 1,
        "poise": 1,
        "act": 1,
        "phoneModel": "zflip5",
        "unlocked": {
            "refuse": true,
            "battleContinuation": true,
            "trace": false,
            "dismantle": false,
            "dismantleNamed": false,
            "cleave": false,
            "web": false,
            "furnace": false,
            "hellstep": false,
            "stin": false,
            "severTrue": false,
            "patchJob": false,
            "blackFlash": false,
            "graveframe": false,
            "coffinPilot": false
        },
        "maskOn": false,
        "coffinPilot": false,
        "realityMarble": false
    },
    "tutorial": {
        "debtThreshold": 40,
        "refuseDebtGain": 8,
        "refusePoiseBonus": 2,
        "somnusKillTriggered": false,
        "active": false,
        "phase": 0
    },
    "roster": {
        "velvetcoffin": {
            "handle": "velvetcoffin",
            "name": "Goth Baddie",
            "color": "#ef4444",
            "role": "",
            "pfp": "goth",
            "status": "offline",
            "pinned": true
        },
        "gz": {
            "handle": "gz",
            "name": "Gz",
            "color": "#4ade80",
            "role": "Group created by Sosa",
            "pfp": "group",
            "status": "online"
        },
        "top_ranked_gz": {
            "handle": "top_ranked_gz",
            "name": "Top Ranked Gz",
            "color": "#4ade80",
            "role": "Private Group DM",
            "pfp": "group",
            "status": "online",
            "pinned": true,
            "members": [
                "sosa",
                "bender",
                "meki",
                "ysl"
            ],
            "memberNames": [
                "Sosa",
                "Bender",
                "Meki",
                "YSL"
            ]
        },
        "bender": {
            "handle": "bender",
            "name": "Bender",
            "color": "#fb923c",
            "role": "Close friend",
            "gender": "male",
            "pfp": "system",
            "status": "online"
        },
        "meki": {
            "handle": "meki",
            "name": "Meki",
            "color": "#a3e635",
            "role": "Close friend",
            "gender": "male",
            "pfp": "system",
            "status": "online"
        },
        "ysl": {
            "handle": "ysl",
            "name": "YSL",
            "color": "#38bdf8",
            "role": "Close friend",
            "gender": "male",
            "pfp": "system",
            "status": "idle"
        },
        "mochaviolet": {
            "handle": "mochaviolet",
            "name": "Mochaviolet",
            "color": "#c4a7e7",
            "role": "Texas thread",
            "pfp": "morana",
            "status": "idle"
        },
        "cloudnymph": {
            "handle": "cloudnymph",
            "name": "Cloudnymph",
            "color": "#7dd3fc",
            "role": "West Coast",
            "pfp": "kitten",
            "status": "dnd"
        },
        "honeyvenom_": {
            "handle": "honeyvenom_",
            "name": "Honeyvenom",
            "color": "#fbbf24",
            "role": "East Coast",
            "pfp": "london",
            "status": "online"
        },
        "faerieriot": {
            "handle": "faerieriot",
            "name": "Faerieriot",
            "color": "#86efac",
            "role": "UK thread",
            "pfp": "system",
            "status": "idle"
        },
        "utica_girl": {
            "handle": "utica_girl",
            "name": "Utica Girl",
            "color": "#d8b4fe",
            "role": "The Local",
            "pfp": "utica",
            "status": "online"
        },
        "dollcruxh": {
            "handle": "dollcruxh",
            "name": "Dollcruxh",
            "color": "#f0abfc",
            "role": "Late night",
            "pfp": "system",
            "status": "dnd"
        },
        "mintbyte": {
            "handle": "mintbyte",
            "name": "Mintbyte",
            "color": "#a5f3fc",
            "role": "Gaming",
            "pfp": "black",
            "status": "online"
        },
        "peachykeened": {
            "handle": "peachykeened",
            "name": "Peachykeened",
            "color": "#fda4af",
            "role": "Check-ins",
            "pfp": "morana",
            "status": "idle"
        },
        "voidwalker": {
            "handle": "voidwalker",
            "name": "Voidwalker",
            "color": "#6366f1",
            "role": "Lurker",
            "pfp": "system",
            "status": "offline"
        },
        "static_soul": {
            "handle": "static_soul",
            "name": "Signal Soul",
            "color": "#94a3b8",
            "role": "Analog",
            "pfp": "system",
            "status": "idle"
        },
        "neon_ghost": {
            "handle": "neon_ghost",
            "name": "Neon Ghost",
            "color": "#f472b6",
            "role": "Synth",
            "pfp": "system",
            "status": "online"
        },
        "scam_bot_99": {
            "handle": "scam_bot_99",
            "name": "Nitro Gift",
            "color": "#f43f5e",
            "role": "Spam",
            "pfp": "system",
            "status": "online"
        },
        "random_dude": {
            "handle": "random_dude",
            "name": "random_dude",
            "color": "#94a3b8",
            "role": "Random",
            "pfp": "black",
            "status": "idle"
        },
        "oldroommate": {
            "handle": "oldroommate",
            "name": "Mike",
            "color": "#64748b",
            "role": "IRL",
            "pfp": "london",
            "status": "offline"
        },
        "nightshift": {
            "handle": "nightshift",
            "name": "Nightshift",
            "color": "#334155",
            "role": "Work",
            "pfp": "system",
            "status": "dnd"
        },
        "servermod": {
            "handle": "servermod",
            "name": "Server Mod",
            "color": "#22c55e",
            "role": "Mod",
            "pfp": "black",
            "status": "online"
        },
        "supportbot": {
            "handle": "supportbot",
            "name": "Support Bot",
            "color": "#3b82f6",
            "role": "Bot",
            "pfp": "system",
            "status": "online"
        },
        "glitch_bitch": {
            "handle": "glitch_bitch",
            "name": "Glitch Bitch",
            "color": "#fcd34d",
            "role": "Shitposting",
            "pfp": "system",
            "status": "online"
        },
        "vamp_tears": {
            "handle": "vamp_tears",
            "name": "Vamp Tears",
            "color": "#9333ea",
            "role": "Late night",
            "pfp": "london",
            "status": "dnd"
        },
        "lunarsigh": {
            "handle": "lunarsigh",
            "name": "Lunar Sigh",
            "color": "#d8b4fe",
            "role": "Validation",
            "pfp": "kitten",
            "status": "idle"
        },
        "xx_hollow_xx": {
            "handle": "xx_hollow_xx",
            "name": "Hollow",
            "color": "#64748b",
            "role": "Gaming",
            "pfp": "hollow",
            "status": "offline"
        }
    },
    "debtTiers": {
        "stable": {
            "max": 33,
            "label": "STABLE",
            "color": "#4ade80"
        },
        "balanced": {
            "max": 66,
            "label": "BALANCED",
            "color": "#fbbf24"
        },
        "unstable": {
            "max": 99,
            "label": "UNSTABLE",
            "color": "#f97316"
        },
        "threshold": {
            "max": 100,
            "label": "THRESHOLD",
            "color": "#ef4444"
        }
    },
    "enemies": {
        "slag": {
            "key": "slag",
            "name": "Slag",
            "hp": 110,
            "maxHp": 110,
            "atk": 10,
            "armor": 2,
            "desc": "Calcified industrial refuse and old timecards. Feeds on continuance without relief.",
            "speech": "«Just finish this shift... you can rest after... nobody else is going to do it...»",
            "moves": [
                {
                    "id": "shift_extension",
                    "label": "SHIFT EXTENSION",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "overtime"
                },
                {
                    "id": "crushing_routine",
                    "label": "CRUSHING ROUTINE",
                    "type": "single",
                    "damage": 12,
                    "guardImpact": 1,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "slag_overtime": {
            "key": "slag_overtime",
            "name": "Overtime",
            "hp": 220,
            "maxHp": 220,
            "atk": 14,
            "armor": 3,
            "desc": "A Type-II Slag Molt distributed across clocks, work routes, peer enforcement, and continuance without relief.",
            "speech": "«the line is behind... cover the break... you can leave when everybody can...»",
            "phase1Moves": [
                {"id":"clock_in","label":"CLOCK IN","type":"field","damage":0,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"overtime"},
                {"id":"cover_the_line","label":"COVER THE LINE","type":"barrage","damage":9,"guardImpact":1,"hits":2,"poiseRule":"full","effect":"overtime"},
                {"id":"no_break_relief","label":"NO BREAK RELIEF","type":"single","damage":14,"guardImpact":2,"hits":1,"poiseRule":"full","effect":"none"}
            ],
            "phase2Moves": [
                {"id":"mandatory_overtime","label":"MANDATORY OVERTIME","type":"field","damage":8,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"overtime"},
                {"id":"replacement_worker","label":"REPLACEMENT WORKER","type":"barrage","damage":11,"guardImpact":1,"hits":3,"poiseRule":"full","effect":"routeCompliance"}
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "rime": {
            "key": "rime",
            "name": "Pall",
            "hp": 36,
            "maxHp": 36,
            "atk": 5,
            "armor": 0,
            "desc": "Translucent ice and dirty snow that learned to stand. Hungers for surrendered warmth. (Per WORLD_TAXONOMY: cold that stays — no AoE bypass)",
            "speech": "«You can rest here... nobody's coming... just close your eyes...»",
            "moves": [
                {
                    "id": "steal_heat",
                    "label": "STEAL HEAT",
                    "type": "single",
                    "damage": 7,
                    "guardImpact": 1,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "coldHold"
                },
                {
                    "id": "linger",
                    "label": "LINGER",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "coldHold"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "rime_nifl": {
            "key": "rime_nifl",
            "name": "Nifl",
            "hp": 165,
            "maxHp": 165,
            "atk": 12,
            "armor": 2,
            "desc": "A Type-II Pall Molt: separate cold bodies sharing one heat-map across doors, vents, and exposed skin.",
            "speech": "«every door is the same door... warmth is where we send you last...»",
            "phase1Moves": [
                {"id":"shelter_denied","label":"SHELTER DENIED","type":"field","damage":0,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"coldHold"},
                {"id":"borrowed_breath","label":"BORROWED BREATH","type":"barrage","damage":9,"guardImpact":1,"hits":2,"poiseRule":"full","effect":"coldHold"},
                {"id":"zero_hour","label":"ZERO HOUR","type":"single","damage":15,"guardImpact":2,"hits":1,"poiseRule":"full","effect":"none"}
            ],
            "phase2Moves": [
                {"id":"one_winter","label":"ONE WINTER","type":"barrage","damage":10,"guardImpact":1,"hits":3,"poiseRule":"full","effect":"coldHold"},
                {"id":"no_warm_route","label":"NO WARM ROUTE","type":"field","damage":7,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"coldHold"}
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "chime": {
            "key": "chime",
            "name": "Knell",
            "hp": 96,
            "maxHp": 96,
            "atk": 8,
            "armor": 1,
            "desc": "A moving knot of charger cords, split screens, and copper wire. Feeds on unanswered calls.",
            "speech": "«hey... you there?... pick up... I'm sorry... don't block me...»",
            "moves": [
                {
                    "id": "call_back",
                    "label": "CALL BACK",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "ringDebt"
                },
                {
                    "id": "signal_bite",
                    "label": "SIGNAL BITE",
                    "type": "single",
                    "damage": 9,
                    "guardImpact": 1,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "static"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "chime_relay": {
            "key": "chime_relay",
            "name": "Knell Relay",
            "hp": 180,
            "maxHp": 180,
            "atk": 12,
            "armor": 3,
            "desc": "A mature communication scavenger linking multiple unanswered channels into one feeding body.",
            "speech": "«pick up... every voice is waiting...»",
            "phase1Moves": [
                {"id":"phantom_typing","label":"PHANTOM TYPING","type":"field","damage":0,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"ringDebt"},
                {"id":"signal_bite","label":"SIGNAL BITE","type":"single","damage":14,"guardImpact":2,"hits":1,"poiseRule":"full","effect":"static"},
                {"id":"missed_call","label":"MISSED CALL","type":"barrage","damage":9,"guardImpact":1,"hits":2,"poiseRule":"full","effect":"none"}
            ],
            "phase2Moves": [
                {"id":"anchor_voice","label":"ANCHOR IMPERSONATION","type":"field","damage":8,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"ringDebt"},
                {"id":"open_channel","label":"OPEN CHANNEL","type":"barrage","damage":12,"guardImpact":2,"hits":3,"poiseRule":"full","effect":"static"}
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "spall": {
            "key": "spall",
            "name": "Spall",
            "hp": 96,
            "maxHp": 96,
            "atk": 10,
            "armor": 2,
            "desc": "Fractured rubble of concrete slabs, rebar, and bone fragments. Feeds on anticipatory flinch.",
            "speech": "«It wasn't that bad... you made me... don't make this worse...»",
            "moves": [
                {
                    "id": "collapse",
                    "label": "COLLAPSE",
                    "type": "barrage",
                    "damage": 8,
                    "guardImpact": 1,
                    "hits": 2,
                    "poiseRule": "full",
                    "effect": "none"
                },
                {
                    "id": "shard_burst",
                    "label": "SHARD BURST",
                    "type": "single",
                    "damage": 10,
                    "guardImpact": 1,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "spall_atlas": {
            "key": "spall_atlas",
            "name": "Atlas",
            "hp": 210,
            "maxHp": 210,
            "atk": 14,
            "armor": 4,
            "desc": "A Type-II Spall Molt routing impact through a building and selecting which occupied surface must carry it.",
            "speech": "«the stair held... somebody else had to break...»",
            "phase1Moves": [
                {"id":"fall_guy","label":"FALL GUY","type":"single","damage":15,"guardImpact":2,"hits":1,"poiseRule":"full","effect":"routeCompliance"},
                {"id":"load_path","label":"LOAD PATH","type":"field","damage":0,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"routeCompliance"},
                {"id":"progressive_collapse","label":"PROGRESSIVE COLLAPSE","type":"barrage","damage":9,"guardImpact":1,"hits":3,"poiseRule":"full","effect":"none"}
            ],
            "phase2Moves": [
                {"id":"choose_bearer","label":"CHOOSE THE BEARER","type":"field","damage":8,"guardImpact":0,"hits":1,"poiseRule":"ignore","effect":"detain"},
                {"id":"pancake_failure","label":"PANCAKE FAILURE","type":"barrage","damage":12,"guardImpact":2,"hits":3,"poiseRule":"full","effect":"routeCompliance"}
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "archon": {
            "key": "archon",
            "name": "The Condemned Witness",
            "hp": 300,
            "maxHp": 300,
            "atk": 18,
            "armor": 8,
            "desc": "A many-eyed ruin of concrete rooms and exposed rebar. Born from suffering that was observed, logged, and left unchanged.",
            "speech": "«YOU WERE SEEN. THAT WAS THE HELP.»",
            "phase1Moves": [
                {
                    "id": "witness_log",
                    "label": "WITNESS LOG",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "witnessLog"
                },
                {
                    "id": "no_action_required",
                    "label": "NO ACTION REQUIRED",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "noActionRequired"
                },
                {
                    "id": "observation_closed",
                    "label": "OBSERVATION CLOSED",
                    "type": "area",
                    "damage": 28,
                    "guardImpact": 2,
                    "hits": 1,
                    "poiseRule": "partial",
                    "effect": "none"
                },
                {
                    "id": "condemned_route",
                    "label": "CONDEMNED ROUTE",
                    "type": "single",
                    "damage": 22,
                    "guardImpact": 2,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "condemnedRoute"
                }
            ],
            "phase2Moves": [
                {
                    "id": "report_closed",
                    "label": "REPORT CLOSED",
                    "type": "field",
                    "damage": 12,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "reportClosed"
                },
                {
                    "id": "rebar_collapse",
                    "label": "REBAR COLLAPSE",
                    "type": "barrage",
                    "damage": 18,
                    "guardImpact": 3,
                    "hits": 2,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "hound": {
            "key": "hound",
            "name": "[EGREGORE HOUND]",
            "hp": 240,
            "maxHp": 240,
            "atk": 22,
            "armor": 8,
            "desc": "Circuit Combustion pursuit unit. Span burned for anti-tether tracking. Built to hunt Irregulars.",
            "speech": "«TARGET IDENTIFIED: IRREGULAR ZERO. INITIATING TERMINATION PROTOCOL.»",
            "phase1Moves": [
                {
                    "id": "anti_tether_hook",
                    "label": "ANTI-TETHER HOOK",
                    "type": "single",
                    "damage": 28,
                    "guardImpact": 3,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "tetherPin"
                },
                {
                    "id": "combustion_burst",
                    "label": "COMBUSTION BURST",
                    "type": "barrage",
                    "damage": 32,
                    "guardImpact": 4,
                    "hits": 2,
                    "poiseRule": "full",
                    "effect": "none"
                },
                {
                    "id": "pursuit_mark",
                    "label": "PURSUIT MARK",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "pursuitMark"
                },
                {
                    "id": "execution_line",
                    "label": "EXECUTION LINE",
                    "type": "single",
                    "damage": 48,
                    "guardImpact": 5,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "phase2Moves": [
                {
                    "id": "tether_break",
                    "label": "TETHER BREAK",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "ringDebt"
                },
                {
                    "id": "termination_strike",
                    "label": "TERMINATION STRIKE",
                    "type": "single",
                    "damage": 40,
                    "guardImpact": 3,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "dead": false,
            "traced": false,
            "cooldowns": {}
        }
    },
    "humans": {
        "transit_security": {
            "key": "transit_security",
            "name": "Transit Security",
            "hp": 40,
            "maxHp": 40,
            "atk": 8,
            "armor": 2,
            "human": true,
            "desc": "Just doing their job.",
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "street_predator": {
            "key": "street_predator",
            "name": "Street Predator",
            "hp": 55,
            "maxHp": 55,
            "atk": 15,
            "armor": 3,
            "human": true,
            "desc": "Sees opportunity.",
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "censor_scout": {
            "key": "censor_scout",
            "name": "Elias Kessler",
            "hp": 190,
            "maxHp": 190,
            "atk": 18,
            "armor": 6,
            "human": true,
            "desc": "Egregore Censor Scout. Field-competent, personable, under-promoted, and willing to turn first contact into a solo glory grab.",
            "phase1Moves": [
                {
                    "id": "formalcraft_shot",
                    "label": "FORMALCRAFT SHOT",
                    "type": "single",
                    "damage": 26,
                    "guardImpact": 2,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "none"
                },
                {
                    "id": "scan_lock",
                    "label": "SCAN LOCK",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "scanLock"
                },
                {
                    "id": "tether_pin",
                    "label": "TETHER PIN",
                    "type": "single",
                    "damage": 24,
                    "guardImpact": 3,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "tetherPin"
                },
                {
                    "id": "detain",
                    "label": "DETAIN",
                    "type": "single",
                    "damage": 16,
                    "guardImpact": 1,
                    "hits": 1,
                    "poiseRule": "full",
                    "effect": "detain"
                }
            ],
            "phase2Moves": [
                {
                    "id": "resonance_interdict",
                    "label": "RESONANCE INTERDICT",
                    "type": "field",
                    "damage": 0,
                    "guardImpact": 0,
                    "hits": 1,
                    "poiseRule": "ignore",
                    "effect": "static"
                },
                {
                    "id": "tactical_pursuit",
                    "label": "TACTICAL PURSUIT",
                    "type": "barrage",
                    "damage": 20,
                    "guardImpact": 2,
                    "hits": 2,
                    "poiseRule": "full",
                    "effect": "none"
                }
            ],
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        }
    },
    "weakEnemies": {
        "rime_weak": {
            "key": "rime_weak",
            "name": "Pall",
            "hp": 24,
            "maxHp": 24,
            "atk": 4,
            "armor": 0,
            "desc": "Weak. Cold. Early tutorial — low debt pressure.",
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        },
        "rime_weak_2": {
            "key": "rime_weak_2",
            "name": "Pall",
            "hp": 24,
            "maxHp": 24,
            "atk": 4,
            "armor": 0,
            "desc": "Weak. Cold.",
            "dead": false,
            "traced": false,
            "hellstepped": false,
            "cooldowns": {}
        }
    },
    "skills": {
        "trace": {
            "key": "trace",
            "name": "Trace (Passive)",
            "type": "passive",
            "desc": "Passive. Not a Skill in the Clock Tower sense — closer to a False Mystic Eye. The Ypsilon Veil reveals structural fault lines. Targeting locks the Shrine. Sight is free; power is borrowed."
        },
        "refuse": {
            "key": "refuse",
            "name": "Refuse",
            "type": "defense",
            "desc": "Early-only command before Trace/direction. Sosa can only refuse collapse while Somnus decides how to act. Once Sever: Dismantle is named, Refuse disappears and Interception Guard remains automatic."
        },
        "dismantle": {
            "key": "dismantle",
            "name": "Sever: Dismantle",
            "type": "attack",
            "desc": "Sever: Dismantle. Standard Shrine slash along a traced line. High precision. Somnus's cut, Sosa's eyes. Irregular — no Circuit output of his own."
        },
        "cleave": {
            "key": "cleave",
            "name": "Sever: Cleave",
            "type": "attack",
            "desc": "Sever: Cleave. Adaptive strike. Bypasses reinforcement based on target mass. Should require a real Foundation. He does not have one."
        },
        "web": {
            "key": "web",
            "name": "Sever: Web",
            "type": "attack",
            "desc": "Sever: Web. Lattice of micro-cuts. Hits all enemies in the vicinity. Anti-Army behavior on a Receiver-Only lattice — textbook irregular."
        },
        "furnace": {
            "key": "furnace",
            "name": "Furnace (Open)",
            "type": "attack",
            "desc": "Somnus opens the horizontal aperture only after Sever attacks saturate the field with cut dust and pressure. Thermobaric area release; powerful, visible, and environmentally catastrophic."
        },
        "hellstep": {
            "key": "hellstep",
            "name": "Hellstep",
            "type": "self-buff",
            "desc": "Overdrive. 60% reactivity. Critical triples. Nervous-system loan from Somnus. 2 turns up, 3 turns fried. No formalcraft name for this because it shouldn't exist."
        },
        "severTrue": {
            "key": "severTrue",
            "name": "SEVER: TRUE",
            "type": "anti-unit",
            "desc": "SEVER: TRUE. Critical severance: base damage raised to the power of 2.5. Requires Trace + Hellstep + 2 prior hits. Act 6 unlock; extreme timing and judgment, not a routine attack."
        },
        "stin": {
            "key": "stin",
            "name": "System Call",
            "type": "support",
            "desc": "System Call: Stín. Contextual support channel: a real person must willingly answer. Opens stable borrowed-mana throughput, grounds identity, and can vent Debt. Not a universal heal button or compelled response."
        },
        "imperialPrivilegeFalse": {
            "key": "imperialPrivilegeFalse",
            "name": "Imperial Privilege (False)",
            "type": "passive",
            "desc": "One brief, skill-shaped performance forced through desperate self-assertion, borrowed recognition, and Somnus correction. At C rank it cannot grant unique powers, true magecraft, permanent expertise, or bodily transformation."
        }
    },
    "shrine": {
        "minDmg": 8,
        "maxDmg": 12,
        "debtPerRound": 1,
        "hellstepCritChance": 0.2
    },
    "exLuck": {
        "maxRollChance": 0.12,
        "severCritChance": 0.33,
        "severCritMult": 1.75
    },
    "realityMarbleEncounters": {
        "act6_finale": {
            "enabled": true,
            "requiresThreshold": true,
            "requiresLiveSignal": true
        }
    },
    "bossEncounters": {
        "archon_fight": {
            "type": "archon",
            "worldLaw": "YOU WERE SEEN. THAT WAS THE HELP.",
            "anchorName": "RED-TAG CORE",
            "anchorHp": 75,
            "fieldActive": true
        },
        "censor_enc": {
            "type": "censor",
            "worldLaw": "UNREGISTERED OUTPUT MUST BE CONTAINED.",
            "protocol": "SOLO DETENTION / OPERATOR OVERRIDE",
            "anchorName": null,
            "anchorHp": 0,
            "fieldIntegrity": 3,
            "fieldActive": true
        },
        "act5_hound_battle": {
            "type": "hound",
            "worldLaw": "IRREGULAR ZERO MUST NOT ESCAPE.",
            "anchorName": null,
            "anchorHp": 0,
            "fieldActive": false
        }
    },
    "alliedSupport": {
        "kessler_rescue_swarm": {"ally":"Elias Kessler","label":"BLUE BRACKET","cadence":2,"damage":14,"suppression":1},
        "kessler_joint_hunt": {"ally":"Elias Kessler","label":"BLUE BRACKET","cadence":2,"damage":14,"suppression":1},
        "dross_overtime": {"ally":"Elias Kessler","label":"BREAK BRACKET","cadence":2,"damage":14,"suppression":1},
        "archon_fight": {"ally":"Elias Kessler","label":"EXCLUSION BRACKET","cadence":2,"damage":14,"suppression":1}
    },
    "encounterSupport": {
        "archon_fight": {
            "signal": "open",
            "responder": "velvetcoffin",
            "delay": 1,
            "response": "comfort",
            "answerSpeaker": "Goth Baddie",
            "answerText": "Sosa? Camera’s black. I don’t care. Breathe where I can hear you. Whatever is watching can watch me choose you. You do not disappear while I’m on the line."
        },
        "censor_enc": {
            "signal": "jammed"
        },
        "act5_hound_battle": {
            "signal": "none"
        }
    },
    "encounters": {
        "tutorial_1": [
            "rime_weak",
            "rime_weak_2"
        ],
        "tutorial_2": [
            "transit_security"
        ],
        "act1_battle1": [
            "rime",
            "rime"
        ],
        "act1_battle2": [
            "rime",
            "rime",
            "rime_weak"
        ],
        "human_hold": [
            "transit_security"
        ],
        "street_predator_enc": [
            "street_predator"
        ],
        "censor_enc": [
            "censor_scout"
        ],
        "act6_finale": [
            "archon"
        ],
        "kessler_rescue_swarm": [
            "rime",
            "spall",
            "chime"
        ],
        "kessler_joint_hunt": [
            "spall_atlas",
            "spall",
            "spall"
        ],
        "dross_chime_base": [
            "chime"
        ],
        "dross_nifl": [
            "rime_nifl",
            "rime",
            "rime"
        ],
        "dross_slag": [
            "slag"
        ],
        "dross_overtime": [
            "slag_overtime",
            "slag",
            "slag"
        ],
        "dross_chime": [
            "chime_relay"
        ],
        "dross_spall": [
            "spall"
        ],
        "archon_fight": [
            "archon"
        ],
        "act5_hound_battle": [
            "hound"
        ],
        "act2_alone_dross": [
            "rime_weak",
            "rime_weak_2"
        ],
        "act2_battle1": [
            "rime",
            "rime_weak",
            "rime_weak"
        ],
        "act3_hunt_battle": [
            "rime",
            "spall"
        ],
        "act3_hunt_battle2": [
            "rime",
            "spall",
            "chime"
        ],
        "act3_grief_battle": [
            "rime",
            "rime",
            "spall"
        ],
        "act3_battle2": [
            "rime",
            "spall",
            "spall"
        ],
        "act3_battle3": [
            "archon"
        ]
    },
    "scenes": {}
};
if (typeof window !== 'undefined') window.DATA = DATA;
if (typeof global !== 'undefined') global.DATA = DATA;
