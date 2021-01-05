<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="角色和权限" name="name1">

        <div style="color: white">
          <icon type="md-add" size="20"></icon>新的角色
        </div>

        <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>

    </Tabs>

  </div>
</template>

<script>
export default {
  name: "adminroleAuthority",
  data () {
    return {
      columns7: [
        {
          title: '角色',
          key: 'role',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.role)
            ]);
          }
        },
        {
          title: '权限',
          key: 'authority'
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
          role: '超级管理员',
          authority: '1'
        },
        {
          role: '主管',
          authority: '2'
        },
        {
          role: '项目发起人',
          authority: '3'
        },
        {
          role: '项目负责人',
          authority: '3'
        },
        {
          role: '普通成员',
          authority: '4'
        },
      ]
    }
  },
}
</script>

<style scoped>

</style>