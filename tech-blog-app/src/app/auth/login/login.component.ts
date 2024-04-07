import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ShouldShowLoader: boolean = false;
  constructor(private authservice : AuthService){}
  
  async onSubmit(formValue:any):Promise<void>{
    this.ShouldShowLoader = true;
    this.authservice.login(formValue.email, formValue.password).then(()=>{
    })
    .catch(err =>{
      this.ShouldShowLoader = false;
    });
    
  }
  
}
