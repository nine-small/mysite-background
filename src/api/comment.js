import request from '@/utils/request';
// 添加评论

export async function addComment(data){
    return await request({
        url:'/api/comment',
        method:'post',
        data
    })
}

//  分页获取评论

export async  function getComment(page=1,limit=5){
    return await request({
        url:'/api/comment',
        method:'get',
        params:{
            page,
            limit
        }
    })
}

//  删除评论

export async  function delComment(id){
    return await request({
        url:'/api/comment/'+id,
        method:'delete'
    })
}