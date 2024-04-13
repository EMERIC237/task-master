import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  tasks: Task[] = [
    // Sample tasks
    new Task(1, 1, 'Task 1', 'Description 1', 'High', 'In Progress', new Date('2024-05-01')),
    new Task(2, 1, 'Task 2', 'Description 2', 'Medium', 'Completed', new Date('2024-04-15')),
    // Add more tasks as needed
  ];

  filteredTasks: Task[] = [];
  filterQuery: string = '';

  constructor(private router: Router, private taskService: TaskService, private authService: AuthService) { }


  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUser().pipe(
        switchMap(user => {
          if (user) {
            return this.taskService.getTasksByUserId(user.id);
          } else {
            return of([]);
          }
        })
      ).subscribe(tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => task.title.toLowerCase().includes(this.filterQuery.toLowerCase()));
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }

}
