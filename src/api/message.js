import request from '@/utils/request';
// 添加评论

export async function addMessage(data){
    return await request({
        url:'/api/message',
        method:'post',
        data
    })
}

//  分页获取评论

export async  function getMessage(page=1,limit=5){
    return await request({
        url:'/api/message',
        method:'get',
        params:{
            page,
            limit
        }
    })
}

//  删除评论

export async  function delMessage(id){
    return await request({
        url:'/api/message/'+id,
        method:'delete'
    })
}