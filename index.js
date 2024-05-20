import { card_utils } from "./cards.js"

/**
 * 
 * @param {number } count 
 */
function testCards(count) {
    console.info("------------test", count)
    const TOTAL = 1000000
    let stats = {}
    let all = card_utils.allCards()
    for (let i = 0; i < TOTAL; i++) {
        card_utils.shift(all)
        let types = []
        for (let j = 0; j < count; j++) {
            let cards = [all[j * 3], all[j * 3 + 1], all[j * 3 + 2]]
            let type = card_utils.getType(cards)
            types.push(type)
        }
        let t = Math.max(...types)
        let v = stats[t] || 0
        stats[t] = v + 1
    }
    for (let type in stats) {
        console.info(type, stats[type], stats[type] / TOTAL)
    }

}

function testJhandiMunda() {
    let TOTAL = 100000000
    let totalWin = 0
    for (let i = 0; i < TOTAL; i++) {
        let results = [
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 6),
        ]
        let count = results.reduce((rtn, current) => current == 0 ? rtn + 1 : rtn, 0)
        let win = 0
        if (count == 2) {
            win = 3
        } else if (count == 3) {
            win = 5
        } else if (count == 4) {
            win = 10
        } else if (count == 5) {
            win = 20
        } else if (count == 6) {
            win = 100
        }
        totalWin += win
    }
    console.info(TOTAL, totalWin, 1 - totalWin / TOTAL)
}

function testDVST() {
    let TOTAL = 10000000
    let totalTie = 0
    let cards = card_utils.allCards()
    for (let i = 0; i < TOTAL; i++) {
        card_utils.shift(cards)
        let a = cards[0] % 16
        let b = cards[1] % 16
        if (a == b) {
            totalTie++
        }
    }
    console.info(totalTie, totalTie / TOTAL)
}

function main() {
    // for (let i = 1; i <= 10; i++) {
    //     testCards(i)
    // }
    // testJhandiMunda()
    testDVST()
}

main()