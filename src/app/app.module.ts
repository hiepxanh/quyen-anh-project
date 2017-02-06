import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Addition Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// Addition Modules
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

// Addtition providers
import { Authorization } from './services/authorization.service';
import { GapiLoader } from './services/gapi-loader.service';
import { DemoComponent } from './demo/demo.component';
import { FacebookService } from './services/facebook.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     [MaterialModule.forRoot()],
     AppRoutingModule
  ],
  providers: [
    // Authorization,
    // GapiLoader
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
