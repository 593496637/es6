<template>
  <div>
    info:{{ info }}
    <button @click="info.name='啊拉萨的咖啡机'">使用对象值修改info</button>
    <button @click="changeInfo">修改info</button>
  </div>
  <div>
    infoReadOnly:{{ infoReadOnly }}
    <button @click="infoReadOnly.name='无法修改'">无法修改InfoReadOnly</button>
    <button @click="changeInfoReadOnly">修改InfoReadOnly</button>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },

    infoReadOnly: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  // 单向数据流
  emits: ['changeInfoName','changeInfoReadOnlyName'],
  setup(props, context) {
    const changeInfo = () => {
      context.emit('changeInfoName', '小妹妹');
    };

    const changeInfoReadOnly=()=>{
      context.emit('changeInfoReadOnlyName', '弹道导弹')
    }
    return {
      changeInfo,
      changeInfoReadOnly
    };
  },
};
</script>

<style lang="scss" scoped></style>
