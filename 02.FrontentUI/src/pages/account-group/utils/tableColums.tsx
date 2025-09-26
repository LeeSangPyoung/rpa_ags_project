import React, { useState } from 'react';
import { PaginationProps, TableColumnsType ,TableProps } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Account, AccountGroup } from "../../../types";

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

export type ColumnTypes = Exclude<TableProps<Account>['columns'], undefined>;

export interface EditableCellProps {
  editable: boolean;
  dataIndex: keyof Account;
  title: React.ReactNode;
  record: Account;
  handleSave: (record: Account) => void;
}

export interface EditableRowProps {
  index: number;
}

export const accountGroupColumns: TableColumnsType<AccountGroup> = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: AccountGroup, index: number) => index + 1,
        align: "center",
        width: 69,
        className: "font-medium",
    },

    {
        title: '그룹명',
        dataIndex: 'groupName',
        key: 'groupName',
        className: "font-medium",
        width: 151,
    },
    {
        title: '계정수',
        dataIndex: 'accountTotal',
        key: 'accountTotal',
        className: "font-medium",
        width: 80,
    },
    {
        title: '등록자',
        dataIndex: 'frstRegUserId',
        key: 'frstRegUserId',
        width: 90,
    },
    {
        title: '등록일시',
        dataIndex: 'frstRegDate',
        key: 'frstRegDate',
        width: 130,
    },
    {
        title: '수정자',
        dataIndex: 'chgRegUserId',
        key: 'chgRegUserId',
        width: 90,
    },
    {
        title: '수정일시',
        dataIndex: 'chgRegDate',
        key: 'chgRegDate',
        width: 130,
    },

];

export const accountColumns : (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: '순번',
        dataIndex: 'index',
        key: 'index',
        render: (_: any, __: Account, index: number) => index + 1,
        width: "10%",
        className: "font-medium",
    },

    {
        title: '계정 / 로그인 ID',
        dataIndex: 'groupName',
        key: 'groupName',
        className: "font-medium",
        width: "20%",
        editable: true
    },
    {
        title: '계정',
        dataIndex: 'accountNo',
        key: 'accountNo',
        className: "font-medium",
        width: "18%",
        editable: true
    },
    {
        title: '키',
        dataIndex: 'accountKey',
        key: 'accountKey',
        className: "font-medium",
        width: "15%",
        editable: true
    },
    {
        title: '값',
        dataIndex: 'value',
        key: 'value',
        className: "font-medium",
        editable: true
    },

];
