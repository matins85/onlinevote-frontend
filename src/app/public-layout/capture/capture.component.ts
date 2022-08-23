import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnapshotsService } from 'src/app/services/snapshot.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
})
export class CaptureComponent implements OnInit {
  snapshots: any;
  addNew = false;
  constructor(
    public snapshotsService: SnapshotsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.snapshots = this.snapshotsService.snapshots;
  }

  photoTaken(photo: any) {
    this.snapshotsService.save(photo).then(() => {
      this.router.navigate(['/snapshot', this.snapshots.length - 1]);
    });
  }

  goToSnapshot(snapshot: any) {
    this.router.navigate(['/snapshot', snapshot.id]);
  }
}