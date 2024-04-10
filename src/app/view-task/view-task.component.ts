import { Component } from '@angular/core';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent {
  tasks: Task[] = [
    // Sample tasks
    new Task(1, 1, 'Task 1', 'Description 1', 'High', 'In Progress', new Date('2024-05-01')),
    new Task(2, 1, 'Task 2', 'Description 2', 'Medium', 'Completed', new Date('2024-04-15')),
    // Add more tasks as needed
  ];

  filteredTasks: Task[] = [];
  filterQuery: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredTasks = this.tasks;
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => task.title.toLowerCase().includes(this.filterQuery.toLowerCase()));
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }

}
