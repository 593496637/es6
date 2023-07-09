// 歌词解析
// 1. 传入歌词字符串，返回一个数组，数组中每一项是一个对象，包含歌词和时间
// 2. 歌词格式：[00:00.000] 作曲 : 周杰伦

type lyricObj = {
  time: string;
  lyric: string;
};

function parseLyric(lyric: string): lyricObj[] {
  const lyricArr: lyricObj[] = [];

  lyricArr.push({
    time: '00:00.000',
    lyric: '作曲 : 周杰伦',
  });
  return lyricArr;
}

const lyricInfo = parseLyric('[00:00.000] 作曲 : 周杰伦');

// 遍历
for (let i = 0; i < lyricInfo.length; i++) {
  const obj = lyricInfo[i];
  console.log(obj.lyric, obj.time);
}

export {};