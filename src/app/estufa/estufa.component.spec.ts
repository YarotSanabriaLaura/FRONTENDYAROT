import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstufaComponent } from './estufa.component';

describe('EstufaComponent', () => {
  let component: EstufaComponent;
  let fixture: ComponentFixture<EstufaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstufaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstufaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
