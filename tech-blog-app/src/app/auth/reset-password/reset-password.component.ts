import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private authservice: AuthService){}
  onSubmit(formValue:any){
    this.authservice.resetPassword(formValue.email);
  }

}
