### 38.infer递归的解释
我来一点一点解释这个类型定义。

首先，`type Reverse<T extends any[], R extends any[] = []>` 定义了一个泛型函数 `Reverse`，它接受两个泛型参数：

* `T` 是任何类型的数组
* `R` 是任何类型的数组，默认值为空数组

`Reverse` 函数的返回值是 `T` 数组的反转。

```typescript
const numbers = [1, 2, 3, 4, 5];

const reversedNumbers = Reverse(numbers);

// reversedNumbers 等于 [5, 4, 3, 2, 1]
```

现在，我们来逐个分析 `Reverse` 函数的类型定义。

```typescript
type Reverse<T extends any[], R extends any[] = []> =
  T extends [
    infer U,
    ...infer Rest
  ]
  ? Reverse<Rest, [U, ...R]>
  : R;
```

首先，我们来分析 `T extends [infer U, ...infer Rest]` 这个条件。

这个条件表示，`T` 必须是以下类型之一：

* 一个只有一个元素的数组，且该元素的类型是 `U`
* 一个包含多个元素的数组，且该数组的第一个元素的类型是 `U`，其余元素的类型是 `Rest`

如果 `T` 满足这个条件，那么 `Reverse` 函数会返回 `Reverse<Rest, [U, ...R]>`。

`Reverse<Rest, [U, ...R]>` 表示，`Reverse` 函数会递归地调用自己，并将 `T` 数组的其余元素作为 `Rest` 参数传递给 `Reverse` 函数。

例如，如果 `T` 等于 `[1, 2, 3, 4, 5]`，那么 `U` 等于 `1`，`Rest` 等于 `[2, 3, 4, 5]`。因此，`Reverse` 函数会返回 `Reverse<[2, 3, 4, 5], [1, ...R]>`。

如果 `T` 不满足 `T extends [infer U, ...infer Rest]` 这个条件，那么 `Reverse` 函数会返回 `R`。

例如，如果 `T` 等于 `"hello"`，那么 `Reverse` 函数会返回 `R`，即 `"hello"`。

总而言之，`Reverse` 函数的工作原理是：

1. 如果 `T` 是只有一个元素的数组，那么将该元素作为 `U` 参数传递给 `Reverse` 函数，并将 `R` 设置为 `[U]`。
2. 如果 `T` 是包含多个元素的数组，那么将该数组的第一个元素作为 `U` 参数传递给 `Reverse` 函数，并将 `R` 设置为 `[U, ...Reverse(Rest)]`，其中 `Rest` 是 `T` 数组的其余元素。
