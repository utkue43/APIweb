import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry} from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

    constructor(private httpClientService : HttpClientService,
     private customToastrService: CustomToastrService,
     private alertifyService: AlertifyService
    ){}

  public files: NgxFileDropEntry[];
  
  @Input() options : Partial<FileUploadOptions>


  

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData : FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file : File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })
    }
    const message: string = "dosyalar başarıyla yüklenmiştir"
    
    this.httpClientService.post({
      fullEndPoint : this.options.fullEndPoint,
      queryString : this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})
    }, fileData).subscribe(data => {
      if(this.options.isAdminPage){
        this.alertifyService.message(message,{
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      }else{
        this.customToastrService.message(message, "Başarılı",{
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.BottomLeft,
          
        })
      }

    }, (errorRespone: HttpErrorResponse) => {
      const message2: string = "başarısız"
      if(this.options.isAdminPage){
        this.alertifyService.message(message2,{
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })

      }else{
        this.customToastrService.message(message2, "başarısız", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomLeft
        })

      }


    });
 }

}

export class FileUploadOptions{
  fullEndPoint?: string;
  queryString?: string;
  explantion?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}


