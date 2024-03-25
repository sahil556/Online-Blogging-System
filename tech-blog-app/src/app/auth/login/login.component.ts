import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private authservice : AuthService){}
  
  onSubmit(formValue:any){
    this.authservice.login(formValue.email, formValue.password);
  }
  
}
