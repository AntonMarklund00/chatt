import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {ChatMessageDto} from "../chatMessageDto";
import {WebSocketService} from "../web-socket.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  list: any;
  room: string = sessionStorage.getItem("room")
  @ViewChild("message") message: ElementRef;
  @Input() username: string;
  sesList:ChatMessageDto[] = this.messageService.msg;
  input;
  constructor(private http: HttpClient, public messageService: WebSocketService) {
    this.getAllchat(this.room);

  }
  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.username, this.input, this.room);
      this.input = '';
    }
  }
  ngOnInit(): void {
    this.messageService.initializeWebSocketConnection();

  }

  getAllchat(room){
    console.log(room)
    this.http.get('get/start?room=' + room.replace("/","")).subscribe(data => this.list = data);
  }


}
