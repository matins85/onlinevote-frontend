import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { register } from '../models/irm';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;

  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  feedbackForm: any = FormGroup;
  feedback!: register;
  edit = false;
  disabled = false;
  loading = false;

  department: any;
  position: any;
  position2: any;
  year: any;

  htmlYear = new Date().getFullYear();

  formData = new FormData();
  image: any;
  filename: any;

  formErrors: any = {
    email: '',
    name: '',
    matric: '',
    department: '',
  };

  validationMessages: any = {
    email: {
      required: 'required.',
      email: 'not a valid e-mail.',
    },
    name: {
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
    private service: ToggleNavService,
    private httpService: HttpService
  ) {
    this.createForm();
    if (this.service.getMessage() == undefined) {
      this.router.navigate(['/capture']);
    } else {
    }
    const data: any = this.service.getdataMessage();
    this.department = data.department;
    this.position2 = data.postion;
    this.year = data.years;
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
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
      this.snackBar.open('Errors in Form fields please check it out!', 'x', {
        duration: 5000,
        panelClass: 'error',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } // end of if
    else {
      this.disabled = true;
      this.loading = true;
      let image2: any = this.service.getMessage();
      const image3 = image2.split('data:image/jpeg;base64,')[1];
      const year = this.year.filter((name: any) => {
        if (Number(name.year) == this.htmlYear) {
          return name;
        }
      });
      const data: any = {
        name: this.feedback.name,
        department: this.feedback.department,
        position: this.feedback.position,
        matric: this.feedback.matric,
        email: this.feedback.email,
        profile: image3,
        year: year[0].id,
        aspirant: true,
      };
      if (this.feedback.position == '') {
        delete data.position;
        delete data.aspirant;
      }
      this.httpService.postData(BaseUrl.signup, data).subscribe(
        (data: any) => {
          this.disabled = false;
          this.loading = false;
          this.snackBar.open('Success', 'x', {
            duration: 3000,
            panelClass: 'success',
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/']);
        },
        (err) => {
          this.loading = false;
          this.disabled = false;
          this.snackBar.open(
            err.error.email || err.error.matric || 'Something went wrong',
            'x',
            {
              duration: 5000,
              panelClass: 'error',
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      );
    }
  }

  collectData() {
    this.httpService.getSingleNoAuth(BaseUrl.list_datas).subscribe(
      (data: any) => {
        this.department = data.department;
        this.position2 = data.postion;
        this.year = data.years;
        this.service.setdataMessage(data);
      },
      (err) => {}
    );
  }

  selectposition(id: number) {
    const data = this.position2.filter((name: any) => {
      if (name.id == id) {
        return name;
      }
    });
    this.position = data;
  }

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: -40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    this.initAnimations();
    this.collectData();
  }
}
