package com.skt.core.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skt.business.model.entity.StepExecution;
import com.skt.core.executor.RpaExecutor;
import com.skt.core.executor.model.dto.RpaExecutionResult;
import com.skt.core.model.RpaRequest;
import com.skt.business.mapper.StepExecutionMapper;

@Service
public class RpaService {

    private final Logger log = LoggerFactory.getLogger(RpaService.class);
    private final Map<String, RpaExecutor> executors;
    @Autowired
    private StepExecutionMapper stepExecutionMapper;

    public RpaService(List<RpaExecutor> executorList) {
        this.executors = executorList.stream()
                .collect(Collectors.toMap(RpaExecutor::getType, e -> e));
    }

    /**
     * 실행 요청 (단일 또는 병렬)
     */
    public RpaExecutionResult run(RpaRequest request) {
        log.info("🧠 실행 분기 처리 - type: {}, filename: {}, scriptDir: {}, count: {}",
                request.getType(), request.getFilename(), request.getScriptDir(), request.getCount());

        // int count = Math.max(request.getCount(), 1);
        RpaExecutor executor = executors.get(request.getType());

        if (executor == null) {
            log.error("❌ 지원하지 않는 RPA 타입: {}", request.getType());
            throw new IllegalArgumentException("지원하지 않는 RPA 타입입니다: " + request.getType());
        }
        
        log.info("22222222222222 request : {}", request.toString());
        // 1. StepExecution 등록
        StepExecution execution = new StepExecution();
        String groupId = "G" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

        execution.setRpaStepInstanceId(request.getRpaStepInstanceId());
        // execution.setStepActionId(request.getStepActionId());
        execution.setAccountId(request.getAccountId());  // 계정 단위 실행이면 필요
        execution.setStatus("READY");
        execution.setExecutionGroupId(groupId);
        
        log.info("execution : {}", execution.toString());
        stepExecutionMapper.insertStepExecution(execution);  // ✅ Mapper insert 수행
        Long stepExecutionId = execution.getId();  // 자동 설정된 ID 가져오기
        request.setStepExecutionId(stepExecutionId);  // 요청 객체에 담아 전달

        log.info("📝 StepExecution 등록 완료 - ID: {}", stepExecutionId);

        // 2. Playwright 실행

        return executor.execute(request);
    }

    /**
     * 병렬 실행
     */
//    private void executeMultiple(int count, RpaRequest request, RpaExecutor executor) {
//        log.info("🚀 병렬 실행 시작 - count: {}, type: {}", count, request.getType());
//
//        ExecutorService threadPool = Executors.newFixedThreadPool(count);
//        for (int i = 0; i < count; i++) {
//            threadPool.submit(() -> {
//                try {
//                    String result = executor.execute(request);
//                    log.info("✅ 병렬 실행 결과:\n{}", result);
//                } catch (Exception e) {
//                    log.error("❌ 병렬 실행 중 오류 발생", e);
//                }
//            });
//        }
//        threadPool.shutdown();
//    }
}
