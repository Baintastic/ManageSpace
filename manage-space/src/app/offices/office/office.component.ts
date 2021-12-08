import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OfficeI } from 'src/app/models/office';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.officeId = this.office?.id!;
  }

  stateChanged(event: any) {
    this.panelOpenState = !this.panelOpenState;
  }

  goToEditOffice(){
    if (this.router.url.includes("/offices")) {
      this.router.navigate(['/detail/', this.officeId]);
    }
    else{
      var officeId = this.route.snapshot.paramMap.get('id')!;
      this.router.navigate(['/edit-office/', officeId]);
    }
  }
}
