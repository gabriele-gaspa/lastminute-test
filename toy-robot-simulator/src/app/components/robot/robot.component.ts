import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Robot, RobotFacingDirection } from '../../types/robot.types';
import { ControllerService } from '../../services/controller.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss'
})
export class RobotComponent {

  @Input({required: true}) robot!: Robot;
}
