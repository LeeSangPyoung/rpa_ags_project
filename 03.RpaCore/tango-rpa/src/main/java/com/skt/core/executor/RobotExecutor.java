package com.skt.core.executor;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skt.core.model.RpaRequest;
import com.skt.core.executor.model.dto.RpaExecutionResult;
import com.skt.core.log.entity.RpaExecutionLog;
import com.skt.core.log.enums.RpaStatus;
import com.skt.core.log.service.RpaExecutionLogService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RobotExecutor implements RpaExecutor {

    private static final Logger log = LoggerFactory.getLogger(RobotExecutor.class);
    //private static final String ROBOT_CMD = "C:\\rpa_tools\\python-3.13.2-embed-amd64\\Scripts\\robot.exe";
    
    private static final String ROBOT_CMD = "C:\\rpa_env_310\\Scripts\\robot.exe";
    private final RpaExecutionLogService executionLogService;

    @Override
    public String getType() {
        return "robot";
    }

    @Override
    public RpaExecutionResult execute(RpaRequest request) {
    	RpaExecutionResult rpaExecutionResult = new RpaExecutionResult();

        String scriptDir = request.getScriptDir();
        String fullPath = Path.of(scriptDir, request.getFilename()).toString();

        log.info("🤖 RobotFramework 실행 시작: {}", fullPath);

        String threadId = String.valueOf(Thread.currentThread().getId());
        String resultDir = scriptDir + File.separator + "result" + File.separator;
        new File(resultDir).mkdirs();

        String outputFile = resultDir + "output_" + threadId + ".xml";
        String logFile = resultDir + "log_" + threadId + ".html";
        String reportFile = resultDir + "report_" + threadId + ".html";

        RpaExecutionLog logEntry = new RpaExecutionLog();
        logEntry.setStepActionLogId(request.getStepActionLogId());
        // logEntry.setStepActionId(request.getStepActionId());
        logEntry.setScriptPath(fullPath);
        logEntry.setResultStatus(RpaStatus.RUNNING);
        logEntry.setFrstRegUserId("system");
        logEntry.setChgRegUserId("system");
        executionLogService.save(logEntry);

        try {
            List<String> command = new ArrayList<>();
            command.add(ROBOT_CMD);
            
            command.add("--variable");
            command.add("HEADLESS:True");  // 또는 False
            command.add("--output");
            command.add(outputFile);
            command.add("--log");
            command.add(logFile);
            command.add("--report");
            command.add(reportFile);
            command.add(fullPath);
            

            if (request.getArgs() != null) {
                command.addAll(request.getArgs());
            }
            log.info("command : {}", command);

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            log.info("✅ Robot 실행 종료: exitCode={}, 저장 위치: {}", exitCode, resultDir);

            logEntry.setMessage(output.toString());
            logEntry.setResultStatus(exitCode == 0 ? RpaStatus.SUCCESS : RpaStatus.FAIL);

            if (exitCode != 0) {
            	
                output.append("\n비정상 종료 (exit code ").append(exitCode).append(")");
                rpaExecutionResult.setMessage(output.toString());
                rpaExecutionResult.setSuccess(false);
            }else{
            	rpaExecutionResult.setMessage("정상종료");
            	rpaExecutionResult.setSuccess(true);
            }

            return rpaExecutionResult;

        } catch (Exception e) {
            log.error("❌ Robot 실행 오류", e);
            logEntry.setResultStatus(RpaStatus.FAIL);
            logEntry.setMessage("Robot 실행 오류: " + e.getMessage());
            // return "Robot 실행 오류: " + e.getMessage(); 
            
            rpaExecutionResult.setMessage("Robot 실행 오류: " + e.getMessage());
            rpaExecutionResult.setSuccess(false);
            return rpaExecutionResult;
            
        } finally {
            logEntry.setChgRegUserId("system");
            executionLogService.update(logEntry);
        }
    }
}
