import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { Event } from '../Event';
import { Time } from '@angular/common';
import { CalendarService } from '../calendar.service';
import { NgForm } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  currenttz: String;
  timezones: String[] = ['America/Los_Angeles', 'America/New_York', 'America/Denver', 'America/Chicago'];
  currentt: String;
  times: String[] = ['4:00', '4:15', '4:30', '4:45', '5:00', '5:15', '5:30', '5:45', '6:00', '6:15', '6:30', '6:45', '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45', '0:00', '0:15', '0:30', '0:45', '1:00', '1:15', '1:30', '1:45', '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45']

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  event: Event;
  
  userEvents: Event[];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private httpClient: HttpClient, private calendarService : CalendarService) {}
  myEvent: Event;
  ngOnInit() {
    //this.calendarService.getEventsByUserId(this.calendarService.userid).then((data:any[]) => this.userEvents);
    console.log("userid: " + this.calendarService.userid);
    this.calendarService.getEventsByUserId(this.calendarService.userid).then((data:any[]) => { 
    for (let i of data) {
      console.log(i);
    }
      // for(let i of data){
      //   console.log(i);
      //   console.log(i.dayofweek);
      //   this.myEvent.dayofweek = i.dayofweek;
      //   this.myEvent.user = i.user;
      //   this.myEvent.description = i.description;
      //   this.myEvent.duetime = i.duetime;
      //   this.myEvent.summary = i.summary;
      //   this.myEvent.endtime = i.endtime;
      //   this.myEvent.eventlength = i.eventlength;
      //   this.myEvent.eventtype = i.eventtype;
      //   this.myEvent.inputtime = i.inputtime;
      //   this.myEvent.location = i.location;
      //   this.myEvent.minlength = i.minlength;
      //   this.myEvent.priority = i.priority;
      //   this.myEvent.splitable = i.splitable;
      //   this.myEvent.starttime = i.starttime;
      //   this.myEvent.timezone = i.timezone;
      //   this.userEvents.push(this.event);
      // }
     });
    

  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // ADDS NEW EVENT TO CURRENT, FULL DAY BY DEFAULT
  addEvent(): void {
    this.events.push({
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
    });
    this.refresh.next();
  }
  a: any;
  b: any;
  c: any;
  onSubmit(form: NgForm) {
    this.a = form.value.enddate;
    console.log(this.a);
    this.c = form.value.endtime;
    console.log(this.c);
    this.a.setHours((new Date(this.c)).getHours());
    this.b = this.a.getHours();
    console.log(this.b);

    this.event = {
      
      summary: form.value.eventtitle,
      location: form.value.eventlocation,
      description: form.value.eventdes,
      priority: form.value.priority*1,
      eventtype: "static",
      inputtime: null,
      starttime: form.value.startdate,
      endtime: form.value.enddate.setHours(this.a),
      duetime: null,
      eventlength: null,
      splitable: null,
      minlength: null,
      dayofweek: null,
      timezone: form.value.currenttz,
      user: this.calendarService.user
    };
    var aa = JSON.parse(JSON.stringify(this.event));
    this.calendarService.createEvent(aa);
  }
  }
