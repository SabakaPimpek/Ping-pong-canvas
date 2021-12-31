const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

ctx.font = 'italic 30px Arial';
ctx.textAlign = "center";

const ballSize = 20; //wielkość piłki
let ballX;
let ballY;

let ballSpeedX;
let ballSpeedY;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const player2X = 910;

let playerY = 200;
let player2Y = 200;

const lineWidth = 6;
const lineHeight = 16;

let scoreP1;
let scoreP2;

let pongSound = true;

let mouse = {x: 0, y: 0, isClicked: false}

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
    else if(ballX <= 0) 
    {
        setUp();
        scoreP2++;
        playSound(sound.score);
    }
    else if(ballX >= cw - ballSize)
    {
        setUp();
        scoreP1++;
        playSound(sound.score);
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

canvas.addEventListener("mousemove", (e) => 
{
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;

    mouse = {x: mouseX, y: mouseY};
    
    playerPosition(mouseY);
});

canvas.addEventListener("click", () =>
{
    mouse.isClicked = true;
});

function playerPosition(e)
{
    playerY = e - paddelHeight/2;

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

function speedUp()
{
    if(ballSpeedX<0 && ballSpeedX > -16) ballSpeedX -= 1;
    else if(ballSpeedX>0 && ballSpeedX < 16) ballSpeedX += 1;

    else if(ballSpeedY<0 && ballSpeedY > -16) ballSpeedY -= 1;
    else if(ballSpeedY>0 && ballSpeedY < 16) ballSpeedY += 1;

    (pongSound === true) ? playSound(sound.pong0)
    : playSound(sound.pong1);

    pongSound = !pongSound;
}

// Set up game

function setUp()
{
    ballX = cw/2 - ballSize/2;
    ballY = ch/2 - ballSize/2;

    ballSpeedX = random();
    ballSpeedY = random();

    if(ballSpeedX === 0 || ballSpeedY === 0) setUp();

    function random()
    {
        return Math.floor(Math.random() * (2 - -2 + 1) ) + -2;
    }
}

//Game score

function score()
{
    ctx.fillStyle = "red";
    ctx.fillText(scoreP1, cw / 2 - 100, 50);
    ctx.fillText(scoreP2, cw / 2 + 100, 50);

    if(scoreP1 === settings.pointsToWin) menu.gameEnd(1);
    else if(scoreP2 === settings.pointsToWin) menu.gameEnd(2);
}

const sound =
{
    score: new Audio ("audio/score.ogg"),
    pong0: new Audio ("audio/pong0.wav"),
    pong1: new Audio ("audio/pong1.wav")
}

function playSound(name)
{
    if(settings.sound === "ON") name.play();
}

function startGame()
{
    if(flags.isGameStarted === false)
    {
        clearInterval(display);
        display = setInterval(game, 1000/ 60);
        flags.isGameStarted = true;
        canvas.style.cursor = "none";
        scoreP1 = 0;
        scoreP2 = 0;
        setUp();
    }
}

// GAME 
function game()
{
table();
score();
ball();
player();
player2();
aiPosition();
}

