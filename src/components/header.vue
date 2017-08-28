<template>
	<div class="main-header">
    <ul>
      <li :class="{active: Number(curTab) === 1}" @click='curTabChange(1)'>
        <router-link to="/">首页</router-link>
      </li>
      <li :class="{active: Number(curTab) === 2}" @click='curTabChange(2)'>
        <router-link to="fontreference">字体参考</router-link>
      </li>
      <li :class="{active: Number(curTab) === 3}" @click='curTabChange(3)'>
        <router-link to="tomato">计时器</router-link>
      </li>
      <li :class="{active: Number(curTab) === 4}" @click='curTabChange(4)'>
        <router-link to="todolist">备忘</router-link>
      </li>
    </ul>
    <ul style="position: absolute; right: 20px">
      <li :class="{active: Number(curTab) === 6}" @click='curTabChange(6)' v-if="!bLogin">
        <router-link to="register">注册</router-link>
      </li>
      <li :class="{active: Number(curTab) === 5}" @click='curTabChange(5)' v-if="!bLogin">
        <router-link to="login">登录</router-link>
      </li>
      <li v-if="bLogin" :class="{active: Number(curTab) === 7}" @click='curTabChange(7)'>
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
      curTab: this.$store.state.curTab || 1,
      bLogin: false
    }
  },
  methods: {
    curTabChange (i) {
      this.curTab = i
      this.$store.state.curTab = this.curTab
      window.localStorage.setItem('curTab', this.curTab)
    },
    logout () {
      this.setCookie('uid', '', new Date(Date.now() - 1))
      this.$router.push({path: '/login'})
      this.chkLogin()
      this.curTab = 5
    },
    chkLogin () {
      const acct = Number(this.getCookie('uid'))
      console.log('uid: ' + acct)
      if (acct > 0 && !isNaN(acct)) {
        this.bLogin = true
      } else {
        this.bLogin = false
      }
    },
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      console.info(cname + '=' + cvalue + '; ' + expires)
      document.cookie = cname + '=' + cvalue + '; ' + expires
      console.info(document.cookie)
    },
    getCookie: function (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
      }
      return ''
    }
  },
  mounted () {
    const res = this.$route.path
    console.log(res)
    if (res === '/') {
      this.curTabChange(1)
    } else if (res === '/fontreference') {
      this.curTabChange(2)
    } else if (res === '/tomato') {
      this.curTabChange(3)
    } else if (res === '/todolist') {
      this.curTabChange(4)
    } else if (res === '/login') {
      this.curTabChange(5)
    } else if (res === '/register') {
      this.curTabChange(6)
    }

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
	height: 50px;
	// background-color: #42b983;
	background-color: #20a0ff;
  box-shadow: 2px 2px 1px #ccc;
  z-index: 1000;
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

.curtab {
	background-color: #32a973
}
</style>
