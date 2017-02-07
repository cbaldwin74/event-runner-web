import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { EventModel } from './event.model';
import { AuthService } from '../auth.service';
import { GeoLocationModel } from './geo-location.model';

@Injectable()
export class EventService {
  constructor(private http: AuthHttp,
              private auth: AuthService) { }

  public getEvent(id: number): Promise<EventModel> {
    return this.http.get('/api/event/' + id)
      .toPromise()
      .then((response: Response): EventModel => {
        return this.handleEventResponse(response);
      })
      .catch(this.handleError);
  }

  /**
   * Save a new event.
   */
  public saveEvent(event: EventModel): Promise<EventModel> {
    event.ownerId = this.auth.getUserId();

    return this.http.post('/api/event', this.prepareEventObj(event))
        .toPromise()
        .then((response: Response): EventModel => {
          return this.handleEventResponse(response);
        })
        .catch(this.handleError);
  }

  /**
   * Update an Event
   */
  public updateEvent(event: EventModel): Promise<EventModel> {
    event.ownerId = this.auth.getUserId();

    return this.http.put('/api/event', this.prepareEventObj(event))
        .toPromise()
        .then((response: Response): EventModel => {
          return this.handleEventResponse(response);
        })
        .catch(this.handleError);
  }

  public publicEvents(): Promise<EventModel[]> {
    return this.http.get('/api/events')
      .toPromise()
      .then((response: Response): EventModel[] => {
        return this.handleEventArrayResponse(response);
      })
      .catch(this.handleError);
  }

  public currentUserEvents(): Promise<EventModel[]> {
    return this.http.get('/api/events/' + this.auth.getUserId())
      .toPromise()
      .then((response: Response): EventModel[] => {
        return this.handleEventArrayResponse(response);
      })
      .catch(this.handleError);
  }

  public searchEvents(name: string,
                      location: GeoLocationModel, radius: number): Promise<EventModel[]> {
    let criteria = {
      // ownerId: this.auth.getUserId(),
      name,
      lng: location.lng,
      lat: location.lat,
      radius,
    };

    return this.http.post('/api/event/search', criteria)
        .toPromise()
        .then((response: Response): EventModel[] => {
          return this.handleEventArrayResponse(response);
        })
        .catch(this.handleError);
  }

  private makeEvent(eventData): EventModel {
    return new EventModel(eventData.id, eventData.name, eventData.description,
      new Date(eventData.start),
      new GeoLocationModel(eventData.lat, eventData.lng, ''),
      eventData.ownerId);
  }

  private handleEventResponse(response: Response): EventModel {
    let resObj = JSON.parse(response.text());
    let resEvent = resObj.data;

    return this.makeEvent(resEvent);
  }

  private handleEventArrayResponse(response: Response): EventModel[] {
    let resObj = JSON.parse(response.text());
    let resEvents = resObj.data;

    return resEvents.map(this.makeEvent);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

  private prepareEventObj(event: EventModel) {
    return {
      id: event.getId(),
      name: event.name,
      description: event.description,
      start: event.start,
      lat: event.location.lat,
      lng: event.location.lng,
      ownerId: event.ownerId
    };
  }
}
