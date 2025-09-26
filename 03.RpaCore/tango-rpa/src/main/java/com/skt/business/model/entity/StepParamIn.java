package com.skt.business.model.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StepParamIn {
    private Long stepExecutionId;     // 실행 ID
    private String paramKey;           // 파라미터 키
    private String paramValue;        // 실제 값
    private String paramValueDefault;  // 기본값 (paramValue와 동일)
    private boolean isDynamic;         // false로 고정
    private LocalDateTime createdAt;   // 생성일시
}
