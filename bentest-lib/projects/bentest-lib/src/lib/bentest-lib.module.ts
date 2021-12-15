import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BentestLibComponent } from './bentest-lib.component';

const routes: Routes = [
  {
    path: '',
    component: BentestLibComponent
  }
]

@NgModule({
  declarations: [
    BentestLibComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class BentestLibModule { }
