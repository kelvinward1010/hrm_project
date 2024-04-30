import { TitleAll } from "./TitleAll";
import styles from "./EmployeeInfomation.module.scss";
import { useTranslation } from "react-i18next";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { GENDER_CONFIG } from "../../config";
import { configValuesSelect } from "@/utils/data";
import { FieldData, IBaseOption } from "@/types";
import { RULES_CREATE_EMPLOYEE } from "../../api/createEmployee";
import { useMarriages } from "../../api/getMarriages";


const dateFormat = 'YYYY/MM/DD';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

interface EmployeeInfomationProps{
    fields: FieldData[];
    setFields: any;
    handleFormChange: any;
    form?: any;
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    t?: any;
    configMarriage: IBaseOption[];
    handleFormChange?: any;
    form?: any;
}

export const EmployeeInfomation: React.FC<EmployeeInfomationProps> = ({
    fields,
    setFields,
    handleFormChange,
    form
}) => {
    const { t } = useTranslation();

    const configMarriage = configValuesSelect(useMarriages({})?.data);

    return (
        <div className={styles.container}>
            <TitleAll title={t("features.employee.features_add_new.titleall.title1")}/>
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
                form={form}
                handleFormChange={handleFormChange}
                configMarriage={configMarriage}
            />
        </div>
    )
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ 
    onChange, fields, t, configMarriage, handleFormChange, form
}) => (
    <Form
        name="employee_information"
        form={form}
        {...formItemLayout}
        onValuesChange={handleFormChange}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        className={styles.formmain}
        autoComplete="off"
    >
        <Row justify={'space-between'} wrap>
            <Col span={11} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_name")}
                    rules={RULES_CREATE_EMPLOYEE.name}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="gender"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_gender")}
                    rules={RULES_CREATE_EMPLOYEE.gender}
                >
                    <Select
                        options={GENDER_CONFIG}
                        placeholder="Choose Gender"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="mother_name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_mother_name")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="dob"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_date_of_birth")}
                    rules={RULES_CREATE_EMPLOYEE.dob}
                >
                    <DatePicker
                        format={dateFormat} 
                        placeholder="Select day of birth"
                        className={"date_picker"}
                        size={'large'}
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="pob"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_place_of_birth")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="ktp_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_ktp_no")}
                    rules={RULES_CREATE_EMPLOYEE.ktp_no}
                >
                    <Input className="input_inside" type={'number'} step={1}/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="nc_id"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_national_card_id")}
                >
                    <Input className="input_inside" type={'number'} step={1}/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="home_address_1"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_home_address_1")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="home_address_2"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_home_address_2")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
            </Col>
            <Col span={12} className={styles.row_fix}>
                <Form.Item
                    labelAlign={'left'}
                    name="mobile_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_mobile_no")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="tel_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_tel_no")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="marriage_id"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_marriage_status")}
                >
                    <Select
                        options={configMarriage}
                        placeholder="Select Marriage Status"
                        className="select_fix"
                    />
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="card_number"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_card_no")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="bank_account_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_account_no")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="bank_name"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_bank_name")}
                >
                    <Input className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="family_card_number"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_family_card_name")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="safety_insurance_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_safety_insurance_no")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
                <Form.Item
                    labelAlign={'left'}
                    name="health_insurance_no"
                    label={t("features.employee.features_add_new.employee_infomation.lable_input_health_insurance_no")}
                >
                    <Input type={'number'} step={1} className="input_inside"/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
);