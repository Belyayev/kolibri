import React, { useEffect, useState } from "react";
import moment from "moment";
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
        <div className={classes.eventListItem} key={event._id}>
          <div>
            <span className={classes.eventDate}>
              {moment(event.eventDate).format("DD MMM, YYYY")}
            </span>
            <span className={classes.eventName}>{event.eventName}</span>
          </div>
          <div className={classes.eventDescription}>
            {event.eventDescription}
          </div>
        </div>
      ))}
    </div>
  );
};
