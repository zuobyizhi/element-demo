<template>
  <div class="fill-parent pos-relative ctrl">
    <div v-for="(item, index) in data" class="fill-parent">
      <!-- chart-item :title="item.content" :url="" :idx="index">
      </chart-item -->
      <chart-item :title="item.content" :url="msg" :idx="index + 1"></chart-item>
    </div>
  </div>
</template>

<script>
import chartItem from './chartitem.vue'
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
    chartItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ctrl {
  min-height: 30px;
  background-color: #fff;
}
</style>
