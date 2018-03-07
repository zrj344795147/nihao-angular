import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
// import {id} from "aws-sdk/clients/datapipeline";

@Injectable()
export class MessageService {
    constructor(
        private accountService: AccountService,
        private http: HttpClient
    ) {

    }

    getReply(message) {
        return new Promise((resolve, reject) => {
            if (message === '') {
                return '';
            }
            this.accountService.getIdToken()
                .then(idToken => {
                    // const url = 'https://298e853s72.execute-api.us-east-1.amazonaws.com/dev/reply';
                    const url = 'https://wnmojldtx9.execute-api.us-east-1.amazonaws.com/dev/reply';
                    // const url = 'https://wnmojldtx9.execute-api.us-east-1.amazonaws.com/test/reply';
                    const httpOption = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': idToken.toString(),
                            // 'Credential': '',
                        })
                    };

                    // const headers = new HttpHeaders()

                    const data = {
                        'message': '123123'
                    };
                    this.http.post(url, data, httpOption).toPromise()
                        .then(res => {
                            resolve(res);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });


    }
}
