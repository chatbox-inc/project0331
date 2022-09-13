import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgNameNumberPageComponent } from './org-name-number-page.component';

describe('OrgNameNumberPageComponent', () => {
  let component: OrgNameNumberPageComponent;
  let fixture: ComponentFixture<OrgNameNumberPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgNameNumberPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgNameNumberPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
