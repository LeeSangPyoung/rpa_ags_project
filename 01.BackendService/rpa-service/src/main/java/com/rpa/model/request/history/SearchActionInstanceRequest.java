package com.rpa.model.request.history;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchActionInstanceRequest {
    private Integer id;
    private Integer rpaActionId;
    private String keyword;
    @Size(max = 50)
    private String status;
    @DateFormat
    private String startTime;
    @DateFormat
    private String endTime;
    @Size(max = 50)
    private String triggeredBy;
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