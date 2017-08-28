<template>
  <div class="hello">
		<div class="btns">
      <el-button type="primary" icon="plus" @click="goToAdd"></el-button>
			内容：
			<el-input style="width: 200px; margin: 0 12px 0 4px" class="inp" v-model="msg"/>
      <el-button type="primary" icon="search"  @click="getTimer">搜索</el-button>
		</div>
		<div class="btns" style="color: red;" v-if="errMsg !== ''">
      <label>{{errMsg}}</label>
		</div>
		<div class="btns">
      <table class="table">
        <thead>
          <tr>
            <th style="width: 80px">
              <select v-model="showType">
                <option value="0">全部</option>
                <option value="1">普通</option>
                <option value="2">重要</option>
              </select>
            </th>
            <th style="width: 80px">内容</th>
            <th style="width: 80px">创建时间</th>
            <th style="width: 80px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in timer">
            <td>{{getTypeName(item.type || 0)}}</td>
            <td>{{item.content}}</td>
            <td>{{getDate(item.createtime)}}</td>
            <td>
              <el-button type="primary" icon="edit" @click="updateTimer(item)">修改</el-button>
              <el-button type="danger" icon="delete" @click="deleteTimer(item.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
		</div>
    <div class="btns">
      <el-pagination :total="total" :current-page='current' :page-size='display' @current-change="pagechange"></el-pagination>
    </div>
  </div>
</template>

<script type="es6">
const TYPE = [{desc: "普通", value: 1}, {desc: "重要", value: 2}]
export default {
  name: 'hello',
  data () {
    return {
      timer: [],
      msg: '',
      errMsg: '',
      type: 0,
      showType: 0,
      total: 0,     // 记录总条数
      display: 5,   // 每页显示条数
      current: 1   // 当前的页数
    }
  },
  methods: {
    getTimer () {
      const uid = Number(this.getCookie('uid'))
      const type = Number(this.showType)
      const key = this.msg.trim()
      var url = this.HOST + '/tomato/list?uid=' + uid
      + '&type=' + type + '&start=' + (this.current - 1) * this.display
      + '&count=' + this.display
      if (key !== '') {
        url += '&key=' + key
      }
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.timer = res.data.msg
          this.total = res.data.total
          const currentPage = this.current
          this.$router.push({path: '/todolist',
          query: {page: currentPage, type: this.showType, content: this.msg}})
        }
      }, res => {
        console.info('调用失败')
      })
    },
    addTimer () {
      const uid = Number(this.getCookie('uid'))
      function isNumber (obj) {
        return Number(obj) === +obj
      }
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.msg.trim() === '') {
        this.errMsg = '内容必须非空'
        return
      }

      var url = this.HOST + '/tomato/add?uid=' + uid + '&type=' + this.type
      + "&content=" + this.msg.trim()
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.getTimer()
        }
      }, res => {
        console.info('调用失败')
      })
    },
    goToAdd () {
      this.$router.push({path: '/todolistadd'})
    },
    updateTimer (item) {
      this.$router.push({path: '/todolistupdate',
      query: {id: item.id, content: item.content, type: item.type}})
    },
    deleteTimer (id) {
      let lid = this.$layer.confirm('确认删除？', () => {
        var url = this.HOST + '/tomato/delete?id=' + id
        this.$http.get(url).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            // this.$layer.msg('删除成功', {})
            this.$message('删除成功')
            this.$layer.close(lid)
            this.getTimer()
          }
        }, res => {
          console.info('调用失败')
        })
      })
    },
    pagechange:function(currentPage){
      // console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
      this.current = currentPage
      this.getTimer()
    },
    getTypeName: function (type) {
      for (let obj of TYPE) {
        if (Number(obj.value) === Number(type)) {
          return obj.desc
        }
      }
      return "普通"
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
    },
    getDate(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      let add0 = function (m){return m<10?'0'+m:m }
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth()+1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)
    }
  },
  components: {
    'v-paging': require('./paging.vue')
  },
  watch: {
    showType: function () {
      this.getTimer()
    }
  },
  mounted () {
    const uid = Number(this.getCookie('uid') || 0)
    if (uid <= 0) {
      this.errMsg = '本模块请先登录'
      return
    }
    this.current = Number(this.$route.query.page || 1)
    const currentPage = this.current
    this.showType = Number(this.$route.query.type || 0)
    this.msg = (this.$route.query.content || '')

    this.getTimer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btns{
	margin: 18px;
}

select {
  height: 36px;
  border-radius: 4px;
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
