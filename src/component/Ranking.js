import { Component } from "react";
import RankingList from "./RankingList";
import Submit from "./Submit";
import { SubmitContext } from "./SubmitContext";
import Counter from "./Counter";
import Quote from "./Quote";
import { shuffleArray } from "../logic/utils";
import Data from "../assets/data";

class Ranking extends Component {
  constructor(props) {
    super(props);

    const items = shuffleArray(Data.items);
    this.state = {
      items: items,
      submitted: false,
      answers: [],
      count: 0,
      done: false,
      end: false,
    };
    this.currentAnswer = items.length - 1;
    this.timer = null;
  }

  startAnswer(time) {
    if (this.currentAnswer >= 0) {
      this.timer = setTimeout(this.showAnswer.bind(this), time);
    } else {
      this.setState({ done: true });
    }
  }

  showAnswer() {
    const currentItem = this.state.items[this.currentAnswer];

    if (this.currentAnswer + 1 === currentItem.position) {
      this.setState({
        answers: [...this.state.answers, true],
        count: this.state.count + 1,
      });
    } else {
      const answerItem = this.state.items.filter((item) => {
        return item.position === this.currentAnswer + 1;
      })[0];
      this.setState({ answers: [...this.state.answers, answerItem] });
    }
    this.currentAnswer--;

    this.startAnswer(2000);
  }

  onEnd() {
    if (this.state.end === false) {
      this.setState({ end: true });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateItems(sourceIndex, destinationIndex) {
    const items = [...this.state.items];
    const [dragged] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, dragged);

    this.setState({ items: items });
  }

  onSubmit() {
    this.setState({ submitted: true });
    this.startAnswer(1000);
  }

  render() {
    const { items, submitted, answers, count, done, end } = this.state;

    return (
      <>
        {submitted && (
          <Counter
            count={count}
            itemCount={items.length}
            done={done}
            after={this.onEnd.bind(this)}
          />
        )}

        {end && <Quote items={items} count={count} />}

        <SubmitContext.Provider
          value={{
            submitted: submitted,
            answers: answers,
          }}
        >
          <RankingList
            items={items}
            updateItems={this.updateItems.bind(this)}
          />
          <Submit onSubmit={this.onSubmit.bind(this)} submitted={submitted} />
        </SubmitContext.Provider>
      </>
    );
  }
}
export default Ranking;
