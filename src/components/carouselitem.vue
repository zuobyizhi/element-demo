<template>
  <div class="fill-parent pos-relative" @click="updateItem">
    <div class="img-scale fill-parent">
      <img class="img-self-adaptation" src="http://scimg.jb51.net/allimg/120502/2-12050215122K57.jpg"></img>
    </div>
    <div class="font-color-white item-bottom text-shadow title-font-size pointerevents-none line-feed">
      <div class="item-bottom padding-8px title-font-size">{{shorten(content, 40, '...')}}</div>
    </div>
  </div>
</template>

<script>
import * as utils from '../utils/utils.js'
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
    shorten (str, len, tail) {
      return utils.shorten(str, len, tail)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: 10px;
  width: 100%;
}
.text-shadow {
  width: 100%;
  height: 50%;
}
</style>
