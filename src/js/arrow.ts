import { Vector } from "./vector";
import { Engine } from "./index";
import { Ray } from "./ray";

export class Arrow 
{
    constructor(engine: Engine) 
    {
        this.engine = engine;

        this.position = new Vector(Math.floor(Math.random() * engine.width),Math.floor(Math.random() * engine.height));
        this.direction = Math.floor(Math.random() * 360)
        this.updateDirection(this.direction);
    }

    private engine: Engine;
    private size: number = 7;
    private speed: number = 100;
    private detectionRadius = 100;

    public point1: Array<number>;
    public point2: Array<number>;
    public point3: Array<number>;

    public position: Vector;
    public direction: number;
    public directionVector: Vector;

    private ray: Ray;
        

    draw(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.point1[0], this.position.y + this.point1[1]);
        ctx.lineTo(this.position.x + this.point2[0], this.position.y + this.point2[1]);
        ctx.lineTo(this.position.x + this.point3[0], this.position.y + this.point3[1]);
        ctx.fill();
    }

    update(time: number): void 
    {
        if (this.position.x > this.engine.width) this.position.x -= this.engine.width;
        if (this.position.y > this.engine.height) this.position.y -= this.engine.height;

        if (this.position.x < 0) this.position.x += this.engine.width;
        if (this.position.y < 0) this.position.y += this.engine.height;

        this.position.x += this.directionVector.x * this.speed * time/1000;
        this.position.y += this.directionVector.y * this.speed * time/1000;

        //this.direction += 1;
        //this.newDirection(this.direction);
    }

    calcPoint(direction: number): Array<number>
    {
        let point: Array<number>;
        //console.log(direction)
        point = [Math.cos(direction*Math.PI/180)*this.size, Math.sin(direction*Math.PI/180)*this.size];
        
        return point
    }

    calcDirectionVector(direction: number): Array<number>
    {
        let point: Array<number>;
        //console.log(direction)
        point = [Math.cos(direction*Math.PI/180), Math.sin(direction*Math.PI/180)];
        
        return point 
    }

    CheckObstacle(ctx: CanvasRenderingContext2D): void
    {
        let tempPos: Vector = new Vector(this.point1[0], this.point1[1]);
        this.ray = new Ray(tempPos);

        let distObstacle = this.ray.castRay(ctx, this.detectionRadius, this.directionVector);
        if (distObstacle < this.detectionRadius && distObstacle != 0) 
        {
            this.ray.drawRay(ctx);
        }
    }

    updateDirection(direction: number): void
    {
        //Movement
        this.directionVector = new Vector(this.calcDirectionVector(direction)[0], this.calcDirectionVector(direction)[1]);

        //Triangle points
        this.point1 = this.calcPoint(direction);
        this.point2 = this.calcPoint(direction + 150);
        this.point3 = this.calcPoint(direction - 150);
    }

    // checkCollision(otherArrow: Arrow): void
    // {
    //     if (otherArrow.position.x < this.position.x + this.detectionRadius && otherArrow.position.x > this.position.x - this.detectionRadius)
    //     {
    //         if (otherArrow.position.y < this.position.y + this.detectionRadius && otherArrow.position.y > this.position.y - this.detectionRadius)
    //         {
    //             if (otherArrow.position.x > this.position.x && otherArrow.position.y > this.position.y) 
    //             {
    //                 //if ()
    //             }

    //             //else if (otherArrow.position.x > this.position)
    //         }
    //     }
    // }
}