import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote2',
  templateUrl: './vote2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./vote2.component.scss'],
})
export class Vote2Component implements OnInit {
  loading = false;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  add() {}

  vote() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.snackBar.open('Success', 'x', {
        duration: 5000,
        panelClass: 'success',
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/'])
    }, 3000);
  }
}
