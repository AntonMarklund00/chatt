package com.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;

import com.chat.dao.Chat;
import com.chat.service.ChatService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {


  @Autowired
  ChatService chatService;

  @MessageMapping("/send/message/")
  public void sendMessage(@Payload Chat message){
    chatService.post(message);
  }


  @GetMapping("get/start")
  @ResponseBody
  public java.util.List<Chat> getFiveLatestChat(@RequestParam(name="room") String room){
    return chatService.getFiveLatestChat(room);

  }

}
