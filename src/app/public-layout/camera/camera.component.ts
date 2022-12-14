import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { BaseUrl } from 'src/environments/environment';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLDivElement>;
  @Output() photo = new EventEmitter<any>();
  videoElement: any = HTMLVideoElement;
  photoData: any;

  constructor(
    private router: Router,
    private service: ToggleNavService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.videoElement = this.video.nativeElement;

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: 'environment' },
      })
      .then((stream) => {
        this.videoElement.srcObject = stream;
      });

    this.collectData();
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
  }

  resetPhoto() {
    this.photoData = null;
  }

  register() {
    this.service.setMessage(this.photoData);
    this.router.navigate(['/signup']);
  }

  collectData() {
    this.httpService.getSingleNoAuth(BaseUrl.list_datas).subscribe(
      (data: any) => {
        this.service.setdataMessage(data);
      },
      (err) => {}
    );
  }
}
