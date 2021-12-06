import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';
import { map } from 'rxjs/operators';
import { OfficeService } from './office.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {
  offices: Office[] = [];

  constructor(private officeService: OfficeService) { }

  ngOnInit(): void {
    this.getAllOffices();
  }

  getAllOffices(): void {
    this.officeService.getAllOffices().subscribe(data => {
      this.offices = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Office
        }
      })
    });
  }
}
