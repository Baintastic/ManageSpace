import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffMember } from 'src/app/models/staff-member';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-staff-member',
  templateUrl: './add-edit-staff-member.component.html',
  styleUrls: ['./add-edit-staff-member.component.css']
})
export class AddEditStaffMemberComponent implements OnInit {
  @Input() staffmember?: StaffMember;

  isAddMode: boolean = true;
  memberForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    avatar: ['', Validators.required],
  });
  avatars: string[] = [];
  selectedAvatar: string = '';
  staffMemberDetails?: StaffMember;
  currentTab: number = 0;

  constructor(private formBuilder: FormBuilder, private location: Location, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.staffmember);
    if (!this.isAddMode) {
      this.staffMemberDetails = {
        id: 1,
        firstName: 'Specno',
        lastName: '5 Royale Rd',
        avatar: 'yellow'
      };

      this.memberForm.get('firstName')?.setValue(this.staffMemberDetails.firstName);
      this.memberForm.get('lastName')?.setValue(this.staffMemberDetails.lastName);
      this.memberForm.get('avatar')?.setValue(this.staffMemberDetails.avatar);

      if (this.staffMemberDetails !== null) {
        this.selectedAvatar = this.staffMemberDetails.avatar;
      }
    }
    // Current tab is set to be the first tab (0)
    this.showTab(this.currentTab); // Display the current tab
    this.avatars = ['../../images/avatar1.png', '../../images/avatar1.png', '../../images/avatar1.png', '../../images/avatar1.png', '../../images/avatar1.png', '../../images/avatar1.png', '../../images/avatar1.png'];
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
    console.log('office add');
  }

  updateStaffMember(): void {
    console.log('office updated');
  }

  goBack(): void {
    this.location.back();
  }


  showTab(n: number) {
    // This function will display the specified tab of the form ...
    var tab = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    tab[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    var prevBtn = document.getElementById('prevBtn');
    var title = document.getElementById("title");

    if (prevBtn) {
      if(n == 0){
        prevBtn.style.display = 'none';
        title?.classList.remove('col-10');
        title?.classList.add('col-12');
      }
      else{
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
    if (this.currentTab >= tab.length) {
      //...the form gets submitted:
      var memberForm = document.getElementById('memberForm');
      // if(memberForm){
      //   memberForm.onsubmit();
      // }
      // document.getElementById("memberForm").submit();
      return ;
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
