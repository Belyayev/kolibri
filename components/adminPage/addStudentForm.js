import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

export const AddStudentForm = (props) => {
  const [form] = Form.useForm();
  function submitHandler(values) {
    const { studentName, phoneNumber, emailAddress, notes } = values;

    props.onAddStudent({
      studentName,
      phoneNumber,
      emailAddress,
      notes,
    });
    form.resetFields();
  }

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Добавить Студента</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="Имя" name="studentName">
          <Input />
        </Form.Item>
        <Form.Item label="Телефон" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Е-мэйл" name="emailAddress">
          <Input />
        </Form.Item>
        <Form.Item label="Отметки" name="notes">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
