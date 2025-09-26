package com.rpa.controllers;

import com.rpa.model.websocket.RpaActionChangeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void sendActionChange(RpaActionChangeMessage message) {
        simpMessagingTemplate.convertAndSend("/topic/action-change", message);
    }
}
