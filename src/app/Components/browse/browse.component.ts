import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent {
  constructor(private auth: AuthService) {}
  localStorage = localStorage.getItem('loggedInUser');
  name = JSON.parse(this.localStorage!).name;
  userProfileImg = JSON.parse(this.localStorage!).picture;
  email = JSON.parse(this.localStorage!).email;

  signOut() {
    localStorage.removeItem('loggedInUser');
    this.auth.setState(null);
    this.auth.signOut();
  }
}
