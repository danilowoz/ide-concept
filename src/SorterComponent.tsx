import React, { Children, Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Bar } from "./utils/SideBar";
import styled from "styled-components";

const Item = styled.div`
  position: relative;
  overflow: hidden;
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle
});

export class SorterComponent extends Component {
  constructor(props, context) {
    super(props, context);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      items: Children.map(this.props.children, (item, index) => ({
        content: item,
        id: `item ${index}`
      }))
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div ref={droppableProvided.innerRef}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <Item
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      {item.content}
                    </Item>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
