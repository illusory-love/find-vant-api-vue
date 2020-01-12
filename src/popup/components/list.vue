<template lang="pug">
  div.list
    van-list(v-model="loading" :finished="finished" @load="onLoad")
      van-row.row(type="flex" v-for="item in data" :key="item.name" @click="goDocHome(item)")
        van-col.title(span="14") {{ item.name }}
          <van-tag type="warning" plain v-if="showtag">次数：{{ item.times }}</van-tag>
        van-col.anchor(span="10")
          a(v-for="(anchor, index) in item.anchorText" :key="anchor" @click.stop="goDoc(item, index)") {{ anchor }}
</template>
<script>
  // 文档主域
  const domain = 'https://youzan.github.io/vant/';

  export default {
    name: 'List',

    props: {
      data: {
        type: Array,
        default: []
      },
      showtag: false
    },

    data: () => ({
      loading: false,
      finished: false
    }),

    mounted() {
      
    },

    methods: {
      onLoad(){
        this.finished = true;
      },
      // 跳转至当前组件文档页
      goDocHome(item){
        chrome.tabs.create({
          url: domain + item.link
        });
      },
      // 跳转至当前组件文档指定锚点处
      goDoc(item, index){
        // 获取当前的锚点值
        let anchor = item.anchor[index];
        if (typeof anchor === 'object'){
          anchor = anchor.alias;
        }
        // 获取文档跳转地址
        const doc = domain + item.link + '#' + anchor;

        chrome.tabs.create({
          url: doc
        });
      }
    }
  }
</script>
<style lang="less">
  .list{
    width: 100%;

    .title{
      font-size: 14px;
    }

    .row{
      padding: 10px 0;
      border-bottom: solid 1px #ebebeb;
      cursor: pointer;

      &:nth-last-child(2){
        border-bottom: none;
      }
    }
  }
  .anchor{
    text-align: right;

    a{
      padding: 0 4px;
      color: #409eff;
      cursor: pointer;

      &:hover{
        color: #66b1ff;
        text-decoration: underline;
      }
    }
  }
  .van-tag{
    margin-left: 4px;
  }
</style>