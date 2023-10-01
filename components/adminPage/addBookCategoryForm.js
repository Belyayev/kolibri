import React from "react";
import { Form, Input, Button } from "antd";
import classes from "./adminPage.module.css";
import { useUser } from "@clerk/nextjs";

export const AddBookCategoryForm = (props) => {
  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

  const [form] = Form.useForm();
  function submitHandler(values) {
    const { bookCategory } = values;

    props.onAddCategory({
      authUserEmail,
      bookCategory: bookCategory,
    });
    form.resetFields();
  }

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Добавить Категорию</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="Категория" name="bookCategory">
          <Input />
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
