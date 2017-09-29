<template>
  <div class="hello">
		<div class="btns">
      <label class="input-title">文字：</label>
      <el-input class="common-input inp" v-model="msg"/>
		</div>
		<div class="btns">
			<label class="input-title">字体：</label>
			<el-button type="primary" @click="fontClass='songti'">宋体</el-button>
			<el-button type="primary" @click="fontClass='yahei'">雅黑</el-button>
			<el-button type="primary" @click="fontClass='heiti'">黑体</el-button>
			<el-button type="primary" @click="fontClass='Monaco'">Monaco</el-button>
		</div>
		<div class="btns">
			<label class="input-title">大小：</label>
			<el-input class="common-input fontSize" v-model="fontSize"/>
		</div>
		<div class="btns">
			<label class="input-title">字体颜色：</label>
			<el-input class="common-input" v-model="activeColor"/>
		</div>
		<div class="btns">
			<label class="input-title">背景颜色：</label>
			<el-input class="common-input" v-model="bgColor"/>
		</div>
		<div class="btns">
			<label class="input-title">粗度：</label>
			<el-button type="primary" @click="weightClass='normal'">normal</el-button>
			<el-button type="primary" @click="weightClass='bold'">bold</el-button>
			<el-button type="primary" @click="weightClass='bolder'">bolder</el-button>
			<el-button type="primary" @click="weightClass='lighter'">lighter</el-button>
		</div>
    <h1 v-bind:class="[fontClass]" 
			v-bind:style="{ color: activeColor, fontSize: fontSize + 'px', fontWeight: weightClass, backgroundColor: bgColor }">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fontSize: '40',
      activeColor: '#000',
      bgColor: '#fff',
      weightClass: 'normal',
      fontClass: 'songti'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-input {
  width: 200px;
  margin: 0 12px 0 4px;
}
.songti {
	font-family: "宋体"
}
.yahei {
	font-family: "Microsoft YaHei"
}
.heiti {
	font-family: "黑体"
}
.Monaco {
	font-family: "Monaco"
}

h1, h2 {
  font-weight: normal;
}
</style>
