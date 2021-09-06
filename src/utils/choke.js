// 节流函数
export default function(func, time) {
    let pre = Date.now()
    return function(...args) {
        let now = Date.now()
        if(now - pre < time) {
            pre = now
            console.log("点击过快")
            return
        } else {
            func(...args)
            pre = now
        }
    }
}