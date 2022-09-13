import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatUIModule } from '@shared/matui/matui.module';

@NgModule({
  declarations: [IndexPageComponent],
  imports: [CommonModule, MatUIModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
