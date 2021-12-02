const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20; //wielkość piłki
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

let ballSpeedX = -2;
let ballSpeedY = -2;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const player2X = 910;

let playerY = 200;
let player2Y = 200;

const lineWidth = 6;
const lineHeight = 16;

// Rysowanie stołu
function table()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    for(let linePosition = 20; linePosition < ch; linePosition +=30)
    {
        ctx.fillStyle = "gray"
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight)
    }
}


//Rysowanie piłki i odbijanie od ściany
function ball()
{
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballY <= 0 || ballY >= ch - ballSize)
    {
        ballSpeedY = -ballSpeedY;
        speedUp();
    } 
    else if(ballX <= 0 || ballX >= cw - ballSize)
    {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    //odbijanie piłki od paletki
    else if(
         ballX <= playerX + paddelWidth &&
         ballX >= playerX &&
         ballY > playerY - ballSize &&
         ballY < playerY+paddelHeight)
    {
        ballX += 2;
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
    //odbijanie piłki od paletki2
    else if(
        ballX >= player2X - ballSize &&
        ballY > player2Y - ballSize &&
        ballY < player2Y+paddelHeight)
   {
       ballX -= 2;
       ballSpeedX = -ballSpeedX;
       speedUp();
   }
  
}

//Rysowanie Paletki

function player()
{
    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}

//Rysowanie Paletki gracza 2

function player2()
{
    ctx.fillStyle = "red";
    ctx.fillRect(player2X, player2Y, paddelWidth, paddelHeight);
}

topCanvas = canvas.offsetTop;
leftCanvas = canvas.offsetLeft;

function playerPosition(e)
{
    playerY = e.clientY - topCanvas - paddelHeight/2;

    if(playerY <= 0) playerY = 0;
    else if (playerY >= ch-paddelHeight) playerY = ch-paddelHeight;

   
}

//AI

function aiPosition()
{
    const middlePaddel = player2Y + paddelHeight/2;
    const middleBall = ballY+ ballSize/2;

    if (ballX > cw/2)
    {
        if(middlePaddel - middleBall > 200) player2Y -= 15;
        else if(middlePaddel - middleBall > 50) player2Y -= 5;
        
        else if(middlePaddel - middleBall < -200) player2Y +- 15;
        else if (middlePaddel - middleBall < -50) player2Y += 5;
    }
    else if(ballX <= cw/2 && ballX > 150)
    {
        if(middlePaddel - middleBall > 100) player2Y -=3;
        else if(middlePaddel - middleBall < -100) player2Y +=3;
    }
}

canvas.addEventListener("mousemove", playerPosition);

function speedUp()
{
    if(ballSpeedX<0 && ballSpeedX > -16) ballSpeedX -= .2;
    if(ballSpeedX>0 && ballSpeedX < 16) ballSpeedX += .2;

    if(ballSpeedY<0 && ballSpeedY > -16) ballSpeedY -= .1;
    if(ballSpeedY>0 && ballSpeedY < 16) ballSpeedY += .1;


}

function game()
{
table();
ball();
player();
player2();
aiPosition();
}
setInterval(game, 1000/ 60);
