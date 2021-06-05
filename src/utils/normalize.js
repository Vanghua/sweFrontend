export default {
    // 递归规范省市区县数据
    normalize: function(data) {
        if(data.children == undefined) {
            return {
              value: data.name,
              label: data.name
            }
          } else {
            let childrenData = []
            for(var i = 0; i < data.children.length; i++)
              childrenData.push(this.normalize(data.children[i]))
            return {
                value: data.name,
                label: data.name,
                children: childrenData
            }
        }
    }
}