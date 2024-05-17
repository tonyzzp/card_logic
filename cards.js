/**
 * @typedef {Object} Card
 * @property {number} color
 * @property {number} value
 */


export const card_utils = {

    /**
     * 
     * @param {number} card 
     * @returns {Card}
     */
    parseCard: function (card) {
        let color = Math.floor(card / 16)
        let value = card % 16
        return { color, value }
    },

    allCards: function () {
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
    },

    /**
     * 
     * @param {Card[]} cards 
     */
    sortByValue: function (cards) {
        cards.sort((a, b) => a.value - b.value)
    },

    /**
     * 
     * @param {number[]} cards 
     */
    shift: function (cards) {
        for (let i = 0; i < cards.length; i++) {
            let j = Math.floor(Math.random() * cards.length)
            let v = cards[i]
            cards[i] = cards[j]
            cards[j] = v
        }
    },

    /**
     * 
     * @param {number[]} cards 
     */
    isSet: function (cards) {
        let _cards = cards.map(v => card_utils.parseCard(v))
        return _cards[0].value == _cards[1].value && _cards[0].value == _cards[2].value
    },

    /**
     * 
     * @param {number[]} cards 
     */
    isPure: function (cards) {
        return card_utils.isColor(cards) && card_utils.isSeq(cards)
    },

    /**
     * 
     * @param {number[]} cards 
     */
    isSeq: function (cards) {
        let _cards = cards.map(v => card_utils.parseCard(v))
        card_utils.sortByValue(_cards)
        let [a, b, c] = _cards
        if (a.value == b.value - 1 && b.value == c.value - 1) {
            return true
        }
        if (a.value == 1 && b.value == 12 && c.value == 13) {
            return true
        }
        return false
    },

    /**
     * 
     * @param {number[]} cards 
     */
    isColor: function (cards) {
        let _cards = cards.map(v => card_utils.parseCard(v))
        let [a, b, c] = _cards
        return a.color == b.color && a.color == c.color
    },


    /**
     * 
     * @param {number[]} cards 
     */
    isPair: function (cards) {
        let _cards = cards.map(v => card_utils.parseCard(v))
        let [a, b, c] = _cards
        return (a.value == b.value) || (a.value == c.value) || (b.value == c.value)
    },

    /**
     * 
     * @param {number[]} cards 
     */
    getType: function (cards) {
        if (card_utils.isSet(cards)) {
            return 6
        } else if (card_utils.isPure(cards)) {
            return 5
        } else if (card_utils.isSeq(cards)) {
            return 4
        } else if (card_utils.isColor(cards)) {
            return 3
        } else if (card_utils.isPair(cards)) {
            return 2
        } else {
            return 1
        }
    }
}