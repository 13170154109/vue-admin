<template>
  <div class="sliderBox" v-if="showSliderBox" @click="hideSliderBox">
    <div class="slider" :class="{ 'active': animate }" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sliderBox',
    props: ['showSliderBox'],
    data () {
      return {
        animate: false
      }
    },
    created () {
      console.log(this.showSliderBox)
    },
    methods: {
      hideSliderBox () {
        this.$emit('hideSliderBox')
      }
    },
    watch: {
      showSliderBox (newVal, oldVal) {
        console.log(newVal, oldVal)
        if (newVal) {
          let timer = setTimeout(() => {
            this.animate = true
            clearTimeout(timer)
          }, 10)
        } else {
          this.animate = false
        }
      }
    }
  }
</script>
<style lang="less">
.sliderBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  .slider {
    width: 550px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(600px);
    height: calc(100% - 70px);
    overflow-y: auto;
    transition: .13s linear;
    background-color: #fff;
    box-shadow: 0 0 18px rgba(53, 53, 53,.15);
    &.active {
       transform: translateX(0);
    }
  }
}
</style>
