import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';

// import { UserProfileActions } from '../store/user-profile';
// import { EchoesState } from '../store/';

import { CLIENT_ID } from './constants';
import { GapiLoader } from './gapi-loader.service';




@Injectable()
export class Authorization{
  private isSignedIn: boolean = false;
  private _googleAuth: any;
  private _scope: string = 'profile email https://www.googleapis.com/auth/youtube';

  constructor(
    private zone: NgZone,
    // private store: Store<EchoesState>,
    private gapiLoader: GapiLoader,
    // private userProfileActions: UserProfileActions,
    public http: Http
  ) {
    this.loadAuth();
  }


  // # OLD VERSION: without combined chain
  loadAuth() {
      this.gapiLoader
        .load('auth2')
        .subscribe((authInstance: any) => {
          console.log("xac thuc",authInstance)
          // gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
          // 	console.log('authState changed', authState);
          // });
          if (authInstance && authInstance.currentUser) {
            return this._googleAuth = authInstance;
          }
          this.authorize()
            .then(googleAuth => {
              window.gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
                console.log('authState changed', authState);
              });
              const isSignedIn = googleAuth.isSignedIn.get();
              const authResponse = googleAuth.currentUser.get();
              const hasAccessToken = authResponse.getAuthResponse().hasOwnProperty('access_token');
              this._googleAuth = googleAuth;
              if (isSignedIn && hasAccessToken) {
                this.zone.run(() => this.handleSuccessLogin(authResponse));
              }
            });
        });
    }


  // // # NEW VERSION: combined chain
  // loadAuth() {
  // // attempt to SILENT authorize
  // this.gapiLoader
  //   .load('auth2')
  //   .switchMap(response => this.authorize())
  //   .subscribe((googleAuth: any) => {
  //     window.gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
  //       console.log('authState changed', authState);
  //     });
  //     const isSignedIn = googleAuth.isSignedIn.get();
  //     const authResponse = googleAuth.currentUser.get();
  //     const hasAccessToken = authResponse.getAuthResponse().hasOwnProperty('access_token');
  //     this._googleAuth = googleAuth;
  //     if (isSignedIn && hasAccessToken) {
  //       this.zone.run(() => this.handleSuccessLogin(authResponse));
  //     }
  //   });
  // }

  // // NEWER VERSION: upgarde with filter
  // loadAuth() {
  //   // attempt to SILENT authorize
  //   this.gapiLoader
  //     .load('auth2')
  //     .switchMap(response => this.authorize())
  //     .filter((googleAuth: any) => this.isSignIn())
  //     .filter((googleAuth: any) => this.hasAccessToken(googleAuth))
  //     .subscribe((googleAuth: any) => {
  //       window.gapi['auth2'].getAuthInstance().isSignedIn.listen(authState => {
  //         console.log('authState changed', authState);
  //       });
  //
  //       this._googleAuth = googleAuth;
  //
  //       this.zone.run(() =>
  //       this.handleSuccessLogin(googleAuth));
  //
  //     });
  // }

  private hasAccessToken (googleAuth: any): boolean {
   return googleAuth && googleAuth.currentUser.get().getAuthResponse().hasOwnProperty('access_token');
 }


  authorize() {
    const authOptions = {
      client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      scope: this._scope
    };
    return window.gapi.auth2.init(authOptions);
  }


  signIn() {
    const run = (fn) => (r) => this.zone.run(() => fn.call(this, r));
    const signOptions = { scope: this._scope };
    if (this._googleAuth) {
      this._googleAuth
        .signIn(signOptions)
        .then(
        run(this.handleSuccessLogin),
        run(this.handleFailedLogin)
        );
    }
  }


  handleSuccessLogin(response) {
    console.log('successful to login!', response)
    const token = response.getAuthResponse().access_token;
    this.isSignedIn = true;
    // this.store.dispatch(this.userProfileActions.updateToken(token));
  }

  handleFailedLogin(response) {
    console.log('FAILED TO LOGIN:', response);
  }
  //
  isSignIn() {
    return this.isSignedIn;
  }
}
