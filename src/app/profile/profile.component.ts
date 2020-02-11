import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import {AuthService} from '../auth.service';
import {PasswordValidation} from '../shared/validators';
import {UserModel} from '../../../backend/models/user.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

// Commented out code can be adjusted to just get 1 user
export class ProfileComponent implements OnInit {
  updateUserForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    // private alertService: AlertService
  ) {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // const currentUser = this.authService.currentUserValue;
    // this.currentUser = currentUser;
    // this.authService.getUserProfile(id).subscribe(res => {
    //   this.currentUser = res;
    // });
  }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/profile';
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateUserForm.controls; }

  updateUser() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.update(this.f.firstName.value, this.f.lastName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          window.alert('Successfully updated user!');
          window.location.reload();
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
