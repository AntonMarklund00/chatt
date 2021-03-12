import { Injectable } from '@angular/core';
import {ChatMessageDto} from "./chatMessageDto";

declare var SockJS;
declare var Stomp;
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  chatMessage: ChatMessageDto[] = [];

  constructor() {

  }
  public stompClient;
  public msg:ChatMessageDto[] = [];
  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe(sessionStorage.getItem("room"),message => {
        if (message.body) {
          that.msg.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(name:string, message:string, room:string) {
    const dto = new ChatMessageDto(null, name, message,null, room)
    this.stompClient.send("/app/send/message/", {}, JSON.stringify(dto));
  }


}
