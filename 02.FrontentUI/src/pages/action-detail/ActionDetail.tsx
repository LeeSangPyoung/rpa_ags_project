import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Flex, Form, FormProps, notification, Table, TableProps, Tabs } from "antd";
import { AddStepIcon, EditIcon, RPAActionDetail, RPAAddStepModal, RPAContentHeader, RPADeleteSchedule, RPADeleteStepModal, RPAEditConfirmSchedule, RPAEditStepModal, RPAModifySchedule, RPAStepDetail, RPATabHeader } from "../../components";
import { tabItems } from "./utils/tabItem";
import { useLocation, useNavigate } from "react-router-dom";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { ActionList, Step, StepAction, StepParam } from "../../types";
import dayjs from "dayjs";
import { useParameterStore, useScheduleStore, useStepStore } from "../../stores";
import { toastMessage } from "../../utils/toast-message";
import { HOME_ROUTE } from "../../constants/constants";
import { MessageResponse } from "../../constants/message";
import { navigate } from "../../utils/navigation";
import { actionMasterTableColumns } from "./utils/tableColums";
import { stepParamColumns } from "./utils/stepParamColums";

export const ActionDetail = () => {
    const location = useLocation()
    const state: ActionList = useMemo(() => location.state || {}, [location.state]);
    const navigateSub = useNavigate();
    
    const [editActionForm] = Form.useForm()
    const [editStepForm] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();
    const [isModifySActionchedule, setIsModifyActionchedule] = useState<boolean>(false)
    const [tab, setTab] = useState<string>("1")
    const [dataStepSource, setDataStepSource] = useState<Step[] | undefined>([])
    const [dataParamSource, setDataParamSource] = useState<StepParam[] | undefined>([])
    const [stepItem, setStepItem] = useState<Step | undefined>(undefined)
    const [isOpenAddStepModal, setIsOpenAddStepModal] = useState<boolean>(false)
    const [addStepForm] = Form.useForm()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isDeleteError, setIsDeleteError] = useState<boolean>(false)
    const [isEditStepModalOpen, setIsEditStepModalOpen] = useState<boolean>(false)
    const [isDeleteStepModalOpen, setIsDeleteStepModalOpen] = useState<boolean>(false)
    const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] = useState<boolean>(false)

    const getListSteps = useStepStore((state) => state.getListSteps)
    const addStepAction = useStepStore((state) => state.addStepAction)
    const editStepAction = useStepStore((state) => state.editStepAction)
    const deleteStepAction = useStepStore((state) => state.deleteStepAction)
    const getStepParamByStepId = useParameterStore((state) => state.getStepParamByStepId)
    const isLoading = useStepStore((state) => state.isLoading)
    const modifyScheduleAction = useScheduleStore((state) => state.modifyScheduleAction)
    const manualExecuteAction = useScheduleStore((state) => state.manualExecuteAction)
    const deleteScheduleAction = useScheduleStore((state) => state.deleteScheduleAction)
    const setIsUpdateScheduleSuccess = useScheduleStore((state) => state.setIsUpdateScheduleSuccess)

    const onChange = (key: string) => {
        setTab(key)
    };

    const onModifyActionSchedule = () => {

        editActionForm.setFieldsValue({
            ...state,
            nextRunTime: state.nextRunTime ? dayjs(state.nextRunTime) : undefined,
            startDate: state.endDate ? dayjs(state.startDate) : undefined,
            endDate: state.endDate ? dayjs(state.endDate) : undefined
        })
        setIsModifyActionchedule(true)
    }

    const onSaveModifyActionSchedule = () => {
        setIsModifyActionchedule(false)
        editActionForm.submit()
    }

    const onHandleEditSchedule: FormProps<ActionList>["onFinish"] = async (values) => {
        const id = state.id
        const name = values.name
        const description = values.description
        const cronExpression = values.cronExpression
        const nextRunTime = values.nextRunTime ? dayjs(values.nextRunTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
        const status = values.status
        const repeatable = values.repeatable
        const startDate = values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD HH:mm:ss') : undefined;
        const endDate = values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD HH:mm:ss') : undefined;
        const comments = values.comments;
        const frstRegUserId = values.frstRegUserId
        try {
            await modifyScheduleAction({
                id,
                name,
                description,
                cronExpression,
                nextRunTime,
                status,
                repeatable,
                startDate,
                endDate,
                comments,
                frstRegUserId
            })
            toastMessage(api, "success", "스케줄이 성공적으로 업데이트되었습니다.") 
            setIsUpdateScheduleSuccess(true)
        } catch (error: any) {
            toastMessage(api, "error", "스케줄을 업데이트하는 동안 시스템 오류가 발생했습니다. 나중에 다시 시도해 주세요.")
        } finally {
            const record : ActionList = {
                id,
                name,
                description,
                cronExpression,
                nextRunTime,
                status,
                repeatable,
                startDate,
                endDate,
                comments,
                frstRegUserId
            }
            navigateSub(location.pathname, { state: record });   
            setIsModifyActionchedule(false)
        }
    }

    const onHandleManualExecution = async () => {
        try {
            await manualExecuteAction(state.id)
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }

    const getStepParam = useCallback(async (
        stepId: number,
        limit = 10,
        page = 1) => {
        try {
            const res = await getStepParamByStepId({ stepId, limit, page })
            setDataParamSource(res?.data?.page)
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }, [api, getStepParamByStepId])

    const getSteps = useCallback(async (
        rpaActionId: number = state.id,
        stepOrder?: number,
        rpaType?: string,
        scriptPath?: string,
        scriptFile?: string,
        accountGroupId?: string,
        repeatPerAccount?: boolean,
        targetFilePath?: string,
        downloadPath?: string,
        parallelExecution?: boolean,
        description?: string,
        name?: string,
        frstRegUserId?: string,
        frstRegDate?: string,
        chgRegUserId?: string,
        chgRegDate?: string,
        limit = 10,
        page = 1) => {

        try {
            const res = await getListSteps({
                rpaActionId,
                stepOrder,
                rpaType,
                scriptPath,
                scriptFile,
                accountGroupId,
                repeatPerAccount,
                targetFilePath,
                downloadPath,
                parallelExecution,
                description,
                name,
                frstRegUserId,
                frstRegDate,
                chgRegUserId,
                chgRegDate,
                limit,
                page
            })
            setDataStepSource(res?.data?.page)
            setStepItem(res?.data?.page?.[0])
            getStepParam(res?.data?.page?.[0]?.id as number)
        } catch (error: any) {
            setDataStepSource([])
        }
    }, [state.id, getListSteps, getStepParam])

    useEffect(() => {
        if (tab === '2') {
            getSteps()
        }
    }, [tab, getSteps, getStepParam])

    const onHandleChooseStepItem = (record: Step) => {
        setStepItem(record)
        getStepParam(record?.id)
    }

    const rowSelection: TableProps<StepParam>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: StepParam[]) => {
        },
    };

    const onHandleOpenDeleteModal = () => {
        setIsDeleteError(false)
        setIsDeleteModalOpen(true)
    }

    const onHandleDeleteSchedule = async () => {

        const actionId = Array.of(state.id)

        const res = await deleteScheduleAction(actionId)
        if (res?.messageId?.startsWith("C")) {
            toastMessage(api, "success", "스제줄이 성공적으로 삭제되었습니다", "")
            navigate(HOME_ROUTE)
        } else {
            setIsDeleteError(true)
        }
        setIsDeleteModalOpen(false)
    }

     const onHandleEditConfirmScheduleOpen = async () => {
        setIsEditConfirmModalOpen(true);
    }

    const onHandleEditConfirmSchedule = async () => {
        setIsEditConfirmModalOpen(false);
        onSaveModifyActionSchedule();
    }

    const handleOpenEditModal = () => {
        editStepForm.setFieldsValue(stepItem)
        setIsEditStepModalOpen(true)
    }
    const handleOpenAddModal = () => {
        setIsOpenAddStepModal(true)
    }

    const onHandleAddStep: FormProps<StepAction>["onFinish"] = async (values) => {
        try {
            await addStepAction(values)
            toastMessage(api, "success", "스케줄이 성공적으로 업데이트되었습니다.")
            getSteps()
            setIsOpenAddStepModal(false)

        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[error])
        }
    }


    const onHandleEditStep: FormProps<StepAction>["onFinish"] = async (values) => {
        const id = stepItem?.id
        try {
            await editStepAction({ ...values, id: id })
            setIsEditStepModalOpen(false)
            getSteps()
            toastMessage(api, "success", "변경 사항이 저장되었습니다.")
        } catch (error: any) {
            toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
        }
    }

    const onHandleOpenDeleteStepModal = () => {
        setIsDeleteStepModalOpen(true)
    }

    const onHandleDeleteStep = async() => {
        try {
            await deleteStepAction(stepItem?.id as number)
            getSteps()
            setIsDeleteStepModalOpen(false)
            toastMessage(api, "success", "Delete Step successfully")

        } catch (error: any) {
            toastMessage(api, "error", "요청을 처리하는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.")
        }
    }

    return (
        <>
            {contextHolder}
            <div className="px-6 pt-8 pb-5">
                <Flex vertical gap={24}>
                    <Flex vertical gap={'12px'}>
                        <Breadcrumb
                            separator={<RightOutlined />}
                            items={[
                                {
                                    title: '스케줄 관리',
                                    href: "/"
                                },
                                {
                                    title: '스케줄 상세',
                                },
                            ]}
                        />
                        <RPAContentHeader title="스케줄 상세" actionButton={
                            <>
                                <Button className="border-none text-button-tertiary-error-fg font-semibold mr-2" onClick={onHandleOpenDeleteModal}>스케줄 삭제</Button>
                                <Button size="large" className="py-2 px-3" type="primary" onClick={onHandleManualExecution}>수동 실행</Button>
                            </>
                        } />
                    </Flex>
                    <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} className="font-semibold" />

                </Flex>
                <div>
                    {tab === "1" ?
                        <>
                            {!isModifySActionchedule ?
                                <>
                                    <RPATabHeader title="정보" actionButton={
                                        <Button size="large" icon={<EditIcon />} className="text-[#463DC8] font-semibold" onClick={onModifyActionSchedule}>편집</Button>
                                    } />
                                    <RPAActionDetail action={state} />
                                </>
                                :
                                <>
                                    <RPATabHeader title="정보 편집" actionButton={
                                        <div className="flex justify-between space-x-3">
                                            <Button size="large" className="font-semibold" onClick={() => setIsModifyActionchedule(false)}>취소</Button>
                                            <Button size="large" className="text-[#463DC8] font-semibold" onClick={onHandleEditConfirmScheduleOpen}>저장</Button>
                                        </div>
                                    } />
                                    <div className="flex justify-center">
                                        <RPAModifySchedule editForm={editActionForm} onHandleEditSchedule={onHandleEditSchedule} />
                                    </div>
                                </>}
                        </>
                        :
                        <div className="pb-6 space-y-4">
                            <RPATabHeader title="STEP 그리드" actionButton={
                                <>
                                    <Button size="large" className="text-[#B42318] border-none font-semibold" onClick={onHandleOpenDeleteStepModal}>삭제</Button>
                                    <Divider type="vertical" className="h-full " />
                                    <Button size="large" className="text-[#414651] font-semibold" onClick={handleOpenEditModal}>STEP 편집</Button>
                                    <Button size="large" icon={<AddStepIcon color="#463DC8" />} className="text-[#463DC8] font-semibold" onClick={handleOpenAddModal}>STEP 추가</Button>
                                </>
                            } />
                            <Table
                                dataSource={dataStepSource}
                                columns={actionMasterTableColumns}
                                bordered
                                rowClassName={(record) =>
                                    record.id === stepItem?.id ? 'bg-[#F3F2FD]' : ''
                                }
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => onHandleChooseStepItem(record),
                                    };
                                }}
                                pagination={false}
                                loading={isLoading}
                                scroll={{ y: 20 * 10, x: 10 * 10 }}
                            />
                            <Divider />
                            {(Array.isArray(dataStepSource) && dataStepSource?.length > 0) &&
                                <div className="flex space-x-6">
                                    <div className="bg-[#FAFAFA] border-[1px] border-[#E9EAEB] p-4 space-y-3 flex-1 rounded-xl">
                                        <RPAStepDetail stepItem={stepItem} />
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <RPATabHeader title="파라미터 목록" actionButton={
                                            <>
                                                <Button className="border-none text-[#B42318]" type='text'>삭제</Button>
                                                <Divider type='vertical' className='h-full' />
                                                <Button className="text-[#414651]">변경 사항 저장</Button>
                                                <Button className="text-[#463DC8]">파라미터 추가</Button>
                                            </>
                                        } />
                                        <Table
                                            rowKey="id"
                                            dataSource={dataParamSource}
                                            bordered
                                            columns={stepParamColumns}
                                            rowSelection={{ ...rowSelection }}
                                            pagination={false}
                                        />

                                    </div>
                                </div>
                            }


                        </div>}

                </div>

            </div>
            <RPAAddStepModal
                actionId={state.id}
                addStepForm={addStepForm}
                isOpenAddStepModal={isOpenAddStepModal}
                setIsOpenAddStepModal={setIsOpenAddStepModal}
                onHandleAddStep={onHandleAddStep}
            />
            <RPADeleteSchedule
                isDeleteModalOpen={isDeleteModalOpen}
                isError={isDeleteError}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedAction={Array.of(state)}
                onHandleDeleteSchedule={onHandleDeleteSchedule}
            />
            <RPAEditConfirmSchedule
                isEditConfirmModalOpen={isEditConfirmModalOpen}
                setIsEditConfirmModalOpen={setIsEditConfirmModalOpen}
                onHandleEditConfirmSchedule={onHandleEditConfirmSchedule}
            />
            <RPAEditStepModal
                editStepForm={editStepForm}
                isOpenEditStepModal={isEditStepModalOpen}
                setIsOpenEditStepModal={setIsEditStepModalOpen}
                onHandleEditStep={onHandleEditStep}
            />
            <RPAAddStepModal
                actionId={state.id}
                addStepForm={addStepForm}
                isOpenAddStepModal={isOpenAddStepModal}
                setIsOpenAddStepModal={setIsOpenAddStepModal} onHandleAddStep={onHandleAddStep}
            />
            <RPADeleteStepModal
                isDeleteStepModalOpen={isDeleteStepModalOpen}
                setIsDeleteStepModalOpen={setIsDeleteStepModalOpen}
                onHandleDeleteStep={onHandleDeleteStep}
            />
        </>
    )
}
