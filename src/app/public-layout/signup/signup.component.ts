import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { register } from '../models/irm';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: register;
  edit = false;
  disabled = false;
  loading = false;

  formData = new FormData();
  image: any;
  filename: any;

  formErrors: any = {
    email: '',
    name: '',
    year: '',
    matric: '',
    department: '',
  };

  validationMessages: any = {
    email: {
      required: 'required.',
    },
    name: {
      required: 'required.',
    },
    year: {
      required: 'required.',
    },
    matric: {
      required: 'required.',
    },
    department: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private router: Router,
    private service: ToggleNavService
  ) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      year: ['', [Validators.required]],
      matric: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: [''],
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.formData = formData;
      this.filename = file.name;
      this.image = URL.createObjectURL(event.target.files[0]);
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.onValueChanged();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
      this.snackBar.open('Errors in Form fields please check it out!', '', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.disabled = true;
      this.loading = true;
      console.log(this.feedback);
      console.log(this.formData);
      this.disabled = false;
      this.loading = false;
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {}

}
