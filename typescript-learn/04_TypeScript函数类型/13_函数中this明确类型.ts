let obj = {
  name: '小甜甜',
  getName() {
    return this.name;
  },
};

obj.getName();

function fn(this: { name: string }, info: { name: string }) {
  console.log(this);
}

fn.call({ name: '小甜甜' }, { name: '嘻嘻嘻' });

export {};
