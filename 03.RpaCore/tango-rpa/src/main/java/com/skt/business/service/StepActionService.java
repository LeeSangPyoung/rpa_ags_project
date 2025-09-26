package com.skt.business.service;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.business.log.service.StepActionLogService;
import com.skt.business.mapper.StepMapper;
import com.skt.business.model.dto.Action;
import com.skt.business.model.entity.AccountScriptRslt;
import com.skt.business.model.entity.ActionInstance;
import com.skt.business.model.entity.Step;
import com.skt.business.model.entity.StepInstance;
import com.skt.business.model.entity.StepParamOutResult;
import com.skt.core.executor.model.dto.RpaExecutionResult;
import com.skt.core.model.RpaRequest;
import com.skt.core.service.RpaService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Service
@RequiredArgsConstructor
public class StepActionService {

    private static final Logger log = LoggerFactory.getLogger(StepActionService.class);
    private final StepParamService stepParamService;
    private final StepMapper stepMapper;
    private final RpaService rpaService;
    private final StepActionLogService stepActionLogService;
    private final StepInstanceService stepInstanceService;
    
    private final ActionInstanceService actionInstanceService;
    
//    @Value("${rpa.thread-pool-size:1}")
//    private int threadPoolSize;
//    
    @Autowired
    @Qualifier("rpaExecutor")
    private ThreadPoolTaskExecutor executor;
    
    private boolean executeRpaRequests(List<RpaRequest> rpaRequests, Step stepAction) {
        if (rpaRequests.isEmpty()) return true;

        boolean isParallel = stepAction.getParallelExecution();
        AtomicBoolean isExecutionFailed = new AtomicBoolean(false);
        List<Future<?>> futures = new ArrayList<>();

        if (isParallel) {
            log.info("⚙️ 병렬 실행 모드 감지됨. {}개의 작업을 병렬 처리합니다.", rpaRequests.size());

            try {
                for (RpaRequest request : rpaRequests) {
                    futures.add(executor.submit(() -> {
                        try {
                            RpaExecutionResult rpaExecutionResult = rpaService.run(request);
                            log.info("✅ 병렬 실행 결과: {}", rpaExecutionResult.getMessage());

                            if (!rpaExecutionResult.isSuccess()) {
                                log.error("❌ 병렬 실행 실패 (실패 반환): {}", rpaExecutionResult.getMessage());
                                isExecutionFailed.set(true);
                            }

                        } catch (Exception e) {
                            log.error("❌ 병렬 실행 실패", e);
                            isExecutionFailed.set(true);
                        }
                    }));
                }

                for (Future<?> future : futures) {
                    try {
                        future.get(); // 예외 전파
                    } catch (Exception e) {
                        log.error("❌ 병렬 작업 대기 중 예외 발생", e);
                        isExecutionFailed.set(true);
                    }
                }

            } catch (Exception e) {
                log.error("❌ 병렬 작업 처리 중 전체 예외 발생", e);
                isExecutionFailed.set(true);
            }

        } else {
            for (RpaRequest request : rpaRequests) {
                try {
                    RpaExecutionResult rpaExecutionResult = rpaService.run(request);
                    log.info("🧠 RPA 실행 결과: {}", rpaExecutionResult.getMessage());

                    if (!rpaExecutionResult.isSuccess()) {
                        log.error("❌ RPA 실패 반환 결과: {}", rpaExecutionResult.getMessage());
                        isExecutionFailed.set(true);
                    }

                } catch (Exception e) {
                    log.error("❌ RPA 실행 실패", e);
                    isExecutionFailed.set(true);
                }
            }
        }

        // ✅ 로그 기록 (필요 시 주석 해제 후 개선 가능)
        /*
        if (isExecutionFailed.get()) {
            stepActionLogService.updateFailureLog(stepAction.getStepId(), "Step execution failed.");
        } else {
            stepActionLogService.updateSuccessLog(stepAction.getStepId(), "Step execution successful.");
        }
        */

        return !isExecutionFailed.get();
    }
    public String runByActionId(Long actionId) {
        // Long actionId = request.getActionId();
        

        // ✅ (1) 먼저 rpa_action_instance INSERT
        ActionInstance actionInstance = new ActionInstance();
        actionInstance.setRpaActionId(actionId);
        actionInstance.setStatus("RUNNING");
        actionInstance.setStartTime(LocalDateTime.now());
        actionInstance.setTriggeredBy("system"); // 또는 request.getUserId() 등
        actionInstance.setFrstRegUserId("system");
        actionInstance.setChgRegUserId("system");

        Long actionInstanceId = actionInstanceService.insertActionInstance(actionInstance);
        
        
        log.info("🟢 ActionInstance 생성됨: id={}, actionId={}", actionInstanceId, actionId);

        
        
        List<Step> stepActions = stepMapper.selectStepsByActionId(actionId);

        List<RpaRequest> rpaRequests;
        // Long schedulerId = request.getSchedulerId();
        boolean stepActionRslt = false;
        long bfStepInstanceId = 0;
        String actionRslt = "SUCCESS";
        List<StepParamOutResult> outList = new ArrayList<>();
        // STEP별 파라미터 처리 및 RPA 요청 생성
        for (Step stepAction : stepActions) {
        	rpaRequests = new ArrayList<>();
        	stepActionRslt = false;
            log.info("실행할 스텝: {}, 스크립트: {}", stepAction.getStepOrder(), stepAction.getScriptFile());
            log.info("@@@@@@@@@@ bfStepInstanceId : {}", bfStepInstanceId);
            // StepParamService 호출
            // stepAction.setSchedulerId(schedulerId);
            ;
            if(bfStepInstanceId > 0) {
            	outList = stepParamService.processParamsOutSave(stepAction, bfStepInstanceId);
            }
            
            log.info("outlist : {}", outList.size());
            log.info("LSP outList : {}", outList.toString());
            log.info(actionRslt);
            log.info("SUCCESS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            stepParamService.processParamsAndSaveToTemp(stepAction);

            // StepAction 실행 상태 "RUNNING"으로 로그 기록
            // long stepActionLogId = stepActionLogService.insertRunningLog(stepAction.getStepId(), "Step execution started.");

            
            stepAction.getStepId();
            
            StepInstance stepInstance = new StepInstance();
            
            
            stepInstance.setRpaActionInstanceId(actionInstanceId);
            stepInstance.setRpaStepId(stepAction.getStepId());
            stepInstance.setStartTime(LocalDateTime.now());
            stepInstance.setStatus("RUNNING");
            
            stepInstanceService.insertStepInstance(stepInstance);
            
            // 여까지..
            
            // 저장된 결과 확인 로그
            List<AccountScriptRslt> accountScriptRslts = stepAction.getResolvedRslt();
            if (accountScriptRslts == null || accountScriptRslts.isEmpty()) {
                log.warn("⚠️ 치환된 경로 없음 - stepId: {}", stepAction.getStepId());
                stepInstance.setStatus("FAIL");
                stepInstance.setEndTime(LocalDateTime.now());
                stepInstanceService.updateStepInstance(stepInstance);
                continue;
            }

            // RPA 요청 생성
            log.info("accountScriptRslts.size() : {}, accountScriptRslts.toString() : {}", accountScriptRslts.size(), accountScriptRslts.toString());
            for (AccountScriptRslt accountScriptRslt : accountScriptRslts) {
                RpaRequest rpaRequest = new RpaRequest();
                rpaRequest.setType(stepAction.getRpaType().toLowerCase());
                rpaRequest.setFilename(stepAction.getScriptFile());
                rpaRequest.setScriptDir(Path.of(accountScriptRslt.getResolvedPath()).getParent().toString());
                rpaRequest.setCount(1);
                rpaRequest.setStepActionId(stepAction.getStepId());
                // rpaRequest.setStepActionLogId(stepActionLogId);
                rpaRequest.setAccountId(accountScriptRslt.getAccountId());
                rpaRequest.setRpaStepInstanceId(stepInstance.getId());
                rpaRequest.setStepParamOutResults(outList);
                rpaRequests.add(rpaRequest);
            }
            if (!rpaRequests.isEmpty()) {
            	log.info("rpaRequests.size() : {}, rpaRequests.toString()", rpaRequests.size(), rpaRequests.toString());
            	stepActionRslt = executeRpaRequests(rpaRequests, stepAction);
            }else {
            	
            }
            if(!stepActionRslt) {
            	stepInstance.setStatus("FAIL");
                stepInstance.setEndTime(LocalDateTime.now());

            	log.info("stepActionRslt : {}", stepActionRslt);
            	stepInstanceService.updateStepInstance(stepInstance);
            	actionRslt = "FAIL";
            	//stepActionLogService.updateFailureLog(stepActionLogId, "Step execution failed.");
            }else {
            	stepInstance.setStatus("SUCCESS");
                stepInstance.setEndTime(LocalDateTime.now());

            	log.info("stepActionRslt : {}", stepActionRslt);

            	stepInstanceService.updateStepInstance(stepInstance);
            	//stepActionLogService.updateSuccessLog(stepActionLogId, "Step execution successful.");
            }
            
            bfStepInstanceId = stepInstance.getId();
            
            
        } 
        
        if("SUCCESS".equals(actionRslt)) { // 모두 성공인 경우
        	actionInstance.setStatus("SUCCESS");
        }else {
        	actionInstance.setStatus("FAIL");
        	
        }
        actionInstance.setEndTime(LocalDateTime.now());
    	actionInstanceService.updateActionInstance(actionInstance);


        return actionRslt;
    }
}
