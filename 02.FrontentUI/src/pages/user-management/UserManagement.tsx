import { Button, Divider, Form, FormProps, notification, Table, TableProps } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { AddUserIcon, FilterIcon, RPAContentHeader, RPACreateUserModal, RPADeleteUser, RPAEditUserModal, RPAResetPassword, RPASearchAction, RPAUserFilter, RPARejectUserModal } from '../../components'
import { DEFAULT_PAGE_SIZE } from '../../constants/constants'
import { useUserStore } from '../../stores/useUserStore'
import { CreateUserRequest, EditUserRequest, UserList, UserManagementRequest } from '../../types'
import { itemRender, userMangementTableColums } from './utils/tableColums'
import { toastMessage } from '../../utils/toast-message'
import { SelectProps } from 'antd/lib'
import { RetweetOutlined } from '@ant-design/icons'
import { MessageResponse } from '../../constants/message'
import { DEFAULT_PASSWORD } from "../../constants/constants";
import dayjs from 'dayjs'

type LabelRender = SelectProps['labelRender'];

export const statusLabelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
        return value;
    }
    return <span>no option</span>;
};
export const UserManagement = () => {
    const [dataSource, setDataSource] = useState<UserList[] | undefined>([])
    const [selectedUsers, setSelectedUsers] = useState<(string | undefined)[]>([]);
    const [selectedRowUsers, setSelectedRowUsers] = useState<UserList[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState<boolean>(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)

    const [resetForm] = Form.useForm()
    const [filterForm] = Form.useForm<UserManagementRequest>()
    const [isDeleteError, setIsDeleteError] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification();

    const [searchText, setSearchText] = useState<string>("")

    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(false)

    // call from store
    const getListUsers = useUserStore((state) => state.getListUsers)
    const approveUsers = useUserStore((state) => state.approveUsersAction)
    const unlockUsers = useUserStore((state) => state.unlockUsersAction)
    const editUser = useUserStore((state) => state.editUserAction)
    const createUser = useUserStore((state) => state.createUserAction)
    const deleteUsers = useUserStore((state) => state.deleteUsersAction)
    const rejectUsers = useUserStore((state) => state.rejectUsersAction)
    const totalItems = useUserStore((state) => state.totalItems)
    const resetPasswordUsers = useUserStore((state) => state.resetPasswordUsersAction)
    const isLoading = useUserStore((state) => state.isLoading)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false)
    const [userInfoSelected, setUserInfoSelected] = useState<UserList>();
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false)
    const [isRejectUserModalOpen, setIsRejectUserModalOpen] = useState<boolean>(false)

    const [createUserForm] = Form.useForm()


    const [editUserForm] = Form.useForm()


    const rowSelection: TableProps<UserList>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: UserList[]) => {
            const userIds = selectedRows.map((row) => row.userId)
            setSelectedUsers(userIds)
            setSelectedRowUsers(selectedRows)
        },
    };

    const getUsers = useCallback(async () => {
        try {
            console.log(filterForm.getFieldValue("roleId"));
            const res = await getListUsers({
                roleId: filterForm.getFieldValue("roleId")? filterForm.getFieldValue("roleId") : undefined  ,
                statusIdList: filterForm.getFieldValue("status") ? [filterForm.getFieldValue("status")] : undefined,
                keyword: searchText,
                createdAt: filterForm.getFieldValue("createdAt") ? dayjs(filterForm.getFieldValue("createdAt")).format('YYYY-MM-DD') : undefined,
                approveDate: filterForm.getFieldValue("approveDate") ? dayjs(filterForm.getFieldValue("approveDate")).format('YYYY-MM-DD') : undefined,
                page: currentPage,
                limit: pageSize
            })
            setDataSource(res?.data?.page)
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }

    }, [getListUsers, api, filterForm, searchText, currentPage, pageSize])

    useEffect(() => {
        getUsers()
    }, [getUsers])

    const onHandleFilter: FormProps<UserManagementRequest>["onFinish"] = async (values) => {
        getUsers()
        setIsFilterModalOpen(false)
    };

    const onHandleApproveUsers = async () => {
        try {
            await approveUsers(selectedUsers as string[])
            toastMessage(api, "success", "등록 요청 승인 완료", "등록 요청이 승인되었습니다.")
            getUsers();
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }



    const transformedRows = selectedRowUsers.map(row => ({
        ...row,
        password: DEFAULT_PASSWORD
    }));


    useEffect(() => {
        if (isResetPasswordModalOpen) {
            resetForm.setFieldsValue({ resetForm: transformedRows });
        }
    }, [isResetPasswordModalOpen, selectedRowUsers, resetForm, transformedRows]);

    const onHandleOpenResetPasswordModal = () => {
        setIsResetPasswordModalOpen(true)
    }


    const onHandleResetPasswordUsers : FormProps<any>["onFinish"] = async (values) => {
        try {
            const values = await resetForm.validateFields();
            const res = await resetPasswordUsers(values?.resetForm);
            if (res?.messageId?.startsWith("C")) {
                setIsResetPasswordModalOpen(false);
                toastMessage(api, "success", "비밀번호가 성공적으로 재설정되었습니다.")
            }

        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }

    const onHandleDeleteUsers = async () => {
        try {
            await deleteUsers(selectedUsers as string[])
            toastMessage(api, "success", "사용자가 성공적으로 삭제되었습니다.")
            setIsDeleteUserModalOpen(false)
            setSelectedUsers([])
            getUsers();
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        } finally {
            setIsDeleteError(true)

        }

    }

    const onHandleRejectUsers = async () => {
        try {
            await rejectUsers(selectedUsers as string[])
            toastMessage(api, "success", "해당 사용자의 등록은 반려되었습니다.")
            setIsRejectUserModalOpen(false)
            setSelectedUsers([])
            getUsers();
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }


    const onHandleOpenDeleteModal = () => {
        setIsDeleteError(false)
        setIsDeleteUserModalOpen(true)
    }

    const onHandleOpenRejectModal = () => {
        setIsRejectUserModalOpen(true)
    }
    const onHandleUnlockUsers = async () => {
        try {
            await unlockUsers(selectedUsers as string[])
            getUsers();
            toastMessage(api, "success", "계정 잠금 해제 완료.", "선택한 계정이 잠금 해제되었습니다. 사용자는 이제 다시 로그인할 수 있습니다.")
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }

    }

    const onOpenEditUserModal = (record: UserList) => {
        editUserForm.setFieldsValue(record);
        setUserInfoSelected(record)
        setIsModalOpen(true)
    }

    const onCloseEditUserModal = () => {
        setIsModalOpen(false)
        setIsEditUserModalOpen(false)
    }

    useEffect(() => {
        if (isEditUserModalOpen) {
            editUserForm.setFieldsValue({ editUserForm: userInfoSelected });
        }
    }, [isEditUserModalOpen, userInfoSelected, editUserForm]);

    const onEditUserFinish: FormProps<EditUserRequest>["onFinish"] = async (values) => {
        const userId = values.userId
        const userName = values.userName
        const email = values.email
        const phoneNumber = values.phoneNumber
        const roleId = values.roleId
        try {
            await editUser({ userId, userName, email, phoneNumber, roleId })
            onCloseEditUserModal()
            toastMessage(api, "success", "사용자 정보 업데이트 성공", "사용자의 정보가 성공적으로 업데이트되었습니다.")
            getUsers();
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }


    };

    const handleErrorMessage = (res: any) => {
        switch (res?.messageId) {
            case "E011":
                createUserForm.setFields([{
                    name: "userId",
                    errors: [MessageResponse["E011"]],
                }])
                break;
            case "E018":
                createUserForm.setFields([{
                    name: "email",
                    errors: [MessageResponse["E018"]],
                }])
                break;

            case "E019":
                createUserForm.setFields([{
                    name: "phoneNumber",
                    errors: [MessageResponse["E019"]],
                }])
                break;
            default:

                break;

        }
    }

    const onCreateUserFinish: FormProps<CreateUserRequest>["onFinish"] = async (values) => {
        const userId = values.userId;
        const userName = values.userName;
        const email = values.email;
        const phoneNumber = values.phoneNumber;
        const roleId = values.roleId;
        const password = values.password
        try {
            await createUser({ userId, password, userName, email, phoneNumber, roleId })
            toastMessage(api, "success", "새 사용자가 성공적으로 추가되었습니다.")
            setIsCreateUserModalOpen(false)
            getUsers();
        } catch (error: any) {
            if (error?.status === 200) {
                handleErrorMessage(error)
            } else {
                toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
                setIsCreateUserModalOpen(false)
            }
        }
    };

    const onHandleSearch = (value: string) => {
        setSearchText(value)
        setCurrentPage(1)
    }

    const onResetFilter = () => {
        filterForm.resetFields()
        getUsers()
    }

    const isUnlockUserAvailable = selectedUsers.length === 0 || selectedRowUsers.some(u => u.statusId !== 3)
    const isHandleRequestUserAvailable = selectedUsers.length === 0 || selectedRowUsers.some(u => u.statusId !== 2)

    return (
        <>
            {contextHolder}
            <div className="pt-8 px-6 pb-6">

                <RPAContentHeader title="사용자 관리" actionButton={
                    <Button size="large" className="py-2 px-3" icon={<AddUserIcon />} onClick={() => setIsCreateUserModalOpen(true)} type="primary">사용자 추가</Button>
                } />
                <RPASearchAction
                    placeholder='검색'
                    onBlur={(e) => onHandleSearch(e.target.value)}
                    onPressEnter={(e) => onHandleSearch((e.target as HTMLInputElement).value)}
                    filterAction={
                        <>
                            <Button icon={<FilterIcon />} onClick={() => setIsFilterModalOpen(true)}>필터</Button>
                            <Button type='text' icon={<RetweetOutlined />} onClick={onResetFilter}>필터링 초기화</Button>
                        </>}
                    actionButton={
                        <>
                            <Button className="border-none text-[#B42318]" type='text' disabled={selectedUsers.length === 0} onClick={onHandleOpenDeleteModal}>삭제</Button>
                            <Divider type='vertical' className='h-full' />
                            <Button className="text-[#414651]" disabled={selectedUsers.length === 0} onClick={onHandleOpenResetPasswordModal}>비밀번호 초기화</Button>
                            <Button className="text-[#463DC8]" disabled={isUnlockUserAvailable} onClick={onHandleUnlockUsers}>계정 잠금 해제</Button>
                            <Divider type='vertical' className='h-full' />
                            <Button className="text-[#414651]" disabled={isHandleRequestUserAvailable} onClick={onHandleOpenRejectModal}>반려</Button>
                            <Button type='primary' onClick={onHandleApproveUsers} disabled={isHandleRequestUserAvailable}>승인</Button>
                        </>
                    }
                />
            </div>
            <div className="px-6 pb-8 space-y-3">
                <div className='flex space-x-[6px] items-center'>
                    <div className='text-sm font-semibold text-[#181D27]'>Total</div>
                    <div className="min-w-[20px] bg-[#F3F2FD] border-[#B9B5F4] border-[1px] px-1 py-[1px] rounded"><span className='text-[#463DC8] text-xs'>{totalItems}</span></div>
                </div>
                <Table
                    rowKey="id"
                    dataSource={dataSource}
                    columns={userMangementTableColums}
                    bordered
                    loading={isLoading}
                    rowSelection={{ ...rowSelection }}
                    scroll={{ y : 598}}
                    onRow={(record) => {
                        return {
                            onClick: () => onOpenEditUserModal(record),
                        };
                    }}
                    pagination={{
                        position: ["bottomCenter"],
                        current: currentPage,
                        pageSize: pageSize,
                        total: (searchText?.length > 0) ? dataSource?.length : totalItems,
                        showSizeChanger: true,
                        pageSizeOptions: ['15', '30', '50', '100'],
                        onChange: (page, pageSize) => {
                            setCurrentPage(page);
                            setPageSize(pageSize);
                        },
                        onShowSizeChange(current, size) {
                            setCurrentPage(1);
                            setPageSize(size)
                        },
                        itemRender: itemRender,
                    }}

                />
            </div>
            <RPAUserFilter
                filterForm={filterForm}
                isFilterModalOpen={isFilterModalOpen}
                setIsFilterModalOpen={setIsFilterModalOpen}
                onHandleFilter={onHandleFilter}
            />
            <RPAResetPassword
                resetForm={resetForm}
                selectedRowUsers={selectedRowUsers}
                isResetPasswordModalOpen={isResetPasswordModalOpen}
                setIsResetPasswordModalOpen={setIsResetPasswordModalOpen}
                onHandleResetPasswordUsers={onHandleResetPasswordUsers}
            />
            <RPADeleteUser
                isError={isDeleteError}
                selectedUsers={selectedUsers}
                isDeleteUserModalOpen={isDeleteUserModalOpen}
                onHandleDeleteUsers={onHandleDeleteUsers}
                setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
            />
            <RPAEditUserModal
                isModalOpen={isModalOpen}
                isEditUserModalOpen={isEditUserModalOpen}
                userInfoSelected={userInfoSelected}
                editUserForm={editUserForm}
                setIsEditUserModalOpen={setIsEditUserModalOpen}
                onCloseEditUserModal={onCloseEditUserModal}
                onEditUserFinish={onEditUserFinish}
            />
            <RPACreateUserModal
                createUserForm={createUserForm}
                isCreateUserModalOpen={isCreateUserModalOpen}
                setIsCreateUserModalOpen={setIsCreateUserModalOpen}
                onFinish={onCreateUserFinish}
            />
            <RPARejectUserModal
                selectedUsers = {selectedUsers}
                isRejectUserModalOpen={isRejectUserModalOpen}
                setIsRejectUserModalOpen={setIsRejectUserModalOpen}
                onHandleRejectUsers={onHandleRejectUsers}
            />
        </>
    )
}
