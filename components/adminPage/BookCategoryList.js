import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import classes from "./adminPage.module.css";

export const BookCategoryList = () => {
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getBookCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className={classes.addBookWrapper}>
      {categories.map((category) => {
        return (
          <div key={category._id} className={classes.eventItem}>
            <div>{category.bookCategory}</div>
          </div>
        );
      })}
    </div>
  );
};
