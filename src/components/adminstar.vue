<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="用户星标" name="name1">

        <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>

    </Tabs>



  </div>
</template>

<script>
export default {
  name: "adminstar",
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
          title: '星标项目',
          key: 'starpro'
        },
        {
          title: '星标任务'
        },
        {
          title: '星标人员'
        },

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
}
</script>

<style scoped>
.probg {
  width: 500px;
  height: 800px;
  background-color: #0b1c38;
}
</style>