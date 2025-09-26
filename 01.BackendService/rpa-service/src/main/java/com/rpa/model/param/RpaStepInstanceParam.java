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
public class RpaStepInstanceParam {
    private String keyword;
    private Integer id;
    private Integer rpaStepId;
    private Integer rpaActionInstanceId;
    private Integer rpaActionId;
    private String status;
    private String startTime;
    private String endTime;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
    private Integer limit;
    private Integer offset;
}