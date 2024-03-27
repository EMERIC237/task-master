import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCarouselComponent } from './task-carousel.component';

describe('TaskCarouselComponent', () => {
  let component: TaskCarouselComponent;
  let fixture: ComponentFixture<TaskCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
