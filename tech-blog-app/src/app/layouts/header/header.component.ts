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


  async sendMail() {
    const payload: any = {
      "api_key": "mlsn.bca515a97425a42965f3e6e1b21003678f0e4ffbc4d64e27e35b6964a8c3d784",
      "from": {
        "email": "info@trial-pxkjn41x7rqgz781.mlsender.net",
        "name": "MailerSend"
      },
      "to": [
        {
          "email": "sahil2@yopmail.com",
          "name": "Sahil Mailer"
        }
      ],
      "subject": "Hello from Tech Blog App!",
      "text": "This is just a friendly hello from your friends at {$company}.",
      "html": "<b>This is just a friendly hello from your friends at {$company}.</b>",
      "personalization": [
        {
          "email": "john@mailersend.com",
          "data": {
            "company": "MailerSend"
          }
        }
      ]
    }

    const url = "https://api.mailersend.com/v1/email";
    const response = await fetch(url, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer mlsn.bca515a97425a42965f3e6e1b21003678f0e4ffbc4d64e27e35b6964a8c3d784'
      },
      body: JSON.stringify(payload),
      
    });

    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(response.json);
  }
}

