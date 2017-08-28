<template>
  <div class="hello">
		<div class="btns">
      <label>帐号：</label>
      <el-input class="inp" v-model="acct"/>
		</div>
		<div class="btns">
			<label>密码：</label>
			<el-input class="inp" v-model="password"/>
		</div>
		<div class="btns">
			<label>确认密码：</label>
			<el-input class="inp" v-model="pwAagin"/>
		</div>
		<div class="btns">
			<el-button type="primary" @click="register">注册</el-button>
		</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      acct: '',
      pwAagin: '',
      password: ''
    }
  },
  methods: {
    register () {
      const acct = this.acct.trim()
      const password = this.password.trim()
      const pwAagin = this.pwAagin.trim()
      if (acct === '') {
        return
      }
      if (password === '') {
        return
      }
      if (password !== pwAagin) {
        return
      }
      var url = this.HOST + '/users/register?acct=' + acct + '&password=' + password
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$router.push({path: '/login'})
          this.$message('注册成功')
        } else {
          console.info('调用失败')
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
.btns{
	margin: 18px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}
.inp{
	margin: 8px;
  width: 200px;
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
