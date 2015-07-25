//AUTOPRAY
autoPray = setInterval(function() {
    var origTab = gamePage.activeTabId;
    var faith = gamePage.resPool.get('faith');
 
    if (faith.value / faith.maxValue > 0.99) {
        gamePage.activeTabId = 'Religion'; gamePage.render();
        $(".btnContent:contains('Praise the sun')").click();
        gamePage.activeTabId = origTab; gamePage.render();
    }
}, 10 * 1000);
 
//AUTO OBSERVATORY
starClick = setInterval(function() { $("#gameLog").find("input").click(); }, 1 * 1000);
 
//AUTOCRAFT
autoCraft = setInterval(function() {
    var resources = [
        ["wood",     "beam" ],
        ["minerals", "slab" ],
        ["coal",     "steel"],
        ["titanium", "alloy"],
        ["iron",     "plate"]
       
    ];
 
    for (var i = 0; i < resources.length; i++) {
        var curRes = gamePage.resPool.get(resources[i][0]);
        if (curRes.value / curRes.maxValue > 0.99
         && gamePage.workshop.getCraft(resources[i][1]).unlocked) {
            gamePage.craft(resources[i][1], 1);
        }
    }
}, 1 * 500);
 
//AUTOHUNT
// Start
autoHunt = setInterval(function() {
    var catpower = gamePage.resPool.get('manpower');
    if (catpower.value / catpower.maxValue > 0.98) {
        $("a:contains('Send hunters')").click();
        if (gamePage.workshop.getCraft('parchment').unlocked)  { gamePage.craftAll('parchment');  }
    }
    
    var culture = gamePage.resPool.get('culture');
 
    if (culture.value / culture.maxValue > 0.98) {
        if (gamePage.workshop.getCraft('manuscript').unlocked && gamePage.resPool.get('parchment').value > 500) { gamePage.craft('manuscript', 1); }
    }
    
    var science = gamePage.resPool.get('science');
 
    if (science.value / science.maxValue > 0.98) {
        if (gamePage.workshop.getCraft('compedium').unlocked && gamePage.resPool.get('manuscript').value > 250)  { gamePage.craft('compedium', 1);  }
        if (gamePage.workshop.getCraft('blueprint').unlocked && gamePage.resPool.get('compedium').value > 150 && gamePage.resPool.get('blueprint').value < 100) { gamePage.craft('blueprint', 1); }
    }
}, 5 * 1000);
 
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