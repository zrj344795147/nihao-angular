import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css',
        // '../../asserts/css/bootstrap.css'
    ]
})

export class HomeComponent implements OnInit {
    // username: String;
    // password: String;
    constructor(
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    clickSignOut() {
        this.accountService.signOut()
            .then(res => {
                console.log('Sign Out Successfully');
                this.router.navigateByUrl('signup');
            })
            .catch(err => {
                console.log(err);
            });
    }

}
