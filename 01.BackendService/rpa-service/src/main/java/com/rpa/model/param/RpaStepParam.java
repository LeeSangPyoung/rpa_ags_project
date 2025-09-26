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
public class RpaStepParam {
    private Integer id;
    private Integer rpaActionId;
    private Integer stepOrder;
    private String rpaType;
    private String scriptPath;
    private String scriptFile;
    private Integer accountGroupId;
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
    private Integer limit;
    private Integer offset;
}