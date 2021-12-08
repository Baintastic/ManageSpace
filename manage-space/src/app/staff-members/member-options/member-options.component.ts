import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfficeI } from 'src/app/models/office';
import { StaffMemberI } from 'src/app/models/staff-member';
import { OfficeService } from 'src/app/offices/office.service';
import { AddEditStaffMemberComponent } from '../add-edit-staff-member/add-edit-staff-member.component';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-options',
  templateUrl: './member-options.component.html',
  styleUrls: ['./member-options.component.css']
})
export class MemberOptionsComponent implements OnInit {
  @Input() officeId!: string;
  @Input() memberId!: string;

  isDeleteMode: boolean = false;
  currentTab: number = 0;
  isSpinnerLoading: boolean = false;

  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private memberService: MemberService,
    private officeService: OfficeService,
    private router: Router) { }

  ngOnInit(): void {
    this.showTab(this.currentTab);
  }

  showTab(tabNumber: number): void {
    // This function will display the specified tab of the form ...
    var tab = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)
    tab[tabNumber].style.display = "block";

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

    this.fixStepIndicator(tabNumber)
  }

  nextPrev(tabNumber: number): void {
    this.isDeleteMode = tabNumber == 1 ? true : false;
    // This function will figure out which tab to display
    var tabs = Array.from(document.getElementsByClassName('tab') as HTMLCollectionOf<HTMLElement>)

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
        this.deleteStaffMember();
      });

      this.officeService.deleteOffice(this.officeId)
      .then(() => {
        console.log('Deleted office successfully!');
        this.isSpinnerLoading = false;
        this.router.navigate(['/offices']);
      }).catch(err => console.log(err));
    });

  }

  deleteStaffMember() {
    this.isSpinnerLoading = true;

    //Delete staff member and update number of present staff members
    this.memberService.deleteMember(this.memberId)
      .then(() => {
        console.log('Deleted staff successfully!');
        this.activeModal.dismiss('Cross click');

        this.officeService.getOfficebyId(this.officeId).subscribe(data => {
          var office = data.data() as OfficeI;
    
          office.numberOfPresentStaff = office.numberOfPresentStaff -= 1;
          this.officeService.updateOffice(this.officeId, office)
            .then(() => {
              console.log('Updated office details successfully!')
              this.isSpinnerLoading = false;
            }).catch(err => console.log(err));
        })
      }).catch(err => console.log(err));
  }

  openEditMemberModal() {
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(AddEditStaffMemberComponent, { centered: true });
    modalRef.componentInstance.memberId = this.memberId;
    modalRef.componentInstance.officeId = this.officeId;
    modalRef.componentInstance.isAddMode = false;
  }

}
