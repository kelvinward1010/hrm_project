import styles from "./TableEmployee.module.scss";
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isDeleteItemAtom } from "../state/table.atom";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    nik: string;
    name: string;
    gender: string;
    marriage_id: string;
    mother_name: string;
    card_number: string;
    nc_id: string;
    date_start: string;
    bank_account_no: string;
    department_id: string;
    position_id: string;
    ktp_no: string;
    mobile_no: string;
    tel_no: string;
}
const originData = [];

interface TableEmployeeProps {
    data?: any[];
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'NIK',
        dataIndex: 'nik',
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
        title: 'Card Number',
        dataIndex: 'card_number',
    },
    {
        title: 'Account Number',
        dataIndex: 'bank_account_no',
    },
    {
        title: 'Marriage Status',
        dataIndex: 'marriage_id',
    },
    {
        title: 'Mother Name',
        dataIndex: 'mother_name',
    },
    {
        title: 'Tax ID',
        dataIndex: 'nc_id',
    },
    {
        title: "Date start",
        dataIndex: "date_start",
    },
    {
        title: "Department",
        dataIndex: "department_id",
    },
    {
        title: "Position",
        dataIndex: "position_id",
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

const datatest: DataType[] = [];
for (let i = 0; i < 40; i++) {
    datatest.push({
        key: i,
        nik: `ss- ${i}`,
        name: `name - ${i}`,
        gender: `gender - ${i}`,
        marriage_id: `marriage - ${i}`,
        card_number: `card_number - ${i}`,
        mother_name: `mother_name - ${i}`,
        nc_id: `tax id - ${i}`,
        date_start: `date_start - ${i}`,
        bank_account_no: `bank_account_no - ${i}`,
        department_id: `department - ${i}`,
        position_id: `position - ${i}`,
        ktp_no: `ktp - ${i}`,
        mobile_no: `mobile - ${i}`,
        tel_no: `tel - ${i}`,
    });
}

export const TableEmployee: React.FC<TableEmployeeProps> = ({
    data
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [, setItemSelected] = useRecoilState(isDeleteItemAtom);

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                setItemSelected(false);
            } else {
                setItemSelected(true);
            }
        },
        onSelect: (record, selected, selectedRows) => {
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            if (selectedRows.length > 0) {
                setItemSelected(false);
            } else {
                setItemSelected(true);
            }
        },
    };

    return (
        <div className={styles.container}>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={datatest}
                sticky
                size={'small'}
                scroll={{
                    y: 450,
                    x: 1300
                }}
                className={"table_employyee table_all"}
                pagination={{
                    total: originData.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `Total ${total} items`,
                    position: ["none", "bottomLeft"],
                }}
            />
        </div>
    )
}