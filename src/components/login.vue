<template>
  <div class="hello">
		<div class="btns">
      <label class="input-title">帐号：</label>
      <el-input id="loginviewfocus" v-focus class="inp" v-model="acct" @keyup.enter.native="login"/>
		</div>
		<div class="btns">
			<label class="input-title">密码：</label>
			<el-input class="inp" v-model="password" @keyup.enter.native="login"/>
		</div>
		<div class="btns">
			<el-button type="primary" @click="login" @keyup.enter.native="login">登录</el-button>
		</div>
  </div>
</template>

<script>
import * as utils from '../utils/utils.js'
export default {
  name: 'hello',
  data () {
    return {
      acct: '',
      password: ''
    }
  },
  /* mounted () {
    const ctrl = document.getElementById('loginviewfocus')
    ctrl.focus()
  }, */
  methods: {
    login () {
      const acct = this.acct.trim()
      const password = this.password.trim()
      if (acct === '') {
        this.$message('请输入帐号')
        return
      }
      if (password === '') {
        this.$message('请输入密码')
        return
      }
      const url = utils.makeUrl(this.HOST + '/users/login', {
        acct: acct,
        password: password
      })
      this.$http.get(url).then(res => {
        // this.movieList = res.data.subjects;
        console.log(res.data)
        // this.$router.push({path: '/'})
        window.location.href = '/'
        this.$message('登录成功')
      }, res => {
        console.info('调用失败')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  min-width: 600px;
}
.inp{
	margin: 8px;
  width: 200px;
}
</style>
