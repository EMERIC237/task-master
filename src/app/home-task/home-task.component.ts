import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../models/Task';
import { TaskCarouselComponent } from '../common/task-carousel/task-carousel.component';

@Component({
  selector: 'app-home-task',
  standalone: true,
  imports: [TaskCarouselComponent],
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.scss']
})
export class HomeTaskComponent implements OnDestroy {
  allTasks: Task[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private taskService: TaskService, private authService: AuthService) {
    this.subscription.add(
      this.authService.getUser().pipe(
        switchMap(user => user?.id ? this.taskService.getTasksByUserId(user.id) : [])
      ).subscribe(tasks => {
        this.allTasks = tasks;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addTask(): void {
    this.router.navigate(['/add-task']);
  }
}
