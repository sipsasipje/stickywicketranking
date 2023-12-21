import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Counter.css";

const Counter = ({ count, itemCount, done, after }) => {
  const [total] = useState(itemCount);
  const ref = useRef(null);

  useEffect(() => {
    if (done) {
      let scrollTimer = setTimeout(() => {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        after();
      }, 2000);

      return () => {
        clearTimeout(scrollTimer);
      };
    }
  });

  return (
    <CSSTransition in={true} timeout={1000} classNames="counter" appear>
      <div ref={ref} className="counter">
        {count}
        <span className="separator">//</span>
        {total}
      </div>
    </CSSTransition>
  );
};
export default Counter;
