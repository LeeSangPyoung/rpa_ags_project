package com.rpa.model.request.accountgroup;

import com.rpa.common.Constant;
import com.rpa.validator.annotation.DateFormat;
import com.rpa.validator.group.Update;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaAccountGroupRequest {
    @NotNull(groups = Update.class)
    private Integer id;
    @Size(max = 255)
    private String groupName;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat(format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS)
    private String chgRegDate;
}