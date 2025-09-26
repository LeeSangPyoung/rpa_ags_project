package com.skt.scheduler.mapper;

import com.skt.scheduler.model.entity.RpaScheduler;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import com.skt.business.model.entity.Action;

@Mapper
public interface RpaSchedulerMapper {

    // 활성화된 스케줄 목록 가져오기
    List<Action> getActiveSchedules();

    // next_run_time 갱신
    void updateNextRunTime(Action action);
}