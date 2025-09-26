import { Form, Input, Modal, Radio, Select } from "antd"
import { DownIcon, RPAUpload } from "../../shared"
import { useScheduleStore, useStepStore } from "../../../stores"
import { RPAAddStepModalProps } from "./RPAAddStepModal.types"
import { useEffect, useState } from "react"
import { ActionCombobox } from "../../../types"

export const RPAAddStepModal = ({ actionId, addStepForm, isOpenAddStepModal, setIsOpenAddStepModal, onHandleAddStep }: RPAAddStepModalProps) => {
    const [actionType, setActionType] = useState<ActionCombobox[]>()
    const getActionType = useScheduleStore((state) => state.getActionTypeAction)
    const isLoading = useStepStore((state) => state.isLoading)

    useEffect(() => {
        const getActionTypeForStep = async () => {
            const response = await getActionType();
            if (response?.data) {
                setActionType(response.data)
            } else {
                setActionType([])
            }
        }
        getActionTypeForStep()
    }, [getActionType])

    useEffect(() => {
        if (!isOpenAddStepModal) {
        addStepForm.resetFields();
        }
    }, [isOpenAddStepModal, addStepForm]);


    return (
        <Modal
            title={<div className="pb-4 text-lg text-button-secondary-fg">STEP 추가</div>}
            closable={{ 'aria-label': 'Custom Close Button' }}
            style={{ width: '700px' }}
            open={isOpenAddStepModal}
            onOk={() => addStepForm.submit()}
            onCancel={() => setIsOpenAddStepModal(false)}
            centered
            okButtonProps={{ size: "large" }}
            cancelButtonProps={{ size: "large" }}
            width={662}
        >
            <Form form={addStepForm} layout="vertical" requiredMark={false} onFinish={onHandleAddStep}
                initialValues={{ repeatPerAccount: true, parallelExecution : true }}>
                <div className="flex justify-between mb-0">
                    <Form.Item
                        label={
                            <span>
                                RPA 작업 ID
                                <span className="text-red-600 ml-1">*</span>
                            </span>
                        }
                        name="rpaActionId"
                        initialValue={actionId}
                        className="w-1/2 mr-3"
                    >
                        <Input placeholder="RPA 작업 ID 입력" className="h-10" disabled={isLoading} value={actionId} readOnly />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                STEP 순서

                            </span>
                        }
                        name="stepOrder"
                        rules={[
                            {
                                pattern: /^[0-9]+$/,
                                message: '숫자만 입력할 수 있습니다',
                            },
                        ]}
                        className="w-1/2"
                        validateFirst
                    >
                        <Input placeholder="입력 STEP 순서" className="h-10 w-full" disabled={isLoading} />
                    </Form.Item>
                </div>

                <div className="flex justify-between">
                    <Form.Item
                        label={
                            <span>
                                RPA 타입
                            </span>
                        }
                        name="rpaType"
                        className="w-1/2 mr-3"
                    >
                        <Select
                            options={actionType}
                            disabled={isLoading}
                            suffixIcon={<DownIcon />}
                            className="h-10"
                            placeholder="선택 RPA 타입" />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                스크립트 경로
                            </span>
                        }
                        name="scriptPath"
                        className="w-1/2"
                        validateFirst
                    >
                        <Input placeholder="입력 스크립트 경로" className="h-10" disabled={isLoading} />
                    </Form.Item>
                </div>

                <div className="flex justify-between">
                    <Form.Item
                        label={
                            <span>
                                스크립트 파일
                            </span>
                        }
                        name="scriptFile"
                        className="w-1/2 mr-3"
                    >
                        <RPAUpload />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                계정 그룹 ID
                            </span>
                        }
                        name="accountGroupId"
                        className="w-1/2"
                        validateFirst
                    >

                        <Input placeholder="선택 계정 그룹 ID" className="h-10" disabled={isLoading} />
                    </Form.Item>
                </div>

                <div className="flex justify-between">
                    <Form.Item
                        label={
                            <span>
                                계정별 반복
                            </span>
                        }
                        name="repeatPerAccount"
                        className="w-1/2 mr-3"
                    >
                        <Radio.Group
                            options={[
                                { value: true, label: '예' },
                                { value: false, label: '아니오' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                타겟 파일 경로
                            </span>
                        }
                        name="targetFilePath"
                        className="w-1/2"
                        validateFirst
                    >
                        <Input placeholder="입력 타겟 파일 경로" className="h-10" disabled={isLoading} />
                    </Form.Item>
                </div>
                <div className="flex justify-between mb-0">
                    <Form.Item
                        label={
                            <span>
                                다운로드 경로
                            </span>
                        }
                        name="downloadPath"
                        className="w-1/2 mr-3"
                    >
                        <Input placeholder="입력 다운로드 경로" className="h-10" disabled={isLoading} />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                병렬 실행
                            </span>
                        }
                        name="parallelExecution"
                        className="w-1/2"
                        validateFirst
                    >
                        <Radio.Group
                            options={[
                                { value: true, label: '예' },
                                { value: false, label: '아니오' },
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className="flex justify-between mb-0">
                    <Form.Item
                        label={
                            <span>
                                명칭
                            </span>
                        }
                        name="name"
                        className="w-1/2 mr-3"
                    >
                        <Input placeholder="입력 명칭" className="h-10" disabled={isLoading} />
                    </Form.Item>

                </div>
                <div className="flex">
                    <Form.Item
                        label={
                            <span>
                                설명
                            </span>
                        }
                        name="description"
                        className="w-full"
                    >
                        <Input.TextArea rows={6} placeholder="설명을 입력하세요" />
                    </Form.Item>

                </div>
            </Form>
        </Modal>
    )
}
