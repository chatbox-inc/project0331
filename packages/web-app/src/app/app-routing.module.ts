import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./routed/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'boards',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./routed/boards/boards.module').then((m) => m.BoardsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
