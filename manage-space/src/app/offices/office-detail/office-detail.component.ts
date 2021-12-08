import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeI } from 'src/app/models/office';
import { Location } from '@angular/common';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
  office: OfficeI | undefined;
  officeId: string = '';
  isSpinnerLoading: boolean = true;

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
    this.officeService.listenToOfficeById(this.officeId).subscribe(data => {
      this.office = data as OfficeI;
      this.isSpinnerLoading = false;
    })
  }

  goBack(): void {
    this.location.back();
  }
}
