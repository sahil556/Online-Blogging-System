import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SingleCodeComponent } from './pages/single-code/single-code.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { CommentsComponent } from './comments/comments/comments.component';

const routes: Routes = [
  {path:'', component: MainComponentComponent, 
    children: [
      {path:'', component: HomeComponent},
      {path:'categories/:category/:id', component: SingleCategoryComponent},
      {path:'post/:id', component:SinglePostComponent},
    ]
  },
  {path: 'dashboard', component:DashboardComponent, canActivate: [authGuard]},
  {path:'categories/:category/:id', component: SingleCategoryComponent},
  {path:'post/:id', component:SinglePostComponent},
  {path:'about', component:AboutUsComponent},
  {path:'term-conditions', component:TermsAndConditionComponent},
  {path:'contact', component:ContactUsComponent},
  {path: 'code', component:SingleCodeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'myposts', component:AllPostComponent, canActivate: [authGuard]},
  {path:'myposts/create-post', component:NewPostComponent, canActivate: [authGuard]},
  {path:'mycomments', component: CommentsComponent, canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
