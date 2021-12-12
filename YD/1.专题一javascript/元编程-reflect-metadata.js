require('reflect-metadata')
class C {
  constructor(){
    this.test="类里的方法"
  }
  method() { }
}

let obj = new C()
Reflect.defineMetadata('test', '妹妹', obj)
let metadataValue = Reflect.getMetadata('test', obj)
console.log(metadataValue);
console.log(obj.test);