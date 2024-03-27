import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { Task } from '../../models/Task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks'; // Adjust to your tasks API endpoint

  constructor(private http: HttpClient) { } // Inject HttpClient

  // Fetch all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Fetch a single task by ID
  getTaskById(id: number): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  // Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  // Update an existing task
  updateTask(id: number, task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Task>(url, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
