let wins = { fourStar: 0, fiveStar: 0 }
let desired = { fourStar: 0, fiveStar: 0 }
const FOUR_STAR_ODDS = 0.051
const FIVE_STAR_ODDS = 0.006
let p5, pm5, get5, gty5, p4, pm4, get4, gty4, wishCount
let probs = []
init(160, 0, 0)
while (wishCount > 0) {
    getRareItem()
    log()
}

function init(wishes, _p4 = 0, _p5 = 0, d4, d5) {
    wishCount = wishes
    probs.length = wishes + 1
    probs.fill(0)
    desired.fourStar = d4
    desired.fiveStar = d5
    get5 = 0
    get4 = 0
    p5 = _p5
    p4 = _p4
    pm4 = Math.max(0, (p4 - 7))
    pm5 = Math.max(0, (p5 - 72))
}

function getRareItem() {
    let rand = Math.random()
    if (isFiveStar(pm5, rand)) {
        p5 = 0
        pm5 = 0
        get5 = 1
        winLose()
        p4 += 1
        if (p4 > 7) {
            pm4 += 1
        }
        wishCount--
        return
    } else {
        p5 += 1
        if (p5 > 72) pm5 += 1
        if (isFourStar(pm4, rand)) {
            p4 = 0
            pm4 = 0
            get4 = 1
            winLose()
            wishCount--
            return
        } else {
            p4 += 1
            if (p4 > 7) {
                pm4 += 1
            }
        }
    }
    wishCount--
}

function isFiveStar(pm5, rand) {
    let result = FIVE_STAR_ODDS + (10 * FIVE_STAR_ODDS * pm5)
    return result > rand
}

function isFourStar(pm4, rand) {
    let result = FOUR_STAR_ODDS + (10 * FOUR_STAR_ODDS * pm4)
    return result > rand
}

function winLose() {
    if (get5) {
        if (gty5) {
            wins.fiveStar += 1
            gty5 = 0
            get5 = 0
            return
        } else {
            if (Math.random() < 0.5) {
                wins.fiveStar += 1
                gty5 = 0
                get5 = 0
                return
            } else {
                gty5 = 1
                get5 = 0
                return
            }
        }
    } else {
        if (gty4) {
            if (Math.random() < 0.3333333333333334) {
                wins.fourStar += 1
                gty4 = 0
                get4 = 0
                return
            } else {
                get4 = 0
                return
            }
        } else {
            if (Math.random() < 0.5) {
                if (Math.random() < 0.3333333333333334) {
                    wins.fourStar += 1
                    gty4 = 0
                    get4 = 0
                    return
                } else {
                    get4 = 0
                    return
                }
            } else {
                gty4 = 1
                get4 = 0
                return
            }
        }
    }
}

// function buildPity( 
//     numWishes,
//     desired4,
//     desired5,
//     _pity4 = 0, 
//     _pity5 = 0, 
//     b_guarantee4, 
//     b_guarantee5) {
//         pity4 = _pity4
//         pity5 = _pity5
//         wishes = Math.min(1260,numWishes)

//         var pityModifier4 = Math.max(0,(pity4 - 7))
//         out.push(pityModifier4)

//         var pityModifier5 = Math.max(0,(pity5 - 72))
//         out.push(pityModifier5)

//         if(set4StarFlag(pityModifier4)) {

//         }
//         set5StarFlag(pityModifier5)

//     }

// function set4StarFlag(pm4) {
//     let rand = Math.random()
//     let condition1 = FOUR_STAR_ODDS + (10*FOUR_STAR_ODDS*pm4)
//     if(rand < condition1) {
//         get4 = 1
//     }
//     else {
//         get4 = 0
//     }
// }

// function set5StarFlag(pm5) {
//     let rand = Math.random()
//     let condition1 = FIVE_STAR_ODDS + (10*FIVE_STAR_ODDS*pm5)
//     if(rand < condition1) {
//         get5 = 1
//     }
//     else {
//         get5 = 0
//     }
// }

// buildPity(10,1,0,5,73,0,0)


console.log(wins)
function log() {
    console.log(p5 + ' ' + pm5 + ' ' + get5 + ' ' + p4 + ' ' + pm4 + ' ' + get4 + ' ' + wishCount)
}