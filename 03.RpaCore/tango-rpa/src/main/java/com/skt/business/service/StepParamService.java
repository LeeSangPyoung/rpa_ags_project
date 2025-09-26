package com.skt.business.service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skt.business.mapper.AccountMapper;
import com.skt.business.mapper.StepParamOutMapper;
import com.skt.business.mapper.StepParamTemplateMapper;
import com.skt.business.model.entity.Account;
import com.skt.business.model.entity.AccountScriptRslt;
import com.skt.business.model.entity.Step;
import com.skt.business.model.entity.StepParamOutResult;
import com.skt.business.model.entity.StepParamTemplate;
import com.skt.common.config.CommonSettingProperties;
import com.skt.encryption.config.SecretKeyProvider;
import com.skt.encryption.util.AESUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepParamService {

    private static final Logger log = LoggerFactory.getLogger(StepParamService.class);

    private final StepParamTemplateMapper stepParamMapper;
    private final AccountMapper accountMapper;
    private final StepParamOutMapper stepParamOutMapper;
    private final SecretKeyProvider secretKeyProvider;
    

    @Autowired
    private CommonSettingProperties props;
    
    public List<StepParamOutResult> processParamsOutSave(Step step, long prevStepInstanceId) {
    	List<StepParamOutResult> outList = stepParamOutMapper.selectParamOutByPrevStep(prevStepInstanceId);
    	log.info("outList : {}", outList.toString());
    	return outList;
    }

    public void processParamsAndSaveToTemp(Step stepAction) {
    	String playwrightScriptDir = props.getExecutor().getPlaywrightScriptDir();
    	String playwrightTargetDir = props.getExecutor().getPlaywrightTargetDir();
        List<StepParamTemplate> params = stepParamMapper.selectParamTemplateByStepId(stepAction.getStepId());
        stepAction.setParams(params);

        //List<String> resolvedPaths = new ArrayList<>();
        //List<Integer> accountIds = new ArrayList<>();
        List<AccountScriptRslt> resolvedRslts = new ArrayList<>();
        
        stepAction.setResolvedRslt(resolvedRslts); // ✅ 리스트 초기화
        try {
        	
        	
        	String rpaType = stepAction.getRpaType();
        	String scriptPath = stepAction.getScriptPath();
        	String targetPath = stepAction.getTargetFilePath();
        	
        	
        	if("PLAYWRIGHT".equals(rpaType)) {
        		log.info("playwrightScriptDir : {}", playwrightScriptDir);
        		if (scriptPath == null || scriptPath.trim().isEmpty()) {
        		    stepAction.setScriptPath(playwrightScriptDir);
        		} else {
        		    log.info("not null scriptPath: '{}'", scriptPath);
        		}
        		
        		if(targetPath == null || targetPath.trim().isEmpty()) {
        			stepAction.setTargetFilePath(playwrightTargetDir);
        		}else {
        			log.info("not null targetPath: '{}'", targetPath);
        		}
        	}
        	
        	log.info("##### stepAction.getScriptPath() : {}", stepAction.getScriptPath());
        	log.info("#### stepAction.getScriptFile() : {}", stepAction.getScriptFile());
            // Path sourcePath = Path.of(stepAction.getScriptPath()).resolve(stepAction.getScriptFile());
            Path sourcePath = Paths.get(stepAction.getScriptPath(), stepAction.getScriptFile());
            
            log.info("#### sourcePath : {}", sourcePath.toString());

            if (!Files.exists(sourcePath)) {
                log.warn("📛 스크립트 파일이 존재하지 않음: {}", sourcePath.toAbsolutePath());
                return;
            }

            String baseScript = Files.readString(sourcePath, StandardCharsets.UTF_8);
            log.info("baseScript : {}", baseScript);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            
            
            
            Path baseDir = Path.of(stepAction.getTargetFilePath().replace("\\", "/"));
            
            
            
            
            String actionId = stepAction.getRpaActionId() + "";
            String stepActionId = stepAction.getStepId() + "";

            
            log.info("99");
            Path versionedDir = baseDir.resolve(timestamp)
                    .resolve(actionId)
                    .resolve(stepActionId);

            log.info("105");
            log.info("versionedDir : {}", versionedDir.toString());
            Files.createDirectories(versionedDir);
            log.info("106");

            // chromedriver 소스 경로

            if (Boolean.TRUE.equals(stepAction.getRepeatPerAccount()) && stepAction.getAccountGroupId() != null) {
                List<Account> accounts = accountMapper.selectAccountsByGroupId(stepAction.getAccountGroupId());
                Map<Integer, Map<String, String>> grouped = accounts.stream()
                        .collect(Collectors.groupingBy(Account::getAccountNo,
                                Collectors.toMap(Account::getKey, Account::getValue)));

                for (Map.Entry<Integer, Map<String, String>> entry : grouped.entrySet()) {
                    Integer accountNo = entry.getKey();
                    String contentCopy = baseScript;
                    
                    // contentCopy.
                    // String loginId = entry.getValue();
                    
                    log.info("entry : {}", entry.getValue());
                    
                    
                    Map<String, String> accountMap = entry.getValue();
                    String loginId = accountMap.get("login_id");
                    String password = accountMap.get("password");
                    
                    try {
                    	password = AESUtil.decrypt(password, secretKeyProvider.getSecretKey());
                    } catch (Exception e) {
                        log.warn("📛 계정({}) password 복호화 실패: {}", accountNo, e.getMessage());
                        continue; // 복호화 실패하면 그냥 이 계정은 넘어가도 됨
                    }
                    
                    
                    contentCopy = contentCopy.replace("__login_id__", loginId != null ? loginId : "");
                    contentCopy = contentCopy.replace("__password__", password != null ? password : "");

                    log.info("@@@@ params : {}", params);

                    for (StepParamTemplate param : params) {
                        String token = "__" + param.getParamKey() + "__";
                        String value = "";
                        value = accountMap.getOrDefault(param.getParamKey(), param.getParamValueTemplate());
                        
                        contentCopy = contentCopy.replace(token, value != null ? value : "");
                    }
                    
 
                    

                    Path accountDir = versionedDir.resolve("account_" + accountNo);
                    Files.createDirectories(accountDir);

                    Path accountFile = accountDir.resolve(stepAction.getScriptFile());
                    Files.writeString(accountFile, contentCopy, StandardCharsets.UTF_8);

                    
                    resolvedRslts.add(new AccountScriptRslt(accountNo, accountFile.toAbsolutePath().toString()));
                    log.info("✅ 계정별 치환 완료 (account_no={}): {}", accountNo, accountFile.toAbsolutePath());
                }

            } else {
                String scriptContent = baseScript;
                for (StepParamTemplate param : params) {
                    String token = "__" + param.getParamKey() + "__";
                    String value = param.getParamValueTemplate() != null ? param.getParamValueTemplate() : "";
                    log.info("🔁 치환 토큰: {} → {}", token, value);
                    scriptContent = scriptContent.replace(token, value);
                }

                Files.createDirectories(versionedDir);

                Path tempFile = versionedDir.resolve(stepAction.getScriptFile());
                Files.writeString(tempFile, scriptContent, StandardCharsets.UTF_8);

                // resolvedPaths.add(tempFile.toAbsolutePath().toString());
                resolvedRslts.add(new AccountScriptRslt(1, tempFile.toAbsolutePath().toString()));

                log.info("✅ 일반 치환 완료: {}", tempFile.toAbsolutePath());
            }

        } catch (Exception e) {
            log.warn("📛 스크립트 처리 실패 - 경로: {} / 파일명: {} → {}",
                    stepAction.getScriptPath(),
                    stepAction.getScriptFile(),
                    e.getMessage());
        }
        
        
        
    }
}
