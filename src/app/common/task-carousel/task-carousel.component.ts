import { Component,Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task-carousel',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-carousel.component.html',
  styleUrl: './task-carousel.component.scss'
})
export class TaskCarouselComponent {

  @Input() tasks: Task[] = [];

}
