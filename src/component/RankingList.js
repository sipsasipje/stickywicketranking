import { DragDropContext, Droppable } from "react-beautiful-dnd";
import RankingItem from "./RankingItem";
import "./RankingList.css";
import { formatDate } from "../logic/utils";

const RankingList = ({ items, updateItems }) => {
  const listItems = items.map(({ name, location, date }, index) => {
    const dateString = formatDate(date),
      key = `item-key-${index}`;
    const delay = index * 200;

    return (
      <RankingItem
        key={key}
        index={index}
        name={name}
        location={location}
        date={dateString}
        itemCount={items.length}
        delay={delay}
      />
    );
  });

  const handleOnDragEnd = (result) => {
    updateItems(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="rankingItems">
        {(provided) => (
          <ul
            className="ranking-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listItems}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default RankingList;
