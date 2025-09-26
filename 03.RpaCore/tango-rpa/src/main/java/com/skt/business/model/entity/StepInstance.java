package com.skt.business.model.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StepInstance {

    private Long id;

    // FK to rpa_step
    private Long rpaStepId;

    // FK to rpa_action_instance
    private Long rpaActionInstanceId;

    private String status;             // READY / RUNNING / SUCCESS / FAIL
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String frstRegUserId;
    private LocalDateTime frstRegDate;
    private String chgRegUserId;
    private LocalDateTime chgRegDate;
}
