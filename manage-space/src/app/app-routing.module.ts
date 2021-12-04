import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeDetailComponent } from './offices/office-detail/office-detail.component';
import { OfficesComponent } from './offices/offices.component';

const routes: Routes = [
  { path: '', redirectTo: 'offices', pathMatch: 'full' },
  { path: 'offices', component: OfficesComponent },
  { path: 'detail/:id', component: OfficeDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
