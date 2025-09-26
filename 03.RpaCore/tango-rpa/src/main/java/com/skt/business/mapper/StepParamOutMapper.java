package com.skt.business.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.skt.business.model.entity.Step;
import com.skt.business.model.entity.StepParamOut;
import com.skt.business.model.entity.StepParamOutResult;

@Mapper
public interface StepParamOutMapper {
    int insertStepParamOut(StepParamOut param);
    List<StepParamOutResult> selectParamOutByPrevStep(@Param("stepInstanceId") Long prevStepInstanceId);
}