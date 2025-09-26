package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepInstanceDto {
    private Integer id;
    private Integer rpaStepId;
    private String rpaStepName;
    private String description;
    private Integer rpaActionInstanceId;
    private Integer rpaActionId;
    private String rpaActionName;
    private String status;
    private String startTime;
    private String endTime;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}