import request from '..'
import type { IAccount } from '@/types'

export function login(data: IAccount) {
  return request.post({
    url: '/login',
    method: 'post',
    data
  })
}
