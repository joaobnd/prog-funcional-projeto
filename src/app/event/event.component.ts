import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Util } from '../shared/util'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getEvents().subscribe(
      (events) => this.events = events
    )
  }

  getEvents() {
    return this.events
  }

  getEventsSortedByType() {
    return Util.orderBy(this.events, 'type')
  }

  getEventsSortedById() {
    return Util.orderBy(this.events, 'id')
  }

}
