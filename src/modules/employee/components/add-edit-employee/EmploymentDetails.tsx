import { useTranslation } from "react-i18next";
import styles from "./EmploymentDetails.module.scss";
import { TitleAll } from "./TitleAll";
import { Checkbox, CheckboxProps, Col, Form, Row, Select } from "antd";
import { LableInput } from "./LableInput";
import { FieldData, IOptionsConfig } from "../../types";
import { useQuery } from "react-query";
import { useGetDepartments } from "../../api/getDepartments";
import { configValuesSelect } from "@/utils/data";
import { useGetPositions } from "../../api/getPositions";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
    },
};

interface EmploymentDetailsProps{
    fields: FieldData[];
    setFields: any;
    formCheck: any;
    setFormCheck: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    configDepartment: IOptionsConfig[];
    configPosition: IOptionsConfig[];
}

export const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({
    fields,
    setFields,
    setFormCheck,
    formCheck
}) => {
    const { t } = useTranslation();

    const handleChange: CheckboxProps['onChange'] = (e: any) => {
        let result = e.target.checked == true ? 1 : 0
        setFormCheck({ ...formCheck, [e.target.name]: result});
        console.log(formCheck)
    };

    const {data: department} = useQuery({
        queryKey: 'department',
        queryFn: () => useGetDepartments()
    })

    const {data: position} = useQuery({
        queryKey: 'position',
        queryFn: () => useGetPositions()
    })

    const configDepartment = configValuesSelect(department);
    const configPosition = configValuesSelect(position);

    const checkpicked = formCheck?.entitle_ot == 1 ? false : true;

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title3")} />
            <CustomizedForm
                fields={fields}
                onChange={(newFields) => {
                    newFields.forEach((i: FieldData) => {
                        const index = fields.findIndex((f: FieldData) => f.name == i.name)
                        if(index !== -1){
                            fields[index].value = i.value;
                        }
                    })
                    setFields(fields);
                }}
                t={t}
                configDepartment={configDepartment}
                configPosition={configPosition}
            />
            <Row>
                <Col span={24}>
                    <Checkbox checked={formCheck?.hidden_on_payroll == 1 ? true : false} name="hidden_on_payroll" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_hidden_on_payroll")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox checked={formCheck?.entitle_ot == 1 ? true : false} name="entitle_ot" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_entitle_ot")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox  checked={formCheck?.meal_allowance_paid == 1 ? true : false} name="meal_allowance_paid" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_meal_allowance_paid")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox checked={formCheck?.operational_allowance_paid == 1 ? true : false} disabled={checkpicked} name="operational_allowance_paid" onChange={handleChange} className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_operational_allowance_paid")}
                    </Checkbox>
                </Col>
                <Col span={24}>
                    <Checkbox checked={formCheck?.attendance_allowance_paid == 1 ? true : false} disabled={checkpicked}  name="attendance_allowance_paid" onChange={handleChange} className={styles.check}>
                    {t("features.employee.features_add_new.eploymentdetails.lable_input_attendance_allowance_paid")}
                    </Checkbox>
                </Col>
            </Row>
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, t, configDepartment, configPosition }) => (
    <Form
        name="employee_details"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'start'} wrap>
            <Col span={7} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="department_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_department")})}
                >
                    <Select
                        options={configDepartment}
                        placeholder="Select department"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="position_id"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_position")})}
                >
                    <Select
                        options={configPosition}
                        placeholder="Select position"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="shift"
                    label={LableInput({label: t("features.employee.features_add_new.eploymentdetails.lable_input_shift")})}
                >
                    <Select
                        options={[
                            {
                                value: "1",
                                label: "1"
                            }
                        ]}
                        placeholder="Select shift"
                        className="select_fix"
                    />
                </Form.Item>
            </Col>
        </Row>
    </Form>
);