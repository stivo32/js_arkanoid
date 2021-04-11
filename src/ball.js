import detectCollision from './collisionDetection'

export default class Ball {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = document.getElementById('imgBall');
        this.size = 20;
        this.reset();
    }

    reset() {
        this.position = {
            x: 400,
            y: 500,
        }
        this.speed = {
            x: 4,
            y: -4
        }
    }

    draw(context) {
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.size, 
            this.size
            );
        
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // collisions with walls
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x *= -1;
        }

        // collisions with top
        if (this.position.y < 0) {
            this.speed.y *= -1;
        }

        // collision with bottom
        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives --;
            this.reset()
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y *= -1;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}