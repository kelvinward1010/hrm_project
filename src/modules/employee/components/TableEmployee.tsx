import styles from "./TableEmployee.module.scss";
import { Button, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from "react";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
const originData = [];

interface TableEmployeeProps {
    data?: any[];
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const datatest: DataType[] = [];
for (let i = 0; i < 40; i++) {
    datatest.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export const TableEmployee: React.FC<TableEmployeeProps> = ({
    data
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
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
                    x: "auto"
                }}
                className={"table_employyee"}
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