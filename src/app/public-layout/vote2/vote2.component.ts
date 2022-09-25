import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-vote2',
  templateUrl: './vote2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vote2.component.scss'],
})
export class Vote2Component implements OnInit {
  // @ViewChild('card', { static: true })
  // card!: ElementRef<HTMLDivElement>;

  loading = false;
  data: any;
  department: any;
  sug: any;
  addedChoice: number[] = [];

  htmlYear = new Date().getFullYear();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) {
    if (this.service.getUserData() == undefined) {
      this.router.navigate(['/vote']);
    } else {
      const data: any = this.service.getUserData();
      if (data.verified == true) {
        this.data = data.data;
      } else {
        this.router.navigate(['/vote']);
      }
    }
    let depart: any = this.service.getdataMessage2();
    // department
    const departm = depart.filter((name: any) => {
      if (
        name.department.id == this.data.department.id &&
        name.year.year == this.htmlYear
      ) {
        return name;
      }
    });
    // sug
    const sugg = depart.filter((name: any) => {
      if (
        name.department.department.toLowerCase() == 'sug' &&
        name.year.year == this.htmlYear
      ) {
        return name;
      }
    });
    this.sug = sugg[0];
    this.department = departm[0];
  }

  // initAnimations(): void {
  //   gsap.from(this.card.nativeElement.children, {
  //     delay: 0.5,
  //     duration: 0.4,
  //     y: -40,
  //     opacity: 0,
  //     stagger: 0.15,
  //   });
  // }

  displayImage(image: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/png;base64,' + image
    );
  }

  listDepartment() {
    this.httpService.getSingleNoAuth(BaseUrl.list_department).subscribe(
      (data: any) => {
        const data2 = data.filter((name: any) => {
          if (
            name.department.id == this.data.department.id &&
            name.year.year == this.htmlYear &&
            name.department.department.toLowerCase() != 'sug'
          ) {
            return name;
          }
        });
        const data3 = data.filter((name: any) => {
          if (
            name.department.department.toLowerCase() == 'sug' &&
            name.year.year == this.htmlYear
          ) {
            return name;
          }
        });
        this.department = data2[0];
        this.sug = data3[0];
        this.service.setdataMessage2(data);
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    // this.initAnimations();
    this.listDepartment();
  }

  add(id: number) {
    let check = this.addedChoice.indexOf(id);
    if (check > -1) {
    } else {
      this.addedChoice.push(id);
    }
  }

  vote() {
    this.loading = true;
    const data = {
      year: this.data.year.id,
      department: this.data.department.id,
      choice: this.addedChoice,
      created_by: this.data.id,
    };
    this.httpService.postData(BaseUrl.vote, data).subscribe(
      (data: any) => {
        this.loading = false;
        this.snackBar.open('Success', 'x', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/']);
        this.service.setdataMessage2(undefined);
      },
      (err) => {
        this.loading = false;
        this.snackBar.open(err.error.detail || 'Something went wrong', 'x', {
          duration: 5000,
          panelClass: 'error',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}
