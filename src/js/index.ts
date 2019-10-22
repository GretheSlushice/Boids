import { Arrow } from "./arrow";
import { Vector } from "./vector";

export class Engine
{
    public height: number;
    public width: number;

    public arrowAmount: number = 50;

    private canvas: HTMLCanvasElement;
    private inputSep: HTMLInputElement = <HTMLInputElement> document.getElementById("separation");
    private inputAlign: HTMLInputElement = <HTMLInputElement> document.getElementById("alignment");
    private inputCohes: HTMLInputElement = <HTMLInputElement> document.getElementById("cohesion");
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

    private calcAveragePos(arrows: Arrow[])
    {
        let average: Vector = new Vector(0,0)
        arrows.forEach(element => {
            average.x += element.position.x;
            average.y += element.position.y;
        });
        average.x /= arrows.length;
        average.y /= arrows.length;

        return average;
    }

    private calcAverageDir(arrows: Arrow[])
    {
        let average = 0;
        arrows.forEach(element => {
            average += element.direction
        });

        return average/arrows.length;
    }

    private gameLoop() 
    {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow-this.timeZero;
        this.timeZero=this.timeNow;

        this.objects.forEach(element => {
            this.objects.forEach(otherElement => {
                if (element != otherElement) 
                {
                    let n = element.detectionCircle.contains(element.detectionCircle.points, otherElement.position.x, otherElement.position.y);
                    if (n == 1) 
                    {
                        //Rule 1: Avoid eachother
                        if (this.inputSep.checked) 
                        {
                            let dirVector = new Vector(otherElement.position.x - element.position.x, otherElement.position.y - element.position.y)
                            element.avoidObstacle(dirVector);
                        }
                    }
                }
            });
            let elements: Arrow[] = [];
            this.objects.forEach(otherElement => {
                if (element != otherElement)
                {
                    let n = element.detectionCircle.contains(element.detectionCircle.points, otherElement.position.x, otherElement.position.y);
                    if (n == 1)
                    {
                        elements.push(otherElement);
                    }
                }
            });
                                                                   
            //Rule 2: Align with a boid
            if (this.inputAlign.checked)
            {
                let averageDir = this.calcAverageDir(elements);
                element.alignBoid(averageDir, 2);
            }
            
            //Rule 3: Steer towards boid center
            if (this.inputCohes.checked)
            {
                let averagePos = this.calcAveragePos(elements);
                let dirVector = new Vector(averagePos.x - element.position.x, averagePos.y - element.position.y);
                element.steerBoidCenter(dirVector);
            }
            element.update(time);

            element.draw(this.ctx);
        });

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }
}

new Engine();