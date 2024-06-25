import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { timeout, TimeoutError } from "rxjs";
import { AppServices } from "src/app/app-services";

@Component({
  selector: 'app-addapartment',
  templateUrl: './addapartment.component.html',
  styleUrls: ['./addapartment.component.css']
})
export class AddAparmentComponent {
  errormsg = false;
  ifSaved = false;
  errorStatus: String | undefined;

  myform = new FormGroup({
    apartmentCode: new FormControl('', [Validators.required]),
    locationApartment: new FormControl('', [Validators.required]),
    purchaseApartment: new FormControl('', [Validators.required]),
    comments: new FormControl(''),
    contributors: new FormArray([])
  });

  constructor(private appService: AppServices, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { }

  get contributors(): FormArray {
    return this.myform.get('contributors') as FormArray;
  }

  addContributor() {
    const contributorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amountInvested: new FormControl('', [Validators.required])
    });
    this.contributors.push(contributorForm);
  }

  removeContributor(index: number) {
    this.contributors.removeAt(index);
  }

  onsubmit() {
    if (this.myform.invalid) {
      this.errormsg = true;
      this.ifSaved = false;
      console.log("Not Valid");
      setTimeout(() => {
        this.errormsg = false;
      }, 3000);
      return;
    }

    const formData = this.formGroupToJson(this.myform);

    this.appService.apartmentsave(formData).pipe(
      timeout(10000)
    ).subscribe({
      next: (response: any) => {
        console.log("Done");

        if (response && response.description === "Success") {
          this.ifSaved = true;
          this.errormsg = false;
          setTimeout(() => {
            this.ifSaved = false;
          }, 3000);
          this.myform.reset();
          while (this.contributors.length) {
            this.contributors.removeAt(0);
          }
        }
      },
      error: (error) => {
        if (error instanceof TimeoutError || error.status === 0) {
          this.errormsg = true;
          this.errorStatus = 'timeout';
          setTimeout(() => {
            this.errormsg = false;
          }, 3000);
        }
      }
    });
  }

  formGroupToJson(formGroup: FormGroup): any {
    const serialized = { ...formGroup.value };
    Object.keys(serialized).forEach(key => {
      if (serialized[key] instanceof FormGroup || serialized[key] instanceof FormArray) {
        serialized[key] = this.formGroupToJson(serialized[key]);
      }
    });
    return serialized;
  }
}
