package com.rpa.model.request.action;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualExecActionRequest {
    @NotNull
    private Integer actionId;
}