package com.rpa.common;

public class Constant {

    private Constant(){

    }

    public static final String BLANK = "";
    public static final String SYSTEM_CAUSE = "System error exception";
    public static final String SECRET_KEY = "3XkAJthQRZsiqw==";
    public static final String AES = "AES";
    public static final String FORMAT_DATE_YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
    public static final String FORMAT_DATE_YYYY_MM_DD = "yyyy-MM-dd";

    public static final String EMAIL_REGEX = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{10,200}$";
    public static final String PHONE_NUMBER_REGEX = "^\\d{10,11}$";
}
