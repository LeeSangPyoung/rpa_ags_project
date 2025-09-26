package com.skt.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@ConfigurationProperties(prefix = "rpa")
@Getter
@Setter
public class CommonSettingProperties {
    private Scheduler scheduler = new Scheduler();
    private Executor executor = new Executor();

    @Getter @Setter
    public static class Scheduler {
        private int poolSize;
        private String threadNamePrefix;
    }

    @Getter @Setter
    public static class Executor {
        private int corePoolSize;
        private int maxPoolSize;
        private int queueCapacity;
        private String threadNamePrefix;
        
        // ✅ Playwright 관련 설정 추가
        private String playwrightExecDir;
        private String playwrightScriptDir;
        private String playwrightBaseResultDir;
        private String playwrightTargetDir;
    }
}