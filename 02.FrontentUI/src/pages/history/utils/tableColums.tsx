import { PaginationProps, TableColumnsType, Tag } from "antd";
import { ActionInstance, StepInstance, StepExecution } from "../../../types";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <a><ArrowLeftOutlined className="mr-2" />이전</a>;

    }
    if (type === 'next') {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <a>다음<ArrowRightOutlined className="ml-2" /></a>;
    }
    return originalElement;
};

export const actionInstanceTableColumns: TableColumnsType<ActionInstance> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: ActionInstance, index: number) => index + 1,
        align: "center",
        width: 69,
        className: "font-medium",
    },

    {
        title: 'RPA 작업',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 94,
    },
    {
        title: 'RPA 작업명 ',
        dataIndex: 'rpaActionName',
        key: 'rpaActionName',
        className: "font-medium",
        width: 176,
    },
    {
        title: '설명',
        dataIndex: 'description',
        key: 'description',
        className: "font-medium",
        width: 282,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        render: (status: ActionInstance["status"]) =>
        (<Tag color={`${status === "FAIL" ? '#FEF3F2' : (status === "RUNNING" ? '#E0F2FE' : (status === "SUCCESS" ? '#DCFAE6' : '#FEF3F2'))}`} bordered>
            <div className={`${status === "FAIL" ? 'text-[#D92D20]' : (status === "RUNNING" ? 'text-[#0086C9]' : (status === "SUCCESS" ? 'text-[#079455]' : 'text-[#D92D20]'))}`}>
                {`${status === "FAIL" ? '실패' : (status === "RUNNING" ? '실행' : (status === "SUCCESS" ? '성공' : '반려'))}`}
            </div>
        </Tag>),
        width: 100,
    },
    {
        title: '시작일시',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 200,
    },
    {
        title: '종료일시',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 200,
    },
    {
        title: 'Triggered by',
        dataIndex: 'triggeredBy',
        key: 'triggeredBy',
        width: 120,
    },
    {
        title: '최초 등록 사용자 ID',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 130,
    },
    {
        title: '최초 등록 날짜',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 200,
    },
    {
        title: '등록 변경 사용자 ID',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 130,
    },
    {
        title: '등록 변경 날짜',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 200,
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
    },

    {
        title: 'RPA 작업 ID',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 109,
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
        render: (status: StepInstance["status"]) =>
        (<Tag color={`${status === "FAIL" ? '#FEF3F2' : (status === "RUNNING" ? '#E0F2FE' : (status === "SUCCESS" ? '#DCFAE6' : '#FEF3F2'))}`} bordered>
            <div className={`${status === "FAIL" ? 'text-[#D92D20]' : (status === "RUNNING" ? 'text-[#0086C9]' : (status === "SUCCESS" ? 'text-[#079455]' : 'text-[#D92D20]'))}`}>
                {`${status === "FAIL" ? '실패' : (status === "RUNNING" ? '실행' : (status === "SUCCESS" ? '성공' : '반려'))}`}
            </div>
        </Tag>),
        width: 100,
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
        title: '최초 등록 사용자 ID',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 130,
    },
    {
        title: '최초 등록 날짜',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 200,
    },
    {
        title: '등록 변경 사용자 ID',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 130,
    },
    {
        title: '등록 변경 날짜 ',
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
    },

    {
        title: 'RPA 작업 ID',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 100,
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
        width: 180,
    },
    {
        title: '최초 등록 사용자 ID',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 130,
    },
    {
        title: '최초 등록 날짜',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 200,
    },
    {
        title: '등록 변경 사용자 ID',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 130,
    },
    {
        title: '등록 변경 날짜 ',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 200,
    },

];