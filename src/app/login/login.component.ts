import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  isShowPassword = false;
  errormsg = false;
  validateAllForm = false;
  isDisabled = false;
  lang: any;
  language: any;

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: AuthService) {
    // Initialize the form here to avoid undefined errors
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // Getter for form controls to make access easier in the template
  get formControls() { return this.loginForm.controls; }

  togglePasswordVisibility() {
    this.isShowPassword = !this.isShowPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.validateAllForm = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.isDisabled = true;

    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.router.navigate(['home']);
        this.isDisabled = false; 

      },
      error => {
        console.error('Login failed', error);
        this.errormsg = true;
        this.isDisabled = false;
      }
    );
  }
}
