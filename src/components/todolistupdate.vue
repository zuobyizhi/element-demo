<template>
  <div class="hello">
		<div class="btns">
      <label>类型：</label>
      <select v-model="type">
        <option value="0">请选择...</option>
        <option value="1">普通</option>
        <option value="2">重要</option>
      </select>
		</div>
		<div class="btns">
			<label>内容：</label>
			<el-input style="width: 200px;" v-model="content"/>
		</div>
		<div class="btns">
			<el-button type="primary" icon="edit" @click="addTimer">更新</el-button>
		</div>
		<div class="btns" style="color: red;" v-if="errMsg !== ''">
      <label>{{errMsg}}</label>
		</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      content: '',
      errMsg: '',
      id: 0,
      type: 0
    }
  },
  methods: {
    addTimer () {
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.content.trim() === '') {
        this.errMsg = '内容必须非空'
        return
      }

      var url = this.HOST + '/tomato/update?id=' + this.id + '&type=' + this.type +
      '&content=' + this.content.trim()
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // this.$layer.msg('修改成功', {})
          this.$message('修改成功')
          this.$router.push({path: '/httptest'})
        }
      }, res => {
        console.info('调用失败')
      })
    }
  },
  mounted () {
    this.content = this.$route.query.content
    this.id = Number(this.$route.query.id || 0)
    this.type = Number(this.$route.query.type || 0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btns{
	margin: 18px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}
.inp{
	margin: 8px;
}

select {
  height: 36px;
  border-radius: 4px;
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
