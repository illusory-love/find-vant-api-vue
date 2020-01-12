<template lang="pug">
    div.wrapper
      div.empty(v-if="pageList.length === 0")
        p 当前页面未查找到 vant 组件
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="脚本调用" name="1">
          <list :data="scriptList" />
        </van-collapse-item>
        <van-collapse-item title="当前页面使用组件" name="2" v-if="pageList.length > 0">
          <list :data="pageList" showtag="true" />
        </van-collapse-item>
        <van-collapse-item title="所有组件" name="3">
          <list :data="fullList" />
        </van-collapse-item>
      </van-collapse>
</template>
<script>
  import List from './components/list';

  export default {
    data: () => ({
      pageList: [],
      fullList: [],
      scriptList: [],
      activeName: '2'
    }),
    components: {
      List
    },
    computed: { },
    created () { },
    mounted () { 
      chrome.tabs.getSelected(null, tab => {
        chrome.tabs.sendMessage(tab.id, {}, ({ page, full, script }) => {
          console.log('接收到的内容：', page, full, script)

          // 显示列表赋值
          this.pageList = page;
          this.fullList = full;
          this.scriptList = script;
        })
      });
    },
    methods: {

    }
  }
</script>
<style lang="less">
  .wrapper{
    width: 500px;
    padding: 15px;
  }
  .empty{
    text-align: center;
    font-size: 18px;
    line-height: 18px;
    padding: 20px 0 40px;
  }
</style>