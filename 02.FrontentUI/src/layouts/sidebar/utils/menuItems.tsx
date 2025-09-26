import { Link } from "react-router-dom";
import { AccountGroupIcon, HistoryIcon, ScheduleIcon, UserManageIcon } from "../../../components";
import { HOME_ROUTE, USER_MANAGEMENT, EXECUTION_HISTORY, ACCOUNT_GROUP } from "../../../constants/constants";

export const adminMenuItem = [
    {
        key: '1',
        icon: <ScheduleIcon />,
        label: <Link to={HOME_ROUTE}>스케줄 관리</Link>,
    },
    {
        key: '2',
        icon: <UserManageIcon />,
        label: <Link to={USER_MANAGEMENT}>사용자 관리</Link>,
    },
    {
        key: '3',
        icon: <HistoryIcon />,
        label: <Link to={EXECUTION_HISTORY}>실행 이력</Link>,
    },
    {
        key: '4',
        icon: <AccountGroupIcon />,
        label: <Link to={ACCOUNT_GROUP}>계정 그룹 관리</Link>,
    },
]

export const userMenuItem = [
    {
        key: '1',
        icon: <ScheduleIcon />,
        label: <Link to={HOME_ROUTE}>스케줄 관리</Link>,
    },
    {
        key: '2',
        icon: <HistoryIcon />,
        label: <Link to={EXECUTION_HISTORY}>실행 이력</Link>,
    },
    {
        key: '3',
        icon: <AccountGroupIcon />,
        label: <Link to={ACCOUNT_GROUP}>계정 그룹 관리</Link>,
    },
]
