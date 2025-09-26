package com.rpa.model.request.admin;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResetPwBulkRequest {
    @NotEmpty
    @Valid
    List<ResetPwRequest> userList;
}
