package com.rpa.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RpaStatusDto {
    private Integer statusId;
    private String status;
    private String description;
}