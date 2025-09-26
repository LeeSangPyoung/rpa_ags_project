package com.skt.core.model;

import java.util.List;

import com.skt.business.model.entity.StepParamOutResult;

import lombok.Data;

@Data
public class RpaRequest {
    private String type;           // "robot" or "tagui"
    private String filename;       // 파일명
    private String scriptDir;      // 실행 경로
    private List<String> args;     // 추가 인자
    private int count = 1;         // 병렬 실행 시 반복 수

    private Long stepActionId;     // ✅ 로그 처리를 위한 StepAction ID
    private Long stepActionLogId;
    private Long stepExecutionId;
    private int accountId;
    private Long rpaStepInstanceId;
    private List<StepParamOutResult> stepParamOutResults;
}
 