<template>
<!-- 城市学校选择组件 -->
  <div class="citySelection">
    <el-select v-model="value.province" placeholder="请选择省" class="select-province">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="value.city" placeholder="请选择市" class="select-city">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="value.school" v-if="isSelectSchool" placeholder="请选择学校" class="select-school">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "citySelection",
  props: ['isSelectSchool'],
  data() {
    return {
      // isSelectSchool:false,
      options: [
        {
          value: "选项1",
          label: "安徽省"
        },
        {
          value: "选项2",
          label: "江苏省"
        },
        {
          value: "选项3",
          label: "浙江省"
        },
        {
          value: "选项4",
          label: "四川省"
        },
        {
          value: "选项5",
          label: "广东省"
        }
      ],
      value: {},
    };
  },
  created() {
    console.log(this.isSelectSchool);
  },
  methods: {
   
  },
  watch: {}
};
</script>
<style lang="less">
.citySelection{
  display: inline-block;
}
</style>
