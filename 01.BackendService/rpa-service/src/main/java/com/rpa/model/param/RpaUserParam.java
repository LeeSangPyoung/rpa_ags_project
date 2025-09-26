package com.rpa.model.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RpaUserParam {
    private Integer id;
    private String userId;
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private Integer statusId;
    private String status;
    private Integer roleId;
    private Integer lockCount;
    private Integer mustChangePw;
    private String lastChangePassAt;
    private String approveDate;
    private String approveUserId;
}
