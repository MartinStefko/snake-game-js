import { Game, Vector } from 'wasm-snake-game'

import CONFIG from './config'
import { View } from './view'
// after writing {contr} all of this has been added oller } from './controller'
import { Controller } from './controller'
import Storage from './storage'

export class GameManager {
    constructor() {
        this.restart()
        this.view = new View(
            this.game.width,
            this.game.height,
            // binding render to this GameManager create new food,snake,score,best score
            this.render.bind(this)
        )
        this.controller = new Controller()
        // binding onStop to this, this will ensure that i can access the onStop output from constructor
        this.onStop.bind(this)
    }
    // on restart init new Game with value configured in config.js
    restart() {
        // ouu wau i just importing Game, Vector from wasm rust wau wau just like that
        this.game = new Game(
            CONFIG.WIDTH,
            CONFIG.HEIGHT,
            CONFIG.SPEED,
            CONFIG.SNAKE_LENGTH,
            new Vector(
                CONFIG.SNAKE_DIRECTION_X,
                CONFIG.SNAKE_DIRECTION_Y
            )
        )
        // restarting the lastUpdate and stopTime
        this.lastUpdate = undefined
        this.stopTime = undefined
    }

    onStop() {
        const now = Date.now()
        if (this.stopTime) {
            // check if game has been stopped, if yes remove stop time
            this.stopTime = undefined
            this.lastUpdate = this.time + now - this.lastUpdate
        } else {
            this.stopTime = now
        }
    }

    render() {
        this.view.render(
            this.game.food,
            // snake is generated this.game.get_snake()
            this.game.get_snake(),
            this.game.score,
            // DONE actual best score
            Storage.getBestScore()
        )
    }
    // the is game loop basically, according to this everything which must re-rendered will be re-rendered
    tick() {
        // if game has stopeed i don' want to run game loop 
        if (!this.stopTime) {
            const lastUpdate = Date.now()
            if (this.lastUpdate) {
                // process this.hame in interval from Date.now - previous lastUpdate
                this.game.process(lastUpdate - this.lastUpdate, this.controller.movement)
                if (this.game.is_over()) {
                    this.restart()
                    return
                }
                // update best score with current score if it is bigger
                if (this.game.score > Storage.getBestScore()) {
                    Storage.setBestScore(this.game.score)
                }
            }
            // update current lastUpdate
            this.lastUpdate = lastUpdate
            // render the game
            this.render()
        }


    }
    run() {
        setInterval(this.tick.bind(this), 1000 / CONFIG.FPS)
    }
}