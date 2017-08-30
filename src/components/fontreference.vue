<template>
  <div class="hello">
		<div class="btns">
      <label>文字：</label>
      <input class="inp" v-model="msg"/>
		</div>
		<div class="btns">
			<label>字体：</label>
			<button @click="fontClass='songti'">宋体</button>
			<button @click="fontClass='yahei'">雅黑</button>
			<button @click="fontClass='heiti'">黑体</button>
			<button @click="fontClass='Monaco'">Monaco</button>
		</div>
		<div class="btns">
			<label>大小：</label>
			<input class="fontSize" v-model="fontSize"/>
		</div>
		<div class="btns">
			<label>字体颜色：</label>
			<input v-model="activeColor"/>
		</div>
		<div class="btns">
			<label>背景颜色：</label>
			<input v-model="bgColor"/>
		</div>
		<div class="btns">
			<label>粗度：</label>
			<button @click="weightClass='normal'">normal</button>
			<button @click="weightClass='bold'">bold</button>
			<button @click="weightClass='bolder'">bolder</button>
			<button @click="weightClass='lighter'">lighter</button>
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
.inp{
	margin: 8px;
}

label {
  width: 100px;
  display:inline-block;
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
