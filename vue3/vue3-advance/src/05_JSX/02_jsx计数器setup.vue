<script lang="jsx">
import { ref } from "vue";
import About from "./About.vue";
export default {
  setup() {
    const counter = ref(0);
    const increment = () => {
      counter.value++;
    };
    const decrement = () => {
      counter.value--;
    };
    return () => (
      <div class="app">
        <h1 class="title">当前计数setup：{counter.value}</h1>
        <button class="btn" onClick={increment}>
          加1
        </button>
        <button class="btn" onClick={decrement}>
          减1
        </button>
        <About />
      </div>
    );
  },
};
</script>
