import request from '@/utils/request';

// 按页获取文章

export async function getBlogList(page = 1, limit = 5, keyword = '', categoryId = -1) {
  const str = `?page=${page}&limit=${limit}&keyword=${keyword}&categoryId=${categoryId}`
  return await request({
    url: '/api/blog' + str,
    method: 'get'
  })
}


// 删除文章

export async function deleteBlogApi(id) {
  return await request({
    url: '/api/blog/' + id,
    method: 'delete'
  })
}

//  获取文章分类

export async function getBlogType() {
  return await request({
    url: '/api/blogtype',
    method: 'get'
  })
}

//  修改分类

export async function changeBlogType(id, data) {
  return await request({
    url: '/api/blogtype/' + id,
    method: 'put',
    data
  })
}


//  添加分类
export async function addBlogType(data) {
  return await request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

// 删除分类

export async function deleteBlogType(id) {
  return await request({
    url: '/api/blogtype/' + id,
    method: "delete"
  })
}

// 新增文章
export async function addArticle(data) {
  return await request({
    url: '/api/blog',
    method: "post",
    data
  })
}

// 获得文章
export async function getArticle(id){
  return await request({
    url:'/api/blog/'+id,
    method:'get',
  })
}

// 修改文章

export async function changeArticle(id,data){
  return await request({
    url:'/api/blog/'+id,
    method:'put',
    data
  })
}