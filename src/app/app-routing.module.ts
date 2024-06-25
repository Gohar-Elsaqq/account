import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddSystemTypeComponent } from './add/addSystemType/add-system-type.component';
import { AparmentSearchComponent } from './Aparment/aparment-search/aparment-search.component';
import { AddAparmentComponent } from './Aparment/addapartment/addapartment.component';
import { AddSystemTypeComponent } from './SystemType/addSystemType/add-system-type.component';
import { SystemtypesearchComponent } from './SystemType/systemtypesearch/systemtypesearch.component';
import { AddDetailsApartmentComponent } from './DetailsApartment/add-details-apartment/add-details-apartment.component';
import { UpdataapartmentComponent } from './Aparment/updataapartment/updataapartment.component';
import { DetailsApartmentviweComponent } from './DetailsApartment/details-apartmentviwe/details-apartmentviwe.component';
import { FinishProfitComponent } from './Aparment/finish-profit/finish-profit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ 
  { path: '', component: LoginComponent },
  { path: 'AddAparment', component: AddAparmentComponent,canActivate :[AuthGuard] },
  { path: 'AddSystemType', component: AddSystemTypeComponent,canActivate :[AuthGuard] },
  { path: 'AparmentSearch', component: AparmentSearchComponent ,canActivate :[AuthGuard] },
  { path: 'TypeSearch', component: SystemtypesearchComponent ,canActivate :[AuthGuard] },
  { path: 'AddAparmentDetails', component: AddDetailsApartmentComponent ,canActivate :[AuthGuard] },
  { path: 'UpDataApartment', component: UpdataapartmentComponent,canActivate :[AuthGuard] },
  { path: 'DetailsApartmentviwe', component: DetailsApartmentviweComponent ,canActivate :[AuthGuard] },
  { path: 'finishProfit', component: FinishProfitComponent ,canActivate :[AuthGuard] },
  { path: 'home', component: HomeComponent ,canActivate :[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
