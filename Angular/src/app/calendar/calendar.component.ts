import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FormsModule } from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  http = inject(HttpClient);
  events: any[] = [];
  showModal = false;
  eventTitle = '';
  eventDate = '';
  editingEventIndex: number | null = null;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    events: this.loadEvents(),
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: 'short'
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' }
      },
      timeGridWeek: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
      },
      timeGridDay: {
        titleFormat: { weekday: 'long', month: 'long', day: 'numeric' }
      }
    }
  };

  constructor(private sharedService: SharedService) {
    this.events = this.loadEvents();
    this.updateCalendar();
  }

  loadEvents(): any[] {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  saveEvents(): void {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  updateCalendar(): void {
    this.calendarOptions = { ...this.calendarOptions, events: [...this.events] };
  }

  handleDateClick(info: any) {
    this.showModal = true;
    this.eventTitle = '';
    this.eventDate = info.dateStr;
    this.editingEventIndex = null;
  }

  handleEventClick(info: EventClickArg) {
    this.showModal = true;
    this.eventTitle = info.event.title;
    this.eventDate = info.event.startStr.split('T')[0];
    this.editingEventIndex = this.events.findIndex(event => event.title === info.event.title && event.date === info.event.startStr);
  }

  saveEvent() {
    if (this.eventTitle.trim() === '') {
      alert('Veuillez entrer un titre.');
      return;
    }

    const fullDate = this.eventDate;

    if (this.editingEventIndex !== null) {
      this.events[this.editingEventIndex] = { title: this.eventTitle, date: fullDate };
    } else {
      this.events.push({ title: this.eventTitle, date: fullDate });
    }

    this.saveEvents();
    this.updateCalendar();
    this.showModal = false;


    this.sharedService
      .sendEmailNotification(
        'mootezaouinti1@gmail.com',
        'Nouveau rendez-vous ajouté',
        `Titre: ${this.eventTitle}\nDate: ${fullDate}`
      )
      .subscribe({
        next: () => console.log('✅ Email sent'),
        error: err => console.error('❌ Failed to send email', err)
      });
  }

  deleteEvent(index: number) {
    const deletedEvent = this.events[index];

    this.events.splice(index, 1);
    this.saveEvents();
    this.updateCalendar();
    this.showModal = false;


    this.sharedService
      .sendEmailNotification(
        'mootezaouinti1@gmail.com',
        'Rendez-vous supprimé',
        `Le rendez-vous suivant a été supprimé :\n\nTitre: ${deletedEvent.title}\nDate: ${deletedEvent.date}`
      )
      .subscribe({
        next: () => console.log('✅ Email de suppression envoyé'),
        error: err => console.error('❌ Échec de l\'envoi de l\'email', err)
      });
  }

}
