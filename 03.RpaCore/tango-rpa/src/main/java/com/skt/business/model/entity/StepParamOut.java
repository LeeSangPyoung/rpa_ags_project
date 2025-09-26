package com.skt.business.model.entity;

import lombok.Data;
import java.time.LocalDateTime;
@Data
public class StepParamOut {
    private Long id;
    private Long stepExecutionId;
    private String paramKey;
    private String paramValue;
    private LocalDateTime createdAt;
}