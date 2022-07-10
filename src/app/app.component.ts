import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSession } from './utils/app-session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'amber_bird_angular';
  constructor(private router: Router) {
    if (AppSession.checkSession(AppSession.LoginAuth)) {
      router.navigate(['dashboard']);
    } else router.navigate(['login']);
  }
}
