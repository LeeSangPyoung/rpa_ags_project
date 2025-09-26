import { Button, Form, FormProps, notification, Table, TableProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CalendarPlusIcon, FilterIcon, RPAAddSchedule, RPAContentHeader, RPADeleteSchedule, RPAScheduleFilter, RPASearchAction } from "../../components";
import { DEFAULT_PAGE_SIZE, TOPIC, WS_ENDPOINT } from "../../constants/constants";
import { useScheduleStore } from "../../stores/useScheduleStore";
import { ActionList, ActionScheduleRequest, AddScheduleRequest, WebSocketUpdate } from "../../types";
import { actionScheduleTableColumns, itemRender } from "./utils/tableColums";
import dayjs from "dayjs";
import { RetweetOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toastMessage } from "../../utils/toast-message";
import { MessageResponse } from "../../constants/message";
import { useWebSocket } from "../../hooks/useWebSocket";

export const ScheduleManagement = () => {

  const [dataSource, setDataSource] = useState<ActionList[] | undefined>([])
  const [selectedAction, setSelectedAction] = useState<ActionList[] | undefined>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState<boolean>(false)

  const [filterForm] = Form.useForm<ActionScheduleRequest>()
  const navigate = useNavigate()
  const [addForm] = Form.useForm()


  //call from store
  const getListSchedules = useScheduleStore((state) => state.getListSchedules)
  const addActionSchedule = useScheduleStore((state) => state.addScheduleAction)
  const deleteScheduleAction = useScheduleStore((state) => state.deleteScheduleAction)
  const setIsUpdateScheduleSuccess = useScheduleStore((state) => state.setIsUpdateScheduleSuccess)
  const isLoading = useScheduleStore((state) => state.isLoading)
  const totalItems = useScheduleStore((state) => state.totalItems)
  const isUpdateScheduleSuccess = useScheduleStore((state) => state.isUpdateScheduleSuccess)

  const [api, contextHolder] = notification.useNotification();

  const handleUpdateWebSocketData = (updatedRecord: WebSocketUpdate) => {
    setDataSource(prevList =>
      prevList?.map(record =>
        record.id === updatedRecord.id
          ? { ...record, ...updatedRecord }
          : record
      )
    );
  }

  useWebSocket(WS_ENDPOINT, TOPIC, (newData) => {
    handleUpdateWebSocketData(newData);
  });

  const rowSelection: TableProps<ActionList>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ActionList[]) => {
      setSelectedAction(selectedRows)
    },
  };

  useEffect(() => {
    if (isUpdateScheduleSuccess) {
      setIsUpdateScheduleSuccess(false)
    }
  }, [api, isUpdateScheduleSuccess, setIsUpdateScheduleSuccess])

  const getSchedules = useCallback(async () => {
    try {
      const res = await getListSchedules({
        keyword: searchText,
        status: filterForm.getFieldValue("status"),
        startDateFrom: filterForm.getFieldValue("startDateFrom") ? dayjs(filterForm.getFieldValue("startDateFrom")).format('YYYY-MM-DD') : undefined,
        startDateTo: filterForm.getFieldValue("startDateTo") ? dayjs(filterForm.getFieldValue("startDateTo")).format('YYYY-MM-DD') : undefined,
        endDateFrom: filterForm.getFieldValue("endDateFrom") ? dayjs(filterForm.getFieldValue("endDateFrom")).format('YYYY-MM-DD') : undefined,
        endDateTo: filterForm.getFieldValue("endDateTo") ? dayjs(filterForm.getFieldValue("endDateTo")).format('YYYY-MM-DD') : undefined,
        repeatable: filterForm.getFieldValue("repeatable"),
        page: currentPage, limit: pageSize
      })
      if (res) {
        setDataSource(res.data?.page)
      } else {
        setDataSource([])
      }
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
    }


  }, [filterForm, api, searchText, currentPage, pageSize, getListSchedules])

  useEffect(() => {
    getSchedules()
  }, [getSchedules])

  const onHandleFilter: FormProps<ActionScheduleRequest>["onFinish"] = async (values) => {
    getSchedules()
    setIsFilterModalOpen(false)
  };

  const onHandleNavigateActionDetail = (record: ActionList) => {
    navigate(`/action/${record.name}`, { state: record })
  }

  const onHandleDeleteSchedule = async () => {

    const actionIds = (selectedAction as ActionList[]).map((row) => row.id)
    try {
      await deleteScheduleAction(actionIds)
      toastMessage(api, "success", "스제줄이 성공적으로 삭제되었습니다", "")
      getSchedules()

    } catch (error: any) {
      setIsDeleteError(true)
    } finally {
      setIsDeleteModalOpen(false)
    }

  }

  const onHandleOpenDeleteModal = () => {
    setIsDeleteError(false)
    setIsDeleteModalOpen(true)
  }
  const onHandleAddSchedule: FormProps<AddScheduleRequest>["onFinish"] = async (values) => {
    const name = values.name
    const description = values.description
    const cronExpression = values.cronExpression
    const nextRunTime = values.nextRunTime ? dayjs(values.nextRunTime).format('YYYY-MM-DD HH:mm:ss') : undefined;
    const status = values.status
    const repeatable = values.repeatable
    const startDate = values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD HH:mm:ss') : undefined;
    const endDate = values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD HH:mm:ss') : undefined;
    const comments = values.comments;
    const frstRegUserId = values.frstRegUserId

    try {
      await addActionSchedule({
        name,
        description,
        cronExpression,
        nextRunTime,
        status,
        repeatable,
        startDate,
        endDate,
        comments,
        frstRegUserId
      })
      toastMessage(api, "success", "스케줄이 성공적으로 생성되었습니다")
      getSchedules()
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`])
    } finally {
      setIsAddScheduleModalOpen(false)
    }
  };
  const onHandleSearch = (value: string) => {
    setSearchText(value)
  }

  const onResetFilter = () => {
    filterForm.resetFields()
    getSchedules()
  }


  return (
    <>
      {contextHolder}
      <div className="pt-8 px-6 pb-6">

        <RPAContentHeader title="스케줄 관리" actionButton={
          <Button size="large" className="py-2 px-3" icon={<CalendarPlusIcon />} onClick={() => setIsAddScheduleModalOpen(true)} type="primary">스케줄 생성</Button>
        } />

        <RPASearchAction
          placeholder='검색'
          onBlur={(e) => onHandleSearch(e.target.value)}
          onPressEnter={(e) => onHandleSearch((e.target as HTMLInputElement).value)}
          filterAction={
            <>
              <Button icon={<FilterIcon />} onClick={() => setIsFilterModalOpen(true)}>필터</Button>
              <Button type='text' icon={<RetweetOutlined />} onClick={onResetFilter}>필터링 초기화</Button>
            </>}
          actionButton={
            <>
              <Button className="border-none text-[#B42318]" disabled={selectedAction?.length === 0} onClick={onHandleOpenDeleteModal}>삭제</Button>
            </>
          }
        />
      </div>
      <div className="px-6 pb-8">
        <Table
          rowKey="id"
          dataSource={dataSource}
          columns={actionScheduleTableColumns}
          bordered
          loading={isLoading}
          rowSelection={{ ...rowSelection }}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => onHandleNavigateActionDetail(record),
            };
          }}
          scroll={{ y: 60 * 10 }}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: ['15', '30', '50', '100'],
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            onShowSizeChange(current, size) {
              setCurrentPage(1);
              setPageSize(size)
            },
            itemRender: itemRender,
          }}
        />
      </div>
      <RPAScheduleFilter
        filterForm={filterForm}
        isFilterModalOpen={isFilterModalOpen}
        setIsFilterModalOpen={setIsFilterModalOpen}
        onHandleFilter={onHandleFilter}
      />
      <RPADeleteSchedule
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isDeleteError}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedAction={selectedAction}
        onHandleDeleteSchedule={onHandleDeleteSchedule}
      />

      <RPAAddSchedule
        addForm={addForm}
        isAddScheduleModalOpen={isAddScheduleModalOpen}
        setIsAddScheduleModalOpen={setIsAddScheduleModalOpen}
        onHandleAddSchedule={onHandleAddSchedule}
      />

    </>
  )
}
