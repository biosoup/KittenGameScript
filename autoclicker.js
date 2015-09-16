//AUTOPRAY
autoPray = setInterval(function() {
    var unicornsMAX = 20000;
    var origTab = gamePage.activeTabId;
    var faith = gamePage.resPool.get('faith');
    var unicorns = gamePage.resPool.get('unicorns');
 
    if (faith.value / faith.maxValue > 0.99) {
        gamePage.activeTabId = 'Religion'; gamePage.render();
        $(".btnContent:contains('Praise the sun')").click();
        gamePage.activeTabId = origTab; gamePage.render();
    }
    
    //Ziggurath Needed!
    if (unicorns.value > unicornsMAX) {
        gamePage.activeTabId = 'Religion'; gamePage.render();
        $(".btnContent:contains('Sacrifice Unicorns')").click();
        gamePage.activeTabId = origTab; gamePage.render();
    }
}, 10 * 1000);
 
//AUTO OBSERVATORY
starClick = setInterval(function() { $("#gameLog").find("input").click(); }, 1 * 1000);
 
//AUTOCRAFT
autoCraft = setInterval(function() {
    var steelMAX = 20000;
    var alloyMAX = 5000;
    var alloyMIN = 2500;
    
    var gearMIN = 100000;
    
    var resources = [
        ["wood",     "beam" ],
        ["minerals", "slab" ],
        ["coal",     "steel"],
        ["iron",     "plate"]
       
    ];
 
    for (var i = 0; i < resources.length; i++) {
        var curRes = gamePage.resPool.get(resources[i][0]);
        if (curRes.value / curRes.maxValue > 0.99
         && gamePage.workshop.getCraft(resources[i][1]).unlocked) {
            if(curRes.maxValue>10000000) { //10Mil
                gamePage.craft(resources[i][1], 1000);
            } else if(curRes.maxValue>1000000) { //1Mil
                gamePage.craft(resources[i][1], 100);
            } else if(curRes.maxValue>10000) { //10tisic
                gamePage.craft(resources[i][1], 5);
            } else {
                gamePage.craft(resources[i][1], 1);
            }
        }
    }
    
    if (gamePage.resPool.get("titanium").value / gamePage.resPool.get("titanium").maxValue > 0.98) {
        if (gamePage.workshop.getCraft('alloy').unlocked && gamePage.resPool.get('steel').value > steelMAX && gamePage.resPool.get('alloy').value < alloyMAX) { 
            gamePage.craft('alloy', 1); 
        }
    }
        
    if (gamePage.resPool.get("unobtainium").value / gamePage.resPool.get("unobtainium").maxValue > 0.98) {
        if (gamePage.workshop.getCraft('eludium').unlocked && gamePage.resPool.get('alloy').value > alloyMIN) { 
            gamePage.craft('eludium', 1); 
        }
    }
    
    if (gamePage.resPool.get("steel").value > steelMAX) {
        if (gamePage.workshop.getCraft('gear').unlocked && gamePage.resPool.get('gear').value > gearMIN) { 
            gamePage.craft('gear', 5); 
        }
    }
    
}, 1 * 500);
 
//AUTOHUNT
// Start
autoHunt = setInterval(function() {
    var parchmentMAX = 6000;
    var manuscriptMAX = 2000;
    var compediumMAX = 2500;
    var blueprintMIN = 4500;
    
    
    var catpower = gamePage.resPool.get('manpower');
    if (catpower.value / catpower.maxValue > 0.98) {
        $("a:contains('Send hunters')").click();
        if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
    }
    
    var culture = gamePage.resPool.get('culture');
 
    if (culture.value / culture.maxValue > 0.98) {
        if (gamePage.workshop.getCraft('manuscript').unlocked && gamePage.resPool.get('parchment').value > parchmentMAX) { gamePage.craft('manuscript', 1); }
    }
    
    var science = gamePage.resPool.get('science');
 
    if (science.value / science.maxValue > 0.98) {
        if (gamePage.workshop.getCraft('compedium').unlocked && gamePage.resPool.get('manuscript').value > manuscriptMAX)  { gamePage.craft('compedium', 1);  }
        if (gamePage.workshop.getCraft('blueprint').unlocked && gamePage.resPool.get('compedium').value > compediumMAX && gamePage.resPool.get('blueprint').value < blueprintMIN) { gamePage.craft('blueprint', 1); }
    }
}, 1 * 1000);
 
//AUTOWOOD
autoCatnip = setInterval(function() {
    var catnip = gamePage.resPool.get('catnip');
    var calendar = gamePage.calendar;
 
    // Only run if positive catnip and not in last half of Autumn
    if (catnip.perTickUI < 0) { return; }
    if (catnip.value / catnip.maxValue < 0.99) { return; }
    if (calendar.season == 2 && calendar.day > 50) { return; }
    gamePage.craft('wood', 5);
}, 1 * 500);