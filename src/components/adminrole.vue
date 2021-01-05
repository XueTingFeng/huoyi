<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="用户和角色" name="name1">

        <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>

    </Tabs>

  </div>
</template>

<script>
export default {
  name: "adminrole",
  data () {
    return {
      columns7: [
        {
          title: '用户',
          key: 'user',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.user)
            ]);
          }
        },
        {
          title: '角色',
          key: 'role'
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
              }, '分配'),
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
          user: '张三',
         role: '主管'
        },
        {
          user: '李四',
          role: '超级管理员'
        },
        {
          user: '王五',
          role: '项目发起人'
        },
        {
          user: '赵六',
          role: '项目负责人'
        },
        {
          user: '孙七',
          role: '普通成员（含组长）'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>