import { Game, Vector } from 'wasm-snake-game'

import CONFIG from './config'

export class GameManager {
    constructor() {
        this.restart()
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
    run() {
        console.log('running the game...')
    }
}