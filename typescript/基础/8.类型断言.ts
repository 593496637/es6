interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
// 值 as 类型
// 此时可以使用类型断言，将 animal 断言成 Fish
// 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false
}

// 将一个父类断言为一个更加具体的子类
class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 20
}

function isApiError(error: Error) {
  if (typeof (error as ApiError) === 'number') {
    return true
  }
  return false
}




export default {}