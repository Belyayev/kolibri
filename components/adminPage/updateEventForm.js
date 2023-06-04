import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useUser } from "@clerk/nextjs";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

export const UpdateEventForm = (props) => {
  async function getEvents() {
    const response = await fetch("/api/events/getEvents", {
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

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  let eventList = [];
  events.map((event, index) =>
    eventList.push({
      value: event._id,
      label: `${index}. ${event.eventName}`,
    })
  );

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const [form] = Form.useForm();

  function submitHandler(values) {
    const {
      _id,
      eventName,
      eventDate,
      eventTime,
      eventImageLink,
      eventDescription,
    } = values;

    props.onUpdateEvent({
      authUserEmail,
      _id,
      eventName: eventName,
      eventDate: eventDate,
      eventTime: eventTime,
      eventImageLink: eventImageLink,
      eventDescription: eventDescription,
    });
    form.resetFields();
  }

  const onChange = (value) => {
    form.setFieldsValue(events.filter((event) => event._id === value)[0]);
    setSelectedEvent(events.filter((event) => event._id === value)[0]);
  };

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>
        Редактировать Запись в Календаре
      </div>
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
        <Form.Item label="Запись">
          <Select
            allowClear
            showSearch
            onChange={onChange}
            placeholder="Выберете запись для редактирования"
            options={eventList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Название записи
          </Select>
        </Form.Item>
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
        <Form.Item className={classes.formRow}>
          <Button
            type="default"
            className={classes.deleteBook}
            onClick={() => {
              props.onDeleteEvent(selectedEvent._id);
              form.resetFields();
            }}
          >
            Удалить Запись
          </Button>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
