var AUDIO = {
    ctx: null,
    muted: false,
    bgmVolume: 0.8,
    sfxVolume: 0.9,
    masterGain: null,
    bgmGain: null,
    sfxGain: null,
    bgmFilter: null,
    bgmDelay: null,
    bgmDelayFeedback: null,
    bgmDelayTone: null,
    bgmDelaySend: null,
    masterComp: null,
    currentMusic: null,
    currentEncounterKey: null,
    schedulerInterval: null,
    musicToken: 0,
    activeBgmOsc: [],
    nextPhraseTime: 0,
    schedulerLookahead: 0.24,
    schedulerStepMs: 70,
    musicLengths: {
        title: 8.0,
        story: 8.0,
        story_cold: 9.0,
        discord: 6.0,
        audit: 7.0,
        battle: 8.0,
        battle_tension: 8.0,
        battle_boss: 9.6,
        battle_human: 8.0,
        battle_chime: 8.8,
        battle_rime: 8.0,
        battle_spall: 8.0,
        battle_slag: 9.6,
        battle_witness: 9.6,
        battle_censor: 8.0,
        battle_hound: 9.6
    },

    init: function() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();

            this.masterGain = this.ctx.createGain();
            this.bgmGain = this.ctx.createGain();
            this.sfxGain = this.ctx.createGain();
            this.bgmFilter = this.ctx.createBiquadFilter();
            this.bgmDelay = this.ctx.createDelay(0.8);
            this.bgmDelayFeedback = this.ctx.createGain();
            this.bgmDelayTone = this.ctx.createBiquadFilter();
            this.bgmDelaySend = this.ctx.createGain();
            this.masterComp = this.ctx.createDynamicsCompressor();

            this.masterGain.gain.value = this.muted ? 0 : 0.34;
            this.bgmGain.gain.value = 0.34 * this.bgmVolume;
            this.sfxGain.gain.value = this.sfxVolume;

            this.bgmFilter.type = 'lowpass';
            this.bgmFilter.frequency.value = 4200;
            this.bgmFilter.Q.value = 0.55;

            this.bgmDelay.delayTime.value = 0.28;
            this.bgmDelayFeedback.gain.value = 0.14;
            this.bgmDelayTone.type = 'lowpass';
            this.bgmDelayTone.frequency.value = 2500;
            this.bgmDelaySend.gain.value = 0.18;

            this.masterComp.threshold.value = -20;
            this.masterComp.knee.value = 16;
            this.masterComp.ratio.value = 2.4;
            this.masterComp.attack.value = 0.003;
            this.masterComp.release.value = 0.22;

            this.bgmGain.connect(this.bgmFilter);
            this.bgmFilter.connect(this.masterComp);
            this.bgmFilter.connect(this.bgmDelaySend);
            this.bgmDelaySend.connect(this.bgmDelay);
            this.bgmDelay.connect(this.bgmDelayTone);
            this.bgmDelayTone.connect(this.masterComp);
            this.bgmDelayTone.connect(this.bgmDelayFeedback);
            this.bgmDelayFeedback.connect(this.bgmDelay);

            this.sfxGain.connect(this.masterComp);
            this.masterComp.connect(this.masterGain);
            this.masterGain.connect(this.ctx.destination);
        } catch(e) {
            console.warn('Web Audio not supported:', e);
        }
    },

    resume: function() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        if (!this.muted && this.currentMusic && !this.schedulerInterval && this.ctx && this.ctx.state === 'running') {
            this.setMusic(this.currentMusic, true);
        }
    },

    toggle: function() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 0.34;
        }
        if (this.muted) {
            this._haltMusic();
        } else if (this.currentMusic) {
            this.setMusic(this.currentMusic, true);
        }
        return this.muted;
    },

    setBgmVolume: function(value) {
        this.bgmVolume = Math.max(0, Math.min(1, Number(value)));
        if (this.bgmGain) this.bgmGain.gain.value = 0.34 * this.bgmVolume;
    },

    setSfxVolume: function(value) {
        this.sfxVolume = Math.max(0, Math.min(1, Number(value)));
        if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume;
    },

    setMusic: function(track, force) {
        try { this.init(); } catch(e) { return; }
        if (!force && track === this.currentMusic && (track === null || this.schedulerInterval)) return;

        this._haltMusic();
        this.currentMusic = track;

        if (!track || this.muted || !this.ctx) return;
        if (this.ctx.state !== 'running') return;

        this._applyMusicProfile(track);
        this.nextPhraseTime = this.ctx.currentTime + 0.05;
        this._schedulerTick();

        var self = this;
        this.schedulerInterval = setInterval(function() {
            self._schedulerTick();
        }, this.schedulerStepMs);
    },

    setEncounterMusic: function(encounterKey) {
        this.currentEncounterKey = encounterKey;
        var track = 'battle';
        if (encounterKey === 'tutorial_1' || encounterKey === 'act1_battle1' || encounterKey === 'act1_battle2' || encounterKey === 'act2_alone_dross' || encounterKey === 'act2_battle1') track = 'battle_rime';
        else if (encounterKey === 'tutorial_2' || encounterKey === 'street_predator_enc' || encounterKey === 'human_hold') track = 'battle_human';
        else if (encounterKey === 'dross_chime') track = 'battle_chime';
        else if (encounterKey === 'dross_spall') track = 'battle_spall';
        else if (encounterKey === 'dross_slag') track = 'battle_slag';
        else if (encounterKey === 'act3_hunt_battle' || encounterKey === 'act3_hunt_battle2' || encounterKey === 'act3_grief_battle' || encounterKey === 'act3_battle2') track = 'battle_boss';
        else if (encounterKey === 'act3_battle3' || encounterKey === 'archon_fight' || encounterKey === 'act6_finale') track = 'battle_witness';
        else if (encounterKey === 'censor_enc') track = 'battle_censor';
        else if (encounterKey === 'act5_hound_battle') track = 'battle_hound';
        this.setMusic(track, true);
    },

    stopMusic: function() {
        this._haltMusic();
        this.currentMusic = null;
    },

    play: function(type) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        this.resume();

        switch(type) {
            case 'click':       this._click(); break;
            case 'advance':     this._advance(); break;
            case 'open':        this._open(); break;
            case 'select':      this._select(); break;
            case 'error':       this._error(); break;
            case 'transmission':this._transmission(); break;
            case 'start':       this._start(); break;
            case 'trace':       this._trace(); break;
            case 'sever':       this._sever(); break;
            case 'intercept':   this._intercept(); break;
            case 'threshold':   this._threshold(); break;
            case 'luck':        this._luck(); break;
            case 'stin':        this._stin(); break;
            case 'stin-fail':   this._stinFail(); break;
            case 'hellstep':    this._hellstep(); break;
            case 'shrine-slash':this._shrineSlash(); break;
            case 'shattering':  this._shattering(); break;
            case 'furnace':     this._furnace(); break;
            case 'web':         this._web(); break;
            case 'enemy-hit':   this._enemyHit(); break;
            case 'human-kill':  this._humanKill(); break;
            case 'battle-continuation': this._battleContinuation(); break;
            case 'black-flash': this._blackFlash(); break;
            case 'footsteps':   this._footsteps(); break;
            case 'impact-heavy':this._impactHeavy(); break;
            case 'cold-wind':   this._coldWind(); break;
            case 'phone-buzz':  this._phoneBuzz(); break;
            case 'door':        this._door(); break;
            case 'rain':        this._rain(); break;
            case 'collapse':    this._collapse(); break;
            case 'heartbeat':   this._heartbeat(); break;
            case 'static-burst':this._staticBurst(); break;
            case 'cuffs':       this._cuffs(); break;
            case 'gun-charge':  this._gunCharge(); break;
            case 'manifest':    this._manifest(); break;
            case 'win':         this._win(); break;
            case 'lose':        this._lose(); break;
        }
    },

    _applyMusicProfile: function(track) {
        if (!this.bgmGain) return;
        var p = {
            gain: 0.24, filter: 4200, delay: 0.17, fb: 0.10, tone: 2600, send: 0.12
        };
        switch(track) {
            case 'title':
                p = { gain:0.26, filter:3400, delay:0.34, fb:0.22, tone:2000, send:0.22 }; break;
            case 'story':
                p = { gain:0.27, filter:2800, delay:0.38, fb:0.15, tone:1500, send:0.18 }; break;
            case 'story_cold':
                p = { gain:0.24, filter:2100, delay:0.42, fb:0.20, tone:1200, send:0.20 }; break; // winter, laundromat, ditch — colder, slower
            case 'discord':
                p = { gain:0.21, filter:5200, delay:0.24, fb:0.12, tone:3400, send:0.10 }; break; // DM list / phone — brighter, intimate, less bass
            case 'audit':
                p = { gain:0.22, filter:4200, delay:0.18, fb:0.08, tone:2800, send:0.08 }; break;
            case 'battle':
                p = { gain:0.26, filter:4400, delay:0.16, fb:0.08, tone:2800, send:0.10 }; break;
            case 'battle_tension':
                p = { gain:0.28, filter:3800, delay:0.12, fb:0.06, tone:2200, send:0.08 }; break;
            case 'battle_boss':
                p = { gain:0.30, filter:3200, delay:0.20, fb:0.18, tone:1800, send:0.16 }; break;
            case 'battle_human':
                p = { gain:0.22, filter:4800, delay:0.10, fb:0.05, tone:3200, send:0.08 }; break;
            case 'battle_chime':
                p = { gain:0.20, filter:5200, delay:0.30, fb:0.22, tone:3600, send:0.22 }; break;
            case 'battle_rime':
                p = { gain:0.23, filter:2500, delay:0.42, fb:0.20, tone:4200, send:0.24 }; break;
            case 'battle_spall':
                p = { gain:0.27, filter:3900, delay:0.08, fb:0.04, tone:1300, send:0.06 }; break;
            case 'battle_slag':
                p = { gain:0.29, filter:2100, delay:0.16, fb:0.12, tone:900, send:0.12 }; break;
            case 'battle_witness':
                p = { gain:0.30, filter:3000, delay:0.36, fb:0.26, tone:1700, send:0.24 }; break;
            case 'battle_censor':
                p = { gain:0.26, filter:5000, delay:0.10, fb:0.05, tone:3300, send:0.08 }; break;
            case 'battle_hound':
                p = { gain:0.31, filter:2600, delay:0.14, fb:0.10, tone:1100, send:0.10 }; break;
        }
        this.bgmGain.gain.value = p.gain * this.bgmVolume;
        this.bgmFilter.frequency.value = p.filter;
        this.bgmDelay.delayTime.value = p.delay;
        this.bgmDelayFeedback.gain.value = p.fb;
        this.bgmDelayTone.frequency.value = p.tone;
        this.bgmDelaySend.gain.value = p.send;
    },

    _haltMusic: function() {
        if (this.schedulerInterval) { clearInterval(this.schedulerInterval); this.schedulerInterval = null; }
        this.musicToken++;
        for (var i = 0; i < this.activeBgmOsc.length; i++) {
            try { this.activeBgmOsc[i].stop(0); } catch(e) {}
        }
        this.activeBgmOsc = [];
    },

    _schedulerTick: function() {
        if (!this.ctx || this.muted || !this.currentMusic) return;
        if (this.ctx.state !== 'running') return;
        var length = this.musicLengths[this.currentMusic];
        if (!length) return;
        while (this.nextPhraseTime < this.ctx.currentTime + this.schedulerLookahead) {
            switch(this.currentMusic) {
                case 'title':           this._scheduleTitlePhrase(this.nextPhraseTime); break;
                case 'story':           this._scheduleStoryPhrase(this.nextPhraseTime); break;
                case 'story_cold':      this._scheduleStoryColdPhrase(this.nextPhraseTime); break;
                case 'discord':         this._scheduleDiscordPhrase(this.nextPhraseTime); break;
                case 'audit':           this._scheduleAuditPhrase(this.nextPhraseTime); break;
                case 'battle':          this._scheduleBattleForm(this.nextPhraseTime, 'battle'); break;
                case 'battle_tension':  this._scheduleBattleForm(this.nextPhraseTime, 'tension'); break;
                case 'battle_boss':     this._scheduleBattleForm(this.nextPhraseTime, 'boss'); break;
                case 'battle_human':    this._scheduleBattleForm(this.nextPhraseTime, 'human'); break;
                case 'battle_chime':    this._scheduleBattleForm(this.nextPhraseTime, 'chime'); break;
                case 'battle_rime':     this._scheduleBattleForm(this.nextPhraseTime, 'rime'); break;
                case 'battle_spall':    this._scheduleBattleForm(this.nextPhraseTime, 'spall'); break;
                case 'battle_slag':     this._scheduleBattleForm(this.nextPhraseTime, 'slag'); break;
                case 'battle_witness':  this._scheduleBattleForm(this.nextPhraseTime, 'witness'); break;
                case 'battle_censor':   this._scheduleBattleForm(this.nextPhraseTime, 'censor'); break;
                case 'battle_hound':    this._scheduleBattleForm(this.nextPhraseTime, 'hound'); break;
            }
            this.nextPhraseTime += length;
        }
    },

    _toneAt: function(targetGain, collection, freq, wave, startTime, duration, volume, endFreq, detuneCents) {
        if (!this.ctx || !targetGain) return;
        var osc = this.ctx.createOscillator();
        var gain = this.ctx.createGain();
        var stopTime = startTime + duration;
        osc.type = wave || 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        if (detuneCents) osc.detune.setValueAtTime(detuneCents, startTime);
        if (endFreq && endFreq !== freq) osc.frequency.exponentialRampToValueAtTime(endFreq, stopTime);
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(volume || 0.08, startTime + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);
        osc.connect(gain); gain.connect(targetGain);
        osc.start(startTime); osc.stop(stopTime + 0.03);
        if (collection) {
            collection.push(osc);
            osc.onended = function() {
                var index = collection.indexOf(osc);
                if (index >= 0) collection.splice(index, 1);
            };
        }
    },

    _chordAt: function(targetGain, collection, freqs, wave, startTime, duration, volume, detuneSpread) {
        if (!freqs || !freqs.length) return;
        var perVoice = (volume || 0.06) / freqs.length;
        for (var i = 0; i < freqs.length; i++) {
            var detune = detuneSpread ? (i - ((freqs.length-1)/2)) * detuneSpread : 0;
            this._toneAt(targetGain, collection, freqs[i], wave, startTime, duration, perVoice, freqs[i], detune);
        }
    },

    _noiseAt: function(targetGain, startTime, duration, volume, filterFreq) {
        if (!this.ctx || !targetGain) return;
        var sc = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
        var buf = this.ctx.createBuffer(1, sc, this.ctx.sampleRate);
        var d = buf.getChannelData(0);
        for (var i=0; i<sc; i++) d[i] = Math.random()*2-1;
        var n = this.ctx.createBufferSource();
        var f = this.ctx.createBiquadFilter();
        var g = this.ctx.createGain();
        var st = startTime + duration;
        n.buffer = buf;
        f.type='lowpass'; f.frequency.value=filterFreq||2600;
        g.gain.setValueAtTime(0.0001,startTime);
        g.gain.exponentialRampToValueAtTime(volume||0.08,startTime+0.01);
        g.gain.exponentialRampToValueAtTime(0.0001,st);
        n.connect(f); f.connect(g); g.connect(targetGain);
        n.start(startTime); n.stop(st+0.03);
    },

    _sfxTone:  function(f,w,s,d,v,e){ this._toneAt(this.sfxGain,null,f,w,this.ctx.currentTime+(s||0),d,v,e,0); },
    _sfxChord: function(f,w,s,d,v){ this._chordAt(this.sfxGain,null,f,w,this.ctx.currentTime+(s||0),d,v,0); },
    _sfxNoise: function(s,d,v,f){ this._noiseAt(this.sfxGain,this.ctx.currentTime+(s||0),d,v,f); },
    _bgmTone:  function(f,w,s,d,v,e,det){ this._toneAt(this.bgmGain,this.activeBgmOsc,f,w,s,d,v,e,det||0); },
    _bgmChord: function(f,w,s,d,v,ds){ this._chordAt(this.bgmGain,this.activeBgmOsc,f,w,s,d,v,ds||0); },
    _bgmLead:  function(f,s,d,v){
        this._bgmTone(f,'triangle',s,d,v,f,-4);
        this._bgmTone(f,'sine',s+0.01,d*0.94,v*0.42,f,5);
    },

    // ======== BGM PHRASES ========
    _scheduleTitlePhrase: function(t) {
        this._bgmTone(55.00,'sine',t+0.00,3.80,0.010,55.00,0);
        this._bgmTone(41.20,'sine',t+4.00,3.80,0.010,41.20,0);
        this._bgmChord([220.00,261.63,329.63],'triangle',t+0.00,3.90,0.040,1.8);
        this._bgmChord([174.61,220.00,293.66],'triangle',t+4.00,3.90,0.038,1.8);
        this._bgmLead(523.25,t+0.88,0.42,0.014);
        this._bgmLead(659.25,t+1.82,0.48,0.015);
        this._bgmLead(392.00,t+4.76,0.46,0.014);
        this._bgmLead(493.88,t+6.00,0.54,0.015);
        this._bgmTone(783.99,'sine',t+2.70,0.24,0.009,783.99,6);
        this._bgmTone(698.46,'sine',t+6.88,0.24,0.009,698.46,-6);
    },
    _scheduleStoryPhrase: function(t) {
        this._bgmTone(65.41,'sine',t+0.00,1.80,0.008,65.41,0);
        this._bgmTone(55.00,'sine',t+2.00,1.80,0.008,55.00,0);
        this._bgmTone(49.00,'sine',t+4.00,1.80,0.008,49.00,0);
        this._bgmTone(55.00,'sine',t+6.00,1.80,0.008,55.00,0);
        this._bgmChord([196.00,246.94,329.63],'triangle',t+0.00,1.95,0.020,1.2);
        this._bgmChord([174.61,220.00,293.66],'triangle',t+2.00,1.95,0.018,1.2);
        this._bgmChord([164.81,220.00,261.63],'triangle',t+4.00,1.95,0.016,1.2);
        this._bgmChord([174.61,220.00,329.63],'triangle',t+6.00,1.95,0.018,1.2);
        // Softer lead, less piercing
        this._bgmLead(329.63,t+0.52,0.26,0.008);
        this._bgmLead(392.00,t+2.74,0.30,0.007);
        this._bgmLead(293.66,t+4.58,0.26,0.006);
        this._bgmLead(440.00,t+6.44,0.34,0.008);
    },
    _scheduleStoryColdPhrase: function(t) {
        // Colder, slower, minor 2nd dissonance — ditch, laundromat dawn, snow
        this._bgmTone(48.00,'sine',t+0.00,2.5,0.007,48.00,0);
        this._bgmTone(51.91,'sine',t+2.5,2.5,0.006,51.91,0); // b2 tension
        this._bgmTone(55.00,'sine',t+5.0,2.5,0.006,55.00,0);
        this._bgmChord([146.83,185,220],'triangle',t+0.00,2.4,0.014,0.8);
        this._bgmChord([138.59,175,207.65],'triangle',t+2.5,2.4,0.012,0.8);
        this._bgmChord([146.83,185,233.08],'triangle',t+5.0,2.4,0.013,0.8);
        // sparse high ice ping
        this._bgmTone(1046,'sine',t+1.2,0.3,0.004,1046,5);
        this._bgmTone(987,'sine',t+4.8,0.4,0.003,987,-5);
    },
    _scheduleDiscordPhrase: function(t) {
        // Intimate, lo-fi, warm — Discord DM, typing at 3AM, no TV house
        this._bgmTone(110,'sine',t+0.00,1.2,0.005,110,0);
        this._bgmTone(130.81,'sine',t+1.5,1.2,0.004,130.81,0);
        this._bgmChord([220,261.63,329.63],'sine',t+0.00,1.4,0.010,0.5);
        this._bgmChord([196,246.94,293.66],'sine',t+2.0,1.4,0.009,0.5);
        this._bgmChord([220,277.18,329.63],'sine',t+4.0,1.4,0.009,0.5);
        // tiny notification ping
        this._bgmTone(1200,'sine',t+0.8,0.08,0.002,1200,0);
    },
    _scheduleAuditPhrase: function(t) {
        // Omnis-OS terminal — clinical, scanning, blue
        this._bgmTone(220,'square',t+0.00,0.6,0.006,220,0);
        this._bgmTone(277,'square',t+0.6,0.6,0.005,277,0);
        this._bgmTone(330,'square',t+1.2,0.6,0.005,330,0);
        this._bgmChord([440,554,659],'sine',t+2.0,1.5,0.008,0);
        this._noiseAt(this.bgmGain,t+0.0,2.0,0.002,4000);
    },
    _scheduleBattleForm: function(t, style) {
        // Four-part original form: establish, answer, breathe, return. Longer forms avoid two-second loop fatigue.
        if (style === 'boss' || style === 'slag' || style === 'witness' || style === 'hound') {
            this._scheduleBossPhrase(t);
            this._scheduleBossPhrase(t + 2.4);
            this._scheduleTensionPhrase(t + 4.8);
            this._scheduleBossPhrase(t + 7.2);
            return;
        }
        if (style === 'chime') {
            this._scheduleChimePhrase(t);
            this._scheduleChimePhrase(t + 2.2);
            this._scheduleTensionPhrase(t + 4.4);
            this._scheduleChimePhrase(t + 6.6);
            return;
        }
        if (style === 'human') {
            this._scheduleHumanPhrase(t);
            this._scheduleTensionPhrase(t + 2.0);
            this._scheduleHumanPhrase(t + 4.0);
            this._scheduleBattlePhrase(t + 6.0);
            return;
        }
        if (style === 'tension' || style === 'rime' || style === 'censor') {
            this._scheduleTensionPhrase(t);
            this._scheduleTensionPhrase(t + 2.0);
            this._scheduleBattlePhrase(t + 4.0);
            this._scheduleTensionPhrase(t + 6.0);
            return;
        }
        this._scheduleBattlePhrase(t);
        this._scheduleTensionPhrase(t + 2.0);
        this._scheduleBattlePhrase(t + 4.0);
        this._scheduleHumanPhrase(t + 6.0);
    },

    _scheduleBattlePhrase: function(t) {
        var tick = 0.125;
        // Driving bass (Am-F-G-Am)
        var b=[110,110,220,110, 87,87,174,87, 98,98,196,98, 110,110,130,110];
        for (var i=0;i<16;i++) this._bgmTone(b[i],'sawtooth',t+(i*tick),0.11,0.025,b[i],0);
        // Chords stab
        var ch=[[110,164,220],[87,130,174],[98,146,196],[110,164,220]];
        for (var j=0;j<4;j++) {
            this._bgmChord(ch[j],'square',t+(j*0.5),0.18,0.018,0);
            this._bgmChord(ch[j],'square',t+(j*0.5)+0.25,0.08,0.012,0);
        }
        // Lead hook
        var mel=[{f:440,t:0.0,d:0.1},{f:440,t:0.25,d:0.1},{f:523,t:0.5,d:0.2},
                 {f:440,t:0.75,d:0.1},{f:392,t:1.0,d:0.2},{f:349,t:1.25,d:0.1},
                 {f:392,t:1.5,d:0.1},{f:440,t:1.75,d:0.2}];
        for (var k=0;k<mel.length;k++){var m=mel[k];this._bgmLead(m.f,t+m.t,m.d,0.018);}
        // Drums
        for (var l=0;l<4;l++) {
            this._bgmTone(60,'sine',t+(l*0.5),0.10,0.045,30,0);
            this._noiseAt(this.bgmGain,t+(l*0.5),0.03,0.018,800);
        }
        for (var m2=0;m2<2;m2++) this._noiseAt(this.bgmGain,t+0.5+(m2*1.0),0.08,0.038,1800);
    },
    _scheduleTensionPhrase: function(t) {
        // Tighter, more anxious — smaller intervals, dissonant tritones, higher tempo feel
        var tick = 0.125;
        var b = [98,98,196,98, 92,92,185,92, 87,87,174,87, 98,98,146,98];
        for (var i=0;i<16;i++) this._bgmTone(b[i],'sawtooth',t+(i*tick),0.11,0.028,b[i],3);
        // Dissonant stabs
        var ch=[[98,138,196],[92,130,185],[87,123,174],[98,138,207]];
        for (var j=0;j<4;j++) this._bgmChord(ch[j],'sawtooth',t+(j*0.5),0.14,0.022,4);
        // High anxious lead
        var mel=[{f:523,t:0.12,d:0.08},{f:587,t:0.37,d:0.08},{f:622,t:0.62,d:0.1},
                 {f:587,t:0.87,d:0.08},{f:523,t:1.12,d:0.1},{f:466,t:1.37,d:0.08},
                 {f:523,t:1.62,d:0.08},{f:622,t:1.87,d:0.12}];
        for (var k=0;k<mel.length;k++){var m=mel[k];this._bgmLead(m.f,t+m.t,m.d,0.016);}
        // Sparser kick, more hi-hat
        for (var l=0;l<4;l++) this._bgmTone(55,'sine',t+(l*0.5),0.08,0.04,28,0);
        for (var h=0;h<8;h++) this._noiseAt(this.bgmGain,t+(h*0.25),0.02,0.014,5000);
    },
    _scheduleBossPhrase: function(t) {
        // Slower, heavier, descending chromatic bass — Archon weight
        var tick = 0.15;
        var b = [55,55,55,73, 52,52,52,69, 49,49,49,65, 55,55,82,55];
        for (var i=0;i<16;i++) this._bgmTone(b[i],'sawtooth',t+(i*tick),0.14,0.035,b[i],-3);
        // Power chords
        var ch=[[55,82,110],[52,78,104],[49,73,98],[55,82,110]];
        for (var j=0;j<4;j++) this._bgmChord(ch[j],'square',t+(j*0.6),0.35,0.03,0);
        // Slow ominous lead descending
        var mel=[{f:440,t:0.0,d:0.3},{f:415,t:0.6,d:0.25},{f:392,t:1.2,d:0.3},{f:370,t:1.8,d:0.4}];
        for (var k=0;k<mel.length;k++){var m=mel[k];this._bgmLead(m.f,t+m.t,m.d,0.020);}
        // Heavy kick half-time
        for (var l=0;l<2;l++) {
            this._bgmTone(45,'sine',t+(l*1.2),0.20,0.06,25,0);
            this._noiseAt(this.bgmGain,t+(l*1.2),0.05,0.025,600);
        }
        this._noiseAt(this.bgmGain,t+0.6,0.12,0.04,1400);
        this._noiseAt(this.bgmGain,t+1.8,0.12,0.04,1400);
    },
    _scheduleHumanPhrase: function(t) {
        // Fast, jittery, no melody — heartbeat bass + white noise, represents real world violence
        var tick = 0.125;
        // Heartbeat pulse
        for (var i=0;i<8;i++) {
            this._bgmTone(70,'sine',t+(i*2*tick),0.08,0.04,50,0);
            this._bgmTone(70,'sine',t+(i*2*tick)+0.06,0.06,0.025,50,0);
        }
        // Anxious arpeggio
        var notes=[330,392,440,494,440,392,330,294,
                   330,392,440,523,494,440,392,330];
        for (var j=0;j<16;j++) this._bgmTone(notes[j],'triangle',t+(j*tick),0.1,0.012,notes[j],0);
        // Hi-hat heavy
        for (var h=0;h<16;h++) this._noiseAt(this.bgmGain,t+(h*tick),0.015,0.01,6000);
    },
    _scheduleChimePhrase: function(t) {
        // Ring modulation, dissonant bells, delayed taps — voicemail feedback
        this._bgmTone(440,'sine',t,2.0,0.015,440,8);
        this._bgmTone(443,'sine',t,2.0,0.015,443,-8); // beating
        this._bgmTone(523.25,'sine',t+0.4,1.5,0.010,523.25,4);
        this._bgmTone(659.25,'sine',t+0.8,1.0,0.008,659.25,-4);
        // Tapped echoes
        var taps=[0.2,0.6,1.0,1.4,1.8];
        for (var i=0;i<taps.length;i++) {
            this._bgmTone(880,'sine',t+taps[i],0.08,0.006,880,0);
        }
        // Static
        this._noiseAt(this.bgmGain,t,2.0,0.008,2000);
        // Slow descending bass
        this._bgmTone(110,'sine',t,1.0,0.012,55,0);
        this._bgmTone(98,'sine',t+1.0,1.0,0.012,49,0);
    },

    // ======== SFX — softened for long play, not annoying ========
    _click: function(){ this._sfxTone(740,'triangle',0,0.05,0.05,600); },
    _advance: function(){ this._sfxNoise(0,0.035,0.012,5200); this._sfxTone(392,'sine',0,0.11,0.026,523.25); this._sfxTone(659.25,'triangle',0.055,0.12,0.018,587.33); },
    _open: function(){ this._sfxTone(420,'triangle',0,0.06,0.05,420); this._sfxTone(630,'triangle',0.04,0.08,0.05,630); },
    _select: function(){ this._sfxTone(860,'square',0,0.04,0.04,980); },
    _error: function(){ this._sfxTone(220,'square',0,0.06,0.04,160); },
    _transmission: function(){
        this._sfxNoise(0,0.25,0.04,4500);
        this._sfxChord([110,220,330],'sawtooth',0,0.4,0.1);
        this._sfxTone(880,'square',0,0.05,0.04,1240);
        this._sfxTone(520,'triangle',0.04,0.08,0.05,760);
    },
    _start: function(){
        this._sfxNoise(0,0.45,0.045,3600);
        this._sfxTone(72,'sawtooth',0,0.95,0.12,34);
        this._sfxTone(210,'sawtooth',0.08,0.72,0.07,620);
        this._sfxChord([146.83,220,293.66],'triangle',0.38,0.62,0.09);
        this._sfxTone(880,'sine',0.72,0.42,0.05,1760);
    },
    _trace: function(){ this._sfxTone(1200,'sawtooth',0,0.16,0.17,620); this._sfxTone(1500,'triangle',0.03,0.12,0.08,900); },
    _sever: function(){
        this._sfxNoise(0,0.34,0.16,3000);
        this._sfxTone(520,'sawtooth',0,0.42,0.15,62);
        this._sfxTone(96,'triangle',0.04,0.55,0.12,42);
        this._sfxTone(1300,'sine',0.16,0.34,0.045,260);
    },
    _shrineSlash: function(){
        // Higher, faster slash for passive tick
        this._sfxNoise(0,0.16,0.075,4200);
        this._sfxTone(1100,'sawtooth',0,0.18,0.065,380);
    },
    _intercept: function(){
        this._sfxTone(140,'triangle',0,0.28,0.14,52);
        this._sfxTone(280,'sine',0.02,0.18,0.06,180);
        this._sfxNoise(0.05,0.15,0.08,1200);
    },
    _threshold: function(){
        this._sfxTone(220,'square',0,0.10,0.10,220);
        this._sfxTone(220,'square',0.14,0.10,0.10,220);
        this._sfxTone(220,'square',0.28,0.14,0.12,160);
        this._sfxNoise(0.26,0.22,0.06,1400);
        this._sfxTone(440,'sawtooth',0.32,0.30,0.06,110);
    },
    _luck: function(){
        var notes=[523.25,659.25,783.99,1046.50];
        for(var i=0;i<notes.length;i++) this._sfxTone(notes[i],'triangle',i*0.07,0.16,0.11,notes[i]);
    },
    _stin: function(){
        this._sfxTone(440,'sine',0,0.30,0.14,880);
        this._sfxTone(660,'triangle',0.04,0.22,0.08,1100);
        this._sfxChord([523,659,784],'sine',0.2,0.4,0.06);
    },
    _stinFail: function(){
        this._sfxNoise(0,0.30,0.06,3000);
        this._sfxTone(180,'square',0,0.20,0.10,90);
        this._sfxTone(120,'sawtooth',0.10,0.20,0.06,60);
    },
    _hellstep: function(){
        this._sfxTone(82,'sawtooth',0,0.18,0.16,280);
        this._sfxTone(164,'triangle',0.04,0.14,0.08,420);
        this._sfxNoise(0.02,0.12,0.05,2800);
        // Whoosh
        this._sfxNoise(0.10,0.30,0.04,800);
    },
    _shattering: function(){
        // Glass-break sound
        this._sfxNoise(0,0.40,0.22,8000);
        this._sfxTone(2200,'sine',0,0.05,0.12,1100);
        this._sfxTone(1800,'square',0,0.04,0.10,900);
        this._sfxTone(880,'sine',0.05,0.40,0.08,220);
        this._sfxChord([523,784,1047,1319],'sine',0.02,0.50,0.08);
    },
    _furnace: function(){
        this._sfxNoise(0,0.60,0.18,1200);
        this._sfxTone(80,'sawtooth',0,0.40,0.18,40);
        this._sfxChord([110,220,330,440],'sawtooth',0.10,0.50,0.12);
        this._sfxTone(880,'square',0.40,0.20,0.08,440);
    },
    _web: function(){
        for (var i=0;i<5;i++) this._sfxTone(1200+(i*200),'sawtooth',i*0.03,0.12,0.06,800-(i*100));
    },
    _enemyHit: function(){
        this._sfxNoise(0,0.22,0.10,1700);
        this._sfxTone(180,'square',0,0.24,0.09,58);
        this._sfxTone(70,'sine',0.05,0.30,0.08,44);
    },
    _humanKill: function(){
        this._sfxTone(110,'sawtooth',0,0.50,0.10,55);
        this._sfxNoise(0,0.30,0.08,400);
        this._sfxTone(220,'sine',0.20,0.40,0.04,110);
    },
    _blackFlash: function(){
        // Brief music vacuum, then a layered sub-bass/body/space-cut impact.
        if (this.bgmGain && this.ctx && this.bgmGain.gain && this.bgmGain.gain.setValueAtTime) {
            var now=this.ctx.currentTime, restore=Math.max(0.012,this.bgmGain.gain.value);
            try {
                this.bgmGain.gain.cancelScheduledValues(now);
                this.bgmGain.gain.setValueAtTime(Math.max(0.001,this.bgmGain.gain.value),now);
                this.bgmGain.gain.exponentialRampToValueAtTime(0.012,now+0.045);
                this.bgmGain.gain.setValueAtTime(0.012,now+0.16);
                this.bgmGain.gain.exponentialRampToValueAtTime(Math.max(0.012,restore),now+0.82);
            } catch(e) {}
        }
        this._sfxNoise(0,0.10,0.08,9000);
        this._sfxTone(38,'sine',0.10,1.65,0.24,24);
        this._sfxTone(82,'sawtooth',0.13,1.05,0.18,31);
        this._sfxNoise(0.15,0.78,0.24,5200);
        this._sfxTone(1900,'sawtooth',0.16,0.64,0.15,72);
        this._sfxChord([110,165,220,330,440],'square',0.25,1.05,0.16);
        this._sfxTone(1320,'sine',0.82,0.92,0.10,2640);
        this._sfxTone(2640,'triangle',1.08,0.62,0.055,880);
    },
    _battleContinuation: function(){
        this._sfxTone(55,'sine',0,1.0,0.14,55);
        this._sfxChord([220,330,440],'triangle',0.2,0.8,0.10);
        this._sfxTone(440,'square',0.6,0.3,0.08,880);
    },
    _footsteps: function(){
        for(var i=0;i<5;i++){ this._sfxNoise(i*0.16,0.07,0.035,700); this._sfxTone(72,'sine',i*0.16,0.09,0.035,48); }
    },
    _impactHeavy: function(){
        this._sfxNoise(0,0.48,0.15,900); this._sfxTone(95,'sawtooth',0,0.52,0.16,34); this._sfxTone(48,'sine',0.05,0.65,0.11,32);
    },
    _coldWind: function(){
        this._sfxNoise(0,1.15,0.035,1500); this._sfxTone(1800,'sine',0.1,0.9,0.012,900);
    },
    _phoneBuzz: function(){
        this._sfxTone(145,'square',0,0.11,0.045,130); this._sfxTone(145,'square',0.17,0.11,0.04,130);
    },
    _door: function(){
        this._sfxNoise(0,0.5,0.055,650); this._sfxTone(118,'sawtooth',0,0.62,0.055,72);
    },
    _rain: function(){
        this._sfxNoise(0,1.6,0.028,3800); this._sfxNoise(0.35,0.08,0.018,900);
    },
    _collapse: function(){
        this._sfxNoise(0,1.25,0.13,700); this._sfxTone(82,'sawtooth',0,1.1,0.13,28); this._sfxNoise(0.45,0.7,0.08,1800);
    },
    _heartbeat: function(){
        this._sfxTone(62,'sine',0,0.18,0.12,40); this._sfxTone(58,'sine',0.23,0.22,0.09,36); this._sfxTone(55,'sine',0.85,0.2,0.10,34);
    },
    _staticBurst: function(){
        this._sfxNoise(0,0.42,0.07,4200); this._sfxTone(880,'square',0.04,0.18,0.035,220);
    },
    _cuffs: function(){
        this._sfxTone(1800,'square',0,0.045,0.07,1200); this._sfxTone(1350,'square',0.13,0.05,0.065,800); this._sfxNoise(0.02,0.25,0.035,5000);
    },
    _gunCharge: function(){
        this._sfxTone(180,'sawtooth',0,0.8,0.07,1200); this._sfxTone(360,'sine',0.28,0.62,0.045,1600);
    },
    _manifest: function(){
        this._sfxNoise(0,1.25,0.09,1000); this._sfxTone(42,'sine',0,1.5,0.16,30); this._sfxChord([110,165,220],'sawtooth',0.42,0.9,0.09);
    },

    _win: function(){
        // Longer result resolve: impact, breath, then a four-second rising cadence.
        this._sfxNoise(0,0.16,0.05,2600);
        this._sfxTone(196,'sine',0,0.55,0.09,98);
        var seq=[392,523.25,659.25,783.99,1046.50];
        for(var i=0;i<seq.length;i++) this._sfxTone(seq[i],'triangle',0.18+(i*0.22),0.42,0.075,seq[i]);
        this._sfxChord([261.63,392,523.25],'sine',1.35,0.85,0.10);
        this._sfxChord([293.66,440,587.33],'triangle',2.15,0.72,0.09);
        this._sfxChord([329.63,493.88,659.25,987.77],'sine',2.82,1.10,0.12);
        this._sfxTone(1318.51,'sine',3.08,0.95,0.055,1046.50);
    },
    _lose: function(){
        this._sfxTone(200,'sawtooth',0,0.80,0.13,60);
        this._sfxNoise(0.08,0.18,0.05,1200);
    }
};

if (typeof window !== 'undefined') window.AUDIO = AUDIO;
if (typeof global !== 'undefined') global.AUDIO = AUDIO;

