import hbRequest from '..'
import type { IAccount } from '@/types'
type reqData = {
  code: string | number
  data: any
}

export function accountLoginRequest(account: IAccount) {
  return hbRequest.post<reqData>({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hbRequest.get<reqData>({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return hbRequest.get<reqData>({
    url: `/role/${id}/menu`
  })
}
