package com.rpa.mapper;

import com.rpa.model.dto.RpaAccountDto;
import com.rpa.model.param.RpaAccountParam;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RpaAccountMapper {

    /**
     * Get Account Page
     * @param param RpaAccountParam
     * @return List<RpaAccountDto>
     */
    List<RpaAccountDto> getAccountList(RpaAccountParam param);

    /**
     * Check Account exist or not
     *
     * @param param  RpaAccountParam
     * @return int
     */
    int countAccountById(RpaAccountParam param);

    /**
     * Insert Account
     * @param param RpaAccountParam
     */
    void insertRpaAccount(RpaAccountParam param);

    /**
     * Update Account
     * @param param RpaAccountParam
     */
    void updateRpaAccount(RpaAccountParam param);

    /**
     * Delete Account
     * @param param RpaAccountParam
     */
    void deleteRpaAccount(RpaAccountParam param);

}
