export default function changeAddress(target) {
    let temp = ''
    let ans = []
    for(var i = 0; i < target.length; i++)
        if(target[i] === '|') {
            ans.push(temp)
            temp = ''
        } else if(i == target.length - 1) {
            temp += target[i]
            ans.push(temp)
        } else
            temp += target[i]
    return ans
}