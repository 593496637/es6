import React, { PureComponent, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 } from 'uuid';
import './style.css';
export class App extends PureComponent {
  state = {
    list: [
      { id: v4(), name: '张三', nodeRef: createRef(null) },
      { id: v4(), name: '李四', nodeRef: createRef(null) },
      { id: v4(), name: '王五', nodeRef: createRef(null) },
      { id: v4(), name: '赵六', nodeRef: createRef(null) },
    ],
  };

  addBook = () => {
    this.setState((prevState) => ({
      list: [
        ...prevState.list,
        { id: v4(), name: '田七', nodeRef: createRef(null) },
      ],
    }));
  };

  removeBook = (index) => {
    this.setState((prevState) => {
      const newList = [...prevState.list];
      newList.splice(index, 1);
      return { list: newList };
    });
  };

  render() {
    const { list } = this.state;
    return (
      <div>
        <button
          onClick={() => {
            this.addBook();
          }}
        >
          添加
        </button>
        <TransitionGroup component='ul'>
          {list.map(({ id, name, nodeRef }, index) => (
            <CSSTransition
              key={id}
              nodeRef={nodeRef}
              timeout={{
                appear: 500,
                enter: 500,
                exit: 500,
              }}
              classNames='group'
            >
              <li ref={nodeRef}>
                {name}
                <button onClick={() => this.removeBook(index)}>X</button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
