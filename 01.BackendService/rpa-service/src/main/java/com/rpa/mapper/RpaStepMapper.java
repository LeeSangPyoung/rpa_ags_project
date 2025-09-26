package com.rpa.mapper;

import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.dto.RpaStepDto;
import com.rpa.model.param.RpaStepParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaStepMapper {

    /**
     * Get Step list combobox
     */
    List<RpaComboboxDto> getStepCbx(@Param("rpaActionId") Integer rpaActionId);

    /**
     * Get Step Page
     * @param param RpaStepParam
     * @return List<RpaStepDto>
     */
    List<RpaStepDto> getStepPage(RpaStepParam param);

    /**
     * Get Step By Id
     * @param id Integer
     * @return RpaStepDto
     */
    RpaStepDto getStepById(@Param("id") Integer id);

    /**
     * Check Step exist or not
     *
     * @param id Integer
     * @return int
     */
    int countStepById(@Param("id") Integer id);

    /**
     * Get Step List Count
     * @param param RpaStepParam
     * @return Long
     */
    Long getStepListCount(RpaStepParam param);

    /**
     * Insert Step
     * @param param RpaStepParam
     */
    void insertRpaStep(RpaStepParam param);

    /**
     * Update Step
     * @param param RpaStepParam
     */
    void updateRpaStep(RpaStepParam param);

    /**
     * Delete Step
     * @param id Integer
     */
    void deleteRpaStep(@Param("id") Integer id);

    /**
     * Delete Step List
     * @param idList List<Integer>
     */
    void deleteRpaStepList(List<Integer> idList);

}
