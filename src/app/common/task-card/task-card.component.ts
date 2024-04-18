import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../models/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private router: Router) { }

  goToAddTask() {
    this.router.navigate(['/add-task']);
  }
}
