import { registerDecorator, type ValidationArguments } from 'class-validator';

export function MaxByteLength(maxBytes: number): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    registerDecorator({
      name: 'maxByteLength',
      target: target.constructor,
      propertyName: propertyKey.toString(),
      constraints: [maxBytes],
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
