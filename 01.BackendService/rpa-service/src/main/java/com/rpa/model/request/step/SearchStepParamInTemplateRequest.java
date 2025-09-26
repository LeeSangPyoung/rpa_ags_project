package com.rpa.model.request.step;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchStepParamInTemplateRequest {
    private Integer id;
    private Integer stepId;
    private String stepName;
    @Size(max = 100)
    private String paramKey;
    private String paramValueTemplate;
    private Boolean isDynamic;
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