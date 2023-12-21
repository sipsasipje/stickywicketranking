import { useContext, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./RankingItem.css";
import { SubmitContext } from "./SubmitContext.js";
import { formatDate } from "../logic/utils.js";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CheckMark } from "../assets/checkmark.svg";

const RankingItem = ({ index, name, location, date, itemCount }) => {
  const ref = useRef(null);
  const id = `ranking-item-${index}`;
  let key;
  const { submitted, answers } = useContext(SubmitContext);
  const answerIndex = (itemCount - 1) - index;
  let answerStatus;
  let delay = index * 200;
  let timeout = 500 + delay;

  useEffect(() => {
    if (answerIndex === answers.length - 1) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  });

  if (answers[answerIndex]) {
    if (typeof answers[answerIndex] === "object") {
      answerStatus = false;
      key = "wrong";
      timeout = 900;
    } else {
      answerStatus = true;
      key = "right";
      timeout = 900;
    }
  }

  let initialName;
  if (answerStatus === false) {
    initialName = name;
    name = answers[answerIndex].name;
    location = answers[answerIndex].location;
    date = formatDate(answers[answerIndex].date);
  }

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={submitted}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CSSTransition
            key={key ?? id}
            in={true}
            timeout={timeout}
            classNames="ranking-item"
            appear
          >
            <div
              ref={ref}
              style={{ transitionDelay: `${delay}ms` }}
              className={`ranking-item ${key ?? ""}`}
            >
              <div className="index">{index + 1}</div>
              <div className="details">
                {initialName && (
                  <p className="wrong-name">
                    <span>{initialName}</span>
                  </p>
                )}
                <h2>
                  {name}
                  {answerStatus && <CheckMark className="checkmark" />}
                </h2>
                <p className="description">
                  {location} <span className="separator">//</span> {date}
                </p>
              </div>
            </div>
          </CSSTransition>
        </li>
      )}
    </Draggable>
  );
};
export default RankingItem;
