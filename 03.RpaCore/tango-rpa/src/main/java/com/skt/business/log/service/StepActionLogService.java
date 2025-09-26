package com.skt.business.log.service;

import org.springframework.stereotype.Service;
import com.skt.business.log.mapper.StepActionLogMapper;
import com.skt.business.log.entity.StepActionLog;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepActionLogService {

    private final StepActionLogMapper stepActionLogMapper;

    /**
     * STEP 실행 중일 때 로그 기록 (RUNNING) - INSERT 후 ID 반환
     */
    public Long insertRunningLog(Long stepActionLogId, String message) {
        return insertStepActionLog(stepActionLogId, "RUNNING", message);
    }

    /**
     * STEP 실행 성공했을 때 로그 삽입 (SUCCESS) - UPDATE
     */
    public void updateSuccessLog(Long stepActionId, String message) {
        updateStepActionLog(stepActionId, "SUCCESS", message);
    }

    /**
     * STEP 실행 실패했을 때 로그 삽입 (FAILURE) - UPDATE
     */
    public void updateFailureLog(Long stepActionLogId, String message) {
        updateStepActionLog(stepActionLogId, "FAILURE", message);
    }

    /**
     * STEP 실행 상태별로 INSERT 처리 후 생성된 ID 반환
     */
    private Long insertStepActionLog(Long stepActionId, String status, String message) {
        StepActionLog log = new StepActionLog();
        log.setStepActionId(stepActionId);
        log.setResultStatus(status);
        log.setLogMessage(message);
        log.setStartTime(java.time.LocalDateTime.now());

        stepActionLogMapper.insertStepActionLog(log);  // useGeneratedKeys="true" 필요
        return log.getId();  // 생성된 ID 리턴
    }

    /**
     * STEP 실행 상태별로 UPDATE 처리
     */
    private void updateStepActionLog(Long stepActionLogId, String status, String message) {
        StepActionLog log = new StepActionLog();
        log.setActionLogId(stepActionLogId);
        log.setResultStatus(status);
        log.setLogMessage(message);
        log.setEndTime(java.time.LocalDateTime.now());

        stepActionLogMapper.updateStepActionLog(log);
    }
}
