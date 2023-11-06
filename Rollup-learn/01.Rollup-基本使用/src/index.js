import _ from 'lodash-es/camelCase.js';
import { log } from './logger.js';
import messages from './messages.js';
import { name, version } from '../package.json';

import cjs from './cjs.module.js';

// 使用模块
const msg = messages.hi;
console.log(msg);

console.log(name, version);

log(_.camelCase('hello world'));

console.log(cjs)