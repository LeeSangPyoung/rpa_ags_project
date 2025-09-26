package com.skt.scheduler.model.entity;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class RpaScheduler {
    private Long id;  // 스케줄 ID
    private Long actionId;  // actionId (RPA 작업 ID)
    private String cronExpression;  // cron 표현식
    private LocalDateTime nextRunTime;  // 다음 실행 시간
    private String status;  // 상태
    private Boolean repeatable;  // 반복 여부
    private LocalDateTime startDate;  // 스케줄 시작일
    private LocalDateTime endDate;  // 스케줄 종료일
    private String comments;  // 추가적인 설명
    private String frstRegUserId;  // 최초 등록 사용자 ID
    private LocalDateTime frstRegDate;  // 최초 등록 날짜
    private String chgRegUserId;  // 최종 수정 사용자 ID
    private LocalDateTime chgRegDate;  // 최종 수정 날짜

}
