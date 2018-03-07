import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/Home/home.component';
import { SignupComponent } from './components/Signup/signup.component';
// Services
import { AccountService } from './services/account.service';
import { MessageService } from './services/message.service';


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
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        AccountService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
