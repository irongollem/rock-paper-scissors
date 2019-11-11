class Option {
    constructor (name, winsAgainst = []) {
        this.name = name
        this.winsAgainst = winsAgainst
    }

    testAgainst(option) {
        if (option.name === this.name) return 2
        else if (this.winsAgainst.includes(option.name)) return 1
        else return 0
    }
}

class Game {
    constructor (options) {
        this.options = []
        this.winArray = []
        if (options) { // This entry leaves the game option for customising through the constructor
            this.options = options
        } else {
            this.options.push(new Option('ROCK', ['SCISSORS', 'LIZARD']))
            this.options.push(new Option('PAPER', ['ROCK', 'SPOCK']))
            this.options.push(new Option('SCISSORS', ['PAPER', 'LIZARD']))
            this.options.push(new Option('LIZARD', ['SPOCK', 'PAPER']))
            this.options.push(new Option('SPOCK', ['STONE', 'SCISSORS']))
        }
    }

    getRandomOption () {
        const randomIndex = Math.floor(Math.random() * this.options.length)
        return this.options[randomIndex]
    }

    toggleBestOfFive () {
        if (this.bestOfFive) {
            this.bestOfFive = false
            this.winArray = []
        } else {
            this.bestOfFive = true
        }
    }

    play (player) {
        const enemy = this.getRandomOption()
        const result = player.testAgainst(enemy)
        if (this.bestOfFive && result < 2) {
            this.winArray.push(result)
        }
        return { player, enemy }
    }

    get score () {
        const wins = this.winArray.reduce((sum, x) => sum + x)
        const losses = this.winArray.length - wins
        const totalWin = wins >= 3
        const end = totalWin || losses >= 3

        return { wins, losses, end, totalWin }
    }
}
