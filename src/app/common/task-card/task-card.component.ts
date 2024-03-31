import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task!: Task


}
