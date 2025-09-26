package com.rpa.model.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchListUserParam {
    private String keyword;
    private Integer roleId;
    private List<Integer> statusIdList;
    private String createdAt;
    private String approveDate;
    private Integer offset;
    private Integer limit;
}
