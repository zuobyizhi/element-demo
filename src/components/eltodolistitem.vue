<template>
  <div class="item-white-block item gray-thin-border">
    <div class="head-pic-div img-scale"><img class="img-self-adaptation" v-lazy="img"></img></div>
    <div class="msg-div">
      <h3 class="item-title">{{shorten(content, 16, '...')}}</h3>
      <div class="item-content line-feed">{{shorten(content, 100, '...')}}</div>
      <div class="item-bottom">
        <ul>
          <div class="float-left"><i class="el-icon-time"></i></div>
          <!-- i class="el-icon-time float-left"></i -->
          <div class="float-left">{{time}}</div>
          <div class="float-left">{{type}}</div>
          <div class="float-left"><button class="btn" @click="updateItem">修改</button></div>
          <div class="float-left"><button class="btn" @click="deleteItem">删除</button></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const utils = require('../utils/utils.js')
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
  text-align: left;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
}
.head-pic-div {
  float: left;
  height: 158px;
  width: 160px;
}
.btn {
  color: #20a0ff;
  background-color: #fff;
  border-color: #fff;
  padding: 0;
  font-size: 12px;
  border-width: 0;
}
.item-bottom-line {
  border-bottom: 1px solid #d7d7d7;
}
.item-white-block {
  background-color: #fff;
  margin-bottom: 12px;
}
.item-content {
  margin: 5px;
  left: 0;
  color: #666;
  font-size: 14px;
  line-height: 23px;
  text-align: left;
}
.item {
  width: 100%;
  min-height: 160px;
  position: relative;
}
.msg-div {
  float: left;
  display: block;
  width: 360px;
  height: 160px;
  position: relative;
  padding: 12px 16px;
}
.item-bottom {
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: block;
  font-size: 12px;
  color: #999;
}
.float-left {
  float: left;
  margin-left: 10px;
}

h1, h2, h3 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
