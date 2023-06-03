import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import classes from "./adminPage.module.css";
import { useUser } from "@clerk/nextjs";

const { TextArea } = Input;

export const AddStudentForm = (props) => {
  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

  const [form] = Form.useForm();
  function submitHandler(values) {
    const { studentName, phoneNumber, emailAddress, notes } = values;

    props.onAddStudent({
      authUserEmail,
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
