import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { SignupComponent } from './components/Signup/signup.component';
// Services
import { AccountService } from './services/account.service';
import { AppRoutingModule } from './routing';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        AccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
