import { Component } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {
  fileList: any[] = [];

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event: Event) {
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
}
