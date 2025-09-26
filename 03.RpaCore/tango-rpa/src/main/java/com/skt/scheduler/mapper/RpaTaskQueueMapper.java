package com.skt.scheduler.mapper;

import com.skt.scheduler.model.entity.RpaTaskQueue;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface RpaTaskQueueMapper {

    // 실행 큐에 추가
    void insertTaskQueue(RpaTaskQueue task);

    // 같은 scheduled_time이 존재하는지 확인
    boolean existsTask(@Param("actionId") Long actionId,
                       @Param("scheduledTime") LocalDateTime scheduledTime);

    // 실행 대상 조회 (현재 시간 기준, 가장 최신 1건씩)
    List<RpaTaskQueue> getLatestReadyTasks(@Param("now") LocalDateTime now);

    // 실행 성공 처리
    void updateStatusSuccess(RpaTaskQueue task);

    // 실행 실패 처리
    void updateStatusFailed(RpaTaskQueue task);
    
    void updateStatusRunning(@Param("id") Long id);
    
    void updateStatusEnactive(@Param("id") Long id);
    
    

    // 이전 READY 작업 SKIPPED 처리
    void skipPreviousTasks(@Param("actionId") Long actionId,
                           @Param("currentExecutionTime") LocalDateTime currentExecutionTime);
}
