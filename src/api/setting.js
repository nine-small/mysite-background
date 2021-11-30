import request from '@/utils/request'

export async function getSetting(){
    return request({
        url:"/api/setting",
        method:'get'
    })
}

export async function setSetting(data){
    return request({
        url:"/api/setting",
        method:'put',
        data
    })
}