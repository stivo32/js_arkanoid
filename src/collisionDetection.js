export default function detectCollision(ball, gameObj) {
    let bottomOfBall = ball.position.y + ball.size
    let topOfBall = ball.position.y
    let leftBallEdge = ball.position.x;
    let rightBallEdge = ball.position.x + ball.size;

    let topOfObj = gameObj.position.y;
    let bottomOfObj = gameObj.position.y + gameObj.height;
    let leftObjEdge = gameObj.position.x;
    let rightObjEdge = gameObj.position.x + gameObj.width;
    
    if (
        bottomOfBall >= topOfObj &&
        topOfBall <= bottomOfObj && 
        leftBallEdge >= leftObjEdge &&
        rightBallEdge <= rightObjEdge
    ) {
        return true
    } else {
        return false
    }
}