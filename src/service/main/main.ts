import hbRequest from '..'
type reqData = {
  code: string | number
  data: any
}
export function getEntireRoles() {
  return hbRequest.post<reqData>({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hbRequest.post<reqData>({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return hbRequest.post<reqData>({
    url: '/menu/list'
  })
}
