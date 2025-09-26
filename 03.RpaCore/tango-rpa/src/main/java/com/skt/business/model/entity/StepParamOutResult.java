package com.skt.business.model.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StepParamOutResult {
    private Long stepExecutionId;
    private Long accountId;
    private String loginId;
    private String paramKey;
    private String paramValue;
}
