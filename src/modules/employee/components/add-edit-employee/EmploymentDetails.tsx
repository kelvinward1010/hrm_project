import { useTranslation } from "react-i18next";
import styles from "./EmploymentDetails.module.scss";
import { TitleAll } from "./TitleAll";
import { Checkbox, Col, Form, Row, Select } from "antd";
import { LableInput } from "./LableInput";
import { useQuery } from "react-query";
import { useGetDepartments } from "../../api/getDepartments";
import { configValuesSelect, transformValues } from "@/utils/data";
import { useGetPositions } from "../../api/getPositions";
import { FieldData, IBaseOption } from "@/types";

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
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    configDepartment: IBaseOption[];
    configPosition: IBaseOption[];
}

export const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({
    fields,
    setFields,
}) => {
    const { t } = useTranslation();

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
                    setFields(transformValues(fields));
                }}
                t={t}
                configDepartment={configDepartment}
                configPosition={configPosition}
            />
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
            console.log(allFields)
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
        <Row>
            <Col span={24}>
                <Form.Item 
                    name="hidden_on_payroll"
                    valuePropName="checked"
                >
                    <Checkbox name="hidden_on_payroll" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_hidden_on_payroll")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="entitle_ot"
                    valuePropName="checked"
                >
                    <Checkbox  name="entitle_ot" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_entitle_ot")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="meal_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox name="meal_allowance_paid" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_meal_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="operational_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox name="operational_allowance_paid" className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_operational_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item 
                    name="attendance_allowance_paid"
                    valuePropName="checked"
                >
                    <Checkbox name="attendance_allowance_paid"  className={styles.check}>
                        {t("features.employee.features_add_new.eploymentdetails.lable_input_attendance_allowance_paid")}
                    </Checkbox>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);