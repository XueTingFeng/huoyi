<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="任务" name="name1">
        <div style="color: white">
          <icon type="md-add" size="20"></icon>添加任务
        </div>
        <Table border :columns="columns7" :data="data1">

        </Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>
    </Tabs>

  </div>
</template>

<script>
export default {
  name: "admintask",
  data () {
    return {
      columns7: [
        {
          title: '任务',
          key: 'task_name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.task_name)
            ]);
          }
        },
        {
          title: '所属项目',
          key: 'project'
        },
        {
          title: '执行人',
          key: 'person'
        },
        {
          title: '截止日期',
          key: 'date'
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
          task_name: '任务1',
          project: '项目1',
          person: '张三',
          date: '2020.1.1'
        },
        {
          task_name: '任务1',
          project: '项目1',
          person: '张三',
          date: '2020.1.1'
        },
        {
          task_name: '任务1',
          project: '项目1',
          person: '张三',
          date: '2020.1.1'
        },
        {
          task_name: '任务1',
          project: '项目1',
          person: '张三',
          date: '2020.1.1'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '信息',
        content: `task_name：${this.data1[index].task_name}<br>project：${this.data1[index].task}<br>person：${this.data1[index].person}<br>date: ${this.data1[index].date}`
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