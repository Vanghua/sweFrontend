export function EngToChn(type) {
    switch(type) {
        case 'all':
            return '全局管理员'
        case 'assign':
            return '调度管理员'
        case 'order':
            return '订单管理员'
        case 'financial':
            return '财务管理员'
        case 'user':
            return '普通用户'
        case 'trans':
            return '运输员'
        case 'people':
            return '人事管理员'
        case 'warehouse':
            return '仓库管理员'
    }
}

export function ChnToEng(type) {
    switch(type) {
        case '全局管理员':
            return 'all'
        case '调度管理员':
            return 'assign'
        case '订单管理员':
            return 'order'
        case '财务管理与':
            return 'financial'
        case '普通用户':
            return 'user'
        case '运输员':
            return 'user'
        case '人事管理员':
            return 'people'
        case '仓库管理员':
            return 'warehouse'
    }
}