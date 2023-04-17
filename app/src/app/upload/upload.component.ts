import {Component} from '@angular/core';
import * as CryptoJS from "crypto-js";
import {UploadService} from "./upload.service";
import {HttpEventType} from "@angular/common/http";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
  fileList: any[] = [];
  selectedFiles: any[] = [];
  uploadInProgress = false;
  progress = 0;
  mode: ProgressBarMode = "determinate"

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) { }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event: Event) {
    console.log(event);
    const target = <HTMLInputElement>event.target;
    this.prepareFilesList(target.files);
  }

  deleteFile(event: any, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.fileList.splice(index, 1);
  }

  async getHashFromStream(stream: ReadableStream){
    const sha256 = CryptoJS.algo.SHA256.create();
    const reader = stream.getReader();

    let {done, value} = await reader.read();
    let actualDone = done;
    let actualValue = value;
    while(!actualDone) {
      sha256.update(new TextDecoder("utf-8").decode(actualValue));
      let {done, value} = await reader.read();
      actualDone = done;
      actualValue = value;
    }

    return sha256.finalize().toString();
  }

  async prepareFilesList(files: FileList | null) {
    const selectedFiles = Array.from(<FileList>files)
    for (const item of selectedFiles) {
      const filestream = item.stream();
      const hash = await this.getHashFromStream(filestream);
      const existingHash = this.fileList.find(f => f.hash === hash);
      console.log(`Existing Hash: ${existingHash}`);

      if (!existingHash) {
        const file = {
          file: item,
          src: URL.createObjectURL(item),
          hash
        };
        this.fileList.push(file);
      } else {
        console.log("Duplicate file detected, skipping file");
      }
    }
  }

  async upload() {
    console.log("Upload:");
    console.log(this.fileList);
    this.uploadInProgress = true;
    this.uploadService.uploadFiles(this.fileList).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else {
            this.mode = "indeterminate";
          }
        } else if (event.type === HttpEventType.Response) {
          this.uploadInProgress = false;
          console.log(`Resetting fileList`);
          this.fileList = [];
          this.selectedFiles = [];
          this.progress = 0;
          this.mode = "determinate"
        }
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(error.message, "dismiss", {panelClass: ["blue-snackbar"]});
        this.uploadInProgress = false;
        this.progress = 0;
        this.mode = "determinate"
      }
    });
  }

  async test() {
    this.uploadService.test().subscribe({
      next: res => {
        console.log("Got response:");
        console.log(res);
      },
      error: res => {
        console.error("Got error:");
        console.error(res);
      }
    });
  }
}
