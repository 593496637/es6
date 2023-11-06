import foo from './foo.js';
foo.bar();

console.log('hellow world!');

if (module.hot) {
  module.hot.accept(() => {
    console.log('foo module updated');
  });
}
