import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import classes from "./adminForm.module.css";

const { TextArea } = Input;

export const UpdateBookForm = (props) => {
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
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Редактировать книгу</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
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
        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};