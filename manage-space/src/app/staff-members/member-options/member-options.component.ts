import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfficeI } from 'src/app/models/office';
import { StaffMemberI } from 'src/app/models/staff-member';
import { MemberService } from 'src/app/services/member.service';
import { OfficeService } from 'src/app/services/office.service';
import { WizardHelperService } from 'src/app/services/shared/wizard-helper.service';
import { AddEditStaffMemberComponent } from '../add-edit-staff-member/add-edit-staff-member.component';

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
    private wizardHelperService: WizardHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.wizardHelperService.showTab(this.currentTab, false, this.isDeleteMode);
  }

  nextPrev(tabNumber: number): void {
    this.isDeleteMode = tabNumber == 1 ? true : false;
    this.currentTab = this.wizardHelperService.nextPrev(tabNumber, this.currentTab, false, this.isDeleteMode)
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
