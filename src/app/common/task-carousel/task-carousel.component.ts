import { Component, Input } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-carousel',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-carousel.component.html',
  styleUrls: ['./task-carousel.component.scss']
})
export class TaskCarouselComponent {
  @Input() tasks: Task[] = [];
}
