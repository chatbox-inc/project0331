import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { IndexPageComponent } from './page/index-page/index-page.component';
import { OrgNameNumberPageComponent } from './page/org-name-number-page/org-name-number-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './shared/board/board.component';
import { BoardSettingComponent } from './shared/board-setting/board-setting.component';
import { MatuiModule } from '@shared/matui/matui.module';

@NgModule({
  declarations: [
    IndexPageComponent,
    OrgNameNumberPageComponent,
    BoardComponent,
    BoardSettingComponent,
  ],
  imports: [
    CommonModule,
    MatuiModule,
    ReactiveFormsModule,
    BoardsRoutingModule,
  ],
})
export class BoardsModule {}
