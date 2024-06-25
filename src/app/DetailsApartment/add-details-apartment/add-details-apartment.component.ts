import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError, timeout } from 'rxjs';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-add-details-apartment',
  templateUrl: './add-details-apartment.component.html',
  styleUrls: ['./add-details-apartment.component.css']
})
export class AddDetailsApartmentComponent {
  navigateParams: any;
  lookupType: string[] = [];
  apartmentCode: string = '';
  errormsg = false;
  ifSaved = false;
  isDisabled = false;
  errorStatus: String | undefined;

  myform = new FormGroup({
    apartmentCode: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    lookupType: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
    establishing: new FormControl(false),
    finishing: new FormControl(true)
  });

  constructor(private appService: AppServices, private router: Router, private toastr: ToastrService, private route: ActivatedRoute,) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state != undefined)
      this.navigateParams = navigation.extras.state;
  }

  ngOnInit() {
    if (this.navigateParams && this.navigateParams.apartmentCode) {
      this.apartmentCode = this.navigateParams.apartmentCode;
      this.myform.get('apartmentCode')?.setValue(this.apartmentCode);
      this.getAllTayp();
    }
  }

  getAllTayp() {
    this.appService.findAllActiveName().subscribe(
      (responseData: string[]) => {
        this.lookupType = responseData;
      },
      (error: any) => {
        console.error('Error fetching types data:', error);
      }
    );
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

    this.appService.ADDDetailsApartment(this.formGroupToJson(this.myform)).pipe(
      timeout(10000)
    ).subscribe({
      next: (response: any) => {
        if (response && response.description === "Success") {
          this.ifSaved = true;
          this.errormsg = false;
          setTimeout(() => {
            this.ifSaved = false;
          }, 10000);
          this.myform.reset();
          this.router.navigate(['/AparmentSearch'])
        }
      },
      error: (error) => {
        if (error instanceof TimeoutError || error.status === 0) {
          this.errormsg = true;
          this.errorStatus = 'timeout';
          this.isDisabled = false;
        }
      }
    });
  }
  formGroupToJson(formGroup: FormGroup): any {
    const serialized = { ...formGroup.value };
    Object.keys(serialized).forEach(key => {
      if (serialized[key] instanceof FormGroup) {
        serialized[key] = this.formGroupToJson(serialized[key]);
      } else {
        serialized[key] = serialized[key].toString();
      }
    });
    return serialized;
  }

  onRadioChange(selectedOption: string) {
    if (selectedOption === 'finishing') {
      this.myform.get('finishing')?.setValue(true);
      this.myform.get('establishing')?.setValue(false);
    } else if (selectedOption === 'establishing') {
      this.myform.get('establishing')?.setValue(true);
      this.myform.get('finishing')?.setValue(false);
    }
  }
}
