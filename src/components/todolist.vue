<template>
  <div class="hello">
		<div class="common-row">
      <el-button type="primary" class="right-space" icon="plus" @click="goToAdd"></el-button>
      时间：
      <el-date-picker
      v-model="during"
      type="daterange"
      placeholder="选择日期范围"
      class="right-space">
      </el-date-picker>
			内容：
			<el-input style="width: 200px; margin: 0 12px 0 4px" class="inp" v-model="msg"/>
      <el-button type="primary" icon="search"  @click="getList">搜索</el-button>
		</div>
		<div class="common-row" style="color: red;" v-if="errMsg !== ''">
      <label>{{errMsg}}</label>
		</div>
		<div class="common-row">
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
              <el-button type="primary" icon="edit" @click="updateItem(item)">修改</el-button>
              <el-button type="danger" icon="delete" @click="dialogVisible = true; deleteId = item.id">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
		</div>
    <div class="common-row">
      <el-pagination :total="total" :current-page='current' :page-size='display' @current-change="pagechange"></el-pagination>
    </div>
    <el-dialog
    title="删除"
    :visible.sync="dialogVisible"
    size="tiny">
    <span>确认删除该项？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteItem()">确 定</el-button>
    </span>
    </el-dialog>
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
      during: '',
      showType: 0,
      dialogVisible: false,
      deleteId: 0,
      total: 0,     // 记录总条数
      display: 5,   // 每页显示条数
      current: 1   // 当前的页数
    }
  },
  methods: {
    getList () {
      const type = Number(this.showType)
      const key = this.msg.trim()
      let url = this.HOST + '/tomato/list?'
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
    goToAdd () {
      this.$router.push({path: '/todolistadd'})
    },
    updateItem (item) {
      this.$router.push({path: '/todolistupdate',
      query: {id: item.id}})
    },
    chkLogin (fnSucc, fnFail) {
      var url = this.HOST + '/users/chklogin'
      this.$http.get(url).then(res => {
        if (res.data.code === 200) {
          fnSucc()
        } else {
          fnFail()
        }
      }, res => {
        fnFail()
      })
    },
    /* deleteItem (id) {
      let lid = this.$layer.confirm('确认删除？', () => {
        const url = this.HOST + '/tomato/delete?id=' + id
        this.$http.get(url).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            // this.$layer.msg('删除成功', {})
            this.$message('删除成功')
            this.$layer.close(lid)
            this.getList()
          }
        }, res => {
          console.info('调用失败')
        })
      })
    },*/
    deleteItem () {
      const id = this.deleteId
      const url = this.HOST + '/tomato/delete?id=' + id
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$message('删除成功')
          this.getList()
          this.dialogVisible = false
          this.deleteId = 0
        }
      }, res => {
        console.info('调用失败')
      })
    },
    pagechange:function(currentPage){
      this.current = currentPage
      this.getList()
    },
    getTypeName: function (type) {
      for (let obj of TYPE) {
        if (Number(obj.value) === Number(type)) {
          return obj.desc
        }
      }
      return "普通"
    },
    getDate(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      let add0 = function (m){return m<10?'0'+m:m }
      let time = new Date(shijianchuo)
      let y = time.getFullYear()
      let m = time.getMonth()+1
      let d = time.getDate()
      let h = time.getHours()
      let mm = time.getMinutes()
      let s = time.getSeconds()
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)
    }
  },
  watch: {
    showType: function () {
      this.getList()
    }
  },
  mounted () {
    const ret = this.chkLogin(() => {
      const query = this.$route.query
      this.current = Number(query.page || 1)
      const currentPage = this.current
      this.showType = Number(query.type || 0)
      this.msg = (query.content || '')

      this.getList()
    }, () => {
      this.$router.push({path: '/login'})
      this.$message('请先登录')
      return
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.right-space {
  margin-right: 20px;
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
