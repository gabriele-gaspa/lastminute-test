import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TableCell, TableCellStatus } from '../../types/table.types';
import { Robot, RobotFacingDirection, RobotPosition } from '../../types/robot.types';
import { ControllerService } from '../../services/controller.service';
import { Observable, Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnDestroy {

  private readonly rowsNumber: number = 5;
  public readonly colsNumber: number = 5;

  @Input({required: true}) tableId!: string;

  public loaded$!: Observable<boolean>;

  public cells: TableCell[] = new Array();
  public robot: Robot = new Robot();

  private subscription?: Subscription;

  private _row?: Array<Array<TableCell>>;
  public get rows(): Array<Array<TableCell>> {
    if(!this._row) {
      const rowsGrouped: Array<Array<TableCell>> = new Array();
      this.cells.forEach(cell => {
        if(!rowsGrouped[cell.y]) {
          rowsGrouped[cell.y] = new Array();
        }
        rowsGrouped[cell.y].push(cell);
      });
      this._row = rowsGrouped.reverse();
    }
    return this._row;
  }

  constructor(private controllerService: ControllerService) {}


  ngOnInit(): void {
    this.loaded$ = this.controllerService.initTable$.pipe(
      tap(() => this.initTable()),
      map(() => true)
    );
    this.subscription = this.controllerService.placeRobot$.subscribe((position: RobotPosition) => {
      this.placeRobot(position.x, position.y, position.f);
    });
    this.subscription.add(this.controllerService.moveRobot$.subscribe(() => this.moveRobot()));
    this.subscription.add(this.controllerService.turnLeftRobot$.subscribe(() => this.turnLeftRobot()));
    this.subscription.add(this.controllerService.turnRightRobot$.subscribe(() => this.turnRightRobot()));
    this.subscription.add(this.controllerService.reportRobot$.subscribe(() => this.reportRobot()));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private initTable() {
    for(let y = this.rowsNumber - 1; y >= 0; y--) {
      for(let x = 0; x < this.colsNumber; x++) {
        this.cells.push({
          x: x,
          y: y,
          status: 'empty'
        });
      }
    }
  }

  private moveRobot() {
    if(!this.robot.isPlaced()) return;
    let x: number = this.robot.x!;
    let y: number = this.robot.y!;
    let f: RobotFacingDirection = this.robot.f!;
    switch(f) {
        case 'north': y += 1; break;
        case 'south': y -= 1; break;
        case 'west': x -= 1; break
        case 'est': x += 1; break;
        default: {
          console.warn("unexpected value");
          return;
        }
    }
    if(this.isCellAvailable(x, y)) {
      this.updateCellStatus(this.robot.x!, this.robot.y!, 'empty');
      this.updateCellStatus(x, y, 'full');
      this.robot.place(x, y, f);
    }
  }

  private placeRobot(x: number, y: number, f: RobotFacingDirection) {
    if(this.robot.x != x || this.robot.y != y) {
      if(this.isCellAvailable(x, y)) {
        if(this.robot.x && this.robot.y) {
          this.updateCellStatus(this.robot.x!, this.robot.y!, 'empty');
        }
        this.updateCellStatus(x, y, 'full');
        this.robot.place(x, y, f);
      }
    }
    else if(this.robot.f != f) {
      this.changeFacingDirectionRobot(f);
    }
  }

  private turnLeftRobot() {
    if(!this.robot.isPlaced()) return;
    let f: RobotFacingDirection = this.robot.f!;
    switch(f) {
        case 'north': f = 'west'; break;
        case 'south': f = 'est'; break;
        case 'west': f = 'south'; break
        case 'est': f = 'north'; break;
        default: {
          console.warn("unexpected value");
          return;
        }
    }
    this.changeFacingDirectionRobot(f);
  }

  private turnRightRobot() {
    if(!this.robot.isPlaced()) return;
    let f: RobotFacingDirection = this.robot.f!;
    switch(f) {
        case 'north': f = 'est'; break;
        case 'south': f = 'west'; break;
        case 'west': f = 'north'; break
        case 'est': f = 'south'; break;
        default: {
          console.warn("unexpected value");
          return;
        }
    }
    this.changeFacingDirectionRobot(f);
  }

  private changeFacingDirectionRobot(f: RobotFacingDirection) {
    this.robot.changeFacingDirection(f);
  }

  private isCellAvailable(x: number, y: number): boolean {
    return this.cells.find(cell => cell.x == x && cell.y == y)?.status == "empty";
  }

  private updateCellStatus(x: number, y: number, status: TableCellStatus) {
    this.cells.find(cell => cell.x == x && cell.y == y)!.status = status;
  }

  public isRobotHere(cell: TableCell): boolean {
    return cell.status == 'full' && this.robot.x == cell.x && this.robot.y == cell.y;
  }

  public onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        this.moveRobotTo("south");
        break;
      case "ArrowUp":
        this.moveRobotTo("north");
        break;
      case "ArrowLeft":
        this.moveRobotTo("west");
        break;
      case "ArrowRight":
        this.moveRobotTo("est");
        break;
      default: {
        //key not allowed
      }
    }
  }

  public moveRobotTo(direction: RobotFacingDirection) {
    if(this.robot.f != direction) {
      this.robot.changeFacingDirection(direction);
      return;
    }
    this.moveRobot();
    
  }

  public reportRobot() {
    if(!this.robot.isPlaced()) return;
    let x: number = this.robot.x!;
    let y: number = this.robot.y!;
    let f: RobotFacingDirection = this.robot.f!;
    alert(`Robot -> x: ${x}, y: ${y}, f: ${f}`);
  }

  public trackByFn(index: number, item: TableCell[] | TableCell) {
    return item;
  }
}
