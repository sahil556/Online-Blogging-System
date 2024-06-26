import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CategoryNavbarComponent } from './layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { AngularFireModule} from '@angular/fire/compat';
import { ToastrModule} from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { SingleCodeComponent } from './pages/single-code/single-code.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainComponentComponent } from './main-component/main-component.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommentModule } from './post-comments/comment/comment.module';
import { CommentsComponent } from './comments/comments/comments.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { LoaderComponent } from './layouts/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HomeComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    TermsAndConditionComponent,
    ContactUsComponent,
    SubscriptionFormComponent,
    AboutUsComponent,
    PostCardComponent,
    SingleCodeComponent,
    SpinnerComponent,
    MainComponentComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    AllPostComponent,
    NewPostComponent,
    CommentsComponent,
    ResetPasswordComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // Adjust positioning
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      // Other configuration options...
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    CommentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
