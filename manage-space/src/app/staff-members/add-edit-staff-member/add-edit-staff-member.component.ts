import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffMemberI } from 'src/app/models/staff-member';
import { Location } from '@angular/common';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { OfficeService } from 'src/app/offices/office.service';
import { OfficeI } from 'src/app/models/office';
import { WizardHelperService } from 'src/app/services/shared/wizard-helper.service';

@Component({
  selector: 'app-add-edit-staff-member',
  templateUrl: './add-edit-staff-member.component.html',
  styleUrls: ['./add-edit-staff-member.component.css']
})
export class AddEditStaffMemberComponent implements OnInit {
  @Input() memberId!: string;
  @Input() officeId!: string;
  @Input() isAddMode: boolean = false;

  memberForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    avatar: ['', Validators.required],
  });
  avatars: string[] = [];
  selectedAvatar: string = '';
  selectedStaffMember?: StaffMemberI;
  currentTab: number = 0;
  isSpinnerLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    public activeModal: NgbActiveModal,
    private memberService: MemberService,
    private officeService: OfficeService,
    private wizardHelperService: WizardHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.avatars = this.getAvatarUrls();
    if (!this.isAddMode) {
      this.isSpinnerLoading = true;
      this.isAddMode = false;
      this.memberService.getMemberbyId(this.memberId).subscribe(data => {
        this.selectedStaffMember = data.data() as StaffMemberI;
        this.bindValuesToMemberForm();
        this.isSpinnerLoading = false;
      })
    }
    this.wizardHelperService.showTab(this.currentTab, this.isAddMode, false);
  }

  getAvatarUrls(): string[] {
    return ['https://gravatar.com/avatar/8f86daeeef9b6268d9571717089f8ea6?s=400&d=robohash&r=x',
      'https://robohash.org/8f86daeeef9b6268d9571717089f8ea6?set=set4&bgset=&size=200x200',
      'https://robohash.org/8f86daeeef9b6268d9571717089f8ea6?set=set2&bgset=bg1&size=200x200',
      'https://robohash.org/8f86daeeef9b6268d9571717089f8ea6?set=set3&bgset=bg1&size=200x200',
      'https://gravatar.com/avatar/8cff925a90d93c2321b5eb03ca38ee69?s=200&d=robohash&r=x',
      'https://gravatar.com/avatar/adb9c2f4ff9838fa626e1bdb44f81fd9?s=200&d=robohash&r=x',
      'https://gravatar.com/avatar/f95254b4f811ea7ff181eb39583272fc?s=400&d=robohash&r=x',
      'https://robohash.org/137d88fe4d76f86806bae6329030471a?set=set4&bgset=&size=400x400']
  }

  bindValuesToMemberForm(): void {
    this.memberForm.get('firstName')?.setValue(this.selectedStaffMember?.firstName);
    this.memberForm.get('lastName')?.setValue(this.selectedStaffMember?.lastName);
    this.memberForm.get('avatar')?.setValue(this.selectedStaffMember?.avatar);
    this.selectedAvatar = this.selectedStaffMember?.avatar!;
  }

  get f() { return this.memberForm?.controls; }

  onSubmit() {
    if (this.isAddMode) {
      this.addStaffMember();
    } else {
      this.updateStaffMember();
    }
  }

  addStaffMember(): void {
    this.activeModal.dismiss('Cross click')
    this.isSpinnerLoading = true;
    var member = this.getMemberFormvalues();

    this.officeService.getOfficebyId(member.officeId).subscribe(data => {
      var office = data.data() as OfficeI;
      this.isSpinnerLoading = false;
      office.numberOfPresentStaff = office.numberOfPresentStaff += 1;

      this.memberService.createMember(member).then(() => {
        console.log('Created new member successfully!');

        this.officeService.updateOffice(member.officeId, office)
          .then(() => {
            console.log('Updated office details successfully!');
            this.isSpinnerLoading = false;
            this.router.navigate(['/detail/', this.officeId]);
          })
          .catch(err => console.log(err));
      });
    })
  }

  updateStaffMember(): void {
    this.activeModal.dismiss('Cross click')
    this.isSpinnerLoading = true;
    var member = this.getMemberFormvalues();
    if (this.selectedStaffMember) {
      this.memberService.updateMember(this.memberId, member)
        .then(() => {
          console.log('Updated member details successfully!');
          this.isSpinnerLoading = false;
        })
        .catch(err => console.log(err));
    }
  }

  goBack(): void {
    this.location.back();
  }

  getMemberFormvalues(): StaffMemberI {
    var office: StaffMemberI = {
      firstName: this.memberForm.value.firstName,
      lastName: this.memberForm.value.lastName,
      officeId: this.officeId,
      avatar: this.memberForm.value.avatar,
    };
    return office;
  }

  nextPrev(tabNumber: number): void {
    var isLastStep = this.wizardHelperService.isLastStep(tabNumber, this.currentTab)
    if (isLastStep) {
      this.onSubmit();
    }
    else {
      // Increase or decrease the current tab by 1 and show tab:
      this.currentTab = this.currentTab + tabNumber;
      this.wizardHelperService.showTab(this.currentTab, this.isAddMode, false);
    }
  }

  getAllStaffMembers(officeId: string): void {
    this.memberService.getAllMembersByOfficeId(officeId);
  }
}
