import { Component, Input } from '@angular/core';
import { Robot } from '../../types/robot.types';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss'
})
export class RobotComponent {

  @Input({required: true}) robot!: Robot;

  //gestire keydown e mandare segnale al controller service
}
