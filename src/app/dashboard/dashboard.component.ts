import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../models/event.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})
export class DashboardComponent implements OnInit {
  public hosted: EventModel[] = [];
  public participating: EventModel[] = [];

  constructor(private events: EventService,
              private router: Router) {  }

  public ngOnInit() {
    this.events.currentUserEvents()
      .then((userEvents) => this.hosted = userEvents);
    this.participating = [];
  }

  public editEvent(eventId: number) {
    this.router.navigate(['/event-edit', { id: eventId }]);
  }
}