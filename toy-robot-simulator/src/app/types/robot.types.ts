export type RobotFacingDirection = "north" | "south" | "west" | "est";

export type RobotPosition = {
    x: number;
    y: number;
    f: RobotFacingDirection
}

export class Robot {

    private _x?: number;
    public get x(): number | undefined {
        return this._x;
    }
    
    private _y?: number;
    public get y(): number | undefined {
        return this._y;
    }
    
    private _f?: RobotFacingDirection;
    public get f(): RobotFacingDirection | undefined {
        return this._f;
    }

    /**
     * @param id the id of the robot
     * @param x horizontal position zero based
     * @param y vertical position zero based
     * @param f facing direction
     */
    constructor(x?: number, y?: number, f?: RobotFacingDirection) {
        this._x = x;
        this._y = y;
        this._f = f;
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