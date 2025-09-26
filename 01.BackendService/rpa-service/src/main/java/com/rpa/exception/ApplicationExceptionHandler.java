package com.rpa.exception;

import com.rpa.common.CommonMessage;
import com.rpa.model.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.mybatis.spring.MyBatisSystemException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

	private final Logger logger = LoggerFactory.getLogger(ApplicationExceptionHandler.class);

    @ExceptionHandler(RpaException.class)
    private ResponseEntity<Object> handleRpeException(RpaException exception) {
        ApiResponse<?> responseDto = ApiResponse.builder()
                							.status(HttpServletResponse.SC_OK)
                							.messageId(exception.getMessageId())
                							.build();
        logger.debug("Exception :", exception);
        return ResponseEntity.status(200).body(responseDto);
    }

    /**
     * Handle the exception query the database
     *
     * @param exception DataAccessException
     * @return ResponseEntity which will contain an Error object.
     */
    @ExceptionHandler({DataAccessException.class,
            CannotCreateTransactionException.class,
            DataIntegrityViolationException.class,
            SQLIntegrityConstraintViolationException.class,
            MyBatisSystemException.class})
    public ResponseEntity<Object> handleArielDataAccessException(Exception exception) {
        return handleRpeException(new RpaException(exception, CommonMessage.E022.getMessageId()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception exception) {
        return handleRpeException(new RpaException(exception, CommonMessage.E000.getMessageId()));
    }
}
