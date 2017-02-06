import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DemoComponent } from './demo/demo.component';

const appRoutes: Routes = [
  {path:'',
    component: HomeComponent},
    {path:'about',
      component: AboutComponent},
      {path:'demo',
        component: DemoComponent},
      {path:'**',
        component:HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
  })

  export class AppRoutingModule {}
