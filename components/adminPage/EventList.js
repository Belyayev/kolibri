import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
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
      {events.map((event) => {
        let imageLink = event.eventImageLink;
        if (!event.eventImageLink || event.eventImageLink === "") {
          imageLink =
            "https://github.com/Belyayev/kolibri/blob/main/Images/calendarPlaceholder.png?raw=true";
        }
        return (
          <div key={event._id} className={classes.eventItem}>
            <div className={classes.eventImgContainer}>
              <Image
                src={imageLink}
                alt=""
                title=""
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className={classes.eventText}>
              <div>
                <span className={classes.eventDate}>
                  {moment(event.eventDate).format("DD MMM, YYYY")}
                </span>
                <span>{event.eventTime}</span>
              </div>
              <div className={classes.eventTitle}>{event.eventName}</div>
              <div className={classes.eventDescription}>
                {event.eventDescription}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
