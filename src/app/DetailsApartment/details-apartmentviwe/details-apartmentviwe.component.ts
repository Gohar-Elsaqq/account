import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-details-apartmentviwe',
  templateUrl: './details-apartmentviwe.component.html',
  styleUrls: ['./details-apartmentviwe.component.css']
})
export class DetailsApartmentviweComponent {
  constructor(private appService: AppServices, private router: Router, private route: ActivatedRoute) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state != undefined)
      this.navigateParams = navigation.extras.state;
  }
  navigateParams:any;
  actApartmentsView: any[] = [];
  errormsg = false;
  ifSaved = false;
  id:number=0;
  data:any;
  apartmentCode: string = '';
  noDataFound = false;
  ngOnInit(): void {
    const state = history.state;
    if (state && state.apartmentCode) {
      this.apartmentCode = state.apartmentCode;
      
      this.loadApartmentDetails(this.apartmentCode);
    } else {
      console.error('Apartment code is missing from state.');
    }
  }
  loadApartmentDetails(apartmentCode: string): void {
    this.appService.detailsApartmentviwe(apartmentCode).subscribe(
      (responseData: any) => {
        if (responseData && responseData.length > 0) {
          this.actApartmentsView = responseData;
          this.noDataFound = false;
        } else {
          this.noDataFound = true;
          this.actApartmentsView = [];
        }
      },
      (error: any) => {
        console.error('Error fetching apartment data:', error);
        this.noDataFound = true;
      }
    );
  }
  onDelete(detailsApartmentId:number) {
    this.appService.deleteDetailsApartment(detailsApartmentId).subscribe(
      response => {
        this.ifSaved = true;
        this.errormsg = false;
        setTimeout(() => {
          this.ifSaved = false;
        }, 4000);
        this.actApartmentsView = this.actApartmentsView.filter(item => item.detailsApartmentId !== detailsApartmentId);
      },
      error => {
        this.errormsg = true;
      }
    );
  }
}