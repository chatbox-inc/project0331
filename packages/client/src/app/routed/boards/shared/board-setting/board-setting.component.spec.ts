import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSettingComponent } from './board-setting.component';

describe('BoardSettingComponent', () => {
  let component: BoardSettingComponent;
  let fixture: ComponentFixture<BoardSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
