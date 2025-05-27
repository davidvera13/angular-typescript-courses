import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import {AuthStore} from '../services/auth.store';
import {User} from "../model/user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private auth: AuthStore) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;
    this.auth.login(val.email, val.password)
      .subscribe({
        next: (user: User) => {
          console.log("user successfully logged in: ", user);
          this.router.navigateByUrl('/courses').then();
        },
        error: error => {
          alert("Login failed!");
        },
        complete: () => {}
      });
  }

}
