import Paddle from './paddle';
import Ball from './ball';
import InputHandler from './input';
import {level1, level2, buildLevel} from './levels';

const GAME_STATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEW_LEVEL: 4, 
    FINISH: 5
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
        this.gamestate = GAME_STATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.bricks = [];
        this.levels = [level1];
        this.currentLevel = 0;
        this.lives = 2;
        new InputHandler(this);

    }

    start() {
        if (this.gamestate !== GAME_STATE.MENU && this.gamestate !== GAME_STATE.NEW_LEVEL) return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel])
        this.ball.reset()
        this.gameObjects = [
            this.paddle,
            this.ball,
        ]
        this.gamestate = GAME_STATE.RUNNING;

    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAME_STATE.GAMEOVER
        if (
            this.gamestate === GAME_STATE.PAUSED ||
            this.gamestate === GAME_STATE.MENU ||
            this.gamestate === GAME_STATE.GAMEOVER ||
            this.gamestate === GAME_STATE.FINISH
            ) return;
        if (this.bricks.length === 0) {
            if (this.currentLevel < this.levels.length - 1){
                this.currentLevel++;
                this.gamestate = GAME_STATE.NEW_LEVEL
                this.start()
            } else {
                this.gamestate === GAME_STATE.FINISH
            }
            
        }
        [...this.bricks, ...this.gameObjects].forEach( obj => obj.update(deltaTime))
        this.bricks = this.bricks.filter( brick => !brick.markForDeletion)
    }

    draw(context) {
        [...this.bricks, ...this.gameObjects].forEach( obj => obj.draw(context))

        if (this.gamestate === GAME_STATE.PAUSED) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle='rgba(0, 0, 0, 0.5)';
            context.fill()            
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAME_STATE.MENU) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle='rgba(0, 0, 0, 1)';
            context.fill()            
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Press SPACEBAR to Start', this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAME_STATE.GAMEOVER) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle='rgba(0, 0, 0, 1)';
            context.fill()            
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate === GAME_STATE.FINISH) {
            context.rect(0, 0, this.gameWidth, this.gameHeight);
            context.fillStyle='rgba(0, 0, 0, 1)';
            context.fill()            
            context.font = '30px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.fillText('You finished the Game.', this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    togglePause() {
        if (this.gamestate === GAME_STATE.PAUSED) {
            this.gamestate = GAME_STATE.RUNNING;
        } else {
            this.gamestate = GAME_STATE.PAUSED;
        }
    }
}