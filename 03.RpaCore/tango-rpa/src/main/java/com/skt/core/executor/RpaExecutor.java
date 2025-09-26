package com.skt.core.executor;

import com.skt.core.executor.model.dto.RpaExecutionResult;
import com.skt.core.model.RpaRequest;

public interface RpaExecutor {
    String getType(); // "tagui" or "robot"
    RpaExecutionResult execute(RpaRequest request);
}
