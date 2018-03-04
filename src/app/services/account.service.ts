import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
// import { config as AwsConfig, CognitoIdentityCredentials } from 'aws-sdk';
// import * as AWS from 'aws-sdk/global';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


const poolData = {
    UserPoolId: 'us-east-1_bpYWRgIrp',
    ClientId: 'mlufea603np7k5370je4rriag',
    // IdentityPoolId: 'us-east-1:a4d51db4-72ad-4560-8595-7fbe8d10e1cd'
};

@Injectable()
export class AccountService {
    userPool: any;
    session: any;
    constructor() {
        this.userPool = new CognitoUserPool(poolData);
        this.session = {
            registered: false,
            confirmed: false,
            user: null
        };
    }

    getSession() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.getSession');

            this.userPool.getCurrentUser().getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(session);
            });
        });
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            console.log('AccountService.login');

            const authenticationData = {
                Username : username,
                Password : password,
            };
            const authenticationDetails  = new AuthenticationDetails(authenticationData);
            const userData = {
                Username: username,
                Pool: this.userPool
            };
            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (res) => {
                    console.log(res.getIdToken().getJwtToken());
                    resolve(res);
                },
                onFailure: (err) => {
                    // if (err.code === AWS_USER_NOT_FOUND) {
                    //   reject({[F_USERNAME]: ERR_USER_NOT_FOUND});
                    // } else if (err.code === AWS_USER_NOT_CONFIRMED) {
                    //   reject({[F_PIN]: ERR_USER_NOT_CONFIRMED});
                    // } else if (err.code === AWS_NOT_AUTHORIZED_EXCEPTION) {
                    //   reject({[F_PASSWORD]: ERR_NOT_AUTHORIZED});
                    // } else {
                    //   alert(err.code + ": " + err.message);
                    console.log(err);
                    reject(err);
                }
            });
        });
    }

    signUp(username, password, nickname) {
        return new Promise((resolve, reject) => {
            const userPool = new CognitoUserPool(poolData);
            const attributeList = [];
            const attributeEmail = new CognitoUserAttribute({
                Name : 'email',
                Value : username
            });
            attributeList.push(attributeEmail);
            const attributeNickName = new CognitoUserAttribute({
                Name : 'nickname',
                Value : nickname
            });
            attributeList.push(attributeNickName);
            userPool.signUp(username, password, attributeList, null, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                this.session.user = res.user;
                console.log('user name is ' + this.session.user.getUsername());
                resolve(res);
            });
        });
    }

    signOut() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.signOut');

            const cognitoUser = this.userPool.getCurrentUser();

            this.session.confirmed = false;
            this.session.registered = false;
            this.session.user = null;

            if (cognitoUser != null) {
                cognitoUser.signOut();
            }
            // Reset other services
            resolve();
        });
    }

    // // Private
    // _getSession(cognitoUser) {
    //     console.log('AccountService._getSession for ' + cognitoUser.username);
    //
    //     return new Promise((resolve, reject) => {
    //         cognitoUser.getSession((err, session) => {
    //             if (err) {
    //                 console.log('session validity: ' + err);
    //                 this.signOut().then(res => resolve(res)).catch(err => reject(err));
    //                 return;
    //             }
    //
    //             console.log('session validity: ' + session.isValid());
    //             this.session.user = cognitoUser;
    //
    //             resolve(session);
    //         });
    //     });
    // }
}