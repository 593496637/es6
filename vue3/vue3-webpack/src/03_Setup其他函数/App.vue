<template>
  <show-info
    :info="info"
    :infoReadOnly="infoReadOnly"
    @changeInfoName="changeInfoName"
    @changeInfoReadOnlyName="changeInfoReadOnlyName"
  ></show-info>
</template>

<script>
import { isProxy, reactive, readonly ,toRaw} from 'vue';
import ShowInfo from './ShowInfo.vue';
export default {
  components: {
    ShowInfo,
  },
  setup() {
    const info = reactive({
      name: '哈哈',
      age: 12,
    });
    
    // 是否是proxy代理对象
    console.log(isProxy(info));

    const infoReadOnly = readonly(info);

    const changeInfoName = (payload) => {
      info.name = payload;
    };

    const changeInfoReadOnlyName = (payload) => {
      // 无法修改readOnly包裹的数据
      // infoReadOnly.name = payload;

      // 可以修改info的数据
      info.name = payload;
    };

    return {
      info,
      changeInfoName,
      infoReadOnly,
      changeInfoReadOnlyName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
