<template>
	<div class="main-header">
    <ul>
      <li :class="{active: cmpPath('/')}">
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{active: cmpPath('/fontreference')}">
        <router-link to="fontreference">字体参考</router-link>
      </li>
      <li :class="{active: cmpPath('/tomato')}">
        <router-link to="tomato">计时器</router-link>
      </li>
      <li :class="{active: cmpPath('/todolist')}">
        <router-link to="todolist">备忘</router-link>
      </li>
      <li :class="{active: cmpPath('/eltodolist')}">
        <router-link to="eltodolist">备忘2</router-link>
      </li>
      <li :class="{active: cmpPath('/eltodolist2')}">
        <router-link to="eltodolist2">备忘3</router-link>
      </li>
    </ul>
    <ul style="position: absolute; right: 20px">
      <li :class="{active: cmpPath('/register')}" v-if="!bLogin">
        <router-link to="register">注册</router-link>
      </li>
      <li :class="{active: cmpPath('/login')}" v-if="!bLogin">
        <router-link to="login">登录</router-link>
      </li>
      <li v-if="bLogin">
        <a href="javascript:;" @click="logout">退出</a>
      </li>
    </ul>
	</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      bLogin: false
    }
  },
  methods: {
    logout () {
      const url = this.HOST + '/users/logout'
      this.$http.get(url).then(res => {
        this.$router.push({path: '/login'})
        this.chkLogin()
        this.$message('退出成功')
      }, res => {
        console.info('调用失败')
      })
    },
    cmpPath (path) {
      const res = this.$route.path
      return res === path
    },
    chkLogin () {
      const url = this.HOST + '/users/chklogin'
      this.$http.get(url).then(res => {
        if (res.data.code === 200) {
          this.bLogin = true
        } else {
          this.$router.push({path: '/login'})
          this.bLogin = false
        }
      }, res => {
        this.$router.push({path: '/login'})
        this.bLogin = false
      })
    }
  },
  mounted () {
    this.chkLogin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
	width: 100%;
  min-width: 600px;
	height: 50px;
	// background-color: #42b983;
	background-color: #20a0ff;
  box-shadow: 2px 2px 1px #ccc;
  z-index: 1000;
  opacity: 0.9;
}
.active {
  // background-color: #32a973;
	background-color: #1090ef;
}

a {
  color: #fff;
  // margin: auto;
  padding: 0 15px;
  font-size: 16px;
  display: block;
  height: 100%;
  width: 100%;
  min-width: 100px;
}

li {
  float: left;
  // padding: 0 15px;
  position: relative;
  line-height: 50px;
}
</style>
