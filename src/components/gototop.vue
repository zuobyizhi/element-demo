<template>
  <div class="item" id="gototopbtn">
    <el-button icon="arrow-up" class="pointerevents-none" size="small"></el-button>
  </div>
</template>

<script>
export default {
  name: 'go-to-top',
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    const obtn = document.getElementById('gototopbtn')  // 获取回到顶部按钮的ID
    const clientHeight = document.documentElement.clientHeight   // 获取可视区域的高度
    let timer = null // 定义一个定时器
    let isTop = true // 定义一个布尔值，用于判断是否到达顶部

    window.onscroll = function () {         // 滚动条滚动事件
      // 获取滚动条的滚动高度
      const osTop = document.documentElement.scrollTop || document.body.scrollTop

      if (osTop >= clientHeight) {  // 如果滚动高度大于可视区域高度，则显示回到顶部按钮
        obtn.style.display = 'block'
      } else {         // 否则隐藏
        // obtn.style.display = 'none'
      }

      // 主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
      if (!isTop) {
        clearInterval(timer)
      }
      isTop = false
    }

    obtn.onclick = function () {    // 回到顶部按钮点击事件
      // 设置一个定时器
      timer = setInterval(function () {
        // 获取滚动条的滚动高度
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        // 用于设置速度差，产生缓动的效果
        const speed = Math.floor(-osTop / 6)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + speed
        isTop = true  // 用于阻止滚动事件清除定时器
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  methods: {
    work () {
      // this.$emit('work', this.itemId)
    },
    goToTop () {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.item:hover {
  cursor: pointer;
}
</style>
