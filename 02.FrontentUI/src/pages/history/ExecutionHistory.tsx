import {
  Button,
  Form,
  notification,
  Table,
  Flex,
  Tabs,
  InputRef,
  FormProps,
  Select,
} from "antd";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  FilterIcon,
  RPASearchAction,
  RPAContentHeader,
  RPAHistoryFilter,
  RPAResultLogModal,
} from "../../components";
import { tabItems } from "./utils/tabItem";
import { DEFAULT_PAGE_SIZE } from "../../constants/constants";
import {
  useActionInstanceStore,
  useStepInstanceStore,
  useStepExecutionStore,
  useScheduleStore,
  useStepStore,
} from "../../stores";
import {
  ActionInstanceRequest,
  ActionList,
  ActionCombobox,
  StepExecutionPopupResponse,
  StepExecution,
} from "../../types";
import {
  actionInstanceTableColumns,
  stepInstanceTableColumns,
  stepExecutionTableColumns,
  itemRender,
} from "./utils/tableColums";
import dayjs from "dayjs";
import { toastMessage } from "../../utils/toast-message";
import { MessageResponse } from "../../constants/message";
import "../../styles/rpa-customize.css";
import { Options } from "../../hooks/useCombobox";

export const ExecutionHistory = () => {
  const [dataSourceActionInstance, setDataSourceActionInstance] = useState<ActionList[] | undefined>([]);
  const [dataSourceStepInstance, setDataSourceStepInstance] = useState<ActionList[] | undefined>([]);
  const [dataSourceStepExecution, setDataSourceStepExecution] = useState<ActionList[] | undefined>([]);
  const [searchActionInstance, setSearchActionInstance] = useState<string>("");
  const [tab, setTab] = useState<string>("1");
  const [actionType, setActionType] = useState<ActionCombobox[]>();
  const [stepType, setStepType] = useState<Options[]>();
  const [siSelectAction, setSiSelectAction] = useState<number | undefined>();
  const [seSelectAction, setSeSelectAction] = useState<number | undefined>();
  const [seSelectStep, setSeSelectStep] = useState<number | undefined>();
  const [stepExecutionSelected, setStepExecutionSelected] = useState<StepExecutionPopupResponse | undefined>();
  const [currentActionInstancePage, setCurrentActionInstancePage] =useState<number>(1);
  const [currentStepInstancePage, setCurrentStepInstancePage] =useState<number>(1);
  const [currentStepExecutionPage, setCurrentStepExecutionPage] =useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [placeHolder, setPlaceHolder] = useState<string>();
  const inputRef = useRef<InputRef>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isResultLogModalOpen, setIsResultLogModalOpen] =useState<boolean>(false);
  const [filterForm] = Form.useForm<ActionInstanceRequest>();

  const getListActionInstance = useActionInstanceStore(
    (state) => state.getListActionInstance
  );

  const getListStepInstance = useStepInstanceStore(
    (state) => state.getListStepInstance
  );

  const getListStepExecution = useStepExecutionStore(
    (state) => state.getListStepExecution
  );

  const getStepExecutionPopup = useStepExecutionStore(
    (state) => state.getStepExecutionPopup
  );

  const getActionType = useScheduleStore((state) => state.getActionTypeAction);
  const getStepType = useStepStore((state) => state.getStepTypeAction);

  const isLoading = useActionInstanceStore((state) => state.isLoading);
  const totalActionIstance = useActionInstanceStore(
    (state) => state.totalItems
  );
  const totalStepInstance = useStepInstanceStore((state) => state.totalItems);
  const totalStepExecution = useStepExecutionStore((state) => state.totalItems);
  const [api, contextHolder] = notification.useNotification();

  const onChange = (key: string) => {
    setTab(key);
    setSearchActionInstance("");
    filterForm.resetFields();
    switch (key) {
      case "1":
        setPlaceHolder("액션명 입력");
        break;
      case "2":
        setPlaceHolder("스텝명 입력");
        break;
      case "3":
        setPlaceHolder("계정 ID 검색");
        break;
    }
  };

  const getActionInstances = useCallback(async () => {
    try {
      const res = await getListActionInstance({
        keyword: searchActionInstance,
        status: filterForm.getFieldValue("status"),
        startTime: filterForm.getFieldValue("startTime")
          ? dayjs(filterForm.getFieldValue("startTime")).format("YYYY-MM-DD")
          : undefined,
        endTime: filterForm.getFieldValue("endTime")
          ? dayjs(filterForm.getFieldValue("endTime")).format("YYYY-MM-DD")
          : undefined,
        page: currentActionInstancePage,
        limit: pageSize,
      });
      if (res) {
        setDataSourceActionInstance(res.data?.page);
      } else {
        setDataSourceActionInstance([]);
      }
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
    }
  }, [
    filterForm,
    api,
    searchActionInstance,
    currentActionInstancePage,
    pageSize,
    getListActionInstance,
  ]);

  const getStepInstances = useCallback(async () => {
    try {
      const res = await getListStepInstance({
        keyword: searchActionInstance,
        rpaActionId: siSelectAction,
        status: filterForm.getFieldValue("status"),
        startTime: filterForm.getFieldValue("startTime")
          ? dayjs(filterForm.getFieldValue("startTime")).format("YYYY-MM-DD")
          : undefined,
        endTime: filterForm.getFieldValue("endTime")
          ? dayjs(filterForm.getFieldValue("endTime")).format("YYYY-MM-DD")
          : undefined,
        page: currentStepInstancePage,
        limit: pageSize,
      });
      if (res) {
        setDataSourceStepInstance(res.data?.page);
      } else {
        setDataSourceStepInstance([]);
      }
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
    }
  }, [
    filterForm,
    api,
    searchActionInstance,
    currentStepInstancePage,
    pageSize,
    siSelectAction,
    getListStepInstance,
  ]);

  const getStepExecutions = useCallback(async () => {
    try {
      const res = await getListStepExecution({
        keyword: searchActionInstance,
        rpaActionId: seSelectAction,
        rpaStepId: seSelectStep,
        status: filterForm.getFieldValue("status"),
        startTime: filterForm.getFieldValue("startTime")
          ? dayjs(filterForm.getFieldValue("startTime")).format("YYYY-MM-DD")
          : undefined,
        endTime: filterForm.getFieldValue("endTime")
          ? dayjs(filterForm.getFieldValue("endTime")).format("YYYY-MM-DD")
          : undefined,
        page: currentStepExecutionPage,
        limit: pageSize,
      });
      if (res) {
        setDataSourceStepExecution(res.data?.page);
      } else {
        setDataSourceStepExecution([]);
      }
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
    }
  }, [
    filterForm,
    api,
    searchActionInstance,
    currentStepExecutionPage,
    pageSize,
    seSelectAction,
    seSelectStep,
    getListStepExecution,
  ]);

  useEffect(() => {
    switch (tab) {
      case "1":
        getActionInstances();
        break;
      case "2":
        getStepInstances();
        break;
      case "3":
        getStepExecutions();
        break;
    }
  }, [tab, getActionInstances, getStepInstances, getStepExecutions]);

  useEffect(() => {
    const getActionTypeForStep = async () => {
      const response = await getActionType();
      if (response?.data) {
        setActionType(response.data);
      } else {
        setActionType([]);
      }
    };
    getActionTypeForStep();
  }, [getActionType]);

  useEffect(() => {
    const getStepTypeForStep = async (rpaActionId: number | undefined) => {
      if (!rpaActionId) return;
      const response = await getStepType(rpaActionId);
      if (response?.data) {
        setStepType(response.data);
      } else {
        setActionType([]);
      }
    };
    getStepTypeForStep(seSelectAction);
  }, [seSelectAction, getStepType]);

  const onHandleFilter: FormProps<ActionInstanceRequest>["onFinish"] =
    async () => {
      switch (tab) {
        case "1":
          getActionInstances();
          break;
        case "2":
          getStepInstances();
          break;
        case "3":
          getStepExecutions();
          break;
      }
      setIsFilterModalOpen(false);
    };

  const getStepExecutionDetail = async (id : number | undefined) => {
      try {
        const res = await getStepExecutionPopup(id);
        if (res) {
          setStepExecutionSelected(res.data);
        }
      } catch (error: any) {
        toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
      }
  };

  const onHandleActionInstanceSearch = (value: string) => {
    setSearchActionInstance(value);
    setSiSelectAction(undefined);
    switch (tab) {
      case "1":
        setCurrentActionInstancePage(1);
        break;
      case "2":
        setCurrentStepInstancePage(1);
        break;
      case "3":
        setCurrentStepExecutionPage(1);
        break;
    }
  };

  const handleSIActionChange = (value: number) => {
    setSiSelectAction(value);
  };

  const handleSEActionChange = (value: number) => {
    setSeSelectAction(value);
    if (seSelectAction) {
      setSeSelectStep(undefined);
      setStepType([]);
    }
  };

  const handleSEActionClear = () => {
    setSeSelectStep(undefined);
  };

  const handleSEStepChange = (value: number) => {
    setSeSelectStep(value);
  };

  const onOpenResultLogModal = (record: StepExecution) => {
    getStepExecutionDetail(record?.id);
    setIsResultLogModalOpen(true);
  };

  const onCloseResultLogModal = () => {
    setIsResultLogModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className="pt-8 px-6">
        <Flex vertical gap={24}>
          <RPAContentHeader title="실행 이력" />
        </Flex>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onChange={onChange}
          className="font-semibold"
        />
      </div>
      <div>
        {tab === "1" && (
          <div>
            <div className="px-6 pb-8">
              <RPASearchAction
                placeholder={placeHolder ?? "액션명 입력"}
                inputRef={inputRef}
                mtClass="mt-2"
                onPressEnter={(e) =>
                  onHandleActionInstanceSearch(
                    (e.target as HTMLInputElement).value
                  )
                }
                filterAction={
                  <>
                    <Button
                      type="primary"
                      size="large"
                      className="py-2 px-3"
                      onClick={(e) =>
                        onHandleActionInstanceSearch(
                          inputRef.current?.input?.value ?? ""
                        )
                      }
                    >
                      검색
                    </Button>
                  </>
                }
                actionButton={
                  <>
                    <Button
                      size="large"
                      icon={<FilterIcon />}
                      onClick={() => setIsFilterModalOpen(true)}
                    >
                      필터
                    </Button>
                  </>
                }
              />
            </div>
            <>
              <div className="px-6 pb-8">
                <Table
                  rowKey="id"
                  dataSource={dataSourceActionInstance}
                  columns={actionInstanceTableColumns}
                  bordered
                  loading={isLoading}
                  scroll={{ y: 60 * 10 }}
                  pagination={{
                    position: ["bottomCenter"],
                    current: currentActionInstancePage,
                    pageSize: pageSize,
                    total: totalActionIstance,
                    showSizeChanger: true,
                    pageSizeOptions: ["15", "30", "50", "100"],
                    onChange: (page, pageSize) => {
                      setCurrentActionInstancePage(page);
                      setPageSize(pageSize);
                    },
                    onShowSizeChange(current, size) {
                      setCurrentActionInstancePage(1);
                      setPageSize(size);
                    },
                    itemRender: itemRender,
                  }}
                />
              </div>
            </>
          </div>
        )}
        {tab === "2" && (
          <div>
            <>
              <div className="px-6 pb-8">
                <div className="flex items-end justify-center space-x-3">
                  <div>
                    <Select
                      options={actionType}
                      disabled={isLoading}
                      className="h-10 w-60 action-select"
                      placeholder="ACTION"
                      onChange={handleSIActionChange}
                      allowClear
                    />
                  </div>
                  <RPASearchAction
                    placeholder={placeHolder ?? "액션명 입력"}
                    inputRef={inputRef}
                    mtClass="mt-2"
                    onPressEnter={(e) =>
                      onHandleActionInstanceSearch(
                        (e.target as HTMLInputElement).value
                      )
                    }
                    filterAction={
                      <>
                        <Button
                          type="primary"
                          size="large"
                          className="py-2 px-3"
                          onClick={(e) =>
                            onHandleActionInstanceSearch(
                              inputRef.current?.input?.value ?? ""
                            )
                          }
                        >
                          검색
                        </Button>
                      </>
                    }
                    actionButton={
                      <>
                        <Button
                          size="large"
                          icon={<FilterIcon />}
                          onClick={() => setIsFilterModalOpen(true)}
                        >
                          필터
                        </Button>
                      </>
                    }
                  />
                </div>
              </div>
              <div className="px-6 pb-8">
                <Table
                  rowKey="id"
                  dataSource={dataSourceStepInstance}
                  columns={stepInstanceTableColumns}
                  bordered
                  loading={isLoading}
                  scroll={{ y: 60 * 10 }}
                  pagination={{
                    position: ["bottomCenter"],
                    current: currentStepInstancePage,
                    pageSize: pageSize,
                    total: totalStepInstance,
                    showSizeChanger: true,
                    pageSizeOptions: ["15", "30", "50", "100"],
                    onChange: (page, pageSize) => {
                      setCurrentStepInstancePage(page);
                      setPageSize(pageSize);
                    },
                    onShowSizeChange(current, size) {
                      setCurrentStepInstancePage(1);
                      setPageSize(size);
                    },
                    itemRender: itemRender,
                  }}
                />
              </div>
            </>
          </div>
        )}
        {tab === "3" && (
          <div>
            <>
              <div className="px-6 pb-8">
                <div className="flex items-end justify-center space-x-3">
                  <div>
                    <Select
                      options={actionType}
                      disabled={isLoading}
                      className="h-10 w-60 action-select"
                      placeholder="ACTION"
                      onChange={handleSEActionChange}
                      onClear={handleSEActionClear}
                      allowClear
                    />
                  </div>
                  <div>
                    <Select
                      options={stepType}
                      disabled={isLoading}
                      className="h-10 w-60 action-select"
                      placeholder="STEP"
                      value={seSelectStep}
                      onChange={handleSEStepChange}
                      allowClear
                    />
                  </div>
                  <RPASearchAction
                    placeholder={placeHolder ?? "액션명 입력"}
                    inputRef={inputRef}
                    mtClass="mt-2"
                    onPressEnter={(e) =>
                      onHandleActionInstanceSearch(
                        (e.target as HTMLInputElement).value
                      )
                    }
                    filterAction={
                      <>
                        <Button
                          type="primary"
                          size="large"
                          className="py-2 px-3"
                          onClick={(e) =>
                            onHandleActionInstanceSearch(
                              inputRef.current?.input?.value ?? ""
                            )
                          }
                        >
                          검색
                        </Button>
                      </>
                    }
                    actionButton={
                      <>
                        <Button
                          size="large"
                          icon={<FilterIcon />}
                          onClick={() => setIsFilterModalOpen(true)}
                        >
                          필터
                        </Button>
                      </>
                    }
                  />
                </div>
              </div>
              <div className="px-6 pb-8">
                <Table
                  rowKey="id"
                  dataSource={dataSourceStepExecution}
                  columns={stepExecutionTableColumns}
                  bordered
                  loading={isLoading}
                  scroll={{ y: 60 * 10 }}
                  onRow={(record) => {
                    return {
                      onClick: () => onOpenResultLogModal(record),
                    };
                  }}
                  pagination={{
                    position: ["bottomCenter"],
                    current: currentStepExecutionPage,
                    pageSize: pageSize,
                    total: totalStepExecution,
                    showSizeChanger: true,
                    pageSizeOptions: ["15", "30", "50", "100"],

                    onChange: (page, pageSize) => {
                      setCurrentStepExecutionPage(page);
                      setPageSize(pageSize);
                    },
                    onShowSizeChange(current, size) {
                      setCurrentStepExecutionPage(1);
                      setPageSize(size);
                    },
                    itemRender: itemRender,
                  }}
                />
              </div>
            </>
          </div>
        )}
      </div>
      <RPAHistoryFilter
        filterForm={filterForm}
        isFilterModalOpen={isFilterModalOpen}
        setIsFilterModalOpen={setIsFilterModalOpen}
        onHandleFilter={onHandleFilter}
      />
      <RPAResultLogModal
        isResultLogModalOpen={isResultLogModalOpen}
        stepExecutionSelected={stepExecutionSelected}
        setIsResultLogModalOpen={setIsResultLogModalOpen}
        onCloseResultLogModal={onCloseResultLogModal}
      />
    </>
  );
};
