<template>
  <div class="hello">
		<div class="btns">
      <label class="input-required input-title">类型：</label>
      <select v-focus v-model="type" class="common-select">
        <option value="0">请选择...</option>
        <option value="1">普通</option>
        <option value="2">重要</option>
      </select>
		</div>
		<div class="btns">
			<label class="input-required input-title">内容：</label>
			<el-input @keyup.enter.native="onEnter" style="width: 200px;" v-model="content"/>
		</div>
		<div class="btns">
			<el-button type="primary" icon="plus" @click="addTimer" v-if="!isUpdatePage()">添加</el-button>
			<el-button type="primary" icon="edit" @click="updateItem" v-if="isUpdatePage()">更新</el-button>
		</div>
		<div class="btns" style="color: red;" v-if="errMsg !== ''">
      <label>{{errMsg}}</label>
		</div>
  </div>
</template>

<script>
import * as utils from '../utils/utils.js'
export default {
  name: 'hello',
  data () {
    return {
      content: '',
      errMsg: '',
      id: 0,
      type: 0
    }
  },
  methods: {
    onEnter () {
      if (this.isUpdatePage()) {
        this.updateItem()
      } else {
        this.addTimer()
      }
    },
    updateItem () {
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.content.trim() === '') {
        this.errMsg = '内容必须非空'
        return
      }

      const url = utils.makeUrl(this.HOST + '/tomato/update', {
        id: this.id,
        type: this.type,
        content: this.content.trim()
      })
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$message('修改成功')
          this.$router.push({path: '/todolist'})
        }
      }, res => {
        console.info('调用失败')
      })
    },
    isUpdatePage () {
      const path = this.$route.path
      return path === '/todolistupdate'
    },
    addTimer () {
      if (Number(this.type) === 0) {
        this.errMsg = '请选择程度'
        return
      }
      if (this.content.trim() === '') {
        this.errMsg = '内容必须非空'
        return
      }

      const url = utils.makeUrl(this.HOST + '/tomato/add', {
        type: this.type,
        content: this.content.trim()
      })
      this.$http.get(url).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.$message('添加成功')
          this.$router.push({path: '/todolist'})
        }
      }, res => {
        console.info('调用失败')
      })
    }
  },
  mounted () {
    if (!this.isUpdatePage()) {
      return
    }
    const query = this.$route.query
    this.id = Number(query.id || 0)
    const url = this.HOST + '/tomato/getone?id=' + this.id
    this.$http.get(url).then(res => {
      console.log(res.data)
      if (res.data.code === 200) {
        const rows = res.data.msg
        if (rows.length > 0) {
          this.content = rows[0].content
          this.type = rows[0].type
        } else {
          console.info('该id查询不到item')
        }
      }
    }, res => {
      console.info('调用失败')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  min-width: 600px;
  max-width: 1200px;
  margin: auto;
}
</style>
