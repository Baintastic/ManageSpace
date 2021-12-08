import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { OfficeI } from '../models/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  private dbPath = 'offices';

  officeRef: AngularFirestoreCollection<OfficeI>;

  constructor(private afs: AngularFirestore) {
    this.officeRef = afs.collection(this.dbPath);
  }

  listenToOfficeById(id: string) {
    return this.officeRef.doc(id).valueChanges();
  }

  getOfficebyId(id: string) {
    return this.officeRef.doc(id).get();
  }

  getAllOffices() {
    return this.officeRef.snapshotChanges();
  }

  createOffice(office: OfficeI): any {
    return this.officeRef.add(office);
  }

  updateOffice(id: string, data: any): Promise<void> {
    return this.officeRef.doc(id).update(data);
  }

  deleteOffice(id: string): Promise<void> {
    return this.officeRef.doc(id).delete();
  }
}
