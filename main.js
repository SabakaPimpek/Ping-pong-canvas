const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20; //wielkość piłki
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

let BallSpeedX = 1;
let ballSpeedY = 1;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const player2X = 910;

let playerY = 200;
let player2Y = 200;

const lineWidth = 6;
const lineHeight = 16;

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

function ball()
{
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += BallSpeedX;
    ballY += ballSpeedY;

    if(ballY === ch-ballSize)
    {
        ballSpeedY = -1;
    }
}

function player()
{
    ctx.fillStyle = "green";
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}

function player2()
{
    ctx.fillStyle = "yellow";
    ctx.fillRect(player2X, player2Y, paddelWidth, paddelHeight);
}

function game()
{
table();
ball();
player();
player2();
}
setInterval(game, 1000/ 60);