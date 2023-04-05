import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import classes from "./adminPage.module.css";

const { TextArea } = Input;

export const UpdateStudentForm = (props) => {
  async function getStudents() {
    const response = await fetch("/api/students/getStudents", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return data;
  }
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  let studentList = [];
  students.map((student) =>
    studentList.push({
      value: student.emailAddress,
      label: student.studentName,
    })
  );

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
  }, []);

  const [form] = Form.useForm();

  function submitHandler(values) {
    const { _id, studentName, phoneNumber, emailAddress, notes } = values;

    props.onUpdateStudent({
      _id,
      studentName,
      phoneNumber,
      emailAddress,
      notes,
    });
    form.resetFields();
  }

  const onChange = (value) => {
    form.setFieldsValue(
      students.filter((student) => student.emailAddress === value)[0]
    );
    setSelectedStudent(
      students.filter((student) => student.emailAddress === value)[0]
    );
  };

  return (
    <div className={classes.addBookWrapper}>
      <div className={classes.addBookTitle}>Редактировать Студента</div>
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
        <Form.Item label="Студент">
          <Select
            allowClear
            showSearch
            onChange={onChange}
            placeholder="Выберете студента для редактирования"
            options={studentList}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          >
            Имя студента
          </Select>
        </Form.Item>
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
        <Form.Item className={classes.formRow}>
          <Button
            type="default"
            className={classes.deleteBook}
            onClick={() => {
              props.onDeleteStudent(selectedStudent._id);
              form.resetFields();
            }}
          >
            Удалить Студента
          </Button>
          <Button type="primary" htmlType="submit">
            Обновить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
