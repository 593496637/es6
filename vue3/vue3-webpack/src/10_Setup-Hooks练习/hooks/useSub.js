import { ref, watch } from 'vue';

export const useSub = (a, b) => {
  const subNum = ref(0);
  watch([a, b], ([newA, newB]) => {
    subFn(newA, newB);
  });

  const subFn = (a1, b1) => {
    subNum.value = a1 - b1;
  };

  return {
    subNum,
    subFn,
  };
};
