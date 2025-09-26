import { TableColumnsType, Tag } from "antd";
import { StepInstance, StepExecution, StepExecutionParamIn } from "../../../types";

export const paramInColumns: TableColumnsType<StepExecutionParamIn> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: StepExecutionParamIn, index: number) => index + 1,
        align: "center",
        width: '25%',
        className: "font-medium",
        fixed: true,
    },

    {
        title: '파라미터 키 ',
        dataIndex: 'paramKey',
        key: 'paramKey',
        className: "font-medium",
        width: '25%',
        fixed: true,
    },
    {
        title: '동적 ',
        dataIndex: 'isDynamic',
        key: 'isDynamic',
        className: "font-medium",
        width: '25%',
    },
    {
        title: '기본 파라미터 값',
        dataIndex: 'paramValueDefault',
        key: 'paramValueDefault',
        className: "font-medium",
        width: '25%',
    },
    

];

export const stepInstanceTableColumns: TableColumnsType<StepInstance> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: StepInstance, index: number) => index + 1, // index starts from 0
        align: "center",
        width: 69,
        className: "font-medium",
        fixed: true,
    },

    {
        title: 'RPA 작업 ID',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 109,
        fixed: true,
    },
    {
        title: 'RPA 작업명 ',
        dataIndex: 'rpaActionName',
        key: 'rpaActionName',
        className: "font-medium",
        width: 176,
    },
    {
        title: 'RPA STEP ID',
        dataIndex: 'rpaStepId',
        key: 'rpaStepId',
        className: "font-medium",
        width: 117,
    },
    {
        title: 'RPA STEP 명',
        dataIndex: 'rpaStepName',
        key: 'rpaStepName',
        width: 117,
    },
    {
        title: '설명',
        dataIndex: 'description',
        key: 'description',
        width: 142,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        width: 101,
        render: (status: StepInstance["status"]) =>
        (<Tag color={`${status === "FAIL" ? '#FEF3F2' : (status === "RUNNING" ? '#E0F2FE' : (status === "SUCCESS" ? '#DCFAE6' : '#FEF3F2'))}`} bordered>
            <div className={`${status === "FAIL" ? 'text-[#D92D20]' : (status === "RUNNING" ? 'text-[#0086C9]' : (status === "SUCCESS" ? 'text-[#079455]' : 'text-[#D92D20]'))}`}>
                {`${status === "FAIL" ? '실패' : (status === "RUNNING" ? '실행' : (status === "SUCCESS" ? '성공' : '반려'))}`}
            </div>
        </Tag>),
    },
    {
        title: '사작일시',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 170,
    },
    {
        title: '종료일시',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 170,
    },
    {
        title: '등록자',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 100,
    },
    {
        title: '등록일시',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 200,
    },
    {
        title: '수정자',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 100,
    },
    {
        title: '수정일시',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 200,
    },

];

export const stepExecutionTableColumns: TableColumnsType<StepExecution> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: StepExecution, index: number) => index + 1, // index starts from 0
        align: "center",
        width: 69,
        className: "font-medium",
        fixed: true,
    },

    {
        title: 'RPA 작업 ID',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 109,
        fixed: true,
    },
    {
        title: 'RPA 작업명 ',
        dataIndex: 'rpaActionName',
        key: 'rpaActionName',
        className: "font-medium",
        width: 176,
    },
    {
        title: 'RPA STEP ID',
        dataIndex: 'rpaStepId',
        key: 'rpaStepId',
        className: "font-medium",
        width: 117,
    },
    {
        title: 'RPA STEP 명',
        dataIndex: 'rpaStepName',
        key: 'rpaStepName',
        width: 117,
    },
    {
        title: '계정 ID',
        dataIndex: 'accountId',
        key: 'accountId',
        width: 84,
    },
    {
        title: '실행 그룹 ID',
        dataIndex: 'executionGroupId',
        key: 'executionGroupId',
        width: 178,
    },
    {
        title: '등록자',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 100,
    },
    {
        title: '등록일시',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 200,
    },
    {
        title: '수정자',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 100,
    },
    {
        title: '수정일시',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 200,
    },

];