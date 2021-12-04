import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];
  selectedOffice?: Office;
  
  constructor() { }

  ngOnInit(): void {
    this.getAllOffices();
  }

  onSelect(office: Office): void {
    this.selectedOffice = office;
    console.log('selected office is ', this.selectedOffice);
  }

  getAllOffices() {
    this.offices = [{
      id: 1,
      name: 'Specno',
      physicalAddress: '5 Royale Rd',
      emailAddress: 'spec@gmail.com',
      phoneNumber: '0312394999',
      maxCapacity: '6'
    },
    {
      id: 2,
      name: 'Carbon',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15'
    },
    ]
  }
}
