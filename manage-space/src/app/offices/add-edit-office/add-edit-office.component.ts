import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/models/office';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-office',
  templateUrl: './add-edit-office.component.html',
  styleUrls: ['./add-edit-office.component.css']
})
export class AddEditOfficeComponent implements OnInit {
  officeForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    physicalAddress: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    maxCapacity: ['', Validators.required],
    colour: ['', Validators.required],
  });
  id: string = '';
  isAddMode: boolean = true;
  officeDetails?: Office;
  colors: string[] = [];
  selectedColour: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.officeDetails = {
        id: 1,
        name: 'Specno',
        physicalAddress: '5 Royale Rd',
        emailAddress: 'spec@gmail.com',
        phoneNumber: '0312394999',
        maxCapacity: '6',
        colour: 'yellow'
      };

      this.officeForm.get('name')?.setValue(this.officeDetails.name);
      this.officeForm.get('physicalAddress')?.setValue(this.officeDetails.physicalAddress);
      this.officeForm.get('emailAddress')?.setValue(this.officeDetails.emailAddress);
      this.officeForm.get('phoneNumber')?.setValue(this.officeDetails.phoneNumber);
      this.officeForm.get('maxCapacity')?.setValue(this.officeDetails.maxCapacity);
      this.officeForm.get('colour')?.setValue(this.officeDetails.colour);

      if (this.officeDetails !== null) {
        this.selectedColour = this.officeDetails.colour;
      }
    }
    this.colors = ['orange', 'pink', 'orangered', 'brown', 'yellow', 'darkorchid', 'lightblue', 'green', 'lightskyblue', 'blue', 'slateblue'];
  }

  get f() { return this.officeForm?.controls; }

  onSubmit() {
    console.log(this.officeForm)
    if (this.isAddMode) {
      this.addOffice();
    } else {
      this.updateOffice();
    }
  }

  addOffice(): void {
    console.log('office add');
  }

  updateOffice(): void {
    console.log('office updated');
  }

  goBack(): void {
    this.location.back();
  }
}
