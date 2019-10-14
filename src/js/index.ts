import { Arrow } from "./arrow";
import { Vector } from "./vector";

export class Engine
{
    public height: number;
    public width: number;

    public arrowAmount: number = 5;

    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public objects: Arrow[] = new Array<Arrow>();

    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    constructor()
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.height = this.canvas.height;
        this.width = this.canvas.width;

        this.drawArrow(this.arrowAmount)

        this.gameLoop();
    }

    private drawArrow(amount: number) 
    {
        for (let i: number = 0; i < amount; i++) 
        {
            let arrow: Arrow = new Arrow(this);
            arrow.draw(this.ctx);
            this.objects.push(arrow);
        }        
    }

    private gameLoop() 
    {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow-this.timeZero;
        this.timeZero=this.timeNow;

        this.objects.forEach(element => {
            element.CheckObstacle(this.ctx);

            element.update(time);

            element.draw(this.ctx);
        });

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }
}

new Engine();