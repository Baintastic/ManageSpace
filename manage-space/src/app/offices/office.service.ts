import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Office } from '../models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  private dbPath = 'offices';

  officeRef: AngularFirestoreCollection<Office>;

  constructor(private afs: AngularFirestore) {
    this.officeRef = afs.collection(this.dbPath);
  }

  getOfficebyId(id: string) {
    return this.officeRef.doc(id).get();
  }

  getAllOffices() {
    return this.officeRef.snapshotChanges();
  }

  createOffice(office: Office): any {
    return this.officeRef.add(office);
  }

  updateOffice(id: string, data: any): Promise<void> {
    return this.officeRef.doc(id).update(data);
  }

  deleteOffice(id: string): Promise<void> {
    return this.officeRef.doc(id).delete();
  }
}
