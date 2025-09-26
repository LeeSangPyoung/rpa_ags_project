import { Card } from 'antd'
import alertIcon from "../../../asset/alert.svg"
import { RPALoginFailedProps } from './RPALoginFailed.types'


export const RPALoginFailed = ({errorMessage}: RPALoginFailedProps) => {
    return (
        <Card className="mb-4 bg-error-primary border-error-subtle p-3">
            <div className="flex items-start">
                <img src={alertIcon} className="mr-2" alt=''/>
                {errorMessage}
            </div>
        </Card>
    )
}
