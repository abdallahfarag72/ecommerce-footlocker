import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';
import { NgModel } from '@angular/forms';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { db } from '../../../db';
import { JsonPipe } from '@angular/common';
import { adminsEmailsArr } from '../../vars';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [AuthService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  jwt: string = '';
  userState: any;
  cartAppear: number = 0;
  userStateEmail: any = '';
  data: any;
  userName: any;
  inputValue:any
  userRole: any;


  onEnterkeydown(event:any){
    this.router.navigate(['/list'], { queryParams: { title: this.inputValue } })
    this.inputValue = ""
  }

  constructor(private authService: AuthService, private router :Router, private auth: AuthService) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
  const userEmail = loggedInUser ? JSON.parse(loggedInUser).email : '';
    if (adminsEmailsArr.includes(userEmail)){
      this.userRole = "Admin"
      console.log("user is admin", userEmail)
      
    }
    console.log(userEmail, adminsEmailsArr)
    //state service and getting the username and email
    this.authService.AminElShorta$.subscribe((newChange) => {
      this.userState = newChange?.name;
      this.userStateEmail = newChange?.email;
      this.userRole = adminsEmailsArr.includes(newChange?.email)? "Admin": "User"; //check if this user is in vars.ts aka Admin
      
    });
  }

  signOut() {
    localStorage.removeItem('loggedInUser');
    this.auth.setState(null);
    this.auth.signOut();
    this.router.navigate(['/home']);
  }


}