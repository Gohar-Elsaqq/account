import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeoutError, timeout } from 'rxjs';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-finish-profit',
  templateUrl: './finish-profit.component.html',
  styleUrls: ['./finish-profit.component.css']
})
export class FinishProfitComponent {
  errormsg = false;
  ifSaved = false;
  errorStatus: String | undefined;
  navigateParams: any;
  apartmentCode: string = '';
  myform = new FormGroup({
    amountApartmentSale: new FormControl('', [Validators.required]),
  });
  constructor(private appService: AppServices, private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state != undefined) {
      this.navigateParams = navigation.extras.state;
      if (this.navigateParams.apartmentCode) {
        this.apartmentCode = this.navigateParams.apartmentCode;
      }
    }
  }
  ngOnInit(): void {
    this.myform = new FormGroup({
      amountApartmentSale: new FormControl('', [Validators.required])
    });
  }

  onsubmit() {
    if (this.myform.invalid) {
      this.errormsg = true;
      this.ifSaved = false;
      console.log("Not Valid");
      setTimeout(() => {
        this.errormsg = false;
      }, 4000);
      return;
    }
  
    const formData = {
      amountApartmentSale: this.myform.value.amountApartmentSale
    };
  
    this.appService.finishProfit(this.apartmentCode,formData).subscribe({
      next: (response: any) => {
        console.log("Done");
  
        if (response && response.description === "Success") {
          this.ifSaved = true;
          this.errormsg = false;
          setTimeout(() => {
            this.ifSaved = false;
          }, 4000);
          this.myform.reset();
        }
      },
      error: (error) => {
        if (error instanceof TimeoutError || error.status === 0) {
          this.errormsg = true;
          this.errorStatus = 'timeout';
        }
      }
    });
  }
  formGroupToJson(formGroup: FormGroup): any {
    const serialized = { ...formGroup.value };
    Object.keys(serialized).forEach(key => {
      if (serialized[key] instanceof FormGroup) {
        serialized[key] = this.formGroupToJson(serialized[key]);
      }
    });
    return serialized;
  }
}
