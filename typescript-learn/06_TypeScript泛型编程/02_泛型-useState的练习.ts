// 元组：useState函数

function useState<T>(initialState: T): [T, (newState: T) => void] {
  let state = initialState;
  function setState(newState: T) {
    state = newState;
  }
  return [state, setState];
}

// 使用:类型可以省略
const [count, setCount] = useState(0);
const [message, setMessage] = useState('hello');
// 但是数组类型不能省略，因为没办法自动推导出来的类型需要手动指定
const [banner, setBanner] = useState<any[]>([]);

export {};
