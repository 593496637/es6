import React, { Component } from 'react';
import './App.css';
import TabBar from './TabBar';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: ['标题1', '标题2', '标题3'],
      tabIndex: 1,
    };
  }

  // 切换tab-bar-item
  changeTab(index) {
    this.setState({
      tabIndex: index,
    });
  }

  // 根据不同的标题，返回不同的组件
  getItemType(text) {
    if (text === '标题1') {
      return <button>{text}</button>;
    } else if (text === '标题2') {
      return <h1 style={{ color: 'red' }}>{text}</h1>;
    } else if (text === '标题3') {
      return <h2 style={{ color: 'blue' }}>{text}</h2>;
    }
  }

  
  render() {
    const { titles, tabIndex } = this.state;
    return (
      <div>
        {/* 作用域插槽 */}
        <TabBar
          titles={titles}
          tabIndex={tabIndex}
          changeTab={(index) => this.changeTab(index)}
          itemType={(text) => this.getItemType(text)}
        />
        <div className='content'>
          <h1>{titles[tabIndex]}</h1>
        </div>
      </div>
    );
  }
}

export default App;
