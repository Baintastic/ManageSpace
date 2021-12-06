import { Component, OnInit } from '@angular/core';
import { Office } from '../models/office';
import { StaffMember } from '../models/staff-member';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditStaffMemberComponent } from './add-edit-staff-member/add-edit-staff-member.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from './member.service';
import { OfficeService } from '../offices/office.service';

@Component({
  selector: 'app-staff-members',
  templateUrl: './staff-members.component.html',
  styleUrls: ['./staff-members.component.css']
})

export class StaffMembersComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  office: Office | undefined;
  searchText: string = "";
  memberId: any;

  constructor(private modalService: NgbModal,
    private memberService: MemberService,
    private officeService: OfficeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    var officeId = this.route.snapshot.paramMap.get('id')!;
    this.getOfficeDetail(officeId);
    this.getAllStaffMembers(officeId);
  }

  getAllStaffMembers(officeId: string): void {
    this.memberService.getAllMembers(officeId).subscribe(data => {
      this.staffMembers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as StaffMember
        }
      })
    });
  }

  getOfficeDetail(officeId: string): void {
    this.officeService.getOfficebyId(officeId).subscribe(data => {
      this.office = data.data() as Office;
    })
  }

  open(member?: any) {
    const modalRef = this.modalService.open(AddEditStaffMemberComponent, { centered: true });
    modalRef.componentInstance.staffmember = member;
  }

}
