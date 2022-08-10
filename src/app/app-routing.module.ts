import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { RepoEventsComponent } from './repo-events/repo-events.component';

const routes: Routes = [
  { path: 'publicRepo', component: EventComponent },
  { path: 'privateRepo', component: RepoEventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
