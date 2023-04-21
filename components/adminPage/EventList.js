import React, { useEffect, useState } from "react";
import classes from "./adminPage.module.css";

export const EventList = () => {
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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <div className={classes.addBookWrapper}>
      {events.map((event) => (
        <div className={classes.studentListItem} key={event._id}>
          <div className={classes.studentEmail}>{event.eventDate}</div>
          <div className={classes.studentName}>{event.eventName}</div>
          <div className={classes.studentPhone}>{event.eventDescription}</div>
        </div>
      ))}
    </div>
  );
};
