/* =========================================================
   SOSA: THE GRAVE THAT WOULDN'T TAKE ME
   game-states.js — Hellstep, Shattering, Stín Support, Graveframe & Grave
   ========================================================= */

Object.assign(GAME, {
    /* =========================
       HELLSTEP & SHATTERING
       ========================= */
    playerHellstep: function() {
        if (!this.player.unlocked.hellstep) return;
        if (this.hellstepActive) {
            this.addLog('Hellstep already running.');
            if (AUDIO) AUDIO.play('error');
            return;
        }
        if (this.hellstepCooldown > 0) {
            this.addLog('Nervous system fried — ' + this.hellstepCooldown + ' turns until recast.');
            if (AUDIO) AUDIO.play('error');
            return;
        }

        this.announceAction('HELLSTEP', 'NERVE LOAN ACTIVE');
        if (this.breakBlackFlashStreak) this.breakBlackFlashStreak('HELLSTEP CHANGES THE RHYTHM');
        this.player.debt = Math.min(100, this.player.debt + 12);
        this.checkThreshold();
        this.hellstepActive = true;
        this.hellstepActionsLeft = 2;
        this.hellstepCooldown = 0;

        this.addLog('HELLSTEP. World narrows to a single white line.');
        if (FX) FX.play('hellstep');
        if (AUDIO) AUDIO.play('hellstep');
        if (AUDIO && AUDIO.setMusic) AUDIO.setMusic('battle_boss', true);

        this.endPlayerTurn();
    },

    tickHellstepState: function() {
        if (this.hellstepJustEnded) {
            this.hellstepJustEnded = false;
            return;
        }
        if (!this.hellstepActive && this.hellstepCooldown > 0) {
            this.hellstepCooldown--;
        }
    },

    consumeHellstepAction: function() {
        if (!this.hellstepActive) return;

        this.hellstepActionsLeft--;

        if (this.hellstepActionsLeft > 0) return;

        this.hellstepActive = false;
        this.hellstepCooldown = 3;
        this.hellstepJustEnded = true;

        this.addLog("Hellstep burns out. Nervous system fried — 3-turn cooldown.");
        if (FX) FX.play("hellstep-end");
    },

    tryOpenShattering: function() {
        var chance = this.hellstepActive ? 0.22 : 0.08;

        if (Math.random() >= chance) {
            return false;
        }

        this.shatteringPrompt = true;
        this.pendingTurnEnd = true;

        render();

        var self = this;
        clearTimeout(this.shatteringTimer);

        // Extended time window if reduced motion setting enabled
        var promptTime = (this.settings && this.settings.reducedMotion) ? 1400 : 700;

        this.shatteringTimer = setTimeout(function() {
            if (!self.shatteringPrompt) return;

            self.shatteringPrompt = false;
            self.pendingTurnEnd = false;

            self.addLog("The opening closes before it can ring.");
            self.consumeHellstepAction();
            render();
            self.endPlayerTurn();
        }, promptTime);

        return true;
    },

    resolveShattering: function() {
        if (!this.shatteringPrompt) return;

        clearTimeout(this.shatteringTimer);

        this.shatteringPrompt = false;
        this.pendingTurnEnd = false;

        var target = this.selectedEnemy;

        if (target && !target.dead) {
            var bonusDamage = Math.floor(
                18 + (this.player.debt * 0.25)
            );

            this.damageEnemy(target, bonusDamage, true);

            this.player.debt = Math.max(0, this.player.debt - 10);

            this.addLog("SHATTERING. Space rings like struck glass. Debt -10.");

            if (FX) FX.play("shattering");
            if (AUDIO) AUDIO.play("shattering");
        }

        this.consumeHellstepAction();
        render();
        this.endPlayerTurn();
    },

    /* =========================
       STÍN EMERGENCY CALLS
       ========================= */
    canEmergencyCall: function() {
        var s = this.supportState;

        return !!(
            this.player.unlocked.stin &&
            s.signal === "open" &&
            s.responder &&
            !s.callUsed &&
            !s.callPending
        );
    },

    beginEmergencyCall: function() {
        if (!this.canEmergencyCall() || this.turnLock) return;

        var s = this.supportState;

        if (this.breakBlackFlashStreak) this.breakBlackFlashStreak('THE CALL BREAKS THE COMBINATION');
        s.callUsed = true;
        s.callPending = true;

        this.addLog("Calling " + s.responder + "...");
        this.addLog("No promise they can answer. No promise it is really them.");

        if (FX) FX.play("stin-scan");
        if (AUDIO) AUDIO.play("stin");

        this.endPlayerTurn();
    },

    tickEmergencyCall: function() {
        var s = this.supportState;

        if (!s.callPending) return;

        s.delay--;

        if (s.delay > 0) {
            this.addLog("The call keeps ringing.");
            return;
        }

        s.callPending = false;
        this.resolveEmergencyCall();
    },

    resolveEmergencyCall: function() {
        var s = this.supportState;
        s.answered = true;

        if (s.answerText) {
            this.addLog((s.answerSpeaker || s.responder || "RESPONDER") + ': “' + s.answerText + '”');
            if (!this.worldFlags) this.worldFlags = {};
            this.worldFlags.archonAnswerSpeaker = s.answerSpeaker || s.responder;
            if (this.showBattleCutIn) this.showBattleCutIn('ally', {speaker:s.answerSpeaker || s.responder, text:s.answerText}, null, false);
        }

        if (s.response === "comfort") {
            this.player.debt = Math.max(0, this.player.debt - 35);
            this.addLog(s.responder + " stays on the line. The pressure loosens. Debt -35.");
        }

        if (s.response === "practical") {
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + 10);
            this.addLog(s.responder + " gives Sosa something usable. HP +10.");
        }

        if (s.response === "truth") {
            this.autonomyDrift = 0;
            this.targetLockedBySomnus = false;
            this.addLog(s.responder + ": “No. Do not let it decide for you.”");
        }

        if (s.response === "conflict") {
            this.player.debt = Math.min(100, this.player.debt + 8);
            this.addLog(s.responder + " answers. That does not make this safe. Debt +8.");
        }

        if (s.response === "false") {
            this.playerStatuses.static = 1;
            this.addLog("The voice knows his name. It does not know him.");
            if (FX) FX.play("stin-fail");
            if (AUDIO) AUDIO.play("stin-fail");
        }

        this.checkThreshold();
        render();
    },

    playerStin: function() {
        if (!this.player.unlocked.stin || this.turnLock) return;

        if (this.supportState && this.supportState.signal === "jammed") {
            this.addLog("System Call: Stín Network...");
            this.addLog("Dead air. No signal. The server does not answer.");
            if (FX) FX.play("stin-fail");
            if (AUDIO) AUDIO.play("stin-fail");
            this.playerStatuses.static = 1;
            this.endPlayerTurn();
            return;
        }

        if (this.canEmergencyCall()) {
            this.beginEmergencyCall();
        } else {
            this.addLog("Stín channel uncalibrated.");
        }
    },

    /* =========================
       GRAVEFRAME (THRESHOLD STATE)
       ========================= */
    enterCoffinPilot: function() {
        if (this.coffinState && this.coffinState.active) return;

        this.coffinState = {
            active: true,
            control: 2,
            collateral: (this.coffinState ? this.coffinState.collateral || 0 : 0)
        };
        this.player.coffinPilot = true;
        this.thresholdReached = true;

        this.player.poise = 6;

        this.addLog("GRAVEFRAME. Somnus has taken the wheel.");

        if (FX) FX.play("threshold");
        if (AUDIO) AUDIO.play("threshold");
        render();
    },

    checkDebtMilestones: function() {
        if (!this.player || this.screen !== 'battle') return;
        if (!this.debtMilestones) this.debtMilestones = {};
        var debt = this.player.debt || 0;
        var entry = null;
        if (debt >= 85 && !this.debtMilestones.overload) {
            this.debtMilestones.overload = true;
            entry = { speaker: 'Sosa', text: "He's moving before I finish thinking. Cool. Horrifying. Mostly cool." };
            this.addLog("DEBT OVERLOAD. Somnus is choosing ahead of Sosa.");
        } else if (debt >= 67 && !this.debtMilestones.carried) {
            this.debtMilestones.carried = true;
            entry = { speaker: 'Sosa', text: "Oh. That's why this feels good. That's probably a bad sign." };
            this.addLog("DEBT CARRIED. Shrine output rises; control begins to narrow.");
        } else if (debt >= 34 && !this.debtMilestones.balanced) {
            this.debtMilestones.balanced = true;
            entry = { speaker: 'Sosa', text: "Somnus feels heavier. Not tired—closer." };
            this.addLog("DEBT BALANCED. More weight, more Guard, stronger cuts.");
        }
        if (entry && this.showBattleCutIn) this.showBattleCutIn('sosa', entry, 'sosa');
    },

    checkThreshold: function() {
        this.checkDebtMilestones();
        // FIX per user request: Graveframe/Graveframe should NOT be unlockable in Act1
        // Use Battle Continuation (1HP + full guard) instead of Coffin if not unlocked yet
        var earlyBlock = { 'tutorial_1':1, 'tutorial_2':1, 'act1_battle1':1, 'act1_battle2':1, 'act2_battle1':1 };
        var isEarlyBlocked = !!(this.currentEncounterKey && earlyBlock[this.currentEncounterKey]);
        var graveframeUnlocked = !!(this.player && this.player.unlocked && this.player.unlocked.graveframe); 

        if (this.player.debt >= 100 && !this.thresholdReached) {
            if (isEarlyBlocked || !graveframeUnlocked) {
                // Early game: Instead of Coffin, trigger Battle Continuation guard regen
                if (!this.battleContinuationUsed) {
                    this.battleContinuationUsed = true;
                    this.player.hp = Math.max(1, Math.floor(this.player.maxHp * 0.4));
                    this.player.poise = this.getPoiseCapacity();
                    this.player.debt = 85; // vent 15, stay high but not Threshold
                    this.addLog("BATTLE CONTINUATION. Guard restored. Debt 85%. " + this.familiarLabel() + " refuses the ending.");
                    if (FX) FX.play("battle-continuation");
                    if (AUDIO) AUDIO.play("battle-continuation");
                    render();
                    return;
                } else {
                    // Second threshold in early acts — still no Coffin, just vent a bit
                    this.player.debt = 75;
                    this.addLog(this.familiarLabel() + " holds the line at 75%. Graveframe not yet unlocked.");
                    return;
                }
            }
            this.thresholdReached = true;
            this.enterCoffinPilot();
        }
    },

    coffinAnchor: function() {
        if (!this.coffinState || !this.coffinState.active || this.turnLock) return;

        this.coffinState.control = Math.min(3, this.coffinState.control + 1);

        var anchors = [
            "the Shy Guy mask",
            "his green backpack",
            "the WF-C510 earbuds warm in his ears",
            "the missing TV back in Syracuse",
            "hunger gnawing his ribs",
            "the Stewart's 99-cent coffee",
            "“I am still in Utica.”"
        ];
        var chosen = anchors[Math.floor(Math.random() * anchors.length)];

        this.addLog("Sosa finds one ordinary thing — " + chosen + " — and holds onto it. CONTROL " + this.coffinState.control + "/3.");

        if (FX) FX.play("stin");
        if (AUDIO) AUDIO.play("click");
        this.endPlayerTurn();
    },

    coffinSteer: function() {
        if (!this.coffinState || !this.coffinState.active || this.turnLock) return;
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.checkAutoSelect();
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.addLog("No target designated to steer towards.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        this.selectedEnemy.traced = true;
        this.shrineTargetTicks = 2;
        this.coffinState.steerUses = (this.coffinState.steerUses || 0) + 1;
        var steeredDamage = this.damageEnemy(this.selectedEnemy, 20, true);
        this.addLog("Sosa forces Somnus to preserve target priority: " + this.selectedEnemy.name + ". Focused cut: " + steeredDamage + " damage.");

        if (FX) FX.play("stin-scan");
        if (AUDIO) AUDIO.play("click");
        this.endPlayerTurn();
    },

    coffinLetHim: function() {
        if (!this.coffinState || !this.coffinState.active || this.turnLock) return;
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.checkAutoSelect();
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.addLog("No target designated.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        this.coffinState.collateral++;
        this.coffinState.control = Math.max(0, this.coffinState.control - 1);

        var target = this.selectedEnemy;
        var dealt = this.damageEnemy(target, 50, true);

        this.addLog("Somnus answers for him. Something nearby pays for it. " + dealt + " damage.");

        if (target.isHuman || target.isAnchor || target.originalKey === 'transit_security' || target.originalKey === 'street_predator' || target.originalKey === 'censor_scout') {
            this.coffinState.aftermathFlag = true;
            this.addLog("COLLATERAL RECORDED. Structural / civilian integrity compromised.");
        }

        if (FX) FX.play("furnace");
        if (AUDIO) AUDIO.play("sever");

        this.endPlayerTurn();
    },

    resolveCoffinLoss: function() {
        this.addLog("SOMNUS OVERRIDE. Sosa is no longer steering.");

        this.coffinState.control = 1;
        this.coffinState.collateral += 2;

        if (this.selectedEnemy && !this.selectedEnemy.dead) {
            var dealt = this.damageEnemy(this.selectedEnemy, 70, true);
            this.addLog("Uncontrolled eruption rips " + this.selectedEnemy.name + " for " + dealt + " damage.");
        }

        if (FX) FX.play("threshold");
        if (AUDIO) AUDIO.play("threshold");

        render();
    },

    /* =========================
       GRAVE (REALITY MARBLE)
       ========================= */
    activateGrave: function() {
        var enc = DATA.realityMarbleEncounters && DATA.realityMarbleEncounters[this.currentEncounterKey];
        if (!enc || !enc.enabled) {
            this.addLog("The Grave rejects the local rules.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        this.graveState = {
            active: true,
            turnsLeft: 3,
            integrity: 3,
            aftermath: 0
        };

        this.player.realityMarble = true;
        this.player.coffinPilot = false;
        if (this.coffinState) this.coffinState.active = false;

        for (var i = 0; i < this.enemies.length; i++) {
            if (!this.enemies[i].dead && !this.enemies[i].disabled) {
                this.enemies[i].traced = true;
            }
        }

        this.addLog("THE GRAVE THAT WOULDN'T TAKE ME.");

        if (FX) FX.play("threshold");
        if (AUDIO) AUDIO.play("threshold");
        render();
    },

    graveSever: function() {
        if (!this.graveState || !this.graveState.active || this.turnLock) return;
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.checkAutoSelect();
        }
        if (!this.selectedEnemy || this.selectedEnemy.dead || this.selectedEnemy.disabled) {
            this.addLog("No target designated.");
            if (AUDIO) AUDIO.play("error");
            return;
        }

        this.graveState.aftermath++;
        var target = this.selectedEnemy;
        var dealt = this.damageEnemy(target, 75, true);

        this.addLog("THE GRAVE SEVERS " + target.name + ". " + dealt + " damage. Aftermath +1.");
        if (FX) FX.play("true");
        if (AUDIO) AUDIO.play("sever");

        this.endPlayerTurn();
    },

    graveRefuse: function() {
        if (!this.graveState || !this.graveState.active || this.turnLock) return;

        this.graveRefuseActive = true;
        this.addLog("REJECT: The Grave denies external authority. Incoming field effects shielded.");

        if (FX) FX.play("intercept");
        if (AUDIO) AUDIO.play("click");

        this.endPlayerTurn();
    },

    graveRelease: function() {
        if (!this.graveState || !this.graveState.active || this.turnLock) return;

        this.graveState.active = false;
        this.player.realityMarble = false;
        this.graveState.aftermath = Math.max(0, this.graveState.aftermath - 1);

        this.addLog("RELEASE. Sosa releases the Grave line before it collapses the field.");
        if (FX) FX.play("hellstep-end");
        if (AUDIO) AUDIO.play("click");

        render();
    },

    collapseGrave: function(reason) {
        this.graveState.active = false;
        this.player.realityMarble = false;

        if (reason === "integrity") {
            this.player.hp = 1;
            this.graveState.aftermath += 2;
            this.addLog("GRAVE INTEGRITY COLLAPSED. The boundary fractures!");
            this.enterCoffinPilot();
        } else {
            this.player.severTrueLocked = true;
            this.addLog("GRAVE EXHAUSTION. The reality marble fades. Sosa is exhausted.");
        }

        if (!this.worldFlags) this.worldFlags = {};
        this.worldFlags.graveAftermath =
            (this.worldFlags.graveAftermath || 0) +
            this.graveState.aftermath;

        if (FX) FX.play("threshold");
        if (AUDIO) AUDIO.play("threshold");
        render();
    }
});
