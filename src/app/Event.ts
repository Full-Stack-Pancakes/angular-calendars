import { Time } from "@angular/common";

export class Event {
    location: String;
    description: String;
    priority: number;
    eventtype: string;
    inputtime: Date;
    duetime: Date;
    starttime: Date;
    eventlength: Time;
    splitable: boolean;
    minlength: Time;
    dayofweek: string;
    timezone: string;
    userid: number;
}