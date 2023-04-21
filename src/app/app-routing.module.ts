import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'success', component: SuccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
