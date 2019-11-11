class ViewRenderer {
    constructor(game) {
        this.game = game
        this.bestOfFiveButton = document.querySelector('#bof-button')
        this.brief = document.querySelector('#best-of-five-brief')
        this.controller = document.querySelector('#game-buttons')
        this.enemySprite = document.querySelector('#theirSprite')
        this.enemyVersusEnemyButton = document.querySelector('#eve-button')
        this.resultBlock = document.querySelector('#result')
        this.scoreBoxes = document.querySelectorAll('.score-box')
        this.yourSprite = document.querySelector('#yourSprite')
        document.querySelector('.page-title').innerHTML = `${game.options.map(option => option.name).join(', ')},
                choose your weapon!`
    }

    /**
     * Renders the view of the play.
     * @param {Option} yourOption 
     * @param {Option} theirOption 
     * @param {String} result 
     */
    _setResults({ player, enemy }) {
        this.yourSprite.src = `assets/images/${player.name.toLowerCase()}.png`
        this.enemySprite.src = `assets/images/${enemy.name.toLowerCase()}.png`
        const responses = {
            0: 'Left player loses!',
            1: 'Left player wins!',
            2: 'it\'s a draw!'
        }
        this.resultBlock.innerHTML = responses[player.testAgainst(enemy)]

        if (this.game.bestOfFive && player.testAgainst(enemy) !== 2) {
            const turn = this.game.winArray.length
            this.scoreBoxes[turn - 1].classList.add(player.testAgainst(enemy) ? 'win' : 'loss')
            if (turn >= 3 && this.game.score.end) { // Test if the game has ended
                this.scoreBoxes.forEach(box => {
                    box.classList.remove('win')
                    box.classList.remove('loss')
                    box.style.display = 'none'
                })
                const score = this.game.score
                this.game.toggleBestOfFive()
                const message = `Left player ${score.totalWin ? 'won' : 'lost'} with ${score.wins} again ${score.losses}; ${score.totalWin ? 'congratulations!' : 'better luck next time!'}`

                this.brief.innerHTML = message
                this.brief.classList.add('tile')

            }
        }
    }

    /**
     * Based on the game, create buttons and add listeners
     * for the game to be played.
     */
    initiateListeners() {
        this._initiateEVEListener()
        this._initiateBOFListener()

        this.game.options.forEach(option => {
            const button = document.createElement('button')

            button.innerHTML = option.name
            button.classList.add('game-button')

            button.addEventListener('click', () => {
                this._setResults(this.game.play(option))
            })

            this.controller.appendChild(button)
        })
    }

    _initiateEVEListener() {
        this.enemyVersusEnemyButton.addEventListener('click', () => {
            const thisHas = this.game.getRandomOption()
            this._setResults(this.game.play(thisHas))
        })
    }

    _initiateBOFListener() {
        this.bestOfFiveButton.addEventListener('click', () => {
            this.game.toggleBestOfFive()


            this._resetBOFView()

            const displayStyle = this.game.bestOfFive ? 'block' : 'none'

            this.scoreBoxes.forEach(box => {
                box.style.display = displayStyle
            })
        })
    }

    _resetBOFView() {
        this.brief.innerHTML = ''
        this.brief.classList.remove('tile')
    }
}