import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxTimelineModule } from 'ngx-timeline';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TestsComponent} from './tests/tests.component'
import { MonitoringComponent } from './monitoring/monitoring.component';
import { PiechartComponent } from './piechart/piechart.component';

import { OktaAuthModule } from '@okta/okta-angular';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimelineComponent,
    TestsComponent,
    MonitoringComponent,
    PiechartComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxTimelineModule,
    ModalModule.forRoot(),
    OktaAuthModule.initAuth({
      issuer: 'https://dev-912749.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/implicit/callback',
      clientId: '0oa11dxmg36mqfGA44x7'
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
