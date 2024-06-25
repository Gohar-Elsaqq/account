import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AppServices {

  constructor(private httpClient: HttpClient, private router: Router) {
  }
  apartmentsave(body: any) {
    const url = environment.Account + '/apartment/save';
    const header = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.httpClient.post(url, JSON.stringify(body), { headers: header });
  }
  systemtypesave(body: any) {
    const url = environment.Account + '/systemType/save';
    const header = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.httpClient.post(url, JSON.stringify(body), { headers: header });

  }
  getAllapartment() {
    const url = environment.Account + '/apartment/allApartment';
    return this.httpClient.get(url);
  }
  getApartmentCode(apartmentCode: string): Observable<any> {
    const url = environment.Account + '/apartment/getApartment?apartmentCode=' + apartmentCode;
    return this.httpClient.get(url);
  }

  getApartmentName(): Observable<any> {
    const url = environment.Account + '/apartment/getApartmentName';
    return this.httpClient.get(url);
  }

  getAllType(): Observable<any> {
    const url = environment.Account + '/systemType/all';
    return this.httpClient.get(url);
  }
  ADDDetailsApartment(body: any) {
    const url = environment.Account + '/detailsApartment/save';
    const header = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.httpClient.post(url, JSON.stringify(body), { headers: header });
  }
  findAllActiveName(): Observable<any> {
    const url = environment.Account + '/systemType/findAllActiveName';
    return this.httpClient.get(url);
  }

  deletesystemType(lookupType: string): Observable<any> {
    const url = environment.Account + '/systemType/delete/' + lookupType;
    return this.httpClient.delete(url);
  }
  deleteapartment(apartmentCode: string): Observable<any> {
    const url = environment.Account + '/apartment/delete/' + apartmentCode;
    return this.httpClient.delete(url);
  }
  detailsApartmentviwe(apartmentCode: string): Observable<any> {
    const url = `${environment.Account}/detailsApartment/searchApartment?apartmentCode=${apartmentCode}`;
    return this.httpClient.get(url);
  }
  deleteDetailsApartment(detailsApartmentId: number): Observable<any> {
    const url = environment.Account + '/detailsApartment/delete/' + detailsApartmentId;
    return this.httpClient.delete(url);
  }
  finishProfit(apartmentCode: string, dtat: any): Observable<any> {
    const url = environment.Account + '/apartment/finishProfit/' + apartmentCode;
    const body = dtat;
    return this.httpClient.post(url, body);
  }

  Login(body: any) {
    const url = environment.Account + '/login';
    const header = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.httpClient.post(url, JSON.stringify(body), { headers: header });
}
}


