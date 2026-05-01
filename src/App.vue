<script setup>
import Hello from './components/Hello.vue'
import MsgBoard from './components/MsgBoard.vue';
</script>

<template>

<Hello></Hello>
<MsgBoard></MsgBoard>

<footer>
  太好啦我们已经完成了留言板的开发，但是DeepSeek写的
</footer>

<!--🤫如果你是看到了源码的人（很少可能会看到）你接下来一年里都会好运爆棚-->
</template>

<style scoped>
footer{
  font-size: 7px;
  text-align: center;
  color: grey;
}
#re{
  display: inline-block;
  color: gray;
}
</style>
