import { Engine } from "./index"
import { Vector } from "./vector";

export class Ray 
{
    constructor(startPos: Vector) 
    {
        this.startPos = startPos;
        this.rayPos = startPos;
    }
    
    public engine: Engine;
    private startPos: Vector;
    private rayPos: Vector;

    castRay(ctx: CanvasRenderingContext2D, radius: number, direction: Vector): number 
    {
        let count = 0;
        for (let i = 0; i < radius; i++) 
        {
            if (this.checkObstacle(ctx)) return count;

            this.rayPos.x += direction.x*2;
            this.rayPos.y += direction.y*2;
            count++;
        }
        return count;
    }

    checkObstacle(ctx: CanvasRenderingContext2D): Boolean
    {
        var imgData = ctx.getImageData(this.rayPos.x, this.rayPos.y, 1, 1);

        //console.log(imgData.data);
        if (imgData.data[0] == 255 && imgData.data[1] == 255 && imgData.data[2] == 255) return true;
        return false;
    }

    drawRay(ctx: CanvasRenderingContext2D): void 
    {
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.startPos.x, this.startPos.y);
        ctx.lineTo(this.rayPos.x, this.rayPos.y);
        ctx.stroke();
    }
}