import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { User } from '../User';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(private httpClient: HttpClient, private calservice: CalendarService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    console.log(form);
    console.log(form.value.username);
    console.log(form.value.password);
    
  }

  onSubmit2(form: NgForm){
    this.user = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      events: null
    };
    
    //http://project2-env.yw7euukwbt.us-east-2.elasticbeanstalk.com/users
    var aa = JSON.parse(JSON.stringify(this.user));
    console.log(aa);
    this.calservice.createUser(aa);
  }
}
