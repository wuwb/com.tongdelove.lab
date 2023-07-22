import { request } from '@umijs/max';


// 查询菜单列表
export function listMenu(query) {
    return request('/system/menu/list', {
        method: 'get',
        params: query
    })
}

// 查询菜单详细
export function getMenu(menuId) {
    return request('/system/menu/' + menuId, {
        method: 'get'
    })
}

// 查询菜单下拉树结构
export function treeselect() {
    return request('/system/menu/treeselect', {
        method: 'get'
    })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
    return request('/system/menu/roleMenuTreeselect/' + roleId, {
        method: 'get'
    })
}

// 新增菜单
export function addMenu(data) {
    return request('/system/menu', {
        method: 'post',
        data: data
    })
}

// 修改菜单
export function updateMenu(data) {
    return request('/system/menu', {
        method: 'put',
        data: data
    })
}

// 删除菜单
export function delMenu(menuId) {
    return request('/system/menu/' + menuId, {
        method: 'delete'
    })
}
