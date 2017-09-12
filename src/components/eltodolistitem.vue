<template>
  <div class="item-white-block item">
    <div class="item-content">{{content}}</div>
    <div class="item-bottom">
      <ul>
        <div class="float-left">{{time}}</div>
        <div class="float-left">{{type}}</div>
        <div class="float-left"><button @click="updateItem">修改</button></div>
        <div class="float-left"><button @click="deleteItem">删除</button></div>
      </ul>
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
}
.item {
  width: 100%;
  min-height: 120px;
  position: relative;
}
.item-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  margin-bottom: 5px;
}
.float-left {
  float: left;
  margin-left: 10px;
}
h1, h2 {
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
