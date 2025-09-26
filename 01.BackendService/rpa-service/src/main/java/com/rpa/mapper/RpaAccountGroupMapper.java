package com.rpa.mapper;

import com.rpa.model.dto.RpaAccountGroupDto;
import com.rpa.model.dto.RpaComboboxDto;
import com.rpa.model.param.RpaAccountGroupParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaAccountGroupMapper {

    /**
     * Get AccountGroup list combobox
     */
    List<RpaComboboxDto> getAccountGroupCbx();

    /**
     * Get AccountGroup Page
     * @param param RpaAccountGroupParam
     * @return List<RpaAccountGroupDto>
     */
    List<RpaAccountGroupDto> getAccountGroupList(RpaAccountGroupParam param);

    /**
     * Check Account Group exist or not
     *
     * @param id Integer
     * @return int
     */
    int countAccountGroupById(Integer id);

    /**
     * Insert AccountGroup
     * @param param RpaAccountGroupParam
     */
    void insertRpaAccountGroup(RpaAccountGroupParam param);

    /**
     * Update AccountGroup
     * @param param RpaAccountGroupParam
     */
    void updateRpaAccountGroup(RpaAccountGroupParam param);

    /**
     * Delete AccountGroup
     * @param id Integer
     */
    void deleteRpaAccountGroup(@Param("id") Integer id);

}
