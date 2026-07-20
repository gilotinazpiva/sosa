/* =========================================================
   SOSA: THE GRAVE THAT WOULDN'T TAKE ME
   game-enemies.js — Enemy Intents, Move Pools & Phase Resolution
   ========================================================= */

Object.assign(GAME, {
    chooseEnemyMove: function(enemy) {
        if (!enemy) return { id: "basic_attack", label: "ATTACK", type: "single", damage: 14, guardImpact: 1, hits: 1, poiseRule: "full", effect: "none" };

        var hpRatio = enemy.maxHp > 0 ? (enemy.hp / enemy.maxHp) : 1;
        var movePool = null;

        if (hpRatio <= 0.5 && enemy.phase2Moves && enemy.phase2Moves.length > 0) {
            movePool = enemy.phase2Moves;
        } else if (enemy.phase1Moves && enemy.phase1Moves.length > 0) {
            movePool = enemy.phase1Moves;
        } else if (enemy.moves && enemy.moves.length > 0) {
            movePool = enemy.moves;
        }

        if (movePool && movePool.length > 0) {
            return movePool[Math.floor(Math.random() * movePool.length)];
        }

        return {
            id: "basic_attack",
            label: "ATTACK",
            type: "single",
            damage: (enemy && enemy.atk) ? enemy.atk : 14,
            guardImpact: 1,
            hits: 1,
            poiseRule: "full",
            effect: "none"
        };
    },

    enemyMoveEffectHandlers: {
        coldHold: function() {
            this.playerStatuses.coldHold = 1;
            this.addLog("COLD HOLD. " + this.familiarLabel() + " has less room to intercept next phase.");
        },
        static: function() {
            this.playerStatuses.static = 1;
            this.addLog("VEIL NOISE. The earbuds ring. Trace output is unstable.");
        },
        ringDebt: function() {
            if (this.coffinState && this.coffinState.active) {
                this.coffinState.control = Math.max(0, this.coffinState.control - 1);
                this.addLog("TETHER BREAK reaches the pilot channel. CONTROL -1.");
                return;
            }
            var amount = this.currentEncounterKey === "dross_chime" ? 3 : 5;
            this.applyEnemyDebtEffect(amount, "CALL BACK. The ringing gets inside the channel. Debt +" + amount + ".");
        },
        overtime: function() {
            var amount = this.currentEncounterKey === "dross_slag" ? 3 : 4;
            this.applyEnemyDebtEffect(amount, "SHIFT EXTENSION. The field demands another hour. Debt +" + amount + ".");
        },
        witnessLog: function() {
            this.applyEnemyDebtEffect(4, "WITNESS LOG. The field records harm instead of stopping it. Debt +4.");
        },
        noActionRequired: function() {
            this.playerStatuses.static = 1;
            this.addLog("NO ACTION REQUIRED. Trace destabilized by the closed report.");
        },
        condemnedRoute: function() {
            this.routeComplianceActive = true;
            this.addLog("CONDEMNED ROUTE. Changing targets costs +3 Debt next turn.");
        },
        reportClosed: function() {
            this.applyEnemyDebtEffect(5, "REPORT CLOSED. The ruin tries to finalize Sosa as unresolved evidence. Debt +5.");
        },
        lateFee: function() {
            this.applyEnemyDebtEffect(4, "LATE FEE. Debt +4.");
        },
        scanLock: function() {
            this.playerStatuses.static = 1;
            this.applyEnemyDebtEffect(3, "SCAN LOCK. Revealed Sosa. Veil Noise applied. Debt +3.");
        },
        tetherPin: function() {
            this.playerStatuses.coldHold = Math.max(this.playerStatuses.coldHold || 0, 2);
            this.addLog("TETHER PIN. Next phase Guard capacity reduced.");
        },
        routeCompliance: function() {
            this.routeComplianceActive = true;
            this.addLog("ROUTE COMPLIANCE. Target switching costs +3 Debt next turn.");
        },
        detain: function() {
            this.targetLockedBySomnus = true;
            this.addLog("DETAIN. Somnus target-lock imposed.");
        },
        pursuitMark: function() {
            this.player.debt = Math.min(100, this.player.debt + 4);
            this.checkThreshold();
            this.targetSwitchDisabled = true;
            this.addLog("PURSUIT MARK. Debt +4. Target switching disabled for 1 turn.");
        },
        adminErasure: function() {
            this.playerStatuses.static = 1;
            this.addLog("ADMINISTRATIVE ERASURE. Veil Noise applied. Shrine fails next round unless Hellstep active.");
        }
    },

    applyEnemyDebtEffect: function(amount, message) {
        this.player.debt = Math.min(100, this.player.debt + amount);
        this.checkThreshold();
        this.addLog(message);
    },

    applyEnemyMoveEffect: function(effect) {
        if (!effect || effect === "none") return false;
        var handler = this.enemyMoveEffectHandlers[effect];
        if (typeof handler !== "function") return false;
        handler.call(this);
        return true;
    },

    refreshEnemyIntent: function(enemy) {
        if (!enemy || enemy.dead || enemy.disabled) return;
        enemy.disrupted = 0;
        enemy.nextMove = this.chooseEnemyMove(enemy);
    },

    beginEnemyPhase: function() {
        var living = [];
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            if (!enemy.dead && !enemy.disabled) {
                living.push(enemy);
            }
        }

        if (living.length === 0) {
            this.turnLock = false;
            this.checkBattleEnd();
            render();
            return;
        }

        this.enemyPhaseActive = true;
        this.enemyPhaseEnemies = living;
        this.enemyPhaseIndex = 0;
        this.enemyPhaseSerial = (this.enemyPhaseSerial || 0) + 1;
        var phaseSerial = this.enemyPhaseSerial;
        clearTimeout(this.enemyPhaseWatchdogTimer);

        this.player.poise = this.getPoiseCapacity();
        this.player.armorShell = 1;

        if (this.playerStatuses && this.playerStatuses.coldHold > 0) {
            this.playerStatuses.coldHold--;
        }

        this.addLog(this.familiarLabel() + " gathers between you and the field. Guard " + this.player.poise + ".");
        render();

        var self = this;
        this.enemyPhaseTimer = setTimeout(function() {
            self.enemyPhaseTimer = null;
            self.resolveNextEnemyIntent();
        }, 520);
        this.enemyPhaseWatchdogTimer = setTimeout(function() {
            self.enemyPhaseWatchdogTimer = null;
            if (self.enemyPhaseActive && self.enemyPhaseSerial === phaseSerial && self.screen === 'battle' && !self.battleResolved) {
                self.addLog('VEIL RECOVERY. Enemy sequence exceeded its window; control returns to Sosa.');
                try { self.finishEnemyPhase(); }
                catch (error) {
                    console.error('Enemy phase recovery failed:', error);
                    self.enemyPhaseActive = false; self.enemyPhaseEnemies = []; self.enemyPhaseIndex = 0; self.turnLock = false; render();
                }
            }
        }, 6500);
    },

    resolveNextEnemyIntent: function() {
        if (!this.enemyPhaseActive) return;
        if (
            this.screen !== "battle" ||
            this.battleResolved ||
            this.player.hp <= 0
        ) {
            this.finishEnemyPhase();
            return;
        }

        if (this.enemyPhaseIndex >= this.enemyPhaseEnemies.length) {
            this.finishEnemyPhase();
            return;
        }

        var enemy = this.enemyPhaseEnemies[this.enemyPhaseIndex];
        this.enemyPhaseIndex++;

        if (!enemy || enemy.dead || enemy.disabled || enemy.isAnchor) {
            this.resolveNextEnemyIntent();
            return;
        }

        try {
            this.resolveEnemyIntent(enemy);
        } catch (error) {
            console.error('Enemy intent failed:', enemy && enemy.name, error);
            this.addLog('VEIL ERROR. ' + (enemy && enemy.name ? enemy.name : 'Enemy') + ' loses the failed intent; sequence continues.');
        }

        var self = this;
        this.enemyAdvanceTimer = setTimeout(function() {
            self.enemyAdvanceTimer = null;
            self.resolveNextEnemyIntent();
        }, 650);
    },

    finishEnemyPhase: function() {
        clearTimeout(this.enemyPhaseWatchdogTimer); this.enemyPhaseWatchdogTimer = null;
        clearTimeout(this.enemyPhaseTimer); this.enemyPhaseTimer = null;
        clearTimeout(this.enemyAdvanceTimer); this.enemyAdvanceTimer = null;
        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            if (!enemy.dead && !enemy.disabled) {
                this.refreshEnemyIntent(enemy);
            }
        }
        this.resolveAutonomyDrift();
        if (this.webCooldown > 0) this.webCooldown--;
        if (this.cleaveCooldown > 0) this.cleaveCooldown--;
        for (var wi = 0; wi < this.enemies.length; wi++) if (this.enemies[wi].webbedTurns > 0) this.enemies[wi].webbedTurns--;
        if (this.battleCutInCooldown > 0) this.battleCutInCooldown--;
        for (var ci = 0; ci < this.enemies.length; ci++) this.enemies[ci]._midLine = false;
        if (this.blackFlashZoneTurns > 0) {
            this.blackFlashZoneTurns--;
            if (this.blackFlashZoneTurns === 0) {
                this.blackFlashStreak = 0;
                this.addLog("The Zone fades. Black Flash chance returns to baseline.");
            }
        }
        if (this.coffinState && this.coffinState.active && this.coffinState.control <= 0) {
            this.resolveCoffinLoss();
        }
        if (this.graveState && this.graveState.active) {
            this.graveState.turnsLeft--;
            this.addLog("Grave boundary stability: " + this.graveState.turnsLeft + " turns remaining.");
            if (this.graveState.turnsLeft <= 0) {
                this.collapseGrave("time");
            }
        }
        if (this.currentEncounterKey === 'kessler_rescue_swarm' && !this.battleResolved) {
            var crossfeedKeys = {rime:false,spall:false,chime:false};
            var crossfeedBodies = [];
            var crossfeedWebbed = false;
            for (var mx = 0; mx < this.enemies.length; mx++) {
                var mixedBody = this.enemies[mx];
                if (!mixedBody.dead && !mixedBody.disabled && crossfeedKeys[mixedBody.originalKey] !== undefined) {
                    crossfeedKeys[mixedBody.originalKey] = true;
                    crossfeedBodies.push(mixedBody);
                    if (mixedBody.webbedTurns > 0) crossfeedWebbed = true;
                }
            }
            var fullCrossfeed = crossfeedKeys.rime && crossfeedKeys.spall && crossfeedKeys.chime;
            if (this.mixedCrossfeedInterrupted || crossfeedWebbed) {
                this.mixedCrossfeedClock = 0;
                if (this.mixedCrossfeedInterrupted) this.addLog('CROSSFEED MISSED. Web keeps cold, impact, and wire from completing the loop.');
                this.mixedCrossfeedInterrupted = false;
            } else if (fullCrossfeed) {
                this.mixedCrossfeedClock = (this.mixedCrossfeedClock || 0) + 1;
                this.addLog('MIXED CROSSFEED ' + this.mixedCrossfeedClock + '/2. Web the three bodies before the loop closes.');
                if (this.mixedCrossfeedClock >= 2) {
                    this.mixedCrossfeedClock = 0;
                    this.player.debt = Math.min(100, this.player.debt + 5);
                    for (var mh = 0; mh < crossfeedBodies.length; mh++) crossfeedBodies[mh].hp = Math.min(crossfeedBodies[mh].maxHp, crossfeedBodies[mh].hp + 8);
                    if (!this.worldFlags) this.worldFlags = {};
                    this.worldFlags.mixedCrossfeeds = (this.worldFlags.mixedCrossfeeds || 0) + 1;
                    this.addLog('CROSSFEED CLOSED. Cold seals concrete; impact powers wire; stolen attention restores all three. Debt +5.');
                    this.checkThreshold();
                }
            } else {
                this.mixedCrossfeedClock = 0;
            }
        }
        if (this.currentEncounterKey === 'dross_overtime' && !this.battleResolved) {
            if (this.overtimeInterrupted) {
                this.addLog('OVERTIME MISSED A BEAT. The line cannot complete the shift.');
                this.overtimeInterrupted = false;
            } else {
                this.overtimeClock = (this.overtimeClock || 0) + 1;
                this.addLog('OVERTIME CADENCE ' + this.overtimeClock + '/3. Web the line to break routine.');
                if (this.overtimeClock >= 3) {
                    this.overtimeClock = 0;
                    this.player.debt = Math.min(100, this.player.debt + 8);
                    for (var ot = 0; ot < this.enemies.length; ot++) {
                        var shiftBody = this.enemies[ot];
                        if (!shiftBody.dead && !shiftBody.disabled) shiftBody.hp = Math.min(shiftBody.maxHp, shiftBody.hp + 12);
                    }
                    if (!this.worldFlags) this.worldFlags = {};
                    this.worldFlags.overtimeExtensions = (this.worldFlags.overtimeExtensions || 0) + 1;
                    this.addLog('MANDATORY OVERTIME. Debt +8. The shift restores every active body.');
                    if (this.worldFlags.overtimeExtensions === 1) this.spawnBattleWave('overtime_replacement',['slag'],'REPLACEMENT WORKER CLOCKS IN');
                    this.checkThreshold();
                }
            }
        }
        this.graveRefuseActive = false;
        this.targetSwitchDisabled = false;
        this.routeComplianceActive = false;
        this.enemyPhaseActive = false;
        this.enemyPhaseEnemies = [];
        this.enemyPhaseIndex = 0;
        this.tickEmergencyCall();
        this.maybeSomnusGesture();
        this.turnLock = false;
        if (this.furnaceReadyNarrativePending) {
            this.furnaceReadyNarrativePending = false;
            if (!this.worldFlags) this.worldFlags = {};
            this.worldFlags.furnaceExplained = true;
            this.showBattleCutIn('sosa', {speaker:'Sosa', text:'The cuts are not disappearing. Powdered concrete, ice, and pressure are hanging inside the lattice. The aperture is pulling all of it inward. Three layers. Now it can ignite.'}, 'sosa', true);
        }

        if (this.checkBattleEnd()) {
            render();
            return;
        }
        render();
    },

    normalizeEnemyIntent: function(enemy) {
        var move = enemy.nextMove || this.chooseEnemyMove(enemy);
        return {
            enemy: enemy,
            move: move,
            type: move.type || "single",
            damage: move.damage !== undefined ? move.damage : (enemy.atk || 10),
            hits: move.hits || 1,
            disrupted: enemy.disrupted > 0 || enemy.webbedTurns > 0,
            resolved: false,
            reachedPlayer: false
        };
    },

    applyEnemyIntentControl: function(intent) {
        if (this.currentEncounterKey === 'act3_hunt_battle2') {
            var cueFamilies = {rime:false,spall:false,chime:false};
            for (var cf = 0; cf < this.enemies.length; cf++) {
                var cueBody = this.enemies[cf];
                if (!cueBody.dead && !cueBody.disabled && cueFamilies[cueBody.originalKey] !== undefined) cueFamilies[cueBody.originalKey] = true;
            }
            if (cueFamilies.rime && cueFamilies.spall && cueFamilies.chime) {
                intent.crossfed = true;
                if (intent.type === 'barrage') intent.hits += 1;
                else if (intent.damage > 0) intent.damage = Math.ceil(intent.damage * 1.10);
            }
        }
        if (intent.enemy.webbedTurns > 0) {
            intent.damage = Math.max(0, Math.ceil(intent.damage * 0.8));
        }
        if (intent.disrupted && intent.type === "barrage") {
            intent.hits = Math.max(1, intent.hits - 1);
        }
        if (intent.disrupted && intent.type === "single") {
            intent.damage = Math.ceil(intent.damage * 0.75);
        }
        return intent;
    },

    announceEnemyIntent: function(intent) {
        this.addLog(intent.enemy.name + " — " + intent.move.label + (intent.crossfed ? " [CUE TRADE]" : "") + (intent.disrupted ? " [DISRUPTED]" : "") + ".");
        if(FX&&typeof FX.playEnemyIntent==='function')FX.playEnemyIntent(intent.enemy,this.enemies.indexOf(intent.enemy),intent.move);
        this.maybeBattleCutIn("enemy", intent.enemy);
    },

    resolveEnemyIntentGuard: function(intent) {
        var guardState = this.resolveGuardImpact(intent.enemy, intent.move);
        if (guardState === "blocked") {
            if (this.somnusManifested && this.selectedEnemy && !this.selectedEnemy.dead) {
                var riposteDamage = 4 + Math.floor(Math.random() * 3);
                if (this.player.debt >= 67) riposteDamage += 2;
                if (this.coffinState && this.coffinState.active) riposteDamage = Math.floor(riposteDamage * 1.5);
                this.damageEnemy(intent.enemy, riposteDamage, true);
                this.addLog("↳ " + this.familiarLabel() + " ripostes " + intent.enemy.name + " for " + riposteDamage + ".");
                if (FX) FX.play("shrine-hit");
            }
            return { state: guardState, multiplier: 0 };
        }
        var multipliers = { breached_armored: 0.35, breached: 0.55, open: 1.0 };
        return { state: guardState, multiplier: multipliers[guardState] === undefined ? 1.0 : multipliers[guardState] };
    },

    applyResolvedEnemyIntent: function(intent, damage, applyEffect) {
        if (damage > 0) this.applyEnemyIntentDamage(intent.enemy, damage, intent.move);
        if (applyEffect !== false) this.applyEnemyMoveEffect(intent.move.effect);
        intent.reachedPlayer = true;
        if (this.player.hp <= 0 && !this.resolveSosaAtZeroHP()) return false;
        return true;
    },

    resolveEnemyStrikeIntent: function(intent) {
        for (var hit = 0; hit < intent.hits; hit++) {
            if (this.screen !== "battle" || this.battleResolved || this.player.hp <= 0) break;
            var guard = this.resolveEnemyIntentGuard(intent);
            if (guard.state === "blocked") continue;
            if (!this.applyResolvedEnemyIntent(intent, Math.ceil(intent.damage * guard.multiplier), true)) return false;
        }
        return true;
    },

    resolveEnemyAreaIntent: function(intent) {
        var enemy = intent.enemy;
        var move = intent.move;
        var isEarlyDross = enemy.originalKey && { rime: 1, rime_weak: 1, rime_weak_2: 1 }[enemy.originalKey];
        if (move.poiseRule === "partial" && this.player.poise > 0) {
            this.player.poise--;
            this.addLog(this.familiarLabel() + " catches the worst of it. The field still reaches you.");
            this.applyResolvedEnemyIntent(intent, Math.ceil(intent.damage * (isEarlyDross ? 0.15 : 0.35)), true);
            if (FX) FX.play("intercept");
            if (AUDIO) AUDIO.play("intercept");
        } else if (isEarlyDross) {
            this.addLog(this.familiarLabel() + " holds the wall — cold can't find an opening.");
            if (FX) FX.play("intercept");
        } else {
            this.applyResolvedEnemyIntent(intent, intent.damage, true);
        }
    },

    resolveEnemyFieldIntent: function(intent) {
        if (intent.enemy.webbedTurns > 0) {
            this.addLog("WEB grounds " + intent.enemy.name + "'s field intent.");
            if (FX) FX.play("web");
            return;
        }
        this.applyResolvedEnemyIntent(intent, intent.damage, true);
    },

    finalizeEnemyIntent: function(intent) {
        intent.resolved = true;
        if (intent.type !== "field" || intent.enemy.webbedTurns <= 0) render();
        return intent;
    },

    resolveEnemyIntent: function(enemy) {
        if (!enemy || enemy.dead || enemy.disabled) return null;
        var intent = this.applyEnemyIntentControl(this.normalizeEnemyIntent(enemy));
        this.announceEnemyIntent(intent);

        if (intent.type === "single" || intent.type === "barrage") {
            this.resolveEnemyStrikeIntent(intent);
        } else if (intent.type === "area") {
            this.resolveEnemyAreaIntent(intent);
        } else if (intent.type === "field") {
            this.resolveEnemyFieldIntent(intent);
        } else {
            this.applyResolvedEnemyIntent(intent, intent.damage, true);
            if (enemy.disrupted > 0) enemy.disrupted--;
        }
        return this.finalizeEnemyIntent(intent);
    }
});
