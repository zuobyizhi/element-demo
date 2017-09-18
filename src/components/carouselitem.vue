<template>
  <div class="item" @click="updateItem">
    <!-- div class="head-pic-div"><img class="img-self-adaptation img-scale" src="http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg"></img></div -->
    <img class="img-self-adaptation img-scale head-pic-div" src="http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg"></img>
    <div class="font-color-white item-bottom text-shadow title-font-size pointerevents-none">
      <span class="item-bottom">{{content}}</span>
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
.font-color-white {
  color: #fff;
}
.item-title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
}
.head-pic-div {
  float: left;
  height: 100%;
  width: 100%;
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
  text-align: left;
}
.item {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
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
  padding-bottom: 10px;
  width: 100%;
}
.text-shadow {
  width: 100%;
  height: 50%;
  background-image: linear-gradient(0deg,rgba(0,0,0,.75),rgba(0,0,0,.75) 40%,transparent);
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
