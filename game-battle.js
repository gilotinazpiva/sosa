/* =========================================================
   SOSA: THE GRAVE THAT WOULDN'T TAKE ME
   game-battle.js — Combat Loop, Player Actions, Interception Guard & Debt
   ========================================================= */

Object.assign(GAME, {
    applyTrace: function() {
        if (!this.enemies) return;
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (e === this.selectedEnemy && !e.dead && !e.disabled) {
                e.traced = true;
            } else {
                e.traced = false;
            }
        }
    },

    selectEnemy: function(index) {
        var enemy = this.enemies[index];
        if (!enemy || enemy.dead || enemy.disabled) return;

        if (
            this.targetLockedBySomnus &&
            this.selectedEnemy &&
            this.selectedEnemy !== enemy &&
            !this.selectedEnemy.dead
        ) {
            this.addLog("Somnus will not look away.");
            if (AUDIO) AUDIO.play("error");
            render();
            return;
        }

        var switching =
            this.selectedEnemy &&
            this.selectedEnemy !== enemy &&
            !this.selectedEnemy.dead;

        if (this.targetSwitchDisabled && switching) {
            this.addLog("Pursuit mark active. Target switching disabled.");
            if (AUDIO) AUDIO.play("error");
            render();
            return;
        }

        if (switching) {
            this.shrineTargetTicks = 0;
        }

        this.selectedEnemy = enemy;
        this.applyTrace();
        this.addLog('Locked target: ' + this.selectedEnemy.name);
        if (AUDIO) AUDIO.play('select');

        var tier = this.getDebtTier();

        if (switching && !this.hellstepActive && this.routeComplianceActive) {
            this.player.debt = Math.min(100, this.player.debt + 3);
            this.addLog("Condemned route penalty. Target switch +3 Debt.");
            this.checkThreshold();
        }

        if (switching && !this.hellstepActive && tier === "carried") {
            this.player.debt = Math.min(100, this.player.debt + 3);
            this.addLog("Focus tears sideways. Debt +3.");
            this.checkThreshold();
        }

        if (switching && !this.hellstepActive && tier === "overload") {
            this.player.debt = Math.min(100, this.player.debt + 5);
            this.addLog("Somnus resists the new priority. Debt +5.");
            this.checkThreshold();
        }
    },

    buildBossState: function(encounterKey) {
        var meta = DATA.bossEncounters && DATA.bossEncounters[encounterKey];
        if (!meta) return null;
        return {
            type: meta.type,
            worldLaw: meta.worldLaw,
            anchorName: meta.anchorName,
            anchorHp: meta.anchorHp,
            anchorMaxHp: meta.anchorHp,
            fieldActive: meta.fieldActive,
            fieldIntegrity: meta.fieldIntegrity || 0,
            fieldMaxIntegrity: meta.fieldIntegrity || 0,
            protocol: meta.protocol || null,
            fieldBroken: false
        };
    },

    cancelBattleTimers: function() {
        var timerKeys = [
            'battleStartTimer', 'blackFlashArmTimer', 'blackFlashTimer',
            'battleCutInTimer', 'battleActionTimer', 'shatteringTimer',
            'enemyPhaseTimer', 'enemyAdvanceTimer', 'enemyPhaseWatchdogTimer', 'hurtFlashTimer', 'victoryTimer'
        ];
        for (var i = 0; i < timerKeys.length; i++) {
            var key = timerKeys[i];
            if (this[key] !== null && this[key] !== undefined) clearTimeout(this[key]);
            this[key] = null;
        }
    },

    resetBattleRuntimeState: function() {
        this.turnLock = false;
        this.battleResolved = false;
        this.battleTurnCount = 0;
        this.furnaceSaturation = 0;
        this.furnaceSaturationMax = 3;
        this.furnaceReadyNarrativePending = false;
        this.webCooldown = 0;
        this.cleaveCooldown = 0;
        this.overtimeClock = 0;
        this.overtimeInterrupted = false;
        this.mixedCrossfeedClock = 0;
        this.mixedCrossfeedInterrupted = false;
        this.reinforcementState = {};
        this.battleDrossKills = 0;
        this.shrineTargetTicks = 0;
        this.player.armorShell = 1;
        this.enemyPhaseIndex = 0;
        this.enemyPhaseEnemies = [];
        this.enemyPhaseActive = false;
        this.autonomyDrift = 0;
        this.debtMilestones = {};
        this.thresholdReached = false;
        this.targetLockedBySomnus = false;
        this.coffinState = {active:false,control:2,collateral:0,anchorUses:0,steerUses:0,letHimUses:0};
        this.graveState = {active:false,turnsLeft:0,integrity:0,aftermath:0};
        this.graveRefuseActive = false;
        this.hellstepActionsLeft = 0;
        this.shatteringPrompt = false;
        this.shatteringTimer = null;
        this.pendingTurnEnd = false;
        this.playerStatuses = {coldHold:0,static:0};
    },

    configureEncounterSupport: function(encounterKey) {
        this.supportState = {
            signal:'none',responder:null,delay:0,response:null,
            answerSpeaker:null,answerText:null,
            callUsed:false,callPending:false,answered:false
        };
        var support = DATA.encounterSupport && DATA.encounterSupport[encounterKey];
        if (!support) return;
        this.supportState.signal = support.signal || 'none';
        this.supportState.responder = support.responder || null;
        this.supportState.delay = support.delay || 1;
        this.supportState.response = support.response || null;
        this.supportState.answerSpeaker = support.answerSpeaker || null;
        this.supportState.answerText = support.answerText || null;
    },

    applyEncounterStartRules: function(encounterKey) {
        if (this.tutorial) {
            this.tutorial.active = encounterKey === 'tutorial_1' || encounterKey === 'tutorial_2';
            this.tutorial.somnusKillTriggered = false;
            this.tutorial.phase = 0;
        }
        this.somnusManifested = encounterKey !== 'tutorial_1';
        this.battlePhase = encounterKey === 'tutorial_1' ? 'alone' : 'normal';
        this._phonePanicLogged = false;
        this._archonWitnessGateLogged = false;
        this._playerHurtFlash = false;
        this._lastIntercept = false;

        if (encounterKey === 'tutorial_1') {
            this.player.hp = 30;
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].atk = 12;
                this.enemies[i].hp = 25;
                this.enemies[i].maxHp = 25;
            }
        } else if (encounterKey === 'tutorial_2' || encounterKey === 'act1_battle1' || encounterKey === 'act1_battle2') {
            for (var j = 0; j < this.enemies.length; j++) {
                if (this.enemies[j].atk) this.enemies[j].atk = Math.max(3, Math.floor(this.enemies[j].atk * 0.55));
            }
        }

        if (encounterKey === 'censor_enc') {
            this.veilHudLevel = 2;
            this.veilLearnedCensor = true;
            this.addLog("(He's scanning me like I'm a glitch in the system. And the more he looks... the more it hurts. But it also feels like fuel. Being seen—even like this—is making me stronger. That's so fucked up.)");
            this.addLog("(Right now I'm the protagonist. Main-character moment, right? Yeah. Sure. Let's go with that.)");
        }

        if (encounterKey === 'act3_hunt_battle') {
            this.mixedPairArmorActive = true;
            for (var ip = 0; ip < this.enemies.length; ip++) if (this.enemies[ip].originalKey === 'spall') this.enemies[ip].armor = (this.enemies[ip].armor || 0) + 1;
            this.addLog('ICE MORTAR. The cold thing seals the concrete body’s cracks. Drop the cold body to strip the borrowed armor.');
        } else {
            this.mixedPairArmorActive = false;
        }

        if (encounterKey === 'act5_hound_battle') {
            this.player.coffinPilot = true;
            this.player.debt = 100;
            this.player.poise = 6;
            this.veilHudLevel = 2;
            this.enterCoffinPilot();
        }
        this.rawSomnus = this.somnusManifested && !this.player.unlocked.dismantleNamed;
    },

    resetBattlePresentationState: function(encounterKey) {
        this.blackFlashWindowActive = false;
        this.blackFlashReady = false;
        this.blackFlashPendingAction = null;
        this.blackFlashTimer = null;
        this.blackFlashZoneTurns = 0;
        this.blackFlashStreak = 0;
        this.blackFlashCascadeCharges = 0;
        this.firstResonanceReinforcements = false;
        this._resolvingBlackFlash = false;
        this.blackFlashForced = encounterKey === 'act3_hunt_battle' && !this.hasBlackFlashAwakened();
        this.battleCutIn = null;
        this.battleCutInTimer = null;
        this.battleActionCallout = null;
        this.battleActionTimer = null;
        this.battleCutInCooldown = 0;
        this.enemyCutInIndex = 1;
        this.enemyCutInCount = 0;
        this.sosaCutInIndex = 0;
        this.sosaCutInCount = 0;
        this.somnusGestureCount = 0;
    },

    beginBattlePresentation: function(encounterKey) {
        this.addLog(this.veilHudLevel >= 1 ? 'Combat link open.' : 'Something is wrong with the air.');
        this.injectBattleBriefing(encounterKey);
        this.injectEnemyOpeners();
        if (FX) FX.play('battle-transition');
        if (AUDIO) AUDIO.play('start');
        if (AUDIO && typeof AUDIO.setEncounterMusic === 'function') AUDIO.setEncounterMusic(encounterKey);
        if (encounterKey === 'tutorial_1' && AUDIO && AUDIO.setMusic) AUDIO.setMusic('battle_tension', true);

        var self = this;
        var handoffDelay = this.settings && this.settings.reducedMotion ? 40 : 560;
        this.battleStartTimer = setTimeout(function() {
            self.battleStartTimer = null;
            self.screen = 'battle';
            self.battleStarting = false;
            self.advanceLock = false;
            self.checkAutoSelect();
            render();
            self.showOpeningCutIn();
        }, handoffDelay);
    },

    startBattle: function(encounterKey) {
        if (!DATA.encounters[encounterKey]) {
            console.error('Encounter not found:', encounterKey);
            return;
        }
        this.cancelBattleTimers();
        this.battleStarting = true;
        this.currentEncounterKey = encounterKey;
        this.battleContinuationUsed = false;
        this.routeComplianceActive = false;
        this.targetSwitchDisabled = false;
        this.bossState = this.buildBossState(encounterKey);
        this.resetBattleRuntimeState();
        this.enemies = [];
        this.spawnEnemies(DATA.encounters[encounterKey]);
        this.checkAutoSelect();
        this.configureEncounterSupport(encounterKey);
        this.applyEncounterStartRules(encounterKey);
        this.resetBattlePresentationState(encounterKey);
        this.beginBattlePresentation(encounterKey);
    },

    spawnEnemies: function(keys) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var isHuman = false;
            var baseData = null;

            if (key.indexOf('h:') === 0) {
                isHuman = true;
                key = key.substring(2);
            }

            if (DATA.humans && DATA.humans[key]) {
                isHuman = true;
                baseData = DATA.humans[key];
            } else if (DATA.weakEnemies && DATA.weakEnemies[key]) {
                baseData = DATA.weakEnemies[key];
            } else if (DATA.enemies) {
                baseData = DATA.enemies[key];
            }

            if (!baseData) continue;

            var enemy = {};
            for (var prop in baseData) {
                enemy[prop] = baseData[prop];
            }

            enemy.isHuman = isHuman;
            enemy.originalKey = key;
            enemy.formalName = enemy.name;
            if (!this.veilLearnedCensor) {
                var fieldNames = { rime:'Frost Shadow', rime_weak:'Shivering Cold', rime_weak_2:'Shivering Cold', chime:'Wire-Jaw', chime_relay:'Wire-Jaw Relay', spall:'Concrete Thing', slag:'Work Heap' };
                if (fieldNames[key]) enemy.name = fieldNames[key];
            }
            enemy.suffix = this.enemies.length > 0 ? String.fromCharCode(65 + this.enemies.length) : '';
            enemy.severHits = 0;
            enemy.taunted = false;
            enemy.disrupted = 0;
            enemy.nextMove = this.chooseEnemyMove(enemy);
            this.enemies.push(enemy);
        }

        if (this.bossState && this.bossState.anchorName && this.bossState.anchorHp > 0) {
            var anchorObj = {
                key: "anchor_" + this.bossState.type,
                originalKey: "anchor_" + this.bossState.type,
                name: this.bossState.anchorName + " — ANCHOR",
                hp: this.bossState.anchorHp,
                maxHp: this.bossState.anchorHp,
                atk: 0,
                armor: 0,
                isAnchor: true,
                severHits: 0,
                traced: false,
                nextMove: {
                    id: "anchor_hold",
                    label: "MATERIAL ANCHOR",
                    type: "field",
                    damage: 0,
                    guardImpact: 0,
                    effect: "none"
                }
            };
            this.enemies.push(anchorObj);
        }
    },

    checkAutoSelect: function() {
        var selectionIsCurrent = this.selectedEnemy && this.enemies.indexOf(this.selectedEnemy) !== -1;
        if (!selectionIsCurrent || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.selectedEnemy = null;
            for (var i = 0; i < this.enemies.length; i++) {
                if (!this.enemies[i].dead && !this.enemies[i].disabled) {
                    this.selectedEnemy = this.enemies[i];
                    break;
                }
            }
        }
        this.applyTrace();
    },

    // Black Flash remains impossible until the forced First Resonance succeeds in story.
    hasBlackFlashAwakened: function() {
        return !!(this.player && this.player.unlocked && this.player.unlocked.blackFlash && this.worldFlags && this.worldFlags.blackFlashAwakened);
    },

    getBlackFlashChance: function() {
        if (!this.hasBlackFlashAwakened()) return 0;
        if (!(this.blackFlashZoneTurns > 0)) return 0.04;
        return Math.min(0.52, 0.10 + Math.max(0, this.blackFlashStreak || 0) * 0.14);
    },

    breakBlackFlashStreak: function(reason) {
        if ((this.blackFlashStreak || 0) <= 0) return;
        this.blackFlashStreak = 0;
        this.addLog('BLACK FLASH STREAK BROKEN' + (reason ? ': ' + reason : '.') + (this.blackFlashZoneTurns > 0 ? ' The Zone remains.' : ''));
    },

    beginFirstResonanceCascade: function() {
        if (this.currentEncounterKey !== 'act3_hunt_battle' || this.firstResonanceReinforcements) return;
        this.firstResonanceReinforcements = true;
        this.blackFlashCascadeCharges = 2;
        var reinforcementStart = this.enemies.length;
        this.spawnEnemies(['rime','spall']);
        for (var ri = reinforcementStart; ri < this.enemies.length; ri++) if (this.enemies[ri].originalKey === 'spall' && this.mixedPairArmorActive) this.enemies[ri].armor = (this.enemies[ri].armor || 0) + 1;
        if (!this.worldFlags) this.worldFlags = {};
        this.worldFlags.firstResonanceReinforcements = true;
        this.addLog('THE TUNNEL ANSWERS. Pall and Spall reinforcements enter the field. LCK EX CASCADE: 2 convergence windows.');
        if (FX) FX.play('reinforcement');
        if (AUDIO) AUDIO.play('threshold');
        render();
    },

    queueBlackFlashWindow: function(actionName) {
        if (this._resolvingBlackFlash || this.blackFlashPendingAction) return false;
        var unlocked = this.hasBlackFlashAwakened();
        var forced = !!(this.blackFlashForced && !unlocked);
        if (!forced && !unlocked) return false;
        var cascade = !forced && this.currentEncounterKey === 'act3_hunt_battle' && (this.blackFlashCascadeCharges || 0) > 0;
        if (cascade) {
            this.blackFlashCascadeCharges--;
            this.blackFlashWindowChance = 1;
            this.addLog('LCK EX CASCADE. Reinforcement motion, Trace, and Somnus align again. Windows left: ' + this.blackFlashCascadeCharges + '.');
        } else if (!forced) {
            var chance = this.getBlackFlashChance();
            if (Math.random() >= chance) {
                this.breakBlackFlashStreak('THE NEXT SEVER LANDS NORMALLY');
                return false;
            }
            this.blackFlashWindowChance = chance;
        }

        this.blackFlashPendingAction = actionName;
        this.blackFlashTutorialWindow = forced;
        this.turnLock = true;
        var self = this;
        this.blackFlashArmTimer = setTimeout(function() {
            self.blackFlashArmTimer = null;
            if (!self.blackFlashPendingAction) return;
            self.blackFlashWindowActive = true;
            var debt = self.player ? self.player.debt : 0;
            var promptTime = forced ? 0 : ((self.settings && self.settings.reducedMotion) ? 3400 : (debt >= 85 ? 2000 : (debt >= 67 ? 2400 : 2800)));
            self.blackFlashWindowDuration = promptTime;
            self.addLog(forced ? "★ FIRST RESONANCE — TAP THE CONVERGENCE ★" : "★ BLACK FLASH WINDOW — TAP TO STRIKE ★");
            if (AUDIO) AUDIO.play('trace');
            render();
            if (forced) return; // first success is mandatory and cannot expire
            clearTimeout(self.blackFlashTimer);
            self.blackFlashTimer = setTimeout(function() {
                if (!self.blackFlashWindowActive) return;
                self.addLog("The convergence separates. The Sever lands normally.");
                self.resolvePendingBlackFlash(false);
            }, promptTime);
        }, 0);
        return true;
    },

    resolvePendingBlackFlash: function(success) {
        var actionName = this.blackFlashPendingAction;
        if (!actionName) return;

        clearTimeout(this.blackFlashTimer);
        this.blackFlashTimer = null;
        this.blackFlashPendingAction = null;
        this.blackFlashWindowActive = false;
        this.blackFlashReady = !!success;
        this.turnLock = false;

        if (success) {
            this.blackFlashStreak = Math.min(4, (this.blackFlashStreak || 0) + 1);
            if (!this.worldFlags) this.worldFlags = {};
            if (this.currentEncounterKey === 'act3_hunt_battle') this.worldFlags.firstResonanceHits = (this.worldFlags.firstResonanceHits || 0) + 1;
            if (this.blackFlashTutorialWindow) {
                this.player.unlocked.blackFlash = true;
                this.blackFlashForced = false;
                this.addLog("BLACK FLASH AWAKENED. Future direct Severs may find the interval again.");
                if (!this.worldFlags) this.worldFlags = {};
                this.worldFlags.blackFlashAwakened = true;
                this.worldFlags.blackFlashNamedBySosa = true;
                this.beginFirstResonanceCascade();
                var bfName = "Black Flash. Yeah, I'm stealing that too. I did not time that—I got lucky so hard physics filed a complaint. Reality synced the hit like an anime impact frame.";
                this.addLog('SOSA NAMES IT: “' + bfName + '”');
                if (this.showBattleCutIn) this.showBattleCutIn('sosa', {speaker:'Sosa', text:bfName}, 'sosa', false);
                if (FX) FX.play('black-flash');
                if (AUDIO) AUDIO.play('black-flash');
            } else {
                this.addLog('BLACK FLASH STREAK ' + this.blackFlashStreak + '. The next convergence becomes more likely while the Zone holds.');
                if (!this.worldFlags) this.worldFlags = {};
                this.worldFlags.passiveBlackFlashes = (this.worldFlags.passiveBlackFlashes || 0) + 1;
                if (FX) FX.play('black-flash');
                if (AUDIO) AUDIO.play('black-flash');
            }
        } else {
            this.breakBlackFlashStreak('THE TIMING WINDOW CLOSES');
        }
        this.blackFlashTutorialWindow = false;

        this._resolvingBlackFlash = true;
        if (actionName === 'dismantle') this.playerDismantle();
        else if (actionName === 'cleave') this.playerCleave();
        this._resolvingBlackFlash = false;
    },

    triggerBlackFlash: function() {
        if (this.blackFlashWindowActive) this.resolvePendingBlackFlash(true);
    },

    announceAction: function(name, sub) {
        clearTimeout(this.battleActionTimer);
        this.battleActionCallout = { name: name, sub: sub || '' };
        render();
        var self = this;
        this.battleActionTimer = setTimeout(function(){
            self.battleActionCallout = null;
            if (self.screen === 'battle') render();
        }, 1350);
    },

    familiarLabel: function() {
        return this.somnusNamed ? 'Somnus' : 'The shadow';
    },

    maybeSomnusGesture: function() {
        if (!this.somnusManifested || !this.somnusNamed || this.somnusGestureCount >= 1 || this.battleCutIn || this.battleResolved || Math.random() >= 0.14) return;
        var debt = this.player ? this.player.debt : 0;
        var text;
        if (this.coffinState && this.coffinState.active) {
            text = "The recessed mask turns toward the target before Sosa chooses.";
        } else if (debt >= 85) {
            text = "The furnace slit opens a fraction. A tendril tightens around Sosa's wrist when he looks away.";
        } else if (debt >= 67) {
            text = "Several memory-eyes blink at once. Somnus leans forward like it smells the ending.";
        } else if (this.selectedEnemy && this.selectedEnemy.isHuman) {
            text = "Somnus holds still for one beat—waiting for permission it does not technically need.";
        } else {
            text = "One memory-eye checks Sosa's pulse. The rest never leave the target.";
        }
        this.somnusGestureCount++;
        this.showBattleCutIn('somnus', { speaker: '', text: text }, 'somnus', false);
    },

    injectBattleBriefing: function(key) {
        var briefMap = {
            tutorial_1: 'REFUSE. You cannot cut yet. Stay upright.',
            act1_battle1: 'The shadow is awake. Looking gives it direction.',
            act1_battle2: 'More cold is crawling out. The shadow has not gone away.',
            tutorial_2: 'TRANSIT GUARD. Do not escalate. The shadow may disagree.',
            act2_battle1: 'Utica frost swarm. Trace structural faults.',
            dross_chime_base: 'One wire-jaw. One unanswered line. Cut the body before it learns a voice.',
            dross_chime: 'The wire-jaw is using voices it did not earn.',
            dross_nifl: 'FROST GROUP CHAT. Stop choosing bodies; sever the shared route.',
            dross_spall: 'The concrete thing moves when something hits.',
            street_predator_enc: 'Mugger on Cornelia. One cut along the line.',
            act3_hunt_battle: 'ICE MORTAR. Cold seals the concrete body’s cracks. Drop cold first to strip the borrowed shell.',
            act3_hunt_battle2: 'CUE TRADE. Cold, impact, and wire extend one another’s attacks while all three families stand.',
            act3_grief_battle: 'Grief weight pulling old monster traces into the alley.',
            dross_slag: 'The work heap wants the shift to continue.',
            dross_overtime: 'OVERTIME. Attacking on cadence feeds the shift. Web the line to break routine.',
            kessler_rescue_swarm: 'CROSSFEED. Cold seals concrete; impact powers wire. Web cuts the shared loop. Kessler brackets every second action.',
            kessler_joint_hunt: 'JOINT CLEANUP. Build saturation inside Kessler’s exclusion grid.',
            archon_fight: 'THE CONDEMNED WITNESS. Open the channel—someone must answer before the Red-Tag Core can break.',
            censor_enc: 'CENSOR SCOUT. Egregore audit in progress.',
            act5_hound_battle: 'EGREGORE HOUND. Graveframe active. Somnus drives.'
        };
        if (briefMap[key]) {
            this.addLog(briefMap[key]);
        }
    },

    getBattleDialogue: function() {
        return (DATA.battleDialogue && DATA.battleDialogue[this.currentEncounterKey]) || null;
    },

    showBattleCutIn: function(kind, entry, assetKey, persistent) {
        if (!entry || !entry.text || this.screen !== 'battle' || this.battleResolved) return;
        clearTimeout(this.battleCutInTimer);
        this.battleCutIn = {
            kind: kind,
            speaker: entry.speaker || (kind === 'sosa' ? 'Sosa' : (kind === 'somnus' ? '' : 'Enemy')),
            text: entry.text,
            assetKey: assetKey || null,
            persistent: !!persistent
        };
        if (persistent) this.turnLock = true;
        render();
        if (!persistent) {
            var self = this;
            this.battleCutInTimer = setTimeout(function() {
                self.battleCutIn = null;
                if (self.screen === 'battle') render();
            }, 4200);
        }
    },

    dismissBattleCutIn: function() {
        if (!this.battleCutIn || !this.battleCutIn.persistent) return;
        this.battleCutIn = null;
        if (this.battleIntroQueue && this.battleIntroQueue.length) {
            var next = this.battleIntroQueue.shift();
            this.showBattleCutIn(next.kind, next.entry, next.assetKey, true);
            return;
        }
        this.turnLock = false;
        render();
    },

    showOpeningCutIn: function() {
        var cfg = this.getBattleDialogue();
        if (!cfg || !cfg.enemy || !cfg.enemy.length) return;
        var enemy = this.selectedEnemy;
        var assetKey = enemy ? (enemy.originalKey || enemy.key) : null;
        this.battleCutInCooldown = 2;
        this.battleIntroQueue = [];
        if (cfg.sosa && cfg.sosa.length) {
            this.battleIntroQueue.push({ kind:'sosa', entry:{ speaker:'Sosa', text:cfg.sosa[0] }, assetKey:'sosa' });
            this.sosaCutInIndex = 1;
            this.sosaCutInCount = 1;
        }
        this.showBattleCutIn('enemy', cfg.enemy[0], assetKey, true);
    },

    maybeBattleCutIn: function(kind, enemy) {
        if (this.battleCutIn || this.battleCutInCooldown > 0 || this.battleResolved) return;
        var cfg = this.getBattleDialogue();
        if (!cfg) return;
        var chance = kind === 'enemy' ? 0.38 : 0.18;
        if (Math.random() >= chance) return;

        if (kind === 'enemy' && cfg.enemy && cfg.enemy.length > 1) {
            var available = cfg.enemy.length - 1;
            if (this.enemyCutInCount >= available) return;
            var index = 1 + this.enemyCutInCount;
            this.enemyCutInCount++;
            if (enemy) enemy._midLine = true;
            this.showBattleCutIn('enemy', cfg.enemy[index], enemy ? (enemy.originalKey || enemy.key) : null, false);
        } else if (kind === 'sosa' && cfg.sosa && cfg.sosa.length) {
            if (this.sosaCutInCount >= Math.min(2, cfg.sosa.length)) return;
            var line = cfg.sosa[this.sosaCutInIndex % cfg.sosa.length];
            this.sosaCutInIndex++;
            this.sosaCutInCount++;
            this.showBattleCutIn('sosa', { speaker: 'Sosa', text: line }, 'sosa', false);
        }
        this.battleCutInCooldown = 3;
    },

    injectEnemyOpeners: function() {
        var cfg = this.getBattleDialogue();
        if (!cfg || !cfg.enemy || !cfg.enemy.length) return;
        var opener = cfg.enemy[0];
        this.addLog(opener.speaker + ': “' + opener.text + '”');
        if (this.selectedEnemy) this.selectedEnemy._spokeOpen = true;
    },

    playerRefuse: function() {
        var earlyRefuse = !!((this.tutorial && this.tutorial.active) || !(this.player.unlocked && this.player.unlocked.dismantleNamed));
        if (!earlyRefuse) {
            this.addLog('Refuse was the command before Sosa could direct Somnus. Interception is automatic now.');
            if (AUDIO) AUDIO.play('error');
            return;
        }
        var alone = this.battlePhase === 'alone' && !this.somnusManifested;
        // FIX: early Pall swarms were debt-bombing to Threshold in 7 rounds (8 debt per Refuse)
        // Reduce gain for Act1/Act2 early encounters so Shrine can kill before Coffin
        var earlySet = { 'act1_battle1':1, 'act1_battle2':1, 'act2_battle1':1, 'tutorial_1':1, 'tutorial_2':1 };
        var isEarly = !!(this.currentEncounterKey && earlySet[this.currentEncounterKey]);
        var baseGain = (this.tutorial && this.tutorial.active) ? this.tutorial.refuseDebtGain : 8;
        if (isEarly) baseGain = 3; // was 8
        var gain = alone ? 3 : baseGain;
        var bonus = alone ? 0 : (this.tutorial && this.tutorial.active ? this.tutorial.refusePoiseBonus : 2);

        this.player.debt = Math.min(100, this.player.debt + gain);
        if (!alone) this.player.poise = Math.min(6, this.player.poise + bonus);

        if (alone) {
            this.addLog('Refuse. My hands are shaking in my pockets. Debt +' + gain + '%.');
        } else {
            this.addLog('Refuse. ' + this.familiarLabel() + ' gathers into black glass. Guard +' + bonus + '. Debt +' + gain + '%.');
            if (FX) FX.play('refuse');
            if (AUDIO) AUDIO.play('click');
        }

        this.checkThreshold();
        this.endPlayerTurn();
    },

    playerDismantle: function() {
        if (!this.player.unlocked.dismantle || !this.selectedEnemy) return;
        if (this.selectedEnemy.dead || this.selectedEnemy.disabled || this.enemies.indexOf(this.selectedEnemy) === -1) {
            this.checkAutoSelect();
            if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) return;
        }

        if (!this._resolvingBlackFlash && this.queueBlackFlashWindow('dismantle')) return;

        var hasSight = !!this.player.unlocked.trace;
        var dismantleTarget = this.selectedEnemy;
        var traceDepth = hasSight ? (dismantleTarget.dismantleDepth || 0) : 0;
        this.announceAction(hasSight ? 'SEVER: DISMANTLE' : 'UNNAMED SEVER', hasSight ? ('FAULT READ ' + (traceDepth + 1) + '/3') : 'THE SHADOW MOVES');
        this.player.debt = Math.min(100, this.player.debt + 3);
        this.checkThreshold();
        var baseDmg = hasSight
            ? DATA.shrine.minDmg + Math.floor(Math.random() * (DATA.shrine.maxDmg - DATA.shrine.minDmg + 1))
            : 6 + Math.floor(Math.random() * 5);

        if (hasSight && traceDepth === 1) baseDmg = Math.floor(baseDmg * 1.20);
        else if (hasSight && traceDepth >= 2) baseDmg = Math.floor(baseDmg * 1.50);
        if (this.blackFlashZoneTurns > 0) baseDmg = Math.floor(baseDmg * 1.20);
        var landedBlackFlash = !!this.blackFlashReady;

        // Black Flash multiplier: normal damage to the power of 2.5
        if (this.blackFlashReady) {
            baseDmg = Math.floor(Math.pow(baseDmg, 2.5));
            this.addLog("BLACK FLASH — the hit lands with impossible weight.");
            this.addLog("★ BLACK FLASH ZONE ACTIVE — next Sever empowered ★");
            this.blackFlashReady = false;
            this.blackFlashWindowActive = false;

            // Temporary Black Flash Zone buff
            this.blackFlashZoneTurns = 3;
        }

        this.addFurnaceSaturation(1);
        var dismantleTargetIndex = this.enemies.indexOf(this.selectedEnemy);
        if (FX) FX.play('dismantle', {targetIndex:dismantleTargetIndex});
        if (AUDIO) AUDIO.play('sever');
        var dealt = this.damageEnemy(this.selectedEnemy, baseDmg, false);
        if (dealt > 0) {
            this.addSeverHit(dismantleTarget);
            if (hasSight) {
                if (traceDepth >= 2) {
                    dismantleTarget.dismantleDepth = 0;
                    this.addLog('DISMANTLE // BREAKPOINT. The third read opens the loaded fault; Trace Depth resets.');
                } else {
                    dismantleTarget.dismantleDepth = traceDepth + 1;
                    this.addLog('TRACE DEPTH ' + dismantleTarget.dismantleDepth + '/3. Stay on this target to deepen the next cut.');
                }
            }
        }

        if (hasSight) {
            this.addLog('Sever: Dismantle on ' + this.selectedEnemy.name + '. ' + dealt + ' damage.');
        } else {
            this.addLog(this.familiarLabel() + ' strikes ' + this.selectedEnemy.name + '. ' + dealt + ' damage.');
        }

        if (this.selectedEnemy && !this.selectedEnemy.dead) {
            var shatteringOpened = landedBlackFlash ? false : this.tryOpenShattering();
            if (!shatteringOpened) {
                this.consumeHellstepAction();
                this.endPlayerTurn();
            }
        } else {
            this.consumeHellstepAction();
            this.endPlayerTurn();
        }
    },

    playerWeb: function() {
        if (!this.player.unlocked.web) return;
        if (this.webCooldown > 0) {
            this.addLog('Web lattice is still settling. Cooldown ' + this.webCooldown + '.');
            if (AUDIO) AUDIO.play('error');
            return;
        }
        this.announceAction('SEVER: WEB', 'FIELD CONTROL');
        this.breakBlackFlashStreak('FIELD ACTION INTERRUPTS THE COMBINATION');
        this.player.debt = Math.min(100, this.player.debt + 10);
        this.checkThreshold();

        if (this.autonomyDrift > 0 && !this.targetLockedBySomnus) {
            this.autonomyDrift = Math.max(0, this.autonomyDrift - 1);
            this.addLog('WEB // BROADEN PRIORITY. Somnus Fixation -1 (' + this.autonomyDrift + '/3).');
        }
        if (this.currentEncounterKey === 'dross_overtime') {
            this.overtimeClock = 0;
            this.overtimeInterrupted = true;
            this.addLog('WEB // BREAK ROUTINE. Overtime cadence reset to 0/3.');
        }
        if (this.currentEncounterKey === 'kessler_rescue_swarm') {
            this.mixedCrossfeedClock = 0;
            this.mixedCrossfeedInterrupted = true;
            this.addLog('WEB // CUT CROSSFEED. Cold, impact, and wire lose the shared loop.');
        }

        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (!e.dead && !e.disabled) {
                e.disrupted = 2;
                e.webbedTurns = 2;
                if (e.nextMove && e.nextMove.type === "field") {
                    e.nextMove = { id: "interrupted", label: "INTENT INTERRUPTED", type: "field", damage: 0, guardImpact: 0, effect: "none" };
                }
                this.damageEnemy(e, 4, true);
            }
        }
        this.webCooldown = 3;
        this.addFurnaceSaturation(2);
        this.addLog("Sever: Web maps the field. Enemy output -20%, barrages shortened, field moves grounded. Saturation +2.");
        if (FX) FX.play('web');
        if (AUDIO) AUDIO.play('web');
        this.consumeHellstepAction();
        this.endPlayerTurn();
    },

    playerFurnace: function() {
        if (!this.player.unlocked.furnace) return;
        if ((this.furnaceSaturation || 0) < 3) {
            this.addLog("Furnace requires a saturated severance field.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        this.announceAction('FURNACE', 'OPEN');
        this.breakBlackFlashStreak('FURNACE ENDS THE COMBINATION');
        this.player.debt = Math.min(100, this.player.debt + 18);
        this.checkThreshold();
        this.furnaceSaturation = 0;

        if (!this.worldFlags) this.worldFlags = {};
        this.worldFlags.furnaceUses = (this.worldFlags.furnaceUses || 0) + 1;
        if (!this.worldFlags.furnaceByEncounter) this.worldFlags.furnaceByEncounter = {};
        this.worldFlags.furnaceByEncounter[this.currentEncounterKey || 'unknown'] = (this.worldFlags.furnaceByEncounter[this.currentEncounterKey || 'unknown'] || 0) + 1;
        if (this.currentEncounterKey === 'dross_overtime') this.worldFlags.overtimeFurnaceUsed = true;
        if (this.currentEncounterKey === 'archon_fight') this.worldFlags.archonFurnaceUsed = true;
        if (this.currentEncounterKey === 'censor_enc') this.worldFlags.censorFurnaceUsed = true;

        if (this.currentEncounterKey === 'kessler_joint_hunt' && this.enemies.some(function(e){ return !e.dead && e.originalKey === 'spall_atlas'; })) {
            if (!this.worldFlags) this.worldFlags = {};
            this.worldFlags.atlasFurnaceUsed = true;
            this.addLog('ATLAS COLLATERAL: Furnace chooses speed over structural preservation.');
        }

        var baseDmg = 50 + Math.floor(Math.random() * 15);

        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (!e.dead) {
                this.damageEnemy(e, baseDmg, true);
            }
        }

        this.addLog("FURNACE (OPEN). Violet thermobaric eruption.");
        if (FX) FX.play("furnace");
        if (AUDIO) AUDIO.play("furnace");
        this.consumeHellstepAction();
        this.endPlayerTurn();
    },

    damageCensorGrid: function(amount) {
        if (!this.bossState || this.bossState.type !== 'censor' || !this.bossState.fieldActive) return;
        this.bossState.fieldIntegrity = Math.max(0, (this.bossState.fieldIntegrity || 0) - (amount || 1));
        this.addLog('FORMALCRAFT GRID fractures. Integrity ' + this.bossState.fieldIntegrity + '/' + this.bossState.fieldMaxIntegrity + '.');
        if (this.bossState.fieldIntegrity <= 0) {
            this.bossState.fieldActive = false;
            this.bossState.fieldBroken = true;
            this.addLog('FORMALCRAFT GRID COLLAPSED. Kessler is exposed.');
            if (FX) FX.play('shattering');
            if (AUDIO) AUDIO.play('shattering');
        }
    },

    playerCleave: function() {
        if (!this.player.unlocked.cleave) return;
        if ((this.cleaveCooldown || 0) > 0) {
            this.addLog('Cleave is recalibrating. Use a precision cut or reshape the field.');
            if (AUDIO) AUDIO.play('error');
            return;
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.checkAutoSelect();
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.addLog('No target designated.');
            if (AUDIO) AUDIO.play('error');
            return;
        }

        if (!this._resolvingBlackFlash && this.queueBlackFlashWindow('cleave')) return;

        this.announceAction('SEVER: CLEAVE', 'ADAPTIVE CUT');
        this.player.debt = Math.min(100, this.player.debt + 7);
        this.cleaveCooldown = 2; // decrements after enemy phases; prevents consecutive-turn spam
        this.checkThreshold();

        var target = this.selectedEnemy;

        // Cleave is a committed adaptive cut: poor economy on soft bodies, exceptional against mass/armor.
        // Unlike Dismantle's ranged fixed line, Somnus must finish reading the target before it can adapt again.
        var armorVal = target.armor || 0;
        var maxHp = target.maxHp || target.hp || 30;
        var toughnessBonus = armorVal * 5 + Math.floor(maxHp * 0.07);
        var bossBonus = 0;
        if (this.bossState) {
            if (this.bossState.type === 'archon') bossBonus = 7;
            else if (this.bossState.type === 'censor') bossBonus = 6;
            else if (this.bossState.type === 'hound') bossBonus = 9;
        }
        var baseDmg = 10 + toughnessBonus + bossBonus + Math.floor(Math.random() * 6);

        if (this.blackFlashZoneTurns > 0) baseDmg = Math.floor(baseDmg * 1.20);

        // Black Flash multiplier: normal damage to the power of 2.5
        if (this.blackFlashReady) {
            baseDmg = Math.floor(Math.pow(baseDmg, 2.5));
            this.addLog("SEVER: RESONANCE — the cuts sing together.");
            this.blackFlashReady = false;
            this.blackFlashWindowActive = false;

            // Temporary Black Flash Zone buff
            this.blackFlashZoneTurns = 3;
        }

        var dealt = this.damageEnemy(target, baseDmg, true);
        if (dealt > 0) {
            if (this.bossState && this.bossState.type === 'censor' && this.bossState.fieldActive && !target.isAnchor) this.damageCensorGrid(1);
            this.addSeverHit(target);
            this.addFurnaceSaturation(1);
            if (target.armor && target.armor > 0) {
                target.armor = Math.max(0, target.armor - 1);
                this.addLog("Sever: Cleave strips 1 armor from " + target.name + ". [Armor " + armorVal + "→" + target.armor + "]");
            }
            this.addLog('Sever: Cleave on ' + target.name + '. ' + dealt + ' damage (adaptive). Recalibration 1 round.');
        }

        if (FX) FX.play('cleave');
        if (AUDIO) AUDIO.play('sever');

        if (target && !target.dead) {
            var shatteringOpened = this.tryOpenShattering();
            if (!shatteringOpened) {
                this.consumeHellstepAction();
                this.endPlayerTurn();
            }
        } else {
            this.consumeHellstepAction();
            this.endPlayerTurn();
        }
    },

    playerSeverTrue: function() {
        if (!this.player.unlocked.severTrue || !this.selectedEnemy) return;
        if (this.selectedEnemy.dead) return;

        if (!this.selectedEnemy.traced) {
            this.addLog("Trace unstable. No valid fault.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        if (!this.hellstepActive) {
            this.addLog('Requires Hellstep active.');
            if (AUDIO) AUDIO.play('error');
            return;
        }
        if ((this.selectedEnemy.severHits || 0) < 2) {
            this.addLog('Requires two prior Sever hits.');
            if (AUDIO) AUDIO.play('error');
            return;
        }

        this.announceAction('SEVER: TRUE', this.player.debt >= 67 ? 'WORLD CUT' : 'CRITICAL SEVERANCE');
        this.player.debt = Math.min(100, this.player.debt + 20);

        // WORLD CUT — reworked per Sukuna Shrine study: not just big number, cuts space itself
        // Dismantle = default slash (inanimate), Cleave = adjusts to toughness/CE (living)
        // World Cut = extension of Cleave that cuts space the target occupies, bypasses Infinity/Bounded Field
        var baseDmg = 90 + Math.floor(Math.random() * 20); // lower base than old 120, but TRUE
        var target = this.selectedEnemy;

        // If boss field active, World Cut bypasses it entirely and shatters law
        if (this.bossState && this.bossState.fieldActive) {
            this.addLog("SEVER: TRUE // WORLD CUT — space itself is cut.");
            this.addLog("The territory law cannot hold a line that isn't there.");
            // Break field
            this.bossState.fieldActive = false;
            this.bossState.fieldBroken = true;
            if (this.bossState.anchorHp && this.bossState.anchorHp > 0) {
                // Also chip anchor
                this.bossState.anchorHp = Math.max(0, this.bossState.anchorHp - 18);
                this.addLog("MATERIAL ANCHOR cracked — " + this.bossState.anchorHp + " HP left.");
            }
        } else {
            this.addLog("SEVER: TRUE // WORLD CUT on " + target.name + ".");
        }

        // True damage — bypasses armor, bypasses field, bypasses everything
        var dealt = this.damageEnemyTrue(target, baseDmg);

        if (dealt > 0) {
            this.addSeverHit(target);
        }

        if (FX) FX.play('true');
        if (AUDIO) AUDIO.play('sever');
        // Screen shake + flash
        if (FX && !this.settings.disableShake) FX.shake(12);

        this.endPlayerTurn();
    },

    // New: True damage that ignores all boss field restrictions and armor
    damageEnemyTrue: function(target, amount) {
        if (!target || target.dead || target.disabled) return 0;
        // Ignore boss fieldActive limit, ignore armor
        target.hp -= amount;
        if (target.isAnchor) {
            this.bossState.anchorHp = Math.max(0, target.hp);
            if (target.hp <= 0) {
                target.hp = 0;
                target.dead = true;
                target.traced = false;
                if (this.bossState.fieldActive) {
                    this.bossState.fieldActive = false;
                    this.bossState.fieldBroken = true;
                    this.addLog("THE TERRITORY STUTTERS. ITS LAW NO LONGER HOLDS — WORLD CUT.");
                }
            }
        } else if (target.hp <= 0) {
            target.hp = 0;
            target.dead = true;
            target.traced = false;
            if (target === this.selectedEnemy) this.targetLockedBySomnus = false;
            if (target.isHuman) {
                this.addLog(target.name + " — cut along the world. Unmade.");
                if (FX) FX.play('human-kill');
            } else {
                this.addLog(target.name + " shatters into obsidian dust — space cut.");
                if (FX) FX.play('enemy-kill');
            }
        }
        return amount;
    },

    canSeverTrue: function(enemy) {
        var target = enemy || this.selectedEnemy;
        return !!(this.player.unlocked.severTrue && target && target.traced && this.hellstepActive && (target.severHits || 0) >= 2 && !target.dead);
    },

    shrineTick: function() {
        if (!this.somnusManifested) return;

        if (this.playerStatuses && this.playerStatuses.static > 0) {
            if (this.hellstepActive) {
                this.addLog("Hellstep forces the lock through the interference.");
            } else {
                this.playerStatuses.static--;
                this.addLog("VEIL NOISE. Shrine lock breaks before Somnus can cut.");
                if (FX) FX.play("stin-fail");
                if (AUDIO) AUDIO.play("stin-fail");
                return;
            }
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.checkAutoSelect();
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) return;

        var target = this.selectedEnemy;
        if (!target.traced) {
            target.traced = true;
        }

        this.shrineTickCount = (this.shrineTickCount || 0) + 1;
        // FIX: boost early shrine so Pall dies in 4-5 rounds not 7, and slow debt
        var earlyBoost = (this.currentEncounterKey && { 'act1_battle1':1, 'act1_battle2':1, 'act2_battle1':1, 'tutorial_1':1 }[this.currentEncounterKey]) ? 6 : 0;
        var minD = (DATA.shrine ? DATA.shrine.minDmg : 8) + earlyBoost;
        var maxD = (DATA.shrine ? DATA.shrine.maxDmg : 12) + earlyBoost;
        if (this.player.debt >= 67) { minD += 3; maxD += 5; } // high debt stronger
        var baseDmg = minD + Math.floor(Math.random() * (maxD - minD + 1));
        var debtMult = this.getShrineDebtMultiplier();
        var finalDmg = Math.floor(baseDmg * debtMult);
        if (this.blackFlashZoneTurns > 0) {
            finalDmg = Math.floor(finalDmg * 1.25);
        }
        if (this.bossState && this.bossState.type === "censor" && this.bossState.fieldActive && !target.isAnchor) {
            finalDmg = Math.floor(finalDmg * 0.5);
        }
        // Coffin doubles shrine tick
        if (this.coffinState && this.coffinState.active) finalDmg = Math.floor(finalDmg * 1.6);

        var shrineTargetIndex = this.enemies.indexOf(target);
        if (FX) FX.play('shrine-slash', {targetIndex:shrineTargetIndex});
        if (AUDIO) AUDIO.play('shrine-slash');
        var dealt = this.damageEnemy(target, finalDmg, true);
        if (dealt > 0) {
            this.shrineTargetTicks = (this.shrineTargetTicks || 0) + 1;
            if (this.shrineTargetTicks % 2 === 0) {
                this.addFurnaceSaturation(1);
                this.addLog("Shrine field resonance — Saturation +1.");
            }
        }
        this.addLog((this.somnusNamed ? 'Shrine of Refusal' : 'The unseen cut') + ' slashes ' + target.name + '. ' + dealt + ' damage.');
        // FIX: slower debt — was every 4 ticks +1, now every 6 ticks +1, and none if early
        var shrineDebtInterval = (this.coffinState && this.coffinState.active) ? 8 : 6;
        if (this.shrineTickCount % shrineDebtInterval === 0) {
            this.player.debt = Math.min(100, this.player.debt + 1);
        }
    },

    endPlayerTurn: function() {
        this.maybeBattleCutIn('sosa');
        this.battleTurnCount = (this.battleTurnCount || 0) + 1;
        this.applyAlliedSupport();
        this.turnLock = true;
        render();

        var self = this;
        setTimeout(function() {
            if (self.checkBattleEnd()) {
                self.turnLock = false;
                render();
                return;
            }
            self.enemyTurn();
        }, 620);
    },

    applyAlliedSupport: function() {
        var cfg = DATA.alliedSupport && DATA.alliedSupport[this.currentEncounterKey];
        if (!cfg || this.battleResolved) return;
        var cadence = Math.max(1, cfg.cadence || 2);
        if ((this.battleTurnCount || 0) % cadence !== 0) return;
        var target = null;
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (!e.dead && !e.disabled && !e.isAnchor && (!target || e.hp > target.hp)) target = e;
        }
        if (!target) return;
        var suppression = Math.max(0, cfg.suppression || 0);
        target.webbedTurns = Math.max(target.webbedTurns || 0, suppression);
        target.disrupted = Math.max(target.disrupted || 0, suppression);
        target.kesslerBracketed = true;
        if (suppression && target.nextMove && target.nextMove.type === 'field') {
            target.nextMove = { id:'bracketed', label:'BRACKETED', type:'field', damage:0, guardImpact:0, hits:1, poiseRule:'ignore', effect:'none' };
        }
        var dealt = this.damageEnemy(target, cfg.damage || 0, true);
        this.addLog((cfg.ally || 'ALLY').toUpperCase() + ' // ' + (cfg.label || 'SUPPORT') + ' pins ' + target.name + '. ' + dealt + ' damage; output suppressed.');
        if (FX) FX.play('ally-bracket', {targetIndex:this.enemies.indexOf(target)});
        if (AUDIO) AUDIO.play('intercept');
    },

    spawnBattleWave: function(tag, keys, label) {
        if (!this.reinforcementState) this.reinforcementState = {};
        if (this.reinforcementState[tag]) return false;
        this.reinforcementState[tag] = true;
        this.spawnEnemies(keys);
        if (!this.worldFlags) this.worldFlags = {};
        this.worldFlags.reinforcementWaves = (this.worldFlags.reinforcementWaves || 0) + 1;
        this.addLog('WAVE INBOUND // ' + label + '.');
        this.announceAction('WAVE INBOUND', label);
        if (FX) FX.play('reinforcement');
        if (AUDIO) AUDIO.play('threshold');
        render();
        return true;
    },

    checkBattleReinforcements: function(target) {
        if (this.currentEncounterKey === 'act1_battle2' && this.battleDrossKills >= 2) this.spawnBattleWave('texas_cold_return',['rime_weak','rime_weak_2'],'THE COLD FILLS THE EXIT');
        if (this.currentEncounterKey === 'act2_battle1' && this.battleDrossKills >= 2) this.spawnBattleWave('utica_cold_return',['rime'],'ANOTHER BODY LEAVES THE WALL');
        if (this.currentEncounterKey === 'dross_nifl') {
            var nifl = this.enemies.find(function(e){return !e.dead && e.originalKey === 'rime_nifl';});
            if (nifl && nifl.hp <= Math.floor(nifl.maxHp * 0.5)) this.spawnBattleWave('nifl_new_accounts',['rime_weak','rime_weak_2'],'NIFL OPENS TWO NEW ACCOUNTS');
        }
    },

    damageEnemy: function(target, amount, bypassArmor) {
        if (!target || target.dead || target.disabled) return 0;

        if (target.isAnchor && this.bossState && this.bossState.type === "archon" && !(this.supportState && this.supportState.answered)) {
            if (!this._archonWitnessGateLogged) {
                this._archonWitnessGateLogged = true;
                this.addLog("RED-TAG CORE: OBSERVATION ONLY. A witness must answer before the record can be changed.");
            }
            return 0;
        }

        var effDmg = amount;

        if (this.bossState && this.bossState.type === "archon" && this.bossState.fieldActive && !target.isAnchor) {
            effDmg = bypassArmor ? Math.min(amount, 3) : 1;
        } else if (this.bossState && this.bossState.type === "censor" && this.bossState.fieldActive && !target.isAnchor) {
            var gridArmor = 12;
            effDmg = bypassArmor ? amount : Math.max(1, amount - gridArmor);
        } else if (!bypassArmor && target.armor) {
            effDmg = Math.max(1, amount - target.armor);
        }

        if (this.currentEncounterKey === 'kessler_joint_hunt' && target.originalKey === 'spall_atlas' && (target.webbedTurns || 0) <= 0 && effDmg > 1) {
            var carrier = null;
            for (var ai = 0; ai < this.enemies.length; ai++) {
                var candidate = this.enemies[ai];
                if (candidate !== target && !candidate.dead && !candidate.disabled && candidate.originalKey === 'spall' && (!carrier || candidate.hp > carrier.hp)) carrier = candidate;
            }
            if (carrier) {
                var transferred = Math.max(1, Math.floor(effDmg * 0.5));
                effDmg -= transferred;
                this.damageEnemy(carrier, transferred, true);
                if (!this.worldFlags) this.worldFlags = {};
                this.worldFlags.atlasLoadTransfers = (this.worldFlags.atlasLoadTransfers || 0) + 1;
                this.addLog('ATLAS // LOAD TRANSFER routes ' + transferred + ' damage into ' + carrier.name + '. Web can pin the map.');
            }
        }

        target.hp -= effDmg;

        if (this.bossState && this.bossState.fieldActive && !target.isAnchor && target.hp <= 0) {
            target.hp = 1;
            this.addLog("The territory law resists complete destruction while field holds.");
        }

        if (target.isAnchor) {
            this.bossState.anchorHp = Math.max(0, target.hp);
            if (target.hp <= 0) {
                target.hp = 0;
                target.dead = true;
                target.traced = false;
                if (this.bossState.fieldActive) {
                    this.bossState.fieldActive = false;
                    this.bossState.fieldBroken = true;
                    this.addLog("THE TERRITORY STUTTERS. ITS LAW NO LONGER HOLDS.");
                }
            }
        } else if (target.hp <= 0) {
            target.hp = 0;
            target.dead = true;
            target.traced = false;
            if (target === this.selectedEnemy) {
                this.targetLockedBySomnus = false;
            }
            if (this.currentEncounterKey === 'act3_hunt_battle' && this.mixedPairArmorActive && target.originalKey === 'rime') {
                this.mixedPairArmorActive = false;
                for (var ir = 0; ir < this.enemies.length; ir++) {
                    var impactBody = this.enemies[ir];
                    if (!impactBody.dead && impactBody.originalKey === 'spall') impactBody.armor = Math.max(0, (impactBody.armor || 0) - 1);
                }
                this.addLog('ICE MORTAR BREAKS. The concrete body loses its borrowed shell.');
            }

            if (target.isHuman && target.originalKey === 'transit_security') {
                target.dead = false;
                target.disabled = true;
                this.addLog(target.name + ' drops his flashlight and flees down the platform!');
            } else if (target.isHuman) {
                this.addLog(target.name + ' collapses in the snow. Unmade.');
                if (FX) FX.play('human-kill');
                if (AUDIO) AUDIO.play('human-kill');
            } else {
                this.battleDrossKills = (this.battleDrossKills || 0) + 1;
                this.addLog(target.name + ' shatters into obsidian dust.');
                var drossKeys = { rime:1, rime_nifl:2, rime_weak:1, rime_weak_2:1, chime:1, chime_relay:3, spall:1, spall_atlas:2, slag:1, slag_overtime:2 };
                var signature = drossKeys[target.originalKey] || 0;
                if (signature > 0) {
                    if (!this.worldFlags) this.worldFlags = {};
                    this.worldFlags.drossBodiesDestroyed = (this.worldFlags.drossBodiesDestroyed || 0) + 1;
                    this.worldFlags.egregoreCleanupTrail = (this.worldFlags.egregoreCleanupTrail || 0) + signature;
                }
                if (FX && typeof FX.playEnemyDeath === 'function') FX.playEnemyDeath(target,this.enemies.indexOf(target));
                if (AUDIO) AUDIO.play('sever');
            }
        }
        this.checkBattleReinforcements(target);
        return effDmg;
    },

    applyPatchJob: function(trigger) {
        if (!this.player.unlocked.patchJob || this.player.hp <= 0) return;
        var before = this.player.hp;
        var heal = 15;
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + heal);
        var restored = this.player.hp - before;
        if (restored > 0) {
            this.addLog('PATCH JOB. Breathe. Check what still moves. HP +' + restored + '.');
        }
    },

    checkBattleEnd: function() {
        if (this.battleResolved) return true;

        var allDone = true;
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (!e.isAnchor && !e.dead && !e.disabled) {
                allDone = false;
                break;
            }
        }

        if (allDone) {
            this.shrineActive = false;
            this.shrineTickCount = 0;
            this.onBattleWin();
            return true;
        }

        return false;
    },

    getDebtTier: function() {
        var debt = this.player ? (this.player.debt || 0) : 0;

        if (debt >= 100) return "threshold";
        if (debt >= 80) return "overload";
        if (debt >= 67) return "carried";
        if (debt >= 34) return "balanced";

        return "stable";
    },

    getShrineDebtMultiplier: function() {
        var tier = this.getDebtTier();

        if (tier === "overload") return 1.35;
        if (tier === "carried") return 1.25;
        if (tier === "balanced") return 1.10;

        return 1;
    },

    resolveAutonomyDrift: function() {
        if (this.autonomyDrift < 3) return;

        this.autonomyDrift = 0;

        if (
            !this.selectedEnemy ||
            this.selectedEnemy.dead ||
            this.selectedEnemy.disabled
        ) {
            return;
        }

        this.targetLockedBySomnus = true;
        var fixationName = this.selectedEnemy.name || 'current target';
        this.addLog('SOMNUS FIXATION LOCKED: ' + fixationName + '. Trace will not release until the target falls.');
        if (!this.worldFlags) this.worldFlags = {};
        this.worldFlags.fixationLocks = (this.worldFlags.fixationLocks || 0) + 1;
    },

    addFurnaceSaturation: function(amount) {
        var zoneBonus = this.blackFlashZoneTurns > 0 ? 1 : 0;
        var before = this.furnaceSaturation || 0;
        this.furnaceSaturation = Math.min(
            this.furnaceSaturationMax,
            before + amount + zoneBonus
        );
        if (this.player.unlocked.furnace && before < this.furnaceSaturationMax && this.furnaceSaturation >= this.furnaceSaturationMax && !(this.worldFlags && this.worldFlags.furnaceExplained)) {
            this.furnaceReadyNarrativePending = true;
        }
        if (zoneBonus > 0) this.addLog("BLACK FLASH ZONE. Furnace saturation +1.");
    },

    getPoiseCapacity: function() {
        // FIX: Coffin = unbreakable 6, ignores coldHold, always barrier
        if (this.coffinState && this.coffinState.active) return 6;

        var debt = this.player ? (this.player.debt || 0) : 0;
        var capacity = 0;

        if (!this.somnusManifested) return 0;

        if (debt >= 100) capacity = 6;
        else if (debt <= 33) capacity = 4;
        else if (debt <= 66) capacity = 5;
        else capacity = 6;

        // FIX: coldHold reduces by 1 but never below 3 in early Pall — was too punishing
        if (this.playerStatuses && this.playerStatuses.coldHold > 0) {
            var isEarly = this.currentEncounterKey && { 'act1_battle1':1, 'act1_battle2':1, 'act2_battle1':1 }[this.currentEncounterKey];
            if (!isEarly) capacity = Math.max(0, capacity - 1);
            else capacity = Math.max(3, capacity - 1);
        }

        return capacity;
    },

    resolveGuardImpact: function(enemy, move) {
        var impact = (move && move.guardImpact !== undefined) ? move.guardImpact : 1;

        if (this.player.poise >= impact) {
            this.player.poise -= impact;
            this.addLog(this.familiarLabel() + " catches it in black glass. Guard -" + impact + " (" + this.player.poise + " left).");
            if (FX) FX.play("intercept");
            if (AUDIO) AUDIO.play("intercept");
            return "blocked";
        }

        if (this.player.poise > 0) {
            this.player.poise = 0;

            if (this.player && this.player.armorShell > 0) {
                this.player.armorShell = 0;
                this.addLog("INTERCEPTION BREACH. Black glass closes around the impact.");
                if (FX) FX.play("intercept");
                if (AUDIO) AUDIO.play("intercept");
                return "breached_armored";
            } else {
                this.addLog("INTERCEPTION BREACH. " + this.familiarLabel() + " catches most of it too late.");
                if (FX) FX.play("intercept");
                if (AUDIO) AUDIO.play("intercept");
                return "breached";
            }
        }

        return "open";
    },

    applyEnemyIntentDamage: function(enemy, damage, move) {
        if (this.graveState && this.graveState.active) {
            this.graveState.integrity--;
            this.graveState.aftermath++;
            this.addLog("The field takes the burial instead. INTEGRITY " + this.graveState.integrity + "/3.");
            if (FX) FX.play("intercept");
            if (AUDIO) AUDIO.play("intercept");
            if (this.graveState.integrity <= 0) {
                this.collapseGrave("integrity");
            }
            return;
        }

        var finalDamage = Math.max(1, damage);
        var isCoffin = !!(this.coffinState && this.coffinState.active);
        // FIX: Graveframe is supposed to be tanky — reduce breach damage further
        if (isCoffin) {
            // Black glass reduces to 15% in Coffin, per power fantasy
            finalDamage = Math.max(1, Math.ceil(finalDamage * 0.35));
        }

        var luckChance = (this.battlePhase === 'alone' && !this.somnusManifested) ? 0.02 : 0.14;
        if (isCoffin) luckChance = 0.22; // more EX LUCK in Graveframe
        if (this.player.hp > finalDamage && Math.random() < luckChance) {
            var grazeMult = isCoffin ? 0.15 : 0.25;
            finalDamage = Math.ceil(finalDamage * grazeMult);
            this.addLog("EX LUCK! The attack misses his skull by inches. " + this.familiarLabel() + " catches the spray. Graze! -" + finalDamage + " HP.");
            if (AUDIO) AUDIO.play('luck');
            if (FX) FX.play('luck');
        } else {
            this.addLog((enemy ? enemy.name : "Enemy") + (isCoffin ? " slams black glass. " : " hits through Somnus. ") + "-" + finalDamage + " HP.");
            if (FX) FX.play("enemy-hit");
            if (AUDIO) AUDIO.play("enemy-hit");
        }

        this.player.hp = Math.max(0, this.player.hp - finalDamage);
        // FIX: Coffin doesn't gain +2 debt per hit (already at 100) — avoid drift spiral
        if (!isCoffin) {
            this.player.debt = Math.min(100, this.player.debt + 2);
            this.checkThreshold();
        }

        if (isCoffin) {
            // Control loss only on big hits (>=8) not every chip
            if (damage >= 8) {
                this.coffinState.control = Math.max(0, this.coffinState.control - 1);
                this.addLog("Impact on black glass! CONTROL " + this.coffinState.control + "/3.");
            } else {
                this.addLog("Black glass holds. CONTROL " + this.coffinState.control + "/3.");
            }
        }

        if (this.player.debt >= 80 && !isCoffin) {
            this.autonomyDrift = Math.min(3, (this.autonomyDrift || 0) + 1);
            var fixationTarget = (this.selectedEnemy && !this.selectedEnemy.dead) ? this.selectedEnemy.name : 'the current threat';
            if (this.autonomyDrift === 1) this.addLog('SOMNUS FIXATION 1/3: one memory-eye stops following Sosa and stays on ' + fixationTarget + '.');
            else if (this.autonomyDrift === 2) this.addLog('SOMNUS FIXATION 2/3: every blade pre-angles toward ' + fixationTarget + '. Web the field now to broaden priority.');
            else this.addLog('SOMNUS FIXATION 3/3: target choice is transferring.');
        }

        if (FX && !this.settings.disableShake) FX.shake(this.somnusManifested ? (isCoffin? 3 : 5) : 9);
        this._playerHurtFlash = true;

        var self = this;
        this.hurtFlashTimer = setTimeout(function() {
            self.hurtFlashTimer = null;
            self._playerHurtFlash = false;
            if (self.screen === "battle") {
                render();
            }
        }, 220);
    },

    resolveDebtPressure: function() {
        // Debt is tempting power and control risk, not a poison meter.
        // Guard, Shrine output, reactive timing, Autonomy Drift, and Threshold carry the tradeoff.
        return true;
    },

    triggerSomnusAwaken: function(killRime) {
        this.somnusManifested = true;
        this.rawSomnus = true;
        this.battlePhase = 'normal';
        this._showManifestationBurst = true;
        this.player.hp = Math.max(this.player.hp, 15);

        this.addLog("THE SHADOW ANSWERS. Liquid obsidian surges over Sosa's shoulders!");
        this.addLog("A single horizontal violet furnace slit opens in the tar.");

        if (FX) FX.play('threshold');
        if (AUDIO) AUDIO.play('threshold');

        if (killRime && this.enemies && this.enemies.length > 0) {
            var rime = this.enemies[0];
            if (rime && !rime.dead) {
                this.addLog("The shadow lashes out without asking permission. " + rime.name + " is unmade.");
                this.damageEnemy(rime, 999, true);
            }
        }

        this.turnLock = false;
        render();
        if (this.checkBattleEnd()) {
            render();
        }
    },

    resolveSosaAtZeroHP: function() {
        if (
            (this.battlePhase === "alone" || this.currentEncounterKey === "tutorial_1") &&
            !this.somnusManifested
        ) {
            this.battleContinuationUsed = true;
            this.player.hp = 1;
            this.triggerSomnusAwaken(true);
            return false;
        }

        // FIX: Graveframe should NOT be a lose screen — it IS the emergency survival mode
        if (this.coffinState && this.coffinState.active) {
            // Retaliate massively, restore 25% HP, keep fighting
            this.player.hp = Math.max(1, Math.floor(this.player.maxHp * 0.25));
            this.coffinState.control = Math.max(0, this.coffinState.control - 1);
            this.coffinState.collateral += 1;
            this.addLog("GRAVEFRAME OVERRIDE: Somnus refuses the death. HP restored to " + this.player.hp + ". CONTROL " + this.coffinState.control + "/3.");
            if (this.selectedEnemy && !this.selectedEnemy.dead) {
                var retaliation = 60 + Math.floor(Math.random()*20);
                this.damageEnemy(this.selectedEnemy, retaliation, true);
                this.addLog("Uncontrolled eruption rips " + this.selectedEnemy.name + " for " + retaliation + " damage.");
            }
            if (FX) FX.play("threshold");
            if (AUDIO) AUDIO.play("threshold");
            render();
            return true;
        }

        if (!this.battleContinuationUsed && this.player.unlocked.battleContinuation) {
            this.battleContinuationUsed = true;
            this.player.hp = 1;
            this.player.debt = Math.min(100, this.player.debt + 25);
            this.addLog("BATTLE CONTINUATION.");
            this.addLog("(I don't get to die here. Not in a ditch. Not today.)");
            if (FX) FX.play("battle-continuation");
            if (AUDIO) AUDIO.play("battle-continuation");
            return true;
        }

        this.player.hp = 0;
        this.screen = "lose";
        if (AUDIO) AUDIO.play("lose");
        if (FX) FX.play("threshold");
        render();
        return false;
    },

    enemyTurn: function() {
        try {
            if (this.screen !== "battle" || this.battleResolved) {
                this.turnLock = false;
                return;
            }

            if (this.graveState && this.graveState.active) {
                for (var gi = 0; gi < this.enemies.length; gi++) {
                    var ge = this.enemies[gi];
                    if (!ge.dead && !ge.disabled && !ge.isAnchor) {
                        var dealtGrave = this.damageEnemy(ge, 12, true);
                        this.addLog("The Grave slashes " + ge.name + " (" + dealtGrave + " dmg).");
                    }
                }
            } else {
                this.shrineTick();
                if (this.coffinState && this.coffinState.active && !this.checkBattleEnd()) {
                    this.shrineTick();
                }
            }
            if (this.checkBattleEnd()) {
                this.turnLock = false;
                render();
                return;
            }

            this.tickHellstepState();

            this.resolveDebtPressure();
            this.beginEnemyPhase();
        } catch (error) {
            console.error("Enemy phase error:", error);
            this.turnLock = false;
            render();
        }
    },

    grantBattleReward: function() {
        var reward = DATA.battleRewards && DATA.battleRewards[this.currentEncounterKey];
        if (!reward) { this.lastBattleReward = null; return; }
        if (!this.worldFlags) this.worldFlags = {};
        if (!this.worldFlags.rewardedEncounters) this.worldFlags.rewardedEncounters = {};
        var firstClear = !this.worldFlags.rewardedEncounters[this.currentEncounterKey];
        var gained = firstClear ? Math.max(0,reward.exp||0) : 0;
        if (firstClear) this.worldFlags.rewardedEncounters[this.currentEncounterKey] = true;
        this.player.fieldExp = Math.max(0,(this.player.fieldExp||0)+gained);
        this.player.fieldLevel = 1 + Math.floor(this.player.fieldExp/5);
        this.lastBattleReward = {exp:gained,found:reward.found||'',lesson:reward.lesson||'',level:this.player.fieldLevel,total:this.player.fieldExp};
    },

    onBattleWin: function() {
        this.battleResolved = true;
        this.turnLock = true;
        clearTimeout(this.battleCutInTimer);
        this.battleCutIn = null;
        this.encountersCleared = (this.encountersCleared || 0) + 1;
        this.grantBattleReward();

        this.applyPatchJob('victory');

        if (this.coffinState && this.coffinState.active) {
            if (this.currentEncounterKey === 'act5_hound_battle') {
                if (!this.worldFlags) this.worldFlags = {};
                this.worldFlags.act5Coffin = {
                    collateral: this.coffinState.collateral || 0,
                    control: this.coffinState.control || 0,
                    anchorUses: this.coffinState.anchorUses || 0,
                    steerUses: this.coffinState.steerUses || 0,
                    letHimUses: this.coffinState.letHimUses || 0
                };
            }
            this.player.coffinPilot = false;
            this.coffinState.active = false;
            this.addLog("The black glass withdraws. His body is his again.");
        }

        if (this.graveState) {
            if (!this.worldFlags) this.worldFlags = {};
            this.worldFlags.graveAftermath =
                (this.worldFlags.graveAftermath || 0) +
                this.graveState.aftermath;
            this.graveState.active = false;
            this.player.realityMarble = false;
        }

        this.addLog('VICTORY. Area cleared.');
        
        // Post-battle Sosa reaction
        var reactions = [
            "Too close.",
            "That one almost had me.",
            "Somnus is getting louder.",
            "I need to get better at this.",
            "They keep coming."
        ];
        if (Math.random() < 0.4) {
            this.addLog(reactions[Math.floor(Math.random() * reactions.length)]);
        }
        if (AUDIO) AUDIO.play('win');
        if (FX) FX.play('true');

        this.saveGame();

        var self = this;
        this.victoryTimer = setTimeout(function() {
            self.victoryTimer = null;
            self.screen = 'win';
            render();
        }, 1300);
    },

    retryBattle: function() {
        if (!this.currentEncounterKey) {
            this.screen = 'title';
            render();
            return;
        }

        this.player.hp = Math.floor(this.player.maxHp * 0.6);
        this.battleContinuationUsed = false;
        this.startBattle(this.currentEncounterKey);
    },

    addSeverHit: function(enemy) {
        if (!enemy) return;
        enemy.severHits = (enemy.severHits || 0) + 1;
        this.addLog(enemy.name + " severed read: " + enemy.severHits + "/2.");
    }
});
