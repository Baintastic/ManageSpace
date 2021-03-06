import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeI } from 'src/app/models/office';
import { Location } from '@angular/common';
import { OfficeService } from '../../services/office.service';
import { StaffMemberI } from 'src/app/models/staff-member';
import { MemberService } from 'src/app/services/member.service';

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
  isAddMode: boolean = false;
  colors: string[] = [];
  selectedColour: string = '';
  selectedOffice?: OfficeI;
  officeId: string = '';
  isSpinnerLoading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private officeService: OfficeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes("/add-office")) { 
        this.isSpinnerLoading = false;
        this.isAddMode = true;
    }
    else {
      this.isAddMode = false;
      this.officeId = this.route.snapshot.paramMap.get('id')!;
      this.officeService.getOfficebyId(this.officeId).subscribe(data => {
        this.selectedOffice = data.data() as OfficeI;
        this.bindValuesToOfficeForm();
        this.isSpinnerLoading = false;
      })
    }
    this.colors = ['orange', 'pink', 'orangered', 'brown', 'yellow', 'darkorchid', 'lightblue', 'green', 'lightskyblue', 'blue', 'slateblue'];
  }

    bindValuesToOfficeForm(): void {
    this.officeForm.get('name')?.setValue(this.selectedOffice?.name);
    this.officeForm.get('physicalAddress')?.setValue(this.selectedOffice?.physicalAddress);
    this.officeForm.get('emailAddress')?.setValue(this.selectedOffice?.emailAddress);
    this.officeForm.get('phoneNumber')?.setValue(this.selectedOffice?.phoneNumber);
    this.officeForm.get('maxCapacity')?.setValue(this.selectedOffice?.maxCapacity);
    this.officeForm.get('colour')?.setValue(this.selectedOffice?.colour);
    this.selectedColour = this.selectedOffice?.colour!;
  }

  get f() { return this.officeForm?.controls; }

  onSubmit(): void {
    if (this.isAddMode) {
      this.addNewOffice();
    } else {
      this.updateOfficeDetails();
    }
  }

  addNewOffice(): void {
    this.isSpinnerLoading = true;
    var office = this.getOfficeFormvalues();
    this.officeService.createOffice(office)
      .then(() => {
        console.log('Created new office successfully!');
        this.isSpinnerLoading = false;
        this.router.navigate(['/offices']);
      }).catch((err: any) => console.log(err));
  }

  updateOfficeDetails(): void {
    this.isSpinnerLoading = true;
    var office = this.getOfficeFormvalues();
    if (this.selectedOffice) {
      this.officeService.updateOffice(this.officeId, office)
        .then(() => {
          console.log('Updated office details successfully!')
          this.isSpinnerLoading = false;
          this.router.navigate(['/offices']);
        }).catch(err => console.log(err));
    }
  }

  goBack(): void {
    this.location.back();
  }

  getOfficeFormvalues(): OfficeI {
    var office: OfficeI = {
      name: this.officeForm.value.name,
      phoneNumber: this.officeForm.value.phoneNumber,
      physicalAddress: this.officeForm.value.physicalAddress,
      emailAddress: this.officeForm.value.emailAddress,
      maxCapacity: this.officeForm.value.maxCapacity,
      colour: this.officeForm.value.colour,
      numberOfPresentStaff: 0
    };
    return office;
  }

  deleteOffice(): void {
    this.isSpinnerLoading = true;
    //Get and delete all office staff members before deleting an office
    this.memberService.getAllMembersByOfficeId(this.officeId).subscribe(data => {
      var staffMembers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as StaffMemberI
        }
      })

      staffMembers.forEach(member => {
        this.deleteStaffMember(member.id);
      });

      this.officeService.deleteOffice(this.officeId)
        .then(() => {
          console.log('Deleted office successfully!');
          this.isSpinnerLoading = false;
          this.router.navigate(['/offices']);
        }).catch(err => console.log(err));
    });
  }

  deleteStaffMember(memberId: string) {
    this.memberService.deleteMember(memberId)
      .then(() => console.log('Deleted staff successfully!')
      ).catch(err => console.log(err));
  }

}
