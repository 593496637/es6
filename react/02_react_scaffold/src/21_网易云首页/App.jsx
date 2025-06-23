import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className='netease-music'>
      {/* 顶部导航栏 */}
      <header className='header'>
        <div className='logo'>
          <img
            src='https://admirable-jalebi-ce44af.netlify.app/static/wyy.png'
            alt='网易云'
          />
        </div>
        <nav className='nav'>
          <a href='/discover' className='active'>
            发现音乐
          </a>
          <a href='/my'>我的音乐</a>
          <a href='/friend'>朋友</a>
          <a href='/store'>商城</a>
          <a href='/musician'>音乐人</a>
          <a href='/download'>下载客户端</a>
        </nav>
        <div className='search'>
          <input type='text' placeholder='音乐/视频/电台/用户' />
        </div>
        <div className='user'>
          <button className='login-btn'>登录</button>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className='main'>
        {/* 轮播图 */}
        <div className='banner'>
          {/* 这里可以添加轮播图组件 */}
          <div className='banner-placeholder'>轮播图区域</div>
        </div>

        {/* 推荐内容 */}
        <div className='recommend'>
          <h2>热门推荐</h2>
          <div className='recommend-list'>
            {/* 推荐音乐卡片 */}
            <div className='music-card'>
              <div className='cover'>
                <img
                  src='https://p1.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg'
                  alt='音乐封面'
                />
              </div>
              <p className='title'>热门华语</p>
            </div>
            <div className='music-card'>
              <div className='cover'>
                <img
                  src='https://p1.music.126.net/5NP_NsNXZwDRWsvfZ2Bzjg==/109951166961376739.jpg'
                  alt='音乐封面'
                />
              </div>
              <p className='title'>流行经典</p>
            </div>
            <div className='music-card'>
              <div className='cover'>
                <img
                  src='https://p1.music.126.net/wYuFxK1i_5jqs2Wpp_BzPQ==/109951166961388699.jpg'
                  alt='音乐封面'
                />
              </div>
              <p className='title'>欧美热榜</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
