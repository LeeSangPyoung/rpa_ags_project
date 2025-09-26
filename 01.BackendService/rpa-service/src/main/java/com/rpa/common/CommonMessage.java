package com.rpa.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CommonMessage {
    C000("C000", "Retrieve data Successfully"),
    C001("C001", "Inserted Successfully"),
    C002("C002", "Updated Successfully"),
    C003("C003", "Register Successfully"),
    C004("C004", "Status Update Successfully"),
    C005("C005", "Unlock Successfully"),
    C006("C006", "Delete Successfully"),
    C007("C007", "Execute Successfully"),
	E001("E001", "User not found"),
    E002("E002", "Password is incorrect"),
    E003("E003", "User is locked"),
    E004("E004", "Password is not match"),
    E005("E005", "Insert fail"),
    E006("E005", "Update fail"),
    E007("E007", "The last password change time is in 30 days"),
    E008("E008", "Permission Denied"),
    E009("E009", "Data access Exception"),
    E010("E010", "JWT token is invalid"),
    E011("E011", "User is existed"),
    E012("E012", "Email is in valid format"),
    E013("E013", "Password is in valid format"),
    E014("E014", "Phone number is in valid format"),
    E015("E015", "Old password is not match"),
    E016("E016", "User must change password"),
    E017("E017", "Unauthorized"),
    E018("E018", "Email is existed"),
    E019("E019", "Phone is existed"),
    E020("E020", "User is being locked. Contact admin to unlock this user"),
    E021("E021", "User is not active. Contact admin to active this user"),
    E022("E022", "Data access exception"),
    E023("E023", "Date field is in valid format, please correct it to yyyy-MM-dd HH:mm:ss"),
    E024("E024", "Resource not found"),
    E025("E025", "Conflict search condition"),
    E000("E000", "Internal Server Error");
    final String messageId;
    final String description;
}
