import { Typography } from "antd"
import { RPAStepDetailProps } from "./RPAStepDetail.types"

export const RPAStepDetail = ({ stepItem }: RPAStepDetailProps) => {
    return (
        <>
            <Typography.Title level={5}>상세 정보</Typography.Title>
            <div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>RPA 작업 ID</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.rpaActionId}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>STEP 순서</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.stepOrder}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>RPA 타입</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.rpaType}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>스크립트 파일</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.scriptFile}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>계정 그룹 ID</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.accountGroupId}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>계정 그룹명</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.accountGroupName}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>계정별 반복</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.repeatPerAccount === true ? '예' : '아니오'}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>다운로드 경로</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.downloadPath}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>타겟 파일 경로</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.targetFilePath}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2 " >
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>스크립트 경로</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.scriptPath}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>병렬 실행</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.parallelExecution === true ? '예' : '아니오'}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>설명</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.description}</div>
                    </div>

                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>명칭</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.name}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>최초 등록자</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.frstRegUserId}</div>
                    </div>
                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>최초 등록일</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.frstRegDate}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>변경자</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.chgRegUserId}</div>
                    </div>
                </div>
                <div className="flex space-x-5">
                    <div className="flex justify-between flex-1 py">
                        <div className="text-base text-[#717680] font-normal" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>변경일</div>
                        <div className="text-base text-[#181D27] font-semibold" style={{ maxWidth: '70%', wordBreak: 'break-all' }}>{stepItem?.chgRegDate}</div>
                    </div>
                    <div className="flex justify-between flex-1 py-2">

                    </div>
                </div>

            </div>
        </>
    )
}
