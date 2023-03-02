import hbRequest from '@/service'

type reqData = {
  code: string | number
  data: any
}
export function postUsersListData(queryInfo: any) {
  return hbRequest.post<reqData>({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hbRequest.delete<reqData>({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return hbRequest.post<reqData>({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hbRequest.patch<reqData>({
    url: `/users/${id}`,
    data: userInfo
  })
}

export function postPageListData(pageName: string, queryInfo: any) {
  return hbRequest.post<reqData>({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return hbRequest.delete<reqData>({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hbRequest.post<reqData>({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hbRequest.patch<reqData>({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
