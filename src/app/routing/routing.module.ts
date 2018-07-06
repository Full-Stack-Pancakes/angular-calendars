import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ProfileComponent} from '../profile/profile.component';
import { AboutComponent} from '../about/about.component';
import { HomeComponent} from '../home/home.component';
import { LoginComponent} from '../login/login.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { LogoutComponent } from '../logout/logout.component';
import {DefaultPageComponent} from '../default-page/default-page.component'


const routes: Routes =[
  { path:"", component: LoginComponent },
  { path:"home", component: HomeComponent },
  { path:"login", component: LoginComponent },
  { path:"profile", component: ProfileComponent },
  { path:"about", component: AboutComponent },
  { path:"calendar", component: CalendarComponent},
  { path:"logout", component: LogoutComponent},
  { path:"**", component: DefaultPageComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class RoutingModule { }
