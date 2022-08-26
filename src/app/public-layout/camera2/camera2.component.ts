import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-camera2',
  templateUrl: './camera2.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./camera2.component.scss'],
})
export class Camera2Component implements OnInit {
  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLDivElement>;
  @Output() photo = new EventEmitter<any>();
  videoElement: any = HTMLVideoElement;
  photoData: any;
  loading = false;
  data: any;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService
  ) {
    if (this.service.getUserData() == undefined) {
      this.router.navigate(['/vote']);
    } else {
      this.data = this.service.getUserData();
    }
  }

  ngOnInit() {
    this.videoElement = this.video.nativeElement;
    console.log(this.video);

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: 'environment' },
      })
      .then((stream) => {
        this.videoElement.srcObject = stream;
      });
  }

  takePhoto() {
    const canvasElement: any = this.canvas.nativeElement;
    const context = canvasElement.getContext('2d');
    canvasElement.width = this.videoElement.offsetWidth;
    canvasElement.height = this.videoElement.offsetHeight;

    context.drawImage(
      this.videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    this.photoData = canvasElement.toDataURL('image/jpeg', 1.0);
    // this.photo.emit(this.photoData);
    console.log(this.photoData);
  }

  resetPhoto() {
    this.photoData = null;
  }

  register() {
    this.loading = true;
    const data = {
      image1: `data:image/jpeg;base64,${this.data.data.profile}`,
      image2: this.photoData,
    };
    this.httpService.postData(BaseUrl.recognise, data).subscribe(
      (data: any) => {
        this.service.setUserData({ data: this.data.data, verified: true });
        this.router.navigate(['/cast-vote']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.snackBar.open('Face do not match', 'x', {
          duration: 5000,
          panelClass: 'error',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }
}
