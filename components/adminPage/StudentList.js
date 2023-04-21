import React, { useEffect, useState } from "react";
import classes from "./adminPage.module.css";

export const StudentList = () => {
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

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
  }, []);

  return (
    <div className={classes.addBookWrapper}>
      {students.map((student) => (
        <div className={classes.studentListItem} key={student._id}>
          <div className={classes.studentName}>{student.studentName}</div>
          <div className={classes.studentEmail}>{student.emailAddress}</div>
          <div className={classes.studentPhone}>{student.phoneNumber}</div>
        </div>
      ))}
    </div>
  );
};
