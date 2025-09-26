package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStepDto {
    private Integer id;
    private Integer rpaActionId;
    private String rpaActionName;
    private Integer stepOrder;
    private String rpaType;
    private String scriptPath;
    private String scriptFile;
    private Integer accountGroupId;
    private String accountGroupName;
    private Boolean repeatPerAccount;
    private String targetFilePath;
    private String downloadPath;
    private Boolean parallelExecution;
    private String description;
    private String name;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}