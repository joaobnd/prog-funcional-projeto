import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Util } from '../shared/util'
import { IEvent } from '../models/event'

@Component({
  selector: 'app-repo-events',
  templateUrl: './repo-events.component.html',
  styleUrls: ['./repo-events.component.scss']
})
export class RepoEventsComponent implements OnInit {

  events: IEvent[] = []
  viewEvents: IEvent[] = []
  group: any = undefined
  eventCount = new Map<string, number>()
  options: string[] = [
    "CommitCommentEvent",
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
    "WatchEvent"
  ]
  selected: string = ''

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getEvents('private').subscribe(
      (events) => { this.events = events,
      this.viewEvents = Object.assign([], this.events)}
    )
  }

  getEventsSortedByType() {
    this.viewEvents = Util.orderBy(Object.assign([], this.events), 'type')
  }

  getEventsSortedById() {
    this.viewEvents = Util.orderBy(Object.assign([], this.events), 'id')
  }

  getEventsWithoutDuplicates() {
    this.viewEvents = Util.distinct(Object.assign([], this.events), 'type')
  }

  groupEventsBy() {
    this.group = Util.groupBy(Object.assign([], this.events), 'type')

  }

  onChange() {
    this.groupEventsBy()
    this.group = this.group[this.selected] ||'None'
  }

  fold() {
    this.eventCount.set('DeleteEvent',                   Util.fold(this.eventTypeSetter('DeleteEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('CreateEvent',                   Util.fold(this.eventTypeSetter('CreateEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('CommitCommentEvent',            Util.fold(this.eventTypeSetter('CommitCommentEvent'),            0,  Object.assign([], this.events)));
    this.eventCount.set('ForkEvent',                     Util.fold(this.eventTypeSetter('ForkEvent'),                     0,  Object.assign([], this.events)));
    this.eventCount.set('GollumEvent',                   Util.fold(this.eventTypeSetter('GollumEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('IssueCommentEvent',             Util.fold(this.eventTypeSetter('IssueCommentEvent'),             0,  Object.assign([], this.events)));
    this.eventCount.set('IssuesEvent',                   Util.fold(this.eventTypeSetter('IssuesEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('MemberEvent',                   Util.fold(this.eventTypeSetter('MemberEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('PublicEvent',                   Util.fold(this.eventTypeSetter('PublicEvent'),                   0,  Object.assign([], this.events)));
    this.eventCount.set('PullRequestEvent',              Util.fold(this.eventTypeSetter('PullRequestEvent'),              0,  Object.assign([], this.events)));
    this.eventCount.set('PullRequestReviewEvent',        Util.fold(this.eventTypeSetter('PullRequestReviewEvent'),        0,  Object.assign([], this.events)));
    this.eventCount.set('PullRequestReviewCommentEvent', Util.fold(this.eventTypeSetter('PullRequestReviewCommentEvent'), 0,  Object.assign([], this.events)));
    this.eventCount.set('PullRequestReviewThreadEvent',  Util.fold(this.eventTypeSetter('PullRequestReviewThreadEvent'),  0,  Object.assign([], this.events)));
    this.eventCount.set('PushEvent',                     Util.fold(this.eventTypeSetter('PushEvent'),                     0,  Object.assign([], this.events)));
    this.eventCount.set('ReleaseEvent',                  Util.fold(this.eventTypeSetter('ReleaseEvent'),                  0,  Object.assign([], this.events)));
    this.eventCount.set('SponsorshipEvent',              Util.fold(this.eventTypeSetter('SponsorshipEvent'),              0,  Object.assign([], this.events)));
    this.eventCount.set('WatchEvent',                    Util.fold(this.eventTypeSetter('WatchEvent'),                    0,  Object.assign([], this.events)));
  }

  private eventTypeSetter(type:string) {
    return function eventTypeCount(init:number, event:any) {
        return (event.type === type ? init + 1 : init)
    }
  }

  compose() {
    this.viewEvents = Util.compose(Util.distinct, Util.orderBy) (Object.assign([], this.events))
  }

}
