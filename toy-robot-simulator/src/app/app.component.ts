import { Component, OnInit } from '@angular/core';
import { ControllerService } from './services/controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private controllerService: ControllerService) {}

  ngOnInit(): void {
    this.controllerService.initTable();
  }
}
