package com.skt.scheduler.service;

import com.skt.business.model.entity.Action;
import com.skt.business.service.StepActionService;
import com.skt.scheduler.mapper.RpaSchedulerMapper;
import com.skt.scheduler.mapper.RpaTaskQueueMapper;
import com.skt.scheduler.model.entity.RpaScheduler;
import com.skt.scheduler.model.entity.RpaTaskQueue;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.cronutils.model.Cron;
import com.cronutils.model.CronType;
import com.cronutils.model.definition.CronDefinitionBuilder;
import com.cronutils.model.time.ExecutionTime;
import com.cronutils.parser.CronParser;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RpaSchedulerService {

    private final RpaSchedulerMapper rpaSchedulerMapper;
    private final RpaTaskQueueMapper rpaTaskQueueMapper;
    private final StepActionService stepActionService;

    @Qualifier("rpaExecutor")
    private final TaskExecutor rpaExecutor;

    // 🔹 스케줄 기준으로 실행 예정 시간들을 queue에 미리 등록 (매 1분)
    @Scheduled(cron = "0 * * * * *")
    public void scheduleJobs() {
        System.out.println("Preparing RPA Task Queue...");

        List<Action> actionSchedules = rpaSchedulerMapper.getActiveSchedules();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime until = now.plusMinutes(1); // 현재부터 1분 뒤까지

        for (Action actionSchedule : actionSchedules) {
            if (actionSchedule.getStartDate() == null ||
                (actionSchedule.getEndDate() != null && now.isAfter(actionSchedule.getEndDate()))) {
                continue;
            }

            List<LocalDateTime> runTimes = calculateNextRunTimes(
            		actionSchedule.getCronExpression(),
            		actionSchedule.getStartDate(),
                until
            );



            
            if (!runTimes.isEmpty()) {
                LocalDateTime lastRunTime = runTimes.get(runTimes.size() - 1);

                // 중복된 queue가 있는지 체크 (schedulerId + actionId + runTime)
                if (!rpaTaskQueueMapper.existsTask(actionSchedule.getId(), lastRunTime)) {
                    RpaTaskQueue task = new RpaTaskQueue();
                    task.setActionId(actionSchedule.getId());
                    task.setScheduledTime(lastRunTime);
                    task.setStatus("READY");

                    rpaTaskQueueMapper.insertTaskQueue(task);
                    System.out.println("✅ Queued: actionId=" + actionSchedule.getId()
                       
                        + ", runTime=" + lastRunTime);
                }

                // 마지막 실행 시각을 next_run_time으로 갱신
                actionSchedule.setNextRunTime(lastRunTime);
                rpaSchedulerMapper.updateNextRunTime(actionSchedule);
            }
        }
    }

    private List<LocalDateTime> calculateNextRunTimes(String cronExpression, LocalDateTime startDate, LocalDateTime untilTime) {
        try {
            CronParser parser = new CronParser(CronDefinitionBuilder.instanceDefinitionFor(CronType.UNIX));
            Cron cron = parser.parse(cronExpression);
            ExecutionTime executionTime = ExecutionTime.forCron(cron);

            ZonedDateTime next = startDate.atZone(ZoneId.systemDefault());
            ZonedDateTime limit = untilTime.atZone(ZoneId.systemDefault());

            List<LocalDateTime> results = new ArrayList<>();

            while (true) {
                Optional<ZonedDateTime> nextExecution = executionTime.nextExecution(next);
                if (nextExecution.isEmpty()) break;

                next = nextExecution.get();
                if (next.isAfter(limit)) break;

                results.add(next.toLocalDateTime());
            }

            return results;
        } catch (Exception e) {
            System.err.println("Invalid cron expression: " + cronExpression);
            e.printStackTrace();
            return List.of();
        }
    }

    // 🔹 queue에서 실행 조건에 맞는 task만 실제 실행 (매 10초)
    @Scheduled(cron = "0/10 * * * * *")
    public void executeReadyTasks() {
        System.out.println("Executing READY RPA tasks...");

        LocalDateTime now = LocalDateTime.now();
        List<RpaTaskQueue> tasks = rpaTaskQueueMapper.getLatestReadyTasks(now);

        for (RpaTaskQueue task : tasks) {
        	if(!"ACTIVE".equals(task.getActionStatus())){
        		// action이 불가피하게 enactive가 되어버리면..
        		rpaTaskQueueMapper.updateStatusEnactive(task.getId());
        	}else {
        		rpaExecutor.execute(() -> runTaskSafely(task));
        	}
        			
            
        }
    }

    private void runTaskSafely(RpaTaskQueue task) {
        try {
            LocalDateTime start = LocalDateTime.now();

            rpaTaskQueueMapper.updateStatusRunning(task.getId());
            rpaTaskQueueMapper.skipPreviousTasks(task.getActionId(), task.getScheduledTime());

            // com.skt.business.model.dto.Action action = new com.skt.business.dto.Action();
            // action.setActionId(task.getActionId());
            long actionId = task.getActionId();
            // action.setSchedulerId(task.getSchedulerId()); 

            // System.out.println("🚀 Executing task: actionId=" + actionId);

            String result = stepActionService.runByActionId(actionId); 

            task.setResult(result);
            task.setStartedAt(start);
            rpaTaskQueueMapper.updateStatusSuccess(task);
        } catch (Exception e) {
            task.setResult("ERROR: " + e.getMessage());
            task.setStartedAt(LocalDateTime.now());
            rpaTaskQueueMapper.updateStatusFailed(task);
        }
    }
}