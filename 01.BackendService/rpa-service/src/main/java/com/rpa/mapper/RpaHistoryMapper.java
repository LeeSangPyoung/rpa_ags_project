package com.rpa.mapper;

import com.rpa.model.dto.ExecutionLogDetailDto;
import com.rpa.model.dto.RpaActionInstanceDto;
import com.rpa.model.dto.RpaStepExecutionDto;
import com.rpa.model.dto.RpaStepInstanceDto;
import com.rpa.model.param.RpaActionInstanceParam;
import com.rpa.model.param.RpaStepExecutionParam;
import com.rpa.model.param.RpaStepInstanceParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaHistoryMapper {

    /**
     * Get Action Instance Page
     * @param param RpaActionInstanceParam
     * @return List<RpaActionInstanceDto>
     */
    List<RpaActionInstanceDto> getActionInstancePage(RpaActionInstanceParam param);
    /**
     * Get Action Instance List Count
     * @param param RpaActionInstanceParam
     * @return Long
     */
    Long getActionInstanceListCount(RpaActionInstanceParam param);

    /**
     * Get Step Instance Page
     * @param param RpaStepInstanceParam
     * @return List<RpaStepInstanceDto>
     */
    List<RpaStepInstanceDto> getStepInstancePage(RpaStepInstanceParam param);

    /**
     * Get Step Instance List Count
     * @param param RpaStepInstanceParam
     * @return Long
     */
    Long getStepInstanceListCount(RpaStepInstanceParam param);

    /**
     * Get Step Execution Page
     * @param param RpaStepExecutionParam
     * @return List<RpaStepExecutionDto>
     */
    List<RpaStepExecutionDto> getStepExecutionPage(RpaStepExecutionParam param);

    /**
     * Get Step Execution List Count
     * @param param RpaStepExecutionParam
     * @return Long
     */
    Long getStepExecutionListCount(RpaStepExecutionParam param);

    /**
     * Get Execution Log Detail by Id
     * @param id Integer
     * @return ExecutionLogDetailDto
     */
    ExecutionLogDetailDto getExecutionLogDetail(@Param("id") Integer id);

}
