<script>
import { h, resolveComponent } from "vue";
export default {
  data() {
    return {
      counter: 0,
    };
  },
  render() {
    return h("div", { class: "app" }, [
      h("h1", { class: "title" }, "当前计数：" + this.counter),
      h(
        "button",
        {
          class: "btn",
          onClick: () => {
            this.counter++;
          },
        },
        "加1"
      ),
      h(
        "button",
        {
          class: "btn",
          onClick: () => {
            this.counter--;
          },
        },
        "减1"
      ),
      h(resolveComponent('MyComponent')),
    ]);
  },
};
</script>

<style lang="scss" scoped></style>
