import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-app-private-sidenav-list',
  templateUrl: './app-private-sidenav-list.component.html',
  styleUrls: ['./app-private-sidenav-list.component.scss'],
})
export class AppPrivateSidenavListComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;

  @Output() PrivatesidenavClose = new EventEmitter();

  constructor() {}

  initAnimations(): void {
    if (this.card?.nativeElement) {
      gsap.from(this.card.nativeElement.children, {
        delay: 0.5,
        duration: 0.4,
        y: 40,
        opacity: 0,
        stagger: 0.15,
      });
    }
  }

  ngOnInit(): void {
    // this.initAnimations();
  }

  public onPrivateSidenavClose = () => {
    this.PrivatesidenavClose.emit();
  };
}
