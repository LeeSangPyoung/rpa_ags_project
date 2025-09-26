package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaActionDto {
    private Integer id;
    private String name;
    private String description;
    private String cronExpression;
    private String nextRunTime;
    private String status;
    private Boolean repeatable;
    private String startDate;
    private String endDate;
    private String comments;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}