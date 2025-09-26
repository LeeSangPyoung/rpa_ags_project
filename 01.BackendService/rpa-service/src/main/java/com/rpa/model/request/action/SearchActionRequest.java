package com.rpa.model.request.action;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchActionRequest {
    private String keyword;
    private String name;
    private String status;
    @DateFormat
    private String startDateFrom;
    @DateFormat
    private String startDateTo;
    @DateFormat
    private String endDateFrom;
    @DateFormat
    private String endDateTo;
    @Size(max = 50)
    private String frstRegUserId;
    private Boolean repeatable;
    @NotNull
	private Integer page;
    @NotNull
    private Integer limit;
}