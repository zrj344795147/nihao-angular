import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    constructor(http: HttpClient) {
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
                console.log('getSession: ' + session.idToken.jwtToken);
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
                    this.session.user = cognitoUser;
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

    getIdToken() {
        return new Promise((resolve, reject) => {
            console.log('AccountService.getSession');

            this.userPool.getCurrentUser().getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('getSession: ' + session.idToken.jwtToken);
                resolve(session.idToken.jwtToken);
            });
        });
    }

    resendComfirmaion(username) {
        const userData = {
            Username : username,
            Pool : this.userPool
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                console.log(err);
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }

}
