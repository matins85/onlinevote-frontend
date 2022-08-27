import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { login_vote } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  feedbackForm: any = FormGroup;
  feedback!: login_vote;
  next = false;
  disabled = false;
  loading = false;

  formData = new FormData();
  image: any;
  filename: any;

  formErrors: any = {
    mat_no: '',
  };

  validationMessages: any = {
    mat_no: {
      required: 'required.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService
  ) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      mat_no: ['', [Validators.required]],
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
      this.snackBar.open('Errors in Form fields please check it out!', 'x', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.loading = true;
      this.disabled = true;
      this.httpService
        .postData(BaseUrl.login_vote, { matric: this.feedback.mat_no })
        .subscribe(
          (data: any) => {
            this.disabled = false;
            this.loading = false;
            this.next = true;
            this.service.setUserData({ data: data, verified: false });
          },
          (err) => {
            this.loading = false;
            this.disabled = false;
            this.snackBar.open('Invalid Matric number', 'x', {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    }
  }

  listDepartment() {
    this.httpService.getSingleNoAuth(BaseUrl.list_department).subscribe(
      (data: any) => {
        this.service.setdataMessage2(data);
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.listDepartment();
  }
}
