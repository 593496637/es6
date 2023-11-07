// import $ from 'jquery';
import './styles.css';
import foo from './foo.js';
import logo from './abc.png';
foo.bar();

console.log('hellow world!');

// $(document.body).append('<div>hello world</div>');
// $(document.body).append(`<img src="${logo}" />`);

// 动态导入jQuery后，会自动拆分成一个单独的包，这个包会在使用时才会加载
import('jquery').then(($) => {
  $(document.body).append('<div>hello world</div>');
  $(document.body).append(`<img src="${logo}" />`);
});

if (module.hot) {
  module.hot.accept(() => {
    console.log('foo module updated');
  });
}
