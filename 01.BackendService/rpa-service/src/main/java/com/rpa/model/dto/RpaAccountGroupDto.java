package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaAccountGroupDto {
    private String id;
    private String groupName;
    private Integer accountTotal;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}