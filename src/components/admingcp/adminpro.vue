<template>
 <div class="probg">

   <Table border :columns="columns7" :data="data1"></Table>

   <Page :total="100" show-elevator style="text-align: center;margin-top: 520px"/>
 </div>
</template>

<script>
export default {
  name: "adminpro",
  data () {
    return {
      columns7: [
        {
          title: '项目',
          key: 'pro_name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.pro_name)
            ]);
          }
        },
        {
          title: '任务',
          key: 'task'
        },
        {
          title: '参与人员',
          key: 'person'
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
          pro_name: '项目1',
          task: '任务1',
          person: '张三'
        },
        {
          pro_name: '项目1',
          task: '任务1',
          person: '张三'
        },
        {
          pro_name: '项目1',
          task: '任务1',
          person: '张三'
        },
        {
          pro_name: '项目1',
          task: '任务1',
          person: '张三'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `pro_name：${this.data1[index].pro_name}<br>task：${this.data1[index].task}<br>person：${this.data1[index].person}`
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
  background-color: white;

}

.tableStyle{
  border: 1px solid #0c1321;
  color: #0c1321;
}

.tdStyle{
  border: 1px solid  #0c1321;
}


</style>