import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/models/office';
import { Location } from '@angular/common';
import { OfficeService } from '../office.service';
import { StaffMember } from 'src/app/models/staff-member';
import { MemberService } from 'src/app/staff-members/member.service';

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
  selectedOffice?: Office;
  officeId: string = '';

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
      this.isAddMode = true;
    }
    else {
      this.isAddMode = false;
      this.officeId = this.route.snapshot.paramMap.get('id')!;
      this.officeService.getOfficebyId(this.officeId).subscribe(data => {
        this.selectedOffice = data.data() as Office;

        this.officeForm.get('name')?.setValue(this.selectedOffice?.name);
        this.officeForm.get('physicalAddress')?.setValue(this.selectedOffice?.physicalAddress);
        this.officeForm.get('emailAddress')?.setValue(this.selectedOffice?.emailAddress);
        this.officeForm.get('phoneNumber')?.setValue(this.selectedOffice?.phoneNumber);
        this.officeForm.get('maxCapacity')?.setValue(this.selectedOffice?.maxCapacity);
        this.officeForm.get('colour')?.setValue(this.selectedOffice?.colour);
        this.selectedColour = this.selectedOffice?.colour!;
      })
    }
    this.colors = ['orange', 'pink', 'orangered', 'brown', 'yellow', 'darkorchid', 'lightblue', 'green', 'lightskyblue', 'blue', 'slateblue'];
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
    var office = this.getOfficeFormvalues();
    this.officeService.createOffice(office).then(() => {
      console.log('Created new office successfully!');
    });
  }

  updateOfficeDetails(): void {
    var office = this.getOfficeFormvalues();
    if (this.selectedOffice) {
      this.officeService.updateOffice(this.officeId, office)
        .then(() => console.log('Updated office details successfully!'))
        .catch(err => console.log(err));
    }
  }

  goBack(): void {
    this.location.back();
  }

  getOfficeFormvalues(): Office {
    var office: Office = {
      name: this.officeForm.value.name,
      phoneNumber: this.officeForm.value.phoneNumber,
      physicalAddress: this.officeForm.value.physicalAddress,
      emailAddress: this.officeForm.value.emailAddress,
      maxCapacity: this.officeForm.value.maxCapacity,
      colour: this.officeForm.value.colour,
    };
    return office;
  }

  deleteOffice(): void{
    //Get and delete all office staff members before deleting an office
    this.memberService.getAllMembers(this.officeId).subscribe(data => {
      var staffMembers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as StaffMember
        }
      })

      staffMembers.forEach(member => {
        this.deleteStaffMember(member.id);
      });

      this.officeService.deleteOffice(this.officeId)
        .then(() => console.log('Deleted office successfully!')
        )
        .catch(err => console.log(err));
    });
  }

  deleteStaffMember(memberId: string) {
    this.memberService.deleteMember(memberId)
      .then(() => console.log('Deleted staff successfully!')
      )
      .catch(err => console.log(err));
  }

}
