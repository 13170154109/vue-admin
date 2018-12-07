<template>
<li class="tree-li">
  <!-- 显示当前节点名称 -->
  <span>{{ node.title }}</span>
  <!-- 如果存在孩子节点，循环子节点数组，并递归调用本组件。 -->
  <ul class="child--box" v-if="isHasChildren">
    <tree-node v-for="(item,index) in node.children" :key="index" :node="item" />
  </ul>
</li>
</template>
<script>
  import TreeNode from './tree'
  export default {
    name: 'tree-node',
    props:["node"],
    components: {
      TreeNode
    },
    created () {
      console.log(this.node)
    },
    computed: {
      isHasChildren () {
        let flag = false
        if (this.node.children && this.node.children.length > 0) {
          flag = true
        }
        return flag
      }
    }
  }
</script>
<style lang="less">
  .tree-li {
    position: relative;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
    .child--box {
      position: absolute;
      left: 250px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      &::before {
        content: '';
        position: absolute;
        left: -65px;
        top: 25px;
        height: calc(100% - 50px);
        width: 1px;
        background-color: #f8cb00;
        z-index: 1;
      }
      li {
        &::before {
          background-color: #f8cb00;
        }
      }
    }
  }
</style>
