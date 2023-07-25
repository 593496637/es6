// 修饰符 ： + 代表必须存在，- 意思是去掉修饰符，? 代表可选，
// readonly 代表只读

type MapPerson<Type> = {
  -readonly [Property in keyof Type]-?: Type[Property];
};

interface IPerson {
  name: string;
  age?: number;
  readonly height: number;
  address?: string;
}

type NewPerson = MapPerson<IPerson>;

export {};
