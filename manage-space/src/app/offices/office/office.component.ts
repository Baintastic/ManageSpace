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
  randomColor: string = "";

  constructor() { }

  ngOnInit(): void {
    this.getBackgroundColor();
  }

  getBackgroundColor(): void {
    var colors = ['blue', 'red', 'purple', 'yellow', 'green', 'orange','brown','pink'];
    var randomIndex = this.getRandomInt(7);
     this.randomColor = colors[randomIndex];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  stateChanged(event: any){
    this.panelOpenState = !this.panelOpenState;
  }
}
