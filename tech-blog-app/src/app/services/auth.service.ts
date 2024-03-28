import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  isLoggedinguard: boolean = false;
  constructor(private afauth: AngularFireAuth, private toastr : ToastrService,  private router : Router) { }
  login(email: string, password: string)
  {
    this.afauth.signInWithEmailAndPassword(email, password).then((logRef)=>{
      this.toastr.success("Logged in Successfully");
      this.loadUser()
      this.loggedIn.next(true);
      this.isLoggedinguard = true;
      this.router.navigate(['/dashboard']);
    })
    .catch(err =>{
      console.log(err)
      this.toastr.warning(err,"Invalid Credentials");

    })
  }

  signup(email:string, password:string, cpassword:string)
  {
    if(email == "" || password == "")
    {
      this.toastr.warning("All Fields Are Required");
      return;
    }
    else if(password != cpassword)
    {
      this.toastr.warning("Password and Confirm Password must be the same")
      return;
    }
    this.afauth.createUserWithEmailAndPassword(email, password).then((signupref) => {
      this.toastr.success("SignUp Successfull !");
      this.loadUser()
      this.loggedIn.next(true);
      this.isLoggedinguard = true;
      this.router.navigate(['/dashboard']);
    })
    .catch(err => {
      console.log(err);
      this.toastr.warning(err, "user creation failed");
    })

  }

  loadUser()
  {
    this.afauth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user));
    })
  }


  logout()
  {
    this.afauth.signOut().then(()=>{
      this.loggedIn.next(false);
      localStorage.removeItem('user');
      this.isLoggedinguard = false;
      this.toastr.success("Logged Out Successfully")
      this.router.navigate(['/login'])
    })
  }

  isLoggedin()
  {
    console.log(JSON.parse(localStorage.getItem('user') || '{}').email)
    if(JSON.parse(localStorage.getItem('user') || '{}').email != undefined)
    {
      this.loggedIn.next(true);
      this.isLoggedinguard = true;
    }
    return this.loggedIn.asObservable();
  }


  resetPassword(email : string)
  {
    this.afauth.sendPasswordResetEmail(email ).then((docRef)=>{
      console.log(docRef);
      this.toastr.success("link will expire in 30 minutes", "Password Reset link is sent to your email", );
      this.router.navigate(['/login'])
    })
    .catch((error)=>{
      this.toastr.warning("some thing went wront !", "please try after some time");
    })
  }

}
