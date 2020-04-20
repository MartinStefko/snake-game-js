import { Game, Vector } from 'wasm-snake-game'

import CONFIG from './config'
import { View } from './view'

export class GameManager {
    constructor() {
        this.restart()
        this.view = new View(
            this.game.width,
            this.game.height,
            // binding render to this GameManager create new food,snake,score,best score
            this.render.bind(this)
        )
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
        console.log(this.game)
    }

    render() {
        this.view.render(
            this.game.food,
            // snake is generated this.game.get_snake()
            this.game.get_snake(),
            this.game.score,
            // TODO actual best score
            0
        )
    }
    run() {
        this.render()
    }
}