package com.skt.business.mapper;

import com.skt.business.model.entity.StepParamIn;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface StepParamInMapper {
    void insertStepParamIn(StepParamIn stepParamIn);
    List<StepParamIn> selectParamInByStepExecutionId(Long stepExecutionId);
}
