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
  if (typeof (error as ApiError).code === 'number') {
    return true
  }
  return false
}
console.log(isApiError(new ApiError()));

// 在这个例子中有一个更合适的方式来判断是不是 ApiError，那就是使用 instanceof
class ApiError2 extends Error {
  code: number = 0;
}
class HttpError2 extends Error {
  statusCode: number = 20
}

function isApiError2(error: Error) {
  console.log(error instanceof Error);
  if (error instanceof ApiError2) {
    return true
  }
  return false
}

// 这里结果为false，原因不明
console.log(isApiError2(new ApiError2()));



// interface
// ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了
// 此时就只能用类型断言，通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError 了
interface ApiError3 extends Error {
  code: number
}
interface HttpError extends Error {
  statusCode: number
}
function isApiError3(error: Error) {
  if (typeof (error as ApiError3).code === 'number') {
    return true
  }
  return false
}


// 通过类型断言将any断言为精确的类型
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom = getCacheData('tom') as Cat;
// tom.run();






export default {}