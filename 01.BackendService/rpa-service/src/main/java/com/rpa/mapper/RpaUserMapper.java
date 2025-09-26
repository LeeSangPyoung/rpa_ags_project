package com.rpa.mapper;

import com.rpa.model.dto.RpaUserDto;
import com.rpa.model.param.RpaUserParam;
import com.rpa.model.param.SearchListUserParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RpaUserMapper {
    /**
     * Get RpaUser with full information
     *
     * @param param RpaUserParam
     * @return RpaAccountDto
     */
    RpaUserDto getUserFullInfo(RpaUserParam param);

    /**
     * Get RpaUser
     *
     * @param param RpaUserParam
     * @return RpaAccountDto
     */
    RpaUserDto getUser(RpaUserParam param);

    /**
     * Get user page
     *
     * @param param SearchListUserParam
     * @return List<RpaUserDto>
     */
    List<RpaUserDto> getUserPage(SearchListUserParam param);

    /**
     * Get Action List Count
     *
     * @param param SearchListUserParam
     * @return Long
     */
    Long getUserListCount(SearchListUserParam param);

    /**
     * Check user exist or not
     *
     * @param userId String
     * @return int
     */
    int countUserByUserId(@Param("userId") String userId);

    /**
     * Update user
     *
     * @param param RpaUserParam
     */
    void updateRpaUser(RpaUserParam param);

    /**
     * Update status of list user
     *
     * @param userIdList List<String>
     * @param statusId   int
     */
    void updateStatus(List<String> userIdList, @Param("statusId") int statusId);

    /**
     * Unlock user
     *
     * @param userIdList List<String>
     */
    void unlockRpaUser(List<String> userIdList);

    /**
     * approve user
     *
     * @param userIdList List<String>
     * @param approveUserId String
     */
    void approveRpaUser(List<String> userIdList, @Param("approveUserId") String approveUserId);

    /**
     * Insert an user
     *
     * @param param RpaUserParam
     */
    void insertRpaUser(RpaUserParam param);

    /**
     * Delete an user
     *
     * @param userId String
     */
    void deleteRpaUser(@Param("userId") String userId);

    /**
     * Delete list user
     *
     * @param userIdList List<String>
     */
    void deleteRpaUserList(List<String> userIdList);
}
