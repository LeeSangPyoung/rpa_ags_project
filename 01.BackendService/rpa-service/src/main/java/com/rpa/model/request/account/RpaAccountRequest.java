package com.rpa.model.request.account;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaAccountRequest {
    @NotNull
    private Integer accountGroupId;
    @NotNull
    private Integer accountNo;
    @NotEmpty
    @Size(max = 100)
    private String accountKey;
    private String value;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String chgRegDate;
}