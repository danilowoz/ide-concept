import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import CodeEditor from "./CodeEditor";
import { SorterBar } from "./Render";

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

export class SorterComponent extends Component {
  constructor(props, context) {
    super(props, context);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      items: this.props.renderCode.map((item, index) => ({
        content: item,
        id: `item ${index}`
      }))
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.renderCode !== this.state.renderCode) {
      console.log(this.props.renderCode);
      this.setState({
        items: this.props.renderCode.map((item, index) => ({
          content: item,
          id: `item ${index}`
        }))
      });
    }
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

    this.setState(
      {
        items
      },
      () => {
        this.props.onChange?.(this.state.items.map((e) => e.content));
      }
    );
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
                      <div>
                        <CodeEditor data={item.content} />
                        <SorterBar />
                      </div>
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
