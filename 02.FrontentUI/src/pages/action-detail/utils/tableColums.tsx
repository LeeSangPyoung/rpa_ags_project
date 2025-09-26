import { TableColumnsType } from "antd";
import { Step } from "../../../types";

export const actionMasterTableColumns: TableColumnsType<Step> = [
    {
        title: 'RPA 작업 ID',
        dataIndex: 'rpaActionId',
        key: 'rpaActionId',
        className: "font-medium",
        width: 120,
    },
    {
        title: 'STEP 순서',
        dataIndex: 'stepOrder',
        key: 'stepOrder',
        className: "font-medium",
        width: 100,
    },
    {
        title: 'RPA 타입',
        dataIndex: 'rpaType',
        key: 'rpaType',
        className: "font-medium",
        width: 150,
    },
    {
        title: '스크립트 경로',
        dataIndex: 'scriptPath',
        key: 'scriptPath',
        className: "font-medium",
        width: 400,
    },
    {
        title: '스크립트 파일',
        dataIndex: 'scriptFile',
        key: 'scriptFile',
        width: 120,
    },
    {
        title: '계정 그룹 ID',
        dataIndex: 'accountGroupId',
        key: 'accountGroupId',
        width: 150,
    },
    {
        title: '계정 그룹명',
        dataIndex: 'accountGroupName',
        key: 'accountGroupName',

        width: 170,
    },
    {
        title: '계정별 반복',
        dataIndex: 'repeatPerAccount',
        key: 'repeatPerAccount',
        width: 160,
    },
    {
        title: '타겟 파일 경로',
        dataIndex: 'targetFilePath',
        key: 'targetFilePath',
        width: 400,
    },
    {
        title: '다운로드 경로',
        dataIndex: 'downloadPath',
        key: 'downloadPath',
        width: 400,
    },
    {
        title: '병렬 실행',
        dataIndex: 'parallelExecution',
        key: 'parallelExecution',
        width: 150,
    },
    {
        title: '설명',
        dataIndex: 'description',
        key: 'description',
        width: 200,
    },
    {
        title: '명칭',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: '최초 등록자',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 200,
    },
    {
        title: '최초 등록일',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 300,
    },
    {
        title: '변경자',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 200,
    },
    {
        title: '변경일',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 300,
    },
    

];