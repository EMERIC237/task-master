import { Component, OnInit, OnDestroy } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For clickable events
import { Task } from '../../models/Task';
import { Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  imports: [CommonModule, FullCalendarModule, DatePipe, TitleCasePipe],
  standalone: true,
  styles: [`
    .fc {
      max-width: 1100px;
      margin: 40px auto;
    }
    .modal {
      background-color: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      width: 90%;
      max-width: 500px;
    }
  `]
})
export class CalendarTaskComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  tasks: Task[] = [];
  calendarEvents: any[] = [];
  calendarOptions: any;
  showModal: boolean = false;
  selectedTask?: Task;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;



  constructor(private taskService: TaskService, private authService: AuthService) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      events: this.calendarEvents,
      eventClick: this.handleEventClick.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }
    };
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUser().pipe(
        switchMap(user => user ? this.taskService.getTasksByUserId(Number(user.id)) : of([]))
      ).subscribe(tasks => {
        this.tasks = tasks;
        this.calendarEvents = tasks.map(task => ({
          title: task.title,
          date: task.deadline,
          id: task.id!.toString(),
          extendedProps: {
            description: task.description,
            priority: task.priority,
            status: task.status
          }
        }));
        setTimeout(() => this.refreshCalendarEvents());
      })
    );
  }

  private refreshCalendarEvents(): void {
    if (this.calendarApi) {
      this.calendarApi.removeAllEvents();
      this.calendarApi.addEventSource(this.calendarEvents);
    }
  }

  get calendarApi() {
    return this.calendarComponent.getApi();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleEventClick(clickInfo: any): void {
    this.selectedTask = this.tasks.find(task => task.id === clickInfo.event.id);
    this.showModal = true;
  }

  closeModal(event?: MouseEvent): void {
    if (!event || (event.target as Element).classList.contains('modal')) {
      this.showModal = false;
    }
  }

}