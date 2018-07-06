import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Event } from '../Event';
import { CalendarService } from '../calendar.service';
import { NgForm } from '@angular/forms';
declare const gapi;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isEdit: Boolean=false;
  googleevents: any;
  googleevent: any;
  myevent:any;

  eventtitle: String;
  eventlocation: String;
  eventdes: String;
  startdate: Date;
  enddate: Date;
  starttime: String;
  endtime: String;
  begindate: String;
  duedate: String;
  new_event: any;
  showForm: Boolean=false;;
  successComment: Boolean=false;
  successDelete: Boolean=false;
  constructor(private calendarService: CalendarService) { }

  toggleAddForm()
  {
    this.showForm=!this.showForm;
  }

  editEvent(id)
  {


    this.populateEvent(id);
    console.log(this.googleevent);
    this.isEdit=true;
     this.eventtitle=this.googleevent.summary;
     this.eventlocation=this.googleevent.location;
     this.eventdes=this.googleevent.description;
     this.begindate=this.googleevent.start.dateTime;
     this.currenttz=this.googleevent.start.timeZone;
     this.duedate=this.googleevent.end.dateTime;
    // this.new_event = {
    //   'summary': this.eventtitle,
    //   'location': this.eventlocation,
    //   'description': this.eventdes,
    //   'start': {
    //     'dateTime': this.begindate,
    //     'timeZone': this.currenttz
    //   },
    //   'end': {
    //     'dateTime': this.duedate,
    //     'timeZone': this.currenttz
    //   }}

    //   gapi.client.calendar.events.update({
    //     'calendarId': 'primary','eventId': id,
    //      'resource': this.new_event}).execute();
  
  }
  createEvent()
  {

    this.begindate = this.startdate.getFullYear()+'-'+(this.startdate.getMonth()+1).toString()+'-'+ this.startdate.getDate()+'T'+this.starttime+':00';
    this.duedate = this.enddate.getFullYear()+'-'+(this.enddate.getMonth()+1).toString()+'-'+ this.enddate.getDate()+'T'+this.endtime+':00';
    this.new_event = {
      'summary': this.eventtitle,
      'location': this.eventlocation,
      'description': this.eventdes,
      'start': {
        'dateTime': this.begindate,
        'timeZone': this.currenttz
      },
      'end': {
        'dateTime': this.duedate,
        'timeZone': this.currenttz
      }}

       gapi.client.calendar.events.insert({'calendarId': 'primary',
       'resource': this.new_event}).execute()

       
       
       this.successComment=true;
       this.toggleAddForm();
       setTimeout(() => {
        this.successComment=false;
    }, 3000);
  }


   


  user: User = this.calendarService.user;
  event: Event;
  onSubmit(form: NgForm) {
    this.event = {
      location: form.value.eventlocation,
      description: form.value.eventdes,
      summary: null,
      priority: 3,
      eventtype: null,
      inputtime: null,
      start: form.value.startdate,
      end: form.value.enddate,
      eventlength: null,
      splitable: null,
      minlength: null,
      dayofweek: null,
      timezone: form.value.currenttz,
      user: this.user
    };
    var aa = JSON.parse(JSON.stringify(this.event));
    this.calendarService.createEvent(aa);
  }
  deleteEvents(id: String)
  {
       gapi.client.calendar.events.delete({'calendarId': 'evannara@gmail.com' , 'eventId': id}).execute();
       this.successDelete=true;
       setTimeout(() => {
        this.successDelete=false;
    }, 3000);
  }


  afterEvents(){
    console.log(this.googleevents);
  }
  afterEvent(){
    console.log(this.googleevent);
  }

  populateEvents(){
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((response)=> {
      var events = response.result.items;
      this.googleevents=response.result.items;
      console.log("just populate events in googleevents");
    });
  }

  populateEvent(id){
    
    gapi.client.calendar.events.get({"calendarId": 'primary', "eventId": id}).then((data)=>{this.googleevent=data.result; console.log(this.googleevent);});

  }

  ngOnInit() {
    
  }
  currenttz: String;
  timezones: String[] = ['America/Los_Angeles', 'America/New_York', 'America/Denver', 'America/Chicago'];
  currentt: String;
  times: String[] = ['4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45']



}
