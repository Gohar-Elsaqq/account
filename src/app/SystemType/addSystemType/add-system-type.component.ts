import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TimeoutError, timeout } from 'rxjs';
import { AppServices } from 'src/app/app-services';

@Component({
  selector: 'app-add-system-type',
  templateUrl: 'add-system-type.component.html',
  styleUrls: ['./add-system-type.component.css']
})
export class AddSystemTypeComponent {
   errormsg = false;
   ifSaved = false;
  errorStatus: String | undefined;
  validateAllForm = false;
  isDisabled = false;
  lang: any;
  isFirstTimeLogin: boolean | undefined;
  language: any;
  translations: any[] | undefined;
  isShowPassword = false;
  myform = new FormGroup({
    lookupType: new FormControl('', [Validators.required]),
  });
  showToastr: any;
  constructor(private appService: AppServices, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

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

    this.appService.systemtypesave(this.formGroupToJson(this.myform)).pipe(
      timeout(10000)
    ).subscribe({
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
      }
    });
    return serialized;
  }
}
