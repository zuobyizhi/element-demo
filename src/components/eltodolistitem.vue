<template>
  <div class="item-white-block item">
    <div class="head-pic-div"><img class="img-self-adaptation" src="http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg"></img></div>
    <div class="msg-div">
      <h3 class="item-title">{{content}}</h3>
      <div class="item-content">{{content}}</div>
      <div class="item-bottom">
        <ul>
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
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
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
}
.head-pic-div {
  float: left;
  height: 120px;
  width: 120px;
}
.btn {
  color: #20a0ff;
  background-color: #fff;
  border-color: #fff;
  padding: 0;
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
  text-align: left;
}
.item {
  width: 100%;
  min-height: 120px;
  position: relative;
}
.msg-div {
  float: left;
  display: block;
  width: 440px;
  height: 120px;
  position: relative;
  padding: 12px 16px;
}
.item-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  color: #999;
}
.float-left {
  float: left;
  margin-left: 10px;
}

img {
  overflow: hidden;
}
img:hover {
  transform: scale(1.05);
  transition: transform .15s ease-in,-webkit-transform .15s ease-in;
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
