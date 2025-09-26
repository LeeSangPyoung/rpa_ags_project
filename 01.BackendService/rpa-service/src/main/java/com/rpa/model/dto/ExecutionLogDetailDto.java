package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExecutionLogDetailDto {
    private Integer rpaStepExecutionId;
    private String resultLog;
    private List<RpaStepParamInDto> rpaStepParamInDtoList;
    private List<RpaStepParamOutDto> rpaStepParamOutDtoList;
}