package com.rpa.model.request.step;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.DateFormat;
import com.rpa.validator.group.Insert;
import com.rpa.validator.group.Update;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepParamInTemplateRequest {
    @NotEmpty(groups = Update.class)
    private Integer id;
    @NotEmpty(groups = Insert.class)
    private Integer stepId;
    private String stepName;
    @Size(max = 100)
    private String paramKey;
    private String paramValueTemplate;
    private Boolean isDynamic;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String chgRegDate;
    @NotNull
    private Integer limit;
    @NotNull
    private Integer page;
}
