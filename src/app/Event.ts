import { Time } from "@angular/common";
import { EventColor, EventAction } from "calendar-utils";
import { User } from "./User";

export class Event {

    location: String;
    description: String;
    priority: number;
    summary: string;
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
}