import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServices } from 'src/app/app-services';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-aparment-search',
  templateUrl: './aparment-search.component.html',
  styleUrls: ['./aparment-search.component.css']
})
export class AparmentSearchComponent {
  constructor(private appService: AppServices, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }
  apartments: any[] = [];
  contributors: any[] = [];
  apartmentCode: string = '';
  filteredApartments: any[] = [];
  errormsg = false;
  ifSaved = false;
  

  ngOnInit(): void {
    this.getAllapartment();
  }

  getAllapartment() {
    this.appService.getAllapartment().subscribe(
      (responseData: any) => {
        this.apartments = responseData;
        this.filteredApartments = this.apartments; 
      },
      (error: any) => {
        console.error('Error fetching apartment data:', error);
      }
    );
  }

  filterApartments() {
    if (this.apartmentCode) {
      this.filteredApartments = this.apartments.filter(apartment =>
        apartment.apartmentCode.includes(this.apartmentCode)
      );
    } else {
      this.filteredApartments = this.apartments;
    }
  }

  onSave(apartmentCode: string) {
    
    this.router.navigate(['AddAparmentDetails'], { state: { apartmentCode } });
  }
  onEdit(apartmentCode: string) {
    if (apartmentCode) {
      this.appService.getApartmentCode(apartmentCode).subscribe(
        (responseData: any) => {
          this.router.navigate(['UpDataApartment'], { state: responseData });
        },
        (error: any) => {
          console.error('Error fetching apartment data:', error);
        }
      );
    } else {
      console.error('Apartment code is undefined or null.');
    }
  }

  onDelete(apartmentCode: string) {
    if (this.apartmentCode === null) {
      this.errormsg = true;
      this.ifSaved = false;
      console.log("Not Valid");
      setTimeout(() => {
        this.errormsg = false;
      }, 4000);
      return;
    }
    this.appService.deleteapartment(apartmentCode).subscribe(
      response => {
        this.ifSaved = true;
        this.errormsg = false;
        setTimeout(() => {
          this.ifSaved = false;
        }, 4000);
        this.apartments = this.apartments.filter(item => item.apartmentCode !== apartmentCode);
      },
      error => {
        this.errormsg = true;
      }
    );
  }
  getApartmentCode(apartmentCode: string) {
    this.filterApartments();
  }
  onviwe(apartmentCode: string){
          this.router.navigate(['DetailsApartmentviwe'], { state :{ apartmentCode } });
  }

  finel(apartmentCode: string) {
    
    this.router.navigate(['finishProfit'], { state: { apartmentCode } });
  }

}