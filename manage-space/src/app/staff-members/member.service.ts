import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { StaffMemberI } from '../models/staff-member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private dbPath = 'staff-members';

  memberRef: AngularFirestoreCollection<StaffMemberI>;

  constructor(private afs: AngularFirestore) {
    this.memberRef = afs.collection(this.dbPath);
  }

  getMemberbyId(id: string) {
    return this.memberRef.doc(id).get();
  }

  getAllMembersByOfficeId(officeId: string) {
    return this.afs.collection(this.dbPath, ref => ref.where('officeId', '==', officeId)).snapshotChanges();
  }

  createMember(office: StaffMemberI): any {
    return this.memberRef.add(office);
  }

  updateMember(id: string, data: any): Promise<void> {
    return this.memberRef.doc(id).update(data);
  }

  deleteMember(id: string): Promise<void> {
    return this.memberRef.doc(id).delete();
  }
}
