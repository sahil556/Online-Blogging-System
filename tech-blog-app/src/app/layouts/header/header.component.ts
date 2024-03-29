import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any = '';
  isLoggedin$!: Observable<boolean>;
  shouldDisplayLogin: boolean = true;
  constructor(private authservice: AuthService) {
  }
  ngOnInit() {
    this.isLoggedin$ = this.authservice.isLoggedin();
  }

  shoulddisplay() {
    if (window.location.href.endsWith('login') || window.location.href.endsWith('signup')) {
      return false;
    }
    return true;
  }

  getuser() {
    return JSON.parse(localStorage.getItem('user') || '{}').email;
  }
  onLogout() {
    this.authservice.logout();
  }
}

