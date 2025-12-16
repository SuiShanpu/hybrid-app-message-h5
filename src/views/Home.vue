<!--
  创建时间: 2025-12-16 17:48:56
  作者: Shanpu
  功能: Home 首页面
-->

<script setup>
import { ref } from 'vue';

const defMsg = '这是 vue 中的初始化值';
const messageModel = ref(defMsg);

/**
 * 使用 fluter 中的值
 */
function onUseFlutter(params) {
  messageModel.value = "这是 flutter 中的传递过来的值";
}

/**
 * 使用 vue 中的值
 */
function onUseVue(params) {
  messageModel.value = defMsg;
}
</script> 

<template>
  <div class="home-page">
    <h1>欢迎来到山璞的 Home Page</h1>
    <p>下面是一个 Flutter 与 h5 数据通信的示例：</p>
    <div class="flutter-wrap">
      <div class="btns">
        <button class="btn1" @click="onUseFlutter">使用 fluter 中的值</button>
        <button @click="onUseVue">使用 vue 中的值</button>
      </div>
      <div>{{ messageModel }}</div>
    </div>
  </div>
</template>

<style scoped>
.flutter-wrap {
  width: 50%;
  margin: 16px;
  padding: 16px;
  border: 1px solid #333;
}
.btns {
  margin-bottom: 12px;
}
.btn1 {
  margin-right: 12px;
}
</style>