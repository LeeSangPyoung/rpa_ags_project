package com.skt.business.model.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActionInstance {

    private Long id;

    // FK to rpa_action
    private Long rpaActionId;

    private String status;         // READY / RUNNING / SUCCESS / FAIL
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String triggeredBy;    // 예: 'user', 'system', 'schedule'

    private String frstRegUserId;
    private LocalDateTime frstRegDate;
    private String chgRegUserId;
    private LocalDateTime chgRegDate;
}
