package com.rpa.services.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rpa.common.CommonMessage;
import com.rpa.controllers.WebSocketController;
import com.rpa.exception.RpaException;
import com.rpa.model.websocket.RpaActionChangeMessage;
import jakarta.annotation.PostConstruct;
import org.postgresql.PGConnection;
import org.postgresql.PGNotification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@Service
public class RpaActionChangeListener {
    @Value("${websocket.rpa-action-change-trigger:rpa_action_tbl_changes}")
    private String triggerName;

    @Autowired
    WebSocketController webSocketController;

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void listenForChanges() {
        new Thread(() -> {
            try (Connection conn = dataSource.getConnection()) {
                PGConnection pgConn = conn.unwrap(PGConnection.class);
                try (Statement stmt = conn.createStatement()) {
                    stmt.execute("LISTEN " + triggerName);
                }
                while (true) {
                    PGNotification[] notifications = pgConn.getNotifications();
                    if (notifications != null) {
                        for (org.postgresql.PGNotification notification : notifications) {
                            String payload = notification.getParameter();
                            ObjectMapper mapper = new ObjectMapper();
                            RpaActionChangeMessage message = mapper.readValue(payload, RpaActionChangeMessage.class);
                            webSocketController.sendActionChange(message);
                        }
                    }
                    Thread.sleep(1000);
                }
            } catch (Exception e) {
                throw new RpaException(CommonMessage.E000.getMessageId());
            }
        }).start();
    }
}
