document.addEventListener('DOMContentLoaded' ,() => {
    const bird =document.querySelector('.bird');
    const gameDisplay =document.querySelector('.game-container');
    const ground =document.querySelector('.ground-moving');
    
    let birdLeft=220;
    let birdBottom=100;
    let gravity =2;
    let gap=460;
    let isGameOver=false;
    function startGame() {
        birdBottom-=gravity;
    bird.style.bottom=birdBottom+'px';
    bird.style.left=birdLeft+'px';
    
    }
    let gametimerId = setInterval(startGame,20);
    function control(eventt)//to only jump via spacebar
    {
        if(eventt.keyCode===32)
        jump();
    }
    //the bird needs to jump and there needs to be obstacles
    function jump (){
        //every time it jumps add 50px height to it
        if(birdBottom<500) birdBottom+=50;
        bird.style.bottom=birdBottom+'px';
        console.log(birdBottom);
    }
    //now invoke the jump function whenever the user presses the jump function
    document.addEventListener('keyup',control);
    //now we need obstacles 
    function generateObstacle(){
        let randomHeight=Math.random()*60;
        let obstacleBottom=randomHeight;
        let obstacleLeft=500;

        const obstacle=document.createElement('div');
        const topObstacle=document.createElement('div');
        if(!isGameOver)
            {obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
    }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left=obstacleLeft+'px';
        topObstacle.style.left=obstacleLeft+'px';
        obstacle.style.bottom=obstacleBottom+'px';
        topObstacle.style.bottom=obstacleBottom+gap+'px';
        function moveObstacleLeft(){

            obstacleLeft-=2;
            obstacle.style.left=obstacleLeft+'px';
            topObstacle.style.left=obstacleLeft+'px';
            if(obstacleLeft===-60)
            {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if(obstacleLeft>200 && obstacleLeft<280 && birdLeft===220 && 
                (birdBottom<obstacleBottom+155 ||birdBottom>obstacleBottom+gap-200) || birdBottom===0)
                {gameOver();
                clearInterval(timerId);
            }

        }
        let timerId=setInterval(moveObstacleLeft,20);
        //now to generate many obstacles 
        if(!isGameOver)setTimeout(generateObstacle,3000);
    }
    generateObstacle()
    function gameOver()
    {
     clearInterval(gametimerId);
     isGameOver=true;console.log('gameover');
     document.removeEventListener('keyup',control);
     ground.classList.add('ground');
     ground.classList.remove('ground-moving');
    }
})