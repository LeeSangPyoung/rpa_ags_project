package com.rpa.model.param;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaAccountParam {
    private Integer accountGroupId;
    private Integer accountNo;
    private String accountKey;
    private String keyword;
    private String value;
    private String frstRegUserId;
    private String frstRegDate;
    private String chgRegUserId;
    private String chgRegDate;
}
