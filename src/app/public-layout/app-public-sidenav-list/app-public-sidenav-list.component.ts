import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
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
  department: any;
  id = 0;

  constructor(
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService
  ) {
    this.department = this.service.getdataMessage2();
  }

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
    this.service.setSidenavData(data);
    this.service.sendClickEvent();
    this.router.navigate(['/'])
    this.onPublicHeaderToggleSidenav();
  }

  ngOnInit(): void {
    this.listDepartment();
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
    // this.shared.sendHeaderClickEvent();
    this.hide = true;
  };
}
