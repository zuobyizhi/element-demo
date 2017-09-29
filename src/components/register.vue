<template>
  <div class="hello">
		<div class="btns">
      <label class="input-required input-title">帐号：</label>
      <el-input v-focus id="firstInput" class="inp" v-model="acct" @keyup.enter.native="register"/>
		</div>
		<div class="btns">
			<label class="input-required input-title">密码：</label>
			<el-input class="inp" v-model="password" @keyup.enter.native="register"/>
		</div>
		<div class="btns">
			<label class="input-required input-title">确认密码：</label>
			<el-input class="inp" v-model="pwAagin" @keyup.enter.native="register"/>
		</div>
		<div class="btns">
			<el-button type="primary" @click="register" @keyup.enter.native="register">注册</el-button>
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
        this.$message('请输入帐号')
        return
      }
      if (password === '') {
        this.$message('请输入密码')
        return
      }
      if (password !== pwAagin) {
        this.$message('请确认密码')
        return
      }
      const url = utils.makeUrl(this.HOST + '/users/register', {
        acct: acct,
        password: password
      })
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
.inp{
	margin: 8px;
  width: 200px;
}
</style>
