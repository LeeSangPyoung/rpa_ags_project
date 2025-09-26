package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaAccountDto {
    private Integer accountGroupId;
    private String groupName;
    private Integer accountNo;
    private String accountKey;
    private String value;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}
