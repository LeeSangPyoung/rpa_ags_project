import { Input } from 'antd'
import { SearchIcon } from '../RPAIcons'
import { RPASearchActionProps } from './RPASearchAction.types'
import { useAuthStore } from '../../../stores'
import { GUEST_USER } from '../../../constants/auth-roles'

export const RPASearchAction = ({ filterAction, actionButton, inputRef, mtClass, ...props }: RPASearchActionProps) => {
    const userRoles = useAuthStore((state) => state.roles)
    const isGuestUser = userRoles.some((role) => GUEST_USER.includes(role))
    const marginTop = mtClass? mtClass : 'mt-6'

    return (
        <>
            <div className={`w-full flex justify-between ${marginTop}`}>
                <div className="space-x-3 flex items-center">
                    <Input allowClear prefix={<SearchIcon className="mr-2" />} className="w-[320px] h-10" ref={inputRef} {...props} />
                    {filterAction}
                </div>
                {!isGuestUser &&
                    <div className='flex space-x-2'>
                        {actionButton}
                    </div>
                }
            </div>
        </>
    )
}
