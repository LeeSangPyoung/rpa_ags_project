package com.rpa.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserStatus {
    ACTIVE(1),  	// Active use
    SUBMITTED(2),	// User waiting for approve
    LOCKED(3),		// user being locked
    REJECTED(4);	// user being rejected when register
    final int statusId;
}
