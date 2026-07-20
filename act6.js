/* =========================================================
   CHAPTER 6 — THE OTHER SIDE
   First complete conflict: evidence, responsibility, and the
   first aborted attempt at a cut that must preserve what matters.
   ========================================================= */

DATA.scenes.act6_teaser_end.nextAction = "gotoScene(\"act6_claim_notice\")";

Object.assign(DATA.scenes, {
    "act6_claim_notice": {
        key:"act6_claim_notice", mode:"vn", title:"JUNE 21 — SOMEBODY ELSE'S BILL", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"The case manager prints the city brief because my replacement phone keeps freezing. Stapled behind it is a tenant claim from the underpass apartments. Medical copay. Broken window. DENIED: NO VERIFIED CAUSAL EVENT.\n\nMy smaller miracle has somebody else's name under Amount Due.",
        nextAction:"gotoScene(\"act6_case_manager_claim\")"
    },
    "act6_case_manager_claim": {
        key:"act6_case_manager_claim", mode:"vn", title:"JUNE 21 — SOMEBODY ELSE'S BILL", speaker:"Case Manager", speakerColor:"#facc15", bg:"dropin_center",
        text:"“You said you witnessed the damage.”\n\nShe keeps one finger on the denial code.\n\n“A signed statement might reopen it. Might. But it puts your legal name, location, and contact number into the file. I need you to understand both halves before you volunteer.”",
        nextAction:"gotoScene(\"act6_claim_cost\")"
    },
    "act6_claim_cost": {
        key:"act6_claim_cost", mode:"vn", title:"THE SAFE LIE", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"Egregore already has my face. The city has my arrest. The shelter has my real name because beds require paperwork and paperwork requires blood sacrifice to the toner god.\n\nStill. One more database is one more place to be found. Staying quiet is finally the safe option. For me.",
        nextAction:"gotoScene(\"act6_portal_mirror\")"
    },
    "act6_portal_mirror": {
        key:"act6_portal_mirror", mode:"vn", title:"MIRRORED RECORD", speaker:"Narrator", speakerColor:"#94a3b8", bg:"css_bg_formal",
        text:"The claim portal refreshes without being touched. Beneath the denial code, a black thumbnail appears for half a second: Sosa's Omnis silhouette, copied twice and slightly out of register. In one corner, a neon-pink cat sticker clings to the scan frame.",
        nextAction:"gotoScene(\"act6_cat_sticker\")"
    },
    "act6_cat_sticker": {
        key:"act6_cat_sticker", mode:"vn", title:"MIRRORED RECORD", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_formal",
        text:"Kessler's daughter put that sticker on his terminal so it would look less evil.\n\nThe mirror copied the machine closely enough to copy her joke. Egregore isn't merely tracking me. It is wearing his record as a second skin and waiting inside any system that asks who caused the damage.",
        nextAction:"gotoScene(\"act6_two_seams\")"
    },
    "act6_two_seams": {
        key:"act6_two_seams", mode:"vn", title:"TWO SEAMS", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_formal",
        text:"Trace opens behind my eyes. Two fault lines cross the screen. One runs through Egregore's copied receiver graph. The other runs through the claim number, the glass stitches, and the only proof a tenant has that the wall did not attack her by itself.\n\nDismantle would cut both.",
        nextAction:"gotoScene(\"act6_first_true_attempt\")"
    },
    "act6_first_true_attempt": {
        key:"act6_first_true_attempt", mode:"vn", title:"THE CUT I CANNOT MAKE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_formal",
        text:"I set two fingers against the cracked screen. Hellstep wakes halfway, all needles and bad decisions. I try to define a cut that takes the parasite and leaves the testimony. Not stronger. True.\n\nSomnus angles every blade toward the easiest answer: erase the whole record.",
        nextAction:"gotoScene(\"act6_abort_cut\")"
    },
    "act6_abort_cut": {
        key:"act6_abort_cut", mode:"vn", title:"ATTEMPT 1 — ABORTED", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"I pull my hand away before the cut releases. The screen splits at the corner anyway. The mirrored thumbnail vanishes. The denial remains. So does the claim.\n\nGreat. My ultimate technique is almost breaking a government phone and then choosing paperwork.",
        nextAction:"gotoScene(\"act6_case_manager_return\")"
    },
    "act6_case_manager_return": {
        key:"act6_case_manager_return", mode:"vn", title:"ATTEMPT 1 — ABORTED", speaker:"Case Manager", speakerColor:"#facc15", bg:"dropin_center",
        text:"The case manager looks from the new crack to my face.\n\n“Did the form upset you?”\n\n“Deeply.”\n\n“That is the most normal thing you've said all morning.” She slides me a bus map. “You can submit a witness statement in person. You do not have to decide today.”",
        nextAction:"gotoScene(\"act6_utica_boundary\")"
    },
    "act6_utica_boundary": {
        key:"act6_utica_boundary", mode:"vn", title:"ASK, DON'T SUMMON", speaker:"Sosa", speakerColor:"#B060FF", bg:"dropin_center",
        text:"Utica Girl saw pieces of what happened. Calling her would make my emergency climb over the boundary she just set. I do not do it.\n\nInstead I open Top Ranked Gz and ask for information, not rescue. Growth, apparently, is typing a question without disguising it as a fire alarm.",
        nextAction:"gotoScene(\"act6_gz_route\")"
    },
    "act6_gz_route": {
        key:"act6_gz_route", mode:"phone", title:"Top Ranked Gz", messages:[
            {user:"sosa",text:"anybody know which bus gets me from the shelter to city hall? witness statement. not asking for money or a mission",self:true},
            {user:"bender",text:"bro fighting municipal dlc now. u want a call while u wait? serious offer",self:false},
            {user:"meki",text:"route 12 outbound. transfer at the hub. eat before you go. bring the denial paper and shelter mail for ID",self:false},
            {user:"ysl",text:"charge phone. screenshot route. your plan dies at 3 percent battery every time",self:false},
            {user:"sosa",text:"heard. thank u. asking instead of summoning like a domesticated warlock",self:true}
        ],
        nextAction:"gotoScene(\"act6_city_hall\")"
    },
    "act6_city_hall": {
        key:"act6_city_hall", mode:"vn", title:"JUNE 21 — IN PERSON", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Route 12 smells like wet coats and hot brakes. I miss the transfer once, eat the granola bar Meki bullied into the plan, and reach the municipal counter at 3:41 PM.\n\nNo bounded field. No boss music. Just bulletproof glass, a tired clerk, and a form asking what I saw.",
        nextAction:"gotoScene(\"act6_statement\")"
    },
    "act6_statement": {
        key:"act6_statement", mode:"vn", title:"WITNESS STATEMENT", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"I write that the wall, car, main, and windows were damaged during an assault beneath the overpass. I write that I was present. I do not write eight-foot Graveframe or anti-magic talons. Truth still has to fit inside boxes designed by people who think infrastructure fails one department at a time.",
        nextAction:"gotoScene(\"act6_clerk\")"
    },
    "act6_clerk": {
        key:"act6_clerk", mode:"vn", title:"WITNESS STATEMENT", speaker:"Municipal Clerk", speakerColor:"#93c5fd", bg:"css_bg_void",
        text:"The clerk reads it twice.\n\n“This is enough to reopen review. It is not approval.”\n\n“I know.”\n\n“You may be contacted.”\n\n“I know that too.”\n\nShe stamps RECEIVED across the denial code. For one ugly second, the ink shines the same blue as Kessler's brackets.",
        nextAction:"gotoScene(\"act6_conflict_result\")"
    },
    "act6_conflict_result": {
        key:"act6_conflict_result", mode:"vn", title:"WHAT DESERVES CUTTING", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"The tenant's claim is alive again. So is the trail to me. That is the exchange.\n\nThe cut failed because I asked Somnus to remove danger, not because I knew what deserved removal. If I ever make that line true, it cannot mean deleting every fact that hurts me.",
        nextAction:"gotoScene(\"act6_goth_call\")"
    },
    "act6_goth_call": {
        key:"act6_goth_call", mode:"vn", title:"INCOMING — VELVETCOFFIN", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"Outside, my phone rings. Her name fills the cracked half of the screen. Somnus leans toward the sound like hunger wearing my shadow.\n\nI answer before I can workshop a version of myself that deserves the call.\n\n“Alive,” I say. “Late. But alive.”",
        nextAction:"gotoScene(\"act6_goth_truth\")"
    },
    "act6_goth_truth": {
        key:"act6_goth_truth", mode:"vn", title:"NO PERFORMANCE", speaker:"Goth Baddie", speakerColor:"#fb7185", bg:"css_bg_void",
        text:"Her breath catches, then hardens.\n\n“Don't make that cute. You vanished for a month.”\n\n“I lost the apartment, got arrested, lost my job, and something used my body to kill the man hunting me. I hurt people near him. I have been sleeping at a men's shelter.”",
        nextAction:"gotoScene(\"act6_goth_answer\")"
    },
    "act6_goth_answer": {
        key:"act6_goth_answer", mode:"vn", title:"NO PERFORMANCE", speaker:"Goth Baddie", speakerColor:"#fb7185", bg:"css_bg_void",
        text:"Silence. Chipped black nail polish taps against her phone.\n\n“Okay. That is horrible. It is also the first answer you've given me that isn't shaped like an escape hatch.”\n\n“I have more.”\n\n“I know. You're going to tell me. Not tonight all at once, and not never.”",
        nextAction:"gotoScene(\"act6_first_conflict_end\")"
    },
    "act6_first_conflict_end": {
        key:"act6_first_conflict_end", mode:"vn", title:"CHAPTER 6 — OPEN FILE", speaker:"Sosa", speakerColor:"#B060FF", bg:"css_bg_void",
        text:"The claim is under review. Goth Baddie is still on the line, furious enough to stay honest. Utica Girl's boundary remains where she put it. The mirrored record knows my new number.\n\nI did not cut the danger away. I chose what had to remain.\n\nThat is not Sever: True. It may be the first requirement.",
        nextAction:"gotoTitle"
    }
});

/* Chapter 6 in-person dialogue ownership pass. */
Object.assign(DATA.scenes.act6_case_manager_return,{speaker:'Narrator',speakerColor:'#94a3b8',text:'The case manager looks from the new crack in the phone to Sosa’s face.',nextAction:'gotoScene("act6_case_manager_question")'});
Object.assign(DATA.scenes,{
 act6_case_manager_question:{key:'act6_case_manager_question',mode:'vn',title:'ATTEMPT 1 — ABORTED',speaker:'Case Manager',speakerColor:'#facc15',bg:'dropin_center',text:'“Did the form upset you?”',nextAction:'gotoScene("act6_case_manager_sosa")'},
 act6_case_manager_sosa:{key:'act6_case_manager_sosa',mode:'vn',title:'ATTEMPT 1 — ABORTED',speaker:'Sosa',speakerColor:'#B060FF',bg:'dropin_center',text:'“Deeply.”',nextAction:'gotoScene("act6_case_manager_answer")'},
 act6_case_manager_answer:{key:'act6_case_manager_answer',mode:'vn',title:'ATTEMPT 1 — ABORTED',speaker:'Case Manager',speakerColor:'#facc15',bg:'dropin_center',text:'“That is the most normal thing you’ve said all morning.” She slides him a bus map. “You can submit a witness statement in person. You do not have to decide today.”',nextAction:'gotoScene("act6_utica_boundary")'}
});
Object.assign(DATA.scenes.act6_clerk,{speaker:'Narrator',speakerColor:'#94a3b8',text:'The clerk reads the statement twice.',nextAction:'gotoScene("act6_clerk_first")'});
Object.assign(DATA.scenes,{
 act6_clerk_first:{key:'act6_clerk_first',mode:'vn',title:'WITNESS STATEMENT',speaker:'Municipal Clerk',speakerColor:'#93c5fd',bg:'css_bg_void',text:'“This is enough to reopen review. It is not approval.”',nextAction:'gotoScene("act6_clerk_sosa1")'},
 act6_clerk_sosa1:{key:'act6_clerk_sosa1',mode:'vn',title:'WITNESS STATEMENT',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I know.”',nextAction:'gotoScene("act6_clerk_second")'},
 act6_clerk_second:{key:'act6_clerk_second',mode:'vn',title:'WITNESS STATEMENT',speaker:'Municipal Clerk',speakerColor:'#93c5fd',bg:'css_bg_void',text:'“You may be contacted.”',nextAction:'gotoScene("act6_clerk_sosa2")'},
 act6_clerk_sosa2:{key:'act6_clerk_sosa2',mode:'vn',title:'WITNESS STATEMENT',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I know that too.”',nextAction:'gotoScene("act6_clerk_stamp")'},
 act6_clerk_stamp:{key:'act6_clerk_stamp',mode:'vn',title:'WITNESS STATEMENT',speaker:'Narrator',speakerColor:'#94a3b8',bg:'css_bg_void',text:'She stamps RECEIVED across the denial code. For one ugly second, the ink shines the same blue as Kessler’s brackets.',nextAction:'gotoScene("act6_conflict_result")'}
});
Object.assign(DATA.scenes.act6_goth_truth,{speaker:'Narrator',speakerColor:'#94a3b8',text:'Her breath catches, then hardens.',nextAction:'gotoScene("act6_goth_truth_line")'});
Object.assign(DATA.scenes,{
 act6_goth_truth_line:{key:'act6_goth_truth_line',mode:'vn',title:'NO PERFORMANCE',speaker:'Goth Baddie',speakerColor:'#fb7185',bg:'css_bg_void',text:'“Don’t make that cute. You vanished for a month.”',nextAction:'gotoScene("act6_goth_truth_sosa")'},
 act6_goth_truth_sosa:{key:'act6_goth_truth_sosa',mode:'vn',title:'NO PERFORMANCE',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I lost the apartment, got arrested, lost my job, and something used my body to kill the man hunting me. I hurt people near him. I have been sleeping at a men’s shelter.”',nextAction:'gotoScene("act6_goth_answer")'}
});
Object.assign(DATA.scenes.act6_goth_answer,{speaker:'Narrator',speakerColor:'#94a3b8',text:'Silence. Chipped black nail polish taps against her phone.',nextAction:'gotoScene("act6_goth_answer_first")'});
Object.assign(DATA.scenes,{
 act6_goth_answer_first:{key:'act6_goth_answer_first',mode:'vn',title:'NO PERFORMANCE',speaker:'Goth Baddie',speakerColor:'#fb7185',bg:'css_bg_void',text:'“Okay. That is horrible. It is also the first answer you’ve given me that isn’t shaped like an escape hatch.”',nextAction:'gotoScene("act6_goth_answer_sosa")'},
 act6_goth_answer_sosa:{key:'act6_goth_answer_sosa',mode:'vn',title:'NO PERFORMANCE',speaker:'Sosa',speakerColor:'#B060FF',bg:'css_bg_void',text:'“I have more.”',nextAction:'gotoScene("act6_goth_answer_final")'},
 act6_goth_answer_final:{key:'act6_goth_answer_final',mode:'vn',title:'NO PERFORMANCE',speaker:'Goth Baddie',speakerColor:'#fb7185',bg:'css_bg_void',text:'“I know. You’re going to tell me. Not tonight all at once, and not never.”',nextAction:'gotoScene("act6_first_conflict_end")'}
});
