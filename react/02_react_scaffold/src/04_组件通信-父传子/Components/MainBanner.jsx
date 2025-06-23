import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MainBanner extends Component {
  // 可不写
  // constructor(props) {
  //   super(props);
  // }

  // 也可以把默认值放在这里
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
