import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  ShouldShowLoader: boolean = false;
  constructor(private authservice : AuthService){}
  
  onSubmit(formValue:any){
    this.ShouldShowLoader = true;
    this.authservice.signup(formValue.email, formValue.password, formValue.cpassword).then(()=>{
      })
      .catch(err =>{
        this.ShouldShowLoader = false;
      });
    }
}
