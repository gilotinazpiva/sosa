/* =========================================================
   SOSA: THE GRAVE THAT WOULDN'T TAKE ME
   game-core.js — Initialization, Saves, Scene Routing & Core State
   ========================================================= */

var SAVE_VERSION = 1;
var SAVE_KEY = "sosa_game_save_v1";

var GAME = {
    screen: 'title',
    player: null,
    enemies: [],
    selectedEnemy: null,
    turnLock: false,
    actionMenu: 'main',
    log: [],
    currentScene: null,
    sceneIndex: 0,
    encountersCleared: 0,
    tutorial: null,
    battleReturnScene: null,
    deathReturnScene: null,
    shrineActive: false,
    somnusNamed: false,
    shrineTickCount: 0,
    hellstepActive: false,
    hellstepTurnsLeft: 0,
    hellstepCooldown: 0,
    furnaceSaturation: 0,
    furnaceSaturationMax: 3,
    cleaveCooldown: 0,
    actionHelp: null,
    bossState: null,
    coffinState: null,
    graveState: null,
    graveRefuseActive: false,
    routeComplianceActive: false,
    targetSwitchDisabled: false,
    worldFlags: {},
    currentEncounterKey: null,
    battleResolved: false,
    debug: false,
    settings: {
        audioMuted: false,
        bgmVolume: 0.8,
        sfxVolume: 0.9,
        reducedMotion: false,
        reducedFlashes: false,
        disableShake: false,
        highContrast: false
    },


    applyAudioSettings: function() {
        if (!this.settings || typeof AUDIO === 'undefined') return;
        AUDIO.muted = !!this.settings.audioMuted;
        AUDIO.setBgmVolume(this.settings.bgmVolume);
        AUDIO.setSfxVolume(this.settings.sfxVolume);
        if (AUDIO.masterGain) AUDIO.masterGain.gain.value = AUDIO.muted ? 0 : 0.34;
    },

    toggleAudio: function() {
        AUDIO.toggle();
        this.settings.audioMuted = AUDIO.muted;
        this.saveGame();
        render();
    },

    setAudioMuted: function(value) {
        var wanted = !!value;
        if (AUDIO.muted !== wanted) AUDIO.toggle();
        this.settings.audioMuted = AUDIO.muted;
        this.saveGame();
        render();
    },

    setAudioVolume: function(channel, value) {
        var normalized = Math.max(0, Math.min(1, Number(value)));
        if (channel === 'bgm') {
            this.settings.bgmVolume = normalized;
            AUDIO.setBgmVolume(normalized);
        } else if (channel === 'sfx') {
            this.settings.sfxVolume = normalized;
            AUDIO.setSfxVolume(normalized);
        }
        this.saveGame();
    },

    updateSetting: function(name, value) {
        if (!this.settings || !(name in this.settings)) return;
        this.settings[name] = value;
        this.saveGame();
        render();
    },

    addLog: function(msg) {
        if (!msg) return;
        this.log.push(msg);
        if (this.log.length > 25) this.log.shift();
    },

    initGame: function() {
        if (typeof this.cancelBattleTimers === 'function') this.cancelBattleTimers();
        this.player = {
            name: 'Sosa',
            level: 1,
            hp: 100,
            maxHp: 100,
            debt: 0,
            fieldExp: 0,
            fieldLevel: 1,
            poise: 1,
            act: 1,
            phoneModel: 'zflip5',
            unlocked: {
                refuse: true,
                battleContinuation: true,
                trace: false,
                dismantle: false,
                dismantleNamed: false,
                cleave: false,
                web: false,
                furnace: false,
                hellstep: false,
                stin: false,
                severTrue: false,
                patchJob: false,
                blackFlash: false,
                graveframe: false,
                coffinPilot: false
            },
            maskOn: false,
            coffinPilot: false,
            realityMarble: false
        };
        this.tutorial = {
            debtThreshold: 40,
            refuseDebtGain: 8,
            refusePoiseBonus: 2,
            somnusKillTriggered: false,
            active: false,
            phase: 0
        };
        this.enemies = [];
        this.selectedEnemy = null;
        this.turnLock = false;
        this.log = [];
        this.sceneIndex = 0;
        this.currentScene = DATA.scenes['act1_s1'];
        this.screen = 'title';
        this.veilHudLevel = 0; // 0 raw, 1 partial, 2 full AR
        this.somnusNamed = false;
        this.veilLearnedCensor = false;
        this.enemyPhaseIndex = 0;
        this.enemyPhaseEnemies = [];
        this.enemyPhaseActive = false;
        this.furnaceSaturation = 0;
        this.furnaceSaturationMax = 3;
        this.cleaveCooldown = 0;
        this.actionHelp = null;
        this.termHelp = null;
        this.termDiscoveries = {};
        this._suppressStoryAdvanceUntil = 0;
        this.shrineTargetTicks = 0;
        this.player.armorShell = 1;
        this.autonomyDrift = 0;
        this.thresholdReached = false;
        this.targetLockedBySomnus = false;
        this.coffinState = {
            active: false,
            control: 2,
            collateral: 0,
            anchorUses: 0,
            steerUses: 0,
            letHimUses: 0
        };
        this.graveState = {
            active: false,
            turnsLeft: 0,
            integrity: 0,
            aftermath: 0
        };
        this.graveRefuseActive = false;
        this.routeComplianceActive = false;
        this.targetSwitchDisabled = false;
        this.worldFlags = {};
        this.hellstepActionsLeft = 0;
        this.shatteringPrompt = false;
        this.shatteringTimer = null;
        this.pendingTurnEnd = false;
        this.supportState = {
            signal: "none",
            responder: null,
            delay: 0,
            response: null,
            answerSpeaker: null,
            answerText: null,
            callUsed: false,
            callPending: false,
            answered: false
        };
        this.playerStatuses = {
            coldHold: 0,
            static: 0
        };

        // Honor OS prefers-reduced-motion
        try {
            if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                this.settings.reducedMotion = true;
                this.settings.disableShake = true;
            }
        } catch(e) {}
    },

    startGame: function() {
        this.initGame();
        this.screen = 'story';
        if (AUDIO && typeof AUDIO.resume === 'function') AUDIO.resume();
        if (AUDIO && typeof AUDIO.setMusic === 'function') AUDIO.setMusic('story', true);
        this.saveGame();
        render();
    },

    materializeScene: function(sceneKey) {
        var sourceScene = DATA.scenes[sceneKey];
        if (!sourceScene) return null;
        var scene = Object.assign({}, sourceScene);
        if (typeof sourceScene.dynamicText === 'function') {
            scene.text = sourceScene.dynamicText(this);
        }
        return scene;
    },

    gotoScene: function(sceneKey) {
        if (!DATA.scenes[sceneKey]) {
            console.error('Scene not found:', sceneKey);
            return;
        }

        var oldScene = this.currentScene;
        this.currentScene = this.materializeScene(sceneKey);
        this.screen = this.currentScene.mode === 'phone' ? 'phone' : 'story';

        // FIX: Don't restart music every tap — only if track actually changes, prevents annoying re-trigger on advance
        if (AUDIO && typeof AUDIO.setMusic === 'function') {
            var desired = 'story';
            if (this.currentScene.bg === 'laundromat_dawn' || this.currentScene.bg === 'ditch_predawn') desired = 'story_cold';
            else if (this.currentScene.mode === 'phone' || this.currentScene.mode === 'dm-list') desired = 'discord';
            else if (this.currentScene.bg === 'tomra') desired = 'story'; // could be specific later

            if (AUDIO.currentMusic !== desired) {
                AUDIO.setMusic(desired, true);
            }
        }

        this.saveGame();
        render();
        if (AUDIO && typeof AUDIO.play === 'function') {
            var cue = this.currentScene.sfx || ((this.currentScene.mode === 'phone' || this.currentScene.mode === 'dm-list' || this.currentScene.mode === 'voice') ? 'phone-buzz' : null);
            if (cue) setTimeout(function(){
                AUDIO.play(cue);
                if (typeof FX !== 'undefined' && FX && typeof FX.playSceneCue === 'function') FX.playSceneCue(cue);
            }, 45);
        }
    },

    executeSingleAction: function(action) {
        if (!action) return;

        if (action.indexOf('gotoScene(') === 0) {
            var match = action.match(/gotoScene\(["']([^"']+)["']\)/);
            if (match) this.gotoScene(match[1]);
        } else if (action.indexOf('startBattle(') === 0) {
            var encounterMatch = action.match(/startBattle\(["']([^"']+)["']\)/);
            if (encounterMatch) this.startBattle(encounterMatch[1]);
        } else if (action === 'triggerAudit') {
            this.triggerAudit();
        } else if (action === 'nameSomnus') {
            this.somnusNamed = true;
            this.addLog('Name established: SOMNUS.');
        } else if (action === 'gotoTitle') {
            this.screen = 'title';
            render();
        } else if (action === 'recover:full') {
            this.player.hp = this.player.maxHp;
        } else if (action.indexOf('setHp:') === 0) {
            var hpValue = parseInt(action.split(':')[1], 10);
            if (!isNaN(hpValue)) this.player.hp = Math.max(1, Math.min(this.player.maxHp, hpValue));
        } else if (action.indexOf('setDebt:') === 0) {
            var debtValue = parseInt(action.split(':')[1], 10);
            if (!isNaN(debtValue)) this.player.debt = Math.max(0, Math.min(100, debtValue));
        } else if (action.indexOf('ventDebt:') === 0) {
            var ventValue = parseInt(action.split(':')[1], 10);
            if (!isNaN(ventValue)) {
                var beforeDebt = this.player.debt || 0;
                this.player.debt = Math.max(0, beforeDebt - Math.max(0, ventValue));
                if (!this.worldFlags) this.worldFlags = {};
                this.worldFlags.totalDebtVented = (this.worldFlags.totalDebtVented || 0) + (beforeDebt - this.player.debt);
            }
        } else if (action.indexOf('unlock:') === 0) {
            var skill = action.split(':')[1];
            if (skill === 'dismantleNamed') {
                this.player.unlocked.dismantleNamed = true;
                this.player.unlocked.dismantle = true;
                this.addLog('Name bound: SEVER: DISMANTLE.');
            } else if (this.player.unlocked[skill] !== undefined) {
                this.player.unlocked[skill] = true;
                this.addLog('Unlocked skill: ' + skill.toUpperCase());
            }
        }
    },

    executeSceneAction: function() {
        if ((this._suppressStoryAdvanceUntil || 0) > Date.now()) return;
        if (this.advanceLock || !this.currentScene || !this.currentScene.nextAction) return;
        this.advanceLock = true;

        var actions = this.currentScene.nextAction.split('|');
        for (var i = 0; i < actions.length; i++) {
            this.executeSingleAction(actions[i].trim());
        }

        var self = this;
        setTimeout(function() { self.advanceLock = false; }, 140);
    },

    triggerAudit: function() {
        this.veilHudLevel = 2;
        this.veilLearnedCensor = true;
        this.screen = 'audit_scan';
        if (AUDIO && typeof AUDIO.setMusic === 'function') AUDIO.setMusic('audit', true);
        render();
    },

    advanceAfterWin: function() {
        this.battleStarting = false;
        this.advanceLock = false;
        this.turnLock = false;
        var nextSceneKey = this.getNextSceneKey();

        // FIX: Veil progression — per dossier and user request, no HUD in Act1, partial after FIRST CUT (trace), full after Censor
        // Old code gave veil lvl1 after tutorial_1 / act1_battle1 — made battle UI show too much too early (screenshots: HP LOW etc in First Refusal should be hidden)
        if (this.currentEncounterKey === 'tutorial_1') {
            this.player.unlocked.dismantle = true;
            this.player.unlocked.dismantleNamed = false;
            this.player.unlocked.patchJob = true;
            this.somnusManifested = true;
            this.rawSomnus = true;
            // veil stays 0 — raw body/air sense only
        }
        if (this.currentEncounterKey === 'act1_battle1' || this.currentEncounterKey === 'act1_battle2') {
            this.rawSomnus = true;
            this.somnusManifested = true;
            // veil still 0 — no numbers yet
        }
        if (this.currentEncounterKey === 'tutorial_2') {
            // transit guard — still no veil, flinch only
        }
        // act2_battle1 is after FIRST CUT where trace unlocks — give partial veil here
        if (this.currentEncounterKey === 'act2_battle1') {
            this.veilHudLevel = Math.max(this.veilHudLevel || 0, 1);
            this.addLog("Ypsilon Veil is starting to feel like mine. Violet lines, not blue. Still blurry though.");
        }
        if (this.currentEncounterKey === 'dross_chime' || this.currentEncounterKey === 'dross_spall') {
            this.veilHudLevel = Math.max(this.veilHudLevel || 0, 1);
        }
        if (this.currentEncounterKey === 'censor_enc') {
            this.veilHudLevel = Math.max(this.veilHudLevel || 0, 2);
            this.veilLearnedCensor = true;
            this.addLog("Omnis-OS LITE — bootleg copy. Stealing their scanner aesthetic into consumer earbuds. Dramatic as hell.");
        }
        if (this.currentEncounterKey === 'act5_hound_battle') {
            this.player.coffinPilot = false;
            this.player.debt = 35;
        }

        if (nextSceneKey) {
            this.gotoScene(nextSceneKey);
        } else {
            this.screen = 'title';
            render();
        }
    },

    getNextSceneKey: function() {
        var encounterKey = this.currentEncounterKey;
        var battleReturn = {
            tutorial_1: "act1_s4_post",
            act1_battle1: "act1_s4_postb",
            act1_battle2: "act1_s4_after_second",
            tutorial_2: "act1_s6",
            act2_alone_dross: "act2_alone_after",
            act2_battle1: "veil_react_full_hint",
            dross_chime_base: "act3_chime_base_after",
            dross_chime: "act3_relay_after",
            dross_nifl: "act3_nifl_after",
            dross_spall: "act2_spall_after",
            street_predator_enc: "act2_s7e",
            act3_hunt_battle: "act3_resonance_aftermath",
            act3_hunt_battle2: "act3_second_hunt_after",
            act3_grief_battle: "act3_s3b",
            dross_slag: "act4_slag_after",
            dross_overtime: "act4_overtime_after",
            kessler_rescue_swarm: "act4_rescue_after",
            kessler_joint_hunt: "act4_joint_after",
            act3_battle2: "act3_post_grief",
            act3_battle3: "act3_s7",
            archon_fight: "act3_s7",
            censor_enc: "veil_react_omnis",
            act5_hound_battle: "act5_s5"
        };

        if (encounterKey && battleReturn[encounterKey]) {
            return battleReturn[encounterKey];
        }

        if (this.currentScene && this.currentScene.nextScene) {
            return this.currentScene.nextScene;
        }

        return this.battleReturnScene || null;
    },

    /* =========================
       SAVE SYSTEM (localStorage)
       ========================= */
    saveGame: function() {
        // Do not save during mid-battle action sequence
        if (this.screen === 'battle' && this.turnLock) return;

        try {
            var saveObj = {
                version: SAVE_VERSION,
                currentSceneKey: this.currentScene ? this.currentScene.key : null,
                currentEncounterKey: this.currentEncounterKey || null,
                screen: this.screen === 'battle' ? 'story' : this.screen, // Safely fallback battle save to story scene
                player: this.player,
                worldFlags: this.worldFlags,
                supportState: this.supportState,
                settings: this.settings,
                veilHudLevel: this.veilHudLevel,
                veilLearnedCensor: this.veilLearnedCensor,
                somnusNamed: this.somnusNamed,
                termDiscoveries: this.termDiscoveries || {}
            };
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveObj));
        } catch (e) {
            console.warn("Save failed:", e);
        }
    },

    hasSave: function() {
        try {
            var raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return false;
            var parsed = JSON.parse(raw);
            return parsed && parsed.version === SAVE_VERSION && !!parsed.player;
        } catch (e) {
            return false;
        }
    },

    loadSave: function() {
        try {
            var raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return false;
            var data = JSON.parse(raw);
            if (!data || data.version !== SAVE_VERSION || !data.player) return false;

            var savedPlayer = data.player;
            this.player = JSON.parse(JSON.stringify(DATA.player));
            Object.assign(this.player, savedPlayer);
            this.player.unlocked = Object.assign({}, DATA.player.unlocked, savedPlayer.unlocked || {});
            this.player.maxHp = Number.isFinite(Number(this.player.maxHp)) && Number(this.player.maxHp) > 0 ? Number(this.player.maxHp) : DATA.player.maxHp;
            this.player.hp = Number.isFinite(Number(this.player.hp)) ? Math.max(0, Math.min(this.player.maxHp, Number(this.player.hp))) : this.player.maxHp;
            this.player.debt = Number.isFinite(Number(this.player.debt)) ? Math.max(0, Math.min(100, Number(this.player.debt))) : 0;
            this.player.fieldExp = Number.isFinite(Number(this.player.fieldExp)) ? Math.max(0, Number(this.player.fieldExp)) : 0;
            this.player.fieldLevel = 1 + Math.floor(this.player.fieldExp / 5);
            if (!savedPlayer.unlocked || savedPlayer.unlocked.patchJob === undefined) {
                this.player.unlocked.patchJob = !!this.player.unlocked.scarMend;
            }
            if (!savedPlayer.unlocked || savedPlayer.unlocked.battleContinuation === undefined) {
                this.player.unlocked.battleContinuation = this.player.unlocked.endure !== false;
            }
            if (!savedPlayer.unlocked || savedPlayer.unlocked.blackFlash === undefined) this.player.unlocked.blackFlash = false;
            delete this.player.unlocked.imperialPrivilegeFalse;
            delete this.player.unlocked.scarMend;
            delete this.player.unlocked.endure;
            this.worldFlags = data.worldFlags && typeof data.worldFlags === 'object' ? data.worldFlags : {};
            if (this.player.unlocked.blackFlash && this.worldFlags.blackFlashAwakened === undefined) this.worldFlags.blackFlashAwakened = true;
            var savedSettings = data.settings && typeof data.settings === 'object' ? data.settings : {};
            this.settings = Object.assign(this.settings, savedSettings);
            if (savedSettings.audioMuted === undefined && savedSettings.muted !== undefined) this.settings.audioMuted = !!savedSettings.muted;
            delete this.settings.muted;
            this.settings.bgmVolume = Number.isFinite(Number(this.settings.bgmVolume)) ? Math.max(0, Math.min(1, Number(this.settings.bgmVolume))) : 0.8;
            this.settings.sfxVolume = Number.isFinite(Number(this.settings.sfxVolume)) ? Math.max(0, Math.min(1, Number(this.settings.sfxVolume))) : 0.9;
            this.settings.audioMuted = !!this.settings.audioMuted;
            this.settings.reducedMotion = !!this.settings.reducedMotion;
            this.settings.reducedFlashes = !!this.settings.reducedFlashes;
            this.settings.disableShake = !!this.settings.disableShake;
            this.settings.highContrast = !!this.settings.highContrast;
            this.applyAudioSettings();
            this.veilHudLevel = data.veilHudLevel || 0;
            this.veilLearnedCensor = !!data.veilLearnedCensor;
            this.somnusNamed = data.somnusNamed !== undefined ? !!data.somnusNamed : !String(data.currentSceneKey || '').startsWith('act1_');
            this.termDiscoveries = data.termDiscoveries && typeof data.termDiscoveries === 'object' ? data.termDiscoveries : {};
            var inferredTerms = [];
            if (this.somnusNamed) inferredTerms.push('Somnus');
            if (this.player.unlocked.trace) inferredTerms.push('Ypsilon Veil','Trace','Sever: Dismantle');
            if (this.player.unlocked.blackFlash) inferredTerms.push('Black Flash');
            if (this.player.unlocked.web) inferredTerms.push('Sever: Web','Cut Ash');
            if (this.player.unlocked.furnace) inferredTerms.push('Furnace (Open)');
            if (this.player.unlocked.stin) inferredTerms.push('System Call','Stín');
            if (this.player.unlocked.graveframe || this.player.unlocked.coffinPilot) inferredTerms.push('Graveframe');
            if (this.veilLearnedCensor) inferredTerms.push('Dross','Pall','Spall','Knell','Slag','Molt','Nifl','Atlas','Relay','Overtime','Archon','Formalcraft','Omnis-OS','Debt');
            for (var ti=0;ti<inferredTerms.length;ti++) if(!this.termDiscoveries[inferredTerms[ti]]) this.termDiscoveries[inferredTerms[ti]]='legacy';
            this.termHelp = null;

            if (data.currentSceneKey && DATA.scenes[data.currentSceneKey]) {
                this.currentScene = this.materializeScene(data.currentSceneKey);
                this.screen = this.currentScene.mode === 'phone' ? 'phone' : 'story';
            } else {
                this.currentScene = this.materializeScene('act1_s1');
                this.screen = 'story';
            }

            if (AUDIO && typeof AUDIO.resume === 'function') AUDIO.resume();
            render();
            return true;
        } catch (e) {
            console.error("Save load failed:", e);
            return false;
        }
    },

    clearSave: function() {
        try {
            localStorage.removeItem(SAVE_KEY);
        } catch (e) {}
    }
};

if (typeof window !== 'undefined') window.GAME = GAME;
if (typeof global !== 'undefined') global.GAME = GAME;

