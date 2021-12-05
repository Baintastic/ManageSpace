import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

  getbyId(id: string) {
    return this.officeRef.doc(id).get();
  }

  getAll() {
    return this.officeRef.snapshotChanges();
  }

  create(office: Office): any {
    return this.officeRef.add(office);
  }

  update(id: string, data: any): Promise<void> {
    return this.officeRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.officeRef.doc(id).delete();
  }
}
