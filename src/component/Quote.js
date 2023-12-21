import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./Quote.css";

const Quote = ({ items, count }) => {
  const ref = useRef(null);
  const quoteIndex = Math.max(1, items.length - count);
  const quote = items.filter((item) => {
    return item.position == quoteIndex;
  })[0];

  if (quote) {
    return (
      <CSSTransition in={true} timeout={1000} classNames="quote" appear>
        <div ref={ref} className="quote">
          &ldquo;{quote.quote}&rdquo;
          <span className="author">&ndash; {quote.author}</span>
        </div>
      </CSSTransition>
    );
  }

  return;
};
export default Quote;
