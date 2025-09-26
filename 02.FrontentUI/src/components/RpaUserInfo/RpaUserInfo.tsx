import { UserOutlined } from "@ant-design/icons"
import { Avatar, Badge, Typography } from "antd"
import { useAuthStore } from "../../stores"
import { LogoutIcon } from "../shared"
import { RpaUserInfoProps } from "./RpaUserInfo.types"

export const RpaUserInfo = ({ isCollapsed }: RpaUserInfoProps) => {
    const userId = useAuthStore((state) => state.userId)
    const logout = useAuthStore((state) => state.logout)

    const logoutAction = () => {
        logout();
    }

    return (
        <div className="flex w-full py-3 gap-2">
            {!isCollapsed && <>
                <Badge dot offset={[-5, 38]} color="green">
                    <Avatar size={44} src={null} className="bg-gray-400" icon={<UserOutlined />} />
                </Badge>
                <div className="flex-1">
                    <Typography.Text className="text-white font-medium text-base">
                        {userId}
                    </Typography.Text>
                    <Typography.Text className="text-secondary-on-brand">

                    </Typography.Text>
                </div>
            </>}

            <div className={`w-12 h-12 content-center py-3 ${isCollapsed ? 'px-5' : ''}`}>
                <LogoutIcon onClick={logoutAction} />
            </div>
        </div>
    )
}
