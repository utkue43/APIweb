import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message : string, options: Partial<AlertifyOptions>){
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers)
      msj.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }

}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;

}



export enum MessageType{
Message = "message",
Warning = "warning",
Error = "error",
Notify = "notify",
Success = "success"
}

export enum Position {
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right"
}