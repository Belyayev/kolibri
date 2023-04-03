import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";

const { TextArea } = Input;

export const AddBookForm = (props) => {
  const [form] = Form.useForm();
  function submitHandler(values) {
    const {
      bookName,
      bookAuthor,
      numberOfPages,
      bookDescription,
      bookImageLink,
    } = values;

    props.onAddBook({
      bookName,
      bookDescription,
      bookAuthor,
      numberOfPages,
      bookImageLink,
    });
    form.resetFields();
  }

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="Название" name="bookName">
          <Input />
        </Form.Item>
        <Form.Item label="Автор" name="bookAuthor">
          <Input />
        </Form.Item>
        <Form.Item label="Страниц" name="numberOfPages">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Описание" name="bookDescription">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Картинка" name="bookImageLink">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 14 }}>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
