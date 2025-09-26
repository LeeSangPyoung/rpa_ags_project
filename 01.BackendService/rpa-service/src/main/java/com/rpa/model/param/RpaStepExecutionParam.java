package com.rpa.model.param;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepExecutionParam {
    private String keyword;
    private Integer id;
    private Integer rpaStepInstanceId;
    private Integer rpaStepId;
    private Integer rpaActionId;
    private Integer accountId;
    private String status;
    private String startTime;
    private String endTime;
    private String executionGroupId;
    private String resultLog;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
    private Integer limit;
    private Integer offset;
}