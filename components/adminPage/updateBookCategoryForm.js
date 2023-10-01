import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useUser } from "@clerk/nextjs";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

export const UpdateBookCategoryForm = (props) => {
  async function getBookCategories() {
    const response = await fetch("/api/bookCategories/getBookCategories", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  let categoryList = [];
  categories.map((event, index) =>
    categoryList.push({
      value: event._id,
      label: `${index}. ${event.bookCategory}`,
    })
  );

  useEffect(() => {
    getBookCategories().then((data) => setCategories(data));
  }, []);

  const [form] = Form.useForm();

  function submitHandler(values) {
    const { _id, bookCategory } = values;

    props.onUpdateCategory({
      authUserEmail,
      _id,
      bookCategory: bookCategory,
    });
    form.resetFields();
  }

  const onChange = (value) => {
    form.setFieldsValue(
      categories.filter((category) => category._id === value)[0]
    );
    setSelectedCategory(
      categories.filter((category) => category._id === value)[0]
    );
  };

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Редактировать Категорию</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="ID" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Категория">
          <Select
            allowClear
            showSearch
            onChange={onChange}
            placeholder="Выберете запись для редактирования"
            options={categoryList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Название категории
          </Select>
        </Form.Item>
        <Form.Item label="Название" name="bookCategory">
          <Input />
        </Form.Item>
        <Form.Item className={classes.formRow}>
          <Button
            type="default"
            className={classes.deleteBook}
            onClick={() => {
              props.onDeleteCategory(selectedCategory._id);
              form.resetFields();
            }}
          >
            Удалить Категорию
          </Button>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
