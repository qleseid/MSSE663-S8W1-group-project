import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService // private alertService: AlertService
  ) {
    if (this.authService.isLoggedIn()) {
      window.alert("Already Logged in!");
      this.router.navigate(["/profile"]);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/profile";
  }

  login(loginForm: FormGroup) {
    this.submitted = true;
    if (loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(loginForm.get("username").value, loginForm.get("password").value)
      .pipe(first())
      .subscribe(
        data => {
          window.alert("Successfully Logged in!");
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
