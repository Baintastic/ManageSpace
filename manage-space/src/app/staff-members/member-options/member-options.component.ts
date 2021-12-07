import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StaffMember } from 'src/app/models/staff-member';
import { OfficeService } from 'src/app/offices/office.service';
import { AddEditStaffMemberComponent } from '../add-edit-staff-member/add-edit-staff-member.component';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-options',
  templateUrl: './member-options.component.html',
  styleUrls: ['./member-options.component.css']
})
export class MemberOptionsComponent implements OnInit {
  @Input() staffmember?: any;
  @Input() officeId!: string;
  @Input() memberId!: string;

  staffMembers: StaffMember[] = [];

  isDeleteMode: boolean = false;
  currentTab: number = 0;

  constructor(private modalService: NgbModal,
     public activeModal: NgbActiveModal, 
     private memberService: MemberService,
    private officeService: OfficeService,) { }

  ngOnInit(): void {
    this.showTab(this.currentTab);
  }

  showTab(tabNumber: number): void {
    // This function will display the specified tab of the form ...
    var tab = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    tab[tabNumber].style.display = "block";

    // ... and fix the Previous/Next buttons:
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

    // var nextBtn = document.getElementById('nextBtn');
    // if (nextBtn) {
    //   var btnText = this.isDeleteMode ? 'ADD STAFF MEMBER' : 'Keep office';
    //   nextBtn.innerHTML = (tabNumber == (tab.length - 1)) ? `${btnText}` : 'NEXT';
    // }

    // ... and run a function that displays the correct step indicator:
    this.fixStepIndicator(tabNumber)
  }

  nextPrev(tabNumber: number): void {

    // This function will figure out which tab to display
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    tabs[this.currentTab].style.display = 'none';
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + tabNumber;
   
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

  deleteOffice() {

    this.memberService.getAllMembers(this.officeId).subscribe(data => {
      this.staffMembers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as StaffMember
        }
      })
      this.staffMembers.forEach(member => {
        this.deleteStaffMember();
        
      });
      this.officeService.deleteOffice(this.officeId)
        .then(() => console.log('Deleted office successfully!')
        )
        .catch(err => console.log(err));
    });
    
  }

  deleteStaffMember() {
    this.memberService.deleteMember(this.memberId)
        .then(() => console.log('Deleted staff successfully!')
        )
        .catch(err => console.log(err));
        this.activeModal.dismiss('Cross click');
  }

  openEditMemberModal() {
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(AddEditStaffMemberComponent, { centered: true });
    modalRef.componentInstance.staffmember = this.staffmember;
    modalRef.componentInstance.officeId = this.officeId;
    modalRef.componentInstance.isAddMode = false;
  }

}
