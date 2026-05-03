<script setup>
import Hello from './components/Hello.vue'
import MsgBoard from './components/MsgBoard.vue';
</script>

<template>

<Hello></Hello>
<MsgBoard></MsgBoard>

<footer>
  <p style="font-size: 10px;">之所以上面的字体那么大是因为要照顾移动端而我不会写自动缩放之类的</p>
  太好啦我们已经完成了留言板的开发，但是DeepSeek写的
  <a href="https://github.com/hou-tianqi/hou-tianqi" style="display: block; color: gray;">如果你有GitHub账号的话，点此支持一下这个网站</a>
  <p style="margin: 0px;">一个star就可以让我加一个新功能！</p>
</footer>

</template>

<style scoped>
footer{
  font-size: 7px;
  text-align: center;
  color: grey;
}
</style>
