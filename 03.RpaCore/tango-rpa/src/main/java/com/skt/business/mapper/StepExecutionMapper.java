package com.skt.business.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.skt.business.model.entity.StepExecution;

@Mapper
public interface StepExecutionMapper {
    int insertStepExecution(StepExecution execution);
    void updateStepExecution(StepExecution execution);
}