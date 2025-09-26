import {
  Button,
  Form,
  notification,
  Table,
  Flex,
  Divider,
  FormProps,
  Input,
  InputRef,
  GetRef
} from "antd";
import { AddIcon, RPAAddAccountGroupModal, RPADeleteAccountGroupModal } from "../../components";
import React, { useCallback, useEffect, useState, useRef, useContext } from "react";
import {
  RPASearchAction,
  RPAContentHeader,
} from "../../components";
import {
  AccountGroup,
  Account,
} from "../../types";
import {
  accountGroupColumns,
  accountColumns,
  EditableCellProps,
  EditableRowProps,
  ColumnTypes,
} from "./utils/tableColums";
import { toastMessage } from "../../utils/toast-message";
import { MessageResponse } from "../../constants/message";
import "../../styles/rpa-customize.css";
import { useAccountStore, useAccountGroupStore } from "../../stores";
import { RPAEditAccountGroupModal } from "../../components/RPAAccountGroupManagement/RPAEditAccountGroupModal";

export const AccountGroupManagement = () => {
  const [addAccountGroupForm] = Form.useForm()
  const [editAccountGroupForm] = Form.useForm()
  const [searchAccountGroup, setSearchAccountGroup] = useState<string>();
  const [searchAccount, setSearchAccount] = useState<string>();
  const [selectedAccountGroupId, setSelectedAccountGroupId] = useState<
    number | undefined
  >();
  const [dataAccountGroupSource, setDataAccountGroupSource] = useState<
    AccountGroup[] | undefined
  >([]);
  const [dataAccountSource, setDataAccountSource] = useState<
    Account[] | undefined
  >([]);
  const [api, contextHolder] = notification.useNotification();
  const [isOpenAddAccountGroupModal, setIsOpenAddAccountGroupModal] = useState<boolean>(false)
  const [isOpenEditAccountGroupModal, setIsOpenEditAccountGroupModal] = useState<boolean>(false)
  const [isDeleteAccountGroupModalOpen, setIsDeleteAccountGroupModalOpen] = useState<boolean>(false)

  const [form] = Form.useForm();
  const tableRef = useRef(null);

  const getListAccountGroup = useAccountGroupStore(
    (state) => state.getAccountGroupList
  );
  const getListAccount = useAccountStore((state) => state.getAccountList);
  const addAccountGroupAction = useAccountGroupStore((state) => state.addAccountGroupAction)
  const editAccountGroupAction = useAccountGroupStore((state) => state.editAccountGroupAction)
  const deleteAccountGroupAction = useAccountGroupStore((state) => state.deleteAccountGroupAction)

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
        className="editable-cell"
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};



const mergedColumns =  accountColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Account) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const getAccounts = useCallback(
    async (recordId: number | undefined) => {
      try {
        const res = await getListAccount({
          keyword: searchAccount,
          accountGroupId: recordId,
        });
        if (res) {
          const accountsWithKey : Account[] = res.data.map((item, idx) => ({
            ...item,
            key: (idx + 1).toString(),
          }));
          setDataAccountSource(accountsWithKey);
        } else {
          setDataAccountSource([]);
        }
      } catch (error: any) {
        toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
      }
    },
    [api, searchAccount, setDataAccountSource, getListAccount]
  );

  const getAccountGroups = useCallback(async () => {
    try {
      const res = await getListAccountGroup({
        keyword: searchAccountGroup,
      });
      if (res) {
        setDataAccountGroupSource(res.data);
        setSelectedAccountGroupId(res.data?.[0]?.id)
      } else {
        setDataAccountGroupSource([]);
        
      }
    } catch (error: any) {
      toastMessage(api, "error", MessageResponse[`${error?.messageId}`]);
    }
  }, [api, searchAccountGroup, setSelectedAccountGroupId, getListAccountGroup]);

  useEffect(() => {
    getAccountGroups();
  }, [searchAccountGroup, getAccountGroups]);

  useEffect(() => {
    if (selectedAccountGroupId) {
      getAccounts(selectedAccountGroupId);
    } else {
      setDataAccountSource([]);
    }
  }, [searchAccount, selectedAccountGroupId, getAccounts]);

  const onHandleChooseAccountGroup = (record: AccountGroup) => {
    getAccounts(record.id);
    setSelectedAccountGroupId(record.id);
  };

  const handleOpenAddModal = () => {
        setIsOpenAddAccountGroupModal(true);
    }

  const handleOpenEditModal = () => {
        setIsOpenEditAccountGroupModal(true);
    }

  const handleOpenDeleteModal = () => {
      setIsDeleteAccountGroupModalOpen(true);
    }

  const onHandleAddAccountGroup: FormProps<AccountGroup>["onFinish"] = async (values) => {
          try {
              await addAccountGroupAction(values)
              toastMessage(api, "success", "새 레코드가 성공적으로 추가되었습니다.")
              getAccountGroups();
              setIsOpenAddAccountGroupModal(false)
              addAccountGroupForm.resetFields();
  
          } catch (error: any) {
              toastMessage(api, "error", MessageResponse[error])
          }
      }

    const onHandleEditAccountGroup: FormProps<AccountGroup>["onFinish"] = async (values) => {
          try {
              await editAccountGroupAction(values)
              toastMessage(api, "success", "성공적으로 저장되었습니다.")
              getAccountGroups();
              setIsOpenEditAccountGroupModal(false)
              editAccountGroupForm.resetFields();
          } catch (error: any) {
              toastMessage(api, "error", MessageResponse[error])
          }
      }

  const onHandleDeleteAccountGroup = async() => {
        try {
            await deleteAccountGroupAction(selectedAccountGroupId)
            getAccountGroups()
            setIsDeleteAccountGroupModalOpen(false)
            toastMessage(api, "success", "Delete AccountGroup successfully")

        } catch (error: any) {
            toastMessage(api, "error", "요청을 처리하는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.")
        }
    }

  const handleSave = (row: Account) => {
    const newData = [...dataAccountSource?  dataAccountSource : []];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataAccountSource(newData);
  };

  const onHandleAccountGroupSearch = (value: string) => {
    setSearchAccountGroup(value);
  };

  const onHandleAccountSearch = (value: string) => {
    setSearchAccount(value);
  };

  return (
    <>
      {contextHolder}
      <div className="pt-8 px-6 pb-6">
        <Flex vertical gap={24}>
          <RPAContentHeader title="계정 그룹 관리" />
        </Flex>
      </div>
      <div>
        <div className="flex gap-4 px-6 pb-8">
          <div className="flex-1 w-3/5">
            <label className="block text-lg font-medium mb-1">
              RPA 계정 그룹
            </label>
            <RPASearchAction
              placeholder="검색"
              onPressEnter={(e) =>
                  onHandleAccountGroupSearch(
                    (e.target as HTMLInputElement).value
                  )
                }
              actionButton={
                <>
                  <Button
                    size="large"
                    className="text-[#B42318] border-none font-semibold"
                    onClick={handleOpenDeleteModal}
                    disabled={selectedAccountGroupId===undefined}
                  >
                    삭제
                  </Button>
                  <Divider type="vertical" className="h-full " />
                  <Button
                    size="large"
                    className="text-[#414651] font-semibold"
                    onClick={handleOpenEditModal}
                    disabled={selectedAccountGroupId===undefined}
                  >
                    편집
                  </Button>
                  <Button
                    size="large"
                    icon={<AddIcon color="#463DC8" />}
                    className="text-[#463DC8] font-semibold"
                    onClick={handleOpenAddModal}
                  >
                    추가
                  </Button>
                </>
              }
            />
            <div
              className="py-8 flex-1"
              ref={tableRef}
              tabIndex={0}
              style={{ outline: "none" }}
            >
              <Table
                columns={accountGroupColumns}
                dataSource={dataAccountGroupSource}
                pagination={false}
                bordered
                scroll={{ y: 590 }}
                rowClassName={(record) => 
                  record.id === selectedAccountGroupId ? 'custom-selected-row' : ''
                }
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => onHandleChooseAccountGroup(record),
                  };
                }}
              />
            </div>
          </div>
          <div className="flex-1 w-2/5">
            <label className="block text-lg font-medium mb-1">RPA 계정</label>
            <RPASearchAction
              placeholder="검색"
              onPressEnter={(e) =>
                  onHandleAccountSearch(
                    (e.target as HTMLInputElement).value
                  )
                }
              actionButton={
                <>
                  <Button size="large" className="text-[#414651] font-semibold">
                    변경 사항 저장
                  </Button>
                  <Button
                    size="large"
                    icon={<AddIcon color="#463DC8" />}
                    className="text-[#463DC8] font-semibold"
                  >
                    추가
                  </Button>
                </>
              }
            />
            <div className="py-8 flex-1">
              <Form form={form} component={false}>
              <Table<Account>
                components={{
                  body: { cell: EditableCell, row : EditableRow },
                }}
                columns={mergedColumns  as ColumnTypes}
                dataSource={dataAccountSource}
                pagination={false}
                bordered
                rowClassName="editable-row custom-row"
                scroll={{ y: 590 }}
              />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <RPAAddAccountGroupModal
        addAccountGroupForm={addAccountGroupForm}
        isOpenAddAccountGroupModal={isOpenAddAccountGroupModal}
        setIsOpenAddAccountGroupModal={setIsOpenAddAccountGroupModal}
        onHandleAddAccountGroup={onHandleAddAccountGroup}
      />
      <RPAEditAccountGroupModal
        id={selectedAccountGroupId}
        editAccountGroupForm={editAccountGroupForm}
        isOpenEditAccountGroupModal={isOpenEditAccountGroupModal}
        setIsOpenEditAccountGroupModal={setIsOpenEditAccountGroupModal}
        onHandleEditAccountGroup={onHandleEditAccountGroup}
      />
      <RPADeleteAccountGroupModal
        isDeleteAccountGroupModalOpen={isDeleteAccountGroupModalOpen}
        setIsDeleteAccountGroupModalOpen={setIsDeleteAccountGroupModalOpen}
        onHandleDeleteAccountGroup={onHandleDeleteAccountGroup}
      />
    </>
  );
};
