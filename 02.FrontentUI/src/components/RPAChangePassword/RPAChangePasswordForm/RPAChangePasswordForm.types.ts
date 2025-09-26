import { FormInstance } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

export type ChangePasswordFieldType = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export type RPAChangePasswordFormProps = {
    form: FormInstance<ChangePasswordFieldType>
    onFinish?: (value: ChangePasswordFieldType) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity<ChangePasswordFieldType>) => void;
}