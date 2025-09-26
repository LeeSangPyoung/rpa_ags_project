import { PaginationProps, TableColumnsType } from "antd";
import { ActionList } from "../../../types";
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

export const actionScheduleTableColumns: TableColumnsType<ActionList> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: ActionList, index: number) => index + 1, // index starts from 0
        align: "center",
        width: 64,
        className: "font-medium",
        fixed: true,
    },

    {
        title: 'RPA명',
        dataIndex: 'name',
        key: 'name',
        className: "font-medium",
        width: 200,
        fixed: true,
    },
    {
        title: '스케줄링',
        dataIndex: 'cronExpression',
        key: 'cronExpression',
        className: "font-medium",
        width: 200,
    },
    {
        title: '다음실행일시',
        dataIndex: 'nextRunTime',
        key: 'nextRunTime',
        className: "font-medium",
        width: 200,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        sorter: (a, b) => (a.status ?? '').localeCompare(b.status ?? ''),
    },
    {
        title: '반복유무',
        dataIndex: 'repeatable',
        key: 'repeatable',
        render: (repeatable: ActionList["repeatable"]) =>
        (
            <div className="text-[#181D27] text-sm font-normal">{repeatable ? "예" : "아니오"}</div>
        ),

        width: 200,
    },
    {
        title: '시작일시',
        dataIndex: 'startDate',
        key: 'startDate',

        width: 200,
    },
    {
        title: '종료일시',
        dataIndex: 'endDate',
        key: 'endDate',

        width: 200,
    },
    {
        title: '설명',
        dataIndex: 'description',
        key: 'description',
        width: 300,
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