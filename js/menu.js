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
        ctx.font = 'bold 30px Arial'
        if(mouse.y >= this.posY-30 && mouse.y <= this.posY+30) 
        {
            ctx.fillStyle = "red";
            if(mouse.isClicked === true)
            {
                this.func()
            }
        }
        else ctx.fillStyle = "white";
        ctx.fillText(this.text, this.posX, this.posY)
    }

}

function menu()
{
   background();
   buttonWrite();
}

function background()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);

    ctx.fillStyle = "white"
    ctx.font = 'bold 60px Arial';
    ctx.fillText("PING PONG", cw/2, ch/5);
}

function buttonWrite()
{
    for(i=0; i<3; i++)
    {
        Buttons[i].write();
    }
}


    let Buttons = [];
    let names = ["Graj", "Opcje", "Info"]
    let functions = [newGame,"", ""]
    for(i=0; i<3; i++)
        {
            Buttons[i] = new Button(cw/2, ch/2 + i*100, names[i], functions[i])
        }

    let display = setInterval(menu, 1000/ 60);

    let isGameStarted = false;
