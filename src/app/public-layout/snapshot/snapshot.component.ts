import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./snapshot.component.scss'],
})
export class SnapshotComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('photo') photo: any;
  constructor() {}

  ngOnInit() {}
}
