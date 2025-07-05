import React, { PureComponent } from 'react';
import withRouter from '../hoc/widthRouter';

export class HomeSongList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      songList: [
        { id: 1, name: '歌单1' },
        { id: 2, name: '歌单2' },
        { id: 3, name: '歌单3' },
      ],
    };
  }

  navigateTo = (id) => {
    this.props.router.navigate(`/detail/${id}`);
  };

  render() {
    return (
      <div>
        <h2>歌单</h2>
        <ul>
          {this.state.songList.map((item) => (
            <li
              key={item.id}
              onClick={() => this.navigateTo(item.id)}
              className='list-item'
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(HomeSongList);
