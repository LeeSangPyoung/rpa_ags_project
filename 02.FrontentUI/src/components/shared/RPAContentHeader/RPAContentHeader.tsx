import { Typography } from "antd"
import { RPAContentHeaderProps } from "./RPAContentHeader.types"
import { useAuthStore } from "../../../stores"
import { GUEST_USER } from "../../../constants/auth-roles"

export const RPAContentHeader = ({ title, actionButton }: RPAContentHeaderProps) => {
    const userRoles = useAuthStore((state) => state.roles)

    const isGuestUser = userRoles.some((role) => GUEST_USER.includes(role))

    return (
        <>
            <div className="w-full flex justify-between">
                <Typography.Title level={3}>{title}</Typography.Title>
                {!isGuestUser &&
                    <div>
                        {actionButton}
                    </div>
                }
            </div>
        </>
    )
}
