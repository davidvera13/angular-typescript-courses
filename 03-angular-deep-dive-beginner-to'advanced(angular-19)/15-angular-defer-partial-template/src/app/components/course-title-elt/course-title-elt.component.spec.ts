import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTitleEltComponent } from './course-title-elt.component';

describe('CourseTitleEltComponent', () => {
  let component: CourseTitleEltComponent;
  let fixture: ComponentFixture<CourseTitleEltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTitleEltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseTitleEltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
