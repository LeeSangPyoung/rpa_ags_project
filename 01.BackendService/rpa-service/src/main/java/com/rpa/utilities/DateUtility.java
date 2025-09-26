package com.rpa.utilities;

import com.rpa.common.CommonMessage;
import com.rpa.common.Constant;
import com.rpa.exception.RpaException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ObjectUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtility {
    /**
     * Convert string to date string with optional format
     *
     * @param dateTime     String
     * @param inputFormat  String
     * @param outputFormat String
     * @return String
     */
    public static String parse(String dateTime, String inputFormat, String outputFormat) {
        try {
            if (dateTime == null) {
                return Constant.BLANK;
            }
            // Convert string to date with inputFormat
            Date date = parse(dateTime, inputFormat);
            return new SimpleDateFormat(outputFormat).format(date);
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Convert string to date with optional date format
     *
     * @param dateString dateString
     * @param format     format
     * @return Date
     */
    public static Date parse(String dateString, String format) {
        try {
            if(StringUtils.isEmpty(dateString)) {
                return new Date(0);
            }
            return new SimpleDateFormat(format).parse(dateString);
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Convert string to date with optional date format
     *
     * @param date Date
     * @param format    String
     * @return String
     */
    public static String parse(Date date, String format) {
        try {
            if (date == null) {
                return "";
            }
            if (ObjectUtils.isEmpty(format)) {
                format = Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS;
            }
            return new SimpleDateFormat(format).format(date);
        } catch (Exception exception) {
            throw new RpaException(CommonMessage.E000.getMessageId());
        }
    }

    /**
     * Convert string to date with optional date format
     *
     * @param date Date
     * @return String
     */
    public static String parse(Date date) {
        return parse(date, Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS);
    }

    /**
     * Convert string to date with date format
     *
     * @param dateString dateString
     * @return Date
     */
    public static Date parse(String dateString) {
       return parse(dateString, Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS);
    }

    /**
     * Check if string is valid formatDate or not
     *
     * @param input String
     * @param formatDate String
     * @return boolean
     */
    public static boolean isValidFormatDate(String input, String formatDate) {
        if (StringUtils.isEmpty(input)) {
            return true;
        }
        try {
            DateFormat sdf = new SimpleDateFormat(formatDate);
            sdf.setLenient(false);
            Date date = sdf.parse(input);
            if (!input.equals(sdf.format(date))) {
                return false;
            }

        } catch (ParseException e) {
            return false;
        }
        return true;
    }

    /**
     * Check if string is valid default format date or not
     *
     * @param input String
     * @return boolean
     */
    public static boolean isValidFormatDate(String input) {
        if (StringUtils.isEmpty(input)) {
            return true;
        }
        try {
            new SimpleDateFormat(Constant.FORMAT_DATE_YYYY_MM_DD_HH_MM_SS).parse(input);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }



}
