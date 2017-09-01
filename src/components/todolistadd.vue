<template>
  <div class="hello">
		<div class="btns">
      <label>类型：</label>
      <select v-model="type" class="common-select">
        <option value="0">请选择...</option>
        <option value="1">普通</option>
        <option value="2">重要</option>
      </select>
      <!--el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options"
        :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select-->
		</div>
		<div class="btns">
			<label>内容：</label>
			<el-input style="width: 200px;" v-model="msg"/>
		</div>
		<div class="btns">
			<el-button type="primary" icon="plus" @click="addTimer">添加</el-button>
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
      msg: '',
      errMsg: '',
      type: 0,
      options: [{
        value: '1',
        label: '普通'
      }, {
        value: '2',
        label: '重要'
      }]
    }
  },
  methods: {
    addTimer () {
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.msg.trim() === '') {
        this.errMsg = '内容必须非空'
        return
      }

      const url = this.HOST + '/tomato/add?type=' + this.type +
      '&content=' + this.msg.trim()
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // this.$layer.msg('添加成功', {})
          this.$message('添加成功')
          this.$router.push({path: '/httptest'})
        }
      }, res => {
        console.info('调用失败')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
