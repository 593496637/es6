import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
} from 'class-validator';

/** bcrypt 只处理密码的前 72 个 UTF-8 字节，按字节而不是字符限制输入。 */
export function MaxByteLength(
  maxBytes: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    registerDecorator({
      name: 'maxByteLength',
      target: target.constructor,
      propertyName: propertyKey.toString(),
      constraints: [maxBytes],
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return (
            typeof value === 'string' &&
            Buffer.byteLength(value, 'utf8') <= maxBytes
          );
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} 的 UTF-8 编码不能超过 ${String(args.constraints[0])} 字节`;
        },
      },
    });
  };
}
