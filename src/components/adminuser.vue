<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="用户" name="name1">

        <div style="color: white">
          <icon type="md-add" size="20"></icon>添加用户
        </div>

        <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>

    </Tabs>



  </div>
</template>

<script>
export default {
  name: "adminuser",
  data () {
    return {
      columns7: [
        {
          title: '用户名',
          key: 'username',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.username)
            ]);
          }
        },
        {
          title: '密码',
          key: 'pwd'
        },
        {
          title: '角色'
        },
        {
          title: '所属团队'
        },
        {
          title: '电话号码',
          key: 'phone'
        },
        {
          title: '微信',
          key: 'weixin'
        },

        {
          title: '最近登录时间'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: [
        {
          username: '张三',
          task: '任务1',
          person: '张三',
          pwd: '***'
        },
        {
          username: '李四',
          task: '任务1',
          person: '张三'
        },
        {
          username: '王五',
          task: '任务1',
          person: '张三'
        },
        {
          username: '赵六',
          task: '任务1',
          person: '张三'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '信息',
        content: `username：${this.data1[index].username}<br>task：${this.data1[index].task}<br>person：${this.data1[index].person}<br>pwd：${this.data1[index].pwd}\``
      })
    },
    remove (index) {
      this.data1.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.probg {
  width: 500px;
  height: 800px;
  background-color: #0b1c38;
}
</style>