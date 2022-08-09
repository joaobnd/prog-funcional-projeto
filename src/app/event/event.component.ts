import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Util } from '../shared/util'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: any[] = []
  group: any = undefined
  eventCount = new Map<string, number>();
  repos: any[] = []
  options: string[] = ["CommitCommentEvent",
  "CreateEvent",
  "DeleteEvent",
  "ForkEvent",
  "GollumEvent",
  "IssueCommentEvent",
  "IssuesEvent",
  "MemberEvent",
  "PublicEvent",
  "PullRequestEvent",
  "PullRequestReviewEvent",
  "PullRequestReviewCommentEvent",
  "PullRequestReviewThreadEvent",
  "PushEvent",
  "ReleaseEvent",
  "SponsorshipEvent",
  "WatchEvent"]
  selected: string = ''

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getEvents().subscribe(
      (events) => this.events = events
    )
  }

  onSelected(value:string) {
    alert(value)
    this.selected = value
  }

  getEvents() {
    return this.events
  }

  getEventsSortedByType() {
    Util.orderBy(this.events, 'type')
  }

  getEventsSortedById() {
    Util.orderBy(this.events, 'id')
  }

  getEventsWithoutDuplicates() {
    this.events = Util.distinct(this.events, 'type')
  }

  groupEventsBy() {
    this.group = Util.groupBy(this.events, 'type')
  }

  onChange() {
    this.group = this.group[this.selected]
  }

  fold() {

    this.eventCount.set('DeleteEvent', Util.fold(this.eventTypeSetter('DeleteEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('CreateEvent', Util.fold(this.eventTypeSetter('CreateEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('CommitCommentEvent', Util.fold(this.eventTypeSetter('CommitCommentEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('ForkEvent', Util.fold(this.eventTypeSetter('ForkEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('GollumEvent', Util.fold(this.eventTypeSetter('GollumEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('IssueCommentEvent', Util.fold(this.eventTypeSetter('IssueCommentEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('IssuesEvent', Util.fold(this.eventTypeSetter('IssuesEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('MemberEvent', Util.fold(this.eventTypeSetter('MemberEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PublicEvent', Util.fold(this.eventTypeSetter('PublicEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PullRequestEvent', Util.fold(this.eventTypeSetter('PullRequestEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PullRequestReviewEvent', Util.fold(this.eventTypeSetter('PullRequestReviewEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PullRequestReviewCommentEvent', Util.fold(this.eventTypeSetter('PullRequestReviewCommentEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PullRequestReviewThreadEvent', Util.fold(this.eventTypeSetter('PullRequestReviewThreadEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('PushEvent', Util.fold(this.eventTypeSetter('PushEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('ReleaseEvent', Util.fold(this.eventTypeSetter('ReleaseEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('SponsorshipEvent', Util.fold(this.eventTypeSetter('SponsorshipEvent'), 0, Object.assign([], this.events)))
    this.eventCount.set('WatchEvent', Util.fold(this.eventTypeSetter('WatchEvent'), 0, Object.assign([], this.events)))

  }

  private eventTypeSetter(type:string) {
    return function eventTypeCount(init:number, event:any) {
        return (event.type === type ? init + 1 : init)
    }
  }

  compose() {
    this.events = Util.compose(Util.distinct, Util.orderBy) (this.events)
  }

}

