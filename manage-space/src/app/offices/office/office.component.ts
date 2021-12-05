import { Component, Input, OnInit } from '@angular/core';
import { Office } from 'src/app/models/office';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  @Input() office?: any;
  panelOpenState = false;
  randomColor: string = "";
  officeId: string = '';

  constructor() { }

  ngOnInit(): void {
    this.officeId = this.office?.id!;
  }

  stateChanged(event: any) {
    this.panelOpenState = !this.panelOpenState;
  }
}
