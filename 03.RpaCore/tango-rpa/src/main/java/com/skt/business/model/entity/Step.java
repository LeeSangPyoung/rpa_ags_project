package com.skt.business.model.entity;

import lombok.Data;
import java.util.List;

@Data
public class Step {

    private Long stepId;
    private Long rpaActionId;
    private Integer stepOrder;
    private String rpaType;
    private String scriptPath;
    private String scriptFile;
    private Long accountGroupId;
    private Boolean repeatPerAccount;

    // DB 컬럼: target_file_path
    private String targetFilePath;

    // 파라미터 템플릿 리스트
    private List<StepParamTemplate> params;

    // 치환된 스크립트 경로
    private String resolvedScriptPath;

    // 계정별 결과
    private List<AccountScriptRslt> resolvedRslt;

    // 병렬 실행 여부
    private Boolean parallelExecution;
}
