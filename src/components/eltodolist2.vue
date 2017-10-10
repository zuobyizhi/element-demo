<template>
  <div id="mediacy" class="mediacy">
    <div style="margin: 18px;">
      <el-carousel indicator-position="outside" type="card">
      <el-carousel-item v-for="item in timer.slice(0, 4)" :key="item.id">
      <carousel-item :itemId="item.id" :title="item.content" :content="item.content" :time="getDate(item.createtime)"
      :img="randImg()"
      :type="getTypeName(item.type)" @updateItem="updateItem" @deleteItem="deleteItemWrapper"></carousel-item>
      </el-carousel-item>
      </el-carousel>
    </div>
    <el-row>
      <el-col :span="18">
      <div>
        <head-line class="side-item mediacy" :data="['最新']"></head-line>
        <div class="common-row">
          <div v-for="(item, index) in timer">
            <list-item :itemId="item.id" :title="item.content" :content="item.content" :time="getDate(item.createtime)"
            :img="randImg()"
            :type="getTypeName(item.type)" @updateItem="updateItem" @deleteItem="deleteItemWrapper"></list-item>
          </div>
        </div>
        <el-button v-if="timer.length !== total" @click="getMore" icon="arrow-down">加载更多...</el-button>
        <div v-if="timer.length === total">已无更多...</div>
        <div style="height: 50px;"></div>
      </div>
      </el-col>
      <el-col :span="6">
      <head-line class="side-item mediacy" :data="['类型']"></head-line>
      <el-menu style="margin-top: 6px;" :default-active="String(Number($route.query.type || 0) + 1)" class="el-menu-vertical-demo gray-thin-border"
      theme="white">
      <el-menu-item index="1" @click="showType=0">全部</el-menu-item>
      <el-menu-item index="2" @click="showType=1">普通</el-menu-item>
      <el-menu-item index="3" @click="showType=2">重要</el-menu-item>
      </el-menu>
      <head-line class="side-item mediacy" :data="['卡片']"></head-line>
      <div v-for="(item, index) in timer.slice(0, 3)">
        <img-card :itemId="item.id" :title="item.content" :content="item.content" :time="getDate(item.createtime)"
        :img="randImg()"
        :type="getTypeName(item.type)" @updateItem="updateItem" @deleteItem="deleteItemWrapper" class="img-card mediacy"></img-card>
      </div>
      </el-col>
    </el-row>
    <go-to-top class="gototop"></go-to-top>
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
import * as utils from '../utils/utils.js'
import listItem from './eltodolistitem.vue'
import imgCard from './imgcard.vue'
import goToTop from './gototop.vue'
import headLine from './headline.vue'
import carouselItem from './carouselitem.vue'
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
      display: 5,   // 每页显示条数
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
          this.$router.push({path: '/eltodolist2',
          query: {page: currentPage, type: this.showType, content: this.msg}})
        }
      }, res => {
        console.info('调用失败')
      })
    },
    getMore () {
      console.log("getMore")
      const type = Number(this.showType)
      const key = this.msg.trim()
      const opts = {
        type: type,
        start: this.timer.length,
        count: this.display
      }
      const url = utils.makeUrl(this.HOST + '/tomato/list', opts)
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.timer = this.timer.concat(res.data.msg)
          this.total = res.data.total
          const currentPage = this.current
          this.$router.push({path: '/eltodolist2',
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
    randImg () {
      const imgs = ['https://wpimg.wallstcn.com/816f84cf-6d4f-4eaf-a137-73ed2d32b892.png?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/fca7acef-e9c6-439c-a360-79f714226da2.jpg?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/6be06411-e3ad-4d0d-a68f-7f276a705f4b.png?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/3601c4d5-f379-4986-9eb8-425698f7808d.jpg?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/0886c5b9-25e8-4082-89cd-b8eb158450de.jpg?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/ada8c948-0e43-4897-a7b4-6801bf0335c9.jpg?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/340174aa-e82a-4a33-9404-5c1363ddb972.jpg?imageView2/1/w/190/h/190',
      'https://wpimg.wallstcn.com/5e426bd3-f744-4399-86d5-6eb4f319094d.png?imageView2/1/w/190/h/190']
      return utils.randArr(imgs)
    },
    getDate(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      return utils.stampFormat(shijianchuo, "yyyy-MM-dd hh:mm:ss")
    }
  },
  watch: {
    showType: function () {
      this.getList()
    }
  },
  components: {
    listItem,
    imgCard,
    goToTop,
    headLine,
    carouselItem
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
  width: 800px;
}
.el-menu-vertical-demo {
  background-color: #fff;
}
.img-card {
  width: 90%;
  min-height: 250px;
  height: 250px;
}
.side-item {
  margin-bottom: 12px;
  width: 90%;
}
</style>
