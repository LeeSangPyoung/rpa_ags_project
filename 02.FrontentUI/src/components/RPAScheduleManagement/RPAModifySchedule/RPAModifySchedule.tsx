import { DatePicker, Form, Input, Radio, Select } from "antd";
import { CalendarIcon, DownIcon } from "../../shared";
import { useScheduleStore } from "../../../stores";
import { RPAModifyScheduleProps } from "./RPAModifySchedule.types";
import { useState } from "react";
import { Dayjs } from "dayjs";

export const RPAModifySchedule = ({
  editForm,
  onHandleEditSchedule,
}: RPAModifyScheduleProps) => {
  const isLoading = useScheduleStore((state) => state.isLoading);

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState(null);

  const disabledEndDate = (current: Dayjs) => {
    const startDate = editForm.getFieldValue('startDate');
    if (!startDate) return false;
    return current.isBefore(startDate);
  };

  return (
    <Form
      form={editForm}
      layout="vertical"
      className="w-1/2"
      requiredMark={false}
      onFinish={onHandleEditSchedule}
    >
      <div className="flex justify-between mb-0">
        <Form.Item
          label={
            <span>
              RPA명
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="name"
          rules={[
            {
              required: true,
              message: "RPA명를 입력해 주세요.",
            },
          ]}
          className="w-1/2 mr-3"
        >
          <Input
            placeholder="RPA명 입력"
            className="h-10"
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label={
            <span>
              설명
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="description"
          rules={[
            {
              required: true,
              message: "RPA명를 입력해 주세요.",
            },
          ]}
          className="w-1/2"
          validateFirst
        >
          <Input
            placeholder="설명 입력"
            className="h-10"
            disabled={isLoading}
          />
        </Form.Item>
      </div>

      <div className="flex justify-between">
        <Form.Item
          label={
            <span>
              스케줄링
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="cronExpression"
          rules={[
            {
              required: true,
              message: "RPA명를 입력해 주세요.",
            },
          ]}
          className="w-1/2 mr-3"
        >
          <Input
            placeholder="스케줄링 입력"
            className="h-10"
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              상태
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="status"
          rules={[
            {
              required: true,
              message: "상태 입력해 주세요.",
            },
          ]}
          className="w-1/2"
        >
          <Select
            options={[
              { value: "ACTIVE", label: "ACTIVE" },
              { value: "INACTIVE", label: "INACTIVE" },
            ]}
            disabled={isLoading}
            suffixIcon={<DownIcon />}
            className="h-10"
            placeholder="상태 입력"
          />
        </Form.Item>
      </div>

      <div className="flex justify-between">
        <Form.Item
          label={
            <span>
              반복유무
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="repeatable"
          className="w-1/2 mr-3"
          validateFirst
        >
          <Radio.Group
            options={[
              { value: true, label: "예" },
              { value: false, label: "아니오" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              시작일시
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="startDate"
          rules={[
            {
              required: true,
              message: "시작일시 입력해 주세요.",
            },
          ]}
          className="w-1/2"
        >
          <DatePicker
            showTime
            prefix={<CalendarIcon className="mr-2" />}
            suffixIcon={<></>}
            placeholder="시작일시 입력"
            className="w-full h-10"
            disabled={isLoading}
          />
        </Form.Item>
      </div>

      <div className="flex justify-between">
        <Form.Item
          label={
            <span>
              종료일시
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="endDate"
          rules={[
            {
              required: true,
              message: "종료일시 입력해 주세요.",
            },
          ]}
          className="w-1/2 mr-3"
          validateFirst
        >
          <DatePicker
            showTime
            prefix={<CalendarIcon className="mr-2" />}
            suffixIcon={<></>}
            placeholder="종료일시 입력"
            className="w-full h-10"
            disabled={isLoading}
            disabledDate={disabledEndDate}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              댓글
              <span className="text-red-600 ml-1">*</span>
            </span>
          }
          name="comments"
          rules={[
            {
              required: true,
              message: "댓글 입력해 주세요.",
            },
          ]}
          className="w-1/2"
        >
          <Input
            placeholder="댓글 입력"
            className="h-10"
            disabled={isLoading}
          />
        </Form.Item>
      </div>
    </Form>
  );
};
