import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../services/message.service';
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
        this.messageService.getReply('123')
            .then(reply => {
                const response = JSON.parse(reply['body']);
                console.log(response['data']);
            })
            .catch(err => {
                console.log(err);
            });
        // this.accountService.getIdToken()
        //     .then(idToken => {
        //         const url = 'https://o7ke0duw75.execute-api.us-east-1.amazonaws.com/dev/reply';
        //         const data = {
        //             'message': '12121'
        //         };
        //
        //         const headers = {
        //             'content-type': 'application/json',
        //             'Authorization': idToken
        //         };
        //         // $http({
        //         //
        //         // })
        //         //     .then()
        //         //     .catch();
        //         fetch(url, {
        //             method: 'POST',
        //             headers: {
        //                 Authorization: idToken
        //             },
        //             body: JSON.stringify(data),
        //         })
        //             .then(res => {
        //                 console.log('Send successfully');
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //             });
        //     })
        //     .catch(err => {
        //        console.log(err);
        //     });
    }

}
