import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Office } from 'src/app/models/office';
import { Location } from '@angular/common';
import { OfficeService } from '../office.service';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
  office: Office | undefined;
  officeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private officeService: OfficeService
  ) { }

  ngOnInit(): void {
    this.getOfficeDetails();
  };

  getOfficeDetails(): void {
    this.officeId = this.route.snapshot.paramMap.get('id')!;
    this.officeService.getOfficebyId(this.officeId).subscribe(data => {
      this.office = data.data() as Office;
    })
  }

  goBack(): void {
    this.location.back();
  }
}
