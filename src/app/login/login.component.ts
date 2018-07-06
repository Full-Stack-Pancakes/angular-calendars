import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from '../calendar.service';
import { User } from '../User';
import { Router} from '@angular/router'; 
import { Globals} from '../global'


declare const gapi;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignIn: any=5;
  

  CLIENT_ID: string = '71981442606-teuh4dts215oti8e39nh91q5u43uj0bq.apps.googleusercontent.com'
  API_KEY: string = 'AIzaSyBQBa3p9q0qkknOuXNmA2saBvMDcl10mJI';
  DISCOVERY_DOCS: string[]= ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  SCOPES: string = "https://www.googleapis.com/auth/calendar";

  user: User;

  constructor(private httpClient: HttpClient, private calendarService : CalendarService, private router: Router, private global: Globals) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    this.calendarService.getUsers().then(
      (data:any[]) => {
        for(let i of data){
          if(i.email == form.value.username){
            if(i.password == form.value.password){
              console.log("logged in");
               this.global.isSignIn=true;
              this.router.navigate(['/home', '']);
              
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
      password: form.value.password,
    };
    
    //http://project2-env.yw7euukwbt.us-east-2.elasticbeanstalk.com/users
    var aa = JSON.parse(JSON.stringify(this.user));
    console.log(aa);
    this.calendarService.createUser(aa);
  }

  signInGoogle() 
  {
    gapi.load('client:auth2', ()=>
    {
      console.log("HINNIN");
      gapi.client.init
      ({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES  
      });
      gapi.auth2.getAuthInstance().signIn();
      this.global.myNum='99';
      this.global.setSignIn(true);
      console.log("logged in")
      this.router.navigate(['/home']);
      

      
    })
  }
  signOutGoogle(){
    gapi.auth2.getAuthInstance().signOut();
    this.global.setSignIn(false);
    console.log("LOGOUT>>");
  }
}
