import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RobotFacingDirection, RobotPosition } from '../../types/robot.types';
import { WithControlsFrom } from '../../types/forms.types';
import { ControllerService } from '../../services/controller.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.scss'
})
export class ControllerComponent implements OnInit {

  public placeRobotForm!: FormGroup<WithControlsFrom<RobotPosition>>;

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    this.placeRobotForm = new FormGroup<WithControlsFrom<RobotPosition>>({
      x: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(5)] }),
      y: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(5)]}),
      f: new FormControl<RobotFacingDirection>('north', { nonNullable: true, validators: [Validators.required]})
    });
  }

  public placeRobotFormSubmit() {
    if(this.placeRobotForm.valid) {
      const value: RobotPosition = this.placeRobotForm.value as RobotPosition;
      this.controllerService.placeRobot(value)
    }
  }

  public turnLeftRobot() {
    this.controllerService.turnLeftRobot();
  }

  public turnRightRobot() {
    this.controllerService.turnRightRobot();
  }

  public moveRobot() {
    this.controllerService.moveRobot();
  }
}
