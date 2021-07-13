import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TestsComponent } from './tests/tests.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    //canActivate: [OktaAuthGuard]
  },
  {
    path: 'tests',
    component: TestsComponent,
    //canActivate: [OktaAuthGuard]
  },
  {
    path: 'monitoring',
    component: MonitoringComponent,
    //canActivate: [OktaAuthGuard]
  },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
