<template>
  <div class="item" id="gototopbtn">
    <!-- img class="img-self-adaptation item" src="http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg"></img >
    <div class="toTop">  
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class = "toTopSvg"  viewbox="0 0 24 24">  
        <path fill="#fff" d="M42.057,37.732c0,0,4.139-25.58-9.78-36.207c-0.307-0.233-0.573-0.322-0.802-0.329  
        c-0.227,0.002-0.493,0.083-0.796,0.311c-13.676,10.31-8.95,35.992-8.95,35.992c-10.18,8-7.703,9.151-1.894,23.262  
        c1.108,2.693,3.048,2.06,3.926,0.115c0.877-1.943,2.815-6.232,2.815-6.232l11.029,0.128c0,0,2.035,4.334,2.959,6.298  
        c0.922,1.965,2.877,2.644,3.924-0.024C49.974,47.064,52.423,45.969,42.057,37.732z M31.726,23.155  
        c-2.546-0.03-4.633-2.118-4.664-4.665c-0.029-2.547,2.012-4.587,4.559-4.558c2.546,0.029,4.634,2.117,4.663,4.664  
        C36.314,21.143,34.272,23.184,31.726,23.155z" class="tt"/>  
      </svg>  
    </div-->
    <el-button icon="arrow-up" class="pointerevents-none" size="small"></el-button>
  </div>
</template>

<script>
export default {
  name: 'hello',
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
.toTop{  
  width: 36px;  
  height: 36px;  
  margin: 0px auto;  
  border-radius: 50px;  
  background: #717171;  
  cursor: pointer;
}  
.toTopSvg{  
  width: 32px;  
  height: 32px;  
  // margin:9px;
}  
.toTop:hover {  
  background: #DBDBDB
}  
.toTop:hover .tt {  
  fill: #000
}
</style>
