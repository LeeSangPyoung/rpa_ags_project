package com.rpa.model.request.history;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchStepExecutionRequest {
    private Integer id;
    private Integer rpaStepInstanceId;
    private Integer rpaStepId;
    private Integer rpaActionId;
    private Integer accountId;
    private String keyword;
    @Size(max = 50)
    private String status;
    @DateFormat
    private String startTime;
    @DateFormat
    private String endTime;
    @Size(max = 100)
    private String executionGroupId;
    private String  resultLog;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat
    private String chgRegDate;
    @NotNull
    private Integer limit;
    @NotNull
    private Integer page;

}