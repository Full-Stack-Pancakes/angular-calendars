import { Time } from "@angular/common";
import { EventColor, EventAction } from "calendar-utils";
import { User } from "./User";

export class Event {
    location: string;
    description: string;
    priority: Number;
    eventtype: string;
    inputtime: Date;
    start: Date;
    end: Date;
    eventlength: Time;
    splitable: Boolean;
    minlength: Time;
    dayofweek: string;
    timezone: string;
    user: User;
    // id: number;
    // start: Date;
    // end: Date;
    // title: string;
    // color: {'#ad2121', '#FAE3E3'};
    // actions: EventAction[];
    // allDay: boolean;
    // inputtime: Date;
    
    // eventlength: Time;
    // splitable: Boolean;
    // minlength: Time;
    // userid: Number;
}