<template>
  <div class="fill-parent ctrl pos-relative bottom-line">
    <ul class="fill-parent">
      <div class="chart-nth inline" :class="{first: idx===1, second: idx===2, third: idx==3}">{{idx}}</div>
      <p class="inline align-left title text-hover">{{title}}</p>
    </ul>
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
    idx: Number,
    title: String,
    url: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ctrl {
  min-height: 60px;
  background-color: #fff;
  padding: 10px;
  width: 100%;
}
.title {
  width: 100%;
  display: block;
}
</style>
