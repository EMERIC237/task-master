import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../models/Task';
import { TaskCarouselComponent } from '../common/task-carousel/task-carousel.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-task',
  standalone: true,
  imports: [TaskCarouselComponent],
  templateUrl: './home-task.component.html',
  styleUrl: './home-task.component.scss'
})
export class HomeTaskComponent {

  allTasks: Task[] = [];
  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user && user.id) {
        this.taskService.getTasksByUserId(user.id).subscribe(tasks => {
          this.allTasks = tasks;
        });
      }
    });
  }

}
