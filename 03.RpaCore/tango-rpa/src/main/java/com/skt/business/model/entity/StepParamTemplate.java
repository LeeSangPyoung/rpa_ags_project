package com.skt.business.model.entity;

import lombok.Data;

@Data
public class StepParamTemplate {
    private Long stepId;   // rpa_step_param.step_action_id (FK)
    private Integer id;          // 파라미터 순번 (step 내에서 1부터 증가)
    private String paramKey;     // {paramKey}
    private String paramValueTemplate;   // 실제 값
    private boolean isDynamic;
}
