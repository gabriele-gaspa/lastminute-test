import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { RobotFacingDirection, RobotPosition } from '../types/robot.types';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private initTableSubject: ReplaySubject<void> = new ReplaySubject(1);
  public get initTable$(): Observable<void> {
    return this.initTableSubject.asObservable();
  }

  private placeRobotSubject: Subject<RobotPosition> = new Subject();
  public get placeRobot$(): Observable<RobotPosition> {
    return this.placeRobotSubject.asObservable();
  }

  private moveRobotSubject: Subject<void> = new Subject();
  public get moveRobot$(): Observable<void> {
    return this.moveRobotSubject.asObservable();
  }

  private turnLeftRobotSubject: Subject<void> = new Subject();
  public get turnLeftRobot$(): Observable<void> {
    return this.turnLeftRobotSubject.asObservable();
  }

  private turnRightRobotSubject: Subject<void> = new Subject();
  public get turnRightRobot$(): Observable<void> {
    return this.turnRightRobotSubject.asObservable();
  }

  private reportRobotSubject: Subject<void> = new Subject();
  public get reportRobot$(): Observable<void> {
    return this.reportRobotSubject.asObservable();
  }

  constructor() { }

  /**
   * init the component table
   */
  public initTable = () => this.initTableSubject.next();

  /**
   * place the robot in a specific position
   * @param position the object with the position of the robot
   */
  public placeRobot = (position: RobotPosition) => this.placeRobotSubject.next(position);

  /**
   * move the robot in the facing direction by 1 unit
   */
  public moveRobot = () => this.moveRobotSubject.next();
  
  /**
   * turn the robot of the 90° on the left
   */
  public turnLeftRobot = () => this.turnLeftRobotSubject.next();
  
  /**
   * turn the robot of the 90° on the right
   */
  public turnRightRobot = () => this.turnRightRobotSubject.next();

  /**
   * report the position of the robot
   */
  public reportRobot = () => this.reportRobotSubject.next();
}
