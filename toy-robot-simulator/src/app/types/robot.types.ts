export type RobotFacingDirection = "north" | "south" | "west" | "est";

export type RobotPosition = {
    x: number;
    y: number;
    f: RobotFacingDirection
}

export class Robot {

    private _x: number | null;
    public get x(): number | null {
        return this._x;
    }
    
    private _y: number | null;
    public get y(): number | null {
        return this._y;
    }
    
    private _f: RobotFacingDirection | null;
    public get f(): RobotFacingDirection | null {
        return this._f;
    }

    /**
     * @param id the id of the robot
     * @param x horizontal position zero based
     * @param y vertical position zero based
     * @param f facing direction
     */
    constructor(x?: number, y?: number, f?: RobotFacingDirection) {
        this._x = x ?? null;
        this._y = y ?? null;
        this._f = f ?? null;
    }

    /**
     * @returns boolean which define if the robot is already placed in the table
     */
    public isPlaced(): boolean {
        return this._x !== null && this._y !== null && this._f !== null;
    }
    
    /**
     * set the position and the facing direction of the robot
     * @param x horizontal position zero based
     * @param y vertical position zero based
     * @param f facing direction
     */
    public place(x: number, y: number, f: RobotFacingDirection) {
        this._x = x;
        this._y = y;
        this._f = f;
    }
    
    /**
     * change the facing direction of the robot
     * @param f facing direction
     */
    public changeFacingDirection(f: RobotFacingDirection) {
        this._f = f;
    }
}