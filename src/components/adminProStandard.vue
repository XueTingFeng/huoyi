<template>
  <div class="probg">

    <Tabs value="name1">
      <TabPane label="标准项目类型" name="name1">

        <div style="color: white">
          <icon type="md-add" size="20"></icon>创建新的标准
        </div>

        <Table border :columns="columns7" :data="data1" :loading="loading"></Table>
        <Page :total="100" show-elevator style="text-align: center;margin-top: 420px"/>
      </TabPane>

    </Tabs>

  </div>
</template>

<script>
export default {
  name: "adminProStandard",
  data () {
    return {
      columns7: [
        {
          title: '标准项目类型名称',
          key: 'standard',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.standard)
            ]);
          }
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
          standard: '类型1',
        },
        {
          standard: '类型1',
        },
        {
          standard: '类型1',
        },
        {
          standard: '类型1',
        },
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