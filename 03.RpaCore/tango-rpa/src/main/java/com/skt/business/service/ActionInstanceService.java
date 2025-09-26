package com.skt.business.service;


import com.skt.business.mapper.ActionInstanceMapper;
import com.skt.business.model.entity.ActionInstance;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActionInstanceService {

    private final ActionInstanceMapper actionInstanceMapper;

    /**
     * RPA ActionInstance INSERT (status = RUNNING)
     * @param instance 실행 인스턴스 정보
     * @return 생성된 ID
     */
    public Long insertActionInstance(ActionInstance instance) {
        log.info("🟢 ActionInstance INSERT 요청: actionId={}, status={}",
                instance.getRpaActionId(), instance.getStatus());

        actionInstanceMapper.insert(instance);
        log.info("✅ ActionInstance 생성 완료: id={}", instance.getId());
        return instance.getId();
    }

    /**
     * RPA ActionInstance 상태 업데이트
     * @param instance 업데이트할 인스턴스 정보
     */
    public void updateActionInstance(ActionInstance instance) {
        log.info("🟡 ActionInstance UPDATE 요청: id={}, status={}",
                instance.getId(), instance.getStatus());
        actionInstanceMapper.updateActionInstance(instance);
    }
	
}
