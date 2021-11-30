import request from '@/utils/request';

export async function getBanner() {
  return await request({
    url: '/api/banner',
    method: 'get'
  })
}

export async function postBanner(data) {
  return await request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
