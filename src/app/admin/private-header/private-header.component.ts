import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./private-header.component.scss'],
})
export class PrivateHeaderComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Output() public PrivatesidenavToggle = new EventEmitter();

  @Output() public PrivateHeadersidenavToggle = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {}

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

  public onPrivateToggleSidenav = () => {
    this.PrivatesidenavToggle.emit();
  };

  public onPrivateHeaderToggleSidenav = () => {
    this.PrivateHeadersidenavToggle.emit();
  };
}
