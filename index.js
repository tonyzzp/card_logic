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

function main() {
    for (let i = 1; i <= 10; i++) {
        testCards(i)
    }
} 3

main()