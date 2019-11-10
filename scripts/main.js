const game = new Game()

initiateListeners ()

/**
 * Renders the view of the play.
 * @param {Option} yourOption 
 * @param {Option} theirOption 
 * @param {String} result 
 */
function setResults (yourOption, theirOption, result) {
    document.querySelector('#yourSprite').src = `assets/images/${yourOption.name.toLowerCase()}.png`
    document.querySelector('#theirSprite').src = `assets/images/${theirOption.name.toLowerCase()}.png`
    document.querySelector('#result').innerHTML = result.toUpperCase()
}

/**
 * Based on the game, create buttons and add listeners
 * for the game to be played.
 */
function initiateListeners () {
    const controller = document.querySelector('#game-buttons')

    game.options.forEach(option => {
        const button = document.createElement('button')
        
        button.innerHTML = option.name
        button.classList.add('game-button')
        
        button.addEventListener('click', () => {
            const opponentHas = game.getRandomOption()
            const result = option.testAgainst(opponentHas)
            setResults(option, opponentHas, result)
        })
        
        controller.appendChild(button)
    })
}