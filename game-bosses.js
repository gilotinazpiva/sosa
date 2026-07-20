/* =========================================================
   SOSA: THE GRAVE THAT WOULDN'T TAKE ME
   game-bosses.js — Boss Encounter Rules, Anchors & Territory Laws
   ========================================================= */

Object.assign(GAME, {
    getBossFieldStatusText: function() {
        if (!this.bossState) return "";
        var bs = this.bossState;
        if (bs.type === "archon") {
            return bs.fieldActive ? "FIELD ACTIVE — ARCHON BODY RESISTS SEVERANCE" : "FIELD BROKEN — THE BODY CAN DIE";
        } else if (bs.type === "censor") {
            return bs.fieldActive ? "FORMALCRAFT GRID — INTEGRITY " + bs.fieldIntegrity + "/" + bs.fieldMaxIntegrity : "FORMALCRAFT GRID COLLAPSED — KESSLER EXPOSED";
        } else if (bs.type === "hound") {
            return "PURSUIT PROTOCOL — CIRCUIT COMBUSTION ACTIVE";
        }
        return bs.fieldActive ? "FIELD ACTIVE" : "FIELD BROKEN";
    },

    isBossFieldActive: function() {
        return !!(this.bossState && this.bossState.fieldActive);
    }
});
