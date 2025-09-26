import { Switch, TableColumnsType } from "antd";
import { StepParam } from "../../../types";

export const stepParamColumns: TableColumnsType<StepParam> = [
    {
        title: 'STEP ID',
        dataIndex: 'stepId',
        key: 'stepId',
        className: "font-medium",
        width: 120,
    },
    {
        title: '파라미터 키',
        dataIndex: 'paramKey',
        key: 'paramKey',
        className: "font-medium",
        width: 200,
    },
    {
        title: '동적',
        dataIndex: 'isDynamic',
        key: 'isDynamic',
        className: "font-medium",
        width: 100,
        render: (value, record) => (
            <Switch
                checked={value}
                onChange={(checked) => {
                    // You can update state or call an API here
                }}
            />
        ),

    },
    {
        title: '파라미터 값 템플릿',
        dataIndex: 'paramValueTemplate',
        key: 'paramValueTemplate',
        className: "font-medium",
        width: 200,
    },
];