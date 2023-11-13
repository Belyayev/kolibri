/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { FastForwardOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import classes from "./starting-page.module.css";
import icon01 from "../../Images/Icon01.png";
import icon02 from "../../Images/Icon02.png";
import icon03 from "../../Images/Icon03.png";
import icon04 from "../../Images/Icon04.png";
import icon05 from "../../Images/Icon05.png";
import photo01 from "../../Images/Carousel/Photo01.png";
import photo02 from "../../Images/Carousel/Photo02.png";
import photo03 from "../../Images/Carousel/Photo03.png";
import photo04 from "../../Images/Carousel/Photo04.png";
import photo05 from "../../Images/Carousel/Photo05.png";
import photo06 from "../../Images/Carousel/Photo06.png";
import photo07 from "../../Images/Carousel/Photo07.png";
import photo08 from "../../Images/Carousel/Photo08.png";
import photo09 from "../../Images/Carousel/Photo09.png";
import photo10 from "../../Images/Carousel/Photo10.png";
import photo11 from "../../Images/Carousel/Photo11.png";
import photo12 from "../../Images/Carousel/Photo12.png";

function StartingPageContent() {
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

  const videoWidth = 500;
  const videoHeight = 280;

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <div className={classes.section}>
      <div className={classes.title}>Школа Русского языка“Колибри”</div>
      <Carousel autoplay style={{ marginBottom: "2rem" }}>
        <Image
          src={photo01}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo02}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo03}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo04}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo05}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo06}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo07}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo08}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo09}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo10}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo11}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src={photo12}
          alt=""
          title=""
          width="100%"
          height="35rem"
          layout="responsive"
          objectFit="contain"
        />
      </Carousel>
      <div className={classes.lessonsSubTitle}>
        Наша школа ведёт свою работу по разным направлениям, но объединяет одну
        идею - развитие и поддержание языка и традиций!!!
      </div>
      {events.length > 0 && (
        <div className={classes.eventsContainer}>
          <div className={classes.lessonsTitle}>Календарь школы</div>
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
      )}
      <div className={classes.eventsContainer}>
        <div className={classes.lessonsTitle}>
          Путешествие по странам - видео
        </div>
        <div className={classes.videoContainer}>
          <iframe
            className={classes.videoItem}
            width={videoWidth}
            height={videoHeight}
            src="https://www.youtube.com/embed/feqNzjhpxec?si=i9wGMmNXS5txFbdv"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            className={classes.videoItem}
            width={videoWidth}
            height={videoHeight}
            src="https://www.youtube.com/embed/9Ua4mAWAgoA?si=fr3Lo6hAmUJDCg1K"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            className={classes.videoItem}
            width={videoWidth}
            height={videoHeight}
            src="https://www.youtube.com/embed/l-Y2H1hB8hQ?si=sFu717feHPR8Vcdw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            className={classes.videoItem}
            width={videoWidth}
            height={videoHeight}
            src="https://www.youtube.com/embed/lOuOx_i8DIc?si=eG0VKQnIBQqbrGSe"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className={classes.lessonsTitle}>Наши уроки</div>
      <div className={classes.lessonsSubTitle}>
        Все предметы нашей программы входят в один блок по субботам. Музыка
        также является частью программы. Дополнительно только факультативы.
      </div>
      <div className={classes.lessonCardsWrapper}>
        <div className={classes.lessonCard}>
          <div className={classes.imgContainer}>
            <Image
              src={icon01}
              alt=""
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.cardText}>
            <span className={classes.lessonName}>Уроки Развития речи</span> —
            учим ребят красиво и грамотно излагать свои мысли. Занятия проходят
            интересно , используются и элементы сценического искусства. Каждый
            месяц новые блоки авторских тем, которые уносят в мир
            науки,искусства, географии, космоса. Всё это помогает расширять
            лексику и даёт возможность её использовать.
          </div>
        </div>

        <div className={classes.lessonCard}>
          <div className={classes.imgContainer}>
            <Image
              src={icon02}
              alt=""
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.cardText}>
            <span className={classes.lessonName}>Уроки Музыки</span> гармонично
            развивают язык, дикцию, способствуют развитию произносительной
            стороны речи. Также подготавливают ребят чувствовать себя уверенными
            на выступлениях. Подготовка тематических песен к праздникам
            проводится профессиональным учителем музыки.
          </div>
        </div>
        <div className={classes.lessonCard}>
          <div className={classes.imgContainer}>
            <Image
              src={icon03}
              alt=""
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.cardText}>
            <span className={classes.lessonName}>Русский язык.</span> Работаем
            над письменной речью. Обучаем чтению, письму, используем презентации
            и творческие проекты. Учим русский интересно.
          </div>
        </div>
        <div className={classes.lessonCard}>
          <div className={classes.imgContainer}>
            <Image
              src={icon04}
              alt=""
              title=""
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className={classes.cardText}>
            <span className={classes.lessonName}>Литература.</span> Растим
            увлеченных читателей. Библиотека школы "Колибри" доступна ученикам
            школы, книжные клубы, читательские дневники, карты историй - все для
            интересного и увлекательного чтения.
          </div>
        </div>
      </div>
      <div className={classes.lessonsSubTitle}>
        Проводим разнообразные мастер классы. Предлагаем дополнительные занятия
        по кукловедению и актерскому мастерству.
      </div>
      <div className={classes.lessonsTitle}>
        Традиционные мероприятия в нашей школе:
      </div>
      <ul>
        <li>
          <span className={classes.lessonName}>"Золотая осень"</span> - праздник
          поэзии.
        </li>
        <li>
          <span className={classes.lessonName}>Новый год</span> в нашей школе
          проходит всегда интересно и весело с участием наших друзей— театра
          "Светлячок".
        </li>
        <li>
          Традиционное пряничное чаепитие на праздник
          <span className={classes.lessonName}> Рождества.</span>
        </li>
        <li>
          Праздник блинов на{" "}
          <span className={classes.lessonName}>Масленицу.</span>
        </li>
        <li>
          Весенний<span className={classes.lessonName}> пикник.</span>
        </li>
        <li>
          Традиции в наших семьях — дети делятся в презентациях своими семейными
          традициями.
        </li>
        <li>
          Заключительный <span className={classes.lessonName}>концерт.</span>
        </li>
        Летние программы.
        <li>
          Совместные <span className={classes.lessonName}>походы.</span>
        </li>
        <li>
          <span className={classes.lessonName}>РКИ </span>- онлайн занятия в
          группе и индивидуально от 7 лет.
        </li>
      </ul>
      <div className={classes.lessonsTitle}>Контактная информация:</div>
      <div className={classes.contactInfo}>
        <div className={classes.imageContacts}>
          <Image
            src={icon05}
            alt=""
            title=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <div>
          <div>Директор школы Светлана Сачик</div>
          <div>тел.: (403)614-0284</div>
          <div>емэйл: sachyk81@hotmail.com</div>
        </div>
      </div>
      <div className={classes.lessonsFootNote}>
        Школа "Колибри" - учим Русский язык интересно!!!
      </div>
      <a
        style={{ textDecoration: "none" }}
        target="_blank"
        href="https://mike.belyayev.vercel.app/"
        rel="noopener noreferrer"
      >
        <div className={classes.developer}>
          <FastForwardOutlined />
          страничка разработчика
        </div>
      </a>
    </div>
  );
}

export default StartingPageContent;
