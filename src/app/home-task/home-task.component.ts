import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/Task';
import { TaskCarouselComponent } from '../common/task-carousel/task-carousel.component';

@Component({
  selector: 'app-home-task',
  standalone: true,
  imports: [TaskCarouselComponent],
  templateUrl: './home-task.component.html',
  styleUrl: './home-task.component.scss'
})
export class HomeTaskComponent {

  allTasks: Task[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('here are the tasks: ', tasks);

      this.allTasks = tasks;
    });
  }

}
