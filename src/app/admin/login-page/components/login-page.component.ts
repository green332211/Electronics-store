import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    })
  }

  public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true,
    };

    this.auth.login(user)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.loginForm.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submitted = false;
        },
        error: () => {this.submitted = false},
      });
  }
}
