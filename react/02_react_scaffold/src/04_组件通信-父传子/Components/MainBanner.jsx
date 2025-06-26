import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MainBanner extends Component {
  // 可不写：如果没有需要初始化state，则不需要写，直接在render中使用this.props
  // constructor(props) {
  //   super(props);
  // }

  // 也可以把默认值放在这里
  // 从es2022开始，可以使用static关键字定义静态属性，react可以自动读取
  static defaultProps = {
    // 数组对象
    banners: [
      {
        title: 'banner1',
      },
      {
        title: 'banner2',
      },
    ],
  };

  // 类型检查
  static propTypes = {
    banners: PropTypes.array.isRequired,
  };

  render() {
    const { banners } = this.props;
    return (
      <div>
        <h4>banner</h4>
        <ul>
          {banners.map((item, index) => {
            return (
              <li className='banner' key={index}>
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// 类型检查
// MainBanner.propTypes = {
//   banners: PropTypes.array.isRequired,
// };

// 默认值
// MainBanner.defaultProps = {
//   // 数组对象
//   banners: [
//     {
//       title: "banner1",
//     },
//     {
//       title: "banner2",
//     },
//     {
//       title: "banner3",
//     },
//   ],
// };

export default MainBanner;
