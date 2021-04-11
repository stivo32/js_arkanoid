import detectCollision from './collisionDetection';

export default class Brick {
    constructor(game, position) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = document.getElementById('imgBrick');
        this.width = 80;
        this.height = 24;
        this.position = position;

        this.markForDeletion = false;
    }

    update() {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y *= -1;
            this.markForDeletion = true;
        }
    }

    draw(context) {
        context.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            );
        
    }
}