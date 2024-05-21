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

  public get rows(): Array<Array<TableCell>> {
    const rowsGrouped: Array<Array<TableCell>> = new Array();
    this.cells.forEach(cell => {
      if(!rowsGrouped[cell.x]) {
        rowsGrouped[cell.x] = new Array();
      }
      rowsGrouped[cell.x].push(cell);
    });
    return rowsGrouped;
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
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private initTable() {
    for(let x = 0; x < this.rowsNumber; x++) {
      for(let y = 0; y < this.colsNumber; y++) {
        this.cells.push({
          x: x,
          y: y,
          status: 'empty'
        });
      }
    }
  }

  private moveRobot() {
    let { x, y, f } = this.robot;
    if(!x || !y || !f) return;
    switch(f) {
        case 'north': y -= 1; break;
        case 'south': y += 1; break;
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
    let { x, y, f } = this.robot;
    if(!x || !y || !f) return;
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
    let { x, y, f } = this.robot;
    if(!x || !y || !f) return;
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
}
