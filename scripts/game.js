class Option {
    constructor (name, winsAgainst = []) {
        this.name = name
        this.winsAgainst = winsAgainst
    }

    testAgainst(option) {
        if (option.name === this.name) return 'draw'
        else if (this.winsAgainst.includes(option.name)) return 'win'
        else return 'loss'
    }
}

class Game {
    constructor (options) {
        this.options = []
        if (options) { // This entry leaves the game option for customising through the constructor
            this.options = options
        } else {
            this.options.push(new Option('ROCK', ['SCISSORS']))
            this.options.push(new Option('PAPER', ['ROCK']))
            this.options.push(new Option('SCISSORS', ['PAPER']))
        }
    }

    getRandomOption () {
        const randomIndex = Math.floor(Math.random() * this.options.length)
        return this.options[randomIndex]
    }
}
