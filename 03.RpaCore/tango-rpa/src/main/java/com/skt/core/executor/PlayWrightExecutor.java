package com.skt.core.executor;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skt.core.executor.model.dto.RpaExecutionResult;
import com.skt.core.model.RpaRequest;

import jakarta.annotation.PostConstruct;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skt.business.mapper.StepExecutionMapper;
import com.skt.business.mapper.StepParamOutMapper;
import com.skt.business.model.entity.StepExecution;
import com.skt.business.model.entity.StepParamOut;
import com.skt.business.model.entity.StepParamOutResult;
import com.skt.business.service.StepInstanceService;
import com.skt.common.config.CommonSettingProperties;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Component
public class PlayWrightExecutor implements RpaExecutor {

    private static final Logger log = LoggerFactory.getLogger(PlayWrightExecutor.class);


    private String playWrightExecDir;
    private String playwrightBaseResultDir;

    @Autowired
    private CommonSettingProperties props;

    @Autowired
    private StepParamOutMapper stepParamOutMapper;

    @Autowired
    private StepExecutionMapper stepExecutionMapper;

    @PostConstruct
    public void init() {
        this.playWrightExecDir = props.getExecutor().getPlaywrightExecDir();
        this.playwrightBaseResultDir = props.getExecutor().getPlaywrightBaseResultDir();
    }

    @Override
    public String getType() {
        return "playwright";
    }

    @Override
    public RpaExecutionResult execute(RpaRequest request) {
    	RpaExecutionResult rpaExecutionResult = new RpaExecutionResult();
        String scriptDir = request.getScriptDir();
        String userDataDir = scriptDir;
        String fullPath = Path.of(scriptDir, request.getFilename()).toString();
        log.info("scriptDir : {}", scriptDir);
        log.info("🎭 Playwright 실행 시작: {}", fullPath);

        StepExecution stepExecution = new StepExecution();
        stepExecution.setId(request.getStepExecutionId());
        stepExecution.setStatus("RUNNING");
        stepExecution.setStartTime(LocalDateTime.now());
        stepExecutionMapper.updateStepExecution(stepExecution); 

        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        String threadId = String.valueOf(Thread.currentThread().getId());
        String userDataDirName = "user_data_" + UUID.randomUUID(); 
        //String resultDir = playwrightBaseResultDir + timestamp + "\\";
        //new File(resultDir).mkdirs();
        
        
        // 💡 유니크한 user_data_dir 생성
        // userDataDir = Path.of(scriptDir, "user_data_" + threadId).toString();
        userDataDir = Path.of(scriptDir, userDataDirName).toString();
        new File(userDataDir).mkdirs();
        
        
        //
        String resultDir = Path.of(scriptDir).resolve("result").toString();
        

        // String screenshotPath = resultDir + "screenshot_" + threadId + ".png";
        String resultJsonPath = Path.of(resultDir, "result.json").toString();
        new File(resultJsonPath).getParentFile().mkdirs();
        
        
        
        log.info("### resultDir : {}", resultDir);
        log.info("### resultJsonPath : {}", resultJsonPath);
        log.info("bf_result_value : {}", request.getStepParamOutResults().toString());
        

        
        Map<String, Map<String, Object>> grouped = new LinkedHashMap<>();

        for (StepParamOutResult result : request.getStepParamOutResults()) {
            String key = result.getStepExecutionId() + "_" + result.getAccountId();
            grouped.putIfAbsent(key, new LinkedHashMap<>());

            Map<String, Object> paramMap = grouped.get(key);
            paramMap.put("stepExecutionId", result.getStepExecutionId());
            paramMap.put("accountId", result.getAccountId());
            paramMap.put("loginId", result.getLoginId());
            paramMap.put(result.getParamKey(), result.getParamValue());
        }

        List<Map<String, Object>> jsonList = new ArrayList<>(grouped.values());

        ObjectMapper objectMapper = new ObjectMapper();
        
        
        StringBuilder output = new StringBuilder();

        try {
        	String outListJson = objectMapper.writeValueAsString(jsonList);
        	// String outListJson = objectMapper.writeValueAsString(paramMap);
        	log.info("### outListJson : {}", outListJson);
        	outListJson = "\"" + outListJson.replace("\"", "\\\"") + "\"";
        	
            List<String> command = new ArrayList<>();
            command.add(playWrightExecDir);
            command.add(fullPath);
            command.add(resultDir); // ← 하나만 넘기면 됨
            command.add(resultJsonPath);
            command.add(userDataDir);    // 고유한 user data dir 추가
            command.add(outListJson);  // Python에서 인자로 받을 수 있게 넘김

            log.info("resultDir : {}", resultDir);
            log.info("fullPath : {}", fullPath);
            log.info("resultJsonPath : {}", resultJsonPath);
            log.info("userDataDir : {}", userDataDir); // ✅ log 확인
            log.info("outListJson : {}", outListJson);
            log.info("📜 실행 커맨드: {}", command);

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            // StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    // new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                	new InputStreamReader(process.getInputStream(), "MS949"))) { // 또는 "EUC-KR"

            	String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            log.info("output : {}", output.toString());
            int exitCode = process.waitFor();
            

            if (exitCode != 0) {
                log.error("❌ Playwright 프로세스 비정상 종료 (exitCode: {})", exitCode);
                log.error("❗ 에러 또는 로그 출력:\n{}", output);
            } else {
                log.info("✅ Playwright 프로세스 정상 종료 (exitCode: {})", exitCode);
                log.info("📋 실행 결과 로그:\n{}", output);
            }

            // ✅ 수정된 result.json 경로
            File resultJson = new File(resultJsonPath);

            if (resultJson.exists()) {
                log.info("📄 result.json 파일 확인됨: {}", resultJson.getAbsolutePath());

                ObjectMapper mapper = new ObjectMapper();
                Map<String, String> resultMap = mapper.readValue(resultJson, new TypeReference<>() {});
                Long stepExecutionId = request.getStepExecutionId();

                for (Map.Entry<String, String> entry : resultMap.entrySet()) {
                    StepParamOut param = new StepParamOut();
                    param.setStepExecutionId(stepExecutionId);
                    param.setParamKey(entry.getKey());
                    param.setParamValue(entry.getValue());
                    param.setCreatedAt(LocalDateTime.now());
                    stepParamOutMapper.insertStepParamOut(param);
                }

                log.info("result.json 내용을 rpa_step_param_out에 저장 완료");
                
                stepExecution.setStatus("SUCCESS");
                rpaExecutionResult.setMessage("result.json 내용을 rpa_step_param_out에 저장 완료");
                rpaExecutionResult.setSuccess(true);
            } else {
                log.warn("result.json 파일이 존재하지 않음: {}", resultJson.getAbsolutePath());
                stepExecution.setStatus("FAIL");
                rpaExecutionResult.setMessage("result.json 파일이 존재하지 않음:" + resultJson.getAbsolutePath());
                rpaExecutionResult.setSuccess(false);

            }

            log.info("✅ Playwright 종료: exitCode={}, 저장 위치: {}", exitCode, resultDir);

            if (exitCode != 0) {
                rpaExecutionResult.setSuccess(false);
                stepExecution.setStatus("FAIL");
                output.append("\n비정상 종료 (exit code ").append(exitCode).append(")");
            }
            
            stepExecution.setResultLog(output.toString());
            stepExecution.setEndTime(LocalDateTime.now());
            stepExecutionMapper.updateStepExecution(stepExecution);
           
            return rpaExecutionResult;

        } catch (Exception e) {

            stepExecution.setStatus("FAIL");
            stepExecution.setResultLog(output.toString());
            stepExecution.setEndTime(LocalDateTime.now());
            stepExecutionMapper.updateStepExecution(stepExecution);
            log.error("❌ Playwright 실행 오류", e);
            rpaExecutionResult.setMessage("Playwright 실행 오류: " + e.getMessage());
            rpaExecutionResult.setSuccess(false);
            return rpaExecutionResult;
        }
    }
}
