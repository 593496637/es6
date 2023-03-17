<script>
import { h } from "vue";
export default {
  render() {
    return h("div", { class: "app" }, [
      h("h1", { class: "title" }, "安装插件"),
      h("p", { class: "content" }, "p标签"),
    ]);
  },
};
</script>

<style lang="scss" scoped></style>
