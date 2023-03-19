<script lang="jsx">
import About from './About.vue';
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
  },
  render() {
    return (
      <div class='app'>
        <h1 class='title'>当前计数：{this.counter}</h1>
        <button class='btn' onClick={this.increment}>
          加1
        </button>
        <button class='btn' onClick={this.decrement}>
          减1
        </button>
        <About />
      </div>
    );
  },
};
</script>
