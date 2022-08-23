import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-app-public-sidenav-list',
  templateUrl: './app-public-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav-list.component.scss'],
})

export class AppPublicSidenavListComponent implements OnInit {
  @Output() public publicsidenavClose = new EventEmitter();

  clickEventSubscription?: Subscription;
  hide = false;
  panelOpenState = false;
  menu_text = 'usd';

  constructor(private router: Router, public shared: ToggleNavService
  ) {}


  limit(title: any, limit = 11) {
    if (title === undefined) {
      return '';
    } else {
      const newTitle: any = [];
      if (title.length > limit) {
        title.split('').reduce((acc: any, cur: any) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join('')}...`;
      }
      return title;
    }
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['']);
  }

  ChangeMenuText(type: string) {
    this.menu_text = type;
  }

  ngOnInit(): void {
    // this.AddProfile();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    // this.shared.sendHeaderClickEvent();
    this.hide = true;
  };
}
