import { Component } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-carousel',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-carousel.component.html',
  styleUrl: './task-carousel.component.scss'
})
export class TaskCarouselComponent {

}
