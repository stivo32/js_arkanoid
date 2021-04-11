export default class InputHandler {
    constructor(game) {
        document.addEventListener('keydown', (event) => {
            console.log(event.key);
            switch (event.key) {
                case "ArrowLeft": {
                    console.log(event.key);
                    game.paddle.moveLeft()
                    break;
                }
                case "ArrowRight": {
                    game.paddle.moveRight()
                    break;
                }
                case "Escape": {
                    game.togglePause()
                    break;
                }
                case " ": {
                    game.start();
                    break;
                }

            }
        })
        document.addEventListener('keyup', event => {
            switch (event.key) {
                case "ArrowLeft": {
                    if (game.paddle.speed < 0) {
                        game.paddle.stop()
                    }
                    break;
                }
                case "ArrowRight": {
                    if (game.paddle.speed > 0) {
                        game.paddle.stop()
                    }
                    break;
                }
            }
        })
    }
}