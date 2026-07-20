function render() {
    var app = document.getElementById('app');
    if (!app) return;

    var html = '';
    var music = null;

    try {
        switch (GAME.screen) {
            case 'title':
                html = renderTitle();
                music = 'title';
                break;
            case 'story':
            case 'phone':
                html = renderStory();
                music = 'story';
                break;
            case 'battle':
                html = renderBattle();
                // Encounter-specific music is set in startBattle; fall back to generic battle
                music = null; // AUDIO.setEncounterMusic already set it
                break;
            case 'audit_scan':
                html = renderAuditScan();
                music = 'audit';
                break;
            case 'win':
                html = renderWin();
                music = null;
                break;
            case 'lose':
                html = renderLose();
                music = null;
                break;
        }

        if (music && AUDIO && typeof AUDIO.setMusic === 'function') {
            AUDIO.setMusic(music);
        }
    } catch (e) {
        console.error('Render error:', e);
        if (!html) html = renderTitle();
    }

    if (GAME.debug) {
        html += renderDebugPanel();
    }

    if (GAME.settings) {
        if (GAME.settings.reducedMotion) app.classList.add("reduced-motion");
        else app.classList.remove("reduced-motion");

        if (GAME.settings.highContrast) app.classList.add("high-contrast");
        else app.classList.remove("high-contrast");
    }

    app.innerHTML = html;
    bindEvents();
    // one-frame battle VFX flags
    if (GAME._playerHurtFlash) GAME._playerHurtFlash = false;
    if (GAME._lastIntercept) GAME._lastIntercept = false;
}
window.render = render;

function renderSettingsModal() {
    if (!GAME.showSettings) return '';
    var s = GAME.settings || {};
    var bgmPct = Math.round((s.bgmVolume == null ? 0.8 : s.bgmVolume) * 100);
    var sfxPct = Math.round((s.sfxVolume == null ? 0.9 : s.sfxVolume) * 100);

    return '<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Accessibility and audio settings">' +
        '<div class="settings-card">' +
        '<div class="settings-header">' +
        '<span class="settings-title">SETTINGS</span>' +
        '<button class="settings-close-btn" aria-label="Close settings" onclick="GAME.showSettings = false; render();">✕</button>' +
        '</div>' +
        '<div class="settings-group">' +
        '<span class="settings-label">Audio</span>' +
        '<label class="settings-row"><span>Mute Audio</span><input type="checkbox" class="settings-checkbox" ' + (AUDIO.muted ? 'checked' : '') + ' onchange="GAME.setAudioMuted(this.checked);"></label>' +
        '<label class="settings-row settings-slider-row"><span>BGM Volume — ' + bgmPct + '%</span><input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value="' + (s.bgmVolume == null ? 0.8 : s.bgmVolume) + '" oninput="GAME.setAudioVolume(&quot;bgm&quot;,this.value);"></label>' +
        '<label class="settings-row settings-slider-row"><span>SFX Volume — ' + sfxPct + '%</span><input aria-label="Sound effects volume" type="range" min="0" max="1" step="0.05" value="' + (s.sfxVolume == null ? 0.9 : s.sfxVolume) + '" oninput="GAME.setAudioVolume(&quot;sfx&quot;,this.value);"></label>' +
        '</div>' +
        '<div class="settings-group">' +
        '<span class="settings-label">Visual & FX</span>' +
        '<label class="settings-row"><span>Reduced Motion</span><input type="checkbox" class="settings-checkbox" ' + (s.reducedMotion ? 'checked' : '') + ' onchange="GAME.updateSetting(&quot;reducedMotion&quot;,this.checked);"></label>' +
        '<label class="settings-row"><span>Reduced Flashes</span><input type="checkbox" class="settings-checkbox" ' + (s.reducedFlashes ? 'checked' : '') + ' onchange="GAME.updateSetting(&quot;reducedFlashes&quot;,this.checked);"></label>' +
        '<label class="settings-row"><span>Disable Screen Shake</span><input type="checkbox" class="settings-checkbox" ' + (s.disableShake ? 'checked' : '') + ' onchange="GAME.updateSetting(&quot;disableShake&quot;,this.checked);"></label>' +
        '<label class="settings-row"><span>High Contrast Mode</span><input type="checkbox" class="settings-checkbox" ' + (s.highContrast ? 'checked' : '') + ' onchange="GAME.updateSetting(&quot;highContrast&quot;,this.checked);"></label>' +
        '</div>' +
        '</div></div>';
}

function renderDebugPanel() {
    if (!GAME.debug) return '';
    var sceneKey = GAME.currentScene ? GAME.currentScene.key : 'none';
    var encKey = GAME.currentEncounterKey || 'none';
    var intents = (GAME.enemies || []).map(function(e) { return e.name + ': ' + (e.nextMove ? e.nextMove.id : 'none'); }).join(' | ');
    var poise = GAME.player ? GAME.player.poise : 0;
    var armor = GAME.player ? (GAME.player.armorShell || 0) : 0;
    var tier = GAME.getDebtTier ? GAME.getDebtTier() : 'none';
    var drift = GAME.autonomyDrift || 0;
    var fs = GAME.furnaceSaturation || 0;
    var cold = GAME.playerStatuses ? GAME.playerStatuses.coldHold : 0;
    var stat = GAME.playerStatuses ? GAME.playerStatuses.static : 0;
    var anchorHp = GAME.bossState ? GAME.bossState.anchorHp : 'N/A';
    var cControl = GAME.coffinState ? GAME.coffinState.control : 'N/A';
    var gInteg = GAME.graveState ? GAME.graveState.integrity : 'N/A';

    return '<div class="debug-panel" style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(0,0,0,0.92);color:#34d399;font-size:9px;font-family:monospace;padding:6px;border-top:1px solid #10b981;pointer-events:none;">' +
        'DEBUG | SCENE: ' + sceneKey + ' | ENC: ' + encKey + '<br>' +
        'INTENTS: ' + intents + '<br>' +
        'GUARD: ' + poise + ' | ARMOR: ' + armor + ' | DEBT TIER: ' + tier + ' | DRIFT: ' + drift + '/3 | SAT: ' + fs + '/3<br>' +
        'COLD: ' + cold + ' | VEIL NOISE: ' + stat + ' | ANCHOR HP: ' + anchorHp + ' | GRAVEFRAME CTRL: ' + cControl + ' | GRAVE INT: ' + gInteg +
        '</div>';
}

/* =========================
   TITLE
   ========================= */
function renderTitle() {
    var muted = AUDIO.muted ? 'UNMUTE' : 'MUTE';
    var hasSave = GAME.hasSave ? GAME.hasSave() : false;
    var continueBtn = hasSave
        ? '<button class="title-btn continue-btn" onclick="AUDIO.resume(); AUDIO.play(\'open\'); GAME.loadSave();">CONTINUE TRANSMISSION</button>'
        : '';

    return '<div class="screen title-screen active">' +
        '<div class="title-wrap">' +
        '<img class="title-art" src="assets/titlescreen.png" alt="" onerror="this.style.display=\'none\'">' +
        '<div class="title-vignette"></div>' +
        '<div class="title-noise"></div>' +
        '<div class="title-overlay">' +
        '<div class="title-panel">' +
        '<div class="title-kicker">SOMNUS-LINK UNSTABLE // CHANNEL OPEN</div>' +
        '<h1>THE GRAVE THAT<br>WOULDN\'T TAKE ME</h1>' +
        '<p class="subtitle">CHAPTERS 1–5 COMPLETE // CHAPTER 6 IN PROGRESS</p>' +
        '<div class="title-menu">' +
        continueBtn +
        '<button class="title-btn" onclick="AUDIO.resume(); AUDIO.play(\'start\'); FX.play(\'transmission\'); setTimeout(function(){ GAME.startGame(); }, 280);">NEW GAME</button>' +
        '<button class="title-btn" style="border-color:rgba(167,139,250,0.4);" onclick="GAME.showSettings = true; render();">SETTINGS</button>' +
        '</div>' +
        '</div></div></div>' +
        '<button class="btn-audio-toggle" onclick="GAME.toggleAudio();">' + muted + '</button>' +
        (renderSettingsModal ? renderSettingsModal() : '') +
        '</div>';
}


/* =========================
   STORY ROUTER
   ========================= */
function renderStory() {
    if (!GAME.currentScene) return '';
    var scene = GAME.currentScene;
    var mode = scene.mode || 'vn';

    var phoneClass = 'phone-zflip5';
    if (GAME.player && GAME.player.phoneModel === 'motog5') phoneClass = 'phone-motog5';

    switch (mode) {
        case 'cg':      return renderStoryCG(scene);
        case 'phone':   return renderStoryPhone(scene, phoneClass);
        case 'dm-list': return renderStoryDMList(scene, phoneClass);
        case 'voice':   return renderStoryVoice(scene, phoneClass);
        case 'vn':
        default:        return renderStoryVN(scene);
    }
}


/* =========================
   VN (Visual Novel)
   ========================= */
function renderStoryVN(scene) {
    var bgHtml = '';
    var bgPath = getBgAssetPath(scene.bg);

    if (scene.cg && scene.cgAsBackground) {
        bgHtml = '<img class="story-bg story-bg-cg" src="' + getCgAssetPath(scene.cg) + '" alt="" style="object-position:' + (scene.cgPos || 'center top') + ';" onerror="this.style.display=\'none\'">';
    } else if (bgPath === 'css_bg_void') {
        bgHtml = '<div class="story-bg void-bg-animated ' + getVoidVariant(scene) + '"><span class="void-geo g1"></span><span class="void-geo g2"></span><div class="void-particle p1"></div><div class="void-particle p2"></div><div class="void-particle p3"></div></div>';
    } else if (scene.bg) {
        bgHtml = '<img class="story-bg" src="' + bgPath + '" alt="" style="object-position:' + getSceneBgPosition(scene, 'story') + ';" onerror="this.style.display=\'none\'">';
    } else {
        bgHtml = '<div class="story-bg void-bg-animated ' + getVoidVariant(scene) + '"><span class="void-geo g1"></span><span class="void-geo g2"></span><div class="void-particle p1"></div><div class="void-particle p2"></div><div class="void-particle p3"></div></div>';
    }

    var speakerDisplay = scene.speaker || 'Narrator';
    var isNarration = (speakerDisplay === 'Narrator' || speakerDisplay === 'System');
    var speakerColor = scene.speakerColor || '#B060FF';

    var titleHtml = scene.title ? '<div class="story-header">' + escapeHtml(scene.title) + '</div>' : '';
    var cgHtml = scene.cgAsBackground ? '' : renderSceneCG(scene);

    var avatarHtml = '';
    var speakerType = scene.retrospective ? 'retrospective' : getStorySpeakerType(speakerDisplay);
    var speakerProfile = scene.retrospective ? 'retrospective' : getStorySpeakerProfile(speakerDisplay);
    var speakerLabel = scene.retrospective ? 'SOSA // LOOKING BACK' : speakerDisplay.toUpperCase();
    var storyBoxClass = 'story-box speaker-' + speakerType + ' speaker-profile-' + speakerProfile;
    if (isNarration) {
        storyBoxClass += ' narration';
    } else {
        avatarHtml = '<div class="story-avatar-box" style="border-color:' + speakerColor + ';">' + getSpeakerAvatar(scene, speakerDisplay, speakerColor) + '</div>';
    }

    var textHtml = formatStoryText(scene.text || '', speakerType);
    if (isNarration) {
        // System cards stay neutral
        textHtml = '<span class="narration-text">' + textHtml + '</span>';
    }

    var onclick = "AUDIO.play('advance'); GAME.executeSceneAction();";
    var storyHint = TERM_INTRO_SCENES[scene.key] ? '[ HOLD HIGHLIGHTED TERMS · TAP TO ADVANCE ]' : '[ TAP TO ADVANCE ]';

    return '<div class="screen story-screen active" role="button" tabindex="0" aria-label="Advance dialogue" onclick="' + onclick + '" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();' + onclick + '}">' +
        '<div class="story-bg-wrap">' + bgHtml + '<div class="story-overlay"></div></div>' +
        '<div class="story-content">' +
        titleHtml +
        cgHtml +
        '<div class="' + storyBoxClass + '" style="--speaker-color:' + speakerColor + ';">' +
        avatarHtml +
        '<div style="flex:1;min-width:0;">' +
        '<div class="story-speaker" style="color:' + speakerColor + ';">' + escapeHtml(speakerLabel) + '</div>' +
        '<div class="story-text">' + textHtml + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="story-hint">' + storyHint + '</div>' +
        '</div>' + renderTermHelp() + '</div>';
}


/* =========================
   CG-ONLY — FULL BLEED per user request: CG before dialogue is full screen
   ========================= */
function renderStoryCG(scene) {
    var cgPath = getCgAssetPath(scene.cg);
    var onclick = "AUDIO.play('advance'); GAME.executeSceneAction();";
    var titleHtml = scene.title ? '<div class="story-header">' + escapeHtml(scene.title) + '</div>' : '';

    return '<div class="screen story-screen active story-cg-only" role="button" tabindex="0" aria-label="Continue" onclick="' + onclick + '" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();' + onclick + '}" style="cursor:pointer;">' +
        '<div class="story-bg-wrap">' +
        '<img class="story-bg" src="' + cgPath + '" alt="" style="object-position:' + (scene.cgPos || 'center center') + '; filter: brightness(0.88) contrast(1.06); width:100%; height:100%; object-fit:cover;" onerror="this.style.display=\'none\'">' +
        '<div class="story-overlay" style="background: linear-gradient(to top, rgba(5,3,10,0.72) 0%, transparent 50%);"></div>' +
        '</div>' +
        '<div class="story-content" style="justify-content:space-between; background:transparent; box-shadow:none; pointer-events:none;">' +
        titleHtml +
        '<div style="flex:1;"></div>' +
        '<div class="story-cg-only-hint" style="background:rgba(10,8,18,0.75); border:1px solid rgba(176,96,255,0.35); border-radius:6px; padding:7px 16px; align-self:center; font-family:var(--font-mono); font-size:10px; letter-spacing:2px; color:#E4B8FF; backdrop-filter:blur(6px); pointer-events:auto;">[ TAP TO CONTINUE ]</div>' +
        '</div></div>';
}


/* =========================
   PHONE / DISCORD DMS
   ========================= */
function renderStoryPhone(scene, phoneClass) {
    var statusBar = renderPhoneStatusBar();
    var other = null;
    var otherColor = '#999';
    var otherName = scene.title || 'Chat';
    var otherPfp = 'system';
    var otherStatus = 'offline';
    var entriesHtml = '';

    for (var i = 0; i < (scene.messages || []).length; i++) {
        var m = scene.messages[i];
        if (m.self) {
            entriesHtml += renderDiscordSelf(m);
        } else {
            entriesHtml += renderDiscordOther(m);
        }
    }

    // Header from first non-self message / title
    for (var j = 0; j < (scene.messages || []).length; j++) {
        if (!scene.messages[j].self) {
            other = scene.messages[j];
            var roster = DATA.roster[other.user] || {};
            otherColor = other.color || roster.color || '#999';
            otherName = roster.name || other.user || scene.title || 'Chat';
            otherPfp = other.pfp || roster.pfp || 'system';
            otherStatus = other.status || roster.status || 'offline';
            break;
        }
    }
    // Channel titles like #general
    var isChannel = !!(scene.title && String(scene.title).charAt(0) === '#');
    if (isChannel) {
        otherName = scene.title;
    } else if (scene.title && DATA.roster[scene.title]) {
        var tr = DATA.roster[scene.title];
        otherName = tr.name || otherName || scene.title;
        if (!other) {
            otherColor = tr.color || otherColor;
            otherPfp = tr.pfp || otherPfp;
            otherStatus = tr.status || otherStatus;
        } else {
            // Message already set color/pfp/status — only fill blanks
            if (!other.color) otherColor = tr.color || otherColor;
            if (!other.pfp) otherPfp = tr.pfp || otherPfp;
            if (!other.status) otherStatus = tr.status || otherStatus;
        }
    }

    var onclick = "AUDIO.play('advance'); GAME.executeSceneAction();";
    var displayName = otherName;
    var hashPrefix = isChannel ? '<span class="discord-hash">#</span>' : '';
    var msgPlaceholder = isChannel
        ? 'Message ' + escapeHtml(String(displayName).replace(/^#/, '#'))
        : 'Message @' + escapeHtml(String(displayName));
    // Group-DM headers use the named roster entry (Top Ranked Gz) rather than the first speaker.
    var titleRoster = (scene.title && DATA.roster[scene.title]) ? DATA.roster[scene.title] : null;
    var rosterInfo = (titleRoster && titleRoster.members) ? titleRoster : (other ? (DATA.roster[other.user] || {}) : {});
    if (rosterInfo.members && rosterInfo.memberNames) {
        var subline = '<div class="discord-header-sub">Private Group • ' + escapeHtml(rosterInfo.memberNames.join(', ')) + '</div>';
    } else if (isChannel) {
        var subline = '<div class="discord-header-sub">Server • #general</div>';
    } else {
        var subline = '<div class="discord-header-sub">' + discordStatusLabel(otherStatus) + (rosterInfo.role ? ' • ' + escapeHtml(rosterInfo.role) : '') + '</div>';
    }
    var avatarBlock = isChannel
        ? ''
        : '<div class="discord-dm-avatar-wrap" style="margin-right:10px;">' +
          '<div class="discord-dm-avatar">' + renderPfpFor(otherPfp, otherColor) + '</div>' +
          '</div>';

    return '<div class="screen story-screen active phone-advance-screen" role="button" tabindex="0" aria-label="Advance chat" onclick="' + onclick + '" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();' + onclick + '}">' +
        '<div class="phone-container ' + phoneClass + ' discord-theme" style="height:100%;">' +
        statusBar +
        '<div class="discord-header">' +
        avatarBlock +
        '<div style="flex:1;min-width:0;">' +
        '<div class="discord-header-title">' + (isChannel ? hashPrefix + escapeHtml(String(displayName).replace(/^#/, '')) : escapeHtml(String(displayName))) + '</div>' +
        subline +
        '</div>' +
        '<span class="discord-header-menu" aria-hidden="true">☰</span>' +
        '</div>' +
        '<div class="discord-messages-area" id="discord-scroll-area">' + entriesHtml + '</div>' +
        '<div class="discord-input-wrap"><div class="discord-input">' + msgPlaceholder + '</div></div>' +
        '<div class="discord-tap-hint">TAP ANYWHERE</div>' +
        '</div>' +
        '<script>setTimeout(function(){ var el = document.getElementById("discord-scroll-area"); if(el) el.scrollTop = el.scrollHeight; }, 20);</script>' +
        '</div>';
}

function renderDiscordOther(m) {
    var roster = DATA.roster[m.user] || {};
    var color = m.color || roster.color || '#ccc';
    var name = roster.name || m.user || '???';
    var pfp = m.pfp || roster.pfp || 'system';
    var avatar = renderPfpFor(pfp, color);
    var body = escapeHtml(m.text || '').split('\n').join('<br>');
    var timeHtml = m.time
        ? '<span class="discord-msg-time">' + escapeHtml(m.time) + '</span>'
        : '';
    return '<div class="discord-msg">' +
        '<div class="discord-msg-avatar">' + avatar + '</div>' +
        '<div class="discord-msg-content">' +
        '<div class="discord-msg-header">' +
        '<span class="discord-msg-name" style="color:' + color + ';">' + escapeHtml(name) + '</span>' +
        timeHtml +
        '</div>' +
        '<div class="discord-msg-text">' + body + '</div>' +
        '</div></div>';
}

function renderDiscordSelf(m) {
    var body = escapeHtml(m.text || '').split('\n').join('<br>');
    var timeHtml = m.time
        ? '<span class="discord-msg-time">' + escapeHtml(m.time) + '</span>'
        : '';
    return '<div class="discord-msg discord-msg-self">' +
        '<div class="discord-msg-avatar">' + renderPfpFor('sosa', '#B060FF') + '</div>' +
        '<div class="discord-msg-content">' +
        '<div class="discord-msg-header">' +
        '<span class="discord-msg-name" style="color:#B060FF;">Sosa</span>' +
        timeHtml +
        '</div>' +
        '<div class="discord-msg-text">' + body + '</div>' +
        '</div></div>';
}



function renderStoryDMList(scene, phoneClass) {
    var statusBar = renderPhoneStatusBar();
    var entriesHtml = '';

    for (var i = 0; i < (scene.messages || []).length; i++) {
        var msg = scene.messages[i];
        var handle = msg.handle;
        var roster = DATA.roster[handle] || {};
        var color = msg.color || roster.color || '#aaa';
        var name = roster.name || formatHandleName(handle);
        var pfp = roster.pfp || 'system';
        var statusClass = roster.status || 'offline';
        var isPinned = msg.pinned || roster.pinned;

        var statusHtml = statusClass !== 'offline'
            ? '<div class="discord-dm-status ' + statusClass + '"></div>'
            : '<div class="discord-dm-status offline"></div>';
        var previewClass = msg.unread ? 'discord-dm-preview unread' : 'discord-dm-preview';
        var pinHtml = isPinned
            ? '<span class="discord-dm-pin" title="Pinned" aria-label="Pinned"></span>'
            : '';
        var avatarHtml = renderPfpFor(pfp, color);
        var preview = escapeHtml(msg.preview || '');
        var time = escapeHtml(msg.time || '');

        entriesHtml += '<div class="discord-dm-entry">' +
            '<div class="discord-dm-avatar-wrap">' +
            '<div class="discord-dm-avatar">' + avatarHtml + '</div>' + statusHtml + '</div>' +
            '<div class="discord-dm-info">' +
            '<div class="discord-dm-top">' +
            '<span class="discord-dm-name" style="color:' + (msg.unread ? '#F2F3F5' : '#DBDEE1') + ';">' +
            escapeHtml(name) + pinHtml + '</span>' +
            '<span class="discord-dm-time">' + time + '</span>' +
            '</div>' +
            '<div class="' + previewClass + '">' + preview + '</div>' +
            '</div></div>';
    }

    var dmOnclick = "AUDIO.play('advance'); GAME.executeSceneAction();";
    return '<div class="screen story-screen active phone-advance-screen" role="button" tabindex="0" aria-label="Advance direct messages" onclick="' + dmOnclick + '" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();' + dmOnclick + '}">' +
        '<div class="phone-container ' + phoneClass + ' discord-theme" style="height:100%;">' +
        statusBar +
        '<div class="discord-header discord-header-dms">' +
        '<div class="discord-header-title">Direct Messages</div>' +
        '</div>' +
        '<div class="discord-dm-list">' + entriesHtml + '</div>' +
        '<div class="discord-tap-hint dm-hint">TAP ANYWHERE</div>' +
        '</div></div>';
}


function renderStoryVoice(scene, phoneClass) {
    var roster = DATA.roster[scene.handle] || {};
    var statusBar = renderPhoneStatusBar();
    var color = roster.color || '#e8a0bf';
    var name = roster.name || scene.handle || 'Unknown';
    var avatarInit = name.charAt(0).toUpperCase();
    var pfp = roster.pfp || 'system';

    return '<div class="screen story-screen active" role="button" tabindex="0" aria-label="Advance voice call" onclick="AUDIO.play(\'advance\'); GAME.executeSceneAction();" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();AUDIO.play(\'advance\');GAME.executeSceneAction();}">' +
        '<div class="phone-container voice-call ' + phoneClass + '">' +
        statusBar +
        '<div class="phone-voice-header">' +
        '<span class="phone-voice-status">● LIVE</span>' +
        '<div class="phone-voice-name" style="color:' + color + ';">' + name + '</div>' +
        '</div>' +
        '<div class="phone-voice-body">' +
        '<div class="phone-voice-avatar" style="background:' + color + ';">' +
        renderPfpFor(pfp, color) +
        '</div>' +
        '<div class="phone-voice-wave"><span></span><span></span><span></span><span></span><span></span></div>' +
        '<div class="phone-voice-duration">00:00</div>' +
        '</div>' +
        '<div class="phone-voice-subtitle">' +
        '<div class="phone-voice-speaker" style="color:' + color + ';">' + name + '</div>' +
        '<div class="phone-voice-text">' + (scene.subtitle || 'You\'re on a voice call...') + '</div>' +
        '</div>' +
        '<div class="phone-actions"><div class="story-hint">[ TAP TO CONTINUE ]</div></div>' +
        '</div></div>';
}


/* =========================
   BATTLE
   ========================= */
function renderBattle() {
    var muted = AUDIO.muted ? 'UNMUTE' : 'MUTE';
    var graveframeActive = !!(GAME.coffinState && GAME.coffinState.active);
    var partyHtml = renderParty();
    var enemiesHtml = renderEnemies();
    var actionsHtml = renderActions();
    var utilityHtml = renderUtilityActions();
    var veilLevel = (typeof GAME.veilHudLevel === 'number') ? GAME.veilHudLevel : 0;
    var logHtml = veilLevel >= 2 ? renderLog(6) : '';
    var logBlock = veilLevel >= 2 && !graveframeActive ? '<div class="veil-log-label">YPSILON EVENT BUFFER</div><div class="log">' + logHtml + '</div>' : '';

    // Every combat occurs inside an original psychedelic pressure-field.
    // Story locations return after combat; the battle layer visualizes the enemy ecology and Sosa's altered perception.
    var psyClass = getBattlePsyClass(GAME.currentEncounterKey);
    var bgHtml = '<div class="field-bg battle-psy ' + psyClass + '">' +
        '<span class="psy-layer one"></span><span class="psy-layer two"></span><span class="psy-layer three"></span>' +
        '</div>';
    var contextKey = String(GAME.currentEncounterKey || 'default').replace(/[^a-z0-9_-]/gi,'-');
    var contextHtml = '<div class="battle-context context-' + contextKey + '" aria-hidden="true"><i></i><i></i><i></i></div>';

    var dangerHtml = '';
    if (GAME.player.debt >= 100) {
        dangerHtml = '<div class="battle-danger threshold"></div>';
    } else if (GAME.player.debt >= 67) {
        dangerHtml = '<div class="battle-danger warning"></div>';
    }

    var traceOverlay = '';
    if (GAME.selectedEnemy && GAME.selectedEnemy.traced) {
        traceOverlay = '<div class="trace-view-overlay"><div class="trace-vignette"></div><div class="trace-lines"></div></div>';
    }

    var coffinOverlay = '';
    if (GAME.coffinState && GAME.coffinState.active) {
        coffinOverlay = '<div class="coffin-pilot-overlay"><div class="coffin-vignette"></div></div>';
    }
    var graveOverlay = '';
    if (GAME.graveState && GAME.graveState.active) {
        graveOverlay = '<div class="grave-overlay"><div class="grave-black-field"></div><div class="grave-fault-seams"></div></div>';
    }

    var hintHtml = '';

    var encName = GAME.currentEncounterKey ? getEncounterDisplayName(GAME.currentEncounterKey) : 'ENCOUNTER';
    var encounterBanner = '<div class="battle-encounter-banner">' + encName + '</div>';
    var cutInHtml = renderBattleCutIn();
    var actionCalloutHtml = renderActionCallout();
    var blackFlashHtml = renderBlackFlashWindow();
    var actionHelpHtml = renderActionHelp();
    var manifestBurst = '';
    var shatteringHtml = '';
    if (GAME.shatteringPrompt) {
        shatteringHtml = '<button class="shattering-prompt" onclick="GAME.resolveShattering();">SHATTER</button>';
    }
    if (GAME._showManifestationBurst) {
        // Brief full-bleed CG, no title text — then sprite takes over
        manifestBurst = '<div class="manifest-burst"><img src="assets/cg_somnus_manifestation.jpg" alt=""><div class="manifest-reaction"><b>SOSA</b><span>Oh. That is behind me. That was inside me.</span></div></div>';
        GAME._showManifestationBurst = false;
        GAME._somnusJustAppeared = true;
        setTimeout(function(){ GAME._somnusJustAppeared = false; }, 1800);
    }

    var graveframeHeader = graveframeActive ? '<div class="graveframe-header"><b>GRAVEFRAME</b><span>CONTROL TRANSFER // SOMNUS ACTIVE</span></div>' : '';
    return '<div class="screen battle-screen active' + (graveframeActive ? ' graveframe-mode' : '') + '">' +
        '<button class="btn-audio-toggle" onclick="GAME.toggleAudio();">' + muted + '</button>' +
        encounterBanner +
        graveframeHeader +
        cutInHtml +
        actionCalloutHtml +
        blackFlashHtml +
        actionHelpHtml +
        manifestBurst +
        shatteringHtml +
        '<div class="field">' +
        bgHtml + contextHtml +
        dangerHtml +
        traceOverlay +
        coffinOverlay +
        graveOverlay +
        '<div class="party-side">' + partyHtml + '</div>' +
        '<div class="enemy-side">' + enemiesHtml + '</div>' +
        '</div>' +
        '<div class="panel">' +
        (GAME._turnPill || '') +
        hintHtml +
        utilityHtml +
        '<div class="actions">' + actionsHtml + '</div>' +
        logBlock +
        '</div></div>';
}

function renderBlackFlashWindow() {
    if (!GAME.blackFlashWindowActive) return '';
    var forced = !!GAME.blackFlashTutorialWindow;
    var duration = GAME.blackFlashWindowDuration || 1800;
    var style = forced ? '' : (' style="--bf-duration:' + duration + 'ms"');
    return '<div class="black-flash-window' + (forced ? ' forced' : '') + '"' + style + '>' +
        '<div class="bf-vignette"></div><div class="bf-ring outer"></div><div class="bf-ring inner"></div>' +
        '<div class="bf-core">✦</div><div class="bf-copy"><b>' + (forced ? 'FIRST RESONANCE' : 'BLACK FLASH') + '</b><span>TAP THE CONVERGENCE</span></div>' +
        '</div>';
}

function renderActionCallout() {
    var a = GAME.battleActionCallout;
    if (!a) return '';
    return '<div class="battle-action-callout"><div class="action-callout-name">' + escapeHtml(a.name) + '</div>' +
        (a.sub ? '<div class="action-callout-sub">' + escapeHtml(a.sub) + '</div>' : '') + '</div>';
}

function renderBattleCutIn() {
    var c = GAME.battleCutIn;
    if (!c) return '';
    var drossKeys = {rime:1,rime_nifl:1,rime_weak:1,rime_weak_2:1,chime:1,spall:1,spall_atlas:1,slag:1,slag_overtime:1,archon:1};
    var sideClass = c.kind === 'sosa' ? 'sosa' : (c.kind === 'somnus' ? 'somnus' : (c.kind === 'ally' ? 'ally' : (drossKeys[c.assetKey] ? 'enemy dross' : 'enemy')));
    var portrait = '';
    if (c.kind === 'sosa') {
        portrait = '<img src="assets/sosa.png" alt="" class="battle-cutin-img">';
    } else if (c.kind === 'somnus') {
        portrait = '<img src="assets/somnus.png" alt="" class="battle-cutin-img">';
    } else if (c.kind === 'ally') {
        portrait = '<div class="battle-cutin-sigil ally">VC</div>';
    } else if (c.assetKey && c.assetKey !== 'hound') {
        var cutinStructural = renderStructuralPlaceholder({originalKey:c.assetKey}, true);
        if (cutinStructural) portrait = cutinStructural;
        else {
            var key = (c.assetKey === 'rime_weak' || c.assetKey === 'rime_weak_2') ? 'rime' : c.assetKey;
            portrait = '<img src="assets/' + key + '.png" alt="" class="battle-cutin-img" onerror="this.style.display=\'none\';">';
        }
    } else {
        portrait = '<div class="battle-cutin-sigil">HOUND</div>';
    }
    var persistentClass = c.persistent ? ' persistent' : '';
    var entranceClass = c.rendered ? ' settled' : ' is-new';
    c.rendered = true;
    var speakerHtml = c.speaker ? '<div class="battle-cutin-speaker">' + escapeHtml(c.speaker) + '</div>' : '<div class="battle-cutin-speaker movement">SOMNUS // MOVEMENT</div>';
    var continueHtml = c.persistent ? '<button class="battle-cutin-continue" onclick="event.stopPropagation();GAME.dismissBattleCutIn();">CONTINUE</button>' : '';
    return '<div class="battle-cutin ' + sideClass + persistentClass + entranceClass + '" aria-live="polite" aria-atomic="true">' +
        '<div class="battle-cutin-portrait">' + portrait + '</div>' +
        '<div class="battle-cutin-copy">' + speakerHtml +
        '<div class="battle-cutin-text">' + escapeHtml(c.text) + '</div>' + continueHtml + '</div></div>';
}

function renderResiduePips(count, compact) {
    var html = '<span class="furnace-pips' + (compact ? ' compact' : '') + (count >= 3 ? ' ready' : '') + '" aria-label="Cut Ash ' + count + ' of 3">';
    for (var i = 0; i < 3; i++) html += '<i class="furnace-pip' + (i < count ? ' on' : '') + '"><span></span></i>';
    return html + '</span>';
}

function renderParty() {
    if (GAME.coffinState && GAME.coffinState.active) {
        var g = GAME.coffinState;
        var pips = g.control >= 3 ? '◆ ◆ ◆' : (g.control === 2 ? '◆ ◆ ◇' : (g.control === 1 ? '◆ ◇ ◇' : '◇ ◇ ◇'));
        return '<div class="graveframe-stage"><img src="assets/somnus.png" alt="" class="graveframe-body"><div class="graveframe-mask"><i></i><i></i><span></span></div></div>' +
            '<div class="graveframe-hud"><div><span>CONTROL</span><b>' + pips + '</b></div><div><span>COLLATERAL</span><b>' + g.collateral + '</b></div></div>';
    }
    var veil = (typeof GAME.veilHudLevel === 'number') ? GAME.veilHudLevel : 0;
    var manifested = GAME.somnusManifested === true;
    var alone = GAME.battlePhase === 'alone' || !manifested;

    var somnusHtml = '';
    if (manifested) {
        var somnusClass = 'somnus-wrap';
        if (GAME.hellstepActive) somnusClass += ' hellstep';
        if (GAME.player.coffinPilot) somnusClass += ' coffin-pilot';
        if (GAME._lastIntercept) somnusClass += ' intercept-flash';
        if (GAME._somnusJustAppeared) somnusClass += ' appear';
        var somnusScale = 1 + ((GAME.player.debt || 0) / 100) * 0.35;
        somnusHtml = '<div class="' + somnusClass + '" style="transform:scale(' + somnusScale + ');transform-origin:bottom center;">' +
            '<img class="somnus-img" src="assets/somnus.png" alt="" style="transition:transform 0.5s ease;" onerror="this.style.display=\'none\'">' +
            '</div>';
    }

    var allyCfg = DATA.alliedSupport && DATA.alliedSupport[GAME.currentEncounterKey];
    var allyHtml = allyCfg ? '<div class="kessler-party-wrap"><img src="assets/censor_scout.png" alt="Elias Kessler" class="kessler-party-img"><span>KESSLER</span></div>' : '';
    var sosaClass = 'sosa-wrap' + (GAME._playerHurtFlash ? ' hurt-flash' : '') + (alone ? ' alone' : '');

    // Compact HUD strip — top-left of field, not over Sosa's feet
    var barsHtml = '';
    var turnLabel = GAME.turnLock
        ? 'THEIR MOVE'
        : (GAME.graveState && GAME.graveState.active
            ? 'THE GRAVE WEIGHS THE FIELD.'
            : (GAME.coffinState && GAME.coffinState.active
                ? 'SOMNUS IS WAITING.'
                : 'YOUR MOVE'));
    var turnCls = GAME.turnLock ? 'turn-pill enemy' : 'turn-pill player';
    if (veil <= 0) {
        // Uncalibrated / No earbuds saturation: No HUD overlay at all. Raw vision.
        barsHtml = '';
    } else {
        var hpPct = Math.max(0, Math.min(100, (GAME.player.hp / GAME.player.maxHp) * 100));
        var debtPct = Math.max(0, Math.min(100, GAME.player.debt || 0));
        var isThreshold = GAME.player.debt >= 100;
        var debtClass = 'debt-fill' + (isThreshold ? ' threshold' : '');
        var displayedPoise = GAME.turnLock ? GAME.player.poise : GAME.getPoiseCapacity();
        var poiseHtml = '';
        for (var i = 0; i < 6; i++) {
            poiseHtml += '<span class="guard-pip' + (i < displayedPoise ? ' on' : '') + (veil === 1 ? ' partial' : '') + '"></span>';
        }
        var hpLabel = veil >= 2 ? (Math.max(0, GAME.player.hp) + '/' + GAME.player.maxHp) : (hpPct >= 66 ? 'OK' : (hpPct >= 33 ? 'LOW' : 'CRIT'));
        var tier = GAME.getDebtTier ? GAME.getDebtTier() : "stable";
        var tierText = tier.toUpperCase();
        if (tier === "carried") tierText = "CARRIED / UNSTABLE";
        if (tier === "overload") tierText = "OVERLOAD / SOMNUS LEANING IN";
        var debtLabel = veil >= 2 ? (Math.round(debtPct) + '% ' + tierText) : '???';
        barsHtml =
            '<div class="party-bars veil-' + veil + '">' +
            '<div class="party-statline"><span>HP</span><span>' + hpLabel + '</span></div>' +
            '<div class="pbar"><div class="pbar-fill hp" style="width:' + hpPct + '%;"></div></div>' +
            '<div class="party-statline"><span>' + (veil >= 2 ? 'DEBT' : 'PRESSURE') + '</span><span>' + debtLabel + '</span></div>' +
            '<div class="debt-bar' + (isThreshold ? ' threshold' : '') + '"><div class="' + debtClass + '" style="width:' + debtPct + '%;"></div></div>' +
            '<div class="party-poise-row"><span class="party-poise-label">INTERCEPTION</span><span class="party-poise-pips">' + poiseHtml + '</span></div>' +
            (function() {
                var statusHtml = "";
                if (GAME.playerStatuses && GAME.playerStatuses.coldHold > 0) {
                    statusHtml += '<div class="battle-status cold">COLD HOLD</div>';
                }
                if (GAME.playerStatuses && GAME.playerStatuses.static > 0) {
                    statusHtml += '<div class="battle-status static">VEIL NOISE</div>';
                }
                var armorText = (GAME.player && GAME.player.armorShell > 0) ? "ARMOR  ◈" : "ARMOR  ◇";
                if (veil >= 2) statusHtml += '<div class="armor-shell-row">' + armorText + '</div>';

                if (GAME.player.unlocked.furnace || GAME.player.unlocked.web) {
                    var fs = GAME.furnaceSaturation || 0;
                    var residueLabel = GAME.player.unlocked.furnace ? 'FURNACE' : 'CUT ASH';
                    var residueState = fs >= 3 ? (GAME.player.unlocked.furnace ? 'OPEN READY' : 'APERTURE UNCLAIMED') : (fs + '/3');
                    statusHtml += '<div class="furnace-sat-row' + (fs >= 3 ? ' ready' : '') + '"><span class="furnace-sat-label">' + residueLabel + '</span>' + renderResiduePips(fs, false) + '<span class="furnace-sat-state">' + residueState + '</span></div>';
                }
                if (GAME.blackFlashZoneTurns > 0) {
                    var zoneChance = GAME.getBlackFlashChance ? Math.round(GAME.getBlackFlashChance() * 100) : 0;
                    statusHtml += '<div class="black-flash-zone-tag">IN THE ZONE · 120% · STREAK ' + (GAME.blackFlashStreak || 0) + ' · NEXT ' + zoneChance + '%</div>';
                }
                if (GAME.autonomyDrift && GAME.autonomyDrift > 0) {
                    var fixationTarget = GAME.selectedEnemy && !GAME.selectedEnemy.dead ? GAME.selectedEnemy.name : 'TARGET';
                    statusHtml += '<div class="drift-tag">FIXATION ' + GAME.autonomyDrift + '/3 · ' + escapeHtml(fixationTarget) + '</div>';
                }
                if (GAME.targetLockedBySomnus) {
                    var lockedName = GAME.selectedEnemy && !GAME.selectedEnemy.dead ? GAME.selectedEnemy.name : 'TARGET';
                    statusHtml += '<div class="somnus-lock-tag">SOMNUS LOCK · ' + escapeHtml(lockedName) + '</div>';
                }
                if (GAME.graveState && GAME.graveState.active) {
                    var g = GAME.graveState;
                    var gPips = (g.integrity >= 3 ? "◆ ◆ ◆" : (g.integrity === 2 ? "◆ ◆ ◇" : (g.integrity === 1 ? "◆ ◇ ◇" : "◇ ◇ ◇")));
                    statusHtml += '<div class="grave-status-row"><span class="grave-tag">THE GRAVE THAT WOULDN\'T TAKE ME</span></div>';
                    statusHtml += '<div class="grave-integrity-row">INTEGRITY ' + gPips + '</div>';
                    statusHtml += '<div class="grave-aftermath-row">AFTERMATH ' + g.aftermath + '</div>';
                    statusHtml += '<div class="grave-turns-row">' + g.turnsLeft + ' TURNS UNTIL COLLAPSE</div>';
                } else if (GAME.coffinState && GAME.coffinState.active) {
                    var c = GAME.coffinState;
                    var cPips = (c.control >= 3 ? "◆ ◆ ◆" : (c.control === 2 ? "◆ ◆ ◇" : (c.control === 1 ? "◆ ◇ ◇" : "◇ ◇ ◇")));
                    statusHtml += '<div class="coffin-status-row"><span class="coffin-tag">GRAVEFRAME</span></div>';
                    statusHtml += '<div class="coffin-control-row">CONTROL ' + cPips + '</div>';
                    statusHtml += '<div class="coffin-collateral-row">COLLATERAL ' + c.collateral + '</div>';
                }
                if (GAME.currentEncounterKey === 'kessler_rescue_swarm') {
                    statusHtml += '<div class="mixed-crossfeed-tag">CROSSFEED ' + (GAME.mixedCrossfeedClock || 0) + '/2 · WEB = CUT LINK</div>';
                }
                if (GAME.currentEncounterKey === 'dross_overtime') {
                    statusHtml += '<div class="overtime-clock-tag">OVERTIME ' + (GAME.overtimeClock || 0) + '/3 · WEB = BREAK ROUTINE</div>';
                }
                var allyCfg = DATA.alliedSupport && DATA.alliedSupport[GAME.currentEncounterKey];
                if (allyCfg) {
                    var allyCadence = allyCfg.cadence || 2;
                    var allyNext = allyCadence - ((GAME.battleTurnCount || 0) % allyCadence);
                    statusHtml += '<div class="ally-support-tag">BLUE BRACKET · NEXT ' + allyNext + '</div>';
                }
                var sState = GAME.supportState;
                if (GAME.player.unlocked.stin && sState && sState.signal !== "none") {
                    var sigText = sState.callPending
                        ? ("CALLING " + (sState.responder ? sState.responder.toUpperCase() : "NETWORK") + "...")
                        : (sState.signal === "open" ? "OPEN CHANNEL" : (sState.signal === "jammed" ? "SIGNAL JAMMED" : "NO SIGNAL"));
                    var sigCls = sState.signal === "open" ? "open" : (sState.signal === "jammed" ? "jammed" : "none");
                    statusHtml += '<div class="signal-tag ' + sigCls + '">' + sigText + '</div>';
                }
                return statusHtml;
            })() +
            '</div>';
    }

    // Turn pill lives in the bottom panel via global (set on battle render)
    GAME._turnPill = '<div class="' + turnCls + '">' + turnLabel + '</div>';

    // FIXED: Sosa left edge, Somnus right as barrier wall — char-row wrapper
    return '<div class="party-char-row' + (allyCfg ? ' has-kessler' : '') + '">' +
        allyHtml +
        '<div class="' + sosaClass + '">' +
        '<img class="sosa-img" src="assets/sosa.png" alt="" onerror="this.style.display=\'none\'">' +
        '</div>' +
        somnusHtml +
        '</div>' +
        barsHtml;
}

function renderStructuralPlaceholder(enemy, compact) {
    if (!enemy) return '';
    var key = enemy.originalKey || enemy.key || '';
    var kind = '';
    if (enemy.isAnchor || key.indexOf('anchor_') === 0) kind = 'anchor';
    else if (key === 'rime_nifl') kind = 'nifl';
    else if (key === 'chime_relay') kind = 'relay';
    else if (key === 'spall_atlas') kind = 'atlas';
    else if (key === 'slag_overtime') kind = 'overtime';
    else if (key === 'spall' && GAME.currentEncounterKey === 'kessler_joint_hunt') kind = 'loadbearer';
    if (!kind) return '';

    var inner = '';
    if (kind === 'nifl') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><g class="svg-routes"><path d="M18 24 L50 50 L82 22"/><path d="M18 24 L48 82 L82 22"/><path d="M50 50 L48 82"/></g><g class="svg-cold-node"><path d="M10 9 L24 4 L33 18 L29 39 L17 47 L6 34 Z"/><path d="M67 12 L81 4 L94 17 L91 38 L79 46 L66 33 Z"/><path d="M38 67 L49 59 L60 69 L57 91 L47 98 L37 86 Z"/></g><polygon class="svg-core-outer" points="50,35 67,50 50,67 33,50"/><polygon class="svg-core-inner" points="50,42 58,50 50,58 42,50"/><circle class="svg-pulse" cx="50" cy="50" r="4"/></svg>';
    else if (kind === 'relay') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><g class="svg-wire"><path d="M18 23 C30 28 31 39 40 45"/><path d="M82 21 C69 28 70 39 60 45"/><path d="M20 80 C31 69 34 61 43 58"/></g><g class="svg-device"><rect x="8" y="7" width="20" height="34" rx="3"/><rect x="72" y="6" width="20" height="34" rx="3"/><rect x="10" y="64" width="19" height="31" rx="3"/><line x1="12" y1="13" x2="24" y2="13"/><line x1="76" y1="12" x2="88" y2="12"/><line x1="14" y1="70" x2="25" y2="70"/></g><circle class="svg-speaker-a" cx="52" cy="52" r="27"/><circle class="svg-speaker-b" cx="52" cy="52" r="17"/><circle class="svg-speaker-c" cx="52" cy="52" r="6"/><path class="svg-wave" d="M36 52 Q44 42 52 52 T68 52"/></svg>';
    else if (kind === 'atlas') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><g class="svg-building"><path d="M24 8 H77 L88 20 V93 H13 V20 Z"/><path d="M13 35 H88 M13 59 H88 M39 8 V93 M65 8 V93"/><rect x="21" y="17" width="11" height="10"/><rect x="47" y="42" width="11" height="10"/><rect x="72" y="66" width="10" height="17"/></g><g class="svg-load-beams"><path d="M5 23 L91 76"/><path d="M9 83 L90 28"/><path d="M30 4 L71 96"/></g><g class="svg-arrow"><path d="M3 44 H28 L21 37 M28 44 L21 51"/><path d="M97 57 H72 L79 50 M72 57 L79 64"/></g><text class="svg-label" x="50" y="96">LOAD ROUTE</text></svg>';
    else if (kind === 'overtime') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><circle class="svg-clock-face" cx="50" cy="28" r="23"/><path class="svg-clock-hand h1" d="M50 28 L50 12"/><path class="svg-clock-hand h2" d="M50 28 L64 36"/><text class="svg-time" x="50" y="34">4:07</text><g class="svg-workers"><path d="M6 72 L15 58 L24 72 L27 94 H3 Z"/><path d="M37 74 L46 59 L55 74 L58 94 H34 Z"/><path d="M70 72 L79 57 L89 72 L96 94 H67 Z"/></g><g class="svg-belt"><rect x="1" y="91" width="98" height="7"/><circle cx="13" cy="95" r="5"/><circle cx="35" cy="95" r="5"/><circle cx="58" cy="95" r="5"/><circle cx="82" cy="95" r="5"/></g></svg>';
    else if (kind === 'anchor') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><g class="svg-paper-back"><path d="M18 10 H70 L84 24 V90 H18 Z"/><path d="M11 18 H63 L77 32 V97 H11 Z"/></g><path class="svg-red-tag" d="M27 4 H78 L91 18 V50 H27 Z"/><text class="svg-red-word" x="58" y="25">RED TAG</text><g class="svg-report-lines"><path d="M24 57 H72 M24 67 H80 M24 77 H64"/></g><rect class="svg-case-core" x="39" y="38" width="30" height="30" transform="rotate(45 54 53)"/><circle class="svg-case-dot" cx="54" cy="53" r="7"/><text class="svg-closed" x="53" y="94">CASE CLOSED</text></svg>';
    else if (kind === 'loadbearer') inner = '<svg class="ce-svg" viewBox="0 0 100 100"><path class="svg-carrier-body" d="M27 8 H69 L84 23 L78 91 L57 75 L46 97 L18 84 L12 25 Z"/><path class="svg-carrier-head" d="M37 13 L55 8 L68 19 L60 36 L39 34 L31 22 Z"/><g class="svg-carrier-cracks"><path d="M55 35 L43 50 L57 60 L41 80"/><path d="M23 37 L37 49 L29 68"/><path d="M73 34 L60 48 L72 66"/></g><path class="svg-weight-bar" d="M5 8 H95 V18 H5 Z"/><text class="svg-load-word" x="50" y="16">LOAD</text></svg>';
    return '<div class="css-entity entity-' + kind + (compact ? ' compact' : '') + '" aria-hidden="true">' + inner + '</div>';
}

function renderEnemies() {
    var html = '';
    var alliedField = DATA.alliedSupport && DATA.alliedSupport[GAME.currentEncounterKey];
    var veil = (typeof GAME.veilHudLevel === 'number') ? GAME.veilHudLevel : 0;

    if (GAME.bossState) {
        var bs = GAME.bossState;
        var fieldClass = bs.type === "hound" ? "field-active" : (bs.fieldActive ? "field-active" : "field-broken");
        var fieldText = "";
        if (bs.type === "archon") {
            fieldText = bs.fieldActive ? "FIELD ACTIVE — ARCHON BODY RESISTS SEVERANCE" : "FIELD BROKEN — THE BODY CAN DIE";
        } else if (bs.type === "censor") {
            fieldText = bs.fieldActive ? ("FORMALCRAFT GRID — INTEGRITY " + bs.fieldIntegrity + "/" + bs.fieldMaxIntegrity) : "FORMALCRAFT GRID COLLAPSED — KESSLER EXPOSED";
        } else if (bs.type === "hound") {
            fieldText = "PURSUIT PROTOCOL — CIRCUIT COMBUSTION ACTIVE";
        }

        var authorityLabel = bs.type === 'archon' ? 'WORLD LAW' : (bs.type === 'censor' ? 'FORMALCRAFT PROTOCOL' : 'PURSUIT PROTOCOL');
        var authorityText = bs.type === 'censor' ? (bs.protocol || bs.worldLaw) : bs.worldLaw;
        html += '<div class="boss-banner">' +
            '<div class="boss-world-law">' + authorityLabel + ': <span class="law-text">"' + escapeHtml(authorityText) + '"</span></div>' +
            '<div class="boss-field-status ' + fieldClass + '">' + escapeHtml(fieldText) + '</div>' +
            '</div>';
    }

    for (var i = 0; i < GAME.enemies.length; i++) {
        var e = GAME.enemies[i];
        var isSelected = GAME.selectedEnemy === e;
        var isDead = e.dead || e.disabled;
        var hpPct = e.maxHp > 0 ? Math.max(0, (e.hp / e.maxHp) * 100) : 0;

        // Informal names before Act 4 Censor audit; formal orthodox taxonomy after
        var displayName = e.name;
        if (e.isAnchor) {
            displayName = e.name;
        } else if (!GAME.veilLearnedCensor) {
            if (e.originalKey === 'rime_nifl' || e.key === 'rime_nifl') displayName = 'Frost Group Chat';
            else if (e.originalKey === 'rime' || e.key === 'rime') displayName = 'Frost Shadow';
            else if (e.originalKey === 'rime_weak' || e.key === 'rime_weak') displayName = 'Shivering Cold';
            else if (e.originalKey === 'rime_weak_2' || e.key === 'rime_weak_2') displayName = 'Shivering Cold';
            else if (e.originalKey === 'chime_relay') displayName = 'Wire-Jaw Relay';
            else if (e.originalKey === 'chime' || e.key === 'chime') displayName = 'Wire-Jaw';
            else if (e.originalKey === 'spall_atlas' || e.key === 'spall_atlas') displayName = 'Damage Router';
            else if (e.originalKey === 'spall' || e.key === 'spall') displayName = 'Concrete Beast';
            else if (e.originalKey === 'slag_overtime' || e.key === 'slag_overtime') displayName = 'Neverending Shift';
            else if (e.originalKey === 'slag' || e.key === 'slag') displayName = 'Iron Heap';
            else if (e.originalKey === 'archon' || e.key === 'archon') displayName = 'Ditch Horror';
        } else {
            if (e.originalKey === 'rime_nifl' || e.key === 'rime_nifl') displayName = '[TYPE-II: PALL MOLT // NIFL]';
            else if (e.originalKey === 'rime' || e.key === 'rime') displayName = '[DROSS: PALL]';
            else if (e.originalKey === 'chime_relay') displayName = '[TYPE-II: KNELL MOLT // RELAY]';
            else if (e.originalKey === 'chime' || e.key === 'chime') displayName = '[DROSS: KNELL]';
            else if (e.originalKey === 'spall_atlas' || e.key === 'spall_atlas') displayName = '[TYPE-II: SPALL MOLT // ATLAS]';
            else if (e.originalKey === 'spall' || e.key === 'spall') displayName = '[DROSS: SPALL]';
            else if (e.originalKey === 'slag_overtime' || e.key === 'slag_overtime') displayName = '[TYPE-II: SLAG MOLT // OVERTIME]';
            else if (e.originalKey === 'slag' || e.key === 'slag') displayName = '[DROSS: SLAG]';
            else if (e.originalKey === 'archon' || e.key === 'archon') displayName = '[ARCHON]';
            else if (e.originalKey === 'censor_scout' || e.key === 'censor_scout') displayName = '[CENSOR SCOUT]';
        }

        var slotClass = 'enemy-slot enemy-kind-' + String(e.originalKey || e.key || 'unknown').replace(/[^a-z0-9_-]/gi,'-') + ' enemy-variant-' + (i % 3);
        if (isSelected && !isDead) slotClass += ' selected';
        if (isSelected && !isDead && GAME.targetLockedBySomnus) slotClass += ' fixation-locked';
        if (isSelected && !isDead && GAME.autonomyDrift > 0) slotClass += ' fixation-building';
        if (e.traced && !isDead) slotClass += ' traced';
        if (e.injured && !isDead) slotClass += ' injured';
        if (e.criticalState && !isDead) slotClass += ' critical-state';
        if (isDead) slotClass += ' dead';

        var imgKey = getEnemyAssetKey(e);
        var imgSrc = 'assets/' + imgKey + '.png';
        var fallbackLabel = getEnemyFallbackLabel(e);
        var fallbackClass = getEnemyFallbackClass(e);
        // FIX: Transit Security was facing wrong way due to scaleX(-1) — all enemies now face left toward Sosa naturally, no flip
        var imgTransform = 'none';

        var tokensHtml = '';
        if (e.isAnchor && !isDead) tokensHtml += '<span class="token token-anchor">ANCHOR</span>';
        if (e.disrupted > 0 && !isDead) tokensHtml += '<span class="token token-web">WEB</span>';
        if (veil >= 1 && !isDead && (e.dismantleDepth || 0) > 0) tokensHtml += '<span class="token token-read">READ ' + e.dismantleDepth + '/3</span>';
        if (veil >= 2 && GAME.hellstepActive) tokensHtml += '<span class="token token-hellstep">HELLSTEP</span>';
        if (e.disabled) tokensHtml += '<span class="token" style="color:#fbbf24;">FLED</span>';
        else if (e.dead) tokensHtml += '<span class="token" style="color:#ef4444;">DOWN</span>';

        var hpHtml = '';
        if (!isDead && (veil >= 1 || e.isAnchor)) {
            if (veil >= 2 || e.isAnchor) {
                hpHtml = '<div class="enemy-hp-bar"><div class="enemy-hp-fill" style="width:' + hpPct + '%;"></div></div>' +
                    '<div class="enemy-hp-num">' + Math.max(0, e.hp) + '/' + e.maxHp + '</div>';
            } else {
                // partial: bar only, no numbers
                hpHtml = '<div class="enemy-hp-bar dim"><div class="enemy-hp-fill" style="width:' + hpPct + '%;"></div></div>';
            }
        }

        // Speech plate (last thing they "said")
        var speech = '';
        if (!isDead && e._midLine) {
            speech = '<div class="enemy-speech">…</div>';
        } else if (!isDead && e._spokeOpen && veil >= 0) {
            speech = '<div class="enemy-speech">!</div>';
        }

        // Base Dross use provisional raster art; Molts, anchors, and load-bearers use bespoke CSS structures.
        var structuralVisual = renderStructuralPlaceholder(e, false);
        var visual = '<div class="enemy-visual' + (structuralVisual ? ' structural' : '') + '">' +
            (structuralVisual || ('<img class="enemy-img" style="transform:' + imgTransform + ';" src="' + imgSrc + '" alt="' + escapeHtml(displayName) + '" onerror="this.style.display=\'none\';this.nextSibling.style.display=\'flex\';">' +
            '<div class="enemy-fallback ' + fallbackClass + '" style="display:none;transform:' + imgTransform + ';"><span>' + fallbackLabel + '</span></div>')) +
            speech + '</div>';

        var reticleHtml = '';
        if (isSelected && !isDead) {
            reticleHtml =
                '<div class="enemy-reticle" aria-hidden="true">' +
                '<span class="br tl"></span><span class="br tr"></span>' +
                '<span class="br bl"></span><span class="br brc"></span>' +
                '<span class="reticle-core"></span>' +
                '</div>';
        }
        var seamHtml = (e.traced && !isDead && veil >= 1)
            ? '<div class="enemy-seam"></div><div class="enemy-trace-lock"></div>'
            : '';
        var fixationIconHtml = '';
        if (isSelected && !isDead && (GAME.autonomyDrift > 0 || GAME.targetLockedBySomnus)) {
            fixationIconHtml = '<div class="fixation-eye-icon' + (GAME.targetLockedBySomnus ? ' locked' : '') + '" aria-hidden="true">' +
                (GAME.targetLockedBySomnus ? '<span class="fixation-eye-label">SOMNUS</span>' : '') +
                '<span class="fixation-eye-shape"><i></i></span></div>';
        }

        // Ypsilon AR info strip — more data as veil learns. Simplified per user: what is seam lock?
        // Now: TRACED vs FOCUS, not SEAM LOCK/LOOK which confused
        var arHtml = '';
        if (!isDead && veil >= 1) {
            var threat = veil >= 2 ? (e.isHuman ? 'HUMAN' : (GAME.veilLearnedCensor ? 'DROSS' : 'THREAT')) : 'PRESENCE';
            if (e.originalKey === 'archon') threat = GAME.veilLearnedCensor ? 'ARCHON' : 'FIELD ENTITY';
            if (e.originalKey === 'censor_scout') threat = 'CENSOR';
            if (veil === 1) {
                arHtml = '<div class="enemy-ar partial"><span class="ar-tag">' + threat + '</span>' +
                    (e.traced ? '<span class="ar-lock">◆ TRACED</span>' : '<span class="ar-hint">○ FOCUS</span>') +
                    '</div>';
            } else {
                var mass = e.isHuman ? '1.0' : (e.originalKey === 'archon' ? '??' : '0.4-0.8');
                var conf = GAME.veilLearnedCensor ? 'OMNIS-LITE' : 'VEIL-AR';
                arHtml = '<div class="enemy-ar full">' +
                    '<span class="ar-tag">' + threat + '</span>' +
                    '<span class="ar-stat">ONT ' + mass + '</span>' +
                    (e.traced ? '<span class="ar-lock">◆ TRACED</span>' : '<span class="ar-hint">○ FOCUS</span>') +
                    (e.armor ? '<span class="ar-stat">ARM ' + e.armor + '</span>' : '') +
                    '<span class="ar-conf">' + conf + '</span>' +
                    '</div>';
            }
        }

        // FIX: Progressive AR — veil 0 raw shows no intent/hp/ar, just name + sprite (user says battle UI shows too much too early)
        var intentHtml = '';
        if (veil >= 2 && !isDead && !e.isAnchor && e.nextMove) {
            var moveLbl = e.nextMove.label || 'ATTACK';
            var moveHits = (e.nextMove.hits && e.nextMove.hits > 1) ? (' ×' + e.nextMove.hits) : '';
            var moveImpact = (e.nextMove.guardImpact !== undefined) ? e.nextMove.guardImpact : 1;

            intentHtml = '<div class="battle-intent">' +
                '<span class="intent-label">INTENT: ' + escapeHtml(moveLbl) + moveHits + '</span>' +
                '<span class="intent-impact">IMPACT ' + moveImpact + '</span>' +
                '</div>';
        }

        var persistentBracketHtml = alliedField && e.kesslerBracketed && !isDead ? '<div class="persistent-blue-bracket" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' : '';
        html += '<div data-enemy-index="' + i + '" class="' + slotClass + (alliedField && e.kesslerBracketed && !isDead ? ' ally-bracketed' : '') + '" role="button" tabindex="' + (isDead ? '-1' : '0') + '" aria-label="Target ' + escapeHtml(displayName) + '" onclick="GAME.selectEnemy(' + i + '); render();" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();GAME.selectEnemy(' + i + ');render();}">' +
            persistentBracketHtml + reticleHtml + fixationIconHtml +
            '<div class="enemy-name">' + escapeHtml(displayName) + '</div>' +
            intentHtml +
            visual +
            arHtml +
            hpHtml +
            '<div class="token-row">' + tokensHtml + '</div>' +
            seamHtml +
            '</div>';
    }
    return html;
}


/* =========================
   ACTIONS — dynamically builds 2-col grid from unlocked skills.
   ========================= */
function actionButton(cls, name, sub, fn, disabled, locked) {
    var unavailable = !!(disabled || locked);
    var aria = unavailable ? ' aria-disabled="true"' : '';
    var call = unavailable ? '' : (fn + " AUDIO.play('click'); render();");
    return '<button class="' + cls + (locked ? ' btn-turn-locked' : '') + '"' + aria + ' data-action-name="' + escapeHtml(name) + '" onclick="' + call + '">' +
        '<span class="action-name">' + name + '</span>' + (sub ? '<span class="action-sub">' + sub + '</span>' : '') + '</button>';
}

function getActionHelp(name, cls) {
    var n = String(name || '').toUpperCase();
    var c = String(cls || '');
    if (n.indexOf('DISMANTLE') >= 0 || c.indexOf('btn-dismantle') >= 0) return {title:'SEVER: DISMANTLE',meta:'+3 DEBT · LEAVES ONE LAYER OF CUT ASH',body:'Repeatable fixed cut along the Traced fault. Respects armor. Best for soft targets, finishing, rare LCK EX Black Flash convergence, and building Furnace without overcommitting.'};
    if (n.indexOf('CLEAVE') >= 0 || c.indexOf('btn-cleave') >= 0) return {title:'SEVER: CLEAVE',meta:'+7 DEBT · MUST READ THE TARGET AGAIN',body:'Committed adaptive cut. Bypasses and strips armor, scales with target mass. It can enter rare LCK EX Black Flash convergence, then must finish reading the target before it can be used again.'};
    if (n.indexOf('WEB') >= 0 || c.indexOf('btn-web') >= 0) return {title:'SEVER: WEB',meta:'+10 DEBT · TWO RESIDUE LAYERS · LATTICE SETTLES 3 TURNS',body:'Cuts the relationships across the whole field. Webs every enemy for two turns, lowers output, shortens barrages, grounds field moves, breaks Overtime cadence, and loosens one pre-lock Somnus Fixation stack.'};
    if (n.indexOf('FURNACE') >= 0 || n === 'OPEN' || c.indexOf('btn-furnace') >= 0 || c.indexOf('btn-true') >= 0) return {title:'FURNACE (OPEN)',meta:'+18 DEBT · THREE RESIDUE LAYERS REQUIRED',body:'Thermobaric Anti-Magic release across every living enemy. Resets Cut Ash. Fast, loud, highly visible, and capable of structural collateral even when the targets die.'};
    if (c.indexOf('utility-hellstep') >= 0 || n.indexOf('HELLSTEP') >= 0 || n.indexOf('COOLDOWN') >= 0) return {title:'HELLSTEP',meta:'+12 DEBT · 2 ACTIONS · 3-ROUND RECOVERY',body:'Somnus loans Sosa movement and timing. Stabilizes aggressive execution but fries his nervous system afterward. Cannot be refreshed while active or recovering.'};
    if (c.indexOf('utility-stin') >= 0 || n.indexOf('SYSTEM CALL') >= 0 || n.indexOf('CALLING') >= 0) return {title:'SYSTEM CALL: STÍN',meta:'CONTEXTUAL · ONE WILLING RESPONDER',body:'Opens a real call. It cannot compel an answer. The effect depends on who chooses to respond and what they actually provide.'};
    if (c.indexOf('utility-true') >= 0 || n.indexOf('SEVER: TRUE') >= 0) return {title:'SEVER: TRUE',meta:'JUDGMENT CUT · TRACE + HELLSTEP + A KNOWN FAULT',body:'A cut is also a judgment about what deserves to break and what must remain. Power cannot answer that for Sosa.'};
    if (n === 'REFUSE' || c.indexOf('btn-refuse') >= 0) return {title:'REFUSE',meta:'EARLY ONLY · BEFORE DIRECTION',body:'Sosa cannot command Somnus yet. He only refuses collapse while the familiar decides how to protect him and what violence follows.'};
    if (n === 'ANCHOR') return {title:'ANCHOR',meta:'GRAVEFRAME · RESTORE CONTROL',body:'Sosa holds an ordinary fact about himself and pulls one hand back onto the wheel.'};
    if (n === 'STEER') return {title:'STEER',meta:'GRAVEFRAME · FOCUSED CUT',body:'Force Somnus to preserve Sosa’s target priority instead of choosing the broadest destructive answer.'};
    if (n === 'LET HIM') return {title:'LET HIM',meta:'GRAVEFRAME · POWER / COLLATERAL',body:'Stop resisting Somnus. Massive damage, less Control, and a larger material bill for whatever survives nearby.'};
    if (n === 'REJECT') return {title:'REJECT',meta:'GRAVE FIELD GUARD',body:'The Grave denies external authority for one exchange. This is not the early Refuse command.'};
    if (n === 'SEVER') return {title:'THE GRAVE: SEVER',meta:'FIELD CUT · AFTERMATH +1',body:'The active Grave cuts through a designated target and adds to the civic and ecological aftermath.'};
    if (n === 'RELEASE') return {title:'RELEASE',meta:'END FIELD',body:'Collapse the Grave deliberately before time, integrity, or consequence chooses the ending.'};
    return {title:name || 'ACTION',meta:'COMBAT CODEX',body:'No additional field notes available.'};
}

function openActionHelp(name, cls) {
    GAME.actionHelp = getActionHelp(name, cls);
    if (AUDIO) AUDIO.play('open');
    render();
}
function closeActionHelp() { GAME.actionHelp = null; render(); }
function renderActionHelp() {
    var h = GAME.actionHelp;
    if (!h) return '';
    return '<div class="action-help-overlay" role="dialog" aria-modal="true" aria-label="Combat action explanation" onclick="event.stopPropagation();closeActionHelp();">' +
        '<div class="action-help-sheet" onclick="event.stopPropagation();"><div class="action-help-kicker">YPSILON VEIL // HELD FOCUS</div>' +
        '<div class="action-help-title">' + escapeHtml(h.title) + '</div><div class="action-help-meta">' + escapeHtml(h.meta) + '</div>' +
        '<div class="action-help-body">' + escapeHtml(h.body) + '</div><button class="action-help-close" onclick="closeActionHelp();">CLOSE</button></div></div>';
}

function renderUtilityActions() {
    if ((GAME.graveState && GAME.graveState.active) || (GAME.coffinState && GAME.coffinState.active)) return '';
    var preName = !GAME.player.unlocked.dismantleNamed && !GAME.player.unlocked.cleave && !GAME.player.unlocked.web;
    if ((GAME.tutorial && GAME.tutorial.active) || preName) return '';
    var locked = !!GAME.turnLock;
    var html = '<div class="utility-actions">';

    if (GAME.canSeverTrue && GAME.canSeverTrue()) {
        html += actionButton('utility-btn utility-true', 'SEVER: TRUE', 'JUDGMENT CUT', 'GAME.playerSeverTrue();', false, locked);
    }
    if (GAME.player.unlocked.hellstep) {
        var hDisabled = GAME.hellstepActive || GAME.hellstepCooldown > 0;
        var hName = GAME.hellstepActive ? ('HELLSTEP ' + (GAME.hellstepActionsLeft || 0)) : (GAME.hellstepCooldown > 0 ? ('COOLDOWN ' + GAME.hellstepCooldown) : 'HELLSTEP');
        html += actionButton('utility-btn utility-hellstep', hName, 'OVERDRIVE', 'GAME.playerHellstep();', hDisabled, locked);
    }
    if (GAME.canEmergencyCall && GAME.canEmergencyCall()) {
        html += actionButton('utility-btn utility-stin', 'SYSTEM CALL', 'OPEN CHANNEL', 'GAME.beginEmergencyCall();', false, locked);
    } else if (GAME.supportState && GAME.supportState.callPending) {
        html += actionButton('utility-btn utility-stin', 'CALLING…', GAME.supportState.responder || 'NETWORK', '', true, locked);
    }
    html += '</div>';
    return html === '<div class="utility-actions"></div>' ? '' : html;
}

function renderActions() {
    var locked = !!GAME.turnLock;
    if (GAME.graveState && GAME.graveState.active) {
        return actionButton('btn-grave-sever','SEVER','FIELD CUT','GAME.graveSever();',false,locked) +
               actionButton('btn-grave-refuse','REJECT','FIELD GUARD','GAME.graveRefuse();',false,locked) +
               actionButton('btn-grave-release','RELEASE','END FIELD','GAME.graveRelease();',false,locked);
    }
    if (GAME.coffinState && GAME.coffinState.active) {
        return actionButton('btn-coffin-anchor','ANCHOR','RESTORE CONTROL','GAME.coffinAnchor();',false,locked) +
               actionButton('btn-coffin-steer','STEER','FOCUSED CUT','GAME.coffinSteer();',false,locked) +
               actionButton('btn-coffin-lethim','LET HIM','POWER / COLLATERAL','GAME.coffinLetHim();',false,locked);
    }
    var preName = !GAME.player.unlocked.dismantleNamed && !GAME.player.unlocked.cleave && !GAME.player.unlocked.web;
    var firstRefusalOnly = GAME.currentEncounterKey === 'tutorial_1' && GAME.tutorial && GAME.tutorial.active;
    if (firstRefusalOnly || (preName && !GAME.player.unlocked.dismantle)) {
        return actionButton('btn-refuse','REFUSE','STAY CONSCIOUS','GAME.playerRefuse();',false,locked) +
               actionButton('btn-back','…','THE SHADOW ACTS','',true,locked);
    }
    if (preName) {
        return actionButton('btn-refuse','REFUSE','STAY CONSCIOUS','GAME.playerRefuse();',false,locked) +
               actionButton('btn-dismantle btn-unnamed-cut','UNNAMED CUT','POINT · SOMNUS MOVES','GAME.playerDismantle();',false,locked);
    }
    var html = '';
    if (GAME.player.unlocked.dismantle && GAME.player.unlocked.dismantleNamed) {
        var dDepth = GAME.selectedEnemy && !GAME.selectedEnemy.dead ? (GAME.selectedEnemy.dismantleDepth || 0) : 0;
        var dSub = dDepth > 0 ? ('TRACE DEPTH ' + dDepth + '/3 · NEXT CUT +' + (dDepth === 1 ? '20%' : '50%')) : 'LOW DEBT · RESIDUE +1';
        html += actionButton('btn-dismantle','SEVER: DISMANTLE',dSub,'GAME.playerDismantle();',false,locked);
    }
    if (GAME.player.unlocked.cleave) {
        var cleaveCd = GAME.cleaveCooldown || 0;
        html += actionButton('btn-cleave',cleaveCd > 0 ? 'CLEAVE RECALIBRATING' : 'SEVER: CLEAVE',cleaveCd > 0 ? 'USE PRECISION / FIELD' : 'COMMITTED · BREAK ARMOR','GAME.playerCleave();',cleaveCd > 0,locked);
    }
    if (GAME.player.unlocked.web) {
        var webCd = GAME.webCooldown || 0;
        var webSub = GAME.autonomyDrift > 0 && !GAME.targetLockedBySomnus ? ('BROADEN PRIORITY · FIXATION ' + GAME.autonomyDrift + '/3') : (GAME.currentEncounterKey === 'dross_overtime' ? 'BREAK ROUTINE · SAT +2' : 'FIELD CONTROL · SAT +2');
        html += actionButton('btn-web',webCd > 0 ? ('WEB CD ' + webCd) : 'SEVER: WEB',webCd > 0 ? 'LATTICE SETTLING' : webSub,'GAME.playerWeb();',webCd > 0,locked);
    }
    if (GAME.player.unlocked.furnace) {
        var sat = GAME.furnaceSaturation || 0;
        var ready = sat >= 3;
        var furnaceSub = ready
            ? '<span class="furnace-open-kicker">FURNACE READY</span>' + renderResiduePips(sat, true) + '<span class="furnace-open-note">RELEASE ALL TARGETS</span>'
            : renderResiduePips(sat, true) + '<span class="furnace-sealed-note">APERTURE SEALED · ' + sat + '/3</span>';
        html += actionButton(ready ? 'btn-true btn-furnace-open' : 'btn-furnace-locked',ready ? 'OPEN' : 'FURNACE',furnaceSub,'GAME.playerFurnace();',!ready,locked);
    }
    return html;
}


/* =========================
   LOG
   ========================= */
function renderLog(limit) {
    var html = '';
    var entries = GAME.log.slice(-(limit || 6));
    for (var i = 0; i < entries.length; i++) {
        html += '<div class="log-entry ' + getLogClass(entries[i]) + '">' + escapeHtml(entries[i]) + '</div>';
    }
    return html;
}


/* =========================
   END SCREENS
   ========================= */
function renderWin() {
    var subtitle = 'The field releases. Sosa is still standing.';
    var badge = 'BATTLE CLEAR';
    var title = 'VICTORY';
    var cfg = DATA.battleDialogue && DATA.battleDialogue[GAME.currentEncounterKey];
    if (cfg && cfg.victory) {
        badge = cfg.victory.badge || badge;
        title = cfg.victory.title || title;
        subtitle = cfg.victory.quote || subtitle;
    }
    if (GAME.currentEncounterKey === 'act5_hound_battle' && GAME.worldFlags && GAME.worldFlags.act5Coffin) {
        var record = GAME.worldFlags.act5Coffin;
        subtitle = 'GRAVEFRAME RECORD // CONTROL ' + record.control + '/3 // COLLATERAL ' + record.collateral +
            '<br>ANCHOR ' + record.anchorUses + ' // STEER ' + record.steerUses + ' // LET HIM ' + record.letHimUses;
    }
    var psyClass = getBattlePsyClass(GAME.currentEncounterKey);
    var hp = GAME.player ? Math.max(0, GAME.player.hp) : 0;
    var debt = GAME.player ? Math.round(GAME.player.debt || 0) : 0;
    var turns = GAME.battleTurnCount || 0;
    var banter = DATA.victoryBanter && DATA.victoryBanter[GAME.currentEncounterKey];
    var banterHtml = '';
    if (banter) {
        var banterSeed = turns + debt + (GAME.encountersCleared || 0);
        var sosaQuip = banter.sosa && banter.sosa.length ? banter.sosa[banterSeed % banter.sosa.length] : '';
        var somnusVictoryMoments = {tutorial_1:1,act2_alone_dross:1,act3_grief_battle:1,act3_hunt_battle:1,dross_chime_base:1,dross_chime:1,kessler_rescue_swarm:1,archon_fight:1,censor_enc:1,act5_hound_battle:1};
        var somnusReply = somnusVictoryMoments[GAME.currentEncounterKey] && banter.somnus && banter.somnus.length ? banter.somnus[(banterSeed + 1) % banter.somnus.length] : '';
        banterHtml = '<div class="victory-banter">' +
            (sosaQuip ? '<div class="victory-banter-line sosa"><b>SOSA</b><span>“' + escapeHtml(sosaQuip) + '”</span></div>' : '') +
            (somnusReply ? '<div class="victory-banter-line somnus"><b>' + (GAME.somnusNamed ? 'SOMNUS' : 'THE SHADOW') + '</b><span>' + escapeHtml(somnusReply) + '</span></div>' : '') +
            '</div>';
    }
    var reward = GAME.lastBattleReward;
    var rewardHtml = reward ? '<div class="victory-reward">' +
        '<div class="victory-exp"><b>' + (reward.exp > 0 ? ('FIELD EXP +' + reward.exp) : 'NO FIELD EXP') + '</b><span>FIELD LV ' + reward.level + ' · TOTAL ' + reward.total + '</span></div>' +
        (reward.found ? '<div class="victory-found"><b>RECOVERED</b><span>' + escapeHtml(reward.found) + '</span></div>' : '') +
        (reward.lesson ? '<div class="victory-lesson">' + escapeHtml(reward.lesson) + '</div>' : '') +
        '</div>' : '';
    var fallen = (GAME.enemies || []).find(function(e){ return !e.isAnchor; });
    var foeHtml = '';
    if (fallen) {
        var victoryStructural = renderStructuralPlaceholder(fallen, true);
        var foeKey = getEnemyAssetKey(fallen);
        if (victoryStructural) foeHtml = victoryStructural;
        else if (foeKey !== 'hound') foeHtml = '<img src="assets/' + foeKey + '.png" alt="" class="victory-foe-img">';
        else foeHtml = '<div class="victory-foe-placeholder">HOUND</div>';
    }
    return '<div class="screen end-screen victory-screen active">' +
        '<div class="victory-psy battle-psy ' + psyClass + '"><span class="psy-layer one"></span><span class="psy-layer two"></span></div>' +
        '<div class="end-wrap">' +
        '<div class="victory-sigil">' + foeHtml + '<span>◆</span></div>' +
        '<div class="end-badge">' + escapeHtml(badge) + '</div>' +
        '<div class="end-msg">' + escapeHtml(title) + '</div>' +
        '<div class="end-sub">' + subtitle + '</div>' +
        banterHtml + rewardHtml +
        '<div class="victory-stats"><span>HP ' + hp + '</span><span>DEBT ' + debt + '%</span><span>ACTIONS ' + turns + '</span></div>' +
        '<div class="end-rule"></div>' +
        '<button class="btn-start victory-continue" onclick="AUDIO.play(\'open\');GAME.advanceAfterWin();">CONTINUE</button>' +
        '</div></div>';
}

function renderLose() {
    return '<div class="screen end-screen active">' +
        '<div class="end-wrap">' +
        '<div class="end-badge">SYSTEM FAILURE</div>' +
        '<div class="end-msg" style="color:#ef4444;">DEFEATED</div>' +
        '<div class="end-sub">Sosa drops before the line can stabilize.<br><span style="opacity:0.7;font-size:0.85em;">Retry restores HP. Debt scar remains.</span></div>' +
        '<div class="end-rule"></div>' +
        '<button class="btn-start" onclick="GAME.retryBattle();AUDIO.resume();">RETRY</button>' +
        '</div></div>';
}


/* =========================
   UTILITIES
   ========================= */
function renderSceneCG(scene) {
    if (!scene || !scene.cg) return '';
    var pos = scene.cgPos || 'center center';
    return '<div class="story-cg-frame">' +
        '<img class="story-cg-img" src="' + getCgAssetPath(scene.cg) + '" alt="" style="object-position:' + pos + ';" onerror="this.parentNode.style.display=\'none\'">' +
        '</div>';
}

function getStorySpeakerType(speaker) {
    if (!speaker || speaker === 'Narrator' || speaker === 'System') return 'narrator';
    if (speaker === 'Sosa') return 'sosa';
    var entity = { 'The Cold':1, 'Pall':1, 'Frost Shadows':1, 'Frost Pack':1, 'Wire-Jaw':1, 'Concrete Thing':1, 'Work Heap':1, 'Grief Residue':1, 'Knell':1, 'Spall':1, 'Slag':1, 'Archon':1, 'The Condemned Witness':1, 'Egregore Hound':1 };
    if (entity[speaker]) return 'entity';
    return 'other';
}
function getStorySpeakerProfile(speaker) {
    if (!speaker || speaker === 'Narrator' || speaker === 'System') return 'narrator';
    if (speaker === 'Sosa') return 'sosa';
    if (speaker === 'Utica Girl') return 'utica';
    if (speaker === 'Goth Baddie') return 'goth';
    if (speaker === 'Elias Kessler' || speaker === 'Kessler') return 'kessler';
    if (/Shelter Worker|Volunteer|Case Manager|Municipal Clerk|Worker/.test(speaker)) return 'civic';
    if (/Transit Security|Street Predator/.test(speaker)) return 'street-human';
    if (/The Cold|Pall|Frost Shadow|Frost Pack/.test(speaker)) return 'pall';
    if (/Wire-Jaw|Knell|Relay/.test(speaker)) return 'knell';
    if (/Concrete Thing|Spall|Atlas/.test(speaker)) return 'spall';
    if (/Work Heap|Slag|Overtime/.test(speaker)) return 'slag';
    if (/Condemned Witness|Archon/.test(speaker)) return 'archon';
    if (/Censor|Egregore Hound/.test(speaker)) return 'egregore';
    if (/Grief/.test(speaker)) return 'grief';
    return 'human';
}

function getSpeakerAvatar(scene, speakerDisplay, borderColor) {
    if (speakerDisplay === 'Sosa') {
        return '<img class="story-avatar-img" src="assets/sosa_dialogue.jpg" alt="Sosa">';
    }
    var assets = {
        'The Cold':'rime', 'Pall':'rime', 'Frost Shadows':'rime',
        'Wire-Jaw':'chime', 'Concrete Thing':'spall', 'Work Heap':'slag',
        'Knell':'chime', 'Spall':'spall', 'Slag':'slag',
        'Archon':'archon', 'The Condemned Witness':'archon',
        'Elias Kessler':'censor_scout', 'Censor Scout':'censor_scout',
        'Transit Security':'transit_security', 'Street Predator':'street_predator'
    };
    if (assets[speakerDisplay]) {
        return '<img class="story-avatar-img entity-avatar-img" src="assets/' + assets[speakerDisplay] + '.png" alt="' + escapeHtml(speakerDisplay) + '" onerror="this.style.display=\'none\';">';
    }
    if (speakerDisplay === 'Egregore Hound') {
        return '<div class="vn-entity-placeholder hound"><span>HOUND</span></div>';
    }
    return '<div class="vn-avatar-silhouette" style="--avatar-accent:' + borderColor + ';border-color:' + borderColor + ';"><span></span><i></i></div>';
}

function renderPfpFor(pfp, color) {
    var bg = color || '#555';
    var key = (pfp || 'system').toLowerCase();

    // Only explicit sosa key uses real PFP art — "black" is a generic dark solid for other users
    if (key === 'sosa') {
        return '<img src="assets/pfp_sosa.jpg" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.outerHTML=\'<div class=\\\'pfp-solid\\\' style=\\\'background:' + bg + ';\\\'></div>\'">';
    }

    return '<div class="pfp-solid" title="' + key + '" style="background:' + bg + ';"></div>';
}

var TERM_GLOSSARY = {
    'Somnus': {rank:'BOUND FAMILIAR', body:'The black guardian attached to Sosa. Somnus converts borrowed mana into Anti-Magic, protects its host automatically, and increasingly chooses how survival happens.'},
    'Ypsilon Veil': {rank:'MYSTIC CODE // PROVISIONAL', body:'Attuned consumer earbuds that filter spiritual interference and help Sosa hold one loaded fault in focus. They reveal and translate; they do not supply power.'},
    'Trace': {rank:'FALSE EYES // DESIGNATION', body:'Sosa resolves one loaded fault and commits it as Somnus’s priority. Candidate pressure may be broad, but Trace keeps the visible line narrow.'},
    'Sever: Dismantle': {rank:'PRECISION SEVER', body:'A fixed Anti-Magic cut through the currently Traced fault. Repeating it on one target deepens the Read and strengthens the third Breakpoint cut.'},
    'Black Flash': {rank:'LCK EX // CONVERGENCE', body:'A black-violet impact produced when body, target, borrowed mana, Somnus, and environment align inside an impossible interval. Sosa cannot perform it at will.'},
    'Sever: Web': {rank:'FIELD CONTROL', body:'A lattice of shallow cuts across bodies and the relationships connecting them. Web lowers output, shortens barrages, grounds field actions, and pins shared routes.'},
    'Cut Ash': {rank:'FIELD REMAINDER', body:'Powdered matter, released pressure, and Anti-Magic left suspended by Sever. Three aperture-shaped layers can support Furnace after Sosa learns how to open it.'},
    'Dross': {rank:'TYPE-I', body:'A scavenger body condensed from repeated human harm, neglected material, and ambient mana. Destroying the body does not repair the condition that produced it.'},
    'Pall': {rank:'DROSS // COLD', body:'Cold that covers movement and surrendered warmth until stopping feels proper. Sosa first calls these bodies cold things or Frost Shadows.'},
    'Spall': {rank:'DROSS // IMPACT', body:'An impact body made from fragments, unsafe structures, and anticipatory flinch. It treats damage as something the victim should have avoided.'},
    'Knell': {rank:'DROSS // UNANSWERED SIGNAL', body:'A communication scavenger assembled from dead devices and the need for a reply. Sosa’s field name is Wire-Jaw.'},
    'Slag': {rank:'DROSS // CONTINUANCE', body:'Industrial and domestic waste compacted around the demand to keep working after reasonable endurance has ended.'},
    'Molt': {rank:'TYPE-II CROSSING', body:'The point where one Dross ecology links multiple bodies, rooms, channels, or routines and begins acting in plural.'},
    'Nifl': {rank:'PALL MOLT', body:'Several Pall bodies sharing one heat-map across doors, vents, clothing, and exposed skin. Sosa calls it Frost Group Chat.'},
    'Atlas': {rank:'SPALL MOLT', body:'A building-scale impact router that selects which room, wall, or bearer must carry transferred force.'},
    'Relay': {rank:'KNELL MOLT', body:'A Knell that routes many unanswered channels through one body and can imitate trusted voices without understanding mutual conversation.'},
    'Overtime': {rank:'SLAG MOLT', body:'Workers, clocks, routes, machinery, and policy enforcing one continuing shift as a single ecology.'},
    'Archon': {rank:'TYPE-III', body:'A territorial intelligence with a material anchor, coherent voice, social surrender, and a world-law. It is not merely a large Dross.'},
    'Debt': {rank:'RESIDUAL SURVIVAL PRESSURE', body:'What power, injury, attention, and unresolved exchange leave attached to Sosa. Debt is not mana; high Debt strengthens Somnus while narrowing Sosa’s agency.'},
    'Formalcraft': {rank:'EGREGORE STANDARD', body:'Prefab institutional magecraft expressed through repeatable blue seals, brackets, protocols, and field grids.'},
    'Omnis-OS': {rank:'EGREGORE ANALYSIS', body:'A professional scanner that classifies bodies, mana, ontic mass, and unauthorized phenomena. The Veil later steals a crude fragment of its visual language.'},
    'Furnace (Open)': {rank:'THERMOBARIC RELEASE', body:'Somnus opens its horizontal aperture and ignites three layers of Cut Ash across the field. Fast, all-target, and structurally dangerous.'},
    'System Call': {rank:'WILLING SUPPORT CHANNEL', body:'Sosa opens a real call and risks asking to be witnessed. It cannot compel an answer; the effect depends on who freely responds.'},
    'Stín': {rank:'PRIVATE MYTH NAME', body:'Sosa’s name for the immense, unorganized relationship pattern around him. It is not a faction, roster of donors, or magical organization.'},
    'Graveframe': {rank:'THRESHOLD CONTROL TRANSFER', body:'Somnus encloses and pilots Sosa at maximum Debt. It is an emergency body-state, not the completed Reality Marble.'}
};
var TERM_INTRO_SCENES = {
    act1_s7__p2:['Somnus'],
    act2_s4c__p4:['Ypsilon Veil'],
    act2_name_dismantle:['Trace','Sever: Dismantle'],
    act3_resonance_aftermath:['Black Flash'],
    act3_nifl_web:['Sever: Web'],
    act3_web_residue:['Cut Ash'],
    act4_kessler_taxonomy:['Dross','Pall','Spall','Knell','Slag','Archon'],
    act4_kessler_types:['Molt','Nifl','Atlas','Relay','Overtime'],
    act4_sosa_debt_name:['Debt'],
    act4_s4:['Formalcraft'],
    act4_s9__p3:['Omnis-OS'],
    act4_name_furnace:['Furnace (Open)'],
    act3_s6_call__tap2:['System Call','Stín'],
    act5_name_graveframe:['Graveframe']
};
function escapeRegex(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function formatTermMarkup(raw) {
    var value=String(raw==null?'':raw), sceneKey=GAME.currentScene&&GAME.currentScene.key;
    if (!GAME.termDiscoveries) GAME.termDiscoveries={};
    var introductions=TERM_INTRO_SCENES[sceneKey]||[];
    for(var i=0;i<introductions.length;i++) if(!GAME.termDiscoveries[introductions[i]]) GAME.termDiscoveries[introductions[i]]=sceneKey;
    var terms=Object.keys(GAME.termDiscoveries).filter(function(term){return TERM_GLOSSARY[term];}).sort(function(a,b){return b.length-a.length;});
    if(!terms.length) return escapeHtml(value).split('\n').join('<br>');
    var pattern=new RegExp('(?<![\\p{L}\\p{N}_])('+terms.map(escapeRegex).join('|')+')(?![\\p{L}\\p{N}_])','giu'),parts=[],last=0,match;
    while((match=pattern.exec(value))!==null){
        if(match.index>last) parts.push(escapeHtml(value.slice(last,match.index)).split('\n').join('<br>'));
        var canonical=terms.find(function(term){return term.toLowerCase()===match[0].toLowerCase();})||match[0];
        var first=GAME.termDiscoveries[canonical]===sceneKey;
        parts.push('<span class="gloss-term '+(first?'first-read':'known-read')+'" role="button" tabindex="0" data-term="'+escapeHtml(canonical)+'" aria-label="Hold for definition: '+escapeHtml(canonical)+'">'+escapeHtml(match[0])+'</span>');
        last=match.index+match[0].length;
    }
    if(last<value.length) parts.push(escapeHtml(value.slice(last)).split('\n').join('<br>'));
    return parts.join('');
}
function openTermHelp(term){
    var info=TERM_GLOSSARY[term]; if(!info)return;
    GAME.termHelp={term:term,rank:info.rank,body:info.body};
    if(AUDIO)AUDIO.play('open'); render();
}
function closeTermHelp(){GAME.termHelp=null;render();}
function renderTermHelp(){
    var h=GAME.termHelp;if(!h)return '';
    return '<div class="term-help-overlay" role="dialog" aria-modal="true" aria-label="Definition: '+escapeHtml(h.term)+'" onclick="event.stopPropagation();closeTermHelp();"><div class="term-help-sheet" onclick="event.stopPropagation();"><div class="term-help-kicker">YPSILON GLOSS // HELD FOCUS</div><div class="term-help-title">'+escapeHtml(h.term)+'</div><div class="term-help-rank">'+escapeHtml(h.rank)+'</div><div class="term-help-body">'+escapeHtml(h.body)+'</div><button class="term-help-close" onclick="closeTermHelp();">CLOSE</button></div></div>';
}

function formatStoryText(raw, speakerType) {
    var s = String(raw == null ? '' : raw);
    var parts = [];
    var re = /(\([^)]*\)|“[^”]*”|"[^"]*")/g;
    var last = 0;
    function pushProse(value) {
        if (!value) return;
        var html = formatTermMarkup(value);
        parts.push('<span class="prose-text narration-text">' + html + '</span>');
    }
    var match;
    while ((match = re.exec(s)) !== null) {
        pushProse(s.slice(last, match.index));
        if (match[0].charAt(0) === '(') {
            parts.push('<span class="thought-text">' + formatTermMarkup(match[0]) + '</span>');
        } else {
            parts.push('<span class="speech-text speaker-' + escapeHtml(speakerType || 'other') + '">' + formatTermMarkup(match[0]) + '</span>');
        }
        last = match.index + match[0].length;
    }
    pushProse(s.slice(last));
    return parts.join('');
}

function escapeHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getVoidVariant(scene) {
    var key = scene && scene.key ? scene.key : '';
    if (scene && scene.bg === 'css_bg_formal') return 'void-formal';
    if (key.indexOf('act3_chime_base') === 0) return 'void-signal';
    if (key.indexOf('act3_relay') === 0) return 'void-depot';
    if (key.indexOf('act3_atlas_seed') === 0) return 'void-load';
    if (key.indexOf('act2_stair') === 0) return 'void-stairwell';
    if (key.indexOf('act1_bus_') === 0) return 'void-bus';
    if (key.indexOf('act2_alone_') === 0) return 'void-bedroom-frost';
    if (key.indexOf('act1_') === 0) return 'void-transit';
    if (key.indexOf('act2_') === 0 || key.indexOf('veil_react_partial') === 0 || key.indexOf('veil_react_full_hint') === 0) return 'void-room';
    if (key.indexOf('act3_') === 0) return 'void-grief';
    if (key.indexOf('act4_') === 0 || key.indexOf('veil_react_omnis') === 0) return 'void-formal';
    if (key.indexOf('act5_') === 0) return 'void-coffin';
    return 'void-default';
}

function getBgAssetPath(key) {
    if (!key || key === 'placeholder' || key === 'css_bg_void' || key === 'void') return 'css_bg_void';
    // Explicit extension map so placeholders never 404-mismatch
    var ext = {
        dart_station: 'jpg', ditch_predawn: 'jpg', laundromat_dawn: 'jpg',
        library_corner: 'jpg', utica_alley: 'jpg', wendys_midnight: 'jpg',
        dropin_center: 'jpg', tomra: 'png'
    };
    if (ext[key]) return 'assets/bg_' + key + '.' + ext[key];
    // Unknown key → animated void placeholder (better than broken <img>)
    return 'css_bg_void';
}

function getCgAssetPath(key) {
    var jpgKeys = {
        cg_mask_laundromat: true, cg_somnus_manifestation: true,
        cg_coffin_pilot: true, cg_reality_marble: true
    };
    if (jpgKeys[key]) return 'assets/' + key + '.jpg';
    return 'assets/' + key + '.png';
}

function getSceneBgPosition(scene, mode) {
    if (!scene) return 'center center';
    if (mode === 'battle' && scene.battleBgPos) return scene.battleBgPos;
    if (scene.bgPos) return scene.bgPos;
    return 'center center';
}

function getBattlePsyClass(key) {
    var map = {
        tutorial_1: 'psy-rime-awakening',
        act1_battle1: 'psy-rime', act1_battle2: 'psy-rime-deep', act2_alone_dross: 'psy-rime-hallway', act2_battle1: 'psy-rime-veil',
        tutorial_2: 'psy-human-security', human_hold: 'psy-human-security',
        dross_chime_base: 'psy-chime', dross_chime: 'psy-chime', dross_nifl: 'psy-rime-deep', dross_spall: 'psy-spall',
        street_predator_enc: 'psy-predator',
        act3_hunt_battle: 'psy-rime-deep', act3_hunt_battle2: 'psy-pressure', act3_grief_battle: 'psy-grief', dross_slag: 'psy-slag', act3_battle2: 'psy-pressure',
        act3_battle3: 'psy-witness', archon_fight: 'psy-witness', act6_finale: 'psy-witness',
        kessler_joint_hunt:'psy-spall', dross_overtime:'psy-slag', censor_enc: 'psy-censor', act5_hound_battle: 'psy-hound'
    };
    return map[key] || 'psy-default';
}

function getEncounterDisplayName(key) {
    if (!GAME.veilLearnedCensor) {
        var fieldNames = {
            act1_battle1:'COLD PACK', act1_battle2:'COLD PRESSURE',
            kessler_rescue_swarm:'COLD // WIRE // CONCRETE',
            dross_chime_base:'WIRE-JAW', dross_chime:'WIRE-JAW RELAY', dross_nifl:'FROST GROUP CHAT', dross_spall:'CONCRETE THING', dross_slag:'WORK HEAP', dross_overtime:'NEVERENDING SHIFT',
            act2_alone_dross:'HALLWAY COLD', act2_battle1:'FROST SWARM',
            act3_grief_battle:'GRIEF MONSTERS', act3_battle2:'MIXED MONSTERS', archon_fight:'MANY-EYED RUIN'
        };
        if (fieldNames[key]) return fieldNames[key];
    }
    var names = {
        tutorial_1: 'FIRST REFUSAL', tutorial_2: 'INTERCEPTION',
        act1_battle1: 'PALL SWARM', act1_battle2: 'PALL PRESSURE',
        human_hold: 'TRANSIT SECURITY', street_predator_enc: 'STREET PREDATOR',
        censor_enc: 'CENSOR SCOUT — THE SUIT',
        dross_slag: 'SLAG', dross_overtime:'OVERTIME', dross_chime_base: 'KNELL', dross_chime: 'KNELL RELAY', dross_nifl: 'NIFL', dross_spall: 'SPALL', kessler_rescue_swarm: 'MIXED CONVERGENCE', kessler_joint_hunt: 'ATLAS // JOINT CLEANUP',
        archon_fight: 'ARCHON',
        act2_alone_dross: 'HALLWAY PALL', act2_battle1: 'PALL SWARM',
        act3_hunt_battle: 'DRAINAGE NEST', act3_hunt_battle2: 'MIXED NEST', act3_grief_battle: 'GRIEF WEIGHT', act3_battle2: 'MONSTER PRESSURE',
        act3_battle3: 'ARCHON'
    };
    return names[key] || 'ENCOUNTER';
}

function renderPhoneStatusBar() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    if (m < 10) m = '0' + m;
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    var timeStr = h12 + ':' + m + ' ' + ampm;
    return '<div class="phone-statusbar">' +
        '<span class="phone-status-time">' + timeStr + '</span>' +
        '<span class="phone-status-icons">' +
            '<span class="phone-signal-bars"><span></span><span></span><span></span><span></span></span>' +
            '<span class="phone-battery"><span class="phone-battery-fill" style="width:72%;"></span></span>' +
        '</span>' +
        '</div>';
}

function getLogClass(text) {
    if (!text) return '';
    if (text.indexOf('CRITICAL') >= 0 || text.indexOf('SEVER: TRUE') >= 0) return 'critical';
    if (text.indexOf('Shattering') >= 0 || text.indexOf('SHATTERING') >= 0) return 'critical';
    if (text.indexOf('Trace') >= 0 || text.indexOf('TRACE') >= 0) return 'trace';
    if (text.indexOf('HELLSTEP') >= 0) return 'hellstep';
    if (text.indexOf('THRESHOLD') >= 0) return 'threshold';
    if (text.indexOf('UNLOCKED') >= 0) return 'unlock';
    if (text.indexOf('collapses') >= 0 || text.indexOf('clatters') >= 0) return 'human';
    if (text.indexOf('screams') >= 0) return 'human';
    if (text.indexOf('Somnus') >= 0 || text.indexOf('SOMNUS') >= 0) return 'somnus';
    return '';
}

function getEnemyAssetKey(enemy) {
    if (!enemy || !enemy.originalKey) return 'rime';
    if (enemy.originalKey === 'rime_weak' || enemy.originalKey === 'rime_weak_2' || enemy.originalKey === 'rime_nifl') return 'rime';
    if (enemy.originalKey === 'chime_relay') return 'chime';
    if (enemy.originalKey === 'spall_atlas') return 'spall';
    if (enemy.originalKey === 'slag_overtime') return 'slag';
    return enemy.originalKey;
}

function getEnemyFallbackClass(enemy) {
    if (!enemy) return 'dross';
    if (enemy.isAnchor) return 'anchor';
    if (enemy.originalKey === 'archon') return 'archon';
    if (enemy.originalKey === 'hound') return 'hound';
    if (enemy.isHuman) return 'human';
    return 'dross';
}

function getEnemyFallbackLabel(enemy) {
    if (!enemy || !enemy.name) return '?';
    if (enemy.isAnchor) return 'ANCH';
    var labels = {
        transit_security: 'SEC', street_predator: 'PRED',
        censor_scout: 'SCOUT', archon: 'ARCH', hound: 'HOUND',
        rime: 'PALL', rime_nifl: 'NIFL', rime_weak: 'PALL', rime_weak_2: 'PALL',
        slag: 'SLAG', chime: 'KNELL', spall: 'SPALL', spall_atlas:'ATLAS', slag_overtime:'OVERTIME'
    };
    return labels[enemy.originalKey] || enemy.name.toUpperCase().substring(0, 4);
}

function discordStatusLabel(status) {
    var s = (status || 'offline').toLowerCase();
    if (s === 'online') return 'Online';
    if (s === 'idle') return 'Idle';
    if (s === 'dnd') return 'Do Not Disturb';
    if (s === 'offline') return 'Offline';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getPhoneHardwareLabel(phoneClass) {
    // Kept for any legacy callers — never shown in Discord UI
    if (phoneClass === 'phone-motog5') return 'MOTO G 5G 2025';
    return 'GALAXY Z FLIP 5';
}

function bindEvents() {
    // Black Flash tap listener
    var app = document.getElementById('app');
    if (app && GAME.screen === 'battle') {
        app.onclick = function(e) {
            if (GAME.blackFlashWindowActive) {
                GAME.triggerBlackFlash();
                render();
            }
        };
        if (app.addEventListener) {
            var buttons = app.querySelectorAll ? app.querySelectorAll('.actions button[data-action-name],.utility-actions button[data-action-name]') : [];
            Array.prototype.forEach.call(buttons, function(btn) {
                var holdTimer = null;
                var held = false;
                btn.addEventListener('pointerdown', function() {
                    held = false;
                    holdTimer = setTimeout(function() {
                        held = true;
                        GAME._suppressActionClickUntil = Date.now() + 800;
                        openActionHelp(btn.getAttribute('data-action-name'), btn.className);
                    }, 520);
                });
                function cancelHold(){ if (holdTimer) clearTimeout(holdTimer); holdTimer = null; }
                btn.addEventListener('pointerup', cancelHold);
                btn.addEventListener('pointercancel', cancelHold);
                btn.addEventListener('pointerleave', cancelHold);
                btn.addEventListener('click', function(e) {
                    if (held || (GAME._suppressActionClickUntil || 0) > Date.now()) {
                        e.preventDefault(); e.stopImmediatePropagation(); held = false;
                    }
                }, true);
            });
        }
    }
    if (app && GAME.screen === 'story' && app.addEventListener) {
        var terms = app.querySelectorAll ? app.querySelectorAll('.gloss-term[data-term]') : [];
        Array.prototype.forEach.call(terms, function(termEl) {
            var termTimer = null;
            termEl.addEventListener('pointerdown', function(e) {
                termTimer = setTimeout(function() {
                    GAME._suppressStoryAdvanceUntil = Date.now() + 900;
                    openTermHelp(termEl.getAttribute('data-term'));
                }, 520);
            });
            function cancelTermHold(){ if(termTimer)clearTimeout(termTimer);termTimer=null; }
            termEl.addEventListener('pointerup',cancelTermHold);
            termEl.addEventListener('pointercancel',cancelTermHold);
            termEl.addEventListener('pointerleave',cancelTermHold);
            termEl.addEventListener('contextmenu',function(e){e.preventDefault();});
            termEl.addEventListener('keydown',function(e){
                if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();GAME._suppressStoryAdvanceUntil=Date.now()+500;openTermHelp(termEl.getAttribute('data-term'));}
            });
        });
    }
}

function getRosterName(handle) {
    var r = DATA.roster[handle];
    return r ? r.name : null;
}
function formatHandleName(handle) {
    if (!handle) return '';
    return handle.replace(/[_-]+/g, ' ').replace(/\b\w/g, function (m) { return m.toUpperCase(); });
}
function discordPfp(name, fallbackColor) {
    var init = name ? name.charAt(0).toUpperCase() : '?';
    return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:' + (fallbackColor || '#555') + ';border-radius:50%;font-weight:bold;font-size:16px;color:#fff;">' + init + '</div>';
}
function renderAuditScan() {
    return '<div class="screen audit-screen active" style="width:100%;height:100%;background:#000;position:relative;">' +
        '<iframe id="audit-iframe" src="cg_stats_scan.html" title="Omnis subject scan for Sosa" style="width:100%;height:100%;border:none;"></iframe>' +
        '<button class="btn-audit-continue" style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:100;padding:12px 24px;background:rgba(10,8,18,0.92);border:1px solid #38bdf8;color:#e0f2fe;font-family:monospace;font-weight:bold;letter-spacing:2px;border-radius:6px;cursor:pointer;box-shadow:0 0 15px rgba(56,189,248,0.4);" onclick="AUDIO.play(\'open\'); GAME.gotoScene(\'act4_s5\');">PROCEED AFTER AUDIT</button>' +
        '</div>';
}

function vnAvatar(speaker) {
    var color = '#4a4a5a';
    if (speaker && GAME.currentScene) color = GAME.currentScene.speakerColor || '#4a4a5a';
    return '<div class="vn-avatar-silhouette" style="border-color:' + color + ';"></div>';
}

if (typeof window !== 'undefined') {
    window.renderStory = renderStory;
    window.renderBattle = renderBattle;
    window.renderTitle = renderTitle;
    window.renderDebugPanel = renderDebugPanel;
}
if (typeof global !== 'undefined') {
    global.renderStory = renderStory;
    global.renderBattle = renderBattle;
    global.renderTitle = renderTitle;
    global.renderDebugPanel = renderDebugPanel;
}

