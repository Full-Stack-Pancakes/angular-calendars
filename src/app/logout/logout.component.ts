import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { Router} from '@angular/router'; 
declare const gapi;
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private global: Globals, private router: Router) { }

  ngOnInit() {
  }

  signOutGoogle(){
    gapi.auth2.getAuthInstance().signOut();
    this.global.setSignIn(false);
    console.log("LOGOUT>>");
    this.router.navigate(['/login']);
  }
}
