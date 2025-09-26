package com.skt.business.model.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Action {

    private Long id;

    private String name;
    private String description;

    private String frstRegUserId;
    private LocalDateTime frstRegDate;
    private String chgRegUserId;
    private LocalDateTime chgRegDate;
    

    private Long actionId;  // actionId (RPA 작업 ID)
    private String cronExpression;  // cron 표현식
    private LocalDateTime nextRunTime;  // 다음 실행 시간
    private String status;  // 상태
    private Boolean repeatable;  // 반복 여부
    private LocalDateTime startDate;  // 스케줄 시작일
    private LocalDateTime endDate;  // 스케줄 종료일
    private String comments;  // 추가적인 설명

}
