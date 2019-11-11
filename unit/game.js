describe('game tests', function () {
    let game

    beforeEach(function () {
        game = new Game()
    })

    afterEach(function () {
        game = null
    })

    it('should contain 5 options by default', function () {
        expect(game.options.length).toBe(5)
    })

    it('should contain rock, paper, scissors, lizard, spock by default', function () {
        expect(game.options[0].name).toBe('ROCK')
        expect(game.options[1].name).toBe('PAPER')
        expect(game.options[2].name).toBe('SCISSORS')
        expect(game.options[3].name).toBe('LIZARD')
        expect(game.options[4].name).toBe('SPOCK')
    })

    it('should have an empty winArray by default', function () {
        expect(game.winArray.length).toBe(0)
    })
    
    it('should give a valid random option when getRandomOption is called', function () {
        const option = game.getRandomOption()
        expect(option.name).toEqual(jasmine.any(String))
        expect(option.winsAgainst.length).toBe(2)
    })
    
    it('should win when playing rock versus scissors', function () {
        const rock = game.options[0]
        const scissors = game.options[2]
        
        expect(rock.testAgainst(scissors)).toBe(1)
    })
    
    it('should draw when both options are the same', function () {
        const opt = game.getRandomOption()
        expect(opt.testAgainst(opt)).toBe(2)
    })
    
    
    
    it('should lose when playing spock versus lizard', function () {
        const lizard = game.options[3]
        const spock = game.options[4]
        expect(spock.testAgainst(lizard)).toBe(0)
    })
})

describe('game tests, best of five', function () {
let game

beforeEach(function () {
    game = new Game()
})

afterEach(function () {
    game = null
})
    
    it('should have best-of-five disabled by default', function () {
        expect(game.bestOfFive).toBe(false)  
    })
    
    it('should not log any games, win or lose, if best of five is disabled', function () {
        for (let i = 0; i < 10; i++) {
            game.play(game.options[0])
        }

        expect(game.bestOfFive).toBe(false)
        expect(game.winArray.length).toBe(0)
    })   

    it('should always show the default scorecard when score is called if best of five is disabled', function () {
        expect(game.score).toEqual(jasmine.objectContaining({
            wins: 0,
            losses: 0,
            end: false,
            totalWin: false
        }))
    })
    
    describe('With 10 random games played', function () {
        beforeEach(function () {
            game.toggleBestOfFive()
            for (let i = 0; i < 10; i++) {
                game.play(game.options[0])
            }
        })

        it('should log any games, win or lose, if best of five is enabled', function () { 
            expect(game.bestOfFive).toBe(true)
            expect(game.winArray.length).toBeGreaterThan(0)
        })
        
        it('purge the winArray, if best of five is disabled again', function () {    
            expect(game.bestOfFive).toBe(true)
            game.toggleBestOfFive()
            expect(game.bestOfFive).toBe(false)
            expect(game.winArray.length).toBe(0)
        })

        it('should show the score when calling score', function () {
            expect(game.score).toEqual(jasmine.objectContaining({
                wins: jasmine.any(Number),
                losses: jasmine.any(Number),
                end: jasmine.any(Boolean),
                totalWin: jasmine.any(Boolean)
            }))
        })
    })
})
