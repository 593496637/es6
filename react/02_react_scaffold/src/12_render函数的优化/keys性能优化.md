## key的性能优化
- 当我们遍历列表时，总会有一个警告，让我们加入一个key属性
### 方式一：在最后位置插入数据
- 这种情况，有无key意义并不大
### 方式二：在前面插入数据
- 这种做法，在没有key的情况下，所有li都需要进行修改；
### 当子元素（这里的li）拥有key时，react使用key来匹配原有树上的子元素以及最新树上的子元素：
- 在下面这种情况下，key味111喝222的元素仅仅进行移位，不需要进行任何的修改；
- 将key味333的元素插入到最前面的位置即可；
### key的注意事项
- key应该是唯一的；
- key不要使用随机数（随机数在下一次render时，会重新生成一个数字）；
- 使用index作为key，对性能是没有优化的；