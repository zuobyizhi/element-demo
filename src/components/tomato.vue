<template>
  <div class="hello">
		<div class="common-row">
			程度：
      <select v-model="type" v-focus class='common-select'>
        <option value="0">请选择...</option>
        <option value="1">普通</option>
        <option value="2">重要</option>
      </select>
			内容：
			<el-input class="common-input" v-model="msg"/>
			倒计时：
			<el-input class="common-input" v-model="time"/>
      <el-button @click="addTimer" type="primary">确认</el-button>
		</div>
		<div class="common-row" style="color: red;" v-if="errMsg !== ''">
      <label>{{errMsg}}</label>
		</div>
		<div class="common-row">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 80px">
              <select v-model="showType" class="common-select">
                <option value="0">全部</option>
                <option value="1">普通</option>
                <option value="2">重要</option>
              </select>
            </th>
            <th style="width: 80px">内容</th>
            <th style="width: 80px">倒计时</th>
            <th style="width: 80px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in timer">
            <td>{{getTypeName(item.type || 0)}}</td>
            <td>{{item.msg}}</td>
            <td>{{item.time}}</td>
            <td>
              <el-button type="primary" icon="edit" v-show='!item.work' @click="setTimerWork(index, item.id, true)">启动</el-button>
              <el-button type="primary" icon="edit" v-show='item.work' @click="setTimerWork(index, item.id, false)">暂停</el-button>
              <el-button type="danger" icon="delete" @click="deleteTimer(item.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
		</div>
    <div class="common-row">
      <el-pagination :total="total" :current-page='current' :page-size='display' @current-change="pagechange"></el-pagination>
    </div>
  </div>
</template>

<script type="es6">
const utils = require('../utils/utils.js')
const TYPE = [{desc: "普通", value: 1}, {desc: "重要", value: 2}]
export default {
  name: 'hello',
  data () {
    return {
      timer: [],
      msg: '',
      errMsg: '',
      time: '',
      type: 0,
      showType: 0,
      total: 0,     // 记录总条数
      display: 5,   // 每页显示条数
      current: 1   // 当前的页数
    }
  },
  methods: {
    getTimerLS (start, end) {
      const arr = JSON.parse(window.localStorage.getItem('timer'))
      if (arr instanceof Array && arr.length > 0) {
        const st = Number(this.showType)
        if (st === 0) {
          this.timer = arr.slice(start, end)
          this.total = arr.length
        } else {
          const midArr = []
          for (let i = 0; i < arr.length; ++i) {
            if (st === Number(arr[i].type || 0)) {
              midArr.push(arr[i])
            }
          }
          this.timer = midArr.slice(start, end)
          this.total = midArr.length
        }
      } else {
        this.timer = []
        this.total = 0
      }
    },
    deleteTimerLS (id) {
      const arr = JSON.parse(window.localStorage.getItem('timer'))
      if (arr instanceof Array && arr.length > 0) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].id === id) {
            arr.splice(i, 1)
            window.localStorage.setItem('timer', JSON.stringify(arr))
            return
          }
        }
      }
    },
    setTimerWordLS (id, bWork) {
      const arr = JSON.parse(window.localStorage.getItem('timer'))
      if (arr instanceof Array && arr.length > 0) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].id === id) {
            arr[i].work = bWork
            window.localStorage.setItem('timer', JSON.stringify(arr))
            return
          }
        }
      }
    },
    setTimerTimeLS (id, time) {
      const arr = JSON.parse(window.localStorage.getItem('timer'))
      if (arr instanceof Array && arr.length > 0) {
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i].id === id) {
            arr[i].time = time
            window.localStorage.setItem('timer', JSON.stringify(arr))
            return
          }
        }
      }
    },
    addTimerLS (timer) {
      let arr = JSON.parse(window.localStorage.getItem('timer'))
      if (arr instanceof Array && arr.length > 0) {
        arr.unshift(timer)
      } else {
        arr = []
        arr.push(timer)
      }
      window.localStorage.setItem('timer', JSON.stringify(arr))
    },
    addTimer () {
      function isNumber (obj) {
        return Number(obj) === +obj
      }
      if (!isNumber(this.time)) {
        this.errMsg = '倒计时必须为数字'
        return
      }
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.msg.trim() === '' || this.time.trim() === '') {
        this.errMsg = '内容和倒计时必须非空'
        return
      }
      // this.timer.push({msg: this.msg.trim(), time: this.time.trim(), work: false})
      this.addTimerLS({id: utils.uuid(), msg: this.msg.trim(), time: this.time.trim(), work: false, type: this.type})
      this.msg = ''
      this.time = ''
      this.errMsg = ''
      this.type = ''
      // window.localStorage.setItem('timer', JSON.stringify(this.timer))
      const currentPage = this.current - 1
      this.getTimerLS(currentPage * this.display, (currentPage + 1) * this.display)
    },
    setTimerWork (i, id, bWork) {
      this.timer[i].work = bWork
      // window.localStorage.setItem('timer', JSON.stringify(this.timer))
      this.setTimerWordLS(id, bWork)
    },
    deleteTimer (id) {
      const lid = this.$layer.confirm('确认删除？', () => {
        this.deleteTimerLS(id)
        this.$layer.msg('删除成功', {})
        this.$layer.close(lid)
        const currentPage = this.current - 1
        this.getTimerLS(currentPage * this.display, (currentPage + 1) * this.display)
      })
    },
    pagechange:function(currentPage){
      // console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      this.current = currentPage
      currentPage = this.current - 1
      this.getTimerLS(currentPage * this.display, (currentPage + 1) * this.display)
      this.$router.push({path: '/tomato', query: {page: currentPage, type: this.showType}})
    },
    getTypeName: function (type) {
      for (const obj of TYPE) {
        if (Number(obj.value) === Number(type)) {
          return obj.desc
        }
      }
      return "普通"
    }
  },
  watch: {
    showType: function () {
      //
      const currentPage = this.current - 1
      this.getTimerLS(currentPage * this.display, (currentPage + 1) * this.display)
      this.$router.push({path: '/tomato', query: {page: currentPage, type: this.showType}})
    }
  },
  mounted () {
    const self = this
    const fn = function () {
      for (let i = 0; i < self.timer.length; ++i) {
        if (self.timer[i].work) {
          if (Number(self.timer[i].time) > 0) {
            self.timer[i].time -= 1
            // window.localStorage.setItem('timer', JSON.stringify(self.timer))
            self.setTimerTimeLS(self.timer[i].id, self.timer[i].time)
          }
        }
      }
    }
    setInterval(fn, 1000)

    this.current = Number(this.$route.query.page || 0) + 1
    const currentPage = this.current - 1
    this.showType = Number(this.$route.query.type || 0)
    // this.getTimerLS(0, this.display)
    this.getTimerLS(currentPage * this.display, (currentPage + 1) * this.display)
    this.$router.push({path: '/tomato', query: {page: currentPage, type: this.showType}})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-input {
  width: 200px;
  margin: 0 12px 0 4px;
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
