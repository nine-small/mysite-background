import request from '@/utils/request';

// 新增项目

export async function addProject(data) {
  return await request({
    url: '/api/project',
    method: 'post',
    data
  })
}

//  获的所有项目

export async function getProject() {
  return await request({
    url: '/api/project',
    method: 'get'
  })
}

// 删除项目

export async function delProject(id) {
  return await request({
    url: '/api/project/' + id,
    method: 'delete'
  })
}

// 编辑项目

export async function editProject(id, data) {
  return await request({
    url: '/api/project/' + id,
    method: 'put',
    data
  })
}
