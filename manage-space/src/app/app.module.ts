import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfficesComponent } from './offices/offices.component';
import { OfficeComponent } from './offices/office/office.component';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AddEditOfficeComponent } from './offices/add-edit-office/add-edit-office.component';
import { StaffMembersComponent } from './staff-members/staff-members.component';
import { AddEditStaffMemberComponent } from './staff-members/add-edit-staff-member/add-edit-staff-member.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OfficeColourComponent } from './offices/office-colour/office-colour.component';


@NgModule({
  declarations: [
    AppComponent,
    OfficesComponent,
    OfficeComponent,
    OfficeDetailComponent,
    AddEditOfficeComponent,
    StaffMembersComponent,
    AddEditStaffMemberComponent,
    OfficeColourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    NoopAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
