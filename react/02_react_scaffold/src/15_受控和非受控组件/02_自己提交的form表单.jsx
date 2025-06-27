import React, { PureComponent, createRef } from 'react';

export class App2 extends PureComponent {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      remember: false,
      hobbies: [
        {
          id: 1,
          name: '篮球',
          checked: false,
        },
        {
          id: 2,
          name: '足球',
          checked: false,
        },
        {
          id: 3,
          name: '乒乓球',
          checked: false,
        },
      ],
      selectedOption: [],
      // 非受控组件
      inputValue: '',
    };

    this.inputRef = createRef();
  }

  // 提交表单
  submitForm(e) {
    e.preventDefault();
    // 获取state下所有数据
    console.log(this.state);
    // 非受控组件数据
    console.log(this.inputRef.current.value);
  }

  handleInputChange(e) {
    console.log(e.target.name);
    // username or password
    const key = e.target.name;
    // value
    const value = e.target.value;
    console.log(value);
    this.setState({
      [key]: value,
    });
  }

  checkboxChange(e) {
    console.log(e.target.checked);
    this.setState({
      remember: e.target.checked,
    });
  }

  // checkbox change
  checkboxMultipleChange(e) {
    const { hobbies } = this.state;
    const { name, checked } = e.target;
    const newHobbies = hobbies.map((item) => {
      if (item.id === parseInt(name)) {
        item.checked = checked;
      }
      return item;
    });

    this.setState({
      hobbies: newHobbies,
    });
  }

  handleSelectChange(e) {
    const { target } = e;
    // 方式一
    const options = Array.from(target.selectedOptions);
    const values = options.map((option) => option.value);

    // 方式二
    // const values2 = [...target.selectedOptions].map(({value}) => value);
    // 方式三
    // const values3 = Array.from(
    //   target.selectedOptions,
    //   (option) => option.value
    // );

    this.setState({
      selectedOption: values,
    });
  }

  render() {
    const { username, password, remember, hobbies } = this.state;
    return (
      <form onSubmit={(e) => this.submitForm(e)}>
        {/* 受控组件 */}

        {/* 用户名 */}
        <label htmlFor='username'>
          用户名：
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => this.handleInputChange(e)}
          />
        </label>
        {/* 密码 */}
        <label htmlFor='password'>
          密码：
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => this.handleInputChange(e)}
          />
        </label>
        {/* checkbox */}
        <div>
          <label htmlFor='remember'>
            <input
              type='checkbox'
              name='remember'
              id='remember'
              checked={remember}
              onChange={(e) => this.checkboxChange(e)}
            />
            记住我：
          </label>
        </div>

        <div>
          {/* checkbox 爱好多选 */}
          爱好：
          {hobbies.map((item, index) => {
            return (
              <label key={index} htmlFor={item.id}>
                <input
                  type='checkbox'
                  name={item.id}
                  id={item.id}
                  checked={item.checked}
                  onChange={(e) => this.checkboxMultipleChange(e)}
                />
                {item.name}
              </label>
            );
          })}
        </div>

        <div>
          <label>
            Select field:
            <select
              multiple
              value={this.state.selectedOption}
              onChange={(e) => this.handleSelectChange(e)}
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </select>
          </label>
        </div>

        {/* 非受控组件:不推荐使用 */}
        <label htmlFor='input'>
          非受控组件：
          <input
            type='text'
            defaultValue={this.state.inputValue}
            ref={this.inputRef}
            id='input'
          />
        </label>

        <div>
          <button type='submit'>提交</button>
        </div>
      </form>
    );
  }
}

export default App2;
