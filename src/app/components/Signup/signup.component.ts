import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [
        './signup.component.css',
        // '../../asserts/css/bootstrap.css'
    ]
})

export class SignupComponent implements OnInit {
    username: String;
    password: String;
    passwordConfirm: String;
    nickname: String;
    constructor(
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
        this.accountService.getSession()
            .then(res => {
                console.log('Already logged in');
                console.log(res);
                this.router.navigateByUrl('home');
            })
            .catch(err => {
                console.log('Not logged in');
            });
    }

    goToLogin() {
        this.router.navigateByUrl('/login');
    }

    clickSignup() {
        console.log('username: ' + this.username);
        console.log('password: ' + this.password);
        console.log('nickname: ' + this.password);
        console.log('Ready to Signup');
        this.accountService.signUp(this.username, this.password, this.nickname)
            .then(res => {
                console.log('Signup Successfully. Please Verificate ');
                this.router.navigateByUrl('login');
            })
            .catch(err => {
                console.log(err);
            });
    }

}
