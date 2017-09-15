<template>
  <div class="mediacy">
    <div style="margin: 18px;">
      <el-carousel indicator-position="outside"  type="card">
      <el-carousel-item v-for="item in timer.slice(0, 4)" :key="item">
      <carousel-item :itemId="item.id" :title="item.content" :content="item.content" :time="getDate(item.createtime)"
      :type="getTypeName(item.type)" @updateItem="updateItem" @deleteItem="deleteItemWrapper"></carousel-item>
      </el-carousel-item>
      </el-carousel>
    </div>
    <el-row>
      <el-col :span="18">
      <div>
        <div class="common-row">
          <div v-for="(item, index) in timer">
            <list-item :itemId="item.id" :title="item.content" :content="item.content" :time="getDate(item.createtime)"
            :type="getTypeName(item.type)" @updateItem="updateItem" @deleteItem="deleteItemWrapper"></list-item>
          </div>
        </div>
        <div class="common-row">
          <el-pagination :total="total" :current-page='current' :page-size='display' @current-change="pagechange"></el-pagination>
        </div>
      </div>
      </el-col>
      <el-col :span="6">
      <el-menu style="margin-top: 18px;" default-active="1" class="el-menu-vertical-demo"
      theme="white">
      <el-menu-item index="1" @click="showType=0">全部</el-menu-item>
      <el-menu-item index="2" @click="showType=1">普通</el-menu-item>
      <el-menu-item index="3" @click="showType=2">重要</el-menu-item>
      </el-menu>
      </el-col>
    </el-row>
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
const utils = require('../utils/utils.js')
const TYPE = [{desc: "普通", value: 1}, {desc: "重要", value: 2}]
export default {
  name: 'hello',
  data () {
    return {
      timer: [],
      msg: '',
      errMsg: '',
      type: 0,
      during: [],
      showType: 0,
      dialogVisible: false,
      deleteId: 0,
      total: 0,     // 记录总条数
      display: 10,   // 每页显示条数
      current: 1   // 当前的页数
    }
  },
  methods: {
    getList () {
      const type = Number(this.showType)
      const key = this.msg.trim()
      const opts = {
        type: type,
        start: (this.current - 1) * this.display,
        count: this.display
      }
      if (key !== '') {
        opts.key = key
      }
      if (this.during.length === 2 && this.during[0] && this.during[1]) {
        opts.starttime = this.during[0].getTime()
        opts.endtime = this.during[1].getTime() + utils.oneDay
      }
      const url = utils.makeUrl(this.HOST + '/tomato/list', opts)
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.timer = res.data.msg
          this.total = res.data.total
          const currentPage = this.current
          this.$router.push({path: '/eltodolist',
          query: {page: currentPage, type: this.showType, content: this.msg}})
        }
      }, res => {
        console.info('调用失败')
      })
    },
    goToAdd () {
      this.$router.push({path: '/todolistadd'})
    },
    updateItem (id) {
      this.$router.push({path: '/todolistupdate',
      query: {id: id}})
    },
    chkLogin (fnSucc, fnFail) {
      const url = this.HOST + '/users/chklogin'
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
    deleteItemWrapper (id) {
      this.deleteId = id
      this.dialogVisible = true
    },
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
      for (const obj of TYPE) {
        if (Number(obj.value) === Number(type)) {
          return obj.desc
        }
      }
      return "普通"
    },
    getDate(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      return utils.stampFormat(shijianchuo, "yyyy-MM-dd hh:mm:ss")
      // return utils.stampFormat(shijianchuo, "yyyyyy-MMMM-dddd hhhh:mmmm:ssss mm")
    }
  },
  watch: {
    showType: function () {
      this.getList()
    }
  },
  components: {
    'list-item': require('./eltodolistitem.vue'),
    'carousel-item': require('./carouselitem.vue')
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
.mediacy {
  margin: auto;
  width: 800px;
}
.side-nav {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
}
.right-space {
  margin-right: 20px;
}
.el-menu-vertical-demo {
  display: inline-block;
  text-align: left;
}

h1, h2 {
  font-weight: normal;
}

ul {
  width: 80%;
  margin: 5px;
}
/*ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}*/

a {
  color: #42b983;
}

/* 走马灯CSS */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
