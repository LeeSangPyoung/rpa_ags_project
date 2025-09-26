package com.skt.business.model.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StepExecution {

    private Long id;

    // FK to rpa_step_instance
    private Long rpaStepInstanceId;

    private int accountId;
    private String status;               // READY / RUNNING / SUCCESS / FAIL
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String executionGroupId;

    private String frstRegUserId;
    private LocalDateTime frstRegDate;
    private String chgRegUserId;
    private LocalDateTime chgRegDate;
    
    private String resultLog;
}
