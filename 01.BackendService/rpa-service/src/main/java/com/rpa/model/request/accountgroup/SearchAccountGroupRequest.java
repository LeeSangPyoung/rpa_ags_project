package com.rpa.model.request.accountgroup;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchAccountGroupRequest {
    private String keyword;
    private String groupName;
    @Size(max = 50)
    private String frstRegUserId;
    @DateFormat
    private String frstRegDate;
    @Size(max = 50)
    private String chgRegUserId;
    @DateFormat
    private String chgRegDate;

}