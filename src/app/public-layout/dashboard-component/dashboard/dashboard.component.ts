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

  barChart = new Chart(barChart);
  barChart2 = new Chart(barChart);
  barChart3 = new Chart(barChart);

  loading = true;

  constructor(
    private authService: AuthService,
    private shared: ToggleNavService
  ) {}

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      x: -40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    // this.initAnimations();
  }
}
