import { ref, watch } from 'vue';
const useAdd = (a, b) => {
  const addNum = ref(0);
  watch([a, b], ([newA, newB]) => {
    console.log(a, newA);
    console.log(b, newB);
    addFn(newA, newB);
  });

  const addFn = (a1, b1) => {
    addNum.value = a1 + b1;
  };

  return {
    addNum,
    addFn,
  };
};

export default useAdd;
