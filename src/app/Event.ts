import { Time } from "@angular/common";
import { EventColor, EventAction } from "calendar-utils";
import { User } from "./User";

export class Event {
    location: string;
    description: string;
    priority: number;
    summary: string;
    eventtype: string;
    inputtime: Date;
    duetime: Date;
    starttime: Date;
    endtime: Date;
    eventlength: Time;
    splitable: Boolean;
    minlength: Time;
    dayofweek: string;
    timezone: string;
    user: User;
}