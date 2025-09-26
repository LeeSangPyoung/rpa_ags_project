package com.rpa.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.rpa.common.Constant;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RpaException extends RuntimeException{

    private final String messageId;
    private final Integer status;
    private Map<String, Object> data;

    /**
     * Constuctor RpaException
     * @param messageId String
     * @param dataMap Map<String, Object>
     */
    public RpaException(Throwable cause ,String messageId, Map<String, Object> dataMap) {
        super(cause);
        this.messageId = messageId;
        this.status = 500;
        this.data = dataMap;
    }

    /**
     * Constuctor RpaException
     * @param messageId String
     * @param dataMap Map<String, Object>
     */
    public RpaException(String messageId, Map<String, Object> dataMap) {
        this(new Exception(Constant.SYSTEM_CAUSE), messageId, dataMap);
    }

    /**
     * Constuctor RpaException
     * @param cause Throwable
     * @param messageId String
     */
    public RpaException(Throwable cause ,String messageId) {
        this(cause, messageId, null);
    }

    /**
     * Constuctor RpaException
     * @param messageId String
     */
    public RpaException(String messageId) {
        this(new Exception(Constant.SYSTEM_CAUSE), messageId);
    }

}
