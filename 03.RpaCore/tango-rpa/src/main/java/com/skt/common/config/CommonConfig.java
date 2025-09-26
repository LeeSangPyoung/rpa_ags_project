package com.skt.common.config;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
@EnableConfigurationProperties(CommonSettingProperties.class)
public class CommonConfig {

    private final CommonSettingProperties props;
    private final Environment env;

    public CommonConfig(CommonSettingProperties props, Environment env) {
        this.props = props;
        this.env = env;
    }

    // ✅ 현재 활성화된 Spring 프로파일 출력
    @PostConstruct
    public void printProfile() {
        String[] activeProfiles = env.getActiveProfiles();
        System.out.println("✅ 현재 실행 프로파일: " + (activeProfiles.length > 0 ? String.join(", ", activeProfiles) : "default"));
    }

    // 🔹 스케줄러 전용 스레드풀 (예: @Scheduled 작업)
    @Bean
    public ThreadPoolTaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(props.getScheduler().getPoolSize());
        scheduler.setThreadNamePrefix(props.getScheduler().getThreadNamePrefix());
        scheduler.initialize();
        return scheduler;
    }

    // 🔸 RPA 실행 전용 스레드풀
    @Bean(name = "rpaExecutor")
    public ThreadPoolTaskExecutor rpaExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(props.getExecutor().getCorePoolSize());
        executor.setMaxPoolSize(props.getExecutor().getMaxPoolSize());
        executor.setQueueCapacity(props.getExecutor().getQueueCapacity());
        executor.setThreadNamePrefix(props.getExecutor().getThreadNamePrefix());
        executor.initialize();
        return executor;
    }
}
