/**
 * @typedef {Object} Card
 * @property {number} color
 * @property {number} value
 */


/**
 * 
 * @param {number} card 
 * @returns {Card}
 */
function parseCard(card) {
    let color = Math.floor(card / 16)
    let value = card % 16
    return { color, value }
}

function allCards() {
    /**
     * @type {number[]}
     */
    let rtn = []
    for (let color = 0; color < 4; color++) {
        for (let value = 1; value <= 13; value++) {
            rtn.push(color * 16 + value)
        }
    }
    return rtn
}

/**
 * 
 * @param {Card[]} cards 
 */
function sortByValue(cards) {
    cards.sort((a, b) => a.value - b.value)
}

/**
 * 
 * @param {number[]} cards 
 */
function shift(cards) {
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * cards.length)
        let v = cards[i]
        cards[i] = cards[j]
        cards[j] = v
    }
}

/**
 * 
 * @param {number[]} cards 
 */
function isSet(cards) {
    let _cards = cards.map(v => parseCard(v))
    return _cards[0].value == _cards[1].value && _cards[0].value == _cards[2].value
}

/**
 * 
 * @param {number[]} cards 
 */
function isPure(cards) {
    return isColor(cards) && isSeq(cards)
}

/**
 * 
 * @param {number[]} cards 
 */
function isSeq(cards) {
    let _cards = cards.map(v => parseCard(v))
    sortByValue(_cards)
    let [a, b, c] = _cards
    if (a.value == b.value - 1 && b.value == c.value - 1) {
        return true
    }
    if (a.value == 1 && b.value == 12 && c.value == 13) {
        return true
    }
    return false
}

/**
 * 
 * @param {number[]} cards 
 */
function isColor(cards) {
    let _cards = cards.map(v => parseCard(v))
    let [a, b, c] = _cards
    return a.color == b.color && a.color == c.color
}


/**
 * 
 * @param {number[]} cards 
 */
function isPair(cards) {
    let _cards = cards.map(v => parseCard(v))
    let [a, b, c] = _cards
    return (a.value == b.value) || (a.value == c.value) || (b.value == c.value)
}

/**
 * 
 * @param {number[]} cards 
 */
function getType(cards) {
    if (isSet(cards)) {
        return 6
    } else if (isPure(cards)) {
        return 5
    } else if (isSeq(cards)) {
        return 4
    } else if (isColor(cards)) {
        return 3
    } else if (isPair(cards)) {
        return 2
    } else {
        return 1
    }
}

/**
 * 
 * @param {number } count 
 */
function test(count) {
    console.info("------------test", count)
    const TOTAL = 1000000
    let stats = {}
    let all = allCards()
    for (let i = 0; i < TOTAL; i++) {
        shift(all)
        let types = []
        for (let j = 0; j < count; j++) {
            let cards = [all[j * 3], all[j * 3 + 1], all[j * 3 + 2]]
            let type = getType(cards)
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
        test(i)
    }
} 3

main()