import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        '../../asserts/css/style.css',
        '../../asserts/css/bootstrap.css'
    ]
})

export class HomeComponent implements OnInit {
    message: String;
    reply: String;
    constructor(
        private accountService: AccountService,
        private messageService: MessageService,
        private router: Router
    ) {
        this.message = '';
        this.reply = '';
    }

    ngOnInit() {
        this.accountService.getSession()
            .then(res => {

            })
            .catch(err => {
                console.log('Not logged in');
                this.router.navigateByUrl('login');
            });
    }

    clickSignOut() {
        this.accountService.signOut()
            .then(res => {
                console.log('Sign Out Successfully');
                this.router.navigateByUrl('login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    clickSend() {
        if (this.message === '') {
            this.reply = '';
        }
        this.messageService.getReply(this.message)
            .then(reply => {
                const response = JSON.parse(reply['body']);
                console.log(response['data']);
                this.reply = response['data'];
            })
            .catch(err => {
                console.log(err);
            });

    }

}
