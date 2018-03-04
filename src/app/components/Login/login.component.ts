import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css',
        // '../../asserts/css/bootstrap.css'
    ]
})

export class LoginComponent implements OnInit {
    username: String;
    password: String;
    constructor(
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
        this.accountService.getSession()
            .then(res => {
                console.log('Already logged in');
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                console.log('Not logged in');
            });

    }

    goToSignUp() {
        this.router.navigateByUrl('signup');
    }

    clickLogin() {
        console.log('username: ' + this.username);
        console.log('password: ' + this.password);
        console.log('Ready to Login');
        this.accountService.login(this.username, this.password)
            .then(res => {
                console.log('Login Successfully');
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                console.log(err);
            });
    }

}
