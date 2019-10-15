import { Vector } from "./vector";

export class Detection
{
    constructor(pos: Vector, radius: number, direction: number, points: number) 
    {
        this.pos = pos;
        this.radius = radius;
        this.direction = direction;
        this.calcPoints(points, this.direction);
    }    
    
    private radius: number;
    private pos: Vector;
    private direction: number;

    public points: Vector[];

    calcPoints(nPoints: number, direction: number): void
    {
        this.points = [];
        this.points.push(this.pos)
        let pointDif = 300 / nPoints;
        let pointStart = direction - 150;

        for (let i = 0; i < nPoints; i++)
        {
            let x = this.pos.x + Math.cos(pointStart * Math.PI/180)*this.radius;
            let y = this.pos.y + Math.sin(pointStart * Math.PI/180)*this.radius;
            let tempVector: Vector = new Vector(x,y);

            this.points.push(tempVector);
            pointStart += pointDif;
        }
    }

    contains(bounds: Vector[], x: number, y: number): number {
        //https://rosettacode.org/wiki/Ray-casting_algorithm
        var count = 0;
        for (var b = 0; b < bounds.length; b++) {
            var vertex1 = bounds[b];
            var vertex2 = bounds[(b + 1) % bounds.length];
            if (this.west(vertex1, vertex2, x, y))
                ++count;
        }
        return count % 2;
    }
     
    west(A: Vector, B: Vector, x: number, y: number): Boolean {
        if (A.y <= B.y) 
        {
            if (y <= A.y || y > B.y || x >= A.x && x >= B.x) 
            {
                return false;
            }
            else if (x < A.x && x < B.x) 
            {
                return true;
            } 
            else 
            {
                return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
            }
        } 
        else 
        {
            return this.west(B, A, x, y);
        }
    }

    drawCircle(ctx: CanvasRenderingContext2D): void 
    {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        this.points.forEach(element => {
            ctx.lineTo(element.x, element.y)
        });
        ctx.lineTo(this.pos.x, this.pos.y)
        ctx.stroke();
    }
}