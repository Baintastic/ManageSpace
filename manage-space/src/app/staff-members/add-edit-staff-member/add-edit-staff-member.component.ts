import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffMember } from 'src/app/models/staff-member';
import { Location } from '@angular/common';
import { MemberService } from '../member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from 'src/app/offices/office.service';
import { Office } from 'src/app/models/office';

@Component({
  selector: 'app-add-edit-staff-member',
  templateUrl: './add-edit-staff-member.component.html',
  styleUrls: ['./add-edit-staff-member.component.css']
})
export class AddEditStaffMemberComponent implements OnInit {
  @Input() staffmember?: any;
  @Input() officeId!: string;
  @Input() isAddMode: boolean = false;

  memberForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    avatar: ['', Validators.required],
  });
  avatars: string[] = [];
  selectedAvatar: string = '';
  selectedStaffMember?: StaffMember;
  currentTab: number = 0;
  memberId: string = '';

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    public activeModal: NgbActiveModal,
    private memberService: MemberService,
    private officeService: OfficeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.isAddMode) {
      this.isAddMode = false;
      this.memberId = this.staffmember?.id!;
      this.memberService.getMemberbyId(this.memberId).subscribe(data => {
        this.selectedStaffMember = data.data() as StaffMember;

        this.memberForm.get('firstName')?.setValue(this.selectedStaffMember?.firstName);
        this.memberForm.get('lastName')?.setValue(this.selectedStaffMember?.lastName);
        this.memberForm.get('avatar')?.setValue(this.selectedStaffMember?.avatar);
        this.selectedAvatar = this.selectedStaffMember?.avatar!;
      })
    }
    this.showTab(this.currentTab);
    this.avatars = ['orange', 'pink', 'orangered', 'brown', 'yellow', 'darkorchid', 'lightblue'];
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
    var member = this.getMemberFormvalues();
    this.memberService.createMember(member).then(() => {
      console.log('Created new member successfully!');

      this.officeService.getOfficebyId(member.officeId).subscribe(data => {
        var office = data.data() as Office;
        var newMaxCapacity: number = +office.maxCapacity + 1;
        office.maxCapacity = newMaxCapacity.toString();

        this.officeService.updateOffice(member.officeId, office)
          .then(() => console.log('Updated office details successfully!'))
          .catch(err => console.log(err));
        this.router.navigate(['/detail/', this.officeId]);
      })
    });
  }

  updateStaffMember(): void {
    var member = this.getMemberFormvalues();
    if (this.selectedStaffMember) {
      this.memberService.updateMember(this.memberId, member)
        .then(() => console.log('Updated member details successfully!'))
        .catch(err => console.log(err));
    }
  }

  goBack(): void {
    this.location.back();
  }

  getMemberFormvalues(): StaffMember {
    var office: StaffMember = {
      firstName: this.memberForm.value.firstName,
      lastName: this.memberForm.value.lastName,
      officeId: this.officeId,
      avatar: this.memberForm.value.avatar,
    };
    return office;
  }

  showTab(tabNumber: number): void {
    // This function will display the specified tab of the form ...
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    //for some reason , two of the tabs from the previous html modal get picked up so we get the first tab on the current modal

    if (tabs.length > 2) {
      tabs[tabNumber + 2].style.display = "block";
    }
    else {
      tabs[tabNumber].style.display = "block";
    }

    var prevBtn = document.getElementById('prevBtn');
    var title = document.getElementById("title");

    if (prevBtn) {
      if (tabNumber == 0) {
        prevBtn.style.display = 'none';
        title?.classList.remove('col-10');
        title?.classList.add('col-12');
      }
      else {
        prevBtn.style.display = 'inline';
        title?.classList.remove('col-12');
        title?.classList.add('col-10');
      }
    }

    var nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      var btnText = this.isAddMode ? 'ADD STAFF MEMBER' : 'UPDATE STAFF MEMBER';
      nextBtn.innerHTML = (tabNumber == (tabs.length - 1)) ? `${btnText}` : 'NEXT';
    }

    this.fixStepIndicator(tabNumber)
  }

  nextPrev(tabNumber: number): void {

    // This function will figure out which tab to display
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)

    // Hide the current tab:
    tabs[this.currentTab].style.display = 'none';
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + tabNumber;
    // if you have reached the end of the form... :
    if (this.currentTab >= tabs.length) {
      this.activeModal.dismiss('Cross click')
      this.onSubmit();
      return;
    }
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
  }

  fixStepIndicator(n: number): void {
    // This function removes the "active" class of all steps...
    var i, step = document.getElementsByClassName('step');
    for (i = 0; i < step.length; i++) {
      step[i].className = step[i].className.replace(' active', '');
    }
    //... and adds the "active" class to the current step:
    step[n].className += ' active';
  }

}
