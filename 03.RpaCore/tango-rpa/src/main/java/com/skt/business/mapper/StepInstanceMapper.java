package com.skt.business.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.skt.business.model.entity.StepInstance;

@Mapper
public interface StepInstanceMapper {
    void insert(StepInstance instance);
    void updateStepInstance(StepInstance instance);
}
