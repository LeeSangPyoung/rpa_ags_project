package com.rpa.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RpaUserResponse {
    private Integer id;
    private String userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private Integer statusId;
    private String status;
    private Integer mustChangePw;
    private Integer roleId;
    private String roleName;
    private Integer lockCount;
    private String createdAt;
    private String updatedAt;
    private String lastChangePassAt;
    private String approveDate;
    private String approveUserId;
}