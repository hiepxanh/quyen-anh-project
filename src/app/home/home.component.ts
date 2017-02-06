import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';

declare var gapi: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public auth2: any;

  ngOnInit() {
  }

  initAPI:any;

  constructor(private ngZone: NgZone) {

 }


 ngAfterViewInit() {
       let that = this;
       gapi.load('auth2', function () {

         that.auth2 = gapi.auth2.init({
           client_id: '731057771960-tvdglt2iflc98e9cuoddpj7rc2qealjd.apps.googleusercontent.com',
           cookiepolicy: 'single_host_origin',
           scope: 'profile email'
         });

         gapi.signin2.render('my-signin2', {
              'scope': 'profile email',
              'width': 240,
              'height': 50,
              'longtitle': true,
              'theme': 'light',
              'onsuccess': param => that.onSignIn(param)
          });

       });

 }

  onSignIn(googleUser) {
  console.log(googleUser);
  };

 // PATH 2

//  public auth2: any;
//   public googleInit() {
//     let that = this;
//     gapi.load('auth2', function () {
//
//       that.auth2 = gapi.auth2.init({
//         client_id: '731057771960-tvdglt2iflc98e9cuoddpj7rc2qealjd.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//         scope: 'profile email'
//       });
//
//       that.attachSignin(document.getElementById('googleBtn'));
//
//     });
//   }
//   public attachSignin(element) {
//     let that = this;
//     this.auth2.attachClickHandler(element, {},
//       function (googleUser) {
//
//         let profile = googleUser.getBasicProfile();
//         console.log('Token || ' + googleUser.getAuthResponse().id_token);
//         console.log('ID: ' + profile.getId());
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//         //YOUR CODE HERE
//
//
//       }, function (error) {
//         alert(JSON.stringify(error, undefined, 2));
//       });
//   }
//
// ngAfterViewInit(){
//       this.googleInit();
// }

}
