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
    let responce = this.afauth.signInWithEmailAndPassword(email, password);
    responce.then((logRef)=>{
      this.loadUser()
      this.loggedIn.next(true);
      this.isLoggedinguard = true;
      this.router.navigate(['/dashboard']);
    })
    .catch(err =>{
      console.log(err)
      this.toastr.warning(err,"Invalid Credentials");
    })
    return responce;
  }

  signup(email:string, password:string, cpassword:string)
  {
    let responce = this.afauth.createUserWithEmailAndPassword(email, password);
    responce.then((signupref) => {
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
    return responce;

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
