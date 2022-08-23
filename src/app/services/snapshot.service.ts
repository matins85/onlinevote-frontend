import { Injectable } from '@angular/core';
import { IdentificationService } from './identification.service';

@Injectable()
export class SnapshotsService {
  snapshots: Snapshot[] = [];

  constructor(private identificationService: IdentificationService) {
    // this.snapshots = JSON.parse(sessionStorage.getItem('snapshots')) || [];
    let snapshot: any = sessionStorage.getItem('snapshots') || [];
    this.snapshots = snapshot;
  }

  save(imgDataUrl: string) {
    return this.identificationService.getObjects(imgDataUrl).then((objs) => {
      this.snapshots.push({
        id: this.snapshots.length,
        imgDataUrl: imgDataUrl,
        objects: objs,
        items: [],
      });
      sessionStorage.setItem('snapshots', JSON.stringify(this.snapshots));
    });
  }

  getSnapshot(id: number) {
    return this.snapshots.find((s) => s.id === id);
  }

  update() {
    sessionStorage.setItem('snapshots', JSON.stringify(this.snapshots));
  }

  addItemToSnapshot(id: number, item: Item) {
    let snapshot: any = this.snapshots.find((s: any) => s.id == id);
    snapshot.items.push(item);
    this.update();
  }
}

export interface Snapshot {
  id: number;
  imgDataUrl: string;
  objects: string[];
  items: Item[];
}

export interface Item {
  id: number;
  imgDataUrl: string;
  name: string;
  description: string;
  value: number;
  purchaseDate: Date;
  serialNumber: string;
}
