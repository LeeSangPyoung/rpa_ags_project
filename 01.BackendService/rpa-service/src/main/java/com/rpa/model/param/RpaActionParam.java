package com.rpa.model.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RpaActionParam {
    private Integer id;
    private String keyword;
    private String name;
    private String description;
    private String cronExpression;
    private String nextRunTime;
    private String status;
    private Boolean repeatable;
    private String startDate;
    private String startDateFrom;
    private String startDateTo;
    private String endDate;
    private String endDateFrom;
    private String endDateTo;
    private String comments;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
    private Integer limit;
    private Integer offset;
}