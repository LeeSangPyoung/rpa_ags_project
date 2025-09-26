package com.rpa.model.websocket;

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
public class RpaActionChangeMessage {
    private Integer id;
    private String status;
    private String startDate;
    private String endDate;
}
