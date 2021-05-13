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

    this.state = {
      items: this.props.renderCode.map((item, index) => ({
        content: item,
        id: `${item}-${index}`
      }))
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.renderCode !== this.props.renderCode) {
      this.setState({
        items: this.props.renderCode.map((item, index) => ({
          content: item,
          id: `${item}-${index}`
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

    console.log(this.state.items);

    this.setState(
      {
        items
      },
      () => {
        this.props.onSort?.(this.state.items.map((e) => e.content));
      }
    );
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    console.log(this.state.items);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div ref={droppableProvided.innerRef}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided) => (
                    <Item
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <div>
                        <CodeEditor data={item.content} />
                        <SorterBar
                          onSelect={(template) =>
                            this.props.onChangeTemplate(template, index)
                          }
                        />
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
