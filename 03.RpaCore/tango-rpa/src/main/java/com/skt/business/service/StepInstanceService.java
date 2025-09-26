package com.skt.business.service;

import org.springframework.stereotype.Service;

import com.skt.business.mapper.StepInstanceMapper;
import com.skt.business.model.entity.StepInstance;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class StepInstanceService {

    private final StepInstanceMapper stepInstanceMapper;

    /**
     * STEP 실행 인스턴스 INSERT
     */
    public void insertStepInstance(StepInstance instance) {
        log.info("🟢 StepInstance INSERT 요청: stepId={}, actionInstanceId={}",
                 instance.getRpaStepId(), instance.getRpaActionInstanceId());
        stepInstanceMapper.insert(instance);
    }

    /**
     * STEP 실행 인스턴스 UPDATE
     */
    public void updateStepInstance(StepInstance instance) {
        log.info("🟡 StepInstance UPDATE 요청: id={}, status={}",
                 instance.getId(), instance.getStatus());
        stepInstanceMapper.updateStepInstance(instance);
    }
}