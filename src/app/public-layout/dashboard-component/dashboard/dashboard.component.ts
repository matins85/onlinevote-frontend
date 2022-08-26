import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthService } from 'src/app/services/auth.service';
import { ToggleNavService } from '../../sharedService/toggle-nav.service';
import { Chart } from 'angular-highcharts';
import { barChart } from '../../../_helpers/barChart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @ViewChild('card2', { static: true })
  card2!: ElementRef<HTMLDivElement>;

  id = 0;
  department: any;
  year: any;
  currentData: any;

  barChart = new Chart(barChart);
  htmlYear = new Date().getFullYear();
  loading = true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService
  ) {
    this.department = this.service.getdataMessage2();
    const data: any = this.service.getdataMessage();
    this.year = data?.years;
  }

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: -40,
      opacity: 0,
      stagger: 0.15,
    });
    gsap.from(this.card2.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      x: -40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  collectData() {
    this.httpService.getSingleNoAuth(BaseUrl.list_datas).subscribe(
      (data: any) => {
        console.log(data);
        this.year = data.years;
        this.service.setdataMessage(data);
      },
      (err) => {}
    );
  }

  listDepartment() {
    this.httpService.getSingleNoAuth(BaseUrl.list_department).subscribe(
      (data: any) => {
        console.log(data);
        this.department = data;
        this.service.setdataMessage2(data);
      },
      (err) => {}
    );
  }

  changeId(data: any) {
    this.id = data.id;
    this.currentData = data;
    console.log(data);
  }

  ngOnInit(): void {
    this.initAnimations();
    this.listDepartment();
    this.collectData();
  }
}
