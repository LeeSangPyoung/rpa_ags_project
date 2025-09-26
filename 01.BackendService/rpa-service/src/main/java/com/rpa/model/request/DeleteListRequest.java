package com.rpa.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DeleteListRequest {
    @NotEmpty
    private List<Integer> idList;
}