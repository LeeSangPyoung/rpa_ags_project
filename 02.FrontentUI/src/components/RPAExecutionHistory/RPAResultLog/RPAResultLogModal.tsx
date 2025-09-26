import {
  Modal,
  Table,
  TableColumnsType,
  Switch
} from "antd";
import { RPAResultLogProps } from "./RPAResultLogModal.types";
import { StepExecutionParamIn, StepExecutionParamOut } from "../../../types";

export const RPAResultLogModal = ({
  isResultLogModalOpen,
  stepExecutionSelected,
  setIsResultLogModalOpen,
  onCloseResultLogModal,
}: RPAResultLogProps) => {
  const paramInColumns: TableColumnsType<StepExecutionParamIn> = [
    {
      title: "순번",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: StepExecutionParamIn, index: number) => index + 1,
      align: "center",
      width: "25%",
      className: "font-medium",
      fixed: true,
    },

    {
      title: "파라미터 키 ",
      dataIndex: "paramKey",
      key: "paramKey",
      className: "font-medium",
      width: "25%",
      fixed: true,
    },
    {
      title: "동적 ",
      dataIndex: "isDynamic",
      key: "isDynamic",
      className: "font-medium",
      width: "25%",
      render: (value, record) => (
            <Switch
                checked={value}
            />
        ),
    },
    {
      title: "파라미터 값",
      dataIndex: "paramValue",
      key: "paramValue",
      className: "font-medium",
      width: "25%",
    },
  ];

  const paramOutColumns: TableColumnsType<StepExecutionParamOut> = [
    {
      title: "순번",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: StepExecutionParamOut, index: number) => index + 1,
      align: "center",
      width: "33.3%",
      className: "font-medium",
      fixed: true,
    },

    {
      title: "파라미터 키 ",
      dataIndex: "paramKey",
      key: "paramKey",
      className: "font-medium",
      width: "33.3%",
      fixed: true,
    },
    {
      title: "파라미터 값",
      dataIndex: "paramValue",
      key: "paramValue",
      className: "font-medium",
      width: "33.3%",
    },
  ];

  return (
    <Modal
      title={
        <div className="pb-4 text-lg text-button-secondary-fg">
          RPA 결과 상세{" "}
        </div>
      }
      closable={{ "aria-label": "Custom Close Button" }}
      className="py-4 px-4"
      open={isResultLogModalOpen}
      onCancel={onCloseResultLogModal}
      centered
      width={"50%"}
      footer={null}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          결과 로그
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          className="w-full h-[390px] resize-none border rounded p-2 text-xs bg-gray-50 overflow-auto"
          value={stepExecutionSelected?.resultLog}
          readOnly
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 w-1/2">
          <label className="block text-sm font-medium mb-1">
            입력 파라미터
          </label>
          <Table
            columns={paramInColumns}
            dataSource={stepExecutionSelected?.rpaStepParamInDtoList ?? []}
            pagination={false}
            size="small"
            bordered
            scroll={{ y: 264 }}
          />
        </div>
        <div className="flex-1 w-1/2">
          <label className="block text-sm font-medium mb-1">
            출력 파라미터
          </label>
          <Table
            columns={paramOutColumns}
            dataSource={stepExecutionSelected?.rpaStepParamOutDtoList ?? []}
            pagination={false}
            size="small"
            bordered
            scroll={{ y: 264 }}
          />
        </div>
      </div>
    </Modal>
  );
};
