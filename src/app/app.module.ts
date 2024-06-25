import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AparmentSearchComponent } from './Aparment/aparment-search/aparment-search.component';
import { SystemtypesearchComponent } from './SystemType/systemtypesearch/systemtypesearch.component';
import { AddSystemTypeComponent } from './SystemType/addSystemType/add-system-type.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddAparmentComponent } from './Aparment/addapartment/addapartment.component';
import { AddDetailsApartmentComponent } from './DetailsApartment/add-details-apartment/add-details-apartment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdataapartmentComponent } from './Aparment/updataapartment/updataapartment.component';
import { DetailsApartmentviweComponent } from './DetailsApartment/details-apartmentviwe/details-apartmentviwe.component';
import { FinishProfitComponent } from './Aparment/finish-profit/finish-profit.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AddSystemTypeComponent,
    MenuComponent,
    AparmentSearchComponent,
    SystemtypesearchComponent,
    AddAparmentComponent,
    AddDetailsApartmentComponent,
    UpdataapartmentComponent,
    DetailsApartmentviweComponent,
    FinishProfitComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
