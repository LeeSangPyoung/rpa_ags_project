import { FormInstance } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { RegisterRequestType } from '../../../types';


export type RPARegisterFormProps = {
    form: FormInstance<RegisterRequestType>
    onFinish?: (value: RegisterRequestType) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity<RegisterRequestType>) => void;
}
