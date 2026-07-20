var FX = {
    layer: function() {
        var el = document.getElementById('fx-layer');
        if (!el) {
            el = document.createElement('div');
            el.id = 'fx-layer';
            el.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:100;overflow:hidden';
            document.body.appendChild(el);
        }
        return el;
    },

    spawn: function(className, ms) {
        if (typeof GAME !== 'undefined' && GAME.settings && GAME.settings.reducedFlashes && /flash|threshold|furnace-ignition|continuation-ring/.test(className)) {
            return null;
        }
        var el = document.createElement('div');
        el.className = className;
        var layer = this.layer();
        layer.appendChild(el);
        setTimeout(function() {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, ms || 500);
        return el;
    },

    spawnAt: function(className, ms, xPercent, yPercent) {
        var el = document.createElement('div');
        el.className = className;
        if (xPercent != null) el.style.left = xPercent + '%';
        if (yPercent != null) el.style.top = yPercent + '%';
        el.style.transform = 'translate(-50%,-50%)';
        var layer = this.layer();
        layer.appendChild(el);
        setTimeout(function() {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, ms || 500);
        return el;
    },

    spawnOnEnemy: function(className, enemyIndex, ms) {
        var el=this.spawn(className,ms);
        var target=document.querySelector('[data-enemy-index="'+enemyIndex+'"] .enemy-visual');
        if(el&&target&&target.getBoundingClientRect){var r=target.getBoundingClientRect();el.style.left=(r.left+r.width/2)+'px';el.style.top=(r.top+r.height/2)+'px';el.style.width=Math.max(70,r.width)+'px';el.style.height=Math.max(60,r.height)+'px';}
        return el;
    },

    playEnemyIntent: function(enemy, enemyIndex, move) {
        if(!enemy)return;
        var key=enemy.originalKey||enemy.key||'',family='generic';
        if(/^rime/.test(key))family='pall';else if(/^chime/.test(key))family='knell';else if(/^spall/.test(key))family='spall';else if(/^slag/.test(key))family='slag';else if(key==='archon')family='archon';else if(enemy.isHuman||/censor|hound/.test(key))family='human';
        this.spawnOnEnemy('fx-enemy-intent fx-enemy-'+family,enemyIndex,950);
    },

    playEnemyDeath: function(enemy, enemyIndex) {
        if(!enemy)return;
        var key=enemy.originalKey||enemy.key||'',family='generic';
        if(/nifl|relay|atlas|overtime/.test(key))family='structural';else if(/^rime/.test(key))family='pall';else if(/^chime/.test(key))family='knell';else if(/^spall/.test(key))family='spall';else if(/^slag/.test(key))family='slag';
        this.spawnOnEnemy('fx-enemy-death fx-death-'+family,enemyIndex,1250);
    },

    playSceneCue: function(cue) {
        if (!cue) return;
        var map = {
            'cold-wind':'fx-vn-cold', 'phone-buzz':'fx-vn-phone',
            'door':'fx-vn-motion', 'footsteps':'fx-vn-motion',
            'impact-heavy':'fx-vn-impact', 'collapse':'fx-vn-impact',
            'heartbeat':'fx-vn-heartbeat', 'rain':'fx-vn-rain',
            'static-burst':'fx-vn-interference', 'cuffs':'fx-vn-formal',
            'gun-charge':'fx-vn-formal', 'manifest':'fx-vn-manifest'
        };
        var className = map[cue];
        if (!className) return;
        this.spawn(className, cue === 'rain' ? 1500 : 900);
        if ((cue === 'impact-heavy' || cue === 'collapse') && !(GAME.settings && GAME.settings.disableShake)) this.shake(3);
    },

    spawnTargetCut: function(kind, targetIndex) {
        var fallbackY = 27 + Math.min(3, Math.max(0, targetIndex || 0)) * 17;
        var lane = this.spawn(kind === 'auto' ? 'fx-auto-cut-lane' : 'fx-dismantle-lane', kind === 'auto' ? 900 : 1250);
        var cut = this.spawn(kind === 'auto' ? 'fx-auto-cut-mark' : 'fx-dismantle-mark', kind === 'auto' ? 1050 : 1350);
        var targetEl = document.querySelector('[data-enemy-index="' + targetIndex + '"] .enemy-visual');
        var app = document.getElementById('app');
        if (targetEl && app && targetEl.getBoundingClientRect && app.getBoundingClientRect) {
            var targetRect = targetEl.getBoundingClientRect();
            var appRect = app.getBoundingClientRect();
            var targetX = targetRect.left + targetRect.width * 0.5;
            var targetY = targetRect.top + targetRect.height * 0.5;
            var startX = appRect.left + appRect.width * 0.28;
            if (lane) { lane.style.left=startX+'px'; lane.style.top=targetY+'px'; lane.style.width=Math.max(40,targetX-startX)+'px'; }
            if (cut) { cut.style.left=targetX+'px'; cut.style.top=targetY+'px'; }
        } else {
            if (lane) lane.style.setProperty('--cut-y', fallbackY + '%');
            if (cut) cut.style.setProperty('--cut-y', fallbackY + '%');
        }
    },

    play: function(type, opts) {
        opts = opts || {};
        switch(type) {
            case 'shrine-slash':
                this.spawnTargetCut('auto', opts.targetIndex || 0);
                break;
            case 'slash':
            case 'dismantle':
                this.spawnTargetCut('dismantle', opts.targetIndex || 0);
                this.spawn('fx-cut-vignette', 1050);
                this.shake(3);
                break;
            case 'cleave': // Cleave — thicker white-pink adaptive cut that adjusts
                this.spawn('fx-slash fx-cleave', 720);
                this.spawn('fx-cleave-impact', 900);
                this.spawn('fx-cleave-rift', 1050);
                this.spawn('fx-shard-rain', 1200);
                this.shake(7);
                break;
            case 'trace':
                this.traceLines();
                break;
            case 'true': // World Cut — space tear
                this.spawn('fx-true-flash', 500);
                this.spawn('fx-world-cut', 800);
                this.spawn('fx-world-cut-seam', 1000);
                this.shake(12);
                break;
            case 'hellstep':
                this.spawn('fx-hellstep-ring', 500);
                var bs = document.querySelector('.battle-screen');
                if (bs) bs.classList.add('hellstep-active');
                this.shake(4);
                break;
            case 'hellstep-end':
                var bse = document.querySelector('.battle-screen');
                if (bse) bse.classList.remove('hellstep-active');
                break;
            case 'threshold':
                this.spawn('fx-threshold', 2000);
                this.shake(6);
                break;
            case 'stin-scan':
                this.spawn('fx-stin-scan', 500);
                break;
            case 'stin-fail':
                this.spawn('fx-stin-fail', 800);
                this.shake(2);
                break;
            case 'shattering':
                this.spawn('fx-shattering', 600);
                this.spawn('fx-crack-overlay', 600);
                this.shake(10);
                break;
            case 'ally-bracket':
                // The applied target retains its DOM bracket; the support lane pulses on each new proc.
                this.spawn('fx-ally-bracket-lane', 760);
                break;
            case 'black-flash':
                this.spawn('fx-black-flash-freeze', 1750);
                this.spawn('fx-black-flash', 1850);
                this.spawn('fx-black-flash-cut', 1950);
                this.spawn('fx-resonance-rings', 2100);
                this.spawn('fx-zone-ignition', 2250);
                this.spawn('fx-shard-rain', 2050);
                this.shake(12);
                break;
            case 'reinforcement':
                this.spawn('fx-reinforcement-rift', 1450);
                this.spawn('fx-shard-rain', 1500);
                this.shake(5);
                break;
            case 'battle-continuation':
                this.spawn('fx-battle-continuation', 1300);
                this.spawn('fx-battle-continuation-ring', 1000);
                break;
            case 'luck':
                this.spawn('fx-luck', 400);
                break;
            case 'shrine-hit':
                this.spawnAt('fx-shrine-hit', 300, 70 + (Math.random()*15-7), 30 + (Math.random()*30-15));
                break;
            case 'enemy-hit':
                this.spawn('fx-enemy-hit', 480);
                this.spawn('fx-damage-vignette', 620);
                this.shake(3);
                break;
            case 'enemy-kill':
                this.spawn('fx-true-flash', 350);
                this.spawn('fx-obsidian-shatter', 600);
                this.shake(4);
                break;
            case 'refuse':
                this.spawn('fx-refuse-wave', 600);
                break;
            case 'intercept':
                this.spawn('fx-intercept-glass', 620);
                this.spawn('fx-glass-fragments', 780);
                break;
            case 'battle-transition':
                this.spawn('fx-battle-spiral', 1280);
                this.spawn('fx-battle-shutter', 1240);
                this.spawn('fx-battle-burn', 1320);
                this.spawn('fx-battle-curtain', 1360);
                break;
            case 'transmission':
                this.spawn('fx-transmission', 320);
                break;
            case 'furnace': // Thermobaric — dust ignition
                this.spawn('fx-furnace-ignition', 300);
                this.spawn('fx-true-flash', 400);
                this.spawn('fx-furnace-eruption', 900);
                this.spawn('fx-threshold', 1000);
                this.shake(14);
                break;
            case 'web': // Web — spiderweb fault lines
                this.spawn('fx-web-lines', 960);
                this.traceLines();
                this.shake(3);
                break;
            case 'shake':
                this.shake(opts.intensity || 4);
                break;
        }
    },

    shake: function(intensity) {
        if (typeof GAME !== 'undefined' && GAME.settings && (GAME.settings.disableShake || GAME.settings.reducedMotion)) return;
        var app = document.getElementById('app');
        if (!app) return;
        var mag = intensity || 4;
        app.style.animation = 'none';
        app.offsetHeight; // reflow
        // Inject keyframes dynamically for magnitude
        var animName = 'fx-shake-anim-' + mag;
        var styleId = 'fx-shake-style-' + mag;
        if (!document.getElementById(styleId)) {
            var s = document.createElement('style');
            s.id = styleId;
            s.textContent = '@keyframes ' + animName + ' {' +
                '0%,100%{transform:translate(0,0);}' +
                '25%{transform:translate(-' + mag + 'px,' + (mag/2) + 'px);}' +
                '50%{transform:translate(' + (mag-1) + 'px,-' + (mag/2) + 'px);}' +
                '75%{transform:translate(-' + (mag-2) + 'px,' + (mag-1) + 'px);}' +
                '}';
            document.head.appendChild(s);
        }
        app.style.animation = animName + ' 0.25s';
        setTimeout(function() {
            app.style.animation = '';
        }, 260);
    },

    clear: function() {
        var layer = this.layer();
        while (layer.firstChild) {
            layer.removeChild(layer.firstChild);
        }
    },

    traceLines: function() {
        var layer = this.layer();
        var angles = [-28, 22, -35, 15, -10, 30];
        var yPositions = ['25%', '40%', '55%', '70%', '48%', '62%'];
        var delays = [0, 60, 120, 180, 240, 300];

        for (var i = 0; i < angles.length; i++) {
            (function(index) {
                setTimeout(function() {
                    var line = document.createElement('div');
                    var angle = angles[index];
                    var y = yPositions[index];

                    line.style.setProperty("--rot", angle + "deg");
                    line.style.cssText +=
                        'position:absolute;' +
                        'left:0;' +
                        'right:0;' +
                        'height:2px;' +
                        'top:' + y + ';' +
                        'background:linear-gradient(90deg, transparent 5%, #8a5cf6 25%, #c9a3ff 50%, #8a5cf6 75%, transparent 95%);' +
                        'transform:scaleX(0) rotate(' + angle + 'deg);' +
                        'transform-origin:left center;' +
                        'opacity:0;' +
                        'box-shadow:0 0 6px rgba(138,92,246,0.8), 0 0 12px rgba(201,163,255,0.4);' +
                        'animation:trace-line-draw 0.4s ease-out forwards;';

                    layer.appendChild(line);

                    setTimeout(function() {
                        if (line.parentNode) line.parentNode.removeChild(line);
                    }, 450);
                }, delays[index]);
            })(i);
        }
    }
};

// Add the trace-line keyframes once
(function(){
    var s = document.createElement('style');
    s.textContent = '@keyframes trace-line-draw {' +
        '0%{transform:scaleX(0) rotate(var(--rot,-20deg));opacity:0;}' +
        '30%{opacity:1;}' +
        '100%{transform:scaleX(1) rotate(var(--rot,-20deg));opacity:0;}' +
    '}';
    document.head.appendChild(s);
})();

if (typeof window !== 'undefined') window.FX = FX;
if (typeof global !== 'undefined') global.FX = FX;

