import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimeoutError, timeout } from 'rxjs';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-updataapartment',
  templateUrl: './updataapartment.component.html',
  styleUrls: ['./updataapartment.component.css']
})
export class UpdataapartmentComponent implements OnInit {
  errormsg = false;
  ifSaved = false;
  errorStatus: String | undefined;
  apartments: any[] = [];
  data: any;

  myform = new FormGroup({
    apartmentCode: new FormControl('', [Validators.required]),
    locationApartment: new FormControl('', [Validators.required]),
    purchaseApartment: new FormControl('', [Validators.required]),
    expenses: new FormControl('', [Validators.required]),
    amountApartmentSale: new FormControl('', [Validators.required]),
    comments: new FormControl(''),
    apartmentCodeNew: new FormControl(''),
    contributors: new FormArray([])
  });

  constructor(private appService: AppServices, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras.state;
    console.log(this.data);
    console.log("from update apartment component");
  }

  ngOnInit(): void {
    if (this.data) {
      this.myform.patchValue({
        apartmentCode: this.data.apartmentCode,
        locationApartment: this.data.locationApartment,
        purchaseApartment: this.data.purchaseApartment,
        expenses: this.data.expenses,
        amountApartmentSale: this.data.amountApartmentSale,
        comments: this.data.comments,
        apartmentCodeNew: this.data.apartmentCodeNew
      });
      this.setContributors(this.data.contributors);
    }
  }

  setContributors(contributors: any[]) {
    const control = <FormArray>this.myform.get('contributors');
    contributors.forEach(contributor => {
      control.push(new FormGroup({
        name: new FormControl(contributor.name, Validators.required),
        amountInvested: new FormControl(contributor.amountInvested, Validators.required)
      }));
    });
  }

  onsubmit() {
    if (this.myform.invalid) {
      this.errormsg = true;
      this.ifSaved = false;
      console.log("Not Valid");
      setTimeout(() => {
        this.errormsg = false;
      }, 30000);
      return;
    }

    this.appService.apartmentsave(this.formGroupToJson(this.myform)).pipe(
      timeout(10000)
    ).subscribe({
      next: (response: any) => {
        console.log("Done");

        if (response && response.description === "Success") {
          this.ifSaved = true;
          this.errormsg = false;
          setTimeout(() => {
            this.ifSaved = false;
          }, 30000);
          this.myform.reset();
        }
      },
      error: (error) => {
        if (error instanceof TimeoutError || error.status === 0) {
          this.errormsg = true;
          this.errorStatus = 'timeout';
          setTimeout(() => {
            this.errormsg = false;
          }, 30000);
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
