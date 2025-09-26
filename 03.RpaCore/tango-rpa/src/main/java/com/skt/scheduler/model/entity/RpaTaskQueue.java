package com.skt.scheduler.model.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RpaTaskQueue {

    private Long id;                      // 실행 태스크 ID
    private Long actionId;               // 실행할 RPA 작업 ID
    private LocalDateTime scheduledTime; // 이 작업이 실제로 실행되어야 하는 시간
    private String status;               // 상태: READY, RUNNING, SUCCESS, FAILED, SKIPPED
    private String result;               // 실행 결과 메시지 (성공/실패 로그 등)
    private LocalDateTime startedAt;     // 실행 시작 시간
    private LocalDateTime finishedAt;    // 실행 완료 시간
    private LocalDateTime frstRegDate;   // 최초 등록일시
    private LocalDateTime lastChgDate;   // 최종 수정일시
    private String actionStatus; //action 테이블의 상태(ACTIVE / ENACTIVE)
}
