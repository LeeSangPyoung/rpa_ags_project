package com.rpa.mapper;

import com.rpa.model.dto.RpaActionDto;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.param.RpaActionParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaActionMapper {

    /**
     * Get Action list combobox
     */
    List<RpaComboboxDto> getActionCbx();

    /**
     * Get Action Page
     * @param param RpaActionParam
     * @return List<RpaActionDto>
     */
    List<RpaActionDto> getActionPage(RpaActionParam param);

    /**
     * Get Action By Id
     * @param id Integer
     * @return RpaActionDto
     */
    RpaActionDto getActionById(@Param("id") Integer id);

    /**
     * Check action exist or not
     *
     * @param id Integer
     * @return int
     */
    int countActionById(@Param("id") Integer id);

    /**
     * Get Action List Count
     * @param param RpaActionParam
     * @return Long
     */
    Long getActionListCount(RpaActionParam param);

    /**
     * Insert Action
     * @param param RpaActionParam
     */
    void insertRpaAction(RpaActionParam param);

    /**
     * Update Action
     * @param param RpaActionParam
     */
    void updateRpaAction(RpaActionParam param);

    /**
     * Delete Action
     * @param id Integer
     */
    void deleteRpaAction(@Param("id") Integer id);

    /**
     * Delete Action List
     * @param idList List<Integer>
     */
    void deleteRpaActionList(List<Integer> idList);

}
