import notification from 'ant-design-vue/es/notification'

export default function fetchAPI(url, method, data) {
    // 给post请求加上请求头
    const headers = {
        'Content-Type': 'application/json'
    }
    // 请求体
    const body = data == null ? null : JSON.stringify(data)
    // URL起始
    const BASE_URL = '/api'
    // webapp的基础路径，手机上不存在跨域问题
    // const BASE_URL = 'http://39.96.175.246:8051/api'
    // 封装fetch
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + url, {
            headers: headers,
            method: method,
            body: body
            // fetch返回promise得再来一步then。quq
        }).then(ans => {
            if(ans.status == 200)
                return ans.text()
            else
                throw `${ans.status}, ${ans.statusText}`
        }).then(ans => {
            resolve(ans)
        }).catch(error => {
            notification.error({ message: '错误', description: error, key: 'ERROR' })
      })
    })
}