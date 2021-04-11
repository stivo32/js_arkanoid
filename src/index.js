import _ from 'lodash';
import './style.css'
import {GAME_WIDTH, GAME_HEIGHT} from './constants';
import ballSrc from '../assets/images/red_ball.png';
import brickSrc from '../assets/images/brick.png';
import Game from './game';


const canvas = document.createElement('canvas');
canvas.id = "gameScreen"
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const imgBall = document.createElement('img');
imgBall.src = ballSrc;
imgBall.id = 'imgBall';
imgBall.width = 30;
imgBall.height = 30;

const imgBrick = document.createElement('img');
imgBrick.src = brickSrc;
imgBrick.id = 'imgBrick';

document.body.appendChild(imgBall);
document.body.appendChild(imgBrick);
document.body.appendChild(canvas);

let context = canvas.getContext('2d');

context.clearRect(0, 0, canvas.width, canvas.height);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime)
    game.draw(context)
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
