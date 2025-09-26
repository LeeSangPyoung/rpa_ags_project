package com.skt.business.mapper;

import com.skt.business.model.entity.ActionInstance;

public interface ActionInstanceMapper {
    // ✅ 실행 인스턴스 INSERT
    void insert(ActionInstance instance);

    // ✅ 실행 인스턴스 UPDATE
    void updateActionInstance(ActionInstance instance);
}
