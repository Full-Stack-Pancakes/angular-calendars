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
  
  users: Array<User>;
  password: string;
  constructor(private httpClient: HttpClient, private calservice: CalendarService) { }
  

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    this.calservice.getUsers().then(
      (data:any[]) => {
        for(let i of data){
          if(i.email == form.value.username){
            if(i.password == form.value.password){
              console.log("logged in")
            }
          }
        }
      }
    );
  }

  onSubmit2(form: NgForm){
    this.user = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    };
    
    //http://project2-env.yw7euukwbt.us-east-2.elasticbeanstalk.com/users
    var aa = JSON.parse(JSON.stringify(this.user));
    console.log(aa);
    this.calservice.createUser(aa);
  }
}
