# vue与react区别

## vue
- vue内部有数据劫持，当数据改变后，vue会自动调用render函数更新界面

## react为什么要用setState
- react中的数据没有做数据劫持，当数据改变后界面不会自动更新，需要手动调用setState方法，setState里面会调用render函数更新界面
- 我有一个数据`this.state={message:""}`，如果我调用render函数后设置message还是空字符串，render函数还是会执行，这时候性能可能就有点差，这时候我们可以使用钩子函数`shouldComponentUpdate`来做判断，判断message是否有数据，有的化`return true`，否则`return false`，但是这样还是有点麻烦，因此还有一个更好的class是`PureComponent`。

