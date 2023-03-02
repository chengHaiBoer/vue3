import hbRequest from '@/service'
type reqData = {
  code: string | number
  data: any
}
export function getAmountListData() {
  return hbRequest.get<reqData>({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return hbRequest.get<reqData>({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return hbRequest.get<reqData>({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return hbRequest.get<reqData>({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return hbRequest.get<reqData>({
    url: '/goods/address/sale'
  })
}
