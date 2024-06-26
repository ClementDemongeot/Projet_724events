import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)
    // erreur ordre "<" to ">" //
  );
  const nextCard = () => {
    if (byDateDesc) {
      // Ajout de if //
      setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // ajout de -1 //
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };
  return (
    <div className="SlideCardList" key="slide-card-list">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={event.title}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.title}`}
                  type="radio"
                  name={`radio-button-${radioIdx}`}
                  checked={index === radioIdx}
                  onChange={() => handleRadioChange(radioIdx)}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
