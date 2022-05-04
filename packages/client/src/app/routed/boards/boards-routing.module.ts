import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './page/index-page/index-page.component';
import { OrgNameNumberPageComponent } from './page/org-name-number-page/org-name-number-page.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent, pathMatch: 'full' },
  { path: 'org/:name/:number', component: OrgNameNumberPageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
