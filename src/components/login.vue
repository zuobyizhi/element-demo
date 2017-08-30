<template>
  <div class="hello">
		<div class="btns">
      <label>帐号：</label>
      <el-input style="width: 200px;" v-model="acct"/>
		</div>
		<div class="btns">
			<label>密码：</label>
			<el-input style="width: 200px;" v-model="password"/>
		</div>
		<div class="btns">
			<el-button type="primary" @click="login">登录</el-button>
		</div>
  </div>
</template>

<script>
const utils = require('../utils/utils.js')
export default {
  name: 'hello',
  data () {
    return {
      acct: '',
      password: ''
    }
  },
  methods: {
    login () {
      const acct = this.acct.trim()
      const password = this.password.trim()
      if (acct === '') {
        return
      }
      if (password === '') {
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
