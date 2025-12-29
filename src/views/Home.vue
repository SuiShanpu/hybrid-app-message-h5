<!--
  创建时间: 2025-12-16 17:48:56
  作者: Shanpu
  功能: Home 首页面
-->

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axiosHttp from "@/axios";
import { 
  Button as AButton,
} from 'ant-design-vue';

const defMsg = '这是 vue 中的初始化值';
const messageModel = ref(defMsg);

/**
 * 生命周期
 */
onMounted(() => {
  window.addEventListener('flutter-to-home', useFlutterMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('flutter-to-home', useFlutterMessage);
});

/**
 * 使用 fluter 中的值
 */
function useFlutterMessage(ev) {
  const data = ev.detail;
  console.log("使用 fluter 中的值 data:", data);
  if ( !data ) {
    alert("无数据！");
    return;
  }

  messageModel.value = data?.msg;
}

/**
 * 使用 fluter 中的值
 */
function onUseFlutter() {
  window.flutterBridge?.postMessage('来自 h5 Home 页面的消息');
}

/**
 * 使用 vue 中的值
 */
function onUseVue() {
  messageModel.value = defMsg;
}

/**
 * 发送请求
 */
async function onAction() {
  const result =  await axiosHttp.get("https://juejin.cn/");
  console.log("result:", result);
}
</script> 

<template>
  <div class="home-page">
    <h1>欢迎来到h5的 Home Page</h1>
    <p>下面是一个 Flutter 与 h5 数据通信的示例：</p>
    <div class="flutter-wrap">
      <div class="btns">
        <button class="btn1" @click="onUseFlutter">使用 fluter 中的值</button>
        <button @click="onUseVue">使用 vue 中的值</button>
      </div>
      <div>{{ messageModel }}</div>
    </div>

    <a-button type="primary" @click="onAction">发送请求</a-button>
  </div>
</template>

<style scoped>
.flutter-wrap {
  box-sizing: border-box;
  width: calc(100% - 32px);
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