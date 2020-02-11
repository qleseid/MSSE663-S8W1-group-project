import { Component } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MSSE663-S8W1-group-project';

  constructor(
    public authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

  logoutAll() {
    this.authService.logoutAll();
  }
}
