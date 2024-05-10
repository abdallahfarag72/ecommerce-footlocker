declare var google: any;
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private currentRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (!localStorage.getItem('loggedInUser')) {
      google.accounts.id.initialize({
        client_id:
          '376371039262-jprhddou88dtb1v4231tjcqu5184g9rr.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp),
      });

      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangle',
        width: 200,
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in session
      localStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      //navigate to home/browse
      this.authService.setState(payLoad);
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
