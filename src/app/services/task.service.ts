import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable, of, switchMap } from 'rxjs';
import { Task } from '../../models/Task';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Fetch all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }



  getTasksByUserId(userId: number): Observable<Task[]> {
    const url = `${this.baseUrl}/users/${userId}/tasks`;
    console.log(url);  // This is the line that was added
    return this.http.get<Task[]>(url);
  }

  // Fetch a single task by ID
  getTaskById(id: number): Observable<Task> {
    const url = `${this.baseUrl}/tasks/${id}`;
    return this.http.get<Task>(url);
  }

  // Create a new task
  createTask(task: Task): Observable<Task[]> {
    const url = `${this.baseUrl}/users/${Number(this.authService.getUserId())}/tasks`;
    return this.http.post<Task[]>(url, task);
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
