import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFrom: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private alert: AlertService) { }

  ngOnInit() {
    this.registerFrom = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerFrom.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerFrom.invalid) {
      return;
    }

    this.loading = true;

    console.log(`in register submit`);

    this.userService.register(this.registerFrom.value)
      .pipe(first())
      .subscribe(
        (user) => {
          console.log(`register successful`);
          this.router.navigate(['/login']);
        },
        (error) => {
          this.alert.error(error);
          this.loading = false;
        }
      );
  }

}
