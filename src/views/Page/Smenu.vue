<!-- 声明为函数式组件只是接受props，不会响应式变化，不加入虚拟DOM -->
<template functional>
  <a-sub-menu :key="props.node.key" v-if="props.node.hasChild">
    <span slot="title" style="float: left;">
      <a-icon :type="props.node.icon"></a-icon>
      <span>{{props.node.title}}</span>
    </span>
    <S-Menu :node="node" v-for="node in props.node.children"></S-Menu>
  </a-sub-menu>
  <a-menu-item v-else :key="props.node.key">
    <span style="float: left;">
      <a-icon :type="props.node.icon"/>
      <span>{{props.node.title}}</span>
    </span>
  </a-menu-item>
</template>

<script>
// 递归组件实现嵌套菜单
export default {
  name: "S-Menu",
  props: {
    node: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>