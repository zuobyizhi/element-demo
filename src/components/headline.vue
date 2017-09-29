<template>
  <div class="fill-parent pos-relative ctrl">
    <div v-for="item in data" class="fill-parent">
      <div class="inline head-line-item underline">{{item}}</div>
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
    data: Array
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ctrl {
  min-height: 30px;
  height: 40px;
}
.ctrl:before {
  position: absolute;
  content: "";
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #e6e6e6;
}
.head-line-item {
  float: left;
  position: relative;
  color: #1482f0;
  font-size: 14px;
  line-height: 40px;
}
</style>
