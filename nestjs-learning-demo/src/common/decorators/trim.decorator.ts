import { Transform } from 'class-transformer';

/** 在 ValidationPipe 校验前去掉字符串两端空白；不会改动非字符串值。 */
export const Trim = () =>
  Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  );
