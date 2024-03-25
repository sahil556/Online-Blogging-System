import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authservice : AuthService){}
  
  onSubmit(formValue:any){
    this.authservice.signup(formValue.email, formValue.password, formValue.cpassword);
  }
}
