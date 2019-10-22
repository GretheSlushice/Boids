import { Vector } from "./vector";
import { Engine } from "./index";
import { Detection } from "./detectionCircle";

export class Arrow {
    constructor(engine: Engine) {
        this.engine = engine;

        this.position = new Vector(Math.floor(Math.random() * engine.width), Math.floor(Math.random() * engine.height));
        this.direction = Math.floor(Math.random() * 360);
        this.updateDirection(this.direction);
        this.detectionCircle = new Detection(this.position, this.detectionRadius, this.direction, 20);
    }

    private engine: Engine;
    private size: number = 7;
    private speed: number = 200;
    private detectionRadius = 100;

    public point1: Array<number>;
    public point2: Array<number>;
    public point3: Array<number>;

    public position: Vector;
    public direction: number;
    private dirOffset: number = 0;
    public directionVector: Vector;

    public detectionCircle: Detection;


    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.point1[0], this.position.y + this.point1[1]);
        ctx.lineTo(this.position.x + this.point2[0], this.position.y + this.point2[1]);
        ctx.lineTo(this.position.x + this.point3[0], this.position.y + this.point3[1]);
        ctx.fill();
    }

    update(time: number): void {
        if (this.position.x > this.engine.width) this.position.x -= this.engine.width;
        if (this.position.y > this.engine.height) this.position.y -= this.engine.height;

        if (this.position.x < 0) this.position.x += this.engine.width;
        if (this.position.y < 0) this.position.y += this.engine.height;

        this.position.x += this.directionVector.x * this.speed * time / 1000;
        this.position.y += this.directionVector.y * this.speed * time / 1000;

        this.direction += this.dirOffset;
        this.updateDirection(this.direction);
        this.detectionCircle.calcPoints(20, this.direction);
        this.dirOffset = 0;

    }

    calcPoint(direction: number): Array<number> {
        let point: Array<number>;
        //console.log(direction)
        point = [Math.cos(direction * Math.PI / 180) * this.size, Math.sin(direction * Math.PI / 180) * this.size];

        return point
    }

    calcDirectionVector(direction: number): Array<number> {
        let point: Array<number>;
        //console.log(direction)
        point = [Math.cos(direction * Math.PI / 180), Math.sin(direction * Math.PI / 180)];

        return point
    }

    updateDirection(direction: number): void {
        if (direction >= 360) {
            this.direction -= 360;
            direction -= 360;
        }
        else if (direction < 0) {
            this.direction += 360;
            direction += 360;
        }
        //Movement
        this.directionVector = new Vector(this.calcDirectionVector(direction)[0], this.calcDirectionVector(direction)[1]);

        //Triangle points
        this.point1 = this.calcPoint(direction);
        this.point2 = this.calcPoint(direction + 150);
        this.point3 = this.calcPoint(direction - 150);
    }

    calcWeight(vector: Vector): number {
        let dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

        if (dist >= 5) return 50 / dist;
        else return 10;
    }

    avoidObstacle(obstacleDir: Vector): void {
        let weight = this.calcWeight(obstacleDir);
        if (this.direction < 180) {
            if (obstacleDir.x > 0 && obstacleDir.y > 0) this.dirOffset -= 1 * weight;
            else if (obstacleDir.x > 0 && obstacleDir.y < 0) this.dirOffset += 1 * weight;
            else if (obstacleDir.x < 0 && obstacleDir.y < 0) this.dirOffset += 1 * weight;
            else if (obstacleDir.x < 0 && obstacleDir.y > 0) this.dirOffset -= 1 * weight;
        }
        else {
            if (obstacleDir.x > 0 && obstacleDir.y > 0) this.dirOffset += 1 * weight;
            else if (obstacleDir.x > 0 && obstacleDir.y < 0) this.dirOffset -= 1 * weight;
            else if (obstacleDir.x < 0 && obstacleDir.y < 0) this.dirOffset -= 1 * weight;
            else if (obstacleDir.x < 0 && obstacleDir.y > 0) this.dirOffset += 1 * weight;
        }
    }

    alignBoid(boidDir: number, weight: number): void {
        if (boidDir >= 270 && this.direction < 90) {
            if (boidDir > this.direction) this.dirOffset -= 1 * weight;
            else this.dirOffset += 1 * weight;
        }
        else {
            if (boidDir > this.direction) this.dirOffset += 1 * weight;
            else this.dirOffset -= 1 * weight;
        }
    }

    steerBoidCenter(boidCenter: Vector): void {
        let centerDir = Math.atan(boidCenter.y / boidCenter.x) * 180 / Math.PI;
        let weight = this.calcWeight(boidCenter);
        this.alignBoid(centerDir, weight);
    }
}