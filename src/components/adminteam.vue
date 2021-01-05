<template>
  <div class="probg">

  <Tabs value="name1">
    <TabPane label="团队信息" name="name1">

      <div style="color: white">
        <icon type="md-add" size="20"></icon>创建团队
      </div>

      <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
      <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
    </TabPane>

  </Tabs>

  </div>
</template>

<script>
export default {
  name: "adminteam",
  data () {
    return {
      columns7: [
        {
          title: '团队名称',
          key: 'team',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.team)
            ]);
          }
        },
        {
          title: '团队成员',
          key: 'teamMembers'
        },
        {
          title: '团队拥有项目'
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
        },
      ],
      data1: [
        {
          team: '团队1',
          teamMembers: '张三'
        },
        {
          team: '团队1',
          teamMembers: '李四',
          person: ''
        },
        {
          team: '团队1',
          teamMembers: '王五',
          person: '张三'
        },
        {
          team: '团队1',
          teamMembers: '赵六',
          person: '张三'
        },
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '信息',
        content: `pro_name：${this.data1[index].pro_name}<br>teamMembers：${this.data1[index].teamMembers}<br>person：${this.data1[index].person}`
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