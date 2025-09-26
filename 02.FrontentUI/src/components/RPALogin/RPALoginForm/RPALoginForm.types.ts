import { FormInstance } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { LoginRequestType } from '../../../types';

export type RPALoginFormProps = {
    form: FormInstance<LoginRequestType>
    isError?: boolean;
    errorMessage?: string;
    onFinish?: (value: LoginRequestType) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity<LoginRequestType>) => void;
}
