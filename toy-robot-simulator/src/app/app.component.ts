import { Component, OnInit } from '@angular/core';
import { ControllerService } from './services/controller.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private controllerService: ControllerService,
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {      
  }

  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('robot', this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/robot.svg"));
    this.controllerService.initTable();
  }
}
