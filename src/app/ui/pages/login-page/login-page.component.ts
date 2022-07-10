import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiHintService } from '@taiga-ui/core';
import { AnimationOptions } from 'ngx-lottie';
import { ClientService } from 'src/app/service/client-service.service';
import { AppSession } from 'src/app/utils/app-session';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://assets1.lottiefiles.com/packages/lf20_kwrdklsa/data.json',
  };
  username: string = '';
  password: string = '';
  isLoading = false;
  constructor(private router: Router, private clientService: ClientService) {}

  ngOnInit(): void {}

  async login() {
    this.isLoading = true;
    let response = await this.clientService.auth<any>('auth/login', {
      username: this.username,
      password: this.password,
      appName: 'DIAGO_Q_APP',
    });
    this.clientService.setAuthToken(response.accessToken);
    AppSession.setValue(AppSession.LoginAuth, response);
    this.isLoading = false;
    this.router.navigate(['dashboard']);
  }
}
