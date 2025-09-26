package com.rpa.model.request.account;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchAccountRequest {
    private String keyword;
    private Integer accountGroupId;
    private Integer accountNo;
    @Size(max = 100)
    private String key;
    private String value;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat
    private String chgRegDate;
}