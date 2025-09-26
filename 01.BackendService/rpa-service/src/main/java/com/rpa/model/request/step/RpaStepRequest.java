package com.rpa.model.request.step;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.DateFormat;
import com.rpa.validator.group.Insert;
import com.rpa.validator.group.Update;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepRequest {
    @NotNull(groups = Update.class)
    private Integer id;
    @NotNull(groups = Insert.class)
    private Integer rpaActionId;
    private Integer stepOrder;
    @Size(max = 50)
    private String rpaType;
    @Size(max = 255)
    private String scriptPath;
    @Size(max = 255)
    private String scriptFile;
    private Integer accountGroupId;
    private Boolean repeatPerAccount;
    @Size(max = 512)
    private String targetFilePath;
    @Size(max = 512)
    private String downloadPath;
    private Boolean parallelExecution;
    @Size(max = 200)
    private String description;
    @Size(max = 100)
    private String name;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String chgRegDate;
}