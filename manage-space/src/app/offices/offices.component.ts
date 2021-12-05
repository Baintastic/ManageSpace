import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllOffices();
  }

  getAllOffices() {
    this.offices = [{
      id: 1,
      name: 'Specno',
      physicalAddress: '5 Royale Rd',
      emailAddress: 'spec@gmail.com',
      phoneNumber: '0312394999',
      maxCapacity: '6',
      colour: 'red'
    },
    {
      id: 2,
      name: 'Carbon',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15',
      colour: 'red'
    },
    {
      id: 3,
      name: 'Red',
      physicalAddress: '5 Royale Rd',
      emailAddress: 'spec@gmail.com',
      phoneNumber: '0312394999',
      maxCapacity: '6',
      colour: 'red'
    },
    {
      id: 4,
      name: 'Yellow',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15',
      colour: 'red'
    },
    {
      id: 5,
      name: 'Blue',
      physicalAddress: '5 Royale Rd',
      emailAddress: 'spec@gmail.com',
      phoneNumber: '0312394999',
      maxCapacity: '6',
      colour: 'red'
    },
    {
      id: 2,
      name: 'Carbon',
      physicalAddress: '8 Royale Rd',
      emailAddress: 'carbon@gmail.com',
      phoneNumber: '0312394888',
      maxCapacity: '15',
      colour: 'red'
    },
    ]
  }
}
