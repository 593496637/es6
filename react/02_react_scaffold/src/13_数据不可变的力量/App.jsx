import React, { PureComponent } from "react";

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { id: 1, name: "《React.js 小书》", price: 66.6, count: 1 },
        { id: 2, name: "《Vue.js 小书》", price: 77.7, count: 1 },
        { id: 3, name: "《Angular.js 小书》", price: 88.8, count: 1 },
        { id: 4, name: "《Node.js 小书》", price: 99.9, count: 1 },
      ],
    };
  }

  increment = (id) => {
    const { books } = this.state;
    const newBooks = books.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    this.setState({
      books: newBooks,
    });
  };

  // 随机生成一个书籍对象
  getNewBook = () => {
    const id = Math.floor(Math.random() * 10000);
    const name = `《新书${id}》`;
    const price = Math.floor(Math.random() * 100);
    const count = 1;
    return { id, name, price, count };
  };

  addNewBook = () => {
    // 错误的做法：在PureComponent中，不要直接修改state中的数据
    // PureComponent底层实现了一个浅比较，如果发现state中的数据没有变化，就不会重新渲染
    // this.state.books.push({id: 5, name: "《新书5》", price: 100, count: 1});
    // this.setState({
    //   books: this.state.books,
    // });

    // 正确的做法：创建一个新的数组，将新的数据添加到新的数组中
    const newBooks = [...this.state.books];
    newBooks.push(this.getNewBook());
    this.setState({
      books: newBooks,
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.books.map((item, index) => {
            return (
              <li key={index}>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <span>{item.count}</span>
                <button onClick={() => this.increment(item.id)}>增加</button>
              </li>
            );
          })}
        </ul>
        {/* 添加新书籍 */}
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}

export default App;
