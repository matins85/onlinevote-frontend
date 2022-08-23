import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

@Component({
  selector: 'app-camera2',
  templateUrl: './camera2.component.html',
  styleUrls: ['./camera2.component.css'],
})
export class Camera2Component implements OnInit {
  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLDivElement>;
  @Output() photo = new EventEmitter<any>();
  videoElement: any = HTMLVideoElement;
  photoData: any;

  constructor(private router: Router, private service: ToggleNavService) {}

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
    this.service.setMessage(this.photoData);
    this.router.navigate(['/cast-vote']);
  }
}
