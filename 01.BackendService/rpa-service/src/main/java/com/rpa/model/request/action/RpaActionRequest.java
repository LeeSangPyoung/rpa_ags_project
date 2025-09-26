package com.rpa.model.request.action;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.DateFormat;
import com.rpa.validator.group.Update;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaActionRequest {
    @NotNull(groups = Update.class)
    private Integer id;
    @Size(max = 255)
    private String name;
    private String description;
    @Size(max = 100)
    private String cronExpression;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String nextRunTime;
    @Size(max = 20)
    private String status;
    private Boolean repeatable;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String startDate;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String endDate;
    private String comments;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String chgRegDate;
}