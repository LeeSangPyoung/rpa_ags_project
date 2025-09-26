import { PaginationProps, TableColumnsType, Tag } from "antd";
import { UserList } from "../../../types";
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

const formatPhoneNumber = (phone: string) => {
    return phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
};

export const userMangementTableColums: TableColumnsType<UserList> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: UserList, index: number) => index + 1, // index starts from 0
        align: "center",
        width: 64,
        className: "font-medium"
    },
     {
        title: 'Role',
        dataIndex: 'roleName',
        key: 'roleName',
        className: "font-medium",
        width : 100
    },
    {
        title: '사용자 이름',
        dataIndex: 'userName',
        key: 'userName',
        className: "font-medium",
        sorter: (a, b) => (a.userName ?? '').localeCompare(b.userName ?? ''),
        width : 200
    },
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        className: "font-medium",
        sorter: (a, b) => (a.userId ?? '').localeCompare(b.userId ?? ''),
        width : 200
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        render: (status: UserList["status"]) =>
        (<Tag color={`${status === "ACTIVE" ? '#DCFAE6' : (status === "SUBMITTED" ? '#E0F2FE' : (status === "LOCKED" ? '#F5F5F5' : '#FEF3F2'))}`} bordered>
            <div className={`${status === "ACTIVE" ? 'text-[#079455]' : (status === "SUBMITTED" ? 'text-[#0086C9]' : (status === "LOCKED" ? 'text-[#414651]' : 'text-[#D92D20]'))}`}>
                {`${status === "ACTIVE" ? '활성화됨' : (status === "SUBMITTED" ? '승인요청' : (status === "LOCKED" ? '잠김' : '반려'))}`}
            </div>
        </Tag>),
        sorter: (a, b) => (a.statusId ?? 0) - (b.statusId ?? 0),
        width : 100
    },
    {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
        width: 300,
        render: (text) => (
            <div className="email-cell">{text}</div>
        ),
    },
    {
        title: '전화번호',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (phone) => formatPhoneNumber(phone),
        width: 180,
    },
    {
        title: '등록 날짜',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 180,
    },
    {
        title: '승인 날짜',
        dataIndex: 'approveDate',
        key: 'approveDate',
        width: 180,
    },
];