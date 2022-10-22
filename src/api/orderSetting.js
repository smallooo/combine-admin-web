import request from '@/utils/request'
export function getOrderSetting(id) {
  return request({
    url:'/orderSetting/'+id,
    method:'get',
  })
}

export function createDelegateUser(id,data) {
  return request({
    url:'/hfshanghu/createuser/',
    method:'post',
    data:data
  })
}
