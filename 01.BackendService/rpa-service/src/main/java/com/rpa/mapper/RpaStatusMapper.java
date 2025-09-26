package com.rpa.mapper;

import com.rpa.model.dto.RpaComboboxDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RpaStatusMapper {
    /**
     * Get Status combobox
     * @return RpaAccountDto
     */
    List<RpaComboboxDto> getStatusCbx();
}
