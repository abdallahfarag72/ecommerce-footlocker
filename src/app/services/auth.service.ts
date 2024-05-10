declare var google: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(public router: Router) {
    //really important step to count for the hard refresh of  the browser. the constructor is called when signed in, logged in or hard refresh
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      AuthService.State$.next(JSON.parse(storedUser));
    }
  }
  static State$ = new BehaviorSubject<any>(null);
  AminElShorta$ = AuthService.State$.asObservable();

  setState(newState: any) {
    AuthService.State$.next(newState);
  }

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/login'])
  }
}
