package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaActionInstanceDto {
    private Integer id;
    private Integer rpaActionId;
    private String rpaActionName;
    private String description;
    private String status;
    private String startTime;
    private String endTime;
    private String triggeredBy;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}