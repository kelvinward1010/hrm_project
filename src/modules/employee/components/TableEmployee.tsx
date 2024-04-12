import styles from "./TableEmployee.module.scss";
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isDeleteItemAtom } from "../state/table.atom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleMapEmployee } from "@/utils/data";
import { useGetEmployees } from "../api/getEmployees";
import { useGetDetailEmployee } from "../api/getDetailEmployee";
import { IEmployeeTable } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { employeeDetail } from "@/redux/slices/employeeSlice";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface TableEmployeeProps{
    setItemsSelected: any;
}

const columns: TableColumnsType<IEmployeeTable> = [
    {
        title: 'NIK',
        dataIndex: 'staff_id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
    },
    {
        title: 'Account Number',
        dataIndex: 'bank_account_no',
    },
    {
        title: 'Bank Name',
        dataIndex: 'bank_name',
    },
    {
        title: 'Marriage Status',
        dataIndex: 'marriage_code',
    },
    {
        title: 'Mother Name',
        dataIndex: 'mother_name',
    },
    {
        title: "Date start",
        dataIndex: "contract_start_date",
    },
    {
        title: "Department",
        dataIndex: "department_name",
    },
    {
        title: "Position",
        dataIndex: "pob",
    },
    {
        title: "KTP No",
        dataIndex: "ktp_no",
    },
    {
        title: "Mobile No",
        dataIndex: "mobile_no",
    },
    {
        title: "Tel No",
        dataIndex: "tel_no",
    },
];

export const TableEmployee: React.FC<TableEmployeeProps> = ({
    setItemsSelected
}) => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [, setIsItemSelected] = useRecoilState(isDeleteItemAtom);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = Number(searchParams.get("pageIndex")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 20;
    const searchContent = searchParams.get("searchContent") || "";
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IEmployeeTable[]>([])
    const [total, setTotal] = useState();

    const rowSelection: TableRowSelection<IEmployeeTable> = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setIsItemSelected(false);
            } else {
                setIsItemSelected(true);
            }
            setItemsSelected(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            if (selectedRows.length > 0) {
                setIsItemSelected(false);
            } else {
                setIsItemSelected(true);
            }
        },
    };

    const handleGetEmployee = useCallback(() => {
        const data = {
            page: pageIndex,
            search: searchContent,
        }
        setLoading(true);
        useGetEmployees(data).then((res) => {
            setData(handleMapEmployee(res.data?.data))
            setTotal(res.data?.total)
        }).finally(() => {
            setLoading(false);
        })
    },[pageIndex, searchContent]);

    const handleDetailEmployee = (id: string) => {
        useGetDetailEmployee(id).then((res) => {
            dispatch(employeeDetail(res?.data));
        }).finally(() => navigate(`/employee/add-edit-employee/${id}`))
    }

    useEffect(() => {
        handleGetEmployee()
    },[pageIndex, searchContent])

    return (
        <div className={styles.container}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                onRow={(record) => ({
                    onDoubleClick: () => handleDetailEmployee(record?.key),
                })}
                dataSource={data}
                sticky
                size={'small'}
                scroll={{
                    y: 450,
                    x: 1300
                }}
                className={"table_employyee table_all"}
                
                pagination={{
                    total: total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `Total ${total} items`,
                    position: ["none", "bottomLeft"],
                    current: pageIndex,
                    pageSize,
                    onChange: (page, pageSize) => {
                        searchParams.set("pageIndex", String(page));
                        searchParams.set("pageSize", String(pageSize));
                        setSearchParams(searchParams);
                    },
                }}
                loading={loading}
            />
        </div>
    )
}