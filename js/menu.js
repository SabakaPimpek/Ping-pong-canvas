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

    write()
    {
        ctx.font = 'bold 30px Atari';
        
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

const menu = 
{
    mainMenu: () => {
        menu.background();
        menu.buttonWrite();
    },
    
    background: () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cw, ch);

        ctx.fillStyle = "white";
        ctx.font = 'bold 60px Atari';
        ctx.fillText("PING PONG", cw / 2, ch / 4);
    },

    buttonWrite: () =>
        {
        for(i=0; i<3; i++)
        {
            buttons[i].write();
        }
    },

    startInfo: () =>
    {
        {
            clearInterval(display)
            display = setInterval(infoMenu, 1000/ 60);
            buttons[3] = new Button(cw/2, ch-100, "Return", menu.startMenu)
        }

        function infoMenu()
        {
            ctx.fillStyle = "white";
            menu.background();
            ctx.font = 'bold 30px Atari';
            ctx.fillText("Gra zrobiona przez:", cw/2, ch/2);
            ctx.fillText("Sabaka Pimpek  2021", cw/2, ch/2 + 50)
            buttons[3].write();
        }
    },

    startMenu: () =>
    {   
        clearInterval(display);
        display = setInterval(menu.mainMenu, 1000/ 60);

    }

}

    let buttons = [];
    let names = ["Play", "Options", "Info"]
    let functions = [startGame,"", menu.startInfo]
    for(i=0; i<3; i++)
        {
            buttons[i] = new Button(cw/2, ch/2 + i*100, names[i], functions[i])
        }

let display;

const flags = 
{
    isGameStarted: false
}

menu.startMenu();
