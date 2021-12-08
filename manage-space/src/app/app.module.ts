import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfficesComponent } from './offices/offices.component';
import { OfficeComponent } from './offices/office/office.component';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { AddEditOfficeComponent } from './offices/add-edit-office/add-edit-office.component';
import { StaffMembersComponent } from './staff-members/staff-members.component';
import { AddEditStaffMemberComponent } from './staff-members/add-edit-staff-member/add-edit-staff-member.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {  AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MemberOptionsComponent } from './staff-members/member-options/member-options.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OnlyNumberDirective } from './directives/only-number.directive';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    OfficesComponent,
    OfficeComponent,
    OfficeDetailComponent,
    AddEditOfficeComponent,
    StaffMembersComponent,
    AddEditStaffMemberComponent,
    MemberOptionsComponent,
    OnlyNumberDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AddEditStaffMemberComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
