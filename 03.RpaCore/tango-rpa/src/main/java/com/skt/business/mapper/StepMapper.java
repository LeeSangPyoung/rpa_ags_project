package com.skt.business.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.skt.business.model.entity.Step;

@Mapper
public interface StepMapper {
    List<Step> selectStepsByActionId(@Param("rpaActionId") Long rpaActionId);
}
