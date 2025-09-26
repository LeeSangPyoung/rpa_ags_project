package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaUserDto {
    private Integer id;
    private String userId;
    private String userName;
    private String password;
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