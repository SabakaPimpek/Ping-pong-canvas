class Button 
{
    constructor(posX, posY, text, func) 
// Position X and Y of the button, text in the button and function on click
    {
        this.posX = posX;
        this.posY = posY;
        this.text = text;
        this.func = func;
    }

    /*This function draw clickable button (text) on screen.
     When hovering, button changes color to red.
     When clicked, function starts (func)*/

    write()
    {
        let buttonLength = ctx.measureText(this.text).width;

        if(mouse.y >= this.posY-30 && mouse.y <= this.posY
            && mouse.x >= this.posX - buttonLength/2
            && mouse.x <= this.posX + buttonLength/2 ) 
        {
            ctx.fillStyle = "red";
            if(mouse.isClicked === true)
            {
                this.func()
                mouse.isClicked = false;
            }
        }
        else ctx.fillStyle = "white";
        ctx.fillText(this.text, this.posX, this.posY)
    }

}

/* Object with all functions responsible for menu*/

const menu = 
{
    background: () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cw, ch);

        ctx.fillStyle = "white";
        ctx.font = 'bold 60px Atari';
        ctx.fillText("PING PONG", cw / 2, ch / 4);
    },

// --------------------------------------------------------------------------------------------

    startSettings: () =>
    {
        
        clearInterval(display);
        display = setInterval(SettingsMenu, 1000/60);


        // DO POPRAWY (W PĘTLI)
          let buttons = []
          buttons[0] = new Button(cw/2, ch-40, "Return", menu.startMenu); 
          buttons[1] = new Button(cw/2 - 50, 130, "<", decrement);
          buttons[2] = new Button(cw/2 + 50, 130, ">", increment);
          buttons[3] = new Button(cw/2 - 100, 130*2, "<", "");
          buttons[4] = new Button(cw/2 + 100, 130*2, ">", "");
          buttons[5] = new Button(cw/2 - 50, 130*3, "<", changeSounds);
          buttons[6] = new Button(cw/2 + 50, 130*3, ">", changeSounds);
          

        function SettingsMenu()
        {  
            let texts = ["Points to win", settings.pointsToWin ,
            "Game Difficulty", settings.difficulty,
            "Sounds", settings.sound];

            ctx.fillStyle = "black";
            ctx.fillRect(0,0,cw,ch);
            ctx.font = "bold 24px Atari"

            buttons.forEach((number, i) =>
            {
                buttons[i].write();
            });

            texts.forEach((number, i) =>
            {
                ctx.fillStyle = "white";
                ctx.fillText(number, cw/2, 65 + 65*i);
            });
        }

        function decrement()
        {
            if(settings.pointsToWin > 2) settings.pointsToWin--;
        }
        function increment()
        {
            if(settings.pointsToWin < 10) settings.pointsToWin++;
        }
        function changeSounds()
        {
            if (settings.sound === "ON") settings.sound = "OFF";
            else settings.sound = "ON";
        }
    },

// --------------------------------------------------------------------------------------------

    startInfo: () =>
    {
            clearInterval(display)
            display = setInterval(infoMenu, 1000/ 60);
            let buttons = new Button(cw/2, ch-100, "Return", menu.startMenu)

        function infoMenu()
        {
            ctx.fillStyle = "white";
            menu.background();
            ctx.font = 'bold 30px Atari';
            ctx.fillText("Game made by:", cw/2, ch/2);
            ctx.fillText("Sabaka Pimpek  2021", cw/2, ch/2 + 50)
            buttons.write();
        }
    },

// --------------------------------------------------------------------------------------------

    startMenu: () =>
    {   
        clearInterval(display);
        display = setInterval(mainMenu, 1000/ 60);

        let buttons = [];
        let names = ["Play", "Options", "Info"]
        let functions = [startGame, menu.startSettings, menu.startInfo]
        for(i=0; i<3; i++)
            {
                buttons[i] = new Button(cw/2, ch/2 + i*100, names[i], functions[i])
            }

        function mainMenu() 
        {
            menu.background();
            buttonWrite();
        }   

        function buttonWrite()
        {
            buttons.forEach((number, i) =>
            {
                ctx.font = 'bold 30px Atari';
                buttons[i].write();
            });
        }
    
    },

    //------------------------------------------------------------
    gameEnd: (win) =>
    {
        clearInterval(display);
        display = setInterval(tryAgain, 1000/60);
        let buttons = [];
        buttons[0] = new Button(cw/2, ch/2 + 50, "Try Again", startGame);
        buttons[1] = new Button(cw/2, ch/2 + 100, "Main menu", menu.startMenu);
        flags.isGameStarted = false;
        canvas.style.cursor = "default";

        let player = win;

        tryAgain(win);


        function tryAgain()
        {
            table();
            buttons.forEach((number, i) =>
            {
                buttons[i].write();
            });

            writeText();
        }

        function writeText()
        {
            const text = "Player "+ player + " wins!";
            const size = ctx.measureText(text).width;

            ctx.font = "bold 60px atari"
            ctx.fillStyle = "red";
            ctx.fillText(scoreP1, cw/2 - 80, ch/2 - 80);
            ctx.fillText(scoreP2, cw/2 + 80, ch/2 - 80);
            ctx.font = "bold 30px atari"
            ctx.fillStyle = "white";
            ctx.fillRect(cw/2 - size/2 - 10, ch/2-40, size + 10, 40);
            ctx.fillStyle = "black";
            ctx.fillText(text, cw/2, ch/2);
        }

    }

}

let display;

const flags = 
{
    isGameStarted: false
}

const settings =
{
    pointsToWin: 3,
    difficulty: "Medium",
    sound: "ON"
}

menu.startMenu();
