import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditOfficeComponent } from './offices/add-edit-office/add-edit-office.component';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import { OfficesComponent } from './offices/offices.component';

const routes: Routes = [
  { path: '', redirectTo: 'offices', pathMatch: 'full' },
  { path: 'offices', component: OfficesComponent },
  { path: 'detail/:id', component: OfficeDetailComponent },
  { path: 'add-office', component: AddEditOfficeComponent },
  { path: 'edit-office/:id', component: AddEditOfficeComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
