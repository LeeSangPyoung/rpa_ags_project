package com.rpa.model.request.admin;

import com.rpa.validator.annotation.DateFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchUserRequest {
    private String keyword;
    private Integer roleId;
    private List<Integer> statusIdList;
    @DateFormat
    private String createdAt;
    @DateFormat
    private String approveDate;
    @NotNull
    private Integer page;
    @NotNull
    private Integer limit;
}
