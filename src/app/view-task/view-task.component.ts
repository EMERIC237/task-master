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

  tasks: Task[] = [];

  filteredTasks: Task[] = [];
  filterQuery: string = '';

  constructor(private router: Router, private taskService: TaskService, private authService: AuthService) { }


  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUser().pipe(
        switchMap(user => {
          console.log("this is user: ", user)
          if (user) {
            return this.taskService.getTasksByUserId(Number(user.id));
          } else {
            return of([]);
          }
        })
      ).subscribe(tasks => {
        console.log(tasks); // This is the line that was added
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
