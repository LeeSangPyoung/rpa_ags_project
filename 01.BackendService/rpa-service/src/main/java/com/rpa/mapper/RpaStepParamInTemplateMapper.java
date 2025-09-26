package com.rpa.mapper;

import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.dto.RpaStepParamInTemplateDto;
import com.rpa.model.param.RpaStepParamInTemplateParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaStepParamInTemplateMapper {

    /**
     * Get StepParamInTemplate list combobox
     */
    List<RpaComboboxDto> getStepParamInTemplateCbx();


    /**
     * Get StepParamInTemplate Page
     * @param param RpaStepParamInTemplateParam
     * @return List<RpaStepParamInTemplateDto>
     */
    List<RpaStepParamInTemplateDto> getStepParamInTemplatePage(RpaStepParamInTemplateParam param);

    /**
     * Check StepParamInTemplate exist or not
     *
     * @param id Integer
     * @return int
     */
    int countStepParamInTemplateById(@Param("id") Integer id);

    /**
     * Get StepParamInTemplate List Count
     * @param param RpaStepParamInTemplateParam
     * @return Long
     */
    Long getStepParamInTemplateListCount(RpaStepParamInTemplateParam param);

    /**
     * Insert StepParamInTemplate
     * @param param RpaStepParamInTemplateParam
     */
    void insertRpaStepParamInTemplate(RpaStepParamInTemplateParam param);

    /**
     * Update StepParamInTemplate
     * @param param RpaStepParamInTemplateParam
     */
    void updateRpaStepParamInTemplate(RpaStepParamInTemplateParam param);

    /**
     * Delete StepParamInTemplate
     * @param id Integer
     */
    void deleteRpaStepParamInTemplate(@Param("id") Integer id);

    /**
     * Delete StepParamInTemplate List
     * @param idList List<Integer>
     */
    void deleteRpaStepParamInTemplateList(List<Integer> idList);

}
