import { Component, Input, OnInit } from '@angular/core';
import { Office } from 'src/app/models/office';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {
  @Input() office?: Office;
  panelOpenState = false;
  
  constructor() { }

  ngOnInit(): void {
    console.log('im in !! it is ',this.office)
  }
}
