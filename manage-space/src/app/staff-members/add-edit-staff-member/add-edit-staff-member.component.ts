import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffMember } from 'src/app/models/staff-member';
import { Location } from '@angular/common';
import { MemberService } from '../member.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-staff-member',
  templateUrl: './add-edit-staff-member.component.html',
  styleUrls: ['./add-edit-staff-member.component.css']
})
export class AddEditStaffMemberComponent implements OnInit {
  @Input() staffmember?: any;

  isAddMode: boolean = true;
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

  constructor(private formBuilder: FormBuilder, private location: Location, public activeModal: NgbActiveModal, private memberService: MemberService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.staffmember === undefined) {
      this.isAddMode = true;
    } else {
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
    console.log(this.memberForm)
    if (this.isAddMode) {
      this.addStaffMember();
    } else {
      this.updateStaffMember();
    }
  }

  addStaffMember(): void {
    var member = this.getofficeFormvalues();
    this.memberService.createMember(member).then(() => {
      console.log('Created new member successfully!');
    });
  }

  updateStaffMember(): void {
    var member = this.getofficeFormvalues();
    if (this.selectedStaffMember) {
      this.memberService.updateMember(this.memberId, member)
        .then(() => console.log('Updated member details successfully!'))
        .catch(err => console.log(err));
    }
  }

  goBack(): void {
    this.location.back();
  }

  getofficeFormvalues(): StaffMember {
    var office: StaffMember = {
      firstName: this.memberForm.value.firstName,
      lastName: this.memberForm.value.lastName,
      officeId: this.staffmember.officeId,
      avatar: this.memberForm.value.avatar,
    };
    return office;
  }

  showTab(n: number) {
    // This function will display the specified tab of the form ...
    var tab = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    tab[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    var prevBtn = document.getElementById('prevBtn');
    var title = document.getElementById("title");

    if (prevBtn) {
      if (n == 0) {
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
      nextBtn.innerHTML = (n == (tab.length - 1)) ? `${btnText}` : 'NEXT';
    }

    // ... and run a function that displays the correct step indicator:
    this.fixStepIndicator(n)
  }

  nextPrev(n: number) {
    // This function will figure out which tab to display
    var tab = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    tab[this.currentTab].style.display = 'none';
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;
    // if you have reached the end of the form... :
    if (this.currentTab + 1 > tab.length) {
      this.onSubmit();
      this.activeModal.dismiss('Cross click')
      return;
    }
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
  }

  fixStepIndicator(n: number) {
    // This function removes the "active" class of all steps...
    var i, step = document.getElementsByClassName('step');
    for (i = 0; i < step.length; i++) {
      step[i].className = step[i].className.replace(' active', '');
    }
    //... and adds the "active" class to the current step:
    step[n].className += ' active';
  }

}
