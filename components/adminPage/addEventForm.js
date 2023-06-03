import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import classes from "./adminPage.module.css";
import { useUser } from "@clerk/nextjs";

const { TextArea } = Input;

export const AddEventForm = (props) => {
  const { user } = useUser();

  const authUserEmail = user.primaryEmailAddress.emailAddress;

  const [form] = Form.useForm();
  function submitHandler(values) {
    const {
      eventName,
      eventDate,
      eventTime,
      eventImageLink,
      eventDescription,
    } = values;

    props.onAddEvent({
      authUserEmail,
      eventName: eventName,
      eventDate: eventDate,
      eventTime: eventTime,
      eventImageLink: eventImageLink,
      eventDescription: eventDescription,
    });
    form.resetFields();
  }

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Добавить Запись в Календарь</div>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={submitHandler}
      >
        <Form.Item label="Название" name="eventName">
          <Input />
        </Form.Item>
        <Form.Item label="Дата" name="eventDate">
          <input className={classes.datePicker} type="date" />
        </Form.Item>
        <Form.Item label="Время" name="eventTime">
          <Input placeholder="с 12:00 до 15:30" />
        </Form.Item>
        <Form.Item label="Детали" name="eventDescription">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Изображение" name="eventImageLink">
          <Input placeholder="Картинка по умолчанию если не заполнено" />
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
