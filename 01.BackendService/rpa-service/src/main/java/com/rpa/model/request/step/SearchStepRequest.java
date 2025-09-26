package com.rpa.model.request.step;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchStepRequest {
    private Integer rpaActionId;
    private Integer stepOrder;
    private String rpaType;
    private String scriptPath;
    private String scriptFile;
    private String accountGroupId;
    private Boolean repeatPerAccount;
    private String targetFilePath;
    private String downloadPath;
    private Boolean parallelExecution;
    private String description;
    private String name;
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