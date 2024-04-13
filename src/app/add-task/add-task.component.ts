import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  newTask!: Task
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required)
  });
  constructor(private taskService: TaskService, private router: Router) { }
  onSubmit(): void {
    if (this.taskForm.valid) {
      // Assuming userId is handled elsewhere or provided via authentication context
      const newTask = new Task(
        this.taskForm.value.title!,
        this.taskForm.value.description!,
        this.taskForm.value.priority!,
        this.taskForm.value.status!,
        new Date(this.taskForm.value.deadline!));

      this.taskService.createTask(newTask).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Error:', error)
      });
    }
  }

}
