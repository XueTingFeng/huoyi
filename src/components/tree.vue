<template>
  <div>
    <el-tree
		  :data="treeData"
		  :props="defaultProps"
		  default-expand-all
		  node-key="id"
		  ref="tree"
		  :expand-on-click-node="false"
		  :render-content="renderContent">
		</el-tree>
		<div class="tfooter">
			<div class="new"  @click="addNode"><Icon custom="iconfont hy-file-folder-add" size="20" class="mr8"/>新建文件夹</div>
			<div class="tbtns">
				<Button class="mr8" type="primary" @click="saveFile">确定</Button>
				<Button type="primary" ghost @click="cancel">取消</Button>
			</div>
		</div>
  </div>
</template>

<script>
  import {
    getServiceTree,
    delItem,
    addItem,
    updateItem
  } from '@/mock/tree.api.js'
  export default {
    name: 'ly-tree',
    data() {
      return {
        treeData: [],
        isEdit: false,
        edit_name: '',
        is_superuser: 'False',
        defaultProps: {
          children: 'child',
          label: 'name'
        },
        select_id: null,
        select_level: null,
        select_node: null
      }
    },

    created () {
      this.refresh()
    },

    methods: {
			getEditContent(h, data, node) {
			  let self = this
			  return (
			    <span class="ly-visible" style="margin-left: 50px;">
						<el-button type="text" style="color: #fff;font-size:16px" icon="el-icon-close" on-click={ () => self.close(data, node) }></el-button>
			      <el-button type="text" style="color: #fff;font-size:16px" icon="el-icon-check" on-click={ () => self.editMsg(data, node) }></el-button>
			    </span>
			  )
			},
      refresh() {
        let res = getServiceTree()
        this.is_superuser = res.is_superuser
        this.treeData = res.data
      },
      addNode(){
        let node = this.$refs.tree.getCurrentNode()
        if(node)
          this.append(node,node)
      },
      append(node, data, e) {
        e = event || window.event
        e.stopPropagation()
        if (!this.isEdit) {
          this.select_id = data.id
          this.edit_name = ''
          const newChild = {
            name: '',
            level: data.level + 1,
            isEdit: true
          }
          this.isEdit = true
          if (!data.child) {
            this.$set(data, 'child', [])
          }
          data.child.unshift(newChild)
        } else {
          this.$notify({
            type: 'error',
            title: '操作提示',
            message: '有正在编辑或添加的选项未完成！',
            duration: 2000
          })
        }
      },

      update(node, data, e) {
        e = event || window.event
        e.stopPropagation()
        if (this.isEdit) {
          this.$notify({
            type: 'error',
            title: '操作提示',
            message: '有正在编辑或添加的选项未完成！',
            duration: 2000
          })
          return
        }
        this.select_id = data.id
        this.select_level = data.level
        this.edit_name = data.name
        this.isEdit = true
      },

      editMsg(data, node, e) {
        e = event || window.event
        e.stopPropagation()
        if (this.edit_name.replace(/^\s+|\s+$/g, '')) {
          if (!data.id) {
            let virtualNode = node.parent
            let params = {
              name: this.edit_name,
              id: virtualNode.data.id
            }
            let addChild = addItem(this.treeData, params)
            // 如果是用的真api,需要在添加的接口返回添加的节点
            // 添加成功后，将返回的节点加入数据中，然后删除掉没有id的假节点
            virtualNode.data.child.forEach((item, i) => {
              if (!item.id) {
                virtualNode.data.child.splice(i, 1)
              }
            })
            this.isEdit = false
            this.select_id = null
            this.select_level = null
            this.$notify({
            type: 'success',
            title: '操作提示',
            message: '添加成功！',
            duration: 2000
          })
            return
          }

          let params = {
            name: this.edit_name,
            id: data.id
          }
          updateItem(this.treeData, params)
          this.isEdit = false
          this.select_id = null
          this.select_level = null
          this.$notify({
            type: 'success',
            title: '操作提示',
            message: '编辑成功！',
            duration: 2000
          })
        }
      },
			saveFile(){
				this.$parent.visible = false
			},
			cancel(){
				this.$parent.visible = false
			},
      close(data, node, e) {
        e = event || window.event
        e.stopPropagation()
        if (!data.id) {
          node.parent.data.child.forEach((item, i) => {
            if (!item.id) {
              node.parent.data.child.splice(i, 1)
            }
          })
        }
        this.select_id = null
        this.select_level = null
        this.edit_name = data.name
        this.isEdit = false
      },

      nameChange(e) {
        e = event || window.event
        e.stopPropagation()
        this.edit_name = e.target.value
      },

      isSelect(data) {
        return data.id === this.select_id &&
          data.level === this.select_level
      },

      renderContent(h, { node, data }) {
        return (
          <span class="ly-tree-node">
						<Icon type="ios-folder-outline" style="margin-right: 8px;" />
            {
              (this.isEdit === true && this.isSelect(data)) || data.isEdit
                ? <input
                  placeholder="我的新建文件夹"
                  class="ly-edit__text"
									style="background-color:#0B1C38;color:#fff;border: none;padding:3px 5px"
                  on-keyup={() => this.nameChange()}
                  value={this.edit_name} />
                : <span>{data.name}</span>
            }
            {
              (this.isEdit === true && this.isSelect(data)) || data.isEdit
                ? this.getEditContent.call(this, h, data, node)
                : ''
            }
          </span>)
      }
    }
  }
</script>
<style lang="scss">
.el-tree{height: 245px;overflow: auto;background-color: #0C1321;color:#fff}

.ly-tree-container {
  margin: 20px 0 20px 20px;
  width: 60%;
  padding: 20px;

  span {
    font-size: 14px;
  }

  .el-tree > .el-tree-node > .el-tree-node__content:first-child {
    &::before,
    &::after {
      border: none;
    }
  }

  .ly-visible {
    margin-left: 50px;
    visibility: hidden;
		i{font-weight: 700;}
  }

  .ly-edit__text {
    width: 25%;
    height: 25px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    color: #666;
    text-indent: 10px;
  }

  .ly-tree__loading {
    color: #666;
    font-weight: bold;
  }

  .ly-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    justify-content: flex-start;
    font-size: 14px;
    padding-right: 8px;
  }

  .ly-tree-node > div > span:last-child {
    display: inline-block;
    width: 110px;
    text-align: left;
  }

  .ly-tree-node > span:last-child {
    display: inline-block;
    width: 110px;
    text-align: left;
  }

  .el-tree-node .el-tree-node__content {
    height: 30px;

    &:hover .ly-visible {
      visibility: visible;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      right: auto;
    }

    &::before {
      border-left: 1px solid #e6e6e6;
      bottom: 50px;
      height: 100%;
      top: 0;
      width: 1px;
      margin-left: -5px;
      margin-top: -15px;
    }

    &::after {
      border-top: 1px solid #e6e6e6;
      height: 20px;
      top: 14px;
      width: 10px;
      margin-left: -5px;
    }
  }

  .el-tree .el-tree-node {
    position: relative;
  }
}
.el-tree-node__content:hover {
   background-color: #0B1C38;
}
.el-tree-node:focus > .el-tree-node__content {
		background-color: #0B1C38;color: #fff;
}
.tfooter{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	border-top: 1px solid #82868D;
}
.new{
	display: flex;
	align-items: center;
	border: 1px solid #DEDFE1;
	border-radius: 3px;
	padding: 5px 15px;
	cursor: pointer;
}
</style>