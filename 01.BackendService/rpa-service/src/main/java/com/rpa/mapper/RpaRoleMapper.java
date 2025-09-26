package com.rpa.mapper;

import com.rpa.model.dto.RpaRoleDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RpaRoleMapper {
    /**
     * Get Role list
     * @return RpaAccountDto
     */
    List<RpaRoleDto> getRoleCbx();
}
