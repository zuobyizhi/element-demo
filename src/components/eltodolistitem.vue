<template>
  <div class="item-white-block item gray-thin-border">
    <div class="head-pic-div img-scale float-left"><img class="img-self-adaptation" v-lazy="img"></img></div>
    <div class="msg-div float-left pos-relative">
      <h3 class="item-title title-font-size align-left">{{shorten(content, 16, '...')}}</h3>
      <div class="item-content line-feed content-font-size font-color-dark-gray align-left">{{shorten(content, 100, '...')}}</div>
      <div class="item-bottom tip-font-size font-color-light-gray">
        <ul>
          <div class="float-left margin-left-10px"><i class="el-icon-time"></i></div>
          <div class="float-left margin-left-5px">{{time}}</div>
          <div class="float-left margin-left-10px">{{type}}</div>
          <div class="float-left margin-left-20px"><button class="a-btn" @click="updateItem">修改</button></div>
          <div class="float-left margin-left-5px"><button class="a-btn" @click="deleteItem">删除</button></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../utils/utils.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
      img: 'http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg'
    }
  },
  props: {
    content: String,
    title: String,
    time: String,
    type: String,
    itemId: Number
  },
  methods: {
    updateItem () {
      this.$emit('updateItem', this.itemId)
    },
    shorten (text, num, tail = '') {
      return utils.shorten(text, num, tail)
    },
    deleteItem () {
      this.$emit('deleteItem', this.itemId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-title {
  margin-bottom: 10px;
  font-weight: 700;
}
.head-pic-div {
  height: 158px;
  width: 160px;
}
.item-white-block {
  background-color: #fff;
  margin-bottom: 12px;
}
.item-content {
  margin: 5px;
  left: 0;
}
.item {
  width: 100%;
  min-height: 160px;
}
.msg-div {
  width: 400px;
  height: 160px;
  padding: 12px 16px;
}
.item-bottom {
  position: absolute;
  bottom: 12px;
  left: 12px;
}
</style>
